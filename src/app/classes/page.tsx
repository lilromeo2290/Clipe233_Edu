export default function ClassesPage() {
  const classes = [
    { id: "CLS-001", name: "Grade 12-A", subject: "Advanced Mathematics", teacher: "Dr. Sarah Lee", students: 32, room: "Room 201", schedule: "Mon/Wed/Fri 9:00 AM", status: "Active", avgGrade: "A-" },
    { id: "CLS-002", name: "Grade 11-B", subject: "English Literature", teacher: "Mr. James Carter", students: 30, room: "Room 105", schedule: "Tue/Thu 10:30 AM", status: "Active", avgGrade: "B+" },
    { id: "CLS-003", name: "Grade 10-A", subject: "Biology", teacher: "Ms. Rachel Kim", students: 34, room: "Lab 3", schedule: "Mon/Wed 2:00 PM", status: "Active", avgGrade: "B+" },
    { id: "CLS-004", name: "Grade 9-C", subject: "World History", teacher: "Mr. David Park", students: 28, room: "Room 302", schedule: "Tue/Thu 1:00 PM", status: "Active", avgGrade: "B" },
    { id: "CLS-005", name: "Grade 12-B", subject: "Chemistry", teacher: "Ms. Linda Chen", students: 29, room: "Lab 1", schedule: "Mon/Wed/Fri 11:00 AM", status: "Active", avgGrade: "B+" },
    { id: "CLS-006", name: "Grade 11-A", subject: "Physics", teacher: "Mr. Robert Singh", students: 31, room: "Lab 2", schedule: "Tue/Thu 9:00 AM", status: "Active", avgGrade: "A" },
    { id: "CLS-007", name: "Grade 10-B", subject: "Art & Design", teacher: "Ms. Angela White", students: 25, room: "Art Studio", schedule: "Fri 2:00 PM", status: "On Hold", avgGrade: "A-" },
    { id: "CLS-008", name: "Grade 9-A", subject: "Physical Education", teacher: "Mr. Kevin Brown", students: 35, room: "Gymnasium", schedule: "Mon/Wed/Fri 3:00 PM", status: "Active", avgGrade: "B" },
  ];

  const gradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "badge-green";
    if (grade.startsWith("B")) return "badge-blue";
    return "badge-yellow";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Classes</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all classes and courses</p>
        </div>
        <button className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Class
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Classes", value: "42", color: "text-emerald-400" },
          { label: "Active", value: "38", color: "text-blue-400" },
          { label: "On Hold", value: "3", color: "text-amber-400" },
          { label: "Avg. Class Size", value: "30.5", color: "text-purple-400" },
        ].map((item) => (
          <div key={item.label} className="stat-card text-center">
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-slate-400 text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div key={cls.id} className="page-card p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-semibold">{cls.name}</h3>
                <p className="text-slate-400 text-sm">{cls.subject}</p>
              </div>
              <span className={`badge ${cls.status === "Active" ? "badge-green" : "badge-yellow"}`}>
                {cls.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-slate-400">Teacher:</span>
                <span className="text-slate-200">{cls.teacher}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="text-slate-400">Students:</span>
                <span className="text-slate-200">{cls.students}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-slate-400">Schedule:</span>
                <span className="text-slate-200">{cls.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="text-slate-400">Room:</span>
                <span className="text-slate-200">{cls.room}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs">Avg. Grade:</span>
                <span className={`badge ${gradeColor(cls.avgGrade)}`}>{cls.avgGrade}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-slate-400 hover:text-blue-400 transition-colors text-xs btn-secondary py-1 px-2">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
