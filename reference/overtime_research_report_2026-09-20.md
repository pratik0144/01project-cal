# U.S. Overtime Rules by State - Research Report for the Online Overtime Calculator

**As of:** September 20, 2026 | **Scope:** all 50 states (DC and territories excluded) | **Target:** a *typical nonexempt private-sector employee* | **Status:** research only - no website or app was built.

> This is research to support an *estimator*. It is not legal, tax or payroll advice. Re-verify before launch and on a recurring schedule (at least each January 1 and July 1).

**How to read this report**
- **Official** = government source (U.S. DOL, state agency, legislature, court). **Secondary** = law-firm, vendor, academic or news pages, used only to cross-check or to flag items I could not verify officially. The source audit (section 8) lists official sources only; secondary sources are listed separately.
- The **U.S. DOL Wage and Hour Division state table (updated July 1, 2026)** was read in full and used as the common cross-check for all 50 states. State-specific sources were read where available (see section 9 for exactly which states rest only on the DOL table).
- **Confidence:** *High* = the DOL table plus at least one more independent source agree and no conflict affects the general rule. *Medium* = agreement, but a conflict or heavy reliance on secondary material affects the rule or a material special rule. *Low* = unresolved conflict on the general rule (none). The master table shows special-rule confidence separately when it differs.
- Companion file: `overtime_rules_2026_50_states.json` (the dataset; 50 state records, source registry, engines, scheduled changes, known conflicts).

## 1. Executive summary

**Bottom line (as of Sept. 20, 2026).** Federal law sets the floor: 1.5x the regular rate after 40 hours in a fixed workweek for covered nonexempt employees - no federal daily overtime, weekend/holiday premium or double time. Most states change nothing for a typical calculation, but four (AK, CA, CO, NV) add daily triggers and about a dozen more have wrinkles a calculator must not silently ignore.

