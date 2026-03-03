"use client";

import { useState } from "react";

interface AcademicTerm {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  year: string;
  isActive: boolean;
}

const defaultTerms: AcademicTerm[] = [
  { id: "1", name: "First Term", startDate: "2026-01-06", endDate: "2026-04-03", year: "2025-2026", isActive: true },
  { id: "2", name: "Second Term", startDate: "2026-04-14", endDate: "2026-07-18", year: "2025-2026", isActive: false },
  { id: "3", name: "Third Term", startDate: "2026-09-01", endDate: "2026-12-15", year: "2026-2027", isActive: false },
];

export default function SettingsPage() {
  const [terms, setTerms] = useState<AcademicTerm[]>(defaultTerms);
  const [showTermModal, setShowTermModal] = useState(false);
  const [editingTerm, setEditingTerm] = useState<AcademicTerm | null>(null);
  const [newTerm, setNewTerm] = useState<Partial<AcademicTerm>>({
    name: "",
    startDate: "",
    endDate: "",
    year: "2025-2026",
    isActive: false
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleAddTerm = () => {
    if (!newTerm.name || !newTerm.startDate || !newTerm.endDate || !newTerm.year) return;
    
    const term: AcademicTerm = {
      id: Date.now().toString(),
      name: newTerm.name,
      startDate: newTerm.startDate,
      endDate: newTerm.endDate,
      year: newTerm.year,
      isActive: newTerm.isActive || false
    };
    
    setTerms([...terms, term]);
    setNewTerm({ name: "", startDate: "", endDate: "", year: "2025-2026", isActive: false });
    setShowTermModal(false);
  };

  const handleEditTerm = (term: AcademicTerm) => {
    setEditingTerm(term);
    setNewTerm({
      name: term.name,
      startDate: term.startDate,
      endDate: term.endDate,
      year: term.year,
      isActive: term.isActive
    });
    setShowTermModal(true);
  };

  const handleUpdateTerm = () => {
    if (!editingTerm || !newTerm.name || !newTerm.startDate || !newTerm.endDate || !newTerm.year) return;
    
    setTerms(terms.map(t => 
      t.id === editingTerm.id 
        ? { ...t, name: newTerm.name!, startDate: newTerm.startDate!, endDate: newTerm.endDate!, year: newTerm.year!, isActive: newTerm.isActive || false }
        : t
    ));
    setEditingTerm(null);
    setNewTerm({ name: "", startDate: "", endDate: "", year: "2025-2026", isActive: false });
    setShowTermModal(false);
  };

  const handleDeleteTerm = (id: string) => {
    setTerms(terms.filter(t => t.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleSetActive = (id: string) => {
    setTerms(terms.map(t => ({ ...t, isActive: t.id === id })));
  };

  const closeModal = () => {
    setShowTermModal(false);
    setEditingTerm(null);
    setNewTerm({ name: "", startDate: "", endDate: "", year: "2025-2026", isActive: false });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 text-sm mt-1">Manage school configuration and preferences</p>
        </div>

        {/* Academic Terms Section */}
        <div className="page-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <div>
              <h2 className="text-white font-semibold">Academic Terms</h2>
              <p className="text-slate-500 text-sm mt-1">Configure school semesters and terms</p>
            </div>
            <button 
              onClick={() => setShowTermModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Term
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Term Name</th>
                  <th>Academic Year</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {terms.map((term) => (
                  <tr key={term.id}>
                    <td className="text-white font-medium">{term.name}</td>
                    <td className="text-slate-400">{term.year}</td>
                    <td className="text-slate-400">{term.startDate}</td>
                    <td className="text-slate-400">{term.endDate}</td>
                    <td>
                      {term.isActive ? (
                        <span className="badge badge-green">Active</span>
                      ) : (
                        <button 
                          onClick={() => handleSetActive(term.id)}
                          className="text-xs text-slate-500 hover:text-blue-400 underline"
                        >
                          Set Active
                        </button>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditTerm(term)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition-colors"
                          title="Edit"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(term.id)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
                          title="Delete"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {terms.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No academic terms configured. Click &quot;Add Term&quot; to create one.
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Term Modal */}
      {showTermModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingTerm ? "Edit Term" : "Add New Term"}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  {editingTerm ? "Update term details" : "Configure a new academic term"}
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1">Term Name</label>
                <input
                  type="text"
                  value={newTerm.name}
                  onChange={(e) => setNewTerm({ ...newTerm, name: e.target.value })}
                  placeholder="e.g., First Term"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1">Academic Year</label>
                <select
                  value={newTerm.year}
                  onChange={(e) => setNewTerm({ ...newTerm, year: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2026-2027">2026-2027</option>
                  <option value="2027-2028">2027-2028</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newTerm.startDate}
                    onChange={(e) => setNewTerm({ ...newTerm, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={newTerm.endDate}
                    onChange={(e) => setNewTerm({ ...newTerm, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={newTerm.isActive}
                  onChange={(e) => setNewTerm({ ...newTerm, isActive: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-800 border-slate-600 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-slate-300 text-sm">Set as active term</label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-700">
              <button 
                onClick={closeModal}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={editingTerm ? handleUpdateTerm : handleAddTerm}
                className="btn-primary"
              >
                {editingTerm ? "Update Term" : "Add Term"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Delete Term</h3>
              </div>
              <p className="text-slate-400 mb-6">
                Are you sure you want to delete this term? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button 
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDeleteTerm(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
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
