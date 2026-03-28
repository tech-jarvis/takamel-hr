import type { TenantId } from "../config/tenants";
import type { RoleId } from "../config/roles";

export interface JobPosting {
  id: string;
  tenantId: TenantId;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Intern";
  status: "Published" | "Draft" | "Closed";
  applicants: number;
  pipeline: { stage: string; count: number }[];
  postedAt: string;
}

export interface Candidate {
  id: string;
  tenantId: TenantId;
  jobId: string;
  name: string;
  source: string;
  stage: string;
  score: number;
  aiSummary: string;
}

export interface Employee {
  id: string;
  tenantId: TenantId;
  name: string;
  title: string;
  department: string;
  email: string;
  location: string;
  managerId: string | null;
  startDate: string;
  avatarHue: number;
}

export interface OnboardingCase {
  id: string;
  tenantId: TenantId;
  name: string;
  role: string;
  startDate: string;
  progress: number;
  owner: string;
}

export interface OffboardingCase {
  id: string;
  tenantId: TenantId;
  name: string;
  lastDay: string;
  checklist: string;
  status: "In progress" | "Scheduled" | "Complete";
}

export interface HrTask {
  id: string;
  tenantId: TenantId;
  title: string;
  assignee: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  area: string;
}

export interface AiInsight {
  id: string;
  tenantId: TenantId;
  title: string;
  detail: string;
  impact: "high" | "medium" | "low";
}

const JOBS: JobPosting[] = [
  {
    id: "j1",
    tenantId: "alrajhi_tech",
    title: "Senior Product Designer",
    department: "Product",
    location: "Riyadh",
    type: "Full-time",
    status: "Published",
    applicants: 42,
    pipeline: [
      { stage: "Applied", count: 42 },
      { stage: "Screen", count: 18 },
      { stage: "Interview", count: 6 },
      { stage: "Offer", count: 1 },
    ],
    postedAt: "2026-03-01",
  },
  {
    id: "j2",
    tenantId: "alrajhi_tech",
    title: "ML Engineer — HR Copilot",
    department: "Engineering",
    location: "Remote — KSA",
    type: "Full-time",
    status: "Published",
    applicants: 67,
    pipeline: [
      { stage: "Applied", count: 67 },
      { stage: "Screen", count: 24 },
      { stage: "Interview", count: 9 },
      { stage: "Offer", count: 0 },
    ],
    postedAt: "2026-02-18",
  },
  {
    id: "j3",
    tenantId: "oasis_retail",
    title: "Regional Store Manager",
    department: "Operations",
    location: "Jeddah",
    type: "Full-time",
    status: "Published",
    applicants: 31,
    pipeline: [
      { stage: "Applied", count: 31 },
      { stage: "Screen", count: 11 },
      { stage: "Interview", count: 4 },
      { stage: "Offer", count: 2 },
    ],
    postedAt: "2026-03-10",
  },
  {
    id: "j4",
    tenantId: "red_sea_hospitality",
    title: "Guest Experience Lead",
    department: "Hospitality",
    location: "AlUla",
    type: "Contract",
    status: "Draft",
    applicants: 0,
    pipeline: [
      { stage: "Applied", count: 0 },
      { stage: "Screen", count: 0 },
      { stage: "Interview", count: 0 },
      { stage: "Offer", count: 0 },
    ],
    postedAt: "2026-03-20",
  },
];

const CANDIDATES: Candidate[] = [
  {
    id: "c1",
    tenantId: "alrajhi_tech",
    jobId: "j1",
    name: "Nora Alsubaie",
    source: "LinkedIn",
    stage: "Interview",
    score: 92,
    aiSummary:
      "Strong systems thinking; portfolio shows end-to-end hiring flows. Recommend panel on design ops.",
  },
  {
    id: "c2",
    tenantId: "alrajhi_tech",
    jobId: "j1",
    name: "Omar Halawani",
    source: "Referral",
    stage: "Screen",
    score: 84,
    aiSummary: "Excellent stakeholder communication; verify visa timeline for relocation.",
  },
  {
    id: "c3",
    tenantId: "alrajhi_tech",
    jobId: "j2",
    name: "Layla Bin Mahfouz",
    source: "Careers site",
    stage: "Interview",
    score: 96,
    aiSummary: "Top match on retrieval + guardrails experience; suggest take-home on policy grounding.",
  },
  {
    id: "c4",
    tenantId: "oasis_retail",
    jobId: "j3",
    name: "Faisal Alharbi",
    source: "Indeed",
    stage: "Offer",
    score: 88,
    aiSummary: "Proven P&L ownership in franchise network; compensation within band.",
  },
];

