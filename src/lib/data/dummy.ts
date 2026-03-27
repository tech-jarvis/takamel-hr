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
