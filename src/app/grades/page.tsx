"use client";

import { useState } from "react";

interface GradeConfig {
  id: string;
  letter: string;
  minScore: number;
  maxScore: number;
  gpa: number;
  description: string;
}

const defaultGradeConfig: GradeConfig[] = [
  { id: "1", letter: "A+", minScore: 97, maxScore: 100, gpa: 4.0, description: "Outstanding" },
  { id: "2", letter: "A", minScore: 93, maxScore: 96, gpa: 4.0, description: "Excellent" },
  { id: "3", letter: "A-", minScore: 90, maxScore: 92, gpa: 3.7, description: "Very Good" },
  { id: "4", letter: "B+", minScore: 87, maxScore: 89, gpa: 3.3, description: "Good" },
  { id: "5", letter: "B", minScore: 83, maxScore: 86, gpa: 3.0, description: "Above Average" },
  { id: "6", letter: "B-", minScore: 80, maxScore: 82, gpa: 2.7, description: "Average Plus" },
  { id: "7", letter: "C+", minScore: 77, maxScore: 79, gpa: 2.3, description: "Above Average" },
  { id: "8", letter: "C", minScore: 73, maxScore: 76, gpa: 2.0, description: "Average" },
  { id: "9", letter: "C-", minScore: 70, maxScore: 72, gpa: 1.7, description: "Below Average" },
  { id: "10", letter: "D+", minScore: 67, maxScore: 69, gpa: 1.3, description: "Poor" },
  { id: "11", letter: "D", minScore: 63, maxScore: 66, gpa: 1.0, description: "Passing" },
  { id: "12", letter: "D-", minScore: 60, maxScore: 62, gpa: 0.7, description: "Barely Passing" },
  { id: "13", letter: "F", minScore: 0, maxScore: 59, gpa: 0.0, description: "Failing" },
];