const EMPLOYEES: Employee[] = [
  {
    id: "e1",
    tenantId: "alrajhi_tech",
    name: "Sara Almutairi",
    title: "Chief People Officer",
    department: "People",
    email: "sara.almutairi@example.sa",
    location: "Riyadh",
    managerId: null,
    startDate: "2021-04-01",
    avatarHue: 200,
  },
  {
    id: "e2",
    tenantId: "alrajhi_tech",
    name: "Khalid Alqahtani",
    title: "Head of Talent",
    department: "People",
    email: "khalid.alqahtani@example.sa",
    location: "Riyadh",
    managerId: "e1",
    startDate: "2022-01-15",
    avatarHue: 160,
  },
  {
    id: "e3",
    tenantId: "alrajhi_tech",
    name: "Maha Alshehri",
    title: "Engineering Manager",
    department: "Engineering",
    email: "maha.alshehri@example.sa",
    location: "Riyadh",
    managerId: "e1",
    startDate: "2023-06-01",
    avatarHue: 280,
  },
  {
    id: "e4",
    tenantId: "oasis_retail",
    name: "Reem Alzahrani",
    title: "HR Director",
    department: "People",
    email: "reem@example.sa",
    location: "Jeddah",
    managerId: null,
    startDate: "2020-09-01",
    avatarHue: 40,
  },
  {
    id: "e5",
    tenantId: "red_sea_hospitality",
    name: "Yousef Alghamdi",
    title: "People Partner",
    department: "People",
    email: "yousef@example.sa",
    location: "AlUla",
    managerId: null,
    startDate: "2024-02-01",
    avatarHue: 320,
  },
];

const ONBOARDING: OnboardingCase[] = [
  {
    id: "ob1",
    tenantId: "alrajhi_tech",
    name: "Huda Alrashid",
    role: "Data Analyst",
    startDate: "2026-04-02",
    progress: 72,
    owner: "Khalid Alqahtani",
  },
  {
    id: "ob2",
    tenantId: "alrajhi_tech",
    name: "Bandar Alotaibi",
    role: "Security Engineer",
    startDate: "2026-04-08",
    progress: 38,
    owner: "Sara Almutairi",
  },
  {
    id: "ob3",
    tenantId: "oasis_retail",
    name: "Lina Alshammari",
    role: "Area Supervisor",
    startDate: "2026-03-30",
    progress: 55,
    owner: "Reem Alzahrani",
  },
];

const OFFBOARDING: OffboardingCase[] = [
  {
    id: "of1",
    tenantId: "alrajhi_tech",
    name: "Tariq Almalki",
    lastDay: "2026-04-15",
    checklist: "Access, assets, exit interview",
    status: "In progress",
  },
  {
    id: "of2",
    tenantId: "oasis_retail",
    name: "Nouf Alharbi",
    lastDay: "2026-03-28",
    checklist: "Final pay, uniform return",
    status: "Scheduled",
  },
];

const TASKS: HrTask[] = [
  {
    id: "t0",
    tenantId: "alrajhi_tech",
    title: "Upload national address proof (Nafath)",
    assignee: "You",
    due: "2026-03-30",
    priority: "Medium",
    area: "Profile",
  },
  {
    id: "t1",
    tenantId: "alrajhi_tech",
    title: "Approve Iqama renewal — Huda Alrashid",
    assignee: "Sara Almutairi",
    due: "2026-03-29",
    priority: "High",
    area: "Compliance",
  },
  {
    id: "t2",
    tenantId: "alrajhi_tech",
    title: "Publish Q2 headcount plan",
    assignee: "Khalid Alqahtani",
    due: "2026-04-01",
    priority: "Medium",
    area: "Planning",
  },
  {
    id: "t3",
    tenantId: "oasis_retail",
    title: "Complete Mudad updates for March leavers",
    assignee: "Reem Alzahrani",
    due: "2026-03-27",
    priority: "High",
    area: "Payroll",
  },
];

