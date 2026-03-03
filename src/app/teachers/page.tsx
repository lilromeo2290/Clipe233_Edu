"use client";

import { useState } from "react";

interface Teacher {
  id: string;
  name: string;
  subject: string;
  classes: string[];
  experience: string;
  email: string;
  phone: string;
  status: string;
  rating: string;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: "TCH-001", name: "Dr. Sarah Lee", subject: "Mathematics", classes: ["Grade 12-A", "Grade 11-B"], experience: "12 yrs", email: "sarah.lee@school.edu", phone: "+1 555-1001", status: "Active", rating: "4.9" },
    { id: "TCH-002", name: "Mr. James Carter", subject: "English Literature", classes: ["Grade 11-B", "Grade 10-A"], experience: "8 yrs", email: "james.carter@school.edu", phone: "+1 555-1002", status: "Active", rating: "4.7" },
    { id: "TCH-003", name: "Ms. Rachel Kim", subject: "Biology", classes: ["Grade 10-A", "Grade 9-C"], experience: "6 yrs", email: "rachel.kim@school.edu", phone: "+1 555-1003", status: "Active", rating: "4.8" },
    { id: "TCH-004", name: "Mr. David Park", subject: "History", classes: ["Grade 9-C", "Grade 9-A"], experience: "10 yrs", email: "david.park@school.edu", phone: "+1 555-1004", status: "Active", rating: "4.5" },
    { id: "TCH-005", name: "Ms. Linda Chen", subject: "Chemistry", classes: ["Grade 12-B", "Grade 11-A"], experience: "9 yrs", email: "linda.chen@school.edu", phone: "+1 555-1005", status: "Active", rating: "4.6" },
    { id: "TCH-006", name: "Mr. Robert Singh", subject: "Physics", classes: ["Grade 12-A", "Grade 12-B"], experience: "15 yrs", email: "robert.singh@school.edu", phone: "+1 555-1006", status: "Active", rating: "4.9" },
    { id: "TCH-007", name: "Ms. Angela White", subject: "Art & Design", classes: ["Grade 10-B", "Grade 9-A"], experience: "5 yrs", email: "angela.white@school.edu", phone: "+1 555-1007", status: "Inactive", rating: "4.4" },
    { id: "TCH-008", name: "Mr. Kevin Brown", subject: "Physical Education", classes: ["Grade 11-C", "Grade 10-C"], experience: "7 yrs", email: "kevin.brown@school.edu", phone: "+1 555-1008", status: "Active", rating: "4.3" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({});

  const ratingColor = (rating: string) => {
    const val = parseFloat(rating);
    if (val >= 4.7) return "badge-green";
    if (val >= 4.3) return "badge-blue";
    return "badge-yellow";
  };

  const statusColor = (status: string) => {
    if (status === "Active") return "badge-green";
    if (status === "Inactive") return "badge-yellow";
    if (status === "Suspended") return "badge-red";
    if (status === "Sacked") return "badge-red";
    return "badge-blue";
  };

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.subject) {
      const teacher: Teacher = {
        id: `TCH-${String(teachers.length + 1).padStart(3, "0")}`,
        name: newTeacher.name,
        subject: newTeacher.subject,
        classes: newTeacher.classes || [],
        experience: newTeacher.experience || "0 yrs",
        email: newTeacher.email || "",
        phone: newTeacher.phone || "",
        status: "Active",
        rating: "4.0",
      };
      setTeachers([...teachers, teacher]);
      setShowAddModal(false);
      setNewTeacher({});
    }
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowViewModal(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setNewTeacher({
      name: teacher.name,
      subject: teacher.subject,
      classes: teacher.classes,
      experience: teacher.experience,
      email: teacher.email,
      phone: teacher.phone,
      status: teacher.status,
      rating: teacher.rating,
    });
    setShowEditModal(true);
  };

  const handleUpdateTeacher = () => {
    if (selectedTeacher && newTeacher.name && newTeacher.subject) {
      const updatedTeachers = teachers.map((t) => {
        if (t.id === selectedTeacher.id) {
          return {
            ...t,
            name: newTeacher.name || t.name,
            subject: newTeacher.subject || t.subject,
            classes: newTeacher.classes || t.classes,
            experience: newTeacher.experience || t.experience,
            email: newTeacher.email || t.email,
            phone: newTeacher.phone || t.phone,
            status: newTeacher.status || t.status,
            rating: newTeacher.rating || t.rating,
          };
        }
        return t;
      });
      setTeachers(updatedTeachers);
      setShowEditModal(false);
      setSelectedTeacher(null);
      setNewTeacher({});
    }
  };

  const handleDeleteTeacher = (id: string) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const handleQuickStatusChange = (teacherId: string, newStatus: string) => {
    const updatedTeachers = teachers.map((t) => {
      if (t.id === teacherId) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTeachers(updatedTeachers);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Teachers</h1>
          <p className="text-slate-400 text-sm mt-1">Manage faculty and staff</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
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
          { label: "Total Teachers", value: teachers.length.toString(), color: "text-purple-400" },
          { label: "Active", value: teachers.filter((t) => t.status === "Active").length.toString(), color: "text-emerald-400" },
          { label: "Inactive", value: teachers.filter((t) => t.status === "Inactive").length.toString(), color: "text-amber-400" },
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              {filteredTeachers.map((t) => (
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
                    <select
                      value={t.status}
                      onChange={(e) => handleQuickStatusChange(t.id, e.target.value)}
                      className={`status-select ${statusColor(t.status)}`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Sacked">Sacked</option>
                    </select>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleViewTeacher(t)} className="text-slate-400 hover:text-blue-400 transition-colors" title="View">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button onClick={() => handleEditTeacher(t)} className="text-slate-400 hover:text-amber-400 transition-colors" title="Edit">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDeleteTeacher(t.id)} className="text-slate-400 hover:text-red-400 transition-colors" title="Delete">
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
          <p className="text-slate-500 text-sm">Showing {filteredTeachers.length} of {teachers.length} teachers</p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary px-3 py-1.5 text-xs">Previous</button>
            <button className="btn-primary px-3 py-1.5 text-xs">Next</button>
          </div>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Add New Teacher</h2>
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm">Full Name</label>
                <input
                  type="text"
                  value={newTeacher.name || ""}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                  placeholder="Enter teacher name"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm">Subject</label>
                <input
                  type="text"
                  value={newTeacher.subject || ""}
                  onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                  placeholder="Enter subject"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm">Experience</label>
                  <input
                    type="text"
                    value={newTeacher.experience || ""}
                    onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                    placeholder="e.g., 5 yrs"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Email</label>
                  <input
                    type="email"
                    value={newTeacher.email || ""}
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                    placeholder="teacher@school.edu"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-400 text-sm">Phone</label>
                <input
                  type="text"
                  value={newTeacher.phone || ""}
                  onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                  placeholder="+1 555-0000"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm">Status</label>
                <select
                  value={newTeacher.status || "Active"}
                  onChange={(e) => setNewTeacher({ ...newTeacher, status: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Sacked">Sacked</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={handleAddTeacher} className="btn-primary">Add Teacher</button>
            </div>
          </div>
        </div>
      )}

      {/* View Teacher Modal */}
      {showViewModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Teacher Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center text-xl font-semibold text-purple-300">
                  {selectedTeacher.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{selectedTeacher.name}</h3>
                  <p className="text-slate-400">{selectedTeacher.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Subject</p>
                  <p className="text-white">{selectedTeacher.subject}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Experience</p>
                  <p className="text-white">{selectedTeacher.experience}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-white">{selectedTeacher.email}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <p className="text-white">{selectedTeacher.phone}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Rating</p>
                  <p className="text-white">★ {selectedTeacher.rating}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Status</p>
                  <span className={`badge ${statusColor(selectedTeacher.status)}`}>{selectedTeacher.status}</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Assigned Classes</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedTeacher.classes.map((c) => (
                    <span key={c} className="badge badge-blue">{c}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowViewModal(false)} className="btn-secondary">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {showEditModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Edit Teacher</h2>
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm">Full Name</label>
                <input
                  type="text"
                  value={newTeacher.name || ""}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm">Subject</label>
                <input
                  type="text"
                  value={newTeacher.subject || ""}
                  onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm">Experience</label>
                  <input
                    type="text"
                    value={newTeacher.experience || ""}
                    onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Rating</label>
                  <input
                    type="text"
                    value={newTeacher.rating || ""}
                    onChange={(e) => setNewTeacher({ ...newTeacher, rating: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-400 text-sm">Email</label>
                <input
                  type="email"
                  value={newTeacher.email || ""}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm">Phone</label>
                <input
                  type="text"
                  value={newTeacher.phone || ""}
                  onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm">Status</label>
                <select
                  value={newTeacher.status || "Active"}
                  onChange={(e) => setNewTeacher({ ...newTeacher, status: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mt-1"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Sacked">Sacked</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowEditModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={handleUpdateTeacher} className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
