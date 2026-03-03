export default function GradesPage() {
  const grades = [
    { id: "STU-001", name: "Emma Johnson", class: "Grade 10-A", math: 92, english: 88, science: 95, history: 85, art: 90, avg: 90.0, letter: "A-", rank: 3 },
    { id: "STU-002", name: "Liam Williams", class: "Grade 11-B", math: 78, english: 85, science: 80, history: 82, art: 75, avg: 80.0, letter: "B-", rank: 12 },
    { id: "STU-003", name: "Olivia Brown", class: "Grade 9-C", math: 98, english: 96, science: 97, history: 94, art: 99, avg: 96.8, letter: "A+", rank: 1 },
    { id: "STU-004", name: "Noah Davis", class: "Grade 12-A", math: 65, english: 70, science: 68, history: 72, art: 60, avg: 67.0, letter: "D+", rank: 28 },
    { id: "STU-005", name: "Ava Martinez", class: "Grade 10-B", math: 88, english: 91, science: 86, history: 89, art: 93, avg: 89.4, letter: "B+", rank: 5 },
    { id: "STU-006", name: "Ethan Wilson", class: "Grade 11-A", math: 82, english: 79, science: 84, history: 80, art: 77, avg: 80.4, letter: "B-", rank: 11 },
    { id: "STU-007", name: "Sophia Anderson", class: "Grade 9-A", math: 100, english: 98, science: 99, history: 97, art: 100, avg: 98.8, letter: "A+", rank: 1 },
    { id: "STU-008", name: "Mason Taylor", class: "Grade 12-B", math: 75, english: 80, science: 78, history: 76, art: 82, avg: 78.2, letter: "C+", rank: 18 },
    { id: "STU-009", name: "Isabella Thomas", class: "Grade 10-C", math: 86, english: 84, science: 88, history: 83, art: 87, avg: 85.6, letter: "B", rank: 8 },
    { id: "STU-010", name: "James Jackson", class: "Grade 11-C", math: 58, english: 62, science: 55, history: 60, art: 65, avg: 60.0, letter: "D", rank: 32 },
  ];

  const letterColor = (letter: string) => {
    if (letter.startsWith("A")) return "badge-green";
    if (letter.startsWith("B")) return "badge-blue";
    if (letter.startsWith("C")) return "badge-yellow";
    return "badge-red";
  };

  const scoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 70) return "text-amber-400";
    return "text-red-400";
  };

  const gradeDistribution = [
    { grade: "A+ (97-100)", count: 2, pct: 20 },
    { grade: "A (93-96)", count: 3, pct: 30 },
    { grade: "A- (90-92)", count: 2, pct: 20 },
    { grade: "B+ (87-89)", count: 5, pct: 50 },
    { grade: "B (83-86)", count: 8, pct: 80 },
    { grade: "B- (80-82)", count: 6, pct: 60 },
    { grade: "C+ (77-79)", count: 4, pct: 40 },
    { grade: "C (73-76)", count: 3, pct: 30 },
    { grade: "D & Below", count: 3, pct: 30 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Grades & Results</h1>
          <p className="text-slate-400 text-sm mt-1">Academic performance and report cards</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="search-input">
            <option>Spring Semester 2026</option>
            <option>Fall Semester 2025</option>
            <option>Spring Semester 2025</option>
          </select>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Grades
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Class Average", value: "82.6%", color: "text-blue-400" },
          { label: "Highest Score", value: "98.8%", color: "text-emerald-400" },
          { label: "Passing Rate", value: "91.4%", color: "text-purple-400" },
          { label: "Failing Students", value: "107", color: "text-red-400" },
        ].map((item) => (
          <div key={item.label} className="stat-card text-center">
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-slate-400 text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Grade Distribution */}
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Grade Distribution</h2>
          </div>
          <div className="p-4 space-y-2">
            {gradeDistribution.map((item) => (
              <div key={item.grade} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{item.grade}</span>
                  <span className="text-slate-300">{item.count} students</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="xl:col-span-2 page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Top Performers</h2>
          </div>
          <div className="p-4 space-y-3">
            {grades
              .sort((a, b) => b.avg - a.avg)
              .slice(0, 5)
              .map((s, idx) => (
                <div key={s.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    idx === 0 ? "bg-amber-500 text-amber-950" :
                    idx === 1 ? "bg-slate-400 text-slate-900" :
                    idx === 2 ? "bg-amber-700 text-amber-100" :
                    "bg-slate-700 text-slate-300"
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{s.name}</p>
                    <p className="text-slate-500 text-xs">{s.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{s.avg.toFixed(1)}%</p>
                    <span className={`badge ${letterColor(s.letter)}`}>{s.letter}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Full Grades Table */}
      <div className="page-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">All Student Grades</h2>
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
                <th>Math</th>
                <th>English</th>
                <th>Science</th>
                <th>History</th>
                <th>Art</th>
                <th>Average</th>
                <th>Grade</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((s) => (
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
                  <td className={scoreColor(s.math)}>{s.math}</td>
                  <td className={scoreColor(s.english)}>{s.english}</td>
                  <td className={scoreColor(s.science)}>{s.science}</td>
                  <td className={scoreColor(s.history)}>{s.history}</td>
                  <td className={scoreColor(s.art)}>{s.art}</td>
                  <td className="text-white font-semibold">{s.avg.toFixed(1)}</td>
                  <td>
                    <span className={`badge ${letterColor(s.letter)}`}>{s.letter}</span>
                  </td>
                  <td className="text-slate-400">#{s.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
          <p className="text-slate-500 text-sm">Showing 10 of 1,248 students</p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary px-3 py-1.5 text-xs">Previous</button>
            <button className="btn-primary px-3 py-1.5 text-xs">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
