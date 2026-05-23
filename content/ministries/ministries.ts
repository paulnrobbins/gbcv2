/**
 * Grace Bible Church — Ministry Directory
 * Sourced from gbcdayton.org ministry pages. Editable by Paul without coding.
 *
 * Categories:
 *  - kids        : ages 0 through 6th grade (GraceKids umbrella, AWANA, etc.)
 *  - youth       : grades 7–12
 *  - young-adults: post-high-school through young marrieds
 *  - adults      : everything else (Grace Groups, Sunday School, prayer, men's, women's)
 *  - care        : life-stage care ministries (GriefShare, Moms4Moms)
 *
 * Each entry can be deep-linked from the homepage or filtered on /ministries.
 * The /ministries/[slug] sub-pages (Phase 4c) read from this same source.
 */

import type { MinistryCategory } from '@/types';

// Extended category to allow life-stage care grouping
export type MinistryCategoryExtended = MinistryCategory | 'care';

export interface MinistryEntry {
  slug: string;
  title: string;
  category: MinistryCategoryExtended;
  /** Short tagline shown on the card (under the title) */
  shortDescription: string;
  /** Full multi-paragraph description for the detail page */
  fullDescription: string;
  /** When it meets — short, e.g. "Wednesdays 6:30 PM" */
  meetingTime?: string;
  /** Physical location at the church or other meeting place */
  location?: string;
  /** Age range or season-of-life targeting */
  ageRange?: string;
  /** Contact info — used for "reach out" CTA */
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  /** Optional season — "Sept–April" for AWANA, "Year-round" for Sunday School */
  season?: string;
}

