"use client";

import { useState } from "react";

interface Student {
  id: string;
  name: string;
  dateOfAdmission: string;
  status: string;
}

interface ClassItem {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  students: number;
  room: string;
  schedule: string;
  status: string;
  avgGrade: string;
  studentList?: Student[];
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([
    { id: "CLS-001", name: "Grade 12-A", subject: "Advanced Mathematics", teacher: "Dr. Sarah Lee", students: 32, room: "Room 201", schedule: "Mon/Wed/Fri 9:00 AM", status: "Active", avgGrade: "A-", studentList: [
      { id: "STU-001", name: "Alice Johnson", dateOfAdmission: "2023-09-01", status: "Active" },
      { id: "STU-002", name: "Bob Smith", dateOfAdmission: "2023-09-01", status: "Active" },
      { id: "STU-003", name: "Carol Williams", dateOfAdmission: "2023-09-02", status: "Active" },
      { id: "STU-004", name: "David Brown", dateOfAdmission: "2023-09-01", status: "Active" },
      { id: "STU-005", name: "Eva Martinez", dateOfAdmission: "2023-09-03", status: "Active" },
    ]},
    { id: "CLS-002", name: "Grade 11-B", subject: "English Literature", teacher: "Mr. James Carter", students: 30, room: "Room 105", schedule: "Tue/Thu 10:30 AM", status: "Active", avgGrade: "B+", studentList: [
      { id: "STU-006", name: "Frank Davis", dateOfAdmission: "2023-09-01", status: "Active" },
      { id: "STU-007", name: "Grace Wilson", dateOfAdmission: "2023-09-01", status: "Active" },
      { id: "STU-008", name: "Henry Taylor", dateOfAdmission: "2023-09-02", status: "Active" },
    ]},
    { id: "CLS-003", name: "Grade 10-A", subject: "Biology", teacher: "Ms. Rachel Kim", students: 34, room: "Lab 3", schedule: "Mon/Wed 2:00 PM", status: "Active", avgGrade: "B+", studentList: [
      { id: "STU-009", name: "Isabel Moore", dateOfAdmission: "2023-09-01", status: "Active" },
      { id: "STU-010", name: "Jack Anderson", dateOfAdmission: "2023-09-01", status: "Active" },
    ]},
    { id: "CLS-004", name: "Grade 9-C", subject: "World History", teacher: "Mr. David Park", students: 28, room: "Room 302", schedule: "Tue/Thu 1:00 PM", status: "Active", avgGrade: "B", studentList: [
      { id: "STU-011", name: "Katie Thomas", dateOfAdmission: "2024-09-01", status: "Active" },
      { id: "STU-012", name: "Liam Jackson", dateOfAdmission: "2024-09-01", status: "Active" },
    ]},
    { id: "CLS-005", name: "Grade 12-B", subject: "Chemistry", teacher: "Ms. Linda Chen", students: 29, room: "Lab 1", schedule: "Mon/Wed/Fri 11:00 AM", status: "Active", avgGrade: "B+", studentList: [
      { id: "STU-013", name: "Mia White", dateOfAdmission: "2023-09-01", status: "Active" },
    ]},
    { id: "CLS-006", name: "Grade 11-A", subject: "Physics", teacher: "Mr. Robert Singh", students: 31, room: "Lab 2", schedule: "Tue/Thu 9:00 AM", status: "Active", avgGrade: "A", studentList: [
      { id: "STU-014", name: "Noah Harris", dateOfAdmission: "2023-09-01", status: "Active" },
    ]},
    { id: "CLS-007", name: "Grade 10-B", subject: "Art & Design", teacher: "Ms. Angela White", students: 25, room: "Art Studio", schedule: "Fri 2:00 PM", status: "On Hold", avgGrade: "A-", studentList: [
      { id: "STU-015", name: "Olivia Clark", dateOfAdmission: "2023-09-01", status: "Active" },
    ]},
    { id: "CLS-008", name: "Grade 9-A", subject: "Physical Education", teacher: "Mr. Kevin Brown", students: 35, room: "Gymnasium", schedule: "Mon/Wed/Fri 3:00 PM", status: "Active", avgGrade: "B", studentList: [
      { id: "STU-016", name: "Peter Lewis", dateOfAdmission: "2024-09-01", status: "Active" },
    ]},
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newClass, setNewClass] = useState<Partial<ClassItem>>({});
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  const gradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "badge-green";
    if (grade.startsWith("B")) return "badge-blue";
    return "badge-yellow";
  };