**Landscape (all 50 states)**
- **18 - no independent state overtime rule; FLSA governs:** AL, AZ, DE, FL, GA, ID, IA, LA, MS, NE, OK, SC, SD, TN, TX, UT, VA, WY. (UT and VA are Medium confidence: Utah has a source conflict; Virginia's statute only creates a state remedy for FLSA overtime.)
- **2 - higher state threshold that rarely applies:** KS (46 hrs) and MN (48 hrs) apply only where the FLSA does not; use 40.
- **26 - own weekly-40 statute, no general daily rule:** AR, CT, HI, IL, IN, KY, ME, MD, MA, MI, MO, MT, NH, NJ, NM, NY, NC, ND, OH, OR, PA, RI, VT, WA, WV, WI. Wrinkles: KY seventh-day; CT restaurant/hotel seventh-day; RI Sunday/holiday premium; NY 44 hrs live-in and 52 hrs farm; OR 10-hr daily rule in manufacturing/canneries and 48-hr farm; HI $4,000/month exemption; MD farm 60; MO 52 and NC 45 seasonal amusement; WA comp time; MA exclusions.
- **4 - daily rules:** CA (8/12 daily, seventh-day, double time), CO (12 daily, 12 consecutive, 40 weekly, greater-of, no double time), AK (8 daily + 40 weekly, no stacking), NV (8 daily only when pay is under $18.00/hr; greater-of).

**Changes**
- Federal: DOL restored the $684/week EAP salary level ($107,432 HCE) on May 14, 2026 after the 2024 rule was vacated. The 2025 tax law's 2025-2028 overtime deduction covers only FLSA-required premium - state-only overtime (e.g., California daily) does not qualify, which matters for a future tax tool.
- CO: COMPS Order #40, effective Feb. 1, 2026. NY: farm threshold 52 hrs from Jan. 1, 2026. OR: farm threshold 48 hrs since 2025, **40 on Jan. 1, 2027 (scheduled)**. RI: Sunday/holiday regulations (Aug. 2025). NV: 2025 advisory opinions, 2026 bulletin. HI: $4,000 exemption (2024).

**MVP implication.** One weekly-40 engine for 46 states; dedicated engines for CA, CO, AK, NV; optional modules for KY, CT, RI, OR, NY; caveats elsewhere. Keep exempt status, comp time, CBAs and industry rules out of defaults.

**Accuracy caveats.** DOL's July 1, 2026 state table cross-checks all 50 states; a state agency or court source was read for 15 states, and the others rely on the DOL table plus statute citations. Secondary sources are labeled and used only to cross-check. Source conflicts (CO, NY, KY, UT, VA, OR, HI, NV) are in Appendix A.

## 2. 50-state master table

Cells are deliberately terse; the JSON and section 3 hold the detail. "x" = times. FLSA exemptions and special FLSA classes apply everywhere and are not repeated in each row.

| State | General threshold | Multiplier | Daily OT | Weekly OT | Double time | Important exceptions | MVP rule | Official source | Effective date | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| **Alabama** (AL) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly FLSA: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Alaska** (AK) | >8 hrs/day and >40 hrs/week | 1.5x | >8 hrs/day at 1.5x | >40 hrs/week at 1.5x (daily OT hours not counted again) | None | Employers with <4 employees; approved flexible work plans (10-hr day/40-hr wk); ag, hospital medical staff, small mining, govt, etc. | Daily >8 and weekly >40; weekly count excludes hours already paid as daily OT | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [AK-DOLWD-SUMMARY](https://labor.alaska.gov/lss/forms/Summary_of_Alaska_Wage_and_Hour_Act__Rev_01-25.pdf) | AS 23.10.060 long-standing; DOLWD summary rev. 01-2025 | High |
| **Arizona** (AZ) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Arkansas** (AR) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | State law applies to employers with 4+ employees (FLSA applies to covered employers regardless) | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **California** (CA) | >8 hrs/day, >40 hrs/week, and first 8 hrs on 7th consecutive workday | 1.5x and 2x | >8 hrs/day at 1.5x; >12 hrs/day at 2x | >40 hrs/week at 1.5x (excluding hours already paid daily OT/DT) | >12 hrs/day; >8 hrs on 7th consecutive day of the workweek | Alternative workweek schedules (e.g., 4x10); agricultural and other special wage-order rules; many exemptions (EAP >=2x state min wage, CBA, some drivers) | Daily 8/12 + weekly 40 + 7th-day rules; no pyramiding (each hour paid at highest single rate) | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [CA-DIR-FAQ-OT](https://www.dir.ca.gov/dlse/FAQ_Overtime.htm) | Lab. Code 510 in force (AB 60, eff. 2000); no 2025-26 amendment found | High / special rules: Medium |
| **Colorado** (CO) | >40 hrs/week, >12 hrs/day, or >12 consecutive hours (whichever pays more) | 1.5x | >12 hrs/day at 1.5x; also >12 consecutive hrs regardless of workday boundaries | >40 hrs/week at 1.5x | None (no double-time requirement) | Ag: >48 hrs (56 at some highly seasonal sites); some health, ski, heavy-vehicle jobs exempt; no comp time; no averaging | Greater-of: weekly >40, daily >12 (12 consecutive hrs needs shift times) | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [CO-CDLE-POSTER-2026](https://cdle.colorado.gov/sites/cdle/files/2026_comps_order_poster_english_%5Baccessible%5D.pdf) | COMPS Order #40 adopted 2025-12-08, eff. 2026-02-01 | High / special rules: Medium |
| **Connecticut** (CT) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | Restaurant/hotel-restaurant 7th consecutive day premium (1.5x minimum rate); ag, EAP, auto sales, certain drivers, outside sales excluded | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [CT-DOL-WH](https://portal.ct.gov/dol/Divisions/Wage-and-Workplace-Standards/wage-and-hour) | CGS 31-76c long-standing; DOL table 2026-07-01 | High / special rules: Medium-High |
| **Delaware** (DE) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Florida** (FL) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Georgia** (GA) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Hawaii** (HI) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | Guaranteed monthly comp >= $4,000 exempt; public-works construction daily OT (Ch. 104 HRS, reported); ag threshold 48 hrs (reported) | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [HI-HRS-387-3](https://www.capitol.hawaii.gov/hrscurrent/Vol07_Ch0346-0398/HRS0387/HRS_0387-0003.htm) | HRS 387-3 long-standing; $4,000 exemption threshold eff. 2024-06-21 | High / special rules: Medium |
| **Idaho** (ID) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Illinois** (IL) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | State law covers employers with 4+ employees (excluding family members) | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [IL-820-ILCS-105-4a](https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2400&ChapterID=68&Chapter=EMPLOYMENT&MajorTopic=BUSINESS%20AND%20EMPLOYMENT) | Long-standing; DOL table 2026-07-01 | High |
| **Indiana** (IN) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | State law covers employers with 2+ employees; FLSA applies separately | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [IN-IC-22-2-2-4](https://iga.in.gov/laws/2022/ic/titles/22#22-2-2-4) | Long-standing; DOL table 2026-07-01 | High |
| **Iowa** (IA) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Kansas** (KS) | >40 hrs (FLSA - typical covered employer); >46 hrs (K.S.A. 44-1204, only employers/employees NOT covered by FLSA) | 1.5x | None | >40 hrs (FLSA); >46 hrs (state, non-FLSA-covered only) | None | State 46-hr rule excludes FLSA-covered employers and employees; no daily/7th-day rule | Use FLSA weekly 40 (default); show note that state 46-hr rule applies only to non-FLSA employers | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [KS-KSA-44-1204](https://www.kslegislature.gov/b2025_26/laws/044_000_0000_chapter/044_012_0000_article/044_012_0004_section/044_012_0004_k/) | K.S.A. 44-1204 long-standing; no 2025-26 change identified | High |
| **Kentucky** (KY) | >40 hrs/workweek; plus 7th-day rule | 1.5x | None | >40 hrs at 1.5x | None | Retail stores, restaurants/hotels/motels excluded from KRS 337.285 (FLSA still applies); 7th-day rule has exceptions | Weekly 40 default; optional 7th-day module: if all 7 days worked and total >40, OT hrs = max(weekly OT, 7th-day hrs) | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [KY-LABOR-POSTER](https://elc.ky.gov:443/workplace-standards/Documents/KY%20Wage%20and%20Hour%20Poster%20English.pdf) | KRS 337.050/337.285 long-standing; no 2025-26 change identified | High / special rules: Medium |
| **Louisiana** (LA) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Maine** (ME) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | Statutory exemptions in 26 M.R.S. 664(3) (not enumerated here) | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [ME-26-MRSA-664](https://legislature.maine.gov/statutes/26/title26sec664.html) | Long-standing; DOL table 2026-07-01 | High |
| **Maryland** (MD) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | Some farm workers >60 hrs; other statutory exclusions (rail, some amusement/recreation, taxi, some auto/air-carrier staff) - verify | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [MD-DOL-OT](https://labor.maryland.gov/labor/wagepay/wpotgenl.shtml) | LE 3-415 long-standing; no 2025-26 change identified | High / special rules: Medium |
| **Massachusetts** (MA) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | Many excluded employments in M.G.L. c.151 1A; retail Sunday/holiday premium ended 2023-01-01 | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [MA-LAWLIB-OT](https://mass.gov/info-details/massachusetts-law-about-overtime) | 454 CMR 27.03 / c.151 1A; Sunday/holiday premium ended 2023-01-01 | High |
| **Michigan** (MI) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | Employers with 2+ employees; state law excludes FLSA-covered employment unless state wage is higher (it is) | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [MI-MCL-408.934a](https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-408-934a) | Long-standing; DOL table 2026-07-01 | High |
| **Minnesota** (MN) | >40 hrs (FLSA - covered employers); >48 hrs (Minn. Stat. 177.25 state law) | 1.5x | None | >40 hrs (FLSA); >48 hrs (state) | None | State 48-hr rule matters only where FLSA does not apply; agricultural and other exclusions in Minn. Stat. 177.23 subd. 7 | Use FLSA weekly 40 (default); show note about state 48-hr statute | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [MN-DLI-GUIDE](https://dli.mn.gov/sites/default/files/pdf/overtime.pdf) | Minn. Stat. 177.25 long-standing (48 hrs); DOL table 2026-07-01 still shows 48 | High |
| **Mississippi** (MS) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Missouri** (MO) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | State law excludes FLSA-covered work and retail/service businesses <$500k sales; seasonal amusement/recreation: >52 hrs | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [MO-RSMO-290.505](https://revisor.mo.gov/main/OneSection.aspx?section=290.505&bid=15336&hl=) | RSMo 290.505 long-standing; DOL table 2026-07-01 | High |
| **Montana** (MT) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | Two coverage tiers by gross sales ($110,000) - both use weekly 40 | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [MT-MCA-39-3-405](https://mca.legmt.gov/bills/mca/title_0390/chapter_0030/part_0040/section_0050/0390-0030-0040-0050.html) | Long-standing; DOL table 2026-07-01 | High |
| **Nebraska** (NE) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Nevada** (NV) | >40 hrs/week for all; PLUS >8 hrs in a workday if regular rate < $18.00/hr (1.5x the $12.00 minimum wage) | 1.5x | >8 hrs in a workday (24-hr period from start of work) at 1.5x - only if rate < 1.5x min wage ($18.00) | >40 hrs/week at 1.5x (all rates) | None | 4x10 schedule by mutual agreement; CBAs with adequate OT terms and other NRS 608.018(3) exemptions | Rate < $18.00: OT hrs = max(daily OT hrs, weekly OT hrs); rate >= $18.00: weekly only | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [NV-BULLETIN-2026](https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/26.06.29%20Annual%20Bulletin%20-%20Daily%20Overtime.pdf) | NRS 608.018; $18.00 threshold = 1.5 x $12.00 min wage (2026 bulletin posted 2026-06-29) | High / special rules: Medium |
| **New Hampshire** (NH) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [NH-RSA-279-21](https://gc.nh.gov/rsa/html/XXIII/279/279-21.htm) | Long-standing; DOL table 2026-07-01 | High |
| **New Jersey** (NJ) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **New Mexico** (NM) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **New York** (NY) | >40 hrs/week (most); >44 hrs (residential/live-in employees); farm laborers >52 hrs in 2026 | 1.5x | None | >40 hrs (44 residential; 52 farm laborers in 2026) | None | Residential (live-in) employees >44 hrs; farm laborers >52 hrs (2026) -> 48 (2028), 44 (2030), 40 (2032); domestic-worker rest-day premium | Weekly 40 default; optional categories: residential 44, farm 52 (2026) | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [NY-DOL-PR-20251219](https://dol.ny.gov/node/63846) | 12 NYCRR 142-2.2 etc. long-standing; farm threshold 52 eff. 2026-01-01 | High |
| **North Carolina** (NC) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | Seasonal amusement/recreational establishments >45 hrs | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [NC-NCGS-95-25.14](https://www.ncleg.gov/enactedlegislation/statutes/pdf/bysection/chapter_95/gs_95-25.14.pdf) | Long-standing; DOL table 2026-07-01 | High |
| **North Dakota** (ND) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [ND-NDAC-46-02-07](https://ndlegis.gov/information/acdata/pdf/46-02-07.pdf) | Long-standing; DOL table 2026-07-01 | High |
| **Ohio** (OH) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | Coverage tiers by gross receipts ($405,000); both tiers use weekly 40 | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [OH-ORC-4111.03](https://codes.ohio.gov/ohio-revised-code/section-4111.03) | Long-standing; DOL table 2026-07-01 | High |
| **Oklahoma** (OK) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Oregon** (OR) | >40 hrs/week (most); >10 hrs/day in manufacturing and cannery/dryer/packing plants; farm workers >48 hrs in 2026 (40 from 2027-01-01) | 1.5x | Manufacturing establishments and non-farm canneries/driers/packing plants: >10 hrs/day at 1.5x | >40 hrs at 1.5x | None | Manufacturing/cannery daily 10-hr rule; ag >48 hrs (-> 40 on 2027-01-01); timber mills/logging camps excluded from daily rule | Weekly 40 default; optional manufacturing/cannery daily 10; optional ag threshold schedule | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [OR-BOLI-AG](https://oregon.gov/boli/employers/Pages/minimum-wage-and-overtime-in-agriculture.aspx) | ORS 653.261 long-standing; ag 48 hrs since 2025-01-01, 40 hrs from 2027-01-01 | High / special rules: Medium |
| **Pennsylvania** (PA) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [PA-34-PACODE-231.41](https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/034/chapter231/s231.41.html&d=reduce) | Long-standing; DOL table 2026-07-01 | High |
| **Rhode Island** (RI) | >40 hrs/week; plus Sunday/holiday premium (separate laws) | 1.5x | None | >40 hrs at 1.5x | None | Sunday/holiday 1.5x (retail may exclude those hours from OT count; non-retail stacks); summer camps, police, ag, car/farm-equipment sales, etc. | Weekly 40 default; optional Sunday/holiday module | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [RI-RIGL-28-12-4.1](https://webserver.rilegislature.gov/Statutes/TITLE28/28-12/28-12-4.1.htm) | RIGL 28-12-4.1 long-standing; Sunday/holiday regs eff. 2025-08-17 | High / special rules: Medium |
| **South Carolina** (SC) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **South Dakota** (SD) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Tennessee** (TN) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Texas** (TX) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |
| **Utah** (UT) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | Medium |
| **Vermont** (VT) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | State law covers employers with 2+ employees | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [VT-21-VSA-384](https://legislature.vermont.gov/statutes/section/21/005/00384) | Long-standing; DOL table 2026-07-01 | High |
| **Virginia** (VA) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [VA-DOLI-VOWA](https://www.doli.virginia.gov/wp-content/uploads/2021/06/Virginia-Overtime-Wage-Act.pdf) | Long-standing; DOL table 2026-07-01 | Medium |
| **Washington** (WA) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | Comp time in lieu of OT only on employee request; ag phase-in complete (40 hrs since 2024); truck/bus driver and other special provisions in WAC | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [WA-LNI-AG](https://lni.wa.gov/workers-rights/agriculture-policies/overtime) | Long-standing; DOL table 2026-07-01 | High |
| **West Virginia** (WV) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | State law covers employers with 6+ employees at one location | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [WV-WVC-21-5C-3](https://code.wvlegislature.gov/21-5C-3/) | Long-standing; DOL table 2026-07-01 | High |
| **Wisconsin** (WI) | >40 hrs/workweek (state law) | 1.5x | None | >40 hrs | None | Farming and domestic service not covered by DWD 274; other DWD 274.04 exemptions | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state); [WI-DWD-274](https://docs.legis.wisconsin.gov/code/admin_code/dwd/270_279/274) | Long-standing; DOL table 2026-07-01 | High |
| **Wyoming** (WY) | >40 hrs/workweek (FLSA; no state OT law) | 1.5x | None | >40 hrs | None | None state-specific identified; federal FLSA exemptions apply | Weekly: OT hrs = max(0, hrs - 40) x 1.5 | [DOL table](https://www.dol.gov/agencies/whd/minimum-wage/state) | Long-standing; DOL table 2026-07-01 | High |

## 3. Special-rule states

### 3.0 Verdicts on the claims you asked me to test (2026)

| # | Claim | Verdict | Qualification and sources |
|---|---|---|---|
| 1 | Federal baseline is generally 1.5x after 40 hours/week for covered nonexempt employees | **TRUE** | Covered, nonexempt employees only; special FLSA rules exist for police/fire and hospital/nursing-home employees, and many FLSA exemptions apply. Sources: [FED-DOL-OT](https://www.dol.gov/agencies/whd/overtime), [FED-DOL-TOPIC](https://www.dol.gov/general/topic/workhours/overtime). |
| 2 | California has daily overtime and double-time rules | **TRUE** | 1.5x over 8/day; 2x over 12/day; seventh consecutive workday 1.5x for first 8 hrs then 2x; weekly 40; no pyramiding. Alternative workweek schedules, agricultural rules and many exemptions change results. Sources: [CA-DIR-FAQ-OT](https://www.dir.ca.gov/dlse/FAQ_Overtime.htm), [CA-LC-510](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=510). |
| 3 | Colorado has daily/consecutive-hour overtime | **TRUE** | 1.5x after 40/week, 12/day or 12 consecutive hours (greater-of); no double time; no comp time; agriculture 48/56-hr thresholds; some health, ski and heavy-vehicle jobs exempt. COMPS Order #40 eff. Feb. 1, 2026. Sources: [CO-CDLE-POSTER-2026](https://cdle.colorado.gov/sites/cdle/files/2026_comps_order_poster_english_%5Baccessible%5D.pdf), [CO-COMPS-40](https://cdle.colorado.gov/sites/cdle/files/adopted_2026_comps_order_%2340_7_ccr_1103-1_12.8.25.docx). |
| 4 | Alaska has daily overtime | **TRUE** | 1.5x over 8/day and over 40/week with no stacking; not required for employers with fewer than 4 employees; approved flexible work plans and many carve-outs. Sources: [AK-DOLWD-SUMMARY](https://labor.alaska.gov/lss/forms/Summary_of_Alaska_Wage_and_Hour_Act__Rev_01-25.pdf), [AK-AS-23.10.060](https://www.akleg.gov/basis/statutes.asp#23.10.060). |
| 5 | Nevada has a daily overtime rule dependent on the employee's rate relative to minimum wage | **TRUE** | Daily >8 applies only if the regular rate is under 1.5x the minimum wage ($18.00 while the minimum is $12.00); everyone gets weekly >40; agreed 4x10 schedules avoid the daily trigger; Labor Commissioner advice is to pay whichever calculation is more favorable (advisory). Sources: [NV-NRS-608](https://www.leg.state.nv.us/nrs/NRS-608.html#NRS608Sec018), [NV-BULLETIN-2026](https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/26.06.29%20Annual%20Bulletin%20-%20Daily%20Overtime.pdf), [NV-AO-2025-05](https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/AO-2025-05%20Daily%20Overtime%20or%20Weekly%20Overtime.pdf). |
| 6 | New York has special thresholds for certain worker categories | **TRUE** | Residential (live-in) workers: 44 hrs. Farm laborers: 52 hrs from Jan. 1, 2026, falling to 40 hrs on Jan. 1, 2032. Most others: 40. Sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state), [NY-DOL-PR-20251219](https://dol.ny.gov/node/63846), [NY-DOL-FARM-REGS](https://dol.ny.gov/node/14641). |
| 7 | Oregon has special overtime rules for certain industries and agricultural workers | **TRUE** | Daily >10 hrs in manufacturing establishments and non-farm canneries/driers/packing plants; agricultural workers 48 hrs in 2026, 40 hrs from Jan. 1, 2027. General rule: 40/week. Sources: [OR-BOLI-AG](https://oregon.gov/boli/employers/Pages/minimum-wage-and-overtime-in-agriculture.aspx), [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state). |
| 8 | Kentucky has a seventh-day rule | **TRUE (with qualification)** | Time-and-a-half for hours worked on the seventh day of the workweek, but not where the employee is not permitted to work more than 40 hours in the workweek; seventh-day overtime is credited against weekly overtime per a secondary summary of 803 KAR 1:060. One 2026 blog overstates the rule. Sources: [KY-LABOR-POSTER](https://elc.ky.gov:443/workplace-standards/Documents/KY%20Wage%20and%20Hour%20Poster%20English.pdf), [KY-KRS-337.285](https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=54508). |
| 9 | Other states have nonstandard general rules that materially affect a calculator | **TRUE** | KS 46 hrs and MN 48 hrs (non-FLSA-covered only); RI Sunday/holiday premium; CT restaurant/hotel seventh-day premium; MO 52-hr and NC 45-hr seasonal amusement rules; HI $4,000/month exemption (plus reported ag and public-works rules); MD farm 60 hrs; WA comp time on employee request; MA exclusions list. Sources: state rows below. |

### 3.1 State sections (17 states)

Each section separates the **general rule** from **exceptions**. Exceptions are not defaults in the MVP unless they appear under "MVP rule". Source IDs link to the URLs in the source audit.

#### Alaska (AK)

- **Governing law (typical case):** State law is more protective than FLSA (adds a daily trigger); FLSA weekly rule also applies to FLSA-covered employees exempt from state OT.
- **General threshold:** >8 hrs/day and >40 hrs/week | **Multiplier:** 1.5x
- **Daily:** 1.5x for hours over 8 in a workday (AS 23.10.060(b)).
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (in addition to the daily rules above).
- **Double time:** No double-time requirement.
- **Seventh day:** No seventh-day premium requirement.
- **Other rule:** No stacking: hours worked over 8 in a day are excluded when counting whether the employee exceeded 40 hours in the week, because they are separately paid as daily overtime (AS 23.10.060(b)).
- **Exceptions (not defaults):**
  - Daily and weekly premium pay is not required by employers of fewer than 4 employees (AS 23.10.060(d)(1); DOL table). Federal FLSA still applies where the employer is covered. (sources: [AK-DOLWD-SUMMARY](https://labor.alaska.gov/lss/forms/Summary_of_Alaska_Wage_and_Hour_Act__Rev_01-25.pdf), [AK-AS-23.10.060](https://www.akleg.gov/basis/statutes.asp#23.10.060), [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
  - Voluntary flexible work hour plan approved by the Alaska DOLWD (written agreement) - e.g., 10-hour day/40-hour week: premium after the plan's daily hours and after 40 per week; plans inside a collective bargaining agreement are also carved out. (sources: [AK-DOLWD-SUMMARY](https://labor.alaska.gov/lss/forms/Summary_of_Alaska_Wage_and_Hour_Act__Rev_01-25.pdf), [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
  - Other statutory carve-outs from overtime include agricultural employees, seamen, hospital employees providing medical services, community health aides, casual employees, small mining operations (12 or fewer employees), small logging operations, certain flat-rate mechanics, certain line-haul truck drivers, and others listed in AS 23.10.055/.060 (list is not exhaustive). (sources: [AK-DOLWD-SUMMARY](https://labor.alaska.gov/lss/forms/Summary_of_Alaska_Wage_and_Hour_Act__Rev_01-25.pdf))
  - State minimum wage/overtime coverage excludes many categories (agriculture, domestic service, government employees, bona fide executive/administrative/professional employees, outside sales, etc.). (sources: [AK-DOLWD-SUMMARY](https://labor.alaska.gov/lss/forms/Summary_of_Alaska_Wage_and_Hour_Act__Rev_01-25.pdf))
- **MVP rule:** Enter hours for each day. daily_OT = sum over days of max(0, hours_day - 8). weekly_regular_hours = sum over days of min(hours_day, 8). weekly_OT = max(0, weekly_regular_hours - 40). OT hours = daily_OT + weekly_OT, each paid at 1.5x. Assume employer has 4+ employees and no approved flexible work plan; show a caveat.
- **Do not implement as default:** Employers with fewer than 4 employees (state OT n/a); Approved flexible work hour plans (10-hr day); Exempt agricultural/hospital/mining/other carve-outs; Line-haul truck drivers and flat-rate mechanics special provisions.
- **Extra user inputs (special cases only):** Employer has fewer than 4 employees? (default no); Working under a DOLWD-approved flexible work hour plan? (default no)
- **Effective date:** AS 23.10.060 (long-standing). DOLWD summary poster revised Jan 2025; DOL WHD table updated 2026-07-01 (state minimum wage rose to $14.00 on 2026-07-01; overtime rule unchanged).
- **Source last updated:** DOLWD summary Rev. 01-25; DOL table 2026-07-01
- **Confidence:** High. Two official Alaska sources plus DOL table agree; statute text confirms the no-stacking sentence.
- **Second-pass audit notes:** Overtime rule unchanged in 2025-2026; minimum wage increased to $14.00 on 2026-07-01 (DOL table). No pending overtime change found.

#### California (CA)

- **Governing law (typical case):** State law governs (more protective than FLSA); FLSA weekly rule is subsumed.
- **General threshold:** >8 hrs/day, >40 hrs/week, and first 8 hrs on 7th consecutive workday | **Multiplier:** 1.5x and 2x
- **Daily:** 1.5x for work over 8 hours in a workday up to and including 12 hours; 2x beyond 12 hours (Lab. Code 510(a)).
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (in addition to the daily rules above).
- **Double time:** 2x regular rate for hours over 12 in a workday and for hours over 8 on the seventh consecutive day of work in a workweek.
- **Seventh day:** First 8 hours on the seventh consecutive day of work in a workweek: 1.5x; over 8 hours that day: 2x.
- **Other rule:** No pyramiding: the statute does not require combining more than one overtime rate for the same hour (Lab. Code 510(a)); DLSE example: five 10-hour days = 10 overtime hours, not 20.
- **Other rule:** Workweek = fixed 7 consecutive days (168 hours) chosen by the employer; overtime is counted on hours actually worked (paid leave not counted).
- **Exceptions (not defaults):**
  - Alternative workweek schedules adopted under the applicable IWC wage order (e.g., four 10-hour days or three 12-hour days) change when daily overtime applies; the regular rate is still computed on 40 hours. (sources: [CA-DIR-FAQ-OT](https://www.dir.ca.gov/dlse/FAQ_Overtime.htm), [CA-LC-510](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=510))
  - Agricultural workers have separate overtime rules (DIR publishes a dedicated page). (sources: [CA-DIR-FAQ-OT](https://www.dir.ca.gov/dlse/FAQ_Overtime.htm), [CA-DIR-AG](https://www.dir.ca.gov/dlse/Overtime-for-Agricultural-Workers.html))
  - Numerous statutory/wage-order exemptions and exceptions (executive/administrative/professional employees meeting salary and duties tests, many truck drivers, employees under qualifying CBAs, etc.). (sources: [CA-DIR-FAQ-OT](https://www.dir.ca.gov/dlse/FAQ_Overtime.htm), [CA-DIR-EXEMPT](https://www.dir.ca.gov/dlse/FAQ_OvertimeExemptions.htm), [CA-DIR-EXCEPT](https://www.dir.ca.gov/dlse/FAQ_OvertimeExceptions.htm))
  - Historic DLSE opinion (Order 7-80 era) describes an exception to the 7th-day premium for very short weeks (<30 hours/week and <6 hours/day); current wage-order text was not re-verified in this pass - do not implement without checking. (sources: [CA-DLSE-1986](https://www.dir.ca.gov/dlse/opinions/1986-12-01.pdf))
- **MVP rule:** Enter hours for each of the 7 days of the workweek (in order). If hours are entered on all 7 days, day 7 is the 'seventh consecutive workday'. For days 1-6: reg = min(h,8); OT15 = min(max(h-8,0),4); DT = max(h-12,0). Day 7 (only if all 7 days worked): OT15 = min(h,8); DT = max(h-8,0). weekly_reg_hours = sum of reg for days 1-6; weekly_OT = max(0, weekly_reg_hours - 40) (paid 1.5x, removed from straight time). Pay = rate x (straight + 1.5 x (OT15 + weekly_OT) + 2 x DT). Ignore alternative workweek schedules (show caveat).
- **Do not implement as default:** Alternative workweek schedules (4x10, 3x12); Agricultural workers; Truck drivers and other wage-order exceptions; Exempt status (salary >= 2x state minimum wage + duties); CBA-based exemptions; Possible low-hours exception to 7th-day premium.
- **Extra user inputs (special cases only):** Which day starts your employer's workweek (only if the 7th-day rule could apply); Are you on an alternative workweek schedule? (show caveat if yes); Agricultural worker? (show caveat)
- **Effective date:** Cal. Lab. Code 510 (daily/weekly/7th-day/double-time structure in force since AB 60, effective 2000). Statute text shows no 2025-2026 amendment; DIR FAQ current when fetched.
- **Source last updated:** DIR FAQ: no date shown on page; DOL table 2026-07-01
- **Confidence:** High; special rules: Medium (7th-day low-hours edge case; AWS rules not modeled). DIR/DLSE FAQ, Labor Code 510, and DOL table agree on all core triggers.
- **Second-pass audit notes:** No 2025-2026 change to Labor Code 510 found. 2026 state minimum wage is $16.90 (DOL table), which raises the state exempt-salary floor (2x minimum wage; computed $70,304/yr - not verified on an official CA page in this pass).

#### Colorado (CO)

- **Governing law (typical case):** State law (COMPS Order) governs; more protective than FLSA.
- **General threshold:** >40 hrs/week, >12 hrs/day, or >12 consecutive hours (whichever pays more) | **Multiplier:** 1.5x
- **Daily:** 1.5x for hours over 12 in a workday and for hours over 12 consecutive hours regardless of when the workday starts or ends (COMPS Rule 4).
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (in addition to the daily rules above).
- **Double time:** Colorado does not require double time.
- **Seventh day:** No seventh-day premium requirement.
- **Other rule:** Overtime is computed by whichever method (weekly 40, daily 12, or 12 consecutive hours) results in the greatest pay - hours are not paid twice.
- **Other rule:** Employers may not give compensatory time off instead of overtime pay and may not average overtime and non-overtime weeks or days (CDLE 2026 poster).
- **Other rule:** COMPS Order covers all private-sector work unless exempted; the pre-2020 four-industry limit no longer applies (CDLE INFO #1).
- **Exceptions (not defaults):**
  - Agriculture: overtime after 48 hours per week (56 at some highly seasonal sites), with extra breaks/pay on long days (CDLE 2026 poster). A secondary compilation lists 54/56 - CDLE poster used. (sources: [CO-CDLE-POSTER-2026](https://cdle.colorado.gov/sites/cdle/files/2026_comps_order_poster_english_%5Baccessible%5D.pdf), [X-NALC](https://nationalaglawcenter.org/state-compilations/agpay/overtime/))
  - Some (not all) jobs in health care, ski operations and heavy vehicle driving are partly or fully exempt from overtime (COMPS Rules 2.3-2.4). (sources: [CO-CDLE-POSTER-2026](https://cdle.colorado.gov/sites/cdle/files/2026_comps_order_poster_english_%5Baccessible%5D.pdf))
  - Executive/administrative/professional exemption requires salary of at least $57,784 in 2026 (salary, not hourly pay) plus duties test. (sources: [CO-CDLE-POSTER-2026](https://cdle.colorado.gov/sites/cdle/files/2026_comps_order_poster_english_%5Baccessible%5D.pdf))
  - DOL WHD table says the COMPS overtime provisions apply to retail/service, commercial support, food/beverage and health/medical industries; CDLE states COMPS covers all private-sector work. CDLE treated as controlling; DOL note appears to reflect the pre-2020 Minimum Wage Order. (sources: [CO-INFO1-2021](https://cdle.colorado.gov/sites/cdle/files/INFO%20%231%20COMPS%20Order%20%2337%20(2021)%20%5Baccessible%5D.pdf), [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
- **MVP rule:** Enter hours per day. weekly_OT = max(0, total - 40). daily_OT = sum over days of max(0, hours_day - 12). OT hours = max(weekly_OT, daily_OT) (greater-of; no double counting), paid at 1.5x. If any shift runs more than 12 consecutive hours across midnight or with short breaks, ask for shift start/end times and add the consecutive-hours calculation to the greater-of set.
- **Do not implement as default:** Agricultural workers (48/56-hour thresholds); Health care, ski and heavy-vehicle exemptions; Exempt status (2026 salary floor $57,784 plus duties); 12-consecutive-hour rule for overnight/split shifts (needs shift times).
- **Extra user inputs (special cases only):** Any single shift longer than 12 hours, or crossing midnight? (then ask start/end times); Agricultural worker? (show caveat)
- **Effective date:** COMPS Order #40 (7 CCR 1103-1) adopted Dec. 8, 2025, effective Feb. 1, 2026 (CDLE 2026 poster shows Jan. 1, 2026 for the 2026 minimum wage figure). Replaced COMPS #39.
- **Source last updated:** CDLE 2026 poster (eff. 2026-01-01); DOL table 2026-07-01
- **Confidence:** High; special rules: Medium (agricultural thresholds conflict between CDLE and a secondary compilation). CDLE 2026 poster and COMPS #40 adoption record agree with DOL table on 40/12/12; DOL industry note conflicts with CDLE INFO #1 (CDLE preferred).
- **Second-pass audit notes:** COMPS Order #40 became effective 2026-02-01; 2026 minimum wage $15.16 and exempt salary $57,784. Word file of Order #40 could not be parsed - rule numbers taken from CDLE poster/INFO documents. Source conflict: DOL table's four-industry statement vs CDLE 'all private sector'; agricultural threshold 48/56 (CDLE) vs 54/56 (secondary).

#### Connecticut (CT)

- **Governing law (typical case):** State law and federal FLSA both use 40 hours/week at 1.5x for the typical covered nonexempt employee; the more protective applies.
- **General threshold:** >40 hrs/workweek (state law) | **Multiplier:** 1.5x
- **Daily:** No general daily overtime rule.
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (state law; same threshold as FLSA).
- **Double time:** No general double-time requirement.
- **Seventh day:** In restaurants and hotel restaurants, work on the 7th consecutive day requires premium pay at time and one-half the minimum rate (DOL table; state wage order).
- **Exceptions (not defaults):**
  - Restaurant and hotel-restaurant employees: premium pay on the 7th consecutive day of work at 1.5x the minimum rate (not the regular rate) under the state wage order. (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state), [X-JJKELLER-CT](https://jjkellercompliancenetwork.com/regsense/overtime-connecticut))
  - Statutory exceptions to overtime (CGS 31-76i) include agricultural employees, executive/administrative/professional employees, automobile salespersons, certain drivers/helpers under U.S. DOT hours rules, and outside salespersons. (sources: [CT-DOL-WH](https://portal.ct.gov/dol/Divisions/Wage-and-Workplace-Standards/wage-and-hour), [CT-CGS-31-76c](https://www.cga.ct.gov/current/pub/chap_558.htm#sec_31-76c))
  - No requirement to pay overtime daily, on weekends or holidays except by agreement. (sources: [CT-DOL-WH](https://portal.ct.gov/dol/Divisions/Wage-and-Workplace-Standards/wage-and-hour))
- **MVP rule:** Weekly only: overtime hours = max(0, total hours worked in the fixed 7-day workweek - 40); overtime pay = overtime hours x regular hourly rate x 1.5. No daily overtime, no double time, no weekend/holiday premium.
- **Do not implement as default:** Restaurant/hotel-restaurant seventh-consecutive-day premium; Statutory exceptions in CGS 31-76i.
- **Extra user inputs (special cases only):** Restaurant or hotel-restaurant employee who worked 7 consecutive days? (optional module)
- **Effective date:** Long-standing state provision; no 2025-2026 change identified; confirmed current in DOL WHD state table (updated 2026-07-01).
- **Source last updated:** DOL table updated 2026-07-01
- **Confidence:** High; special rules: Medium-High (restaurant 7th-day premium shown on DOL table; wage-order text not retrieved). CT DOL page, statute, and DOL table agree on weekly 40; 7th-day premium from DOL table plus a secondary summary.
- **Second-pass audit notes:** No 2025-2026 change to overtime identified. Minimum wage is indexed annually (DOL table: $16.94).

#### Hawaii (HI)

- **Governing law (typical case):** State law and federal FLSA both use 40 hours/week at 1.5x for the typical covered nonexempt employee; the more protective applies.
- **General threshold:** >40 hrs/workweek (state law) | **Multiplier:** 1.5x
- **Daily:** No general daily overtime rule.
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (state law; same threshold as FLSA).
- **Double time:** No general double-time requirement.
- **Seventh day:** No general seventh-day premium requirement.
- **Exceptions (not defaults):**
  - An employee earning a guaranteed monthly compensation of $4,000 or more is exempt from the state minimum wage and overtime law (raised from $2,000 by Act 73 (2024), effective June 21, 2024 per a secondary report). (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state), [X-BLOOMBERG-HI](https://news.bloombergtax.com/payroll/hawaii-updates-compensation-threshold-for-wage-hour-exemption))
  - Domestic service workers are subject to Hawaii minimum wage and overtime (Act 248 (2013)). (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
  - State law excludes FLSA-covered employment unless the state wage rate is higher than the federal rate (it is: $16.00 vs $7.25). (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
  - Reported by secondary sources: agricultural employees overtime after 48 hours (NALC compilation cites HRS 387-3; a vendor page says 48 hours in selected workweeks); and state/county public-works construction under Chapter 104 HRS requires daily overtime after 8 hours plus weekend/holiday premium (vendor pages). Neither was verified from the statute text in this pass. (sources: [X-NALC](https://nationalaglawcenter.org/state-compilations/agpay/overtime/), [X-JIBBLE-HI](https://www.jibble.io/?p=216950), [X-HARVEST-HI](https://www.getharvest.com/calculators/overtime-laws-hawaii))
- **MVP rule:** Weekly only: overtime hours = max(0, total hours worked in the fixed 7-day workweek - 40); overtime pay = overtime hours x regular hourly rate x 1.5. No daily overtime, no double time, no weekend/holiday premium.
- **Do not implement as default:** Exempt status via $4,000 guaranteed monthly compensation; Agricultural employees (48-hour threshold, reported); Public-works construction (Ch. 104 daily overtime, reported).
- **Extra user inputs (special cases only):** Guaranteed monthly pay of $4,000 or more? (exempt screening)
- **Effective date:** HRS 387-3 (weekly 40, long-standing). Exempt-compensation threshold raised to $4,000/month by Act 73 (2024) (secondary source dates it June 21, 2024).
- **Source last updated:** DOL table updated 2026-07-01
- **Confidence:** High; special rules: Medium (agricultural and public-works details from secondary sources). DOL table confirms weekly 40 and the $4,000 exemption; HRS 387-3 URL not opened.
- **Second-pass audit notes:** Recent change: exempt-compensation threshold doubled to $4,000/month (2024). Minimum wage $16.00 in 2026, scheduled $18.00 on 2028-01-01 (secondary) - affects regular-rate floor only. Agricultural 48-hour rule details differ between secondary sources (48 hrs generally vs 48 hrs in selected workweeks) - verify HRS 387-3 text.

#### Kansas (KS)

- **Governing law (typical case):** Federal FLSA governs the typical case; Kansas state overtime (46 hrs) applies only where the employer/employee is not FLSA-covered (K.S.A. 44-1202(d), 44-1204(c)(1); Brown v. Ford Storage).
- **General threshold:** >40 hrs (FLSA - typical covered employer); >46 hrs (K.S.A. 44-1204, only employers/employees NOT covered by FLSA) | **Multiplier:** 1.5x
- **Daily:** No daily overtime rule.
- **Weekly:** Federal FLSA weekly rule (40 hrs) governs the typical case; state statute threshold (46) applies only where FLSA does not.
- **Double time:** No double-time requirement.
- **Seventh day:** No seventh-day premium requirement.
- **Exceptions (not defaults):**
  - K.S.A. 44-1204(a): 1.5x after 46 hours per week - but 'employer' under the Kansas law excludes any employer subject to the FLSA, and FLSA-covered employees are excluded from the state overtime section. Kansas Court of Appeals confirmed FLSA-covered employers owe no state overtime. (sources: [KS-KSA-44-1204](https://www.kslegislature.gov/b2025_26/laws/044_000_0000_chapter/044_012_0000_article/044_012_0004_section/044_012_0004_k/), [KS-KSA-44-1202](https://www.kslegislature.gov/b2025_26/laws/044_000_0000_chapter/044_012_0000_article/044_012_0002_section/044_012_0002_k/), [KS-COA-BROWN](https://30jd.kscourts.gov/Cases-Decisions/Decisions/Published/Brown-v-Ford-Storage-and-Moving-Co-Inc), [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
  - Federal FLSA exemptions and special FLSA rules still apply (EAP salary/duties tests, police/fire and hospital/nursing-home special rules, etc.); these are federal, not state-specific. (sources: [FED-DOL-TOPIC](https://www.dol.gov/general/topic/workhours/overtime), [FED-DOL-RULE](https://www.dol.gov/agencies/whd/overtime/rulemaking))
- **MVP rule:** Weekly FLSA rule (40 hours, 1.5x). Display a note: Kansas state law sets 46 hours but applies only to employers/employees not covered by the FLSA; most workers use 40.
- **Do not implement as default:** 46-hour state threshold (non-FLSA-covered employers only); Emergency-medical-services and other statutory alternates in K.S.A. 44-1204(b).
- **Extra user inputs (special cases only):** (Optional) Is your employer covered by the FLSA? Default yes; if the user answers 'no/unsure', keep 40 and show the 46-hour note.
- **Effective date:** K.S.A. 44-1204 (in force since Jan. 1, 1978 per statute text); no 2025-2026 change identified; DOL WHD table (2026-07-01) lists no Kansas premium-pay requirement and notes state law excludes FLSA-covered employment.
- **Source last updated:** DOL table updated 2026-07-01
- **Confidence:** High. Statute text, state appellate opinion, and DOL table agree on the coverage carve-out.
- **Second-pass audit notes:** Verify whether K.S.A. 44-1204 was amended in the 2026 session (URL points to the 2025-26 biennium code; no amendment seen).

#### Kentucky (KY)

- **Governing law (typical case):** State law and federal FLSA both use 40 hours/week at 1.5x for the typical covered nonexempt employee; the more protective applies.
- **General threshold:** >40 hrs/workweek; plus 7th-day rule | **Multiplier:** 1.5x
- **Daily:** No general daily overtime rule.
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (state law; same threshold as FLSA).
- **Double time:** No general double-time requirement.
- **Seventh day:** Employer who permits an employee to work seven days in one workweek pays time and a half for the time worked on the seventh day; does not apply where the employee is not permitted to work more than 40 hours in the workweek (KRS 337.050; Labor Cabinet poster; DOL table).
- **Other rule:** Per a secondary summary of 803 KAR 1:060, any overtime paid for the seventh day may be credited toward overtime due after 40 hours (no pyramiding).
- **Exceptions (not defaults):**
  - Seventh-day rule (KRS 337.050): 1.5x for time worked on the 7th day of the workweek when the employee works all seven days; not applicable where the employee is not permitted to work more than 40 hours during the workweek. (sources: [KY-LABOR-POSTER](https://elc.ky.gov:443/workplace-standards/Documents/KY%20Wage%20and%20Hour%20Poster%20English.pdf), [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
  - KRS 337.285(2) lists exclusions from the state weekly-overtime provision (e.g., employees of retail stores; restaurant, hotel and motel operations; certain FLSA-exempt categories) per a statute reprint that may lag the current KRS - verify; FLSA overtime still applies to covered employees. (sources: [KY-KRS-337.285](https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=54508), [X-HRCARE-KY](https://nationwide.hrcare.com/Article.aspx/383/KentuckyOvertimePayLaw))
  - Compensatory time in lieu of overtime is allowed on written request only for employees of certain county/local governments. (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
- **MVP rule:** Default: weekly FLSA/state rule (OT hrs = max(0, total - 40) x 1.5). Optional KY module: if the user worked all 7 days of the workweek AND total hours > 40, OT hours = max(weekly_OT, hours_on_7th_day) (seventh-day overtime credited toward weekly overtime). If total <= 40, no seventh-day premium (per statute text).
- **Do not implement as default:** Seventh-day premium edge cases (KRS 337.050(2) exceptions not fully reviewed); KRS 337.285(2) industry exclusions; Public-sector comp-time rules.
- **Extra user inputs (special cases only):** Did you work all 7 days of your workweek? If yes, hours on the 7th day
- **Effective date:** Long-standing state provision; no 2025-2026 change identified; confirmed current in DOL WHD state table (updated 2026-07-01).
- **Source last updated:** DOL table updated 2026-07-01
- **Confidence:** High; special rules: Medium (scope of 7th-day rule; secondary sources conflict). Labor Cabinet poster text and DOL table agree; one secondary blog claims the 7th-day premium applies regardless of weekly hours - official text preferred.
- **Second-pass audit notes:** Conflict: official text says the seventh-day rule does not apply when the employee is not permitted to work more than 40 hours; a 2026 secondary blog says it applies regardless of weekly hours.

#### Maryland (MD)

- **Governing law (typical case):** State law and federal FLSA both use 40 hours/week at 1.5x for the typical covered nonexempt employee; the more protective applies.
- **General threshold:** >40 hrs/workweek (state law) | **Multiplier:** 1.5x
- **Daily:** No general daily overtime rule.
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (state law; same threshold as FLSA).
- **Double time:** No general double-time requirement.
- **Seventh day:** No general seventh-day premium requirement.
- **Exceptions (not defaults):**
  - Certain farm workers receive overtime for hours over 60 in a week (Maryland Dept. of Labor). (sources: [MD-DOL-OT](https://labor.maryland.gov/labor/wagepay/wpotgenl.shtml), [X-NALC](https://nationalaglawcenter.org/state-compilations/agpay/overtime/))
  - State overtime exclusions listed in a Dept. of Legislative Services fiscal note (2018): employers subject to federal rail laws; nonprofit concert/theater/music festival promoters; specified amusement or recreational establishments; employees whose hours are set by U.S. DOT; certain mechanics/parts/salespersons; taxicab drivers; certain air-carrier employees; farm work, bowling establishments and infirmaries have separate provisions. Historic list - verify current LE 3-415/3-420. (sources: [MD-DLS-FN-2018](https://mgaleg.maryland.gov/2018RS/fnotes/bil_0004/hb0974.pdf), [MD-LE-3-415](https://mgaleg.maryland.gov/mgawebsite/laws/StatuteText?article=gle&section=3-415&enactments=False&archived=False), [MD-LE-3-420](https://mgaleg.maryland.gov/mgawebsite/laws/StatuteText?article=gle&section=3-420&enactments=False&archived=False))
  - Public-works contracts can carry separate daily overtime terms (reported by a vendor page; not verified). (sources: [X-HARVEST-MD](https://www.getharvest.com/calculators/overtime-laws-maryland))
- **MVP rule:** Weekly only: overtime hours = max(0, total hours worked in the fixed 7-day workweek - 40); overtime pay = overtime hours x regular hourly rate x 1.5. No daily overtime, no double time, no weekend/holiday premium.
- **Do not implement as default:** Farm workers (60-hour threshold); Amusement/recreation, bowling, infirmary, taxi, rail and other statutory carve-outs; Public-works contract overtime.
- **Extra user inputs (special cases only):** Farm worker? (show caveat)
- **Effective date:** Long-standing state provision; no 2025-2026 change identified; confirmed current in DOL WHD state table (updated 2026-07-01).
- **Source last updated:** DOL table updated 2026-07-01
- **Confidence:** High; special rules: Medium (statutory exclusions list is from a 2018 fiscal note). Maryland Dept. of Labor page and DOL table agree on weekly 40 and the 60-hour farm rule.
- **Second-pass audit notes:** The Maryland Dept. of Labor overtime page displays an 'Overtime Final Rule' banner (federal 2024 rule, now vacated); Maryland's weekly-40 rule unchanged.

#### Massachusetts (MA)

- **Governing law (typical case):** State law and federal FLSA both use 40 hours/week at 1.5x for the typical covered nonexempt employee; the more protective applies.
- **General threshold:** >40 hrs/workweek (state law) | **Multiplier:** 1.5x
- **Daily:** No general daily overtime rule.
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (state law; same threshold as FLSA).
- **Double time:** No general double-time requirement.
- **Seventh day:** No general seventh-day premium requirement.
- **Exceptions (not defaults):**
  - Employments excluded from state overtime are listed in M.G.L. c.151 1A (many categories; not enumerated in this research); FLSA still applies where the employer is covered. (sources: [MA-MGL-151-1A](https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter151/Section1A), [MA-LAWLIB-OT](https://mass.gov/info-details/massachusetts-law-about-overtime))
  - Retail Sunday/holiday premium pay ended January 1, 2023 (St. 2020, c.358). (sources: [MA-LAWLIB-OT](https://mass.gov/info-details/massachusetts-law-about-overtime))
- **MVP rule:** Weekly only: overtime hours = max(0, total hours worked in the fixed 7-day workweek - 40); overtime pay = overtime hours x regular hourly rate x 1.5. No daily overtime, no double time, no weekend/holiday premium.
- **Do not implement as default:** Excluded employments under c.151 1A (state OT does not apply; FLSA may); Historic Sunday/holiday premium (repealed).
- **Effective date:** Long-standing state provision; no 2025-2026 change identified; confirmed current in DOL WHD state table (updated 2026-07-01).
- **Source last updated:** DOL table updated 2026-07-01
- **Confidence:** High. Mass. Trial Court Law Libraries page, statute citation and DOL table agree; the list of excluded employments was not enumerated.
- **Second-pass audit notes:** Sunday/holiday premium repeal (effective 2023-01-01) is older than the 2025-2026 audit window but is a common source of stale content.

#### Minnesota (MN)

- **Governing law (typical case):** Federal FLSA (40 hours) governs most employers; the state statute sets 48 hours for all employers and matters mainly where FLSA does not cover the worker.
- **General threshold:** >40 hrs (FLSA - covered employers); >48 hrs (Minn. Stat. 177.25 state law) | **Multiplier:** 1.5x
- **Daily:** No daily overtime rule.
- **Weekly:** Federal FLSA weekly rule (40 hrs) governs the typical case; state statute threshold (48) applies only where FLSA does not.
- **Double time:** No double-time requirement.
- **Seventh day:** No seventh-day premium requirement.
- **Exceptions (not defaults):**
  - Minnesota Fair Labor Standards Act requires all employers, regardless of revenue, to pay 1.5x after 48 hours in a workweek (Minn. Stat. 177.25); the federal FLSA requires overtime after 40 for covered employers (interstate commerce, $500,000+ sales, hospitals, nursing homes, schools, government). (sources: [MN-DLI-GUIDE](https://dli.mn.gov/sites/default/files/pdf/overtime.pdf), [MN-DLI-FAQ](https://dli.mn.gov/node/831), [MN-STAT-177.25](https://www.revisor.mn.gov/statutes/cite/177.25))
  - Exclusions from state overtime are in Minn. Stat. 177.23 subd. 7 (including some agricultural employees); agricultural workers not covered by FLSA can be owed overtime after 48 hours. (sources: [MN-STAT-177.23](https://www.revisor.mn.gov/statutes/cite/177.23), [MN-DLI-GUIDE](https://dli.mn.gov/sites/default/files/pdf/overtime.pdf))
  - Federal FLSA exemptions and special FLSA rules still apply (EAP salary/duties tests, police/fire and hospital/nursing-home special rules, etc.); these are federal, not state-specific. (sources: [FED-DOL-TOPIC](https://www.dol.gov/general/topic/workhours/overtime), [FED-DOL-RULE](https://www.dol.gov/agencies/whd/overtime/rulemaking))
- **MVP rule:** Weekly FLSA rule (40 hours, 1.5x). Display a note: Minnesota's own statute uses 48 hours but the federal 40-hour rule governs most employers; agricultural and some small-employer workers may be under the 48-hour rule.
- **Do not implement as default:** 48-hour state threshold (workers not covered by FLSA, e.g., some agricultural workers); Exclusions under Minn. Stat. 177.23 subd. 7.
- **Extra user inputs (special cases only):** (Optional) Employer covered by FLSA / agricultural worker? Default FLSA (40) with the 48-hour note.
- **Effective date:** Minn. Stat. 177.25 (48 hours) long-standing; DOL WHD table updated 2026-07-01 still lists 48; no 2025-2026 amendment identified in this research.
- **Source last updated:** DOL table updated 2026-07-01
- **Confidence:** High. Three Minnesota official sources plus the DOL table agree.
- **Second-pass audit notes:** DLI overtime flyer is dated 'Version 0319' (2019); DOL table (2026-07-01) and NALC compilation (2026-05-06) still show 48, so no change is indicated.

#### Missouri (MO)

- **Governing law (typical case):** Federal FLSA governs the typical FLSA-covered employer; Missouri's state weekly-40 rule covers employers outside FLSA coverage.
- **General threshold:** >40 hrs/workweek (state law) | **Multiplier:** 1.5x
- **Daily:** No general daily overtime rule.
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (state law; same threshold as FLSA).
- **Double time:** No general double-time requirement.
- **Seventh day:** No general seventh-day premium requirement.
- **Exceptions (not defaults):**
  - The Missouri law exempts employment covered by the FLSA and, among others, employees of a retail or service business with gross annual sales under $500,000. (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
  - Premium pay is required after 52 hours in seasonal amusement or recreation businesses. (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
- **MVP rule:** Weekly only: overtime hours = max(0, total hours worked in the fixed 7-day workweek - 40); overtime pay = overtime hours x regular hourly rate x 1.5. No daily overtime, no double time, no weekend/holiday premium.
- **Do not implement as default:** Seasonal amusement/recreation (52-hour threshold); Small retail/service businesses (state law exempt).
- **Effective date:** Long-standing state provision; no 2025-2026 change identified; confirmed current in DOL WHD state table (updated 2026-07-01).
- **Source last updated:** DOL table updated 2026-07-01
- **Confidence:** High. DOL table and RSMo 290.505 citation agree (statute URL not opened).
- **Second-pass audit notes:** DOL table (2026-07-01) shows Missouri minimum wage $15.00 and weekly-40 premium pay with the exemptions above; no overtime change indicated. Recent minimum-wage/sick-leave legislative history was not researched.

#### Nevada (NV)

- **Governing law (typical case):** State law governs for employees paid under 1.5x minimum wage (adds daily trigger); FLSA weekly rule applies to all covered employees.
- **General threshold:** >40 hrs/week for all; PLUS >8 hrs in a workday if regular rate < $18.00/hr (1.5x the $12.00 minimum wage) | **Multiplier:** 1.5x
- **Daily:** Employees paid less than 1.5x the state minimum wage ($18.00/hour while the minimum is $12.00) receive 1.5x for hours over 8 in a workday, unless by mutual agreement they work a scheduled 10 hours per day for 4 calendar days in a scheduled week (NRS 608.018(1)(b)).
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (in addition to the daily rules above).
- **Double time:** No double-time requirement.
- **Seventh day:** No seventh-day premium requirement.
- **Other rule:** Workday = 24 consecutive hours beginning when the employee begins work (NRS 608.0126); it need not be a calendar day. Labor Commissioner Advisory Opinion 2025-07 addresses rolling vs. overlapping workdays (holding not fully reviewed).
- **Other rule:** Labor Commissioner Advisory Opinion 2025-05 (June 25, 2025; advisory, fact-specific): where both daily and weekly overtime could apply, pay whichever yields more overtime hours - daily and weekly overtime are not stacked (e.g., 10 daily OT hours vs 4 weekly OT hours = 10 OT hours; 2 daily vs 4 weekly = 4 OT hours).
- **Other rule:** Minimum wage is a single $12.00 rate since July 1, 2024 (two-tier system eliminated); the $18.00 threshold is recalculated whenever the minimum wage changes.
- **Exceptions (not defaults):**
  - Daily overtime does not apply to employees whose rate is at least 1.5x the minimum wage ($18.00/hour): weekly overtime only (NRS 608.018(2)). (sources: [NV-NRS-608](https://www.leg.state.nv.us/nrs/NRS-608.html#NRS608Sec018), [NV-BULLETIN-2025](https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/25.06.23%20Annual%20Bulletin%20-%20Daily%20Overtime.pdf), [NV-BULLETIN-2026](https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/26.06.29%20Annual%20Bulletin%20-%20Daily%20Overtime.pdf), [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
  - Four 10-hour days by mutual agreement in a scheduled week avoids the daily trigger (NRS 608.018(1)(b)). (sources: [NV-NRS-608](https://www.leg.state.nv.us/nrs/NRS-608.html#NRS608Sec018), [NV-AO-2025-05](https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/AO-2025-05%20Daily%20Overtime%20or%20Weekly%20Overtime.pdf))
  - NRS 608.018(3) lists employees to whom subsections 1-2 do not apply (the Labor Commissioner notes salaried employees are not automatically exempt and must meet an NRS 608.018 exemption; AO 2025-05 presumes the employee is not under a CBA that adequately provides overtime and not on a public-works project governed by NRS 338.020). The full exemption list was not enumerated in this research. (sources: [NV-NRS-608](https://www.leg.state.nv.us/nrs/NRS-608.html#NRS608Sec018), [NV-AO-2025-05](https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/AO-2025-05%20Daily%20Overtime%20or%20Weekly%20Overtime.pdf), [NV-FAQ](https://labor.nv.gov/uploadedFiles/labornvgov/content/About/Frequently_Asked_Questions/Frequently%20Asked%20Questions.pdf))
- **MVP rule:** regular_rate < 18.00 (recompute as 1.5 x current state minimum wage): daily_OT = sum over days of max(0, hours_day - 8); weekly_OT = max(0, total - 40); OT hours = max(daily_OT, weekly_OT) at 1.5x (no stacking, per Labor Commissioner AO 2025-05). regular_rate >= 18.00: weekly_OT only. Treat each entered day as one workday (approximation for overnight/split shifts); ask about a 4x10 agreement only as an optional toggle.
- **Do not implement as default:** Overnight/split shifts (24-hour rolling workday from start of work); Agreed 4x10 schedules; CBA, public-works (NRS 338.020) and other NRS 608.018(3) exemptions; Regular-rate blends when bonuses/differentials push the rate over $18.00.
- **Extra user inputs (special cases only):** Hourly rate (already collected) determines whether the daily rule applies; (Optional) Working an agreed 4x10 schedule?
- **Effective date:** NRS 608.018 (long-standing). Dollar threshold resets with the minimum wage: $12.00 -> $18.00 threshold (Labor Commissioner 2025 bulletin states $18.00; 2026 bulletin posted 2026-06-29 lists $12.00 effective 2026-07-01).
- **Source last updated:** Labor Commissioner 2026 Annual Bulletin posted 2026-06-29; DOL table 2026-07-01
- **Confidence:** High; special rules: Medium (advisory opinions are non-binding; workday interpretation not fully reviewed). Statute text, Labor Commissioner bulletins, and DOL table agree on the rate-based daily trigger.
- **Second-pass audit notes:** 2025 Advisory Opinions 2025-05 and 2025-07 clarified computation/workday questions; 2026 annual bulletin posted 2026-06-29. No statutory amendment to NRS 608.018 identified for 2025-2026 (Legislature meets in odd years; 2025 session outcome not fully reviewed).

#### New York (NY)

- **Governing law (typical case):** State and FLSA both use 40 for most nonexempt workers; state law sets different thresholds for residential and farm workers.
- **General threshold:** >40 hrs/week (most); >44 hrs (residential/live-in employees); farm laborers >52 hrs in 2026 | **Multiplier:** 1.5x
- **Daily:** No daily overtime rule.
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (state law; same threshold as FLSA).
- **Double time:** No double-time requirement.
- **Seventh day:** No general seventh-day premium (domestic workers and some building/industry employees have rest-day rules - see exceptions).
- **Other rule:** Spread-of-hours pay (1 extra hour at minimum wage when the workday spread exceeds 10 hours or there is a split shift) is a separate premium, not overtime (DOL table).
- **Exceptions (not defaults):**
  - Residential ('live-in') workers receive premium pay for hours over 44 in a payroll week. (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
  - Farm laborers: overtime threshold fell to 52 hours per week on Jan. 1, 2026 and drops by 4 hours every other year (48 on 2028-01-01, 44 on 2030-01-01, 40 on 2032-01-01) under NYSDOL's farm-labor overtime regulation (12 NYCRR 190-2.4). (sources: [NY-DOL-PR-20251219](https://dol.ny.gov/node/63846), [NY-DOL-FARM-REGS](https://dol.ny.gov/node/14641))
  - Domestic workers are entitled to 24 hours of consecutive rest each week and receive premium pay if they work during that period; certain factory/mercantile/hotel/restaurant/theater/building employers must provide 24 consecutive hours of rest each week. (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
- **MVP rule:** Default: weekly FLSA/state rule (OT hrs = max(0, total - 40) x 1.5). Optional toggles: live-in/residential employee -> threshold 44; farm laborer -> threshold from schedule (2026-2027: 52; 2028-2029: 48; 2030-2031: 44; 2032+: 40). No daily overtime.
- **Do not implement as default:** Residential/live-in employees (44 hours); Farm laborers (phased threshold); Domestic-worker rest-day premium; Exempt salary thresholds (higher than federal; NYC/LI/Westchester vs. rest of state).
- **Extra user inputs (special cases only):** Live-in/residential employee?; Farm laborer?
- **Effective date:** Farm-labor threshold 52 hrs effective 2026-01-01 (NYSDOL press release 2025-12-19; regulation adopted 2023-02-22). General 40-hour rule long-standing.
- **Source last updated:** NYSDOL press release 2025-12-19; DOL table 2026-07-01
- **Confidence:** High; special rules: High (residential 44, farm 52); other wage-order categories not enumerated. NYSDOL press release and DOL table agree; secondary sources disagree on the 2026 farm threshold (56 and 60 seen) - NYSDOL controls.
- **Second-pass audit notes:** Changed 2026-01-01 (farm 56 -> 52). Scheduled: 48 on 2028-01-01. Secondary sources conflict (Keka: 56 in 2026; NALC: 60) - official NYSDOL release used. DOL table shows NY minimum wage $17.00 (NYC/Nassau/Suffolk/Westchester) and $16.00 elsewhere for 2026.

#### North Carolina (NC)

- **Governing law (typical case):** State law and federal FLSA both use 40 hours/week at 1.5x for the typical covered nonexempt employee; the more protective applies.
- **General threshold:** >40 hrs/workweek (state law) | **Multiplier:** 1.5x
- **Daily:** No general daily overtime rule.
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (state law; same threshold as FLSA).
- **Double time:** No general double-time requirement.
- **Seventh day:** No general seventh-day premium requirement.
- **Exceptions (not defaults):**
  - Premium pay is required after 45 hours a week in seasonal amusement or recreational establishments (DOL table). (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
  - N.C. Gen. Stat. 95-25.14 lists exemptions from the overtime section (95-25.4); how it interacts with FLSA coverage was not verified in this pass. (sources: [NC-NCGS-95-25.14](https://www.ncleg.gov/enactedlegislation/statutes/pdf/bysection/chapter_95/gs_95-25.14.pdf))
- **MVP rule:** Weekly only: overtime hours = max(0, total hours worked in the fixed 7-day workweek - 40); overtime pay = overtime hours x regular hourly rate x 1.5. No daily overtime, no double time, no weekend/holiday premium.
- **Do not implement as default:** Seasonal amusement/recreation (45-hour threshold); NCGS 95-25.14 exemptions.
- **Effective date:** Long-standing state provision; no 2025-2026 change identified; confirmed current in DOL WHD state table (updated 2026-07-01).
- **Source last updated:** DOL table updated 2026-07-01
- **Confidence:** High. DOL table and NCGS 95-25.4/95-25.14 citations agree on weekly 40 (statute PDF not opened).

#### Oregon (OR)

- **Governing law (typical case):** State and FLSA both use 40 hours/week for most workers; Oregon adds industry-specific daily and agricultural rules.
- **General threshold:** >40 hrs/week (most); >10 hrs/day in manufacturing and cannery/dryer/packing plants; farm workers >48 hrs in 2026 (40 from 2027-01-01) | **Multiplier:** 1.5x
- **Daily:** Daily overtime after 10 hours applies only to mills, factories and manufacturing establishments (ORS 652.020) and to non-farm canneries, driers and packing plants (ORS 653.265) - not a general daily rule.
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (state law; same threshold as FLSA).
- **Double time:** No double-time requirement.
- **Seventh day:** No seventh-day premium requirement.
- **Other rule:** Manufacturing establishments: BOLI states daily overtime after 10 hours and a 13-hour daily maximum (ORS 652.020(1)(b)); secondary law-firm reports say BOLI revised its guidance so covered manufacturing employees may be owed both daily and weekly overtime rather than the greater of the two - date/details not confirmed in this research.
- **Exceptions (not defaults):**
  - Agricultural workers: overtime after 55 hours (2023-24), 48 hours from Jan. 1, 2025, and 40 hours from Jan. 1, 2027 (HB 4002 (2022); BOLI). Exemptions include immediate family, certain local hand-harvest piece-rate workers, and others listed by BOLI. (sources: [OR-BOLI-AG](https://oregon.gov/boli/employers/Pages/minimum-wage-and-overtime-in-agriculture.aspx))
  - Non-farm canneries, driers and packing plants: overtime after 10 hours per day (ORS 653.265); on-farm processors primarily handling their own farm's products are excluded from the daily rule but have the agricultural weekly threshold. (sources: [OR-BOLI-AG](https://oregon.gov/boli/employers/Pages/minimum-wage-and-overtime-in-agriculture.aspx), [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
  - Mills, factories and manufacturing establishments: daily overtime after 10 hours (excluding sawmills, planing mills, shingle mills and logging camps); does not apply where a CBA sets different limits (secondary source); supervisors excluded. (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state), [OR-BOLI-MFG](https://www.oregon.gov/boli/employers/Pages/overtime-manufacturing-and-canneries.aspx), [X-OGLETREE-OR](https://ogletree.com/insights-resources/blog-posts/oregon-boli-updates-daily-and-weekly-overtime-guidance-for-manufacturers-and-other-industries))
  - Employees who process or handle any amount of another farmer's crop are owed overtime after 40 hours (state and federal). (sources: [OR-BOLI-AG](https://oregon.gov/boli/employers/Pages/minimum-wage-and-overtime-in-agriculture.aspx))
- **MVP rule:** Default: weekly rule (OT hrs = max(0, total - 40) x 1.5). Optional toggles: (a) manufacturing/cannery/packing-plant worker -> also daily OT after 10 hours (greater-of vs. weekly; flag BOLI guidance change); (b) agricultural worker -> weekly threshold 48 until 2026-12-31, 40 from 2027-01-01.
- **Do not implement as default:** Manufacturing daily overtime (10 hours) and interaction with weekly overtime; Cannery/dryer/packing-plant daily overtime; Agricultural worker thresholds and exemptions; Timber-industry exclusions.
- **Extra user inputs (special cases only):** Manufacturing, cannery, dryer or packing-plant employee?; Agricultural worker?
- **Effective date:** Weekly: ORS 653.261 (long-standing). Agricultural: 48 hours effective 2025-01-01; 40 hours scheduled effective 2027-01-01 (BOLI). Daily 10-hour manufacturing rule: ORS 652.020 (long-standing; BOLI interpretation reportedly updated - date not confirmed).
- **Source last updated:** BOLI agriculture page (accessed 2026-09-20; text states 48 hrs as of 1/1/2025 and 40 hrs from 1/1/2027); DOL table 2026-07-01
- **Confidence:** High; special rules: Medium (manufacturing daily/weekly interplay per secondary reports). BOLI page and DOL table agree on weekly 40, 10-hour daily rule and farm thresholds.
- **Second-pass audit notes:** Changed 2025-01-01 (ag 55 -> 48). SCHEDULED CHANGE: ag threshold drops to 40 on 2027-01-01 - the dataset's effective-date logic must switch on that date. BOLI reportedly changed its interpretation of how daily (10-hr) and weekly overtime interact for manufacturing employers (secondary law-firm reports); verify on BOLI's manufacturing page before implementing that module.

#### Rhode Island (RI)

- **Governing law (typical case):** State and FLSA both use 40 hours/week; Rhode Island adds separate Sunday/holiday time-and-a-half requirements.
- **General threshold:** >40 hrs/week; plus Sunday/holiday premium (separate laws) | **Multiplier:** 1.5x
- **Daily:** No daily overtime rule.
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (state law; same threshold as FLSA).
- **Double time:** No double-time requirement.
- **Seventh day:** No consecutive-day rule; see Sunday/holiday premium.
- **Other rule:** Sunday and certain holiday work: time-and-a-half required under two laws separate from the minimum wage law (DOL table). Non-retail employers pay overtime (over 40) and the Sunday/holiday premium separately (stacking); retail businesses may exclude Sunday/holiday hours paid at 1.5x from the weekly overtime calculation (secondary reports of DLT regulation effective Aug. 17, 2025).
- **Exceptions (not defaults):**
  - Sunday/holiday premium (1.5x) in retail and certain other businesses, under two laws separate from the minimum wage law (DOL table). A DLT regulation effective Aug. 17, 2025 defines 'retail business' (establishments primarily selling goods/services directly to the public at the end of the distribution chain). (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state), [X-LITTLER-RI](https://www.littler.com/news-analysis/asap/rhode-island-updates-regulations-sunday-and-holiday-premium-pay), [X-JJKELLER-RI](https://jjkellercompliancenetwork.com/regsense/overtime-rhode-island))
  - Example (non-retail): 50 hrs incl. 8 on Sunday = 32 hrs straight, 8 hrs at 1.5x (Sunday), 10 hrs at 1.5x (over 40). Retail example: 40 hrs straight + 10 hrs at 1.5x covers both. (sources: [X-LITTLER-RI](https://www.littler.com/news-analysis/asap/rhode-island-updates-regulations-sunday-and-holiday-premium-pay))
  - Reported weekly-overtime exclusions include summer-camp employees, police officers, agricultural workers and car/farm-equipment salespeople (vendor summary; verify RIGL 28-12-4.3). (sources: [X-KEKA-RI](https://www.keka.com/us/compliance/overtime-laws/rhode-island))
- **MVP rule:** Default: weekly rule (OT hrs = max(0, total - 40) x 1.5). Optional module: ask Sunday/holiday hours and whether the employer is a retail business. Non-retail: Sunday/holiday hours get +0.5x premium AND weekly OT premium is computed on total hours (stacked). Retail: pay Sunday/holiday hours at 1.5x, exclude them from the weekly count, then apply weekly OT to the remaining hours over 40.
- **Do not implement as default:** Sunday/holiday premium (retail vs non-retail computation); Which holidays qualify; Exempt categories under RIGL 28-12-4.3.
- **Extra user inputs (special cases only):** Hours worked on Sundays/holidays; Retail business? (consumer-facing, end of distribution chain)
- **Effective date:** Weekly 40: RIGL 28-12-4.1 (long-standing). Sunday/holiday premium regulation defining 'retail business' effective 2025-08-17 (Littler/Vorys/ADP reports).
- **Source last updated:** DOL table updated 2026-07-01
- **Confidence:** High; special rules: Medium (Sunday/holiday computation rests on secondary summaries of the DLT regulation). DOL table and RIGL 28-12-4.1 agree on weekly 40; the DLT regulation text was not opened - multiple law-firm summaries agree.
- **Second-pass audit notes:** Changed 2025-08-17: DLT regulations define 'retail business' and clarify how Sunday/holiday premium interacts with overtime. Minimum wage $16.00 in 2026 (DOL table); $17.00 scheduled 2027-01-01 (secondary).

#### Washington (WA)

- **Governing law (typical case):** State law and federal FLSA both use 40 hours/week at 1.5x for the typical covered nonexempt employee; the more protective applies.
- **General threshold:** >40 hrs/workweek (state law) | **Multiplier:** 1.5x
- **Daily:** No general daily overtime rule.
- **Weekly:** 1.5x the regular rate for hours over 40 in the workweek (state law; same threshold as FLSA).
- **Double time:** No general double-time requirement.
- **Seventh day:** No general seventh-day premium requirement.
- **Exceptions (not defaults):**
  - Premium pay does not apply to employees who request compensating time off in lieu of premium pay (RCW 49.46.130(2)(b); DOL table). (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state), [WA-RCW-49.46.130](https://app.leg.wa.gov/RCW/default.aspx?cite=49.46.130&pdf=true))
  - Agricultural employees: overtime after 40 hours since Jan. 1, 2024 (55 hrs in 2022, 48 in 2023); dairy workers since Nov. 2020. (sources: [WA-LNI-AG](https://lni.wa.gov/workers-rights/agriculture-policies/overtime))
  - EAP salary threshold for 2026 is 2.25x the state minimum wage ($1,541.70/week) for both small and large employers. (sources: [WA-LNI-CHANGES](https://www.lni.wa.gov/workers-rights/wages/overtime/changes-to-overtime-rules))
- **MVP rule:** Weekly only: overtime hours = max(0, total hours worked in the fixed 7-day workweek - 40); overtime pay = overtime hours x regular hourly rate x 1.5. No daily overtime, no double time, no weekend/holiday premium.
- **Do not implement as default:** Compensatory time off in lieu of overtime (employee-requested); Exempt status (2026 salary floor $1,541.70/week plus duties); Other WAC 296-128 provisions (e.g., certain drivers) - not enumerated.
- **Effective date:** Long-standing state provision; no 2025-2026 change identified; confirmed current in DOL WHD state table (updated 2026-07-01).
- **Source last updated:** DOL table updated 2026-07-01
- **Confidence:** High. L&I pages, RCW 49.46.130 and DOL table agree. A 2025 House bill (HB 2052) proposed letting agricultural workers waive overtime; no evidence of enactment was found (L&I page still shows 40 hours).
- **Second-pass audit notes:** Ag phase-in completed 2024-01-01. 2026 exempt-salary threshold raised on 2026-01-01. 2025 bill HB 2052 (ag overtime waiver) - enactment not found; verify.

## 4. Calculator logic (pseudocode - no production code)

**Design principles**
- One router, five engines (`weekly_flsa`, `california`, `colorado`, `alaska`, `nevada`) plus a few optional modules. Engines return hour buckets (`reg`, `ot15`, `dt`); money is computed once at the end.
- Store the rules in one versioned static JSON file bundled with the site (no database). State lookup by slug; the `mvp_rule.engine` and `mvp_rule.params` fields drive the router.
- Overtime counted on **hours actually worked** in the employer's fixed 168-hour workweek; paid leave does not count. Never average across weeks.
- MVP regular rate = the entered hourly rate. (Bonuses, differentials, tips, salaried-nonexempt conversion are Phase 2.)
- **Static-only geolocation note:** browser geolocation returns latitude/longitude, not a state. Without a backend you need either a bundled simplified US-state polygon file with a client-side point-in-polygon test, or a manual dropdown fallback. Always keep the manual selector visible and let it override detection.

```
# ---------------- DATA ----------------
RULES = LOAD("overtime_rules_2026_50_states.json").states        # keyed by slug

# ---------------- INPUT CONTRACT ----------------
state_slug, rate (> 0), hours[1..7]   # hours worked each day of the employer's fixed 7-day workweek, in order (0 allowed)
opts                                   # optional flags, collected only for states that need them (section 5)

# ---------------- ROUTER ----------------
FUNCTION estimate(state_slug, rate, hours, opts):
    rule = RULES[state_slug].mvp_rule
    SWITCH rule.engine:
        "weekly_flsa": r = weekly_engine(rule.params, hours, opts, state_slug)
        "california" : r = california_engine(hours)
        "colorado"   : r = colorado_engine(hours, opts)
        "alaska"     : r = alaska_engine(hours, opts)
        "nevada"     : r = nevada_engine(hours, rate, rule.params, opts)
    r = APPLY_OPTIONAL_MODULES(state_slug, r, hours, opts)          # KY, RI, OR, NY, CT (only when opts set)
    RETURN money(r, rate), NOTES(RULES[state_slug])                 # notes = caveats + do_not_implement_as_default

# ---------------- ENGINES ----------------
FUNCTION weekly_engine(p, hours, opts, slug):                       # 46 states
    threshold = p.weekly_threshold_hours                            # 40 (KS/MN also 40: state 46/48 shown as a note only)
    IF slug == "new-york" AND opts.residential: threshold = 44
    IF slug == "new-york" AND opts.farm:        threshold = NY_FARM_THRESHOLD(today)   # 2026-27: 52, 2028-29: 48, 2030-31: 44, 2032+: 40
    IF slug == "oregon"   AND opts.agricultural: threshold = OR_AG_THRESHOLD(today)    # <= 2026-12-31: 48, >= 2027-01-01: 40
    total = SUM(hours)
    ot15  = MAX(0, total - threshold)
    RETURN {reg: total - ot15, ot15: ot15, dt: 0}

FUNCTION california_engine(hours):
    all_seven = ALL(hours[d] > 0 FOR d IN 1..7)
    reg = ot15 = dt = 0
    FOR d IN 1..7:
        h = hours[d]
        IF d == 7 AND all_seven:                                    # seventh consecutive workday of the workweek
            ot15 += MIN(h, 8);  dt += MAX(h - 8, 0)
        ELSE:
            reg  += MIN(h, 8);  ot15 += MIN(MAX(h - 8, 0), 4);  dt += MAX(h - 12, 0)
    weekly_ot = MAX(0, reg - 40)                                    # only non-premium hours count toward 40
    RETURN {reg: reg - weekly_ot, ot15: ot15 + weekly_ot, dt: dt}   # no pyramiding: one (highest) rate per hour

FUNCTION colorado_engine(hours, opts):
    weekly = MAX(0, SUM(hours) - 40)
    daily  = SUM(MAX(0, h - 12) FOR h IN hours)
    consec = IF opts.shifts THEN HOURS_BEYOND_12_CONSECUTIVE(opts.shifts) ELSE 0
    ot15   = MAX(weekly, daily, consec)                             # whichever produces the greatest pay; no double counting
    RETURN {reg: SUM(hours) - ot15, ot15: ot15, dt: 0}              # Colorado has no double time

FUNCTION alaska_engine(hours, opts):
    IF opts.employer_lt_4_employees OR opts.flexible_work_plan: RETURN weekly_engine(40 only, ...) WITH caveat
    daily = SUM(MAX(0, h - 8) FOR h IN hours)
    reg   = SUM(MIN(h, 8) FOR h IN hours)                           # hours already paid as daily OT are excluded from the weekly count
    weekly = MAX(0, reg - 40)
    ot15  = daily + weekly
    RETURN {reg: SUM(hours) - ot15, ot15: ot15, dt: 0}

FUNCTION nevada_engine(hours, rate, p, opts):                       # p.rate_threshold = 1.5 x current state minimum wage ($18.00 while minimum is $12.00)
    weekly = MAX(0, SUM(hours) - 40)
    IF rate >= p.rate_threshold:  ot15 = weekly
    ELSE:
        daily = IF opts.agreed_4x10 THEN 0 ELSE SUM(MAX(0, h - 8) FOR h IN hours)
        ot15  = MAX(daily, weekly)                                  # Labor Commissioner AO 2025-05 (advisory): pay the more favorable, no stacking
    RETURN {reg: SUM(hours) - ot15, ot15: ot15, dt: 0}

# ---------------- OPTIONAL MODULES (run only when the user opts in) ----------------
MODULE ky_seventh_day (KY):
    IF ALL(hours[d] > 0) AND SUM(hours) > 40:  ot15 = MAX(weekly_ot, hours[7])      # 7th-day hours credited against weekly OT
    # if SUM(hours) <= 40: no premium (statute: rule inapplicable when employee not permitted to work > 40)

MODULE ri_sunday_holiday (RI):                                       # premium (half-time) hours
    IF opts.retail:  premium = sunday_hours + MAX(0, (total - sunday_hours) - 40)
    ELSE:            premium = sunday_hours + MAX(0, total - 40)     # non-retail stacks Sunday/holiday and weekly premiums

MODULE or_manufacturing_daily_10 (OR):
    daily10 = SUM(MAX(0, h - 10) FOR h IN hours)
    ot15 = MAX(weekly_ot, daily10)                                   # FLAG: BOLI guidance may require both; verify before enabling

MODULE ct_restaurant_seventh_day (CT): caveat only in MVP (premium is 1.5x the MINIMUM rate, not the regular rate)

# ---------------- MONEY ----------------
FUNCTION money(r, rate):
    gross         = rate * (r.reg + 1.5 * r.ot15 + 2.0 * r.dt)
    premium_only  = rate * (0.5 * r.ot15 + 1.0 * r.dt)               # keep for a future tax feature
    flsa_required_ot_hours = MAX(0, SUM(hours) - 40)                 # store separately from state-only OT (tax deduction covers only FLSA-required OT)
    RETURN ROUND_HALF_UP(gross, 2), ...
```

**State -> engine map**

| Engine | States |
|---|---|
| `weekly_flsa` | AL, AZ, AR, CT, DE, FL, GA, HI, ID, IL, IN, IA, KS, KY, LA, ME, MD, MA, MI, MN, MS, MO, MT, NE, NH, NJ, NM, NY, NC, ND, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VT, VA, WA, WV, WI, WY |
| `california` | CA |
| `colorado` | CO |
| `alaska` | AK |
| `nevada` | NV |

**Optional modules:** `ky_seventh_day` (KY); `ct_restaurant_seventh_day` (CT); `ri_sunday_holiday` (RI); `or_manufacturing_daily_10` (OR); `or_ag_threshold_schedule` (OR); `ny_residential_44` (NY); `ny_farm_threshold_schedule` (NY).

**Reference test vectors** (each was computed with an independent reference implementation while building this report; use them as unit-test fixtures. Hours are listed Day 1-7 of the workweek.)

| Case | Hours | Total | Expected result | Why |
|---|---|---|---|---|
| Texas (weekly only) | `[9,9,9,9,9,0,0]` | 45 hrs | 5 OT hrs at 1.5x | 5 OT hrs at 1.5x |
| Kansas (default FLSA 40) | `[9,9,9,9,7,0,0]` | 43 hrs | 3 OT hrs at 1.5x | 3 OT hrs (state 46-hr rule would give 0 but applies only to non-FLSA employers) |
| California | `[10,10,10,10,10,0,0]` | 50 hrs | 40 regular, 10 at 1.5x, 0 at 2x | 40 reg, 10 OT at 1.5x, 0 DT (no pyramiding) |
| California | `[13,8,8,8,8,0,0]` | 53 hrs | 40 regular, 4 at 1.5x, 1 at 2x | day 1: 8 reg + 4 OT + 1 DT; total 40 reg, 4 OT, 1 DT |
| California | `[8,8,8,8,8,8,0]` | 48 hrs | 40 regular, 8 at 1.5x, 0 at 2x | weekly OT on hours beyond 40 |
| California | `[8,8,8,8,8,8,8]` | 56 hrs, 7 days | 40 regular, 16 at 1.5x, 0 at 2x | 7th-day first 8 hrs at 1.5x plus 8 weekly OT hrs |
| California | `[8,8,8,8,8,8,10]` | 58 hrs, 7 days | 40 regular, 16 at 1.5x, 2 at 2x | 7th day: 8 hrs at 1.5x + 2 hrs at 2x; plus 8 weekly OT hrs |
| Colorado | `[13,13,13,0,0,0,0]` | 39 hrs | 3 OT hrs at 1.5x | daily 12-hr rule gives 3 OT hrs even though weekly total < 40 |
| Colorado | `[10,10,10,10,10,0,0]` | 50 hrs | 10 OT hrs at 1.5x | weekly rule gives 10 OT hrs (greater-of) |
| Alaska | `[10,10,10,10,10,0,0]` | 50 hrs | 10 OT hrs at 1.5x | daily OT 10 hrs; regular hours 40, so no extra weekly OT |
| Alaska | `[9,9,9,9,9,9,0]` | 54 hrs | 14 OT hrs at 1.5x | 6 daily OT hrs + 8 weekly OT hrs on the remaining 48 regular hrs |
| Nevada, rate $15.00 | `[10,4,12,12,6,0,0]` | 44 hrs | 10 OT hrs at 1.5x | Labor Commissioner AO 2025-05 scenario 1: 10 daily OT hrs > 4 weekly OT hrs |
| Nevada, rate $15.00 | `[9,8,9,4,8,6,0]` | 44 hrs | 4 OT hrs at 1.5x | AO 2025-05 scenario 2: 4 weekly OT hrs > 2 daily OT hrs |
| Nevada, rate $20.00 | `[10,4,12,12,6,0,0]` | 44 hrs | 4 OT hrs at 1.5x | rate >= $18.00: weekly rule only |
| Kentucky 7th-day module | `[6,6,6,6,6,6,6]` | 42 hrs, 7 days | 6 OT hrs at 1.5x | 7th-day hours (6) exceed weekly OT (2); credited, not stacked |
| Kentucky 7th-day module | `[5,5,5,5,5,5,4]` | 34 hrs, 7 days | 0 OT hrs at 1.5x | no premium when total does not exceed 40 (statute text) |
| Rhode Island module, non-retail | `total 50, Sunday 8` |  | 18 half-time premium hours | premium half-time hours: 8 (Sunday) + 10 (over 40) - matches Littler example |
| Rhode Island module, retail | `total 50, Sunday 8` |  | 10 half-time premium hours | premium half-time hours: 8 (Sunday) + 2 (non-Sunday hours over 40) = 10 (40 straight + 10 at 1.5x) |

## 5. Required user inputs

**A. Basic calculation (all states)**

| Input | Notes |
|---|---|
| State | Auto-detected from browser location if permitted; manual dropdown always available and overrides detection. |
| Hourly pay rate | Used as the regular rate in the MVP. |
| Hours worked on each day of your workweek (7 fields) | One field per day, in the order of the employer's fixed workweek. Weekly-only states can show a single "total hours this week" field, but the daily grid is needed for CA, CO, AK, NV (and harmless elsewhere). |
| Confirmation "I am paid hourly / not an exempt salaried manager or professional" | Screening only; the MVP assumes nonexempt. Show a caveat instead of computing if the user says exempt. |

**B. Special-case inputs (show only for the listed state)**

| State | Input | Default if unanswered |
|---|---|---|
| CA | Did you work all 7 days of your workweek? (derived from the daily grid); on an alternative workweek schedule?; agricultural worker? | Standard rules; caveat for AWS/agriculture |
| CO | Any shift longer than 12 hours or crossing midnight? (then ask start/end times for the 12-consecutive-hour rule); agricultural worker? | Daily grid only |
| AK | Employer has fewer than 4 employees?; on a DOLWD-approved flexible work plan? | No / No |
| NV | (Optional) Working an agreed 4x10 schedule? Rate threshold is derived from the hourly rate ($18.00 line). | No |
| KY | Did you work all 7 days? Hours on the 7th day. | Weekly rule only |
| RI | Hours worked on Sundays/holidays; is the employer a retail business? | Weekly rule only |
| CT | Restaurant/hotel-restaurant employee who worked 7 consecutive days? | Caveat only |
| OR | Manufacturing/cannery/dryer/packing-plant employee?; agricultural worker? | Weekly rule only |
| NY | Live-in/residential employee?; farm laborer? | Weekly 40 |
| HI | Guaranteed monthly pay of $4,000 or more? (exempt screening) | Not exempt |
| KS / MN | (Optional) Is your employer covered by the FLSA? | Yes -> 40 hours; show 46/48-hour note |
| MD | Farm worker? | Weekly 40; caveat if yes |

**C. Deliberately excluded from the MVP (Phase 2):** exempt-status wizard, bonuses/commissions/shift differentials, tipped-employee math, salaried-nonexempt conversion, comp time, CBAs, public-sector rules, local ordinances, minors.

## 6. SEO state pages

Titles are ~60 characters; slugs are `/overtime-calculator/<slug>`. Each unique-rule sentence is drawn from the verified rule in section 2/3 - keep it in sync with the JSON.

| State | Page title | H1 | Primary keyword | Secondary keywords | One-sentence unique rule |
|---|---|---|---|---|---|
| Alabama | Alabama Overtime Calculator (2026) - Overtime Pay Rules | Alabama Overtime Calculator | alabama overtime calculator | alabama overtime laws; alabama overtime pay rules 2026; how is overtime calculated in alabama; alabama overtime pay calculator | Alabama has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Alaska | Alaska Overtime Calculator (2026) - Overtime Pay Rules | Alaska Overtime Calculator | alaska overtime calculator | alaska daily overtime; alaska 8 hour overtime rule; alaska overtime laws; alaska overtime pay rules 2026; how is overtime calculated in alaska | Alaska requires 1.5x pay after 8 hours in a day as well as after 40 hours in a week, and hours already paid as daily overtime are not counted again toward the weekly total. |
| Arizona | Arizona Overtime Calculator (2026) - Overtime Pay Rules | Arizona Overtime Calculator | arizona overtime calculator | arizona overtime laws; arizona overtime pay rules 2026; how is overtime calculated in arizona; arizona overtime pay calculator | Arizona has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Arkansas | Arkansas Overtime Calculator (2026) - Overtime Pay Rules | Arkansas Overtime Calculator | arkansas overtime calculator | arkansas overtime laws; arkansas overtime pay rules 2026; how is overtime calculated in arkansas; arkansas overtime pay calculator | Arkansas requires 1.5x pay after 40 hours a week for employers with four or more employees, matching the federal rule. |
| California | California Overtime Calculator (2026) - Overtime Pay Rules | California Overtime Calculator | california overtime calculator | california double time calculator; california daily overtime calculator; california seventh day overtime; california overtime laws; california overtime pay rules 2026 | California pays 1.5x after 8 hours in a day or 40 hours in a week, and double time after 12 hours in a day (and after 8 hours on the seventh consecutive workday). |
| Colorado | Colorado Overtime Calculator (2026) - Overtime Pay Rules | Colorado Overtime Calculator | colorado overtime calculator | colorado 12 hour overtime; colorado daily overtime calculator; colorado overtime laws; colorado overtime pay rules 2026; how is overtime calculated in colorado | Colorado requires 1.5x pay after 40 hours a week, 12 hours in a day, or 12 consecutive hours - whichever produces the higher pay. |
| Connecticut | Connecticut Overtime Calculator (2026) - Overtime Pay Rules | Connecticut Overtime Calculator | connecticut overtime calculator | connecticut restaurant seventh day overtime; connecticut overtime laws; connecticut overtime pay rules 2026; how is overtime calculated in connecticut; connecticut overtime pay calculator | Connecticut requires 1.5x pay after 40 hours a week, and restaurant and hotel-restaurant workers also receive a premium for the seventh consecutive day of work. |
| Delaware | Delaware Overtime Calculator (2026) - Overtime Pay Rules | Delaware Overtime Calculator | delaware overtime calculator | delaware overtime laws; delaware overtime pay rules 2026; how is overtime calculated in delaware; delaware overtime pay calculator | Delaware has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Florida | Florida Overtime Calculator (2026) - Overtime Pay Rules | Florida Overtime Calculator | florida overtime calculator | florida overtime laws; florida overtime pay rules 2026; how is overtime calculated in florida; florida overtime pay calculator | Florida has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Georgia | Georgia Overtime Calculator (2026) - Overtime Pay Rules | Georgia Overtime Calculator | georgia overtime calculator | georgia overtime laws; georgia overtime pay rules 2026; how is overtime calculated in georgia; georgia overtime pay calculator | Georgia has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Hawaii | Hawaii Overtime Calculator (2026) - Overtime Pay Rules | Hawaii Overtime Calculator | hawaii overtime calculator | hawaii overtime exemption $4,000 month; hawaii overtime laws; hawaii overtime pay rules 2026; how is overtime calculated in hawaii; hawaii overtime pay calculator | Hawaii requires 1.5x pay after 40 hours a week, and workers guaranteed at least $4,000 a month in compensation are exempt from state overtime. |
| Idaho | Idaho Overtime Calculator (2026) - Overtime Pay Rules | Idaho Overtime Calculator | idaho overtime calculator | idaho overtime laws; idaho overtime pay rules 2026; how is overtime calculated in idaho; idaho overtime pay calculator | Idaho has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Illinois | Illinois Overtime Calculator (2026) - Overtime Pay Rules | Illinois Overtime Calculator | illinois overtime calculator | illinois overtime laws; illinois overtime pay rules 2026; how is overtime calculated in illinois; illinois overtime pay calculator | Illinois requires 1.5x pay after 40 hours a week for employers with four or more employees. |
| Indiana | Indiana Overtime Calculator (2026) - Overtime Pay Rules | Indiana Overtime Calculator | indiana overtime calculator | indiana overtime laws; indiana overtime pay rules 2026; how is overtime calculated in indiana; indiana overtime pay calculator | Indiana requires 1.5x pay after 40 hours a week for employers with two or more employees. |
| Iowa | Iowa Overtime Calculator (2026) - Overtime Pay Rules | Iowa Overtime Calculator | iowa overtime calculator | iowa overtime laws; iowa overtime pay rules 2026; how is overtime calculated in iowa; iowa overtime pay calculator | Iowa has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Kansas | Kansas Overtime Calculator (2026) - Overtime Pay Rules | Kansas Overtime Calculator | kansas overtime calculator | kansas 46 hour overtime; kansas overtime laws; kansas overtime pay rules 2026; how is overtime calculated in kansas; kansas overtime pay calculator | Kansas' state overtime trigger is 46 hours, but it applies only to employers not covered by the FLSA - most Kansas workers use the federal 40-hour rule. |
| Kentucky | Kentucky Overtime Calculator (2026) - Overtime Pay Rules | Kentucky Overtime Calculator | kentucky overtime calculator | kentucky seventh day overtime; kentucky overtime laws; kentucky overtime pay rules 2026; how is overtime calculated in kentucky; kentucky overtime pay calculator | Kentucky requires 1.5x pay after 40 hours a week, plus time-and-a-half for hours worked on the seventh day of the workweek in covered situations. |
| Louisiana | Louisiana Overtime Calculator (2026) - Overtime Pay Rules | Louisiana Overtime Calculator | louisiana overtime calculator | louisiana overtime laws; louisiana overtime pay rules 2026; how is overtime calculated in louisiana; louisiana overtime pay calculator | Louisiana has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Maine | Maine Overtime Calculator (2026) - Overtime Pay Rules | Maine Overtime Calculator | maine overtime calculator | maine overtime laws; maine overtime pay rules 2026; how is overtime calculated in maine; maine overtime pay calculator | Maine requires 1.5x pay after 40 hours in a workweek. |
| Maryland | Maryland Overtime Calculator (2026) - Overtime Pay Rules | Maryland Overtime Calculator | maryland overtime calculator | maryland overtime laws; maryland overtime pay rules 2026; how is overtime calculated in maryland; maryland overtime pay calculator | Maryland requires 1.5x pay after 40 hours a week; some farm workers receive overtime only after 60 hours. |
| Massachusetts | Massachusetts Overtime Calculator (2026) - Overtime Pay Rules | Massachusetts Overtime Calculator | massachusetts overtime calculator | massachusetts overtime laws; massachusetts overtime pay rules 2026; how is overtime calculated in massachusetts; massachusetts overtime pay calculator | Massachusetts requires 1.5x pay after 40 hours a week; the old Sunday and holiday premium pay requirement for retail ended in 2023. |
| Michigan | Michigan Overtime Calculator (2026) - Overtime Pay Rules | Michigan Overtime Calculator | michigan overtime calculator | michigan overtime laws; michigan overtime pay rules 2026; how is overtime calculated in michigan; michigan overtime pay calculator | Michigan requires 1.5x pay after 40 hours a week for employers with two or more employees. |
| Minnesota | Minnesota Overtime Calculator (2026) - Overtime Pay Rules | Minnesota Overtime Calculator | minnesota overtime calculator | minnesota 48 hour overtime; minnesota overtime laws; minnesota overtime pay rules 2026; how is overtime calculated in minnesota; minnesota overtime pay calculator | Minnesota's state overtime threshold is 48 hours, but the federal 40-hour rule governs most employers. |
| Mississippi | Mississippi Overtime Calculator (2026) - Overtime Pay Rules | Mississippi Overtime Calculator | mississippi overtime calculator | mississippi overtime laws; mississippi overtime pay rules 2026; how is overtime calculated in mississippi; mississippi overtime pay calculator | Mississippi has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Missouri | Missouri Overtime Calculator (2026) - Overtime Pay Rules | Missouri Overtime Calculator | missouri overtime calculator | missouri overtime laws; missouri overtime pay rules 2026; how is overtime calculated in missouri; missouri overtime pay calculator | Missouri's overtime law requires 1.5x pay after 40 hours a week, but seasonal amusement and recreation businesses use a 52-hour threshold and the FLSA governs most employers. |
| Montana | Montana Overtime Calculator (2026) - Overtime Pay Rules | Montana Overtime Calculator | montana overtime calculator | montana overtime laws; montana overtime pay rules 2026; how is overtime calculated in montana; montana overtime pay calculator | Montana requires 1.5x pay after 40 hours a week. |
| Nebraska | Nebraska Overtime Calculator (2026) - Overtime Pay Rules | Nebraska Overtime Calculator | nebraska overtime calculator | nebraska overtime laws; nebraska overtime pay rules 2026; how is overtime calculated in nebraska; nebraska overtime pay calculator | Nebraska has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Nevada | Nevada Overtime Calculator (2026) - Overtime Pay Rules | Nevada Overtime Calculator | nevada overtime calculator | nevada daily overtime calculator; nevada 8 hour overtime rule; nevada overtime laws; nevada overtime pay rules 2026; how is overtime calculated in nevada | Nevada requires 1.5x pay after 8 hours in a workday for employees earning under $18.00 an hour, and after 40 hours a week for everyone. |
| New Hampshire | New Hampshire Overtime Calculator (2026) - Overtime Pay Rules | New Hampshire Overtime Calculator | new hampshire overtime calculator | new hampshire overtime laws; new hampshire overtime pay rules 2026; how is overtime calculated in new hampshire; new hampshire overtime pay calculator | New Hampshire requires 1.5x pay after 40 hours a week. |
| New Jersey | New Jersey Overtime Calculator (2026) - Overtime Pay Rules | New Jersey Overtime Calculator | new jersey overtime calculator | new jersey overtime laws; new jersey overtime pay rules 2026; how is overtime calculated in new jersey; new jersey overtime pay calculator | New Jersey requires 1.5x pay after 40 hours a week. |
| New Mexico | New Mexico Overtime Calculator (2026) - Overtime Pay Rules | New Mexico Overtime Calculator | new mexico overtime calculator | new mexico overtime laws; new mexico overtime pay rules 2026; how is overtime calculated in new mexico; new mexico overtime pay calculator | New Mexico requires 1.5x pay after 40 hours a week. |
| New York | New York Overtime Calculator (2026) - Overtime Pay Rules | New York Overtime Calculator | new york overtime calculator | new york farm worker overtime; new york live-in employee overtime 44 hours; new york overtime laws; new york overtime pay rules 2026; how is overtime calculated in new york | New York uses 40 hours a week for most workers, 44 for residential (live-in) workers, and a farm-worker overtime threshold that fell to 52 hours in 2026. |
| North Carolina | North Carolina Overtime Calculator (2026) - Overtime Pay Rules | North Carolina Overtime Calculator | north carolina overtime calculator | north carolina overtime laws; north carolina overtime pay rules 2026; how is overtime calculated in north carolina; north carolina overtime pay calculator | North Carolina requires 1.5x pay after 40 hours a week; seasonal amusement and recreation businesses use a 45-hour threshold. |
| North Dakota | North Dakota Overtime Calculator (2026) - Overtime Pay Rules | North Dakota Overtime Calculator | north dakota overtime calculator | north dakota overtime laws; north dakota overtime pay rules 2026; how is overtime calculated in north dakota; north dakota overtime pay calculator | North Dakota requires 1.5x pay after 40 hours a week. |
| Ohio | Ohio Overtime Calculator (2026) - Overtime Pay Rules | Ohio Overtime Calculator | ohio overtime calculator | ohio overtime laws; ohio overtime pay rules 2026; how is overtime calculated in ohio; ohio overtime pay calculator | Ohio requires 1.5x pay after 40 hours a week, tracking the federal FLSA. |
| Oklahoma | Oklahoma Overtime Calculator (2026) - Overtime Pay Rules | Oklahoma Overtime Calculator | oklahoma overtime calculator | oklahoma overtime laws; oklahoma overtime pay rules 2026; how is overtime calculated in oklahoma; oklahoma overtime pay calculator | Oklahoma has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Oregon | Oregon Overtime Calculator (2026) - Overtime Pay Rules | Oregon Overtime Calculator | oregon overtime calculator | oregon manufacturing overtime 10 hours; oregon agricultural overtime 2026; oregon overtime laws; oregon overtime pay rules 2026; how is overtime calculated in oregon | Oregon requires 1.5x pay after 40 hours a week, with a 10-hour daily rule for manufacturing and cannery/packing workers and a 48-hour farm-worker threshold in 2026. |
| Pennsylvania | Pennsylvania Overtime Calculator (2026) - Overtime Pay Rules | Pennsylvania Overtime Calculator | pennsylvania overtime calculator | pennsylvania overtime laws; pennsylvania overtime pay rules 2026; how is overtime calculated in pennsylvania; pennsylvania overtime pay calculator | Pennsylvania requires 1.5x pay after 40 hours a week. |
| Rhode Island | Rhode Island Overtime Calculator (2026) - Overtime Pay Rules | Rhode Island Overtime Calculator | rhode island overtime calculator | rhode island sunday holiday pay; rhode island sunday overtime; rhode island overtime laws; rhode island overtime pay rules 2026; how is overtime calculated in rhode island | Rhode Island requires 1.5x pay after 40 hours a week and separate time-and-a-half for Sunday and certain holiday work. |
| South Carolina | South Carolina Overtime Calculator (2026) - Overtime Pay Rules | South Carolina Overtime Calculator | south carolina overtime calculator | south carolina overtime laws; south carolina overtime pay rules 2026; how is overtime calculated in south carolina; south carolina overtime pay calculator | South Carolina has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| South Dakota | South Dakota Overtime Calculator (2026) - Overtime Pay Rules | South Dakota Overtime Calculator | south dakota overtime calculator | south dakota overtime laws; south dakota overtime pay rules 2026; how is overtime calculated in south dakota; south dakota overtime pay calculator | South Dakota has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Tennessee | Tennessee Overtime Calculator (2026) - Overtime Pay Rules | Tennessee Overtime Calculator | tennessee overtime calculator | tennessee overtime laws; tennessee overtime pay rules 2026; how is overtime calculated in tennessee; tennessee overtime pay calculator | Tennessee has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Texas | Texas Overtime Calculator (2026) - Overtime Pay Rules | Texas Overtime Calculator | texas overtime calculator | texas overtime laws; texas overtime pay rules 2026; how is overtime calculated in texas; texas overtime pay calculator | Texas has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Utah | Utah Overtime Calculator (2026) - Overtime Pay Rules | Utah Overtime Calculator | utah overtime calculator | utah overtime laws; utah overtime pay rules 2026; how is overtime calculated in utah; utah overtime pay calculator | Utah has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |
| Vermont | Vermont Overtime Calculator (2026) - Overtime Pay Rules | Vermont Overtime Calculator | vermont overtime calculator | vermont overtime laws; vermont overtime pay rules 2026; how is overtime calculated in vermont; vermont overtime pay calculator | Vermont requires 1.5x pay after 40 hours a week for employers with two or more employees. |
| Virginia | Virginia Overtime Calculator (2026) - Overtime Pay Rules | Virginia Overtime Calculator | virginia overtime calculator | virginia overtime laws; virginia overtime pay rules 2026; how is overtime calculated in virginia; virginia overtime pay calculator | Virginia follows FLSA standards - 1.5x pay after 40 hours a week - and gives workers a state-law claim for overtime violations. |
| Washington | Washington Overtime Calculator (2026) - Overtime Pay Rules | Washington Overtime Calculator | washington overtime calculator | washington overtime laws; washington overtime pay rules 2026; how is overtime calculated in washington; washington overtime pay calculator | Washington requires 1.5x pay after 40 hours a week for most workers, including farm workers since 2024. |
| West Virginia | West Virginia Overtime Calculator (2026) - Overtime Pay Rules | West Virginia Overtime Calculator | west virginia overtime calculator | west virginia overtime laws; west virginia overtime pay rules 2026; how is overtime calculated in west virginia; west virginia overtime pay calculator | West Virginia requires 1.5x pay after 40 hours a week for employers with six or more employees at one location. |
| Wisconsin | Wisconsin Overtime Calculator (2026) - Overtime Pay Rules | Wisconsin Overtime Calculator | wisconsin overtime calculator | wisconsin overtime laws; wisconsin overtime pay rules 2026; how is overtime calculated in wisconsin; wisconsin overtime pay calculator | Wisconsin requires 1.5x pay after 40 hours a week and has no daily overtime rule. |
| Wyoming | Wyoming Overtime Calculator (2026) - Overtime Pay Rules | Wyoming Overtime Calculator | wyoming overtime calculator | wyoming overtime laws; wyoming overtime pay rules 2026; how is overtime calculated in wyoming; wyoming overtime pay calculator | Wyoming has no state overtime law, so the federal FLSA rule (1.5x pay after 40 hours in a workweek) applies to covered nonexempt workers. |

## 7. Dataset / JSON schema

The full dataset is in `overtime_rules_2026_50_states.json` (top-level keys: `meta`, `sources`, `states`). Field dictionary for each object in `states[]`:

| Field | Type | Meaning |
|---|---|---|
| `state, abbr, slug, url_path` | string | Identity and SEO route (`/overtime-calculator/<slug>`). |
| `law_category` | enum | `flsa_baseline_no_independent_state_ot_rule` | `state_threshold_higher_than_40_but_flsa_governs_typical_case` | `state_weekly_40_rule_no_general_daily_ot` | `state_daily_or_unusual_general_rules`. |
| `governing_law_typical_case` | string | Whether state law or FLSA governs the typical case. |
| `general_rule` | object | `summary`, `weekly_threshold_hours` (40), `overtime_multiplier` (1.5), `applies_to`. |
| `daily_rule / weekly_rule / double_time_rule / seventh_day_rule` | object | `exists`, `details`; daily rule also has `applies_generally` and optional `conditional_on` / `scope`. |
| `other_rules` | string[] | Consecutive-hours, no-stacking, Sunday/holiday and similar rules. |
| `exceptions` | object[] | `text` + `source_ids`. Exceptions are never defaults. |
| `mvp_rule` | object | `engine`, `params`, `optional_modules`, `logic` (plain-language rule for the developer). |
| `do_not_implement_as_default` | string[] | Items requiring extra user questions or excluded from the MVP (also see `meta.universal_do_not_implement_as_default`). |
| `additional_inputs_for_special_cases` | string[] | Extra inputs to ask only in that state. |
| `effective_date, source_last_updated` | string | Effective date basis and last-updated date of the main sources, when stated. |
| `confidence, confidence_special_rules, confidence_notes` | string | High/Medium/Low for the general rule; special-rule confidence noted separately. |
| `audit_flags` | object | `changed_2025_2026`, `scheduled_change`, `source_conflict`, `industry_or_occupation_dependent`, `needs_additional_user_inputs` (booleans) + `audit_notes[]`. |
| `official_source_ids, crosscheck_source_ids` | string[] | Keys into the top-level `sources` registry (`type`: official_federal | official_state | secondary_crosscheck; `retrieved`: fetched | search_result | link_seen). |
| `seo` | object | `page_title`, `h1`, `primary_keyword`, `secondary_keywords[]`, `unique_rule_sentence`, `url_path`. |
| `verified_as_of` | date | 2026-09-20. |

**Example record (California):**

```json
{
  "state": "California",
  "abbr": "CA",
  "slug": "california",
  "url_path": "/overtime-calculator/california",
  "law_category": "state_daily_or_unusual_general_rules",
  "governing_law_typical_case": "State law governs (more protective than FLSA); FLSA weekly rule is subsumed.",
  "general_rule": {
    "summary": ">8 hrs/day, >40 hrs/week, and first 8 hrs on 7th consecutive workday",
    "weekly_threshold_hours": 40,
    "overtime_multiplier": 1.5,
    "applies_to": "Typical nonexempt private-sector employee; exempt status, public-sector, CBA and special-industry rules are not assumed."
  },
  "daily_rule": {
    "exists": true,
    "details": "1.5x for work over 8 hours in a workday up to and including 12 hours; 2x beyond 12 hours (Lab. Code 510(a)).",
    "applies_generally": true
  },
  "weekly_rule": {
    "exists": true,
    "threshold_hours": 40,
    "multiplier": 1.5,
    "details": "1.5x the regular rate for hours over 40 in the workweek (in addition to the daily rules above).",
    "table_text": ">40 hrs/week at 1.5x (excluding hours already paid daily OT/DT)"
  },
  "double_time_rule": {
    "exists": true,
    "details": "2x regular rate for hours over 12 in a workday and for hours over 8 on the seventh consecutive day of work in a workweek."
  },
  "seventh_day_rule": {
    "exists": true,
    "details": "First 8 hours on the seventh consecutive day of work in a workweek: 1.5x; over 8 hours that day: 2x."
  },
  "other_rules": [
    "No pyramiding: the statute does not require combining more than one overtime rate for the same hour (Lab. Code 510(a)); DLSE example: five 10-hour days = 10 overtime hours, not 20.",
    "Workweek = fixed 7 consecutive days (168 hours) chosen by the employer; overtime is counted on hours actually worked (paid leave not counted)."
  ],
  "exceptions": [
    {
      "text": "Alternative workweek schedules adopted under the applicable IWC wage order (e.g., four 10-hour days or three 12-hour days) change when daily overtime applies; the regular rate is still computed on 40 hours.",
      "source_ids": [
        "CA-DIR-FAQ-OT",
        "CA-LC-510"
      ]
    },
    {
      "text": "Agricultural workers have separate overtime rules (DIR publishes a dedicated page).",
      "source_ids": [
        "CA-DIR-FAQ-OT",
        "CA-DIR-AG"
      ]
    },
    {
      "text": "Numerous statutory/wage-order exemptions and exceptions (executive/administrative/professional employees meeting salary and duties tests, many truck drivers, employees under qualifying CBAs, etc.).",
      "source_ids": [
        "CA-DIR-FAQ-OT",
        "CA-DIR-EXEMPT",
        "CA-DIR-EXCEPT"
      ]
    },
    {
      "text": "Historic DLSE opinion (Order 7-80 era) describes an exception to the 7th-day premium for very short weeks (<30 hours/week and <6 hours/day); current wage-order text was not re-verified in this pass - do not implement without checking.",
      "source_ids": [
        "CA-DLSE-1986"
      ]
    }
  ],
  "mvp_rule": {
    "engine": "california",
    "params": {
      "daily_ot_after_hours": 8,
      "daily_dt_after_hours": 12,
      "weekly_ot_after_hours": 40,
      "seventh_day": {
        "ot_first_hours": 8,
        "dt_after_hours": 8
      },
      "no_pyramiding": true,
      "daily_premium_hours_excluded_from_weekly_count": true
    },
    "optional_modules": [],
    "logic": "Enter hours for each of the 7 days of the workweek (in order). If hours are entered on all 7 days, day 7 is the 'seventh consecutive workday'. For days 1-6: reg = min(h,8); OT15 = min(max(h-8,0),4); DT = max(h-12,0). Day 7 (only if all 7 days worked): OT15 = min(h,8); DT = max(h-8,0). weekly_reg_hours = sum of reg for days 1-6; weekly_OT = max(0, weekly_reg_hours - 40) (paid 1.5x, removed from straight time). Pay = rate x (straight + 1.5 x (OT15 + weekly_OT) + 2 x DT). Ignore alternative workweek schedules (show caveat)."
  },
  "do_not_implement_as_default": [
    "Alternative workweek schedules (4x10, 3x12)",
    "Agricultural workers",
    "Truck drivers and other wage-order exceptions",
    "Exempt status (salary >= 2x state minimum wage + duties)",
    "CBA-based exemptions",
    "Possible low-hours exception to 7th-day premium"
  ],
  "additional_inputs_for_special_cases": [
    "Which day starts your employer's workweek (only if the 7th-day rule could apply)",
    "Are you on an alternative workweek schedule? (show caveat if yes)",
    "Agricultural worker? (show caveat)"
  ],
  "effective_date": "Cal. Lab. Code 510 (daily/weekly/7th-day/double-time structure in force since AB 60, effective 2000). Statute text shows no 2025-2026 amendment; DIR FAQ current when fetched.",
  "source_last_updated": "DIR FAQ: no date shown on page; DOL table 2026-07-01",
  "confidence": "High",
  "confidence_special_rules": "Medium (7th-day low-hours edge case; AWS rules not modeled)",
  "confidence_notes": "DIR/DLSE FAQ, Labor Code 510, and DOL table agree on all core triggers.",
  "audit_flags": {
    "changed_2025_2026": false,
    "scheduled_change": false,
    "source_conflict": false,
    "industry_or_occupation_dependent": true,
    "needs_additional_user_inputs": true
  },
  "audit_notes": [
    "No 2025-2026 change to Labor Code 510 found. 2026 state minimum wage is $16.90 (DOL table), which raises the state exempt-salary floor (2x minimum wage; computed $70,304/yr - not verified on an official CA page in this pass)."
  ],
  "official_source_ids": [
    "FED-DOL-STATE-MW",
    "CA-DIR-FAQ-OT",
    "CA-LC-510",
    "CA-DIR-AG",
    "CA-DIR-EXCEPT",
    "CA-DIR-EXEMPT",
    "CA-DLSE-2000",
    "CA-DLSE-1986"
  ],
  "crosscheck_source_ids": [
    "X-NALC"
  ],
  "seo": {
    "page_title": "California Overtime Calculator (2026) - Overtime Pay Rules",
    "h1": "California Overtime Calculator",
    "primary_keyword": "california overtime calculator",
    "secondary_keywords": [
      "california double time calculator",
      "california daily overtime calculator",
      "california seventh day overtime",
      "california overtime laws",
      "california overtime pay rules 2026"
    ],
    "unique_rule_sentence": "California pays 1.5x after 8 hours in a day or 40 hours in a week, and double time after 12 hours in a day (and after 8 hours on the seventh consecutive workday).",
    "url_path": "/overtime-calculator/california"
  },
  "verified_as_of": "2026-09-20"
}
```

**Also in `meta`:** `federal_baseline`, `law_categories`, `confidence_scale`, `engines`, `optional_modules`, `universal_do_not_implement_as_default`, `scheduled_changes` (OR ag 2027-01-01; NY farm 2028-01-01; MI minimum wage 2027-01-01; NV threshold tied to minimum wage), `known_source_conflicts`, `limitations`, `disclaimer`.

## 8. Source audit (official sources only)

`retrieved` shows how deeply I read the source: **fetched** = page/PDF text read; **search_result** = excerpt read in search results; **link_seen** = URL appeared on a fetched official page but the target was not opened (the rule was confirmed elsewhere - see confidence notes).

**Federal**
- `FED-DOL-STATE-MW` - State Minimum Wage Laws (includes 'Premium Pay After Designated Hours' for each state) - U.S. Department of Labor, Wage and Hour Division - <https://www.dol.gov/agencies/whd/minimum-wage/state> - retrieved: fetched - updated: 2026-07-01
- `FED-DOL-OT` - Overtime Pay - U.S. DOL Wage and Hour Division - <https://www.dol.gov/agencies/whd/overtime> - retrieved: search_result
- `FED-DOL-FLSA` - Wages and the Fair Labor Standards Act - U.S. DOL Wage and Hour Division - <https://www.dol.gov/agencies/whd/flsa> - retrieved: search_result
- `FED-DOL-TOPIC` - Overtime (topic page): FLSA 1.5x after 40 hrs; special rules for police/fire and hospitals/nursing homes; 'some states have overtime laws' - U.S. Department of Labor - <https://www.dol.gov/general/topic/workhours/overtime> - retrieved: search_result
- `FED-DOL-RULE` - Final Rule: Restoring and Extending Overtime Protections (2024 rule vacated Nov. 15, 2024; DOL applying $684/wk and $107,432 HCE) - U.S. DOL Wage and Hour Division - <https://www.dol.gov/agencies/whd/overtime/rulemaking> - retrieved: search_result
- `FED-DOL-PR-20260514` - DOL announces technical amendment restoring regulations on exemptions for executive, administrative, professional employees - U.S. Department of Labor - <https://www.dol.gov/newsroom/releases/whd/whd20260514> - retrieved: search_result - updated: 2026-05-14
- `FED-IRS-FS-2026-01` - Fact Sheet FS-2026-01: Q&A on the deduction for qualified overtime compensation (One Big Beautiful Bill Act) - Internal Revenue Service - <https://www.irs.gov/node/154641> - retrieved: search_result - updated: 2026-01

**Alaska**
- `AK-DOLWD-SUMMARY` - Summary of Alaska Wage and Hour Act (Rev. 01-25) - Alaska Dept. of Labor and Workforce Development, Wage and Hour Administration - <https://labor.alaska.gov/lss/forms/Summary_of_Alaska_Wage_and_Hour_Act__Rev_01-25.pdf> - retrieved: fetched - updated: Rev. Jan 2025 (poster text 'Revised January 2024')
- `AK-AS-23.10.060` - AS 23.10.060 Payment for overtime - Alaska State Legislature - <https://www.akleg.gov/basis/statutes.asp#23.10.060> - retrieved: link_seen

**California**
- `CA-DIR-FAQ-OT` - Overtime (DLSE FAQ) - California Dept. of Industrial Relations, Labor Commissioner's Office (DLSE) - <https://www.dir.ca.gov/dlse/FAQ_Overtime.htm> - retrieved: fetched
- `CA-LC-510` - Cal. Labor Code § 510 - California Legislature (leginfo) - <https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=LAB&sectionNum=510> - retrieved: link_seen
- `CA-DIR-AG` - Overtime for Agricultural Workers - California DIR / DLSE - <https://www.dir.ca.gov/dlse/Overtime-for-Agricultural-Workers.html> - retrieved: link_seen
- `CA-DIR-EXCEPT` - Overtime exceptions (FAQ) - California DIR / DLSE - <https://www.dir.ca.gov/dlse/FAQ_OvertimeExceptions.htm> - retrieved: link_seen
- `CA-DIR-EXEMPT` - Overtime exemptions (FAQ) - California DIR / DLSE - <https://www.dir.ca.gov/dlse/FAQ_OvertimeExemptions.htm> - retrieved: link_seen
- `CA-DLSE-1986` - DLSE opinion letter 1986-12-01 (7th-day premium; low-hours exception under then-IWC Order 7-80) - California DIR / DLSE - <https://www.dir.ca.gov/dlse/opinions/1986-12-01.pdf> - retrieved: search_result - updated: 1986-12-01
- `CA-DLSE-2000` - DLSE opinion letter 2000-01-19 (AB 60 overtime; no pyramiding example: 5x10-hr days = 10 OT hrs) - California DIR / DLSE - <https://www.dir.ca.gov/dlse/opinions/2000-01-19.pdf> - retrieved: search_result - updated: 2000-01-19

**Colorado**
- `CO-CDLE-POSTER-2026` - 2026 COMPS Order Poster & Notice (effective 1/1/2026) - Colorado Dept. of Labor and Employment (CDLE), Division of Labor Standards & Statistics - <https://cdle.colorado.gov/sites/cdle/files/2026_comps_order_poster_english_%5Baccessible%5D.pdf> - retrieved: fetched - updated: 2026 (effective 2026-01-01)
- `CO-COMPS-40` - COMPS Order #40, 7 CCR 1103-1 (adopted Dec. 8, 2025; effective Feb. 1, 2026) - CDLE - <https://cdle.colorado.gov/sites/cdle/files/adopted_2026_comps_order_%2340_7_ccr_1103-1_12.8.25.docx> - retrieved: search_result - updated: 2025-12-08
- `CO-INFO1-2021` - INFO #1 (COMPS Order #37): coverage = all private-sector work unless exempt; pre-COMPS industry limits no longer apply - CDLE - <https://cdle.colorado.gov/sites/cdle/files/INFO%20%231%20COMPS%20Order%20%2337%20(2021)%20%5Baccessible%5D.pdf> - retrieved: search_result - updated: 2021
- `CO-INFO1-ES-2021` - Hoja informativa INFO #1 (COMPS #37): overtime on 40 weekly / 12 daily / 12 consecutive hours, whichever yields the greater pay - CDLE - <https://cdle.colorado.gov/sites/cdle/files/Hoja%20Informativa%20y%20Opinion%20Formal%20de%20Orden%20de%20COMPS%20%2337%20%5Baccessible%5D.pdf> - retrieved: search_result - updated: 2021

**Connecticut**
- `CT-DOL-WH` - Wage and Hour: Minimum Wage and Overtime (1.5x after 40 hrs; exceptions) - Connecticut Dept. of Labor, Wage and Workplace Standards - <https://portal.ct.gov/dol/Divisions/Wage-and-Workplace-Standards/wage-and-hour> - retrieved: search_result
- `CT-CGS-31-76c` - Conn. Gen. Stat. § 31-76c (length of workweek) - Connecticut General Assembly - <https://www.cga.ct.gov/current/pub/chap_558.htm#sec_31-76c> - retrieved: link_seen

**Hawaii**
- `HI-HRS-387-3` - HRS § 387-3 (overtime) - Hawaii State Legislature - <https://www.capitol.hawaii.gov/hrscurrent/Vol07_Ch0346-0398/HRS0387/HRS_0387-0003.htm> - retrieved: link_seen

**Illinois**
- `IL-820-ILCS-105-4a` - 820 ILCS 105/4a (Illinois Minimum Wage Law: overtime) - Illinois General Assembly - <https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2400&ChapterID=68&Chapter=EMPLOYMENT&MajorTopic=BUSINESS%20AND%20EMPLOYMENT> - retrieved: link_seen

**Indiana**
- `IN-IC-22-2-2-4` - Ind. Code § 22-2-2-4 (overtime) - Indiana General Assembly - <https://iga.in.gov/laws/2022/ic/titles/22#22-2-2-4> - retrieved: link_seen

**Kansas**
- `KS-KSA-44-1204` - K.S.A. 44-1204 (overtime after 46 hours) - Kansas Legislature - <https://www.kslegislature.gov/b2025_26/laws/044_000_0000_chapter/044_012_0000_article/044_012_0004_section/044_012_0004_k/> - retrieved: link_seen
- `KS-KSA-44-1202` - K.S.A. 44-1202 (definition of 'employer' excludes employers subject to FLSA) - Kansas Legislature - <https://www.kslegislature.gov/b2025_26/laws/044_000_0000_chapter/044_012_0000_article/044_012_0002_section/044_012_0002_k/> - retrieved: link_seen
- `KS-COA-BROWN` - Brown v. Ford Storage & Moving Co. (Kan. Ct. App. 2010): FLSA-covered employers owe no state overtime under K.S.A. 44-1204(a) - Kansas Court of Appeals - <https://30jd.kscourts.gov/Cases-Decisions/Decisions/Published/Brown-v-Ford-Storage-and-Moving-Co-Inc> - retrieved: search_result - updated: 2010-02-12

**Kentucky**
- `KY-LABOR-POSTER` - Kentucky Wage and Hour Poster (7th-day rule text) - Kentucky Labor Cabinet, Dept. of Workplace Standards - <https://elc.ky.gov:443/workplace-standards/Documents/KY%20Wage%20and%20Hour%20Poster%20English.pdf> - retrieved: search_result
- `KY-KRS-337.285` - KRS 337.285 Time and a half for hours over 40 - Kentucky Legislature (LRC) - <https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=54508> - retrieved: link_seen

**Maine**
- `ME-26-MRSA-664` - 26 M.R.S. § 664 (overtime) - Maine Legislature - <https://legislature.maine.gov/statutes/26/title26sec664.html> - retrieved: link_seen

**Maryland**
- `MD-DOL-OT` - Overtime: In General (Maryland Guide to Wage Payment and Employment Standards) - Maryland Dept. of Labor - <https://labor.maryland.gov/labor/wagepay/wpotgenl.shtml> - retrieved: search_result
- `MD-LE-3-415` - Md. Code, Lab. & Empl. § 3-415 - Maryland General Assembly - <https://mgaleg.maryland.gov/mgawebsite/laws/StatuteText?article=gle&section=3-415&enactments=False&archived=False> - retrieved: link_seen
- `MD-LE-3-420` - Md. Code, Lab. & Empl. § 3-420 - Maryland General Assembly - <https://mgaleg.maryland.gov/mgawebsite/laws/StatuteText?article=gle&section=3-420&enactments=False&archived=False> - retrieved: link_seen
- `MD-DLS-FN-2018` - Fiscal and Policy Note, HB 974 (2018): lists statutory overtime exclusions as of 2018 - Maryland Dept. of Legislative Services - <https://mgaleg.maryland.gov/2018RS/fnotes/bil_0004/hb0974.pdf> - retrieved: search_result - updated: 2018

**Massachusetts**
- `MA-LAWLIB-OT` - Massachusetts law about overtime (statutes/regs list: 454 CMR 27.03; c.136 §6 Sunday premium eliminated 1/1/2023; c.151 §1A) - Mass. Trial Court Law Libraries (mass.gov) - <https://mass.gov/info-details/massachusetts-law-about-overtime> - retrieved: search_result
- `MA-MGL-151-1A` - M.G.L. c. 151, § 1A (overtime; excluded employments) - Massachusetts Legislature - <https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter151/Section1A> - retrieved: link_seen

**Michigan**
- `MI-MCL-408.934a` - MCL 408.934a (overtime; Improved Workforce Opportunity Wage Act) - Michigan Legislature - <https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-408-934a> - retrieved: link_seen

**Minnesota**
- `MN-DLI-GUIDE` - A guide to Minnesota's overtime laws (state 48 hrs; federal 40 hrs) - Minnesota Dept. of Labor and Industry - <https://dli.mn.gov/sites/default/files/pdf/overtime.pdf> - retrieved: search_result - updated: version 0319
- `MN-DLI-FAQ` - DLI FAQ: overtime under Minn. Stat. 177.25 (48 hrs) - Minnesota Dept. of Labor and Industry - <https://dli.mn.gov/node/831> - retrieved: search_result
- `MN-STAT-177.25` - Minn. Stat. 177.25 Overtime - Minnesota Revisor of Statutes - <https://www.revisor.mn.gov/statutes/cite/177.25> - retrieved: link_seen
- `MN-STAT-177.23` - Minn. Stat. 177.23 (definitions; subd. 7 exclusions) - Minnesota Revisor of Statutes - <https://www.revisor.mn.gov/statutes/cite/177.23> - retrieved: link_seen

**Missouri**
- `MO-RSMO-290.505` - Mo. Rev. Stat. § 290.505 (overtime) - Missouri Revisor of Statutes - <https://revisor.mo.gov/main/OneSection.aspx?section=290.505&bid=15336&hl=> - retrieved: link_seen

**Montana**
- `MT-MCA-39-3-405` - Mont. Code Ann. § 39-3-405 (overtime) - Montana Legislature - <https://mca.legmt.gov/bills/mca/title_0390/chapter_0030/part_0040/section_0050/0390-0030-0040-0050.html> - retrieved: link_seen

**Nevada**
- `NV-NRS-608` - NRS 608.018 (overtime), NRS 608.0126 (workday) - Nevada Legislature - <https://www.leg.state.nv.us/nrs/NRS-608.html#NRS608Sec018> - retrieved: link_seen
- `NV-BULLETIN-2026` - Daily Overtime 2026 Annual Bulletin (min. wage $12.00 eff. July 1, 2026) - Nevada Office of the Labor Commissioner - <https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/26.06.29%20Annual%20Bulletin%20-%20Daily%20Overtime.pdf> - retrieved: search_result - updated: 2026-06-29
- `NV-BULLETIN-2025` - Daily Overtime 2025 Annual Bulletin ($18.00 threshold stated) - Nevada Office of the Labor Commissioner - <https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/25.06.23%20Annual%20Bulletin%20-%20Daily%20Overtime.pdf> - retrieved: search_result - updated: 2025-06-23
- `NV-AO-2025-05` - Advisory Opinion 2025-05: Daily Overtime or Weekly Overtime Calculation - Nevada Office of the Labor Commissioner - <https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/AO-2025-05%20Daily%20Overtime%20or%20Weekly%20Overtime.pdf> - retrieved: fetched - updated: 2025-06-25
- `NV-AO-2025-07` - Advisory Opinion 2025-07: Interpretation of Workday (rolling vs. overlapping 24-hour periods) - Nevada Office of the Labor Commissioner - <https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/AO-2025-07%20Interpretation%20of%20Workday.pdf> - retrieved: search_result - updated: 2025
- `NV-FAQ` - Nevada Labor Commissioner Frequently Asked Questions (overtime; salaried employees not automatically exempt) - Nevada Office of the Labor Commissioner - <https://labor.nv.gov/uploadedFiles/labornvgov/content/About/Frequently_Asked_Questions/Frequently%20Asked%20Questions.pdf> - retrieved: search_result

**New Hampshire**
- `NH-RSA-279-21` - N.H. RSA 279:21 (overtime) - New Hampshire General Court - <https://gc.nh.gov/rsa/html/XXIII/279/279-21.htm> - retrieved: link_seen

**New York**
- `NY-DOL-PR-20251219` - NYSDOL reminds New Yorkers of decrease in farm worker overtime threshold (52 hrs on Jan. 1, 2026) - New York State Dept. of Labor - <https://dol.ny.gov/node/63846> - retrieved: search_result - updated: 2025-12-19
- `NY-DOL-FARM-REGS` - Farm Laborers Wage Board: final farm-labor overtime regulations (12 NYCRR 190-2.4) - New York State Dept. of Labor - <https://dol.ny.gov/node/14641> - retrieved: search_result - updated: 2023-02-22

**North Carolina**
- `NC-NCGS-95-25.14` - N.C. Gen. Stat. § 95-25.14 (exemptions incl. FLSA-covered employment) and § 95-25.4 (overtime) - North Carolina General Assembly - <https://www.ncleg.gov/enactedlegislation/statutes/pdf/bysection/chapter_95/gs_95-25.14.pdf> - retrieved: link_seen

**North Dakota**
- `ND-NDCC-34-06-04.1` - N.D. Cent. Code § 34-06-04.1 (overtime) - North Dakota Legislative Branch - <https://ndlegis.gov/cencode/t34c06.pdf#nameddest=34-06-04p1> - retrieved: link_seen
- `ND-NDAC-46-02-07` - N.D. Admin. Code ch. 46-02-07 (minimum wage and overtime rules) - North Dakota Legislative Branch - <https://ndlegis.gov/information/acdata/pdf/46-02-07.pdf> - retrieved: link_seen

**Ohio**
- `OH-ORC-4111.03` - Ohio Rev. Code § 4111.03 (overtime) - Ohio Legislative Service Commission - <https://codes.ohio.gov/ohio-revised-code/section-4111.03> - retrieved: link_seen

**Oregon**
- `OR-BOLI-AG` - Minimum Wage and Overtime in Agriculture (48 hrs from 1/1/2025; 40 hrs from 1/1/2027; cannery/packing/manufacturing daily rules) - Oregon Bureau of Labor and Industries - <https://oregon.gov/boli/employers/Pages/minimum-wage-and-overtime-in-agriculture.aspx> - retrieved: fetched
- `OR-BOLI-OT` - Overtime (BOLI employer FAQ) - Oregon Bureau of Labor and Industries - <https://www.oregon.gov/boli/employers/Pages/overtime.aspx> - retrieved: link_seen
- `OR-BOLI-MFG` - Manufacturing and Canneries (BOLI) - Oregon Bureau of Labor and Industries - <https://www.oregon.gov/boli/employers/Pages/overtime-manufacturing-and-canneries.aspx> - retrieved: link_seen

**Pennsylvania**
- `PA-34-PACODE-231.41` - 34 Pa. Code § 231.41 (overtime) - Pennsylvania Code & Bulletin - <https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/034/chapter231/s231.41.html&d=reduce> - retrieved: link_seen

**Rhode Island**
- `RI-RIGL-28-12-4.1` - R.I. Gen. Laws § 28-12-4.1 (overtime) - Rhode Island General Assembly - <https://webserver.rilegislature.gov/Statutes/TITLE28/28-12/28-12-4.1.htm> - retrieved: link_seen

**Utah**
- `UT-UC-34-28-1` - Utah Code § 34-28-1 (listed by a secondary compilation as a 40-hr provision; not corroborated - see conflict note) - Utah Legislature - <https://le.utah.gov/xcode/Title34/Chapter28/34-28-S1.html?v=C34-28-S1_1800010118000101> - retrieved: link_seen

**Vermont**
- `VT-21-VSA-384` - 21 V.S.A. § 384 (overtime) - Vermont Legislature - <https://legislature.vermont.gov/statutes/section/21/005/00384> - retrieved: link_seen

**Virginia**
- `VA-DOLI-VOWA` - Virginia Overtime Wage Act (Va. Code § 40.1-29.2) notice, June 2021 version - Virginia Dept. of Labor and Industry - <https://www.doli.virginia.gov/wp-content/uploads/2021/06/Virginia-Overtime-Wage-Act.pdf> - retrieved: search_result - updated: 2021-06

**Washington**
- `WA-LNI-AG` - Agricultural overtime (40 hrs since 1/1/2024; dairy since 11/2020) - Washington Dept. of Labor & Industries - <https://lni.wa.gov/workers-rights/agriculture-policies/overtime> - retrieved: search_result
- `WA-LNI-CHANGES` - Changes made to Washington's overtime rules (2026 salary thresholds; 2.25x min. wage = $1,541.70/wk) - Washington Dept. of Labor & Industries - <https://www.lni.wa.gov/workers-rights/wages/overtime/changes-to-overtime-rules> - retrieved: search_result - updated: 2026
- `WA-RCW-49.46.130` - RCW 49.46.130 Minimum standards for overtime - Washington State Legislature - <https://app.leg.wa.gov/RCW/default.aspx?cite=49.46.130&pdf=true> - retrieved: link_seen

**West Virginia**
- `WV-WVC-21-5C-3` - W. Va. Code § 21-5C-3 (overtime) - West Virginia Legislature - <https://code.wvlegislature.gov/21-5C-3/> - retrieved: link_seen

**Wisconsin**
- `WI-DWD-274` - Wis. Admin. Code ch. DWD 274 Hours of Work and Overtime - Wisconsin Legislature / DWD - <https://docs.legis.wisconsin.gov/code/admin_code/dwd/270_279/274> - retrieved: search_result
- `WI-DWD-274-CR` - DWD 274 rule analysis (CR 03-053): time-and-a-half after 40; farming and domestic service not subject - Wisconsin DWD - <https://docs.legis.wisconsin.gov/ruletext/CR%2003-053> - retrieved: search_result - updated: 2003

**Non-official sources consulted (cross-check only; no rule rests on them alone except where flagged as unverified)**
- `X-NALC` - Overtime for Agricultural Workers: 50-state compilation (current through May 6, 2026) - lists which states have no state overtime law and statute citations - National Agricultural Law Center (Univ. of Arkansas; USDA partner) - <https://nationalaglawcenter.org/state-compilations/agpay/overtime/>
- `X-LITTLER-RI` - Rhode Island Updates Regulations on Sunday and Holiday Premium Pay - Littler Mendelson - <https://www.littler.com/news-analysis/asap/rhode-island-updates-regulations-sunday-and-holiday-premium-pay>
- `X-OGLETREE-OR` - Oregon BOLI updates daily and weekly overtime guidance for manufacturers and other industries - Ogletree Deakins - <https://ogletree.com/insights-resources/blog-posts/oregon-boli-updates-daily-and-weekly-overtime-guidance-for-manufacturers-and-other-industries>
- `X-JJKELLER-KY` - Overtime Kentucky (RegSense summary of KRS 337.285/337.050 and 803 KAR 1:060) - J. J. Keller Compliance Network - <https://jjkellercompliancenetwork.com/regsense/overtime-kentucky>
- `X-JJKELLER-CT` - Overtime Connecticut (RegSense) - J. J. Keller Compliance Network - <https://jjkellercompliancenetwork.com/regsense/overtime-connecticut>
- `X-JJKELLER-RI` - Overtime Rhode Island (RegSense) - J. J. Keller Compliance Network - <https://jjkellercompliancenetwork.com/regsense/overtime-rhode-island>
- `X-BLOOMBERG-HI` - Hawaii updates compensation threshold for wage-hour exemption (Act 73, eff. June 21, 2024) - Bloomberg Tax - <https://news.bloombergtax.com/payroll/hawaii-updates-compensation-threshold-for-wage-hour-exemption>
- `X-TEAMBRIDGE-UT` - Utah: relies on federal FLSA for overtime (states Utah Labor Commission disclaims OT jurisdiction) - Teambridge (vendor compliance page) - <https://www.teambridge.com/compliance/utah/weekly-overtime-flsa>
- `X-SYFERT-VA` - Va. Code § 40.1-29.2 (2026) text and case annotations - Syfert (statute reprint) - <https://syfert.com/virginia/sections/40.1-29.2.html>
- `X-ALLVOICES-KY` - Kentucky Labor Laws 2026 (claims 7th-day premium applies regardless of weekly hours - conflicts with statute text) - Allvoices blog - <https://www.allvoices.co/blog/kentucky-labor-laws>
- `X-KEKA-NY` - New York overtime state law 2026 (states farm threshold 56 in 2026 - conflicts with NYSDOL) - Keka HR - <https://www.keka.com/us/compliance/overtime-laws/new-york>
- `X-NEXTEP-2026` - 2026 salary threshold increases for overtime exemptions (CA, CO, ME, NY, WA) - Nextep (PEO blog) - <https://www.nextep.com/blog/2026-overtime-exemption-state-updates/>
- `X-JUSTIA-NJ` - N.J. Stat. 34:11-56a4 (statute reprint) - Justia - <https://law.justia.com/codes/new-jersey/title-34/section-34-11-56a4/>
- `X-JUSTIA-NM` - N.M. Stat. § 50-4-22 (statute reprint) - Justia - <https://law.justia.com/codes/new-mexico/chapter-50/article-4/section-50-4-22/>
- `X-KEKA-RI` - Rhode Island overtime laws 2026 (exemptions summary; Sunday/holiday) - Keka HR - <https://www.keka.com/us/compliance/overtime-laws/rhode-island>
- `X-HARVEST-MD` - Overtime laws Maryland (mentions public-works contract daily overtime; bowling 48 hrs) - Harvest (vendor page) - <https://www.getharvest.com/calculators/overtime-laws-maryland>
- `X-HARVEST-HI` - Overtime laws Hawaii (mentions Chapter 104 public-works daily overtime) - Harvest (vendor page) - <https://www.getharvest.com/calculators/overtime-laws-hawaii>
- `X-JIBBLE-HI` - How do you calculate overtime pay in Hawaii? (mentions ag 48 hours in selected workweeks) - Jibble (vendor page) - <https://www.jibble.io/?p=216950>
- `X-HRCARE-KY` - Kentucky Overtime Pay Law (reprint of KRS 337.050 and 337.285 text, incl. 337.285(2) exclusions) - HRCare (statute reprint; may lag current KRS) - <https://nationwide.hrcare.com/Article.aspx/383/KentuckyOvertimePayLaw>

## 9. Final quality check

| Check | Result | Detail |
|---|---|---|
| Exactly 50 states included | PASS | 50 records |
| No state duplicated | PASS | duplicates: none |
| No state missing | PASS | missing: none; unexpected: none |
| Every state has at least one official source | PASS | 50/50 have an official source (DOL table for all; state-specific for 31) |
| All source IDs referenced by states resolve to the registry | PASS | unresolved: none |
| All records dated as of 2026-09-20 | PASS | verified_as_of on every record; DOL table dated 2026-07-01 |
| Executive summary <= 500 words | PASS | 458 words |
| Reference test vectors pass | PASS | 18 vectors asserted while building |

**Distribution:** confidence - {'High': 48, 'Medium': 2}. Audit flags - {'industry_or_occupation_dependent': 15, 'needs_additional_user_inputs': 13, 'changed_2025_2026': 6, 'source_conflict': 8, 'scheduled_change': 2}.

**States whose only official source read in this research is the DOL WHD table (no state-specific official page retrieved) - 19:** Alabama, Arizona, Arkansas, Delaware, Florida, Georgia, Idaho, Iowa, Louisiana, Mississippi, Nebraska, New Jersey, New Mexico, Oklahoma, South Carolina, South Dakota, Tennessee, Texas, Wyoming. For the 16 FLSA-baseline states in this list, the DOL table's silence is a statement of absence (no state overtime law), corroborated by the NALC compilation (through 2026-05-06); AR, NJ and NM have state statutes that were confirmed via the DOL table and NALC citations only (no official statute page opened). Before launch, spot-check each against its state labor agency.

**Explicit verifications requested**
- *State law and federal law not conflated:* every record separates `governing_law_typical_case` (state vs FLSA); KS and MN keep the state 46/48-hour rules out of the default because they apply only where the FLSA does not; the OBBBA tax deduction is noted as FLSA-only.
- *Industry-specific exceptions not presented as the general rule:* OR manufacturing/cannery/agricultural rules, NY residential/farm thresholds, CT restaurant seventh-day, RI Sunday/holiday, KY seventh-day, MD/CO agriculture, MO/NC seasonal amusement are all in `exceptions`/`optional_modules`, and OR's daily rule carries `applies_generally: false`; NV's daily rule is marked conditional on the pay rate.
- *Nothing invented or inferred where an official source was unavailable.* Items I could **not** verify from an official source are labeled as reported/secondary and kept out of defaults: Hawaii agricultural 48-hr and public-works daily rules; Maryland statutory exclusion list (2018 fiscal note) and public-works terms; Rhode Island retail/non-retail computation (law-firm summaries of the DLT regulation) and exclusions; Oregon manufacturing daily/weekly interaction (law-firm reports); Kentucky seventh-day crediting (secondary summary of 803 KAR 1:060); California low-hours seventh-day exception (1986 opinion letter; unverified today); exempt-salary thresholds outside CO and WA; Nevada AO 2025-07 holding; North Carolina and Indiana interaction with FLSA coverage; Kentucky KRS 337.285(2) exclusion list (statute reprint may lag); Nevada NRS 608.018(3) full exemption list.
- *Currency:* all rules are intended as current on 2026-09-20. The DOL table (2026-07-01) is the latest cross-check; anything enacted after that date, and 2026 legislative sessions in states not individually searched, were not reviewed. A broad search for 2026 state overtime changes surfaced only the items flagged in Appendix A.

## Appendix A. Second-pass audit flags (all 50 states)

For every state I asked: *could this rule have changed in 2025-2026, is a change scheduled, do sources disagree, is it industry-dependent, does the calculator need extra inputs?*

| State | Changed 2025-26? | Change scheduled? | Sources disagree? | Industry/occupation dependent? | Extra inputs needed? | Notes |
|---|---|---|---|---|---|---|
| Alabama | no | no | no | no | no | No 2025-2026 change identified. |
| Alaska | no | no | no | YES | YES | Overtime rule unchanged in 2025-2026; minimum wage increased to $14.00 on 2026-07-01 (DOL table). No pending overtime change found. |
| Arizona | no | no | no | no | no | No 2025-2026 change identified. |
| Arkansas | no | no | no | no | no | No 2025-2026 change identified. |
| California | no | no | no | YES | YES | No 2025-2026 change to Labor Code 510 found. 2026 state minimum wage is $16.90 (DOL table), which raises the state exempt-salary floor (2x minimum wage; computed $70,304/yr - not verified on an official CA page in this pass). |
| Colorado | YES | no | YES | YES | YES | COMPS Order #40 became effective 2026-02-01; 2026 minimum wage $15.16 and exempt salary $57,784. Word file of Order #40 could not be parsed - rule numbers taken from CDLE poster/INFO documents. Source conflict: DOL table's four-industry statement vs CDLE 'all private sector'; agricultural threshold 48/56 (CDLE) vs 54/56 (secondary). |
| Connecticut | no | no | no | YES | YES | No 2025-2026 change to overtime identified. Minimum wage is indexed annually (DOL table: $16.94). |
| Delaware | no | no | no | no | no | No 2025-2026 change identified. |
| Florida | no | no | no | no | no | No 2025-2026 change identified. |
| Georgia | no | no | no | no | no | No 2025-2026 change identified. |
| Hawaii | YES | no | YES | YES | YES | Recent change: exempt-compensation threshold doubled to $4,000/month (2024). Minimum wage $16.00 in 2026, scheduled $18.00 on 2028-01-01 (secondary) - affects regular-rate floor only. Agricultural 48-hour rule details differ between secondary sources (48 hrs generally vs 48 hrs in selected workweeks) - verify HRS 387-3 text. |
| Idaho | no | no | no | no | no | No 2025-2026 change identified. |
| Illinois | no | no | no | no | no | No 2025-2026 change identified. |
| Indiana | no | no | no | no | no | No 2025-2026 change identified. |
| Iowa | no | no | no | no | no | No 2025-2026 change identified. |
| Kansas | no | no | no | no | YES | Verify whether K.S.A. 44-1204 was amended in the 2026 session (URL points to the 2025-26 biennium code; no amendment seen). |
| Kentucky | no | no | YES | YES | YES | Conflict: official text says the seventh-day rule does not apply when the employee is not permitted to work more than 40 hours; a 2026 secondary blog says it applies regardless of weekly hours. |
| Louisiana | no | no | no | no | no | No 2025-2026 change identified. |
| Maine | no | no | no | no | no | No 2025-2026 change identified. |
| Maryland | no | no | no | YES | YES | The Maryland Dept. of Labor overtime page displays an 'Overtime Final Rule' banner (federal 2024 rule, now vacated); Maryland's weekly-40 rule unchanged. |
| Massachusetts | no | no | no | YES | no | Sunday/holiday premium repeal (effective 2023-01-01) is older than the 2025-2026 audit window but is a common source of stale content. |
| Michigan | no | no | no | no | no | Minimum wage $13.73 in 2026; scheduled $15.00 on 2027-01-01 (DOL table). Overtime rule unchanged. |
| Minnesota | no | no | no | no | YES | DLI overtime flyer is dated 'Version 0319' (2019); DOL table (2026-07-01) and NALC compilation (2026-05-06) still show 48, so no change is indicated. |
| Mississippi | no | no | no | no | no | No 2025-2026 change identified. |
| Missouri | no | no | no | YES | no | DOL table (2026-07-01) shows Missouri minimum wage $15.00 and weekly-40 premium pay with the exemptions above; no overtime change indicated. Recent minimum-wage/sick-leave legislative history was not researched. |
| Montana | no | no | no | no | no | No 2025-2026 change identified. |
| Nebraska | no | no | no | no | no | No 2025-2026 change identified. |
| Nevada | YES | no | YES | YES | YES | 2025 Advisory Opinions 2025-05 and 2025-07 clarified computation/workday questions; 2026 annual bulletin posted 2026-06-29. No statutory amendment to NRS 608.018 identified for 2025-2026 (Legislature meets in odd years; 2025 session outcome not fully reviewed). |
| New Hampshire | no | no | no | no | no | No 2025-2026 change identified. |
| New Jersey | no | no | no | no | no | No 2025-2026 change identified. |
| New Mexico | no | no | no | no | no | No 2025-2026 change identified. |
| New York | YES | YES | YES | YES | YES | Changed 2026-01-01 (farm 56 -> 52). Scheduled: 48 on 2028-01-01. Secondary sources conflict (Keka: 56 in 2026; NALC: 60) - official NYSDOL release used. DOL table shows NY minimum wage $17.00 (NYC/Nassau/Suffolk/Westchester) and $16.00 elsewhere for 2026. |
| North Carolina | no | no | no | YES | no | No 2025-2026 change identified. |
| North Dakota | no | no | no | no | no | No 2025-2026 change identified. |
| Ohio | no | no | no | no | no | No 2025-2026 change identified. |
| Oklahoma | no | no | no | no | no | No 2025-2026 change identified. |
| Oregon | YES | YES | YES | YES | YES | Changed 2025-01-01 (ag 55 -> 48). SCHEDULED CHANGE: ag threshold drops to 40 on 2027-01-01 - the dataset's effective-date logic must switch on that date. BOLI reportedly changed its interpretation of how daily (10-hr) and weekly overtime interact for manufacturing employers (secondary law-firm reports); verify on BOLI's manufacturing page before implementing that module. |
| Pennsylvania | no | no | no | no | no | No 2025-2026 change identified. |
| Rhode Island | YES | no | no | YES | YES | Changed 2025-08-17: DLT regulations define 'retail business' and clarify how Sunday/holiday premium interacts with overtime. Minimum wage $16.00 in 2026 (DOL table); $17.00 scheduled 2027-01-01 (secondary). |
| South Carolina | no | no | no | no | no | No 2025-2026 change identified. |
| South Dakota | no | no | no | no | no | No 2025-2026 change identified. |
| Tennessee | no | no | no | no | no | No 2025-2026 change identified. |
| Texas | no | no | no | no | no | No 2025-2026 change identified. |
| Utah | no | no | YES | no | no | Source conflict on whether Utah has any state overtime provision; practical result for a typical FLSA-covered worker is the same (40 hours, 1.5x). |
| Vermont | no | no | no | no | no | No 2025-2026 change identified. |
| Virginia | no | no | YES | no | no | DOLI's 2021 Virginia Overtime Wage Act flyer predates the 2022 amendment (HB 1173/SB 631, reported by secondary sources); substantive result for a typical worker is unchanged (40 hours, 1.5x). |
| Washington | no | no | no | YES | no | Ag phase-in completed 2024-01-01. 2026 exempt-salary threshold raised on 2026-01-01. 2025 bill HB 2052 (ag overtime waiver) - enactment not found; verify. |
| West Virginia | no | no | no | no | no | No 2025-2026 change identified. |
| Wisconsin | no | no | no | no | no | No 2025-2026 change identified. |
| Wyoming | no | no | no | no | no | No 2025-2026 change identified. |

**Federal items affecting every state:** DOL restored the 2019 EAP salary level ($684/week; $107,432 HCE) by technical amendment on 2026-05-14 ([FED-DOL-PR-20260514](https://www.dol.gov/newsroom/releases/whd/whd20260514)); the 2025 tax-law overtime deduction covers only FLSA-required premium ([FED-IRS-FS-2026-01](https://www.irs.gov/node/154641)). States with exempt-salary floors above the federal level in 2026 (CA, CO, NY, WA, ME per a secondary source; CO $57,784 and WA $1,541.70/week confirmed by state agencies) matter only for exemption screening, which the MVP does not perform.

### Scheduled changes
- **Oregon - 2027-01-01:** Agricultural overtime threshold falls from 48 to 40 hours per week (HB 4002 (2022); BOLI). (sources: [OR-BOLI-AG](https://oregon.gov/boli/employers/Pages/minimum-wage-and-overtime-in-agriculture.aspx))
- **New York - 2028-01-01:** Farm-laborer overtime threshold falls from 52 to 48 hours (then 44 on 2030-01-01 and 40 on 2032-01-01). (sources: [NY-DOL-PR-20251219](https://dol.ny.gov/node/63846), [NY-DOL-FARM-REGS](https://dol.ny.gov/node/14641))
- **Michigan - 2027-01-01:** Minimum wage scheduled to reach $15.00 (affects the regular-rate floor only; overtime rule unchanged). (sources: [FED-DOL-STATE-MW](https://www.dol.gov/agencies/whd/minimum-wage/state))
- **Nevada - on any minimum-wage change:** Daily-overtime rate threshold = 1.5 x state minimum wage; recompute whenever NRS 608.250 minimum changes ($18.00 while minimum is $12.00). (sources: [NV-NRS-608](https://www.leg.state.nv.us/nrs/NRS-608.html#NRS608Sec018), [NV-BULLETIN-2026](https://labor.nv.gov/uploadedFiles/labornvgov/content/Employer/26.06.29%20Annual%20Bulletin%20-%20Daily%20Overtime.pdf))

### Known source conflicts
- **Colorado:** DOL table says COMPS overtime applies to four industries; CDLE INFO #1 says COMPS covers all private-sector work. *Resolution:* CDLE (primary state agency) used; DOL note appears to reflect the pre-2020 Minimum Wage Order.
- **Colorado:** Agricultural overtime threshold: CDLE 2026 poster says 48 (56 at some highly seasonal sites); NALC compilation says 54/56. *Resolution:* CDLE 2026 poster used.
- **New York:** Farm-worker threshold in 2026: NYSDOL says 52; a vendor page says 56; NALC compilation says 60. *Resolution:* NYSDOL press release (2025-12-19) used.
- **Kentucky:** Seventh-day rule scope: statute text/Labor Cabinet poster say it does not apply when the employee is not permitted to work more than 40 hours; a 2026 blog says it applies regardless of weekly hours. *Resolution:* Official text used; module flagged Medium.
- **Utah:** DOL table lists no Utah overtime provision; NALC compilation lists Utah Code 34-28-1 with a 40-hour rule. *Resolution:* Treated as FLSA baseline (same 40 hrs/1.5x result); verify with Utah Labor Commission.
- **Virginia:** DOLI's 2021 flyer describes the original Virginia Overtime Wage Act; later 2022 amendment (per secondary reports) tied it to FLSA. *Resolution:* Treated as FLSA baseline with a state remedy.
- **Oregon:** Reports that BOLI changed how daily (manufacturing) and weekly overtime interact (both vs greater-of). *Resolution:* Manufacturing module kept optional; verify on BOLI manufacturing page.
- **Hawaii:** Agricultural 48-hour rule details differ between sources (generally vs selected workweeks). *Resolution:* Not implemented; flagged.
- **Nevada:** AO 2025-05 is advisory and fact-specific; AO 2025-07 on rolling/overlapping workdays was only excerpted. *Resolution:* Greater-of implemented; workday approximated by entered day.
