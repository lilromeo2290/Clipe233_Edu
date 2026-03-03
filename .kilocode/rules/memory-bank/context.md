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
| `src/components/layout/Sidebar.tsx` | Sidebar navigation (client component) | ✅ Done |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

School Management System is fully built. Features include:
- Dashboard with KPI stats, recent students, upcoming events, top classes
- Students module: table with GPA, status, search/filter
- Teachers module: table with subjects, classes, ratings
- Classes module: card grid with schedule, room, avg grade
- Attendance module: daily class view, at-risk students, summary table
- Grades module: distribution chart, top performers, full grade table

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
