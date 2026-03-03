export default function FeesPage() {
  const feeRecords = [
    { id: "FEE-001", studentId: "STU-001", name: "Emma Johnson", class: "Grade 10-A", term: "Term 1 2024", amount: 1500, paid: 1500, balance: 0, dueDate: "2024-02-15", status: "Paid" },
    { id: "FEE-002", studentId: "STU-002", name: "Liam Williams", class: "Grade 11-B", term: "Term 1 2024", amount: 1500, paid: 750, balance: 750, dueDate: "2024-02-15", status: "Partial" },
    { id: "FEE-003", studentId: "STU-003", name: "Olivia Brown", class: "Grade 9-C", term: "Term 1 2024", amount: 1200, paid: 1200, balance: 0, dueDate: "2024-02-15", status: "Paid" },
    { id: "FEE-004", studentId: "STU-004", name: "Noah Davis", class: "Grade 12-A", term: "Term 1 2024", amount: 1800, paid: 0, balance: 1800, dueDate: "2024-02-15", status: "Overdue" },
    { id: "FEE-005", studentId: "STU-005", name: "Ava Martinez", class: "Grade 10-B", term: "Term 1 2024", amount: 1500, paid: 1500, balance: 0, dueDate: "2024-02-15", status: "Paid" },
    { id: "FEE-006", studentId: "STU-006", name: "Ethan Wilson", class: "Grade 11-A", term: "Term 1 2024", amount: 1500, paid: 500, balance: 1000, dueDate: "2024-02-15", status: "Partial" },
    { id: "FEE-007", studentId: "STU-007", name: "Sophia Anderson", class: "Grade 9-A", term: "Term 1 2024", amount: 1200, paid: 1200, balance: 0, dueDate: "2024-03-01", status: "Paid" },
    { id: "FEE-008", studentId: "STU-008", name: "Mason Taylor", class: "Grade 12-B", term: "Term 1 2024", amount: 1800, paid: 0, balance: 1800, dueDate: "2024-02-15", status: "Overdue" },
    { id: "FEE-009", studentId: "STU-009", name: "Isabella Thomas", class: "Grade 10-C", term: "Term 1 2024", amount: 1500, paid: 1500, balance: 0, dueDate: "2024-03-01", status: "Paid" },
    { id: "FEE-010", studentId: "STU-010", name: "James Jackson", class: "Grade 11-C", term: "Term 1 2024", amount: 1500, paid: 0, balance: 1500, dueDate: "2024-03-15", status: "Pending" },
  ];

  const recentPayments = [
    { student: "Emma Johnson", amount: 1500, date: "2024-02-10", method: "Bank Transfer", receipt: "RCP-0041" },
    { student: "Olivia Brown", amount: 1200, date: "2024-02-09", method: "Cash", receipt: "RCP-0040" },
    { student: "Sophia Anderson", amount: 1200, date: "2024-02-08", method: "Online", receipt: "RCP-0039" },
    { student: "Ava Martinez", amount: 1500, date: "2024-02-07", method: "Bank Transfer", receipt: "RCP-0038" },
    { student: "Isabella Thomas", amount: 1500, date: "2024-02-06", method: "Cash", receipt: "RCP-0037" },
  ];

  const statusColor = (status: string) => {
    if (status === "Paid") return "badge-green";
    if (status === "Partial") return "badge-yellow";
    if (status === "Overdue") return "badge-red";
    return "badge-blue";
  };

  const methodColor = (method: string) => {
    if (method === "Bank Transfer") return "text-blue-400";
    if (method === "Cash") return "text-emerald-400";
    return "text-purple-400";
  };

  const totalCollected = feeRecords.reduce((sum, r) => sum + r.paid, 0);
  const totalOutstanding = feeRecords.reduce((sum, r) => sum + r.balance, 0);
  const totalExpected = feeRecords.reduce((sum, r) => sum + r.amount, 0);
  const collectionRate = Math.round((totalCollected / totalExpected) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">School Fees</h1>
          <p className="text-slate-400 text-sm mt-1">Track and manage student fee payments</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Record Payment
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Total Expected</p>
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">${totalExpected.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">Term 1 2024</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Collected</p>
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-400">${totalCollected.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{collectionRate}% collection rate</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Outstanding</p>
            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-amber-400">${totalOutstanding.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{feeRecords.filter(r => r.balance > 0).length} students pending</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Overdue</p>
            <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-red-400">{feeRecords.filter(r => r.status === "Overdue").length}</p>
          <p className="text-slate-500 text-xs mt-1">Overdue accounts</p>
        </div>
      </div>

      {/* Collection Progress */}
      <div className="page-card px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Collection Progress — Term 1 2024</h2>
          <span className="text-slate-400 text-sm">{collectionRate}% collected</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-blue-600 to-emerald-500 h-3 rounded-full transition-all"
            style={{ width: `${collectionRate}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-emerald-400 font-semibold">{feeRecords.filter(r => r.status === "Paid").length}</p>
            <p className="text-slate-500 text-xs mt-0.5">Fully Paid</p>
          </div>
          <div>
            <p className="text-amber-400 font-semibold">{feeRecords.filter(r => r.status === "Partial").length}</p>
            <p className="text-slate-500 text-xs mt-0.5">Partial</p>
          </div>
          <div>
            <p className="text-red-400 font-semibold">{feeRecords.filter(r => r.status === "Overdue" || r.status === "Pending").length}</p>
            <p className="text-slate-500 text-xs mt-0.5">Unpaid / Overdue</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fee Records Table */}
        <div className="lg:col-span-2 page-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Fee Records</h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search student..."
                className="search-input w-48"
              />
              <select className="search-input text-sm pr-8">
                <option>All Status</option>
                <option>Paid</option>
                <option>Partial</option>
                <option>Overdue</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Amount</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feeRecords.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300 flex-shrink-0">
                          {r.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{r.name}</p>
                          <p className="text-slate-500 text-xs font-mono">{r.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-slate-400 text-sm">{r.class}</td>
                    <td className="text-white font-medium">${r.amount.toLocaleString()}</td>
                    <td className="text-emerald-400">${r.paid.toLocaleString()}</td>
                    <td className={r.balance > 0 ? "text-red-400 font-medium" : "text-slate-500"}>
                      ${r.balance.toLocaleString()}
                    </td>
                    <td className="text-slate-400 text-sm">{r.dueDate}</td>
                    <td>
                      <span className={`badge ${statusColor(r.status)}`}>{r.status}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="text-slate-400 hover:text-blue-400 transition-colors" title="View">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button className="text-slate-400 hover:text-emerald-400 transition-colors" title="Record Payment">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                        </button>
                        <button className="text-slate-400 hover:text-amber-400 transition-colors" title="Send Reminder">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
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
            <p className="text-slate-500 text-sm">Showing 10 of 1,248 records</p>
            <div className="flex items-center gap-2">
              <button className="btn-secondary px-3 py-1.5 text-xs">Previous</button>
              <button className="btn-primary px-3 py-1.5 text-xs">Next</button>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Recent Payments</h2>
            <p className="text-slate-500 text-xs mt-0.5">Last 5 transactions</p>
          </div>
          <div className="divide-y divide-slate-800">
            {recentPayments.map((p, i) => (
              <div key={i} className="px-6 py-4">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300 flex-shrink-0">
                      {p.student.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <p className="text-white text-sm font-medium">{p.student}</p>
                  </div>
                  <p className="text-emerald-400 font-semibold text-sm">${p.amount.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between ml-9">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${methodColor(p.method)}`}>{p.method}</span>
                    <span className="text-slate-600 text-xs">·</span>
                    <span className="text-slate-500 text-xs">{p.date}</span>
                  </div>
                  <span className="text-slate-600 text-xs font-mono">{p.receipt}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-slate-800">
            <button className="w-full btn-secondary text-sm justify-center">
              View All Transactions
            </button>
          </div>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="page-card">
        <div className="px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">Fee Structure</h2>
          <p className="text-slate-500 text-xs mt-0.5">Annual fee breakdown by grade level</p>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Grade Level</th>
                <th>Tuition Fee</th>
                <th>Activity Fee</th>
                <th>Lab Fee</th>
                <th>Library Fee</th>
                <th>Total / Term</th>
                <th>Annual Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { grade: "Grade 9", tuition: 800, activity: 150, lab: 100, library: 50 },
                { grade: "Grade 10", tuition: 900, activity: 150, lab: 150, library: 50 },
                { grade: "Grade 11", tuition: 1000, activity: 200, lab: 200, library: 50 },
                { grade: "Grade 12", tuition: 1200, activity: 200, lab: 250, library: 50 },
              ].map((row) => {
                const termTotal = row.tuition + row.activity + row.lab + row.library;
                return (
                  <tr key={row.grade}>
                    <td className="text-white font-medium">{row.grade}</td>
                    <td>${row.tuition.toLocaleString()}</td>
                    <td>${row.activity.toLocaleString()}</td>
                    <td>${row.lab.toLocaleString()}</td>
                    <td>${row.library.toLocaleString()}</td>
                    <td className="text-blue-400 font-semibold">${termTotal.toLocaleString()}</td>
                    <td className="text-emerald-400 font-semibold">${(termTotal * 3).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