const AI_INSIGHTS: AiInsight[] = [
  {
    id: "a1",
    tenantId: "alrajhi_tech",
    title: "Time-to-hire trending down 11%",
    detail: "Interview stages complete 1.4 days faster after AI screen copy refresh.",
    impact: "high",
  },
  {
    id: "a2",
    tenantId: "alrajhi_tech",
    title: "Risk: offer acceptance",
    detail: "Two finalists cited benefits clarity — suggest automated FAQ in offer pack.",
    impact: "medium",
  },
  {
    id: "a3",
    tenantId: "oasis_retail",
    title: "Source mix shift",
    detail: "Referrals outperform paid by 22% conversion; consider referral bonus campaign.",
    impact: "medium",
  },
];

export function filterByTenant<T extends { tenantId: TenantId }>(
  rows: T[],
  tenantId: TenantId
): T[] {
  return rows.filter((r) => r.tenantId === tenantId);
}

export function jobsForTenant(tenantId: TenantId) {
  return filterByTenant(JOBS, tenantId);
}

export function candidatesForTenant(tenantId: TenantId) {
  return CANDIDATES.filter((c) => c.tenantId === tenantId);
}

export function candidatesForJob(tenantId: TenantId, jobId: string) {
  return CANDIDATES.filter((c) => c.tenantId === tenantId && c.jobId === jobId);
}

export function employeesForTenant(tenantId: TenantId) {
  return filterByTenant(EMPLOYEES, tenantId);
}

export function employeeById(tenantId: TenantId, id: string) {
  return EMPLOYEES.find((e) => e.tenantId === tenantId && e.id === id) ?? null;
}

export function onboardingForTenant(tenantId: TenantId) {
  return filterByTenant(ONBOARDING, tenantId);
}

export function offboardingForTenant(tenantId: TenantId) {
  return filterByTenant(OFFBOARDING, tenantId);
}

export function tasksForTenant(tenantId: TenantId, role: RoleId) {
  const base = filterByTenant(TASKS, tenantId);
  if (role === "employee") {
    return base.filter((t) => t.assignee === "You");
  }
  return base;
}

export function aiInsightsForTenant(tenantId: TenantId) {
  return filterByTenant(AI_INSIGHTS, tenantId);
}

export function jobById(tenantId: TenantId, jobId: string) {
  return JOBS.find((j) => j.tenantId === tenantId && j.id === jobId) ?? null;
}

/** Demo series for dashboards / reports (not tenant-specific for prototype). */
export const HEADCOUNT_TREND = [
  { name: "Oct", headcount: 118, hires: 4, exits: 1 },
  { name: "Nov", headcount: 121, hires: 5, exits: 2 },
  { name: "Dec", headcount: 124, hires: 6, exits: 3 },
  { name: "Jan", headcount: 128, hires: 7, exits: 2 },
  { name: "Feb", headcount: 131, hires: 5, exits: 1 },
  { name: "Mar", headcount: 134, hires: 8, exits: 2 },
];

export const DEPT_DISTRIBUTION = [
  { name: "People", value: 18 },
  { name: "Engineering", value: 44 },
  { name: "Product", value: 22 },
  { name: "Operations", value: 31 },
  { name: "Other", value: 19 },
];

/* ——— HRMS: home, calendar, mail, PTO, self-onboarding, invites ——— */

export interface HomeFeedItem {
  id: string;
  tenantId: TenantId;
  title: string;
  body: string;
  at: string;
  kind: "announcement" | "task" | "policy";
}

export interface CalendarEventRow {
  id: string;
  tenantId: TenantId;
  title: string;
  start: string;
  end: string;
  type: "meeting" | "holiday" | "review" | "leave";
}

export interface MailItem {
  id: string;
  tenantId: TenantId;
  subject: string;
  from: string;
  preview: string;
  at: string;
  unread: boolean;
  folder: "inbox" | "sent";
}

export interface PtoRequest {
  id: string;
  tenantId: TenantId;
  employeeName: string;
  type: string;
  start: string;
  end: string;
  status: "Pending" | "Approved" | "Denied";
  days: number;
}

