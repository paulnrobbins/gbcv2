/**
 * Grace Bible Church — Missionary Directory (24 entries)
 *
 * PRIVACY DEFAULTS APPLIED PER THE BRIEF:
 *  - Agency / mission / PO-Box addresses ONLY — no personal home addresses
 *  - Children's specific names and birthdays SUPPRESSED by default
 *  - Anniversaries SUPPRESSED by default
 *  - Personal phone numbers OMITTED — contact through agency email
 *  - Sensitive locations (Albania, Thailand, Mozambique): mission address used
 *
 * Paul can override per-entry at his discretion after confirming with each
 * sending agency. The default is conservative.
 *
 * Categories (for filter UI):
 *  - local        : Dayton + Tennessee
 *  - domestic     : other US states
 *  - international: outside the US
 *
 * Focus tags (for secondary filter):
 *  Bible Translation · Campus Ministry · Camp Ministry · Refugee & Immigrant
 *  Anti-Trafficking · Indigenous · Pregnancy Help · Discipleship · Mobilization
 *  Children & Youth · Aviation Support · Pastoral Training · Local Outreach
 */

export type MissionaryRegion = 'local' | 'domestic' | 'international';

export interface Missionary {
  slug: string;
  /** Display name — couple or individual */
  name: string;
  region: MissionaryRegion;
  /** Public-safe location (city, state OR city, country — no street) */
  location: string;
  agency: string;
  /** One- or two-sentence summary */
  role: string;
  /** Optional fuller paragraph for detail view */
  fullDescription?: string;
  /** Public-safe contact — email only, no personal phone */
  email?: string;
  /** Public mailing address — agency, PO box, or mission base. No personal residences. */
  publicAddress?: string;
  /** Optional public website */
  website?: string;
  /** Generalized family note ("4 children at home", "2 adult children, 1 at home") — no names */
  family?: string;
  /** Tags for filtering. Choose 1–3 per missionary. */
  focus: string[];
  /** Prayer requests (1–5 items typically) */
  prayerRequests: string[];
}

