/**
 * Overtime Calculator Engine
 * Supports 5 calculation engines covering all 50 U.S. states:
 * - weekly_flsa: Standard federal 40-hour weekly (46 states)
 * - california: Daily 8/12 + weekly 40 + 7th-day + double time
 * - colorado: Greater-of weekly >40, daily >12
 * - alaska: Daily >8 + weekly >40 (no stacking)
 * - nevada: Rate-dependent daily >8 / weekly >40
 */

export interface DayHours {
  day: string;
  hours: number;
}

export interface OvertimeResult {
  totalHours: number;
  straightHours: number;
  overtimeHours: number;
  doubleTimeHours: number;
  straightPay: number;
  overtimePay: number;
  doubleTimePay: number;
  grossPay: number;
  dailyBreakdown: DailyBreakdown[];
  engine: string;
  stateRule: string;
}

export interface DailyBreakdown {
  day: string;
  hours: number;
  straight: number;
  overtime: number;
  doubleTime: number;
  straightPay: number;
  overtimePay: number;
  doubleTimePay: number;
  totalPay: number;
}

/**
 * Weekly FLSA engine: used by 46 states
 * OT = max(0, total - threshold) at multiplier
 */
function calculateWeeklyFLSA(
  days: DayHours[],
  rate: number,
  threshold: number = 40,
  multiplier: number = 1.5
): OvertimeResult {
  const totalHours = days.reduce((sum, d) => sum + d.hours, 0);
  const overtimeHours = Math.max(0, totalHours - threshold);
  const straightHours = totalHours - overtimeHours;

  const straightPay = straightHours * rate;
  const overtimePay = overtimeHours * rate * multiplier;

  // Distribute proportionally across days
  const dailyBreakdown: DailyBreakdown[] = [];
  let remainingStraight = straightHours;

  for (const d of days) {
    const dayStraight = Math.min(d.hours, remainingStraight);
    const dayOT = d.hours - dayStraight;
    remainingStraight -= dayStraight;

    dailyBreakdown.push({
      day: d.day,
      hours: d.hours,
      straight: dayStraight,
      overtime: dayOT,
      doubleTime: 0,
      straightPay: dayStraight * rate,
      overtimePay: dayOT * rate * multiplier,
      doubleTimePay: 0,
      totalPay: dayStraight * rate + dayOT * rate * multiplier,
    });
  }

  return {
    totalHours,
    straightHours,
    overtimeHours,
    doubleTimeHours: 0,
    straightPay,
    overtimePay,
    doubleTimePay: 0,
    grossPay: straightPay + overtimePay,
    dailyBreakdown,
    engine: 'weekly_flsa',
    stateRule: `1.5× after ${threshold} hrs/week`,
  };
}

/**
 * California engine
 * Daily: >8 hrs = 1.5×, >12 hrs = 2×
 * 7th consecutive day: first 8 hrs = 1.5×, >8 hrs = 2×
 * Weekly: >40 hrs at 1.5× (only regular hours, not those already paid as daily OT/DT)
 * No pyramiding: each hour at highest single applicable rate
 */
function calculateCalifornia(days: DayHours[], rate: number): OvertimeResult {
  const dailyBreakdown: DailyBreakdown[] = [];
  let totalDailyStraight = 0;
  let totalDailyOT = 0;
  let totalDailyDT = 0;

  // Check if all 7 days have hours for 7th-day rule
  const allSevenWorked = days.length === 7 && days.every(d => d.hours > 0);

  for (let i = 0; i < days.length; i++) {
    const d = days[i];
    let straight = 0, ot = 0, dt = 0;

    if (allSevenWorked && i === 6) {
      // 7th consecutive day: first 8 at 1.5×, over 8 at 2×
      ot = Math.min(d.hours, 8);
      dt = Math.max(0, d.hours - 8);
      straight = 0;
    } else {
      // Regular day: first 8 straight, 8-12 at 1.5×, over 12 at 2×
      straight = Math.min(d.hours, 8);
      ot = Math.min(Math.max(0, d.hours - 8), 4); // hours 8-12
      dt = Math.max(0, d.hours - 12); // hours over 12
    }

    totalDailyStraight += straight;
    totalDailyOT += ot;
    totalDailyDT += dt;

    dailyBreakdown.push({
      day: d.day,
      hours: d.hours,
      straight,
      overtime: ot,
      doubleTime: dt,
      straightPay: straight * rate,
      overtimePay: ot * rate * 1.5,
      doubleTimePay: dt * rate * 2,
      totalPay: straight * rate + ot * rate * 1.5 + dt * rate * 2,
    });
  }

  // Weekly overtime: if total regular hours > 40, excess is OT (not already paid)
  const weeklyOT = Math.max(0, totalDailyStraight - 40);
  if (weeklyOT > 0) {
    // Move hours from straight to OT, starting from the last days
    let remaining = weeklyOT;
    for (let i = dailyBreakdown.length - 1; i >= 0 && remaining > 0; i--) {
      const db = dailyBreakdown[i];
      const move = Math.min(db.straight, remaining);
      db.straight -= move;
      db.overtime += move;
      db.straightPay = db.straight * rate;
      db.overtimePay = db.overtime * rate * 1.5;
      db.totalPay = db.straightPay + db.overtimePay + db.doubleTimePay;
      remaining -= move;
    }
    totalDailyStraight -= weeklyOT;
    totalDailyOT += weeklyOT;
  }

  const straightPay = totalDailyStraight * rate;
  const overtimePay = totalDailyOT * rate * 1.5;
  const doubleTimePay = totalDailyDT * rate * 2;

  return {
    totalHours: days.reduce((s, d) => s + d.hours, 0),
    straightHours: totalDailyStraight,
    overtimeHours: totalDailyOT,
    doubleTimeHours: totalDailyDT,
    straightPay,
    overtimePay,
    doubleTimePay,
    grossPay: straightPay + overtimePay + doubleTimePay,
    dailyBreakdown,
    engine: 'california',
    stateRule: 'CA: Daily 8h/12h + Weekly 40h + 7th Day',
  };
}