export interface SelfOnboardingStep {
  id: string;
  tenantId: TenantId;
  title: string;
  done: boolean;
  due?: string;
}

export interface PendingInvite {
  id: string;
  tenantId: TenantId;
  email: string;
  role: string;
  sentAt: string;
  status: "Pending" | "Accepted";
}

const HOME_FEED: HomeFeedItem[] = [
  {
    id: "f1",
    tenantId: "alrajhi_tech",
    title: "Q2 town hall",
    body: "Save the date: April 4, 3pm — strategy and KSA hiring priorities.",
    at: "2026-03-26",
    kind: "announcement",
  },
  {
    id: "f2",
    tenantId: "alrajhi_tech",
    title: "Policy: remote work Fridays",
    body: "Updated guideline in the handbook — please acknowledge in your profile.",
    at: "2026-03-24",
    kind: "policy",
  },
  {
    id: "f3",
    tenantId: "oasis_retail",
    title: "Ramadan schedule",
    body: "Adjusted hours for stores in Riyadh and Jeddah regions.",
    at: "2026-03-22",
    kind: "announcement",
  },
  {
    id: "f4",
    tenantId: "red_sea_hospitality",
    title: "Guest experience playbook",
    body: "New scripts for VIP arrivals — read by April 1.",
    at: "2026-03-25",
    kind: "policy",
  },
];

const CALENDAR_EVENTS: CalendarEventRow[] = [
  {
    id: "ev1",
    tenantId: "alrajhi_tech",
    title: "1:1 — Maha",
    start: "2026-03-28T10:00",
    end: "2026-03-28T10:30",
    type: "review",
  },
  {
    id: "ev2",
    tenantId: "alrajhi_tech",
    title: "Eid holiday (company)",
    start: "2026-03-30T00:00",
    end: "2026-04-02T23:59",
    type: "holiday",
  },
  {
    id: "ev3",
    tenantId: "alrajhi_tech",
    title: "Talent sync",
    start: "2026-03-31T14:00",
    end: "2026-03-31T15:00",
    type: "meeting",
  },
  {
    id: "ev4",
    tenantId: "oasis_retail",
    title: "Store walkthrough — Jeddah",
    start: "2026-03-29T09:00",
    end: "2026-03-29T12:00",
    type: "meeting",
  },
  {
    id: "ev5",
    tenantId: "red_sea_hospitality",
    title: "Site stand-up",
    start: "2026-03-28T08:30",
    end: "2026-03-28T09:00",
    type: "meeting",
  },
];

const MAIL: MailItem[] = [
  {
    id: "m1",
    tenantId: "alrajhi_tech",
    subject: "Action: sign updated code of conduct",
    from: "People Ops <people@example.sa>",
    preview: "Please review and e-sign by March 31…",
    at: "2026-03-27T08:12",
    unread: true,
    folder: "inbox",
  },
  {
    id: "m2",
    tenantId: "alrajhi_tech",
    subject: "Your PTO request was approved",
    from: "Takamel HR <no-reply@takamel.sa>",
    preview: "Annual leave Apr 10–12 approved by Sara Almutairi.",
    at: "2026-03-26T16:40",
    unread: false,
    folder: "inbox",
  },
  {
    id: "m3",
    tenantId: "alrajhi_tech",
    subject: "Re: Interview panel for Product Designer",
    from: "You",
    preview: "Thanks — I added Nora to the panel for Thursday.",
    at: "2026-03-25T11:05",
    unread: false,
    folder: "sent",
  },
  {
    id: "m4",
    tenantId: "red_sea_hospitality",
    subject: "Welcome to Takamel HR",
    from: "People <people@example.sa>",
    preview: "Complete your profile to access schedules.",
    at: "2026-03-27T09:00",
    unread: true,
    folder: "inbox",
  },
];