  const handleAddClass = () => {
    if (newClass.name && newClass.subject && newClass.teacher) {
      const cls: ClassItem = {
        id: `CLS-${String(classes.length + 1).padStart(3, "0")}`,
        name: newClass.name,
        subject: newClass.subject,
        teacher: newClass.teacher,
        students: newClass.students || 0,
        room: newClass.room || "",
        schedule: newClass.schedule || "",
        status: "Active",
        avgGrade: "N/A",
      };
      setClasses([...classes, cls]);
      setShowAddModal(false);
      setNewClass({});
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Classes</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all classes and courses</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
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
          { label: "Total Classes", value: classes.length.toString(), color: "text-emerald-400" },
          { label: "Active", value: classes.filter((c) => c.status === "Active").length.toString(), color: "text-blue-400" },
          { label: "On Hold", value: classes.filter((c) => c.status === "On Hold").length.toString(), color: "text-amber-400" },
          { label: "Avg. Class Size", value: classes.length > 0 ? (classes.reduce((acc, c) => acc + c.students, 0) / classes.length).toFixed(1) : "0", color: "text-purple-400" },
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
                <button onClick={() => setSelectedClass(cls)} className="text-slate-400 hover:text-blue-400 transition-colors text-xs btn-secondary py-1 px-2">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold text-white">Add New Class</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Class Information */}
              <div>
                <h4 className="text-white font-medium mb-4">Class Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Class Name *</label>
                    <input
                      type="text"
                      value={newClass.name || ""}
                      onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Grade 12-A"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Subject *</label>
                    <input
                      type="text"
                      value={newClass.subject || ""}
                      onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Advanced Mathematics"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Teacher *</label>
                    <input
                      type="text"
                      value={newClass.teacher || ""}
                      onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Dr. Sarah Lee"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Room</label>
                    <input
                      type="text"
                      value={newClass.room || ""}
                      onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Room 201"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Number of Students</label>
                    <input
                      type="number"
                      value={newClass.students || ""}
                      onChange={(e) => setNewClass({ ...newClass, students: parseInt(e.target.value) })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Schedule</label>
                    <input
                      type="text"
                      value={newClass.schedule || ""}
                      onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Mon/Wed/Fri 9:00 AM"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button onClick={() => setShowAddModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleAddClass} className="btn-primary">
                  Add Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Class Detail Modal with Student Table */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0">
              <div>
                <h3 className="text-lg font-semibold text-white">{selectedClass.name} - Students</h3>
                <p className="text-slate-400 text-sm">{selectedClass.subject} | {selectedClass.studentList?.length || 0} Students</p>
              </div>
              <button onClick={() => setSelectedClass(null)} className="text-slate-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Class Info Bar */}
            <div className="px-6 py-3 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-6 text-sm">
                <span className="text-slate-400">Teacher: <span className="text-white">{selectedClass.teacher}</span></span>
                <span className="text-slate-400">Room: <span className="text-white">{selectedClass.room}</span></span>
                <span className="text-slate-400">Schedule: <span className="text-white">{selectedClass.schedule}</span></span>
              </div>
              <button 
                onClick={() => window.print()}
                className="btn-secondary flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                Print List
              </button>
            </div>

            {/* Student Table */}
            <div className="flex-1 overflow-auto p-6">
              <table className="w-full">
                <thead className="bg-slate-800 sticky top-0">
                  <tr>
                    <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-4 py-3">Student ID</th>
                    <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-4 py-3">Student Name</th>
                    <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-4 py-3">Date of Admission</th>
                    <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {selectedClass.studentList?.map((student, index) => (
                    <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 text-slate-300 text-sm">{student.id}</td>
                      <td className="px-4 py-3 text-white font-medium text-sm">{student.name}</td>
                      <td className="px-4 py-3 text-slate-300 text-sm">{student.dateOfAdmission}</td>
                      <td className="px-4 py-3">
                        <span className={`badge ${student.status === "Active" ? "badge-green" : "badge-yellow"}`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between shrink-0">
              <p className="text-slate-400 text-sm">Total Students: {selectedClass.studentList?.length || 0}</p>
              <button onClick={() => setSelectedClass(null)} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