/**
 * Colorado engine
 * Greater-of: weekly >40 OR daily >12 (whichever produces more OT)
 * All at 1.5×, no double time
 */
function calculateColorado(days: DayHours[], rate: number): OvertimeResult {
  const totalHours = days.reduce((s, d) => s + d.hours, 0);

  // Method 1: Weekly >40
  const weeklyOT = Math.max(0, totalHours - 40);

  // Method 2: Daily >12
  const dailyOT = days.reduce((s, d) => s + Math.max(0, d.hours - 12), 0);

  // Use whichever is greater
  const useDaily = dailyOT > weeklyOT;
  const overtimeHours = Math.max(weeklyOT, dailyOT);
  const straightHours = totalHours - overtimeHours;

  const dailyBreakdown: DailyBreakdown[] = [];

  if (useDaily) {
    // Daily calculation
    for (const d of days) {
      const straight = Math.min(d.hours, 12);
      const ot = Math.max(0, d.hours - 12);
      dailyBreakdown.push({
        day: d.day, hours: d.hours,
        straight, overtime: ot, doubleTime: 0,
        straightPay: straight * rate, overtimePay: ot * rate * 1.5, doubleTimePay: 0,
        totalPay: straight * rate + ot * rate * 1.5,
      });
    }
  } else {
    // Weekly calculation (same distribution as FLSA)
    let remainingStraight = straightHours;
    for (const d of days) {
      const dayStraight = Math.min(d.hours, remainingStraight);
      const dayOT = d.hours - dayStraight;
      remainingStraight -= dayStraight;
      dailyBreakdown.push({
        day: d.day, hours: d.hours,
        straight: dayStraight, overtime: dayOT, doubleTime: 0,
        straightPay: dayStraight * rate, overtimePay: dayOT * rate * 1.5, doubleTimePay: 0,
        totalPay: dayStraight * rate + dayOT * rate * 1.5,
      });
    }
  }

  return {
    totalHours, straightHours, overtimeHours, doubleTimeHours: 0,
    straightPay: straightHours * rate,
    overtimePay: overtimeHours * rate * 1.5,
    doubleTimePay: 0,
    grossPay: straightHours * rate + overtimeHours * rate * 1.5,
    dailyBreakdown,
    engine: 'colorado',
    stateRule: 'CO: Greater-of Weekly >40h / Daily >12h',
  };
}

/**
 * Alaska engine
 * Daily >8 at 1.5× PLUS weekly >40 at 1.5× (no stacking)
 * Weekly count excludes hours already paid as daily OT
 */
