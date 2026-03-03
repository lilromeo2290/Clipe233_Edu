export default function Dashboard() {
  const stats = [
    {
      label: "Total Students",
      value: "1,248",
      change: "+12 this month",
      positive: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      color: "text-blue-400",
      bg: "bg-blue-950",
    },
    {
      label: "Total Teachers",
      value: "86",
      change: "+3 this month",
      positive: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      color: "text-purple-400",
      bg: "bg-purple-950",
    },
    {
      label: "Active Classes",
      value: "42",
      change: "Spring semester",
      positive: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      color: "text-emerald-400",
      bg: "bg-emerald-950",
    },
    {
      label: "Avg. Attendance",
      value: "94.2%",
      change: "-0.8% vs last week",
      positive: false,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <path d="M9 16l2 2 4-4" />
        </svg>
      ),
      color: "text-amber-400",
      bg: "bg-amber-950",
    },
  ];

  const recentStudents = [
    { name: "Emma Johnson", id: "STU-001", class: "Grade 10-A", status: "Active", enrolled: "Jan 15, 2026" },
    { name: "Liam Williams", id: "STU-002", class: "Grade 11-B", status: "Active", enrolled: "Jan 15, 2026" },
    { name: "Olivia Brown", id: "STU-003", class: "Grade 9-C", status: "Active", enrolled: "Jan 16, 2026" },
    { name: "Noah Davis", id: "STU-004", class: "Grade 12-A", status: "Inactive", enrolled: "Jan 16, 2026" },
    { name: "Ava Martinez", id: "STU-005", class: "Grade 10-B", status: "Active", enrolled: "Jan 17, 2026" },
  ];

  const upcomingEvents = [
    { title: "Mid-term Examinations", date: "Mar 10–14, 2026", type: "Exam" },
    { title: "Parent-Teacher Meeting", date: "Mar 20, 2026", type: "Meeting" },
    { title: "Science Fair", date: "Apr 5, 2026", type: "Event" },
    { title: "Spring Break", date: "Apr 14–18, 2026", type: "Holiday" },
  ];

  const topClasses = [
    { name: "Grade 12-A", teacher: "Dr. Sarah Lee", students: 32, avgGrade: "A-" },
    { name: "Grade 11-B", teacher: "Mr. James Carter", students: 30, avgGrade: "B+" },
    { name: "Grade 10-A", teacher: "Ms. Rachel Kim", students: 34, avgGrade: "B+" },
    { name: "Grade 9-C", teacher: "Mr. David Park", students: 28, avgGrade: "B" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Spring Semester 2026
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                <p className={`text-xs mt-2 ${stat.positive ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.bg} ${stat.color} p-2.5 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Students */}
        <div className="xl:col-span-2 page-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Recently Enrolled Students</h2>
            <a href="/students" className="text-blue-400 text-sm hover:text-blue-300">View all →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
                          {s.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-white font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="text-slate-500 font-mono text-xs">{s.id}</td>
                    <td>{s.class}</td>
                    <td>
                      <span className={`badge ${s.status === "Active" ? "badge-green" : "badge-red"}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="text-slate-500">{s.enrolled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Upcoming Events</h2>
          </div>
          <div className="p-4 space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">{event.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{event.date}</p>
                  <span className={`badge mt-1 ${
                    event.type === "Exam" ? "badge-red" :
                    event.type === "Meeting" ? "badge-blue" :
                    event.type === "Holiday" ? "badge-green" :
                    "badge-yellow"
                  }`}>
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Classes */}
      <div className="page-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">Top Performing Classes</h2>
          <a href="/classes" className="text-blue-400 text-sm hover:text-blue-300">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Class Teacher</th>
                <th>Students</th>
                <th>Avg. Grade</th>
              </tr>
            </thead>
            <tbody>
              {topClasses.map((c) => (
                <tr key={c.name}>
                  <td className="text-white font-medium">{c.name}</td>
                  <td>{c.teacher}</td>
                  <td>{c.students}</td>
                  <td>
                    <span className={`badge ${
                      c.avgGrade.startsWith("A") ? "badge-green" :
                      c.avgGrade.startsWith("B") ? "badge-blue" :
                      "badge-yellow"
                    }`}>
                      {c.avgGrade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