export const missionaries: Missionary[] = [
  // ─── LOCAL ─────────────────────────────────────────────────
  {
    slug: 'hostetler',
    name: 'Hollen & Timothy Hostetler',
    region: 'local',
    location: 'Dayton, TN',
    agency: 'Inspiro Arts Alliance (Operation Mobilization)',
    role: 'Content Curator — writes and edits for the Alliance blog, including trip reports, artwork, projects, and training.',
    family: '1 child',
    email: 'hollen.hostetler@om.org',
    focus: ['Mobilization', 'Local Outreach'],
    prayerRequests: [
      'Praise: the Lord is filling roles that had been unfilled',
      "Balance between Hollen's job at Bryan College and her Inspiro role",
      'Wisdom and grace in parenting',
    ],
  },
  {
    slug: 'care-center',
    name: 'The Care Center',
    region: 'local',
    location: 'Dayton + Spring City, TN',
    agency: 'Local non-profit (supported by GBC)',
    role: 'Pregnancy help medical clinic offering testing, OB ultrasound, material support, and Life Skills classes — all at no cost.',
    fullDescription:
      "Carly McAuley, CEO. The Care Center provides pregnancy testing, limited OB ultrasound, STI testing, material support (diapers, formula, clothing, baby gear), Life Skills classes, and 'The EDGE' healthy-choices youth education program — all at no cost. Post-abortion restoration education is also offered.",
    email: 'info@thecarecentertn.org',
    publicAddress: '285 Main St., Dayton, TN 37321 · 250 Neal St., Spring City, TN 37381',
    focus: ['Pregnancy Help', 'Local Outreach'],
    prayerRequests: [
      'Those facing an unexpected pregnancy finding their way to the Center',
      'Continued relationship-building with EDGE students',
      'Effective ministry to those seeking counsel after pregnancy decisions',
      "Staff, volunteers, and Board continuing to shine Christ's light",
    ],
  },
  {
    slug: 'cook',
    name: 'Bruce & Michelle Cook',
    region: 'local',
    location: 'Rockwood, TN (Camp Ozone)',
    agency: 'Camp Ozone',
    role: 'Director of Teen Ministry, Servant Leader Program, and Experiential Ministries at Camp Ozone.',
    fullDescription:
      "Bruce and Michelle invite, supervise, and disciple Camp Ozone's Servant Leaders. Their work includes experiential team building, hospitality, retreats, Homeschool Tuesdays, and multi-day experiential trips.",
    family: '1 child',
    email: 'bruce.cook.ministry@gmail.com',
    publicAddress: '232 Camp Ozone Rd., Rockwood, TN 37854',
    focus: ['Camp Ministry', 'Children & Youth'],
    prayerRequests: [
      "Bruce's continued recovery from Traumatic Brain Injury; Michelle as she supports him",
      'Strength and wisdom in their current ministries',
      'Increased financial support so they can be fully funded',
      "Those touched by Camp Ozone's ministry",
    ],
  },
  {
    slug: 'cornelius',
    name: 'Crista Cornelius',
    region: 'local',
    location: 'Dayton, TN → Taiwan',
    agency: 'SEND International (Global Chinese Ministry)',
    role: 'Chinese Language Teacher Trainer — equipping Mandarin speakers to serve cross-culturally as teachers reaching the unreached.',
    email: 'cop4tcfl@gmail.com',
    focus: ['Mobilization', 'Discipleship'],
    prayerRequests: [
      'Praise: smooth transition to SEND International',
      '100% monthly support by November so she can depart early December',
      'Wisdom setting up secure online training platform',
      'Visa application approval and moving arrangements',
      'Cultural adjustment and getting settled',
    ],
  },
  {
    slug: 'dixon',
    name: 'Adam & Jennifer Dixon',
    region: 'local',
    location: 'Knoxville, TN (UTK Cru)',
    agency: 'Cru',
    role: 'Adam directs Cru ministry at the University of Tennessee, teaches Scripture weekly, and writes Bible studies used by churches and campus ministries worldwide.',
    fullDescription:
      "Adam teaches through books of the Bible at weekly meetings and writes Bible studies used by churches and campus ministries across America, Africa, China, and more. Summers, he teaches at Cru's Institute of Biblical Studies (accredited by DTS and RTS) — Bible Study Methods, Biblical Interpretation, Biblical Communication.",
    family: '3 children',
    email: 'adam.dixon@cru.org',
    website: 'https://www.reachleaders.com',
    focus: ['Campus Ministry', 'Discipleship'],
    prayerRequests: [
      'UTK ministry: staff team doubling from 7 to 14 this year',
      'Adam as he teaches, writes, and leads the growing team',
      'Jennifer overseeing women on the team',
      'Navigating changing campus culture',
    ],
  },
  {
    slug: 'duong',
    name: 'Fred & Juanita Duong',
    region: 'local',
    location: 'Chattanooga, TN',
    agency: 'Wycliffe Bible Translators / SIL Global Sign Languages Team',
    role: 'Fred — Staff Care for SIL GSLT and Wycliffe USA. Juanita — Medical/Health Consultant for SIL GSLT. Based in TN with global travel.',
    family: '2 children',
    email: 'fred_duong@wycliffe.org',
    focus: ['Bible Translation', 'Pastoral Training'],
    prayerRequests: [
      'Establishing staff care in GSLT and learning new Wycliffe USA role',
      "Family's financial and health needs",
      'Creativity and endurance in leading a multicultural team',
      'New staff to fill key positions',
    ],
  },
  {
    slug: 'matthew-habermas',
    name: 'Matthew Habermas',
    region: 'local',
    location: 'Dayton, TN (Cumberland Springs Bible Camp)',
    agency: 'TMM Ministries / Cumberland Springs',
    role: 'Program Director — plans summer camps and spring/fall retreats; writes devotion booklets and Bible studies.',
    email: 'matthew@cumberlandsprings.org',
    publicAddress: '254 Cumberland Springs Camp Rd., Dayton, TN 37321',
    focus: ['Camp Ministry', 'Children & Youth'],
    prayerRequests: [
      'Continued financial support',
      'Wisdom planning camps and retreats',
      'Clarity writing devotions and Bible studies',
      'Building relationships with campers and summer staff',
    ],
  },
  {
    slug: 'hathaway',
    name: 'Mike & Kathy Hathaway',
    region: 'local',
    location: 'Dayton, TN (Cumberland Springs)',
    agency: 'TMM Ministries, Inc.',
    role: 'Office work, gift receipting, cooking, and housekeeping responsibilities for camp.',
    email: 'kathy@cumberlandsprings.org',
    publicAddress: '125 Cumberland Springs Camp Rd., Dayton, TN 37321',
    focus: ['Camp Ministry'],
    prayerRequests: [
      "Thankful for Mike's recovery from heart attack",
      'Thankful for a good summer',
      'Continued role transitions and adjustments',
      'Strength and energy for each day',
    ],
  },
  {
    slug: 'joel-habermas',
    name: 'Joel & Jennifer Habermas',
    region: 'local',
    location: 'Dayton, TN (Cumberland Springs)',
    agency: 'TMM Ministries',
    role: 'Director of Cumberland Springs Bible Camp — sharing God\u2019s Word with children and youth in an outdoor camping environment.',
    family: '4 children',
    email: 'joel@cumberlandsprings.org',
    publicAddress: '125 Cumberland Springs Camp Rd., Dayton, TN 37321',
    focus: ['Camp Ministry', 'Children & Youth'],
    prayerRequests: [
      'Long-term vision for the ministry',
      'Wisdom and grace in leading others',
      'Strength and endurance to complete existing projects',
      'Courage to seek additional supporters',
      'Increased family unity and wisdom in parenting',
    ],
  },
  {
    slug: 'sutherland',
    name: 'Jim & Judy Sutherland',
    region: 'local',
    location: 'Chattanooga, TN + S. Sudan',
    agency: 'Reconciliation Ministries Network',
    role: 'Inner-city ministry in Chattanooga, partnership with the Presbyterian Church of S. Sudan, and mobilization of the African American church for the Great Commission.',
    fullDescription:
      "Three streams of ministry: (1) inner-city ministry in Chattanooga's Westside — evangelism, literature, emergency financial assistance, teaching and pastoral care; (2) partnership with the Presbyterian Church of S. Sudan — Redeemer FM radio station and Grace Theological College campus; (3) mobilization of the African American church for the Great Commission through RMNI.org (75,000+ unique visitors in 2024).",
    email: 'jim@rmni.org',
    website: 'https://www.RMNI.org',
    focus: ['Local Outreach', 'Pastoral Training', 'Discipleship'],
    prayerRequests: [
      'Wisdom to complete the work given (Eph. 2:10)',
      'Caring well for Judy',
      'Redeemer FM on the air and sustained by early 2026',
      "Grace Theological College's campus completion",
      'Workers, fruit, and wisdom in Westside ministry',
    ],
  },
  {
    slug: 'marshall',
    name: 'Rachel Marshall',
    region: 'local',
    location: 'Dayton, TN (Cumberland Springs)',
    agency: 'TMM Ministries, Inc.',
    role: 'Financial Secretary and Operations Director — financial reports, donations, camp fees, marketing support, website, and occasional cooking.',
    family: '2 children',
    email: 'rachel@cumberlandsprings.org',
    publicAddress: 'P.O. Box 455, Dayton, TN 37321',
    focus: ['Camp Ministry'],
    prayerRequests: [
      'Busy fall season at camp and personally',
      'Health for the family',
      'Financial needs being met',
    ],
  },

  // ─── DOMESTIC (other US states) ────────────────────────────
  {
    slug: 'benson',
    name: 'Matt & Melody Benson',
    region: 'domestic',
    location: 'Based in TN (traveling worldwide)',
    agency: 'Operation Mobilization',
    role: 'Senior VP, OM International Organizational Development — provides executive-level leadership for OM as a global organization.',
    family: '3 children (one in NYC, two in college)',
    email: 'drmattbenson@gmail.com',
    focus: ['Mobilization'],
    prayerRequests: [
      'OM Phase 2 work on organizational structure; new international director taking office',
      "Sustainability and resources for OM's mission",
      'Scatter (new org launched last year)',
      'Wisdom and excitement for Matt and Melody entering empty-nest years',
    ],
  },
  {
    slug: 'bodlien',
    name: 'Mark & Joanna Bodlien',
    region: 'domestic',
    location: 'Schroon Lake, NY',
    agency: 'Word of Life',
    role: 'Camp Director for Word of Life Ranch (children) and Ridge (middle school) summer camps; Camp Director for Intersect Winter Remote Camps in OH and NH.',
    family: '4 daughters (all involved in camp this year)',
    email: 'markbodlien@wol.org',
    publicAddress: 'P.O. 600, Schroon Lake, NY 12870',
    focus: ['Camp Ministry', 'Children & Youth'],
    prayerRequests: [
      'Praise: 250+ young people placed their faith in Christ this summer',
      'Praise: serving the Lord as a family',
      'Praise: many opportunities to preach, teach, and lead Bible studies',
      'Wisdom in parenting, leading, and work-ministry balance',
      'The 2026 Winter & Summer camping seasons',
    ],
  },
  {
    slug: 'garrett',
    name: 'Mark & Candy Garrett',
    region: 'domestic',
    location: 'Winchester, KY (serving Senegal Field)',
    agency: 'SIM, USA',
    role: 'Mark manages the Media/Development team for SIM\u2019s home-based staff, producing Scripture videos in Wolof. Candy coaches missionaries in nutrition.',
    email: 'mark.garrett@sim.org',
    focus: ['Mobilization', 'Discipleship'],
    prayerRequests: [
      'Wolof language Facebook page outreach',
      'Recruiting Wolof-speaking writers',
      'Local Christians willing to meet inquirers',
      'New filters for serious inquirers; creative content',
      'Wisdom in streamlined health recommendations for nutrition coaching',
    ],
  },
  {
    slug: 'mceachron',
    name: 'Eric & Rachel McEachron',
    region: 'domestic',
    location: 'Tyrone, GA',
    agency: 'Operation Mobilization',
    role: 'Eric — Director of Recruiting, Placement and Candidate Success. Rachel — Glow Kids Coordinator (outreach to Japanese families in the US).',
    family: '5 children',
    email: 'eric.mceachron@om.org',
    website: 'https://www.glowintl.org',
    focus: ['Mobilization', 'Refugee & Immigrant', 'Children & Youth'],
    prayerRequests: [
      'Eric and OM USA Mobilization team: wisdom in goal-setting and traction',
      'Rachel as mom, homeschool teacher, and Glow leader',
      'OM USA finding rhythm between execution and planning',
      'Family adjusting to new ages and stages',
    ],
  },
  {
    slug: 'kliever',
    name: 'Andrew & Faith Kliever',
    region: 'domestic',
    location: 'Emmalena, KY (Camp Nathanael)',
    agency: 'Scripture Memory Mountain Missions',
    role: 'Andrew — maintenance for 500+ acres and buildings at Camp Nathanael. Faith — homeschooling mom, jumps in where needed.',
    family: '4 children',
    email: 'info@campnathanael.org',
    publicAddress: 'P.O. Box 125, Emmalena, KY 41740',
    focus: ['Camp Ministry'],
    prayerRequests: [
      '~2% (≈$150) still needed for full funding',
      'Safe travels and clear presentation while raising support',
      "Faith's Lyme disease treatment",
      'The school year',
    ],
  },
  {
    slug: 'quakenbush',
    name: 'Steve & Janice Quakenbush',
    region: 'domestic',
    location: 'Grand Rapids, MI',
    agency: 'Wycliffe Bible Translators (assigned to SIL Global)',
    role: 'Director of the Spiritual Life Team for SIL — leading a global staff of ~4,000 closer to God and one another.',
    email: 'steve_quakenbush@sil.org',
    focus: ['Bible Translation', 'Pastoral Training', 'Discipleship'],
    prayerRequests: [
      'Family walking closely with the Lord',
      "Spiritual Life Team's leadership and mandate",
      "God to identify and equip Steve's successor (retiring end of September 2026)",
      'Global Bible translation workforce',
      "All people having access to God's Word in their heart language",
    ],
  },
  {
    slug: 'wright',
    name: 'Katy Wright',
    region: 'domestic',
    location: 'Largo, FL → Uganda',
    agency: 'Word of Life Fellowship',
    role: 'Local Church Support Ministries — training and equipping leaders, discipling Bible Institute ladies, and reaching the youth of Uganda.',
    email: 'kawright@wol.org',
    publicAddress:
      'Word of Life Fellowship — Donations, P.O. Box 600, Schroon Lake, NY 12870 (Ref: Kathryn Wright, 06440S)',
    website: 'https://missions.wol.org/missionaries/',
    focus: ['Children & Youth', 'Discipleship', 'Pastoral Training'],
    prayerRequests: [
      'Praise: salvation decisions, safety in travel, knee recovering well',
      'Ladies Conferences and Medical Camps in Uganda',
      'WOL Uganda — wisdom, guidance, direction',
    ],
  },

  // ─── INTERNATIONAL ─────────────────────────────────────────
  {
    slug: 'karum',
    name: 'Joel & Amy Karum',
    region: 'international',
    location: 'Chiang Rai, Thailand',
    agency: 'Ezekiel Rain',
    role: 'Breaking the cycle of brokenness and exploitation in Thailand — strengthening families, restoring survivors, raising up leaders, and prayer.',
    fullDescription:
      'Ezekiel Rain partners with local churches in Thailand to strengthen families, restore survivors of trafficking, raise up local leaders, and intercede in prayer for the region.',
    family: '4 children',
    email: 'joelk@ezekielrain.com',
    website: 'https://www.ezekielrain.com',
    focus: ['Anti-Trafficking', 'Discipleship'],
    prayerRequests: [
      "Jesus' justice for survivors of trafficking",
      'Wisdom and discernment for the team in counseling and advocacy',
      'Upper Room worship songs igniting worship in Thailand',
      'Real Talk series creating connection, transformation, prevention, and healing',
      'Financial provision and new partners',
    ],
  },
  {
    slug: 'king',
    name: 'Dan & Anne King',
    region: 'international',
    location: 'Cologne, Germany',
    agency: 'Greater Europe Mission',
    role: 'Evangelism and discipleship in Cologne, primarily with refugees and immigrants. Work at \u201CThe Living Room\u201D — Bible studies, German/English groups, cooking classes.',
    family: '3 children (one in college, two at home)',
    email: 'dking@gemission.com',
    focus: ['Refugee & Immigrant', 'Discipleship', 'Local Outreach'],
    prayerRequests: [
      'The Living Room ministry and community connection',
      'English conversation group growth and spiritual depth',
      'Street evangelism opportunities',
      'Continued Discipleship Group growth',
      'Anne as Cologne Area Leader; ministry to refugee women',
      'Wisdom preparing for home ministry assignment starting July 2026',
    ],
  },
  {
    slug: 'koehn',
    name: 'Robert & Karis Koehn',
    region: 'international',
    location: 'Mozambique',
    agency: 'Africa Inland Mission',
    role: 'Church and community workers in discipleship, church leadership development, evangelism, and practical helps.',
    fullDescription:
      "Robert walks alongside church leaders; Karis trains and disciples Sunday school teachers in various churches and teaches Bible storying groups.",
    family: '1 child at home + 2 adult children',
    email: 'robert.koehn@aimint.org',
    publicAddress: 'Africa Inland Mission, PO Box 3611, Peachtree City, GA 30269',
    focus: ['Discipleship', 'Pastoral Training', 'Children & Youth'],
    prayerRequests: [
      'Adult children: sensitivity to the Spirit, wisdom in relationships',
      'Praise for those who have understood the gospel of grace',
      'First-generation believers growing in faith, courage, and obedience',
      'Great harvest among the children hearing truth',
      'Young believers facing food insecurity and corruption — that they would stand strong',
    ],
  },
  {
    slug: 'snyder',
    name: 'Dan & Julie Snyder',
    region: 'international',
    location: 'Brazil',
    agency: 'South America Mission',
    role: 'Dan — Director of Indigenous Ministries and Personnel. Julie — Care Ministry Director, serving SAM missionaries through member care.',
    email: 'dan.snyder@southamericamission.org',
    publicAddress: 'P.O. Box 924, Dayton, TN 37321',
    focus: ['Indigenous', 'Pastoral Training', 'Mobilization'],
    prayerRequests: [
      'Being a source of encouragement to the church and partners',
      'Laborers being sent into the harvest',
      "Sensitivity to the Holy Spirit's leading",
      "The Lord's leading in their families' lives",
    ],
  },
  {
    slug: 'van-oosten',
    name: 'Erik & Cristy van Oosten',
    region: 'international',
    location: 'Pucallpa, Peru',
    agency: 'Wycliffe Bible Translators / South America Mission',
    role: 'Erik — SAM Air Office (flight monitoring, billing, hangar tasks) plus prison ministry to Dutch prisoners in Peru. Cristy — elementary teacher at SAM Academy.',
    family: '2 sons',
    email: 'erik.vanoosten@jaars.org',
    publicAddress: 'Apartado 22, Pucallpa, Peru',
    focus: ['Aviation Support', 'Bible Translation', 'Children & Youth'],
    prayerRequests: [
      'Making more Peruvian friends; language and culture acquisition',
      "The sons' impact on fellow students and Peruvian friends; deep faith",
      "Cristy's creativity and wisdom in teaching; the school needs more teachers",
      'Wisdom for Erik and Cristy in parenting',
      "Family's growing relationship with God",
    ],
  },
  {
    slug: 'ziu',
    name: 'Dionis & Jetmira Ziu',
    region: 'international',
    location: 'Durrës, Albania',
    agency: 'Cru',
    role: 'Full-time with Cru in Albania — evangelism and discipleship of high school and college students; planting a church in Durrës.',
    fullDescription:
      'Dionis is team leader of the Durrës campus team. Both serve in a predominantly Muslim context, focused on reaching students and planting a local church.',
    family: '2 children',
    email: 'dionis.ziu@ijr.al',
    focus: ['Campus Ministry', 'Discipleship'],
    prayerRequests: [
      'Family walking closely with God; children desiring to know more',
      'Honoring God in leadership, discipleship, and children\u2019s ministry',
      '7 men in church leadership by 2025',
      'Remaining monthly financial support (currently 60–65% funded)',
      'Durrës students reading the Bible being open to hearing about faith',
    ],
  },
];