function calculateAlaska(days: DayHours[], rate: number): OvertimeResult {
  const dailyBreakdown: DailyBreakdown[] = [];
  let totalDailyOT = 0;
  let totalRegularHours = 0;

  for (const d of days) {
    const straight = Math.min(d.hours, 8);
    const ot = Math.max(0, d.hours - 8);
    totalDailyOT += ot;
    totalRegularHours += straight;

    dailyBreakdown.push({
      day: d.day, hours: d.hours,
      straight, overtime: ot, doubleTime: 0,
      straightPay: straight * rate, overtimePay: ot * rate * 1.5, doubleTimePay: 0,
      totalPay: straight * rate + ot * rate * 1.5,
    });
  }

  // Weekly OT: only on regular hours (excluding daily OT hours)
  const weeklyOT = Math.max(0, totalRegularHours - 40);
  if (weeklyOT > 0) {
    let remaining = weeklyOT;
    for (let i = dailyBreakdown.length - 1; i >= 0 && remaining > 0; i--) {
      const db = dailyBreakdown[i];
      const move = Math.min(db.straight, remaining);
      db.straight -= move;
      db.overtime += move;
      db.straightPay = db.straight * rate;
      db.overtimePay = db.overtime * rate * 1.5;
      db.totalPay = db.straightPay + db.overtimePay;
      remaining -= move;
    }
    totalRegularHours -= weeklyOT;
    totalDailyOT += weeklyOT;
  }

  const straightHours = totalRegularHours;
  const overtimeHours = totalDailyOT;

  return {
    totalHours: days.reduce((s, d) => s + d.hours, 0),
    straightHours, overtimeHours, doubleTimeHours: 0,
    straightPay: straightHours * rate,
    overtimePay: overtimeHours * rate * 1.5,
    doubleTimePay: 0,
    grossPay: straightHours * rate + overtimeHours * rate * 1.5,
    dailyBreakdown,
    engine: 'alaska',
    stateRule: 'AK: Daily >8h + Weekly >40h (no stacking)',
  };
}

/**
 * Nevada engine
 * If rate < $18.00/hr (1.5× min wage): greater-of daily >8 / weekly >40
 * If rate >= $18.00: weekly >40 only
 */
function calculateNevada(days: DayHours[], rate: number): OvertimeResult {
  const NV_THRESHOLD = 18.0; // 1.5 × $12.00 minimum wage

  if (rate >= NV_THRESHOLD) {
    // Weekly only
    const result = calculateWeeklyFLSA(days, rate, 40, 1.5);
    result.engine = 'nevada';
    result.stateRule = 'NV: Weekly >40h (rate ≥ $18/hr)';
    return result;
  }

  // Rate < $18: greater-of daily >8 / weekly >40
  const totalHours = days.reduce((s, d) => s + d.hours, 0);
  const weeklyOT = Math.max(0, totalHours - 40);
  const dailyOT = days.reduce((s, d) => s + Math.max(0, d.hours - 8), 0);

  const useDaily = dailyOT > weeklyOT;
  const overtimeHours = Math.max(weeklyOT, dailyOT);
  const straightHours = totalHours - overtimeHours;

  const dailyBreakdown: DailyBreakdown[] = [];

  if (useDaily) {
    for (const d of days) {
      const straight = Math.min(d.hours, 8);
      const ot = Math.max(0, d.hours - 8);
      dailyBreakdown.push({
        day: d.day, hours: d.hours,
        straight, overtime: ot, doubleTime: 0,
        straightPay: straight * rate, overtimePay: ot * rate * 1.5, doubleTimePay: 0,
        totalPay: straight * rate + ot * rate * 1.5,
      });
    }
  } else {
    let remainingStraight = straightHours;
    for (const d of days) {
      const dayStraight = Math.min(d.hours, remainingStraight);
      const dayOT = d.hours - dayStraight;
      remainingStraight -= dayStraight;
      dailyBreakdown.push({
        day: d.day, hours: d.hours,
        straight: dayStraight, overtime: dayOT, doubleTime: 0,
        straightPay: dayStraight * rate, overtimePay: dayOT * rate * 1.5, doubleTimePay: 0,
        totalPay: dayStraight * rate + dayOT * rate * 1.5,
      });
    }
  }

  return {
    totalHours, straightHours, overtimeHours, doubleTimeHours: 0,
    straightPay: straightHours * rate,
    overtimePay: overtimeHours * rate * 1.5,
    doubleTimePay: 0,
    grossPay: straightHours * rate + overtimeHours * rate * 1.5,
    dailyBreakdown,
    engine: 'nevada',
    stateRule: 'NV: Greater-of Daily >8h / Weekly >40h (rate < $18/hr)',
  };
}

/**
 * Main calculation function: routes to the correct engine based on state
 */
export function calculateOvertime(
  engine: string,
  days: DayHours[],
  rate: number,
  params?: Record<string, any>
): OvertimeResult {
  switch (engine) {
    case 'california':
      return calculateCalifornia(days, rate);
    case 'colorado':
      return calculateColorado(days, rate);
    case 'alaska':
      return calculateAlaska(days, rate);
    case 'nevada':
      return calculateNevada(days, rate);
    case 'weekly_flsa':
    default:
      const threshold = params?.weekly_threshold_hours ?? 40;
      const multiplier = params?.multiplier ?? 1.5;
      return calculateWeeklyFLSA(days, rate, threshold, multiplier);
  }
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format hours
 */
export function formatHours(hours: number): string {
  return hours % 1 === 0 ? `${hours}h` : `${hours.toFixed(1)}h`;
}
