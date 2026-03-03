"use client";

import { useState } from "react";

interface Subject {
  id: string;
  name: string;
  code: string;
  category: string;
  teacher: string;
  gradeLevel: string;
  credits: number;
  description: string;
  students: number;
  status: "Active" | "Inactive" | "Pending";
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "SUB-001", name: "Advanced Mathematics", code: "MATH-401", category: "Mathematics", teacher: "Dr. Sarah Lee", gradeLevel: "Grade 12", credits: 4, description: "Advanced calculus, linear algebra, and differential equations", students: 32, status: "Active" },
    { id: "SUB-002", name: "English Literature", code: "ENG-301", category: "Languages", teacher: "Mr. James Carter", gradeLevel: "Grade 11", credits: 3, description: "Classic literature, poetry analysis, and creative writing", students: 30, status: "Active" },
    { id: "SUB-003", name: "Biology", code: "SCI-201", category: "Sciences", teacher: "Ms. Rachel Kim", gradeLevel: "Grade 10", credits: 4, description: "Cell biology, genetics, ecology, and human anatomy", students: 34, status: "Active" },
    { id: "SUB-004", name: "World History", code: "HIS-101", category: "Social Studies", teacher: "Mr. David Park", gradeLevel: "Grade 9", credits: 3, description: "Ancient civilizations to modern world history", students: 28, status: "Active" },
    { id: "SUB-005", name: "Chemistry", code: "SCI-301", category: "Sciences", teacher: "Ms. Linda Chen", gradeLevel: "Grade 12", credits: 4, description: "Organic chemistry, thermodynamics, and molecular bonding", students: 29, status: "Active" },
    { id: "SUB-006", name: "Physics", code: "SCI-302", category: "Sciences", teacher: "Mr. Robert Singh", gradeLevel: "Grade 11", credits: 4, description: "Mechanics, electromagnetism, and quantum physics", students: 31, status: "Active" },
    { id: "SUB-007", name: "Art & Design", code: "ART-101", category: "Arts", teacher: "Ms. Angela White", gradeLevel: "Grade 10", credits: 2, description: "Visual arts, graphic design, and creative expression", students: 25, status: "Active" },
    { id: "SUB-008", name: "Physical Education", code: "PE-001", category: "Health & Fitness", teacher: "Mr. Kevin Brown", gradeLevel: "Grade 9", credits: 2, description: "Sports, fitness training, and health education", students: 35, status: "Active" },
    { id: "SUB-009", name: "Computer Science", code: "CS-401", category: "Technology", teacher: "Ms. Emily Johnson", gradeLevel: "Grade 11", credits: 4, description: "Programming, algorithms, data structures, and web development", students: 28, status: "Active" },
    { id: "SUB-010", name: "French Language", code: "FRN-201", category: "Languages", teacher: "Mrs. Marie Laurent", gradeLevel: "Grade 10", credits: 3, description: "French language, grammar, and conversation", students: 22, status: "Active" },
    { id: "SUB-011", name: "Economics", code: "ECO-301", category: "Social Studies", teacher: "Dr. Michael Wright", gradeLevel: "Grade 12", credits: 3, description: "Microeconomics, macroeconomics, and market analysis", students: 26, status: "Active" },
    { id: "SUB-012", name: "Music Theory", code: "MUS-101", category: "Arts", teacher: "Mr. John Smith", gradeLevel: "Grade 11", credits: 2, description: "Music notation, harmony, and composition basics", students: 18, status: "Inactive" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    category: "Mathematics",
    teacher: "",
    gradeLevel: "Grade 9",
    credits: 3,
    description: "",
    students: 0,
    status: "Active" as Subject["status"],
  });

  const categories = ["Mathematics", "Languages", "Sciences", "Social Studies", "Arts", "Health & Fitness", "Technology"];

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryStats = categories.map((cat) => ({
    name: cat,
    count: subjects.filter((s) => s.category === cat).length,
    students: subjects.filter((s) => s.category === cat).reduce((acc, s) => acc + s.students, 0),
  }));

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.code || !newSubject.teacher) return;
    
    const subject: Subject = {
      ...newSubject,
      id: `SUB-${String(subjects.length + 1).padStart(3, "0")}`,
    };
    
    setSubjects([...subjects, subject]);
    setShowAddModal(false);
    setNewSubject({
      name: "",
      code: "",
      category: "Mathematics",
      teacher: "",
      gradeLevel: "Grade 9",
      credits: 3,
      description: "",
      students: 0,
      status: "Active",
    });
  };

  const handleDeleteSubject = () => {
    if (!subjectToDelete) return;
    setSubjects(subjects.filter((s) => s.id !== subjectToDelete.id));
    setShowDeleteModal(false);
    setSubjectToDelete(null);
  };

  const confirmDelete = (subject: Subject) => {
    setSubjectToDelete(subject);
    setShowDeleteModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "badge-green";
      case "Inactive":
        return "badge-red";
      case "Pending":
        return "badge-yellow";
      default:
        return "badge";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Subjects</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all subjects and courses offered</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Subject
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-emerald-400">{subjects.length}</p>
          <p className="text-slate-400 text-sm mt-1">Total Subjects</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-blue-400">{subjects.filter((s) => s.status === "Active").length}</p>
          <p className="text-slate-400 text-sm mt-1">Active</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-purple-400">{categories.length}</p>
          <p className="text-slate-400 text-sm mt-1">Categories</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-amber-400">{subjects.reduce((acc, s) => acc + s.students, 0)}</p>
          <p className="text-slate-400 text-sm mt-1">Total Enrollments</p>
        </div>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryStats.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(selectedCategory === cat.name ? "All" : cat.name)}
            className={`page-card p-4 text-left transition-all hover:border-blue-500 ${
              selectedCategory === cat.name ? "border-2 border-blue-500" : "border border-slate-800"
            }`}
          >
            <p className="text-slate-400 text-xs uppercase tracking-wider">{cat.name}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-2xl font-bold text-white">{cat.count}</p>
              <p className="text-slate-500 text-sm">{cat.students} students</p>
            </div>
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 items-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="search-input w-48"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Search subjects, codes, or teachers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input w-full sm:w-80"
        />
      </div>

      {/* Subjects Table */}
      <div className="page-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Category</th>
                <th>Teacher</th>
                <th>Grade</th>
                <th>Credits</th>
                <th>Students</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.map((subject) => (
                <tr key={subject.id}>
                  <td>
                    <div>
                      <p className="font-medium text-white">{subject.name}</p>
                      <p className="text-slate-500 text-xs">{subject.code}</p>
                    </div>
                  </td>
                  <td>
                    <span className="text-slate-300">{subject.category}</span>
                  </td>
                  <td>
                    <span className="text-slate-300">{subject.teacher}</span>
                  </td>
                  <td>
                    <span className="text-slate-300">{subject.gradeLevel}</span>
                  </td>
                  <td>
                    <span className="text-slate-300">{subject.credits}</span>
                  </td>
                  <td>
                    <span className="text-slate-300">{subject.students}</span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(subject.status)}`}>
                      {subject.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">
                        Edit
                      </button>
                      <button className="text-slate-400 hover:text-slate-300 text-sm">
                        View
                      </button>
                      <button 
                        onClick={() => confirmDelete(subject)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <h2 className="text-lg font-semibold text-white">Add New Subject</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Subject Name *</label>
                  <input
                    type="text"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    placeholder="e.g., Advanced Mathematics"
                    className="search-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Subject Code *</label>
                  <input
                    type="text"
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                    placeholder="e.g., MATH-401"
                    className="search-input w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Category</label>
                  <select
                    value={newSubject.category}
                    onChange={(e) => setNewSubject({ ...newSubject, category: e.target.value })}
                    className="search-input w-full"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Grade Level</label>
                  <select
                    value={newSubject.gradeLevel}
                    onChange={(e) => setNewSubject({ ...newSubject, gradeLevel: e.target.value })}
                    className="search-input w-full"
                  >
                    {["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((grade) => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Teacher *</label>
                  <input
                    type="text"
                    value={newSubject.teacher}
                    onChange={(e) => setNewSubject({ ...newSubject, teacher: e.target.value })}
                    placeholder="e.g., Dr. Sarah Lee"
                    className="search-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Credits</label>
                  <input
                    type="number"
                    value={newSubject.credits}
                    onChange={(e) => setNewSubject({ ...newSubject, credits: parseInt(e.target.value) || 0 })}
                    min="1"
                    max="6"
                    className="search-input w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">Description</label>
                <textarea
                  value={newSubject.description}
                  onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                  placeholder="Brief description of the subject..."
                  rows={3}
                  className="search-input w-full"
                />
              </div>
            </div>

            <div className="flex gap-3 p-5 border-t border-slate-800">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubject}
                className="btn-primary flex-1"
              >
                Add Subject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Delete Subject</h2>
              <p className="text-slate-400 mb-6">
                Are you sure you want to delete <span className="text-white font-medium">{subjectToDelete?.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSubjectToDelete(null);
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSubject}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