// ─── Filter helpers ──────────────────────────────────────────

export type FocusTag =
  | 'Bible Translation'
  | 'Campus Ministry'
  | 'Camp Ministry'
  | 'Refugee & Immigrant'
  | 'Anti-Trafficking'
  | 'Indigenous'
  | 'Pregnancy Help'
  | 'Discipleship'
  | 'Mobilization'
  | 'Children & Youth'
  | 'Aviation Support'
  | 'Pastoral Training'
  | 'Local Outreach';

export const regionMeta: Record<MissionaryRegion, { label: string; description: string }> = {
  local: {
    label: 'Local',
    description: 'Dayton and Tennessee — partners we can meet for coffee.',
  },
  domestic: {
    label: 'Domestic',
    description: 'Across the United States, serving as home-base or sending personnel.',
  },
  international: {
    label: 'International',
    description: 'Five continents reached — from Albania to Uganda, Brazil to Thailand.',
  },
};

/** Returns the set of focus tags actually in use, sorted alphabetically */
export function getAllFocusTags(): string[] {
  const set = new Set<string>();
  missionaries.forEach((m) => m.focus.forEach((f) => set.add(f)));
  return Array.from(set).sort();
}

/** Statistics for the page header */
export function getMissionStats() {
  return {
    total: missionaries.length,
    local: missionaries.filter((m) => m.region === 'local').length,
    domestic: missionaries.filter((m) => m.region === 'domestic').length,
    international: missionaries.filter((m) => m.region === 'international').length,
  };
}