export default function GradesPage() {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [gradeConfig, setGradeConfig] = useState<GradeConfig[]>(defaultGradeConfig);
  const [editingGrade, setEditingGrade] = useState<GradeConfig | null>(null);
  const [newGrade, setNewGrade] = useState<Partial<GradeConfig>>({
    letter: "",
    minScore: 0,
    maxScore: 100,
    gpa: 0,
    description: ""
  });

  const getLetterGrade = (score: number): string => {
    const grade = gradeConfig.find(g => score >= g.minScore && score <= g.maxScore);
    return grade ? grade.letter : "F";
  };

  const getGPA = (score: number): number => {
    const grade = gradeConfig.find(g => score >= g.minScore && score <= g.maxScore);
    return grade ? grade.gpa : 0;
  };

  const letterColor = (letter: string) => {
    if (letter.startsWith("A")) return "badge-green";
    if (letter.startsWith("B")) return "badge-blue";
    if (letter.startsWith("C")) return "badge-yellow";
    return "badge-red";
  };

  const scoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 70) return "text-amber-400";
    return "text-red-400";
  };

  const [grades, setGrades] = useState([
    { id: "STU-001", name: "Emma Johnson", class: "Grade 10-A", math: 92, english: 88, science: 95, history: 85, art: 90, avg: 90.0, letter: "A-", rank: 3 },
    { id: "STU-002", name: "Liam Williams", class: "Grade 11-B", math: 78, english: 85, science: 80, history: 82, art: 75, avg: 80.0, letter: "B-", rank: 12 },
    { id: "STU-003", name: "Olivia Brown", class: "Grade 9-C", math: 98, english: 96, science: 97, history: 94, art: 99, avg: 96.8, letter: "A+", rank: 1 },
    { id: "STU-004", name: "Noah Davis", class: "Grade 12-A", math: 65, english: 70, science: 68, history: 72, art: 60, avg: 67.0, letter: "D+", rank: 28 },
    { id: "STU-005", name: "Ava Martinez", class: "Grade 10-B", math: 88, english: 91, science: 86, history: 89, art: 93, avg: 89.4, letter: "B+", rank: 5 },
    { id: "STU-006", name: "Ethan Wilson", class: "Grade 11-A", math: 82, english: 79, science: 84, history: 80, art: 77, avg: 80.4, letter: "B-", rank: 11 },
    { id: "STU-007", name: "Sophia Anderson", class: "Grade 9-A", math: 100, english: 98, science: 99, history: 97, art: 100, avg: 98.8, letter: "A+", rank: 1 },
    { id: "STU-008", name: "Mason Taylor", class: "Grade 12-B", math: 75, english: 80, science: 78, history: 76, art: 82, avg: 78.2, letter: "C+", rank: 18 },
    { id: "STU-009", name: "Isabella Thomas", class: "Grade 10-C", math: 86, english: 84, science: 88, history: 83, art: 87, avg: 85.6, letter: "B", rank: 8 },
    { id: "STU-010", name: "James Jackson", class: "Grade 11-C", math: 58, english: 62, science: 55, history: 60, art: 65, avg: 60.0, letter: "D", rank: 32 },
  ]);

  // Calculate grade distribution based on current config
  const gradeDistribution = gradeConfig
    .filter(g => g.letter !== "F")
    .map((g) => {
      const count = grades.filter(s => getLetterGrade(s.avg) === g.letter).length;
      const maxCount = Math.max(...gradeConfig.map(gr => grades.filter(s => getLetterGrade(s.avg) === gr.letter).length), 1);
      return {
        grade: `${g.letter} (${g.minScore}-${g.maxScore})`,
        letter: g.letter,
        count,
        pct: (count / maxCount) * 100,
        color: letterColor(g.letter)
      };
    })
    .filter(g => g.count > 0);

  const handleEditGrade = (grade: GradeConfig) => {
    setEditingGrade(grade);
    setNewGrade({
      letter: grade.letter,
      minScore: grade.minScore,
      maxScore: grade.maxScore,
      gpa: grade.gpa,
      description: grade.description
    });
  };

  const handleSaveEdit = () => {
    if (!editingGrade || !newGrade.letter) return;
    setGradeConfig(gradeConfig.map(g => 
      g.id === editingGrade.id 
        ? { ...g, ...newGrade, id: g.id }
        : g
    ));
    setEditingGrade(null);
    setNewGrade({ letter: "", minScore: 0, maxScore: 100, gpa: 0, description: "" });
  };

  const handleAddGrade = () => {
    if (!newGrade.letter) return;
    const newId = Date.now().toString();
    setGradeConfig([...gradeConfig, { 
      id: newId, 
      letter: newGrade.letter || "", 
      minScore: newGrade.minScore || 0, 
      maxScore: newGrade.maxScore || 100, 
      gpa: newGrade.gpa || 0, 
      description: newGrade.description || "" 
    }].sort((a, b) => b.minScore - a.minScore));
    setNewGrade({ letter: "", minScore: 0, maxScore: 100, gpa: 0, description: "" });
  };

  const handleDeleteGrade = (id: string) => {
    setGradeConfig(gradeConfig.filter(g => g.id !== id));
  };

  const handleResetConfig = () => {
    setGradeConfig(defaultGradeConfig);
  };

  const handleImportGrades = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n");
      const headers = lines[0].split(",");
      
      // Expected columns: Student ID, Name, Class, Math, English, Science, History, Art
      const newGrades = lines.slice(1).filter(line => line.trim()).map((line) => {
        const values = line.split(",");
        const math = parseInt(values[3]) || 0;
        const english = parseInt(values[4]) || 0;
        const science = parseInt(values[5]) || 0;
        const history = parseInt(values[6]) || 0;
        const art = parseInt(values[7]) || 0;
        const avg = (math + english + science + history + art) / 5;
        
        return {
          id: values[0]?.trim() || "STU-" + Date.now(),
          name: values[1]?.replace(/"/g, "").trim() || "Unknown",
          class: values[2]?.replace(/"/g, "").trim() || "Unknown",
          math,
          english,
          science,
          history,
          art,
          avg: parseFloat(avg.toFixed(1)),
          letter: getLetterGrade(avg),
          rank: 0
        };
      });
      
      // Recalculate ranks based on average
      const sortedGrades = [...newGrades].sort((a, b) => b.avg - a.avg);
      sortedGrades.forEach((grade, idx) => {
        grade.rank = idx + 1;
      });
      
      setGrades(newGrades);
      alert(`Successfully imported ${newGrades.length} student grades!`);
    };
    reader.readAsText(file);
    event.target.value = ""; // Reset input
  };

  const handleExportGrades = () => {
    // Create CSV content
    const headers = ["Student ID", "Name", "Class", "Math", "English", "Science", "History", "Art", "Average", "Grade", "GPA", "Rank"];
    const csvRows = [headers.join(",")];
    
    grades.forEach((s) => {
      const row = [
        s.id,
        `"${s.name}"`,
        `"${s.class}"`,
        s.math,
        s.english,
        s.science,
        s.history,
        s.art,
        s.avg.toFixed(1),
        getLetterGrade(s.avg),
        getGPA(s.avg).toFixed(1),
        s.rank
      ];
      csvRows.push(row.join(","));
    });
    
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `grades_export_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Grades & Results</h1>
          <p className="text-slate-400 text-sm mt-1">Academic performance and report cards</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowConfigModal(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Configure Grading
          </button>
          <select className="search-input">
            <option>Spring Semester 2026</option>
            <option>Fall Semester 2025</option>
            <option>Spring Semester 2025</option>
          </select>
          <button 
            onClick={handleExportGrades}
            className="btn-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Grades
          </button>
          <label className="btn-secondary cursor-pointer flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Import Grades
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleImportGrades}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Class Average", value: "82.6%", color: "text-blue-400" },
          { label: "Highest Score", value: "98.8%", color: "text-emerald-400" },
          { label: "Passing Rate", value: "91.4%", color: "text-purple-400" },
          { label: "Failing Students", value: "107", color: "text-red-400" },
        ].map((item) => (
          <div key={item.label} className="stat-card text-center">
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-slate-400 text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Grade Distribution */}
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Grade Distribution</h2>
          </div>
          <div className="p-4 space-y-2">
            {gradeDistribution.map((item) => (
              <div key={item.grade} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{item.grade}</span>
                  <span className="text-slate-300">{item.count} students</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="xl:col-span-2 page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Top Performers</h2>
          </div>
          <div className="p-4 space-y-3">
            {grades
              .sort((a, b) => b.avg - a.avg)
              .slice(0, 5)
              .map((s, idx) => (
                <div key={s.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    idx === 0 ? "bg-amber-500 text-amber-950" :
                    idx === 1 ? "bg-slate-400 text-slate-900" :
                    idx === 2 ? "bg-amber-700 text-amber-100" :
                    "bg-slate-700 text-slate-300"
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{s.name}</p>
                    <p className="text-slate-500 text-xs">{s.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{s.avg.toFixed(1)}%</p>
                    <span className={`badge ${letterColor(getLetterGrade(s.avg))}`}>{getLetterGrade(s.avg)}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Full Grades Table */}
      <div className="page-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">All Student Grades</h2>
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Search students..." className="search-input w-48" />
            <select className="search-input">
              <option value="">All Classes</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Math</th>
                <th>English</th>
                <th>Science</th>
                <th>History</th>
                <th>Art</th>
                <th>Average</th>
                <th>Grade</th>
                <th>GPA</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-white font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td>{s.class}</td>
                  <td className={scoreColor(s.math)}>{s.math}</td>
                  <td className={scoreColor(s.english)}>{s.english}</td>
                  <td className={scoreColor(s.science)}>{s.science}</td>
                  <td className={scoreColor(s.history)}>{s.history}</td>
                  <td className={scoreColor(s.art)}>{s.art}</td>
                  <td className="text-white font-semibold">{s.avg.toFixed(1)}</td>
                  <td>
                    <span className={`badge ${letterColor(getLetterGrade(s.avg))}`}>{getLetterGrade(s.avg)}</span>
                  </td>
                  <td className="text-slate-400">{getGPA(s.avg).toFixed(1)}</td>
                  <td className="text-slate-400">#{s.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
          <p className="text-slate-500 text-sm">Showing 10 of 1,248 students</p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary px-3 py-1.5 text-xs">Previous</button>
            <button className="btn-primary px-3 py-1.5 text-xs">Next</button>
          </div>
        </div>
      </div>

      {/* Configure Grading Scheme Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <div>
                <h2 className="text-xl font-bold text-white">Grading Scheme Configuration</h2>
                <p className="text-slate-400 text-sm mt-1">Define your school&apos;s marking scheme and grade boundaries</p>
              </div>
              <button 
                onClick={() => setShowConfigModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Current Grade Scheme */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Current Grade Scale</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-2 px-3 text-slate-400 font-medium">Letter</th>
                        <th className="text-left py-2 px-3 text-slate-400 font-medium">Min Score</th>
                        <th className="text-left py-2 px-3 text-slate-400 font-medium">Max Score</th>
                        <th className="text-left py-2 px-3 text-slate-400 font-medium">GPA</th>
                        <th className="text-left py-2 px-3 text-slate-400 font-medium">Description</th>
                        <th className="text-left py-2 px-3 text-slate-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gradeConfig.slice().sort((a, b) => b.minScore - a.minScore).map((grade) => (
                        <tr key={grade.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                          <td className="py-2 px-3">
                            <span className={`badge ${letterColor(grade.letter)}`}>{grade.letter}</span>
                          </td>
                          <td className="py-2 px-3 text-slate-300">{grade.minScore}</td>
                          <td className="py-2 px-3 text-slate-300">{grade.maxScore}</td>
                          <td className="py-2 px-3 text-slate-300">{grade.gpa.toFixed(1)}</td>
                          <td className="py-2 px-3 text-slate-400">{grade.description}</td>
                          <td className="py-2 px-3">
                            <button 
                              onClick={() => handleEditGrade(grade)}
                              className="text-blue-400 hover:text-blue-300 text-xs mr-2"
                            >
                              Edit
                            </button>
                            {grade.letter !== "F" && (
                              <button 
                                onClick={() => handleDeleteGrade(grade.id)}
                                className="text-red-400 hover:text-red-300 text-xs"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Edit/Add Grade Form */}
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 className="text-white font-semibold mb-3">
                  {editingGrade ? "Edit Grade" : "Add New Grade"}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Letter Grade</label>
                    <input
                      type="text"
                      value={newGrade.letter}
                      onChange={(e) => setNewGrade({...newGrade, letter: e.target.value.toUpperCase()})}
                      placeholder="e.g., A+"
                      className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Min Score</label>
                    <input
                      type="number"
                      value={newGrade.minScore}
                      onChange={(e) => setNewGrade({...newGrade, minScore: parseInt(e.target.value) || 0})}
                      className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Max Score</label>
                    <input
                      type="number"
                      value={newGrade.maxScore}
                      onChange={(e) => setNewGrade({...newGrade, maxScore: parseInt(e.target.value) || 0})}
                      className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">GPA Points</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newGrade.gpa}
                      onChange={(e) => setNewGrade({...newGrade, gpa: parseFloat(e.target.value) || 0})}
                      className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Description</label>
                    <input
                      type="text"
                      value={newGrade.description}
                      onChange={(e) => setNewGrade({...newGrade, description: e.target.value})}
                      placeholder="e.g., Excellent"
                      className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  {editingGrade ? (
                    <>
                      <button onClick={handleSaveEdit} className="btn-primary text-sm px-4 py-2">
                        Save Changes
                      </button>
                      <button 
                        onClick={() => {
                          setEditingGrade(null);
                          setNewGrade({ letter: "", minScore: 0, maxScore: 100, gpa: 0, description: "" });
                        }}
                        className="btn-secondary text-sm px-4 py-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={handleAddGrade} className="btn-primary text-sm px-4 py-2">
                      Add Grade
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700 bg-slate-800/50">
              <button 
                onClick={handleResetConfig}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                Reset to Default
              </button>
              <button 
                onClick={() => setShowConfigModal(false)}
                className="btn-primary"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
