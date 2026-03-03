export default function TeachersPage() {
  const teachers = [
    { id: "TCH-001", name: "Dr. Sarah Lee", subject: "Mathematics", classes: ["Grade 12-A", "Grade 11-B"], experience: "12 yrs", email: "sarah.lee@school.edu", phone: "+1 555-1001", status: "Active", rating: "4.9" },
    { id: "TCH-002", name: "Mr. James Carter", subject: "English Literature", classes: ["Grade 11-B", "Grade 10-A"], experience: "8 yrs", email: "james.carter@school.edu", phone: "+1 555-1002", status: "Active", rating: "4.7" },
    { id: "TCH-003", name: "Ms. Rachel Kim", subject: "Biology", classes: ["Grade 10-A", "Grade 9-C"], experience: "6 yrs", email: "rachel.kim@school.edu", phone: "+1 555-1003", status: "Active", rating: "4.8" },
    { id: "TCH-004", name: "Mr. David Park", subject: "History", classes: ["Grade 9-C", "Grade 9-A"], experience: "10 yrs", email: "david.park@school.edu", phone: "+1 555-1004", status: "Active", rating: "4.5" },
    { id: "TCH-005", name: "Ms. Linda Chen", subject: "Chemistry", classes: ["Grade 12-B", "Grade 11-A"], experience: "9 yrs", email: "linda.chen@school.edu", phone: "+1 555-1005", status: "Active", rating: "4.6" },
    { id: "TCH-006", name: "Mr. Robert Singh", subject: "Physics", classes: ["Grade 12-A", "Grade 12-B"], experience: "15 yrs", email: "robert.singh@school.edu", phone: "+1 555-1006", status: "Active", rating: "4.9" },
    { id: "TCH-007", name: "Ms. Angela White", subject: "Art & Design", classes: ["Grade 10-B", "Grade 9-A"], experience: "5 yrs", email: "angela.white@school.edu", phone: "+1 555-1007", status: "On Leave", rating: "4.4" },
    { id: "TCH-008", name: "Mr. Kevin Brown", subject: "Physical Education", classes: ["Grade 11-C", "Grade 10-C"], experience: "7 yrs", email: "kevin.brown@school.edu", phone: "+1 555-1008", status: "Active", rating: "4.3" },
  ];

  const ratingColor = (rating: string) => {
    const val = parseFloat(rating);
    if (val >= 4.7) return "badge-green";
    if (val >= 4.3) return "badge-blue";
    return "badge-yellow";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Teachers</h1>
          <p className="text-slate-400 text-sm mt-1">Manage faculty and staff</p>
        </div>
        <button className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Teacher
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Teachers", value: "86", color: "text-purple-400" },
          { label: "Active", value: "79", color: "text-emerald-400" },
          { label: "On Leave", value: "5", color: "text-amber-400" },
          { label: "Subjects", value: "24", color: "text-blue-400" },
        ].map((item) => (
          <div key={item.label} className="stat-card text-center">
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-slate-400 text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="page-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">All Teachers</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search teachers..."
              className="search-input w-56"
            />
            <button className="btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>ID</th>
                <th>Subject</th>
                <th>Classes</th>
                <th>Experience</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center text-xs font-semibold text-purple-300 flex-shrink-0">
                        {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="text-white font-medium">{t.name}</span>
                    </div>
                  </td>
                  <td className="text-slate-500 font-mono text-xs">{t.id}</td>
                  <td className="text-slate-300">{t.subject}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {t.classes.map((c) => (
                        <span key={c} className="badge badge-blue text-xs">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="text-slate-400">{t.experience}</td>
                  <td className="text-slate-400">{t.email}</td>
                  <td>
                    <span className={`badge ${ratingColor(t.rating)}`}>★ {t.rating}</span>
                  </td>
                  <td>
                    <span className={`badge ${t.status === "Active" ? "badge-green" : "badge-yellow"}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="text-slate-400 hover:text-blue-400 transition-colors" title="View">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button className="text-slate-400 hover:text-amber-400 transition-colors" title="Edit">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className="text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
          <p className="text-slate-500 text-sm">Showing 8 of 86 teachers</p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary px-3 py-1.5 text-xs">Previous</button>
            <button className="btn-primary px-3 py-1.5 text-xs">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
