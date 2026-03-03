export default function RolesPage() {
  const roles = [
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access with all permissions",
      color: "bg-red-500/10 border-red-500/30 text-red-400",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
      userCount: 2,
      users: ["John Smith", "Mary Admin"],
      badge: "badge-red",
    },
    {
      id: 2,
      name: "Principal",
      description: "School-wide management and reporting access",
      color: "bg-purple-500/10 border-purple-500/30 text-purple-400",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      userCount: 1,
      users: ["Dr. Patricia Moore"],
      badge: "badge-blue",
    },
    {
      id: 3,
      name: "Teacher",
      description: "Manage classes, grades, and attendance",
      color: "bg-blue-500/10 border-blue-500/30 text-blue-400",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      userCount: 24,
      users: ["Mr. James Wilson", "Ms. Sarah Johnson", "+22 more"],
      badge: "badge-blue",
    },
    {
      id: 4,
      name: "Finance Officer",
      description: "Manage fees, payments, and financial reports",
      color: "bg-green-500/10 border-green-500/30 text-green-400",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
      userCount: 3,
      users: ["Alice Finance", "Bob Treasurer", "Carol Accounts"],
      badge: "badge-green",
    },
    {
      id: 5,
      name: "Parent",
      description: "View child's progress, attendance, and fees",
      color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
      userCount: 312,
      users: ["Mr. & Mrs. Brown", "Mr. & Mrs. Davis", "+310 more"],
      badge: "badge-yellow",
    },
    {
      id: 6,
      name: "Student",
      description: "View own grades, schedule, and announcements",
      color: "bg-slate-500/10 border-slate-500/30 text-slate-400",
      iconBg: "bg-slate-500/20",
      iconColor: "text-slate-400",
      userCount: 487,
      users: ["Emma Johnson", "Liam Brown", "+485 more"],
      badge: "badge-blue",
    },
  ];

  type PermLevel = "full" | "view" | "none" | "own";

  const modules = [
    "Dashboard",
    "Students",
    "Teachers",
    "Classes",
    "Attendance",
    "Grades",
    "Fees",
    "Roles & Permissions",
    "Reports",
    "Settings",
  ];

  const permMatrix: Record<string, Record<string, PermLevel>> = {
    "Super Admin": {
      Dashboard: "full",
      Students: "full",
      Teachers: "full",
      Classes: "full",
      Attendance: "full",
      Grades: "full",
      Fees: "full",
      "Roles & Permissions": "full",
      Reports: "full",
      Settings: "full",
    },
    Principal: {
      Dashboard: "full",
      Students: "full",
      Teachers: "full",
      Classes: "full",
      Attendance: "full",
      Grades: "full",
      Fees: "view",
      "Roles & Permissions": "view",
      Reports: "full",
      Settings: "view",
    },
    Teacher: {
      Dashboard: "view",
      Students: "view",
      Teachers: "view",
      Classes: "full",
      Attendance: "full",
      Grades: "full",
      Fees: "none",
      "Roles & Permissions": "none",
      Reports: "view",
      Settings: "none",
    },
    "Finance Officer": {
      Dashboard: "view",
      Students: "view",
      Teachers: "none",
      Classes: "none",
      Attendance: "none",
      Grades: "none",
      Fees: "full",
      "Roles & Permissions": "none",
      Reports: "full",
      Settings: "none",
    },
    Parent: {
      Dashboard: "view",
      Students: "own",
      Teachers: "view",
      Classes: "view",
      Attendance: "own",
      Grades: "own",
      Fees: "own",
      "Roles & Permissions": "none",
      Reports: "none",
      Settings: "none",
    },
    Student: {
      Dashboard: "view",
      Students: "none",
      Teachers: "view",
      Classes: "view",
      Attendance: "own",
      Grades: "own",
      Fees: "own",
      "Roles & Permissions": "none",
      Reports: "none",
      Settings: "none",
    },
  };

  const permLabel: Record<PermLevel, { label: string; cls: string }> = {
    full: { label: "Full Access", cls: "badge badge-green" },
    view: { label: "View Only", cls: "badge badge-blue" },
    own: { label: "Own Data", cls: "badge badge-yellow" },
    none: { label: "No Access", cls: "badge badge-red" },
  };

  const recentActivity = [
    { user: "John Smith", action: "Updated Teacher role permissions", time: "2 hours ago", type: "edit" },
    { user: "Mary Admin", action: "Added Finance Officer role", time: "1 day ago", type: "add" },
    { user: "John Smith", action: "Assigned Alice Finance to Finance Officer", time: "1 day ago", type: "assign" },
    { user: "Mary Admin", action: "Removed Student from Grades full access", time: "3 days ago", type: "remove" },
    { user: "John Smith", action: "Created Parent role", time: "1 week ago", type: "add" },
    { user: "Mary Admin", action: "Updated Super Admin permissions", time: "2 weeks ago", type: "edit" },
  ];

  const userAssignments = [
    { name: "Dr. Patricia Moore", email: "p.moore@school.edu", role: "Principal", status: "Active", lastLogin: "Today" },
    { name: "Mr. James Wilson", email: "j.wilson@school.edu", role: "Teacher", status: "Active", lastLogin: "Today" },
    { name: "Ms. Sarah Johnson", email: "s.johnson@school.edu", role: "Teacher", status: "Active", lastLogin: "Yesterday" },
    { name: "Alice Finance", email: "a.finance@school.edu", role: "Finance Officer", status: "Active", lastLogin: "Today" },
    { name: "Bob Treasurer", email: "b.treasurer@school.edu", role: "Finance Officer", status: "Active", lastLogin: "3 days ago" },
    { name: "Mr. & Mrs. Brown", email: "brown.family@email.com", role: "Parent", status: "Active", lastLogin: "1 week ago" },
    { name: "Emma Johnson", email: "e.johnson@student.edu", role: "Student", status: "Active", lastLogin: "Today" },
    { name: "Liam Brown", email: "l.brown@student.edu", role: "Student", status: "Inactive", lastLogin: "2 weeks ago" },
  ];

  const roleColors: Record<string, string> = {
    "Super Admin": "badge-red",
    Principal: "badge-blue",
    Teacher: "badge-blue",
    "Finance Officer": "badge-green",
    Parent: "badge-yellow",
    Student: "badge-blue",
  };

  const activityIcon: Record<string, { icon: string; color: string }> = {
    edit: { icon: "✏️", color: "text-blue-400" },
    add: { icon: "➕", color: "text-green-400" },
    assign: { icon: "👤", color: "text-purple-400" },
    remove: { icon: "🗑️", color: "text-red-400" },
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Roles &amp; Permissions</h1>
          <p className="text-slate-400 text-sm mt-1">Manage user roles and control access to system modules</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Role
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <p className="text-slate-400 text-sm mb-1">Total Roles</p>
          <p className="text-3xl font-bold text-white">6</p>
          <p className="text-slate-500 text-xs mt-1">System-defined roles</p>
        </div>
        <div className="stat-card">
          <p className="text-slate-400 text-sm mb-1">Total Users</p>
          <p className="text-3xl font-bold text-white">829</p>
          <p className="text-slate-500 text-xs mt-1">Across all roles</p>
        </div>
        <div className="stat-card">
          <p className="text-slate-400 text-sm mb-1">Active Modules</p>
          <p className="text-3xl font-bold text-white">10</p>
          <p className="text-slate-500 text-xs mt-1">Permission-controlled</p>
        </div>
        <div className="stat-card">
          <p className="text-slate-400 text-sm mb-1">Last Updated</p>
          <p className="text-3xl font-bold text-white">2h</p>
          <p className="text-slate-500 text-xs mt-1">Ago by John Smith</p>
        </div>
      </div>

      {/* Role Cards */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">System Roles</h2>
        <div className="grid grid-cols-3 gap-4">
          {roles.map((role) => (
            <div key={role.id} className={`page-card border ${role.color.split(" ").find(c => c.startsWith("border-")) ?? "border-slate-700"} p-5`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${role.iconBg} flex items-center justify-center`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={role.iconColor}>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{role.name}</h3>
                    <p className="text-slate-500 text-xs">{role.userCount} users</p>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-slate-300 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>
              <p className="text-slate-400 text-xs mb-4">{role.description}</p>
              <div className="flex flex-wrap gap-1">
                {role.users.map((u, i) => (
                  <span key={i} className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{u}</span>
                ))}
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-800">
                <button className="btn-secondary text-xs py-1 px-3 flex-1 justify-center">Edit Role</button>
                <button className="btn-secondary text-xs py-1 px-3 flex-1 justify-center">Assign Users</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Matrix */}
      <div className="page-card mb-8">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold">Permission Matrix</h2>
            <p className="text-slate-500 text-xs mt-0.5">Overview of access levels per role and module</p>
          </div>
          <div className="flex gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>Full Access</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>View Only</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span>Own Data</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>No Access</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="min-w-[160px]">Module</th>
                {roles.map((r) => (
                  <th key={r.id} className="text-center min-w-[120px]">{r.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map((mod) => (
                <tr key={mod}>
                  <td className="font-medium text-slate-300">{mod}</td>
                  {roles.map((r) => {
                    const level = permMatrix[r.name]?.[mod] ?? "none";
                    const { label, cls } = permLabel[level];
                    return (
                      <td key={r.id} className="text-center">
                        <span className={cls}>{label}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom two-column layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* User-Role Assignments */}
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-white font-semibold">User Assignments</h2>
              <p className="text-slate-500 text-xs mt-0.5">Recent user-role mappings</p>
            </div>
            <button className="btn-secondary text-xs py-1.5 px-3">View All</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {userAssignments.map((u, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center text-slate-300 text-xs font-semibold flex-shrink-0">
                        {u.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <p className="text-slate-200 text-xs font-medium leading-tight">{u.name}</p>
                        <p className="text-slate-500 text-xs">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${roleColors[u.role] ?? "badge-blue"}`}>{u.role}</span>
                  </td>
                  <td>
                    <span className={`badge ${u.status === "Active" ? "badge-green" : "badge-red"}`}>{u.status}</span>
                  </td>
                  <td className="text-slate-400 text-xs">{u.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Activity */}
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Recent Activity</h2>
            <p className="text-slate-500 text-xs mt-0.5">Audit log of permission changes</p>
          </div>
          <div className="p-4 space-y-3">
            {recentActivity.map((a, i) => {
              const { icon, color } = activityIcon[a.type] ?? { icon: "•", color: "text-slate-400" };
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                  <span className="text-lg leading-none mt-0.5">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-sm leading-snug">{a.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-medium ${color}`}>{a.user}</span>
                      <span className="text-slate-600 text-xs">·</span>
                      <span className="text-slate-500 text-xs">{a.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
