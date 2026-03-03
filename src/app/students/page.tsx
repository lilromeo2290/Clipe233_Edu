export default function StudentsPage() {
  const students = [
    { id: "STU-001", name: "Emma Johnson", age: 16, class: "Grade 10-A", gender: "Female", phone: "+1 555-0101", email: "emma.j@school.edu", status: "Active", gpa: "3.8" },
    { id: "STU-002", name: "Liam Williams", age: 17, class: "Grade 11-B", gender: "Male", phone: "+1 555-0102", email: "liam.w@school.edu", status: "Active", gpa: "3.5" },
    { id: "STU-003", name: "Olivia Brown", age: 15, class: "Grade 9-C", gender: "Female", phone: "+1 555-0103", email: "olivia.b@school.edu", status: "Active", gpa: "3.9" },
    { id: "STU-004", name: "Noah Davis", age: 18, class: "Grade 12-A", gender: "Male", phone: "+1 555-0104", email: "noah.d@school.edu", status: "Inactive", gpa: "2.9" },
    { id: "STU-005", name: "Ava Martinez", age: 16, class: "Grade 10-B", gender: "Female", phone: "+1 555-0105", email: "ava.m@school.edu", status: "Active", gpa: "3.7" },
    { id: "STU-006", name: "Ethan Wilson", age: 17, class: "Grade 11-A", gender: "Male", phone: "+1 555-0106", email: "ethan.w@school.edu", status: "Active", gpa: "3.2" },
    { id: "STU-007", name: "Sophia Anderson", age: 15, class: "Grade 9-A", gender: "Female", phone: "+1 555-0107", email: "sophia.a@school.edu", status: "Active", gpa: "4.0" },
    { id: "STU-008", name: "Mason Taylor", age: 18, class: "Grade 12-B", gender: "Male", phone: "+1 555-0108", email: "mason.t@school.edu", status: "Active", gpa: "3.4" },
    { id: "STU-009", name: "Isabella Thomas", age: 16, class: "Grade 10-C", gender: "Female", phone: "+1 555-0109", email: "isabella.t@school.edu", status: "Active", gpa: "3.6" },
    { id: "STU-010", name: "James Jackson", age: 17, class: "Grade 11-C", gender: "Male", phone: "+1 555-0110", email: "james.j@school.edu", status: "Suspended", gpa: "2.5" },
  ];

  const gpaColor = (gpa: string) => {
    const val = parseFloat(gpa);
    if (val >= 3.7) return "badge-green";
    if (val >= 3.0) return "badge-blue";
    if (val >= 2.5) return "badge-yellow";
    return "badge-red";
  };

  const statusColor = (status: string) => {
    if (status === "Active") return "badge-green";
    if (status === "Inactive") return "badge-yellow";
    return "badge-red";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Students</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all enrolled students</p>
        </div>
        <button className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Student
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "1,248", color: "text-blue-400" },
          { label: "Active", value: "1,186", color: "text-emerald-400" },
          { label: "Inactive", value: "48", color: "text-amber-400" },
          { label: "Suspended", value: "14", color: "text-red-400" },
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
          <h2 className="text-white font-semibold">All Students</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search students..."
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
                <th>Student</th>
                <th>ID</th>
                <th>Class</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
                <th>GPA</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300 flex-shrink-0">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-white font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="text-slate-500 font-mono text-xs">{s.id}</td>
                  <td>{s.class}</td>
                  <td>{s.age}</td>
                  <td>{s.gender}</td>
                  <td className="text-slate-400">{s.email}</td>
                  <td>
                    <span className={`badge ${gpaColor(s.gpa)}`}>{s.gpa}</span>
                  </td>
                  <td>
                    <span className={`badge ${statusColor(s.status)}`}>{s.status}</span>
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
        {/* Pagination */}
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