export const ministries: MinistryEntry[] = [
  // ─── KIDS ──────────────────────────────────────────────────
  {
    slug: 'gracekids',
    title: 'GraceKids',
    category: 'kids',
    shortDescription: 'Teaching kids who God is and how His Word applies to their lives — in creative and memorable ways.',
    fullDescription:
      "The heart of children's ministry at Grace Bible Church is to teach kids about who God is and how His Word applies to their lives in creative and memorable ways. Through engaging teaching, supportive environments, and close-knit small group classes, we guide kids toward a real relationship with God. " +
      "We want kids to know that the Bible is full of stories that matter in their lives today, that fun and games are definitely allowed at church, that worship can be full of loud music and silly dancing, and that there are adults here who truly want to love and lead them closer to Jesus. " +
      "Our programs are designed to lay the foundation for kids to have continued conversations about God at home — we partner with parents to lead the children in our church to truly experience God.",
    meetingTime: 'Sunday mornings; midweek AWANA',
    ageRange: 'Nursery through 6th grade',
  },
  {
    slug: 'nursery',
    title: 'Nursery',
    category: 'kids',
    shortDescription: 'A safe, nurturing space for our youngest (ages 0–2) so parents can fully participate in worship.',
    fullDescription:
      "The Grace Bible Church Nursery is provided for infants and toddlers (ages 0–2) — a place where our youngest children can experience the love of God by feeling secure, resting, playing, and learning. We create a safe and nurturing environment for your children so that parents may fully participate in worship, education, and fellowship. " +
      "The nursery is located on the first floor, down the hall from the Welcome Center Lobby. On arrival, children are checked in and parents fill out a contact form noting any allergies. All diaper bags and drinking cups should be labeled.",
    meetingTime: 'Every Sunday during Sunday School + Worship',
    location: 'First floor, off the Welcome Center Lobby',
    ageRange: 'Newborn–age 2',
  },
  {
    slug: 'jr-gracekids-church',
    title: 'Jr. GraceKids Church',
    category: 'kids',
    shortDescription: 'For ages 3–4, meets in Room 7 during the entire service.',
    fullDescription:
      "Jr. GraceKids Church is for children ages 3–4 and meets in Room 7 during the entire worship service. Volunteers teach the children on a rotational basis with age-appropriate Bible lessons, songs, and crafts.",
    meetingTime: 'During Sunday Worship',
    location: 'Room 7',
    ageRange: 'Ages 3–Pre-K',
  },
  {
    slug: 'gracekids-church',
    title: 'GraceKids Church',
    category: 'kids',
    shortDescription: 'For Kindergarten–5th grade. Children are dismissed from worship midway through the service.',
    fullDescription:
      "GraceKids Church is for children Kindergarten through 5th grade. The children are dismissed from the sanctuary midway during the worship service and walk together to Room 14. Volunteers teach the children on a rotational basis through Bible-based curriculum designed for their age and stage.",
    meetingTime: 'Sunday Worship (dismissed midway)',
    location: 'Room 14',
    ageRange: 'K–5th grade',
  },
  {
    slug: 'awana',
    title: 'AWANA',
    category: 'kids',
    shortDescription: 'Wednesday-night Bible-memory clubs from September through April. Family dinner first.',
    fullDescription:
      "AWANA meets on Wednesday nights (6:30–8:00 PM) during the school year from September to April. The acrostic AWANA comes from the first letters of \u201CApproved Workmen Are Not Ashamed\u201D (II Timothy 2:15). " +
      "AWANA Clubs International is an excellent Bible-based program active all over the United States and in many foreign countries. The heart of AWANA is the Gospel message — strongly emphasizing memorizing and understanding Scripture while offering games and a variety of Bible-related activities. " +
      "Come early at 5:30 PM for the church family dinner in the gym, connected to the lobby at the main entrance.\n\n" +
      "Clubs:\n" +
      "\u2022 Puggles — 3 yrs\n" +
      "\u2022 Cubbies — 4–5 yrs\n" +
      "\u2022 Sparks — K–2nd grade\n" +
      "\u2022 TNT — 3rd–6th grade",
    meetingTime: 'Wednesdays 6:30–8:00 PM',
    season: 'September–April',
    ageRange: '3 yrs through 6th grade',
  },

  // ─── YOUTH ─────────────────────────────────────────────────
  {
    slug: 'impact-youth',
    title: 'IMPACT (Youth Group)',
    category: 'youth',
    shortDescription: 'Grades 7–12, Wednesday nights at 6:30 PM in the dome. Worship, teaching, and D-Groups.',
    fullDescription:
      "GBC Youth is for students from grades 7–12 and is for connecting this generation for all that God has for them. Our Wednesday-night weekly meeting — called IMPACT — starts at 6:30 PM in the dome and ends around 8:15 PM, though plenty of students hang out and play games afterward. " +
      "We have a large-group time together where we play a game, sing, and hear teaching from the Bible. Then we split into Discipleship Groups (D-Groups) — same-gender groups facilitated by a caring adult who loves Jesus and teenagers. " +
      "Everyone is welcomed as if you were already part of the family. Learn what the Love Blob Effect is all about.",
    meetingTime: 'Wednesdays 6:30–8:15 PM',
    location: 'The Dome',
    ageRange: 'Grades 7–12',
    contact: {
      name: 'Pastor Chad',
      email: 'pastorchadgbc@gmail.com',
    },
  },
  {
    slug: 'youth-sunday-school',
    title: 'Youth Sunday School',
    category: 'youth',
    shortDescription: 'Sunday mornings, 9:15 AM in the dome. Middle and high school classes.',
    fullDescription:
      "GBC Youth meets Sundays for Sunday School at 9:15 AM in the dome. A light breakfast together, then split into Middle School and High School classes for relevant Bible study. After Sunday School, students head to the auditorium for all-church worship at 10:30 AM.",
    meetingTime: 'Sundays 9:15–10:15 AM',
    location: 'The Dome',
    ageRange: 'Grades 7–12',
  },

  // ─── YOUNG ADULTS ──────────────────────────────────────────
  {
    slug: 'young-adults',
    title: 'Young Adults Sunday School',
    category: 'young-adults',
    shortDescription: 'Galatians study for young adults, meeting in the Annex Sundays at 9:15 AM.',
    fullDescription:
      "Our Young Adults class meets Sundays from 9:15–10:15 AM in the Annex, currently studying Galatians. Led by Stephen & Kaylee Powell along with Chad & Sonya Owens and Grace & Austin Young. " +
      "This class is built for the unique season of post-high-school and young marrieds — wrestling with vocation, identity, relationships, and walking with Christ in the everyday.",
    meetingTime: 'Sundays 9:15–10:15 AM',
    location: 'The Annex',
    ageRange: 'Young adults',
  },

  // ─── ADULTS ────────────────────────────────────────────────
  {
    slug: 'grace-groups',
    title: 'Grace Groups',
    category: 'adults',
    shortDescription: 'Small groups meeting in homes and at the church — friendships, prayer, and the sermon lived out.',
    fullDescription:
      "The most important ministry of any community of believers is that which provides the setting and opportunity for close friendships, and fellowship in caring for others. Our small groups — Grace Groups — do just that. " +
      "Groups meet in homes or comfortable church spaces and encourage one another in following Christ. Formats are simple and there is childcare. These groups thrive as they care for one another during difficult times: sickness, hospitalization, death of a loved one, and the everyday seasons in between.",
    meetingTime: 'Varies by group — see /grace-groups',
    contact: {
      name: 'Pastor Dave',
      email: 'dave@gbcdayton.org',
    },
  },
  {
    slug: 'adult-sunday-school',
    title: 'Adult Sunday School',
    category: 'adults',
    shortDescription: 'Multiple classes Sunday mornings — text exposition and small-group interaction.',
    fullDescription:
      "We find blessings in holding Sunday School, as many have this ministry in their background, and it is a unique preparation for worship. The blend of text exposition and group interaction provides a healthy example and process of applying the Word of God to life. " +
      "Current adult classes include: Acts: Early Struggles & Successes of the Early Church (Rm 30); Proverbs 1–9: Wisdom for Life & Love (Rm 24); Revealing Israel: Past and Present (Rm 23); Women of the Word (Rm 14); and Membership Matters (Office 2). " +
      "10th grade through adult — choose the class that fits the season you're in.",
    meetingTime: 'Sundays 9:15–10:15 AM',
    ageRange: '10th grade–adult',
  },
  {
    slug: 'prayer-meeting',
    title: 'Prayer Meeting',
    category: 'adults',
    shortDescription: 'Wednesday nights 6:30–7:30 PM, Room 30. Praying together for the church, the community, and the world.',
    fullDescription:
      "\u201CHear my cry, O God, listen to my prayer\u201D — Psalm 61:1.\n\n" +
      "We meet weekly in Room 30 to pray together for needs within our church, our community, and around the world. It is a time of worship as we praise God as well as share our burdens. " +
      "All great movements of God have begun and been fueled by prayer. Grace Bible Church is committed to seeking God's face for both the direction of our ministry and His will in our lives.",
    meetingTime: 'Wednesdays 6:30–7:30 PM',
    location: 'Room 30',
  },
  {
    slug: 'family-dinner',
    title: 'Family Dinner',
    category: 'adults',
    shortDescription: 'Wednesdays 5:30 PM in the gym — open to everyone before AWANA, IMPACT, and Prayer Meeting.',
    fullDescription:
      "Before the Wednesday-night programs begin, the church gathers in the gym for a family dinner at 5:30 PM. It's a casual, warm, multi-generational meal — kids running, grandparents catching up, newcomers meeting longtime members. Come as you are; everyone is welcome.",
    meetingTime: 'Wednesdays 5:30 PM',
    location: 'The Gym',
  },
  {
    slug: 'women-of-grace',
    title: 'Women of Grace LifeShare',
    category: 'adults',
    shortDescription: 'Monthly Saturday gathering — testimony, fellowship, and a light breakfast.',
    fullDescription:
      "Join us monthly for a gathering of women's LifeShare. One Saturday each month, women of Grace gather to hear a testimony from one of the ladies at Grace, enjoy fellowship, and share a light breakfast. " +
      "It's a chance to know each other beyond the brief greetings on Sunday morning — to listen to one another's stories and be encouraged.",
    meetingTime: 'One Saturday a month',
    ageRange: 'Women',
  },
  {
    slug: 'men-of-grace',
    title: 'Men of Grace',
    category: 'adults',
    shortDescription: 'Monthly Saturday gathering — fellowship, donuts, coffee, and a time of sharing and testimony.',
    fullDescription:
      "Each month the Men of Grace gather one Saturday morning for fellowship, donuts, coffee, and a time of sharing and testimony. More men's events coming soon — watch the calendar and the bulletin for details.",
    meetingTime: 'One Saturday a month',
    ageRange: 'Men',
  },
  {
    slug: 'womens-bible-studies',
    title: "Women's Bible Studies",
    category: 'adults',
    shortDescription: 'In-depth Scripture study designed for women, in seasonal cohorts.',
    fullDescription:
      "Women's Bible Studies at Grace Bible Church are seasonal cohorts that walk through a book of the Bible or a topical study together. Studies are designed for both seasoned believers and those just starting to open Scripture for themselves. Check the bulletin or contact the church office for the current study.",
    ageRange: 'Women',
    contact: { email: 'office@gbcdayton.org' },
  },

  // ─── CARE ──────────────────────────────────────────────────
  {
    slug: 'moms4moms',
    title: 'Moms4Moms',
    category: 'care',
    shortDescription: 'Mentoring moms, strengthening families. 1st and 3rd Tuesdays, Sept–April. Childcare provided.',
    fullDescription:
      "This Christ-centered, Bible-based ministry — \u201CMentoring Moms . . . Strengthening Families\u201D — is for all moms: full-time stay-at-home mothers, mothers with a home business, or mothers who work outside the home or attend college. " +
      "Moms4Moms meets at Grace Bible Church on the first and third Tuesday of each month from 9:15–11:30 AM. The meetings are open to the community and childcare is provided. " +
      "Older moms come alongside younger moms and mentor them with encouragement and guidance as they share together the joys and struggles of being a wife and mother. Women build lasting friendships and learn about topics of interest as they seek to make a difference in the lives of their families.",
    meetingTime: '1st & 3rd Tuesdays, 9:15–11:30 AM',
    season: 'September–April',
    location: 'Grace Bible Church',
  },
  {
    slug: 'griefshare',
    title: 'GriefShare',
    category: 'care',
    shortDescription: 'Walking with the bereaved — a Christ-centered grief recovery support group.',
    fullDescription:
      "GriefShare is a friendly, caring group of people who will walk alongside you through one of life's most difficult experiences. You don't have to go through the grieving process alone. " +
      "GriefShare is a Christ-centered, 13-week program that includes a video presentation by leading grief recovery experts, group discussion, and personal study using a workbook. Each session stands alone — you can join at any point during the cycle.",
    contact: { email: 'office@gbcdayton.org' },
  },
];

/** Helper: filter by category */
export function ministriesByCategory(category: MinistryCategoryExtended): MinistryEntry[] {
  return ministries.filter((m) => m.category === category);
}

/** Categories metadata for filter chips */
export const categoryMeta: Record<
  MinistryCategoryExtended,
  { label: string; description: string; eyebrow: string }
> = {
  kids: {
    label: 'Kids',
    description: 'Nursery through 6th grade — Sundays + Wednesday AWANA.',
    eyebrow: 'Ages 0–11',
  },
  youth: {
    label: 'Youth',
    description: 'Grades 7–12 — Sunday School + Wednesday IMPACT.',
    eyebrow: 'Grades 7–12',
  },
  'young-adults': {
    label: 'Young Adults',
    description: 'Post-high-school through young marrieds.',
    eyebrow: 'Young Adults',
  },
  adults: {
    label: 'Adults',
    description: 'Grace Groups, Sunday School, prayer, and the gatherings of men and women.',
    eyebrow: 'Adults',
  },
  care: {
    label: 'Care',
    description: 'Life-stage care: GriefShare, Moms4Moms.',
    eyebrow: 'Care',
  },
};
