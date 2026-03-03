# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ Ready for development

The template is a clean Next.js 16 starter with TypeScript and Tailwind CSS 4. It's ready for AI-assisted expansion to build any type of application.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] School Management System built with 5 modules
- [x] School Fees Management module added
- [x] Daily Feeding Fee section added to fees page (per-student tracking + fee structure column)
- [x] Roles & Permissions module added (role cards, permission matrix, user assignments, audit log)
- [x] Daily Feeding Fees module added (dedicated page with payment tracking, meal plans, monthly summary)
- [x] Terminal Reports module added (report generation, student performance reports, grade summaries, export)
- [x] Student attendance register added (class selector, term selector, interactive daily attendance grid, statistics)
- [x] Student Register menu added as separate item in sidebar (dedicated page with full attendance tracking features)
- [x] Quick status edit dropdown added to students table (Active, Inactive, Suspended options directly editable in table)
- [x] Teachers Attendance module added (dedicated page with attendance register grid, filters by term/department/month/year, statistics)
- [x] Class details view updated (student table with name, date of admission, status, print functionality)
- [x] Configurable grading scheme added to Grades page (edit letter grades, GPA, min/max scores, descriptions)
- [x] Fixed grade config array mutation issue causing edit/delete to not work
- [x] Edit and View buttons fixed in Subjects page
- [x] Settings page added with term/semester configuration (add, edit, delete, set active)

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Dashboard with stats, recent students, events | ✅ Done |
| `src/app/layout.tsx` | Root layout with sidebar | ✅ Done |
| `src/app/globals.css` | Global styles + custom CSS classes | ✅ Done |
| `src/app/students/page.tsx` | Students management table | ✅ Done |
| `src/app/teachers/page.tsx` | Teachers management table | ✅ Done |
| `src/app/classes/page.tsx` | Classes/courses card grid | ✅ Done |
| `src/app/attendance/page.tsx` | Attendance tracking with at-risk view | ✅ Done |
| `src/app/grades/page.tsx` | Grades, distribution, top performers | ✅ Done |
| `src/app/fees/page.tsx` | School fees tracking, payments, fee structure | ✅ Done |
| `src/app/roles/page.tsx` | Roles & permissions management | ✅ Done |
| `src/app/feeding/page.tsx` | Daily feeding fees tracking and management | ✅ Done |
| `src/app/terminal-reports/page.tsx` | Terminal reports, grade summaries, export | ✅ Done |
| `src/app/teachers-attendance/page.tsx` | Teachers attendance register, statistics | ✅ Done |
| `src/app/settings/page.tsx` | Settings with term/semester configuration | ✅ Done |
| `src/components/layout/Sidebar.tsx` | Sidebar navigation (client component) | ✅ Done |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

School Management System is fully built. Features include:
- Dashboard with KPI stats, recent students, upcoming events, top classes
- Students module: table with GPA, status, search/filter
- Teachers module: table with subjects, classes, ratings
- Classes module: card grid with schedule, room, avg grade, student list with dates and print
- Attendance module: daily class view, at-risk students, summary table, per-class per-term attendance register with interactive grid
- Grades module: distribution chart, top performers, full grade table, configurable grading scheme (edit letter grades, GPA, score ranges, descriptions)
- Fees module: payment tracking, fee structure, feeding fees
- Roles module: role management, permissions, audit log
- Terminal Reports module: report generation, student performance, grade summaries, export
- Teachers Attendance module: attendance register grid, filters by term/department/month/year, statistics
- Settings page: term/semester configuration with add, edit, delete, set active

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| Today | Terminal Reports module added with report generation, student performance, grade summaries, export |
| Today | Teachers Attendance module added with permission option (Present, Late, Permission, Leave) |
| Today | Configurable grading scheme added to Grades page (edit letter grades, GPA, score ranges, descriptions)