const PTO_REQUESTS: PtoRequest[] = [
  {
    id: "p1",
    tenantId: "alrajhi_tech",
    employeeName: "Khalid Alqahtani",
    type: "Annual leave",
    start: "2026-04-10",
    end: "2026-04-12",
    status: "Approved",
    days: 3,
  },
  {
    id: "p2",
    tenantId: "alrajhi_tech",
    employeeName: "Maha Alshehri",
    type: "Sick leave",
    start: "2026-03-29",
    end: "2026-03-29",
    status: "Pending",
    days: 1,
  },
  {
    id: "p3",
    tenantId: "oasis_retail",
    employeeName: "Reem Alzahrani",
    type: "Annual leave",
    start: "2026-04-20",
    end: "2026-04-25",
    status: "Pending",
    days: 5,
  },
  {
    id: "p4",
    tenantId: "red_sea_hospitality",
    employeeName: "Yousef Alghamdi",
    type: "Annual leave",
    start: "2026-04-14",
    end: "2026-04-16",
    status: "Pending",
    days: 3,
  },
];

const SELF_ONBOARDING: SelfOnboardingStep[] = [
  {
    id: "s1",
    tenantId: "alrajhi_tech",
    title: "Upload Iqama / national ID",
    done: true,
    due: "2026-03-20",
  },
  {
    id: "s2",
    tenantId: "alrajhi_tech",
    title: "Emergency contact & bank details",
    done: true,
  },
  {
    id: "s3",
    tenantId: "alrajhi_tech",
    title: "Read security & data policy",
    done: false,
    due: "2026-03-30",
  },
  {
    id: "s4",
    tenantId: "alrajhi_tech",
    title: "Meet your buddy — schedule 30 min",
    done: false,
    due: "2026-04-01",
  },
  {
    id: "s5",
    tenantId: "oasis_retail",
    title: "Uniform sizing & delivery address",
    done: false,
    due: "2026-03-28",
  },
  {
    id: "s6",
    tenantId: "red_sea_hospitality",
    title: "Complete hospitality compliance module",
    done: false,
    due: "2026-04-05",
  },
];

const INVITES: PendingInvite[] = [
  {
    id: "i1",
    tenantId: "alrajhi_tech",
    email: "newhire.march@example.sa",
    role: "Employee — Engineering",
    sentAt: "2026-03-26",
    status: "Pending",
  },
  {
    id: "i2",
    tenantId: "alrajhi_tech",
    email: "contractor.audit@example.sa",
    role: "Contractor — Finance",
    sentAt: "2026-03-24",
    status: "Pending",
  },
  {
    id: "i3",
    tenantId: "oasis_retail",
    email: "store.lead.jed@example.sa",
    role: "Hiring manager",
    sentAt: "2026-03-20",
    status: "Accepted",
  },
  {
    id: "i4",
    tenantId: "red_sea_hospitality",
    email: "guide.alula@example.sa",
    role: "Employee — Guest services",
    sentAt: "2026-03-26",
    status: "Pending",
  },
];

export function homeFeedForTenant(tenantId: TenantId) {
  return filterByTenant(HOME_FEED, tenantId);
}

export function calendarForTenant(tenantId: TenantId) {
  return filterByTenant(CALENDAR_EVENTS, tenantId);
}

export function mailForTenant(tenantId: TenantId, folder: "inbox" | "sent") {
  return filterByTenant(MAIL, tenantId).filter((m) => m.folder === folder);
}

export function ptoForTenant(tenantId: TenantId) {
  return filterByTenant(PTO_REQUESTS, tenantId);
}

export function selfOnboardingForTenant(tenantId: TenantId) {
  return filterByTenant(SELF_ONBOARDING, tenantId);
}

export function invitesForTenant(tenantId: TenantId) {
  return filterByTenant(INVITES, tenantId);
}

/** Demo “you” = second employee in tenant when exists (e.g. Khalid at Al Rajhi). */
export function demoCurrentEmployee(tenantId: TenantId): Employee | null {
  const list = employeesForTenant(tenantId);
  return list[1] ?? list[0] ?? null;
}

/** Peers + reports: same manager or report to demo user. */
export function teamForTenant(tenantId: TenantId): Employee[] {
  const list = employeesForTenant(tenantId);
  const me = demoCurrentEmployee(tenantId);
  if (!me) return list;
  return list.filter(
    (e) =>
      e.id !== me.id &&
      (e.managerId === me.id || e.managerId === me.managerId || me.managerId === e.id)
  );
}
