"use client";

import { useState } from "react";

interface StudentBio {
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  religion: string;
  bloodType: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  medicalConditions: string;
  previousSchool: string;
  admissionDate: string;
}

interface Student {
  id: string;
  name: string;
  age: number;
  class: string;
  gender: string;
  phone: string;
  email: string;
  status: string;
  gpa: string;
  bio?: StudentBio;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([
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
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({});
  const [newBio, setNewBio] = useState<Partial<StudentBio>>({});

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

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.email && s.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.class) {
      const student: Student = {
        id: `STU-${String(students.length + 1).padStart(3, "0")}`,
        name: newStudent.name,
        age: newStudent.age || 15,
        class: newStudent.class,
        gender: newStudent.gender || "Male",
        phone: newStudent.phone || "",
        email: newStudent.email || "",
        status: "Active",
        gpa: "0.0",
        bio: newBio.dateOfBirth ? newBio as StudentBio : undefined,
      };
      setStudents([...students, student]);
      setShowAddModal(false);
      setNewStudent({});
      setNewBio({});
    }
  };

  const handleViewBio = (student: Student) => {
    setSelectedStudent(student);
    setShowBioModal(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Students</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all enrolled students</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
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
          { label: "Total Students", value: students.length.toLocaleString(), color: "text-blue-400" },
          { label: "Active", value: students.filter((s) => s.status === "Active").length.toLocaleString(), color: "text-emerald-400" },
          { label: "Inactive", value: students.filter((s) => s.status === "Inactive").length.toLocaleString(), color: "text-amber-400" },
          { label: "Suspended", value: students.filter((s) => s.status === "Suspended").length.toLocaleString(), color: "text-red-400" },
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
              {filteredStudents.map((s) => (
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
                  <td className="text-slate-400">{s.email || "-"}</td>
                  <td>
                    <span className={`badge ${gpaColor(s.gpa)}`}>{s.gpa}</span>
                  </td>
                  <td>
                    <span className={`badge ${statusColor(s.status)}`}>{s.status}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {s.bio && (
                        <button onClick={() => handleViewBio(s)} className="text-slate-400 hover:text-green-400 transition-colors" title="View Bio">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                          </svg>
                        </button>
                      )}
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
                      <button onClick={() => handleDeleteStudent(s.id)} className="text-slate-400 hover:text-red-400 transition-colors" title="Delete">
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
          <p className="text-slate-500 text-sm">Showing {filteredStudents.length} of {students.length} students</p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary px-3 py-1.5 text-xs">Previous</button>
            <button className="btn-primary px-3 py-1.5 text-xs">Next</button>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold text-white">Add New Student</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-white font-medium mb-4">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={newStudent.name || ""}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Email</label>
                    <input
                      type="email"
                      value={newStudent.email || ""}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="student@school.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newStudent.phone || ""}
                      onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="+1 555-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Gender</label>
                    <select
                      value={newStudent.gender || "Male"}
                      onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Age</label>
                    <input
                      type="number"
                      value={newStudent.age || ""}
                      onChange={(e) => setNewStudent({ ...newStudent, age: parseInt(e.target.value) })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Class *</label>
                    <select
                      value={newStudent.class || ""}
                      onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Class</option>
                      <option value="Grade 9-A">Grade 9-A</option>
                      <option value="Grade 9-B">Grade 9-B</option>
                      <option value="Grade 9-C">Grade 9-C</option>
                      <option value="Grade 10-A">Grade 10-A</option>
                      <option value="Grade 10-B">Grade 10-B</option>
                      <option value="Grade 10-C">Grade 10-C</option>
                      <option value="Grade 11-A">Grade 11-A</option>
                      <option value="Grade 11-B">Grade 11-B</option>
                      <option value="Grade 11-C">Grade 11-C</option>
                      <option value="Grade 12-A">Grade 12-A</option>
                      <option value="Grade 12-B">Grade 12-B</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Student Bio Data */}
              <div>
                <h4 className="text-white font-medium mb-4">Student Bio Data</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={newBio.dateOfBirth || ""}
                      onChange={(e) => setNewBio({ ...newBio, dateOfBirth: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Place of Birth</label>
                    <input
                      type="text"
                      value={newBio.placeOfBirth || ""}
                      onChange={(e) => setNewBio({ ...newBio, placeOfBirth: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Nationality</label>
                    <input
                      type="text"
                      value={newBio.nationality || ""}
                      onChange={(e) => setNewBio({ ...newBio, nationality: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Country"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Religion</label>
                    <select
                      value={newBio.religion || ""}
                      onChange={(e) => setNewBio({ ...newBio, religion: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Religion</option>
                      <option value="Christianity">Christianity</option>
                      <option value="Islam">Islam</option>
                      <option value="Hinduism">Hinduism</option>
                      <option value="Buddhism">Buddhism</option>
                      <option value="Judaism">Judaism</option>
                      <option value="Other">Other</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Blood Type</label>
                    <select
                      value={newBio.bloodType || ""}
                      onChange={(e) => setNewBio({ ...newBio, bloodType: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Admission Date</label>
                    <input
                      type="date"
                      value={newBio.admissionDate || ""}
                      onChange={(e) => setNewBio({ ...newBio, admissionDate: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-slate-400 text-sm mb-1">Address</label>
                    <input
                      type="text"
                      value={newBio.address || ""}
                      onChange={(e) => setNewBio({ ...newBio, address: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Full address"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-slate-400 text-sm mb-1">Previous School</label>
                    <input
                      type="text"
                      value={newBio.previousSchool || ""}
                      onChange={(e) => setNewBio({ ...newBio, previousSchool: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Name of previously attended school"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h4 className="text-white font-medium mb-4">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Contact Name</label>
                    <input
                      type="text"
                      value={newBio.emergencyContactName || ""}
                      onChange={(e) => setNewBio({ ...newBio, emergencyContactName: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Relationship</label>
                    <select
                      value={newBio.emergencyContactRelation || ""}
                      onChange={(e) => setNewBio({ ...newBio, emergencyContactRelation: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select</option>
                      <option value="Parent">Parent</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={newBio.emergencyContactPhone || ""}
                      onChange={(e) => setNewBio({ ...newBio, emergencyContactPhone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="+1 555-0000"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h4 className="text-white font-medium mb-4">Medical Information</h4>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Medical Conditions / Allergies</label>
                  <textarea
                    value={newBio.medicalConditions || ""}
                    onChange={(e) => setNewBio({ ...newBio, medicalConditions: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none h-24 resize-none"
                    placeholder="List any medical conditions, allergies, or special needs..."
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800">
              <button onClick={() => setShowAddModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleAddStudent} className="btn-primary">
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Bio Modal */}
      {showBioModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold text-white">Student Bio Data</h3>
              <button onClick={() => setShowBioModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Student Info Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
                <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-xl font-semibold text-slate-300">
                  {selectedStudent.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">{selectedStudent.name}</h4>
                  <p className="text-slate-400">{selectedStudent.id} • {selectedStudent.class}</p>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h4 className="text-white font-medium mb-3">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-500 text-sm">Date of Birth</p>
                    <p className="text-white">{selectedStudent.bio?.dateOfBirth || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Place of Birth</p>
                    <p className="text-white">{selectedStudent.bio?.placeOfBirth || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Nationality</p>
                    <p className="text-white">{selectedStudent.bio?.nationality || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Religion</p>
                    <p className="text-white">{selectedStudent.bio?.religion || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Blood Type</p>
                    <p className="text-white">{selectedStudent.bio?.bloodType || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Admission Date</p>
                    <p className="text-white">{selectedStudent.bio?.admissionDate || "Not provided"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-slate-500 text-sm">Address</p>
                    <p className="text-white">{selectedStudent.bio?.address || "Not provided"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-slate-500 text-sm">Previous School</p>
                    <p className="text-white">{selectedStudent.bio?.previousSchool || "Not provided"}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h4 className="text-white font-medium mb-3">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-slate-500 text-sm">Contact Name</p>
                    <p className="text-white">{selectedStudent.bio?.emergencyContactName || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Relationship</p>
                    <p className="text-white">{selectedStudent.bio?.emergencyContactRelation || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Phone Number</p>
                    <p className="text-white">{selectedStudent.bio?.emergencyContactPhone || "Not provided"}</p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h4 className="text-white font-medium mb-3">Medical Information</h4>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-white">{selectedStudent.bio?.medicalConditions || "No medical conditions or allergies reported"}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end px-6 py-4 border-t border-slate-800">
              <button onClick={() => setShowBioModal(false)} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
