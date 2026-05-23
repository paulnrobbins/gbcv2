/*
 * Grace Groups — source of truth for the /grace-groups page.
 *
 * 5 groups; structure matches grace-groups-source.md in this folder
 * (the markdown source Paul edits to update content). Code reads this
 * TS file because TS gives editor autocomplete + type checking when
 * adding a new group.
 *
 * To add or remove a group, edit this file (and add the leader photo
 * to /public/photos/grace-groups/) — that's the entire edit.
 *
 * No form per Paul's direction. The page's single CTA mailtos Pastor Dave.
 */

import type { GraceGroup } from '@/types';

export const graceGroups: GraceGroup[] = [
  {
    slug: 'buxton',
    leaderName: 'Al & Alice Buxton',
    meetingNight: '2nd & 4th Sundays, 5:00 PM',
    generalLocation: 'In-home',
    photoPath: '/photos/grace-groups/01-buxton.png',
    blurb: 'Fellowship dinner, prayer, and review of Sunday’s sermon.',
  },
  {
    slug: 'jones',
    leaderName: 'Scott & Kim Jones',
    meetingNight: '1st & 3rd Thursdays, 6:00–8:00 PM',
    generalLocation: 'In-home',
    photoPath: '/photos/grace-groups/02-jones.png',
    blurb: 'Meal, fellowship, prayer, and a review of Sunday’s sermon. August through May.',
  },
  {
    slug: 'hostetler',
    leaderName: 'Tim & Anita Joy Hostetler',
    meetingNight: 'Every other week, 5:30 PM',
    generalLocation: 'Church Annex',
    photoPath: '/photos/grace-groups/03-hostetler.png',
    blurb: 'A growing group of young adults gathering at the Annex for study and friendship.',
  },
  {
    slug: 'rose',
    leaderName: 'Chris & Heidi Rose',
    meetingNight: '1st Sunday monthly, after church',
    generalLocation: 'In-home',
    photoPath: '/photos/grace-groups/04-rose.png',
    blurb: 'Once-a-month gathering after Sunday worship — a slower rhythm for full schedules.',
  },
  {
    slug: 'hartzell',
    leaderName: 'Marty & Connie Hartzell',
    meetingNight: 'Regular in-home meetings',
    generalLocation: 'In-home',
    photoPath: '/photos/grace-groups/05-hartzell.png',
    blurb: 'In-home gathering for fellowship, prayer, and growing together.',
  },
];

export const GRACE_GROUPS_CONTACT_EMAIL = 'dave@gbcdayton.org';
export const GRACE_GROUPS_CONTACT_NAME = 'Pastor Dave Hobbs';
