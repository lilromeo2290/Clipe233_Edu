export default function AttendancePage() {
  const attendanceData = [
    { id: "STU-001", name: "Emma Johnson", class: "Grade 10-A", present: 48, absent: 2, late: 1, total: 51, rate: "94.1%" },
    { id: "STU-002", name: "Liam Williams", class: "Grade 11-B", present: 50, absent: 1, late: 0, total: 51, rate: "98.0%" },
    { id: "STU-003", name: "Olivia Brown", class: "Grade 9-C", present: 51, absent: 0, late: 0, total: 51, rate: "100%" },
    { id: "STU-004", name: "Noah Davis", class: "Grade 12-A", present: 40, absent: 8, late: 3, total: 51, rate: "78.4%" },
    { id: "STU-005", name: "Ava Martinez", class: "Grade 10-B", present: 49, absent: 1, late: 1, total: 51, rate: "96.1%" },
    { id: "STU-006", name: "Ethan Wilson", class: "Grade 11-A", present: 46, absent: 3, late: 2, total: 51, rate: "90.2%" },
    { id: "STU-007", name: "Sophia Anderson", class: "Grade 9-A", present: 51, absent: 0, late: 0, total: 51, rate: "100%" },
    { id: "STU-008", name: "Mason Taylor", class: "Grade 12-B", present: 44, absent: 5, late: 2, total: 51, rate: "86.3%" },
    { id: "STU-009", name: "Isabella Thomas", class: "Grade 10-C", present: 47, absent: 2, late: 2, total: 51, rate: "92.2%" },
    { id: "STU-010", name: "James Jackson", class: "Grade 11-C", present: 35, absent: 12, late: 4, total: 51, rate: "68.6%" },
  ];

  const todayAttendance = [
    { time: "8:00 AM", class: "Grade 12-A", teacher: "Dr. Sarah Lee", present: 30, absent: 2, total: 32 },
    { time: "9:00 AM", class: "Grade 11-B", teacher: "Mr. James Carter", present: 28, absent: 2, total: 30 },
    { time: "10:30 AM", class: "Grade 10-A", teacher: "Ms. Rachel Kim", present: 33, absent: 1, total: 34 },
    { time: "1:00 PM", class: "Grade 9-C", teacher: "Mr. David Park", present: 27, absent: 1, total: 28 },
    { time: "2:00 PM", class: "Grade 12-B", teacher: "Ms. Linda Chen", present: 26, absent: 3, total: 29 },
  ];

  const rateColor = (rate: string) => {
    const val = parseFloat(rate);
    if (val >= 95) return "badge-green";
    if (val >= 85) return "badge-blue";
    if (val >= 75) return "badge-yellow";
    return "badge-red";
  };

  const rateBarColor = (rate: string) => {
    const val = parseFloat(rate);
    if (val >= 95) return "bg-emerald-500";
    if (val >= 85) return "bg-blue-500";
    if (val >= 75) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance</h1>
          <p className="text-slate-400 text-sm mt-1">Track and manage student attendance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            March 3, 2026
          </div>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Present Today", value: "1,174", sub: "94.1% of total", color: "text-emerald-400" },
          { label: "Absent Today", value: "52", sub: "4.2% of total", color: "text-red-400" },
          { label: "Late Today", value: "22", sub: "1.7% of total", color: "text-amber-400" },
          { label: "Monthly Avg.", value: "94.2%", sub: "↓ 0.8% vs last month", color: "text-blue-400" },
        ].map((item) => (
          <div key={item.label} className="stat-card">
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-slate-400 text-sm mt-1">{item.label}</p>
            <p className="text-slate-600 text-xs mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Today's Class Attendance */}
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Today&apos;s Class Attendance</h2>
          </div>
          <div className="p-4 space-y-3">
            {todayAttendance.map((item) => {
              const pct = Math.round((item.present / item.total) * 100);
              return (
                <div key={item.class} className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-white font-medium text-sm">{item.class}</p>
                      <p className="text-slate-500 text-xs">{item.teacher} · {item.time}</p>
                    </div>
                    <span className={`badge ${pct >= 95 ? "badge-green" : pct >= 85 ? "badge-blue" : "badge-yellow"}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="text-emerald-400">✓ {item.present} present</span>
                    <span className="text-red-400">✗ {item.absent} absent</span>
                    <span className="text-slate-500">/ {item.total} total</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${pct >= 95 ? "bg-emerald-500" : pct >= 85 ? "bg-blue-500" : "bg-amber-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Student Attendance Overview */}
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">At-Risk Students (Low Attendance)</h2>
          </div>
          <div className="p-4 space-y-3">
            {attendanceData
              .filter((s) => parseFloat(s.rate) < 90)
              .map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-red-950 flex items-center justify-center text-xs font-semibold text-red-400 flex-shrink-0">
                    {s.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{s.name}</p>
                    <p className="text-slate-500 text-xs">{s.class}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-slate-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${rateBarColor(s.rate)}`}
                          style={{ width: s.rate }}
                        />
                      </div>
                    </div>
                  </div>
                  <span className={`badge ${rateColor(s.rate)} flex-shrink-0`}>{s.rate}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Full Attendance Table */}
      <div className="page-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">Student Attendance Summary</h2>
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Search students..." className="search-input w-48" />
            <select className="search-input">
              <option value="">All Classes</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Late</th>
                <th>Total Days</th>
                <th>Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-white font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td>{s.class}</td>
                  <td className="text-emerald-400">{s.present}</td>
                  <td className="text-red-400">{s.absent}</td>
                  <td className="text-amber-400">{s.late}</td>
                  <td className="text-slate-400">{s.total}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${rateBarColor(s.rate)}`}
                          style={{ width: s.rate }}
                        />
                      </div>
                      <span className={`badge ${rateColor(s.rate)}`}>{s.rate}</span>
                    </div>
                  </td>
                  <td>
                    <button className="text-slate-400 hover:text-blue-400 transition-colors text-xs btn-secondary py-1 px-2">
                      Details
                    </button>
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
