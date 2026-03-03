// Types for Terminal Reports
"use client";

import { useState } from "react";

interface StudentReport {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  semester: string;
  academicYear: string;
  subjects: SubjectGrade[];
  overallAverage: number;
  overallGrade: string;
  rank: number;
  attendance: number;
  remarks: string;
  status: "Published" | "Pending" | "Draft";
  generatedAt: string;
}

interface SubjectGrade {
  name: string;
  code: string;
  score: number;
  grade: string;
  remarks: string;
}

interface ClassReport {
  id: string;
  className: string;
  semester: string;
  academicYear: string;
  studentCount: number;
  avgScore: number;
  passRate: number;
  topScore: number;
  lowestScore: number;
  generatedAt: string;
}

const semesters = [
  "Spring Semester 2026",
  "Fall Semester 2025",
  "Spring Semester 2025",
  "Fall Semester 2024",
];

const studentReports: StudentReport[] = [
  {
    id: "RPT-001",
    studentId: "STU-001",
    studentName: "Emma Johnson",
    class: "Grade 10-A",
    semester: "Spring Semester 2026",
    academicYear: "2025-2026",
    subjects: [
      { name: "Mathematics", code: "MATH", score: 92, grade: "A-", remarks: "Excellent" },
      { name: "English", code: "ENG", score: 88, grade: "B+", remarks: "Good" },
      { name: "Science", code: "SCI", score: 95, grade: "A", remarks: "Outstanding" },
      { name: "History", code: "HIST", score: 85, grade: "B", remarks: "Good" },
      { name: "Art", code: "ART", score: 90, grade: "A-", remarks: "Excellent" },
    ],
    overallAverage: 90.0,
    overallGrade: "A-",
    rank: 3,
    attendance: 96,
    remarks: "An outstanding student with consistent excellent performance across all subjects.",
    status: "Published",
    generatedAt: "2026-02-15",
  },
  {
    id: "RPT-002",
    studentId: "STU-003",
    studentName: "Olivia Brown",
    class: "Grade 9-C",
    semester: "Spring Semester 2026",
    academicYear: "2025-2026",
    subjects: [
      { name: "Mathematics", code: "MATH", score: 98, grade: "A+", remarks: "Perfect" },
      { name: "English", code: "ENG", score: 96, grade: "A", remarks: "Outstanding" },
      { name: "Science", code: "SCI", score: 97, grade: "A+", remarks: "Excellent" },
      { name: "History", code: "HIST", score: 94, grade: "A", remarks: "Very Good" },
      { name: "Art", code: "ART", score: 99, grade: "A+", remarks: "Exceptional" },
    ],
    overallAverage: 96.8,
    overallGrade: "A+",
    rank: 1,
    attendance: 98,
    remarks: "Top performer in the class. Exceptional work across all subjects.",
    status: "Published",
    generatedAt: "2026-02-15",
  },
  {
    id: "RPT-003",
    studentId: "STU-004",
    studentName: "Noah Davis",
    class: "Grade 12-A",
    semester: "Spring Semester 2026",
    academicYear: "2025-2026",
    subjects: [
      { name: "Mathematics", code: "MATH", score: 65, grade: "D", remarks: "Needs Improvement" },
      { name: "English", code: "ENG", score: 70, grade: "C-", remarks: "Fair" },
      { name: "Science", code: "SCI", score: 68, grade: "D+", remarks: "Needs Improvement" },
      { name: "History", code: "HIST", score: 72, grade: "C", remarks: "Satisfactory" },
      { name: "Art", code: "ART", score: 60, grade: "D-", remarks: "Needs Improvement" },
    ],
    overallAverage: 67.0,
    overallGrade: "D+",
    rank: 28,
    attendance: 82,
    remarks: "Struggling academically. Recommend additional support and tutoring.",
    status: "Published",
    generatedAt: "2026-02-15",
  },
  {
    id: "RPT-004",
    studentId: "STU-007",
    studentName: "Sophia Anderson",
    class: "Grade 9-A",
    semester: "Spring Semester 2026",
    academicYear: "2025-2026",
    subjects: [
      { name: "Mathematics", code: "MATH", score: 100, grade: "A+", remarks: "Perfect" },
      { name: "English", code: "ENG", score: 98, grade: "A+", remarks: "Outstanding" },
      { name: "Science", code: "SCI", score: 99, grade: "A+", remarks: "Exceptional" },
      { name: "History", code: "HIST", score: 97, grade: "A", remarks: "Excellent" },
      { name: "Art", code: "ART", score: 100, grade: "A+", remarks: "Perfect" },
    ],
    overallAverage: 98.8,
    overallGrade: "A+",
    rank: 1,
    attendance: 100,
    remarks: "Exceptional student. Maintains perfect scores consistently.",
    status: "Published",
    generatedAt: "2026-02-15",
  },
  {
    id: "RPT-005",
    studentId: "STU-010",
    studentName: "James Jackson",
    class: "Grade 11-C",
    semester: "Spring Semester 2026",
    academicYear: "2025-2026",
    subjects: [
      { name: "Mathematics", code: "MATH", score: 58, grade: "F", remarks: "Failing" },
      { name: "English", code: "ENG", score: 62, grade: "D", remarks: "Needs Improvement" },
      { name: "Science", code: "SCI", score: 55, grade: "F", remarks: "Failing" },
      { name: "History", code: "HIST", score: 60, grade: "D-", remarks: "Poor" },
      { name: "Art", code: "ART", score: 65, grade: "D", remarks: "Below Standard" },
    ],
    overallAverage: 60.0,
    overallGrade: "D",
    rank: 32,
    attendance: 75,
    remarks: "At risk of failing. Urgent intervention required.",
    status: "Pending",
    generatedAt: "2026-02-20",
  },
];

const classReports: ClassReport[] = [
  { id: "CRPT-001", className: "Grade 12-A", semester: "Spring Semester 2026", academicYear: "2025-2026", studentCount: 32, avgScore: 84.2, passRate: 94.5, topScore: 98.5, lowestScore: 58.0, generatedAt: "2026-02-15" },
  { id: "CRPT-002", className: "Grade 11-B", semester: "Spring Semester 2026", academicYear: "2025-2026", studentCount: 30, avgScore: 81.6, passRate: 89.2, topScore: 95.0, lowestScore: 62.0, generatedAt: "2026-02-15" },
  { id: "CRPT-003", className: "Grade 10-A", semester: "Spring Semester 2026", academicYear: "2025-2026", studentCount: 34, avgScore: 86.8, passRate: 96.1, topScore: 97.5, lowestScore: 65.0, generatedAt: "2026-02-15" },
  { id: "CRPT-004", className: "Grade 9-C", semester: "Spring Semester 2026", academicYear: "2025-2026", studentCount: 28, avgScore: 83.4, passRate: 92.0, topScore: 96.8, lowestScore: 55.0, generatedAt: "2026-02-15" },
];

export default function TerminalReportsPage() {
  const [selectedSemester, setSelectedSemester] = useState("Spring Semester 2026");
  const [selectedReport, setSelectedReport] = useState<StudentReport | null>(null);
  const [editableRemarks, setEditableRemarks] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClassReport, setSelectedClassReport] = useState<ClassReport | null>(null);
  const [showClassModal, setShowClassModal] = useState(false);
  const [expandedClasses, setExpandedClasses] = useState<Set<string>>(new Set());
  
  const toggleClass = (className: string) => {
    setExpandedClasses(prev => {
      const next = new Set(prev);
      if (next.has(className)) {
        next.delete(className);
      } else {
        next.add(className);
      }
      return next;
    });
  };
  
  const groupedReports = studentReports.reduce((acc, report) => {
    if (!acc[report.class]) {
      acc[report.class] = [];
    }
    acc[report.class].push(report);
    return acc;
  }, {} as Record<string, StudentReport[]>);
  
  const classNames = Object.keys(groupedReports).sort();
  
  const handleViewReport = (report: StudentReport) => {
    setSelectedReport(report);
    setEditableRemarks(report.remarks);
    setShowModal(true);
  };
  
  const handleViewClassReport = (report: ClassReport) => {
    setSelectedClassReport(report);
    setShowClassModal(true);
  };
  
  const handleExportSingle = (report: StudentReport) => {
    const headers = ['Subject', 'Code', 'Score', 'Grade', 'Remarks'];
    const csvContent = [
      headers.join(','),
      ...report.subjects.map(s => 
        [s.name, s.code, s.score, s.grade, `"${s.remarks}"`].join(',')
      ),
      '',
      `Overall Average,${report.overallAverage.toFixed(1)}%`,
      `Overall Grade,${report.overallGrade}`,
      `Rank,${report.rank}`,
      `Attendance,${report.attendance}%`,
      `Status,${report.status}`,
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${report.studentName.replace(/\s+/g, '_')}_report_${report.semester.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handlePrintStudent = (report: StudentReport) => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Student Report - ${report.studentName}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
          .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
          .header h1 { font-size: 24px; margin-bottom: 5px; }
          .header p { color: #666; font-size: 14px; }
          .info-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px; }
          .info-box { border: 1px solid #ddd; padding: 10px; text-align: center; border-radius: 4px; }
          .info-box .label { font-size: 12px; color: #666; }
          .info-box .value { font-size: 20px; font-weight: bold; color: #333; }
          .student-info { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px; }
          .student-info div { font-size: 14px; }
          .student-info strong { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 13px; }
          th { background: #333; color: white; }
          tr:nth-child(even) { background: #f9f9f9; }
          .remarks { padding: 15px; background: #f5f5f5; border-radius: 4px; margin-bottom: 20px; }
          .remarks h4 { margin-bottom: 10px; font-size: 14px; }
          .footer { text-align: center; font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${report.studentName}</h1>
          <p>Student Report Card - ${report.semester} ${report.academicYear}</p>
        </div>
        <div class="student-info">
          <div><strong>Student ID:</strong> ${report.studentId}</div>
          <div><strong>Class:</strong> ${report.class}</div>
          <div><strong>Status:</strong> ${report.status}</div>
        </div>
        <div class="info-grid">
          <div class="info-box"><div class="label">Average</div><div class="value">${report.overallAverage.toFixed(1)}%</div></div>
          <div class="info-box"><div class="label">Grade</div><div class="value">${report.overallGrade}</div></div>
          <div class="info-box"><div class="label">Rank</div><div class="value">#${report.rank}</div></div>
          <div class="info-box"><div class="label">Attendance</div><div class="value">${report.attendance}%</div></div>
        </div>
        <table>
          <thead><tr><th>Subject</th><th>Code</th><th>Score</th><th>Grade</th><th>Remarks</th></tr></thead>
          <tbody>
            ${report.subjects.map(s => `<tr><td>${s.name}</td><td>${s.code}</td><td>${s.score}%</td><td>${s.grade}</td><td>${s.remarks}</td></tr>`).join('')}
          </tbody>
        </table>
        <div class="remarks"><h4>Teacher Remarks:</h4><p>${editableRemarks}</p></div>
        <div class="footer"><p>Generated on ${report.generatedAt} | School Management System</p></div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = () => printWindow.print();
    }
  };
  
  const handleExportClass = (classReport: ClassReport) => {
    const headers = ['Class', 'Students', 'Avg Score', 'Pass Rate', 'Highest', 'Lowest', 'Semester', 'Generated'];
    const csvContent = [
      headers.join(','),
      [classReport.className, classReport.studentCount, classReport.avgScore.toFixed(1), classReport.passRate.toFixed(1), classReport.topScore.toFixed(1), classReport.lowestScore.toFixed(1), `"${classReport.semester}"`, classReport.generatedAt].join(',')
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${classReport.className.replace(/\s+/g, '_')}_report.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const letterColor = (grade: string) => {
    if (grade.startsWith("A")) return "badge-green";
    if (grade.startsWith("B")) return "badge-blue";
    if (grade.startsWith("C")) return "badge-yellow";
    if (grade.startsWith("D")) return "badge-orange";
    return "badge-red";
  };

  const statusColor = (status: string) => {
    if (status === "Published") return "badge-green";
    if (status === "Pending") return "badge-yellow";
    return "badge-red";
  };

  const scoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 70) return "text-amber-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-amber-500 text-amber-950";
    if (rank === 2) return "bg-slate-400 text-slate-900";
    if (rank === 3) return "bg-amber-700 text-amber-100";
    return "bg-slate-700 text-slate-300";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Terminal Reports</h1>
          <p className="text-slate-400 text-sm mt-1">Generate and manage semester terminal reports</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            className="search-input"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            {semesters.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button 
            className="btn-primary"
            onClick={() => {
              // Export student reports as CSV
              const headers = ['Student ID', 'Student Name', 'Class', 'Semester', 'Average', 'Grade', 'Rank', 'Attendance', 'Status'];
              const csvContent = [
                headers.join(','),
                ...studentReports.map(r => 
                  [r.studentId, `"${r.studentName}"`, `"${r.class}"`, `"${r.semester}"`, r.overallAverage.toFixed(1), r.overallGrade, r.rank, r.attendance, r.status].join(',')
                )
              ].join('\n');
              
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              const url = URL.createObjectURL(blob);
              link.setAttribute('href', url);
              link.setAttribute('download', `terminal_reports_${selectedSemester.replace(/\s+/g, '_')}.csv`);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Reports
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Reports", value: "1,248", color: "text-blue-400" },
          { label: "Published", value: "1,142", color: "text-emerald-400" },
          { label: "Pending", value: "106", color: "text-amber-400" },
          { label: "Avg. Score", value: "82.6%", color: "text-purple-400" },
        ].map((item) => (
          <div key={item.label} className="stat-card text-center">
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-slate-400 text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="page-card p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">Generate Reports</h3>
              <p className="text-slate-500 text-sm">Create new terminal reports</p>
            </div>
          </div>
          <button className="btn-secondary w-full mt-4">Generate New Report</button>
        </div>

        <div className="page-card p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">Publish Reports</h3>
              <p className="text-slate-500 text-sm">Release reports to students</p>
            </div>
          </div>
          <button className="btn-secondary w-full mt-4">Publish Pending</button>
        </div>

        <div className="page-card p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">Analytics</h3>
              <p className="text-slate-500 text-sm">View performance analytics</p>
            </div>
          </div>
          <button className="btn-secondary w-full mt-4">View Analytics</button>
        </div>
      </div>

      {/* Class Reports Summary */}
      <div className="page-card">
        <div className="px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">Class Performance Summary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Students</th>
                <th>Avg. Score</th>
                <th>Pass Rate</th>
                <th>Highest</th>
                <th>Lowest</th>
                <th>Generated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classReports.map((report) => (
                <tr key={report.id}>
                  <td className="text-white font-medium">{report.className}</td>
                  <td>{report.studentCount}</td>
                  <td className={scoreColor(report.avgScore)}>{report.avgScore.toFixed(1)}%</td>
                  <td className="text-emerald-400">{report.passRate.toFixed(1)}%</td>
                  <td className="text-emerald-400">{report.topScore.toFixed(1)}%</td>
                  <td className={scoreColor(report.lowestScore)}>{report.lowestScore.toFixed(1)}%</td>
                  <td className="text-slate-400">{report.generatedAt}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button 
                        className="text-blue-400 hover:text-blue-300 text-xs"
                        onClick={() => handleViewClassReport(report)}
                      >View</button>
                      <button 
                        className="text-slate-400 hover:text-white text-xs"
                        onClick={() => handleExportClass(report)}
                      >Export</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Reports by Class */}
      <div className="page-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">Individual Student Reports</h2>
          <div className="flex items-center gap-3">
            <input type="text" placeholder="Search students..." className="search-input w-48" />
            <select className="search-input">
              <option value="">All Classes</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>
            <select className="search-input">
              <option value="">All Status</option>
              <option>Published</option>
              <option>Pending</option>
              <option>Draft</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-slate-800">
          {classNames.map((className) => {
            const reports = groupedReports[className];
            const isExpanded = expandedClasses.has(className);
            const avgScore = reports.reduce((sum, r) => sum + r.overallAverage, 0) / reports.length;
            const publishedCount = reports.filter(r => r.status === "Published").length;
            
            return (
              <div key={className} className="border-b border-slate-800 last:border-b-0">
                <button
                  onClick={() => toggleClass(className)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold">{className}</h3>
                      <p className="text-slate-500 text-sm">{reports.length} students • Avg: {avgScore.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 text-sm">{publishedCount} published</span>
                    <span className="badge badge-blue">{reports.length}</span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-6 pb-4">
                    <div className="overflow-x-auto ml-6 border-l-2 border-slate-700">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Student</th>
                            <th>Semester</th>
                            <th>Average</th>
                            <th>Grade</th>
                            <th>Rank</th>
                            <th>Attendance</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reports.map((report) => (
                            <tr key={report.id}>
                              <td>
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
                                    {report.studentName.split(" ").map((n) => n[0]).join("")}
                                  </div>
                                  <div>
                                    <p className="text-white font-medium text-sm">{report.studentName}</p>
                                    <p className="text-slate-500 text-xs">{report.studentId}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="text-slate-400 text-sm">{report.semester}</td>
                              <td className={`font-semibold ${scoreColor(report.overallAverage)}`}>
                                {report.overallAverage.toFixed(1)}%
                              </td>
                              <td>
                                <span className={`badge ${letterColor(report.overallGrade)}`}>
                                  {report.overallGrade}
                                </span>
                              </td>
                              <td>
                                <div className="flex items-center gap-2">
                                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getRankBadge(report.rank)}`}>
                                    {report.rank}
                                  </span>
                                </div>
                              </td>
                              <td className={report.attendance >= 90 ? "text-emerald-400" : report.attendance >= 75 ? "text-amber-400" : "text-red-400"}>
                                {report.attendance}%
                              </td>
                              <td>
                                <span className={`badge ${statusColor(report.status)}`}>
                                  {report.status}
                                </span>
                              </td>
                              <td>
                                <div className="flex items-center gap-2">
                                  <button 
                                    className="text-blue-400 hover:text-blue-300 text-xs"
                                    onClick={() => handleViewReport(report)}
                                  >View</button>
                                  <button 
                                    className="text-slate-400 hover:text-white text-xs"
                                    onClick={() => handleExportSingle(report)}
                                  >Export</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
          <p className="text-slate-500 text-sm">Showing {studentReports.length} of 1,248 reports</p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary px-3 py-1.5 text-xs">Previous</button>
            <button className="btn-primary px-3 py-1.5 text-xs">Next</button>
          </div>
        </div>
      </div>

      {/* Grade Summary by Subject */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Subject Performance</h2>
          </div>
          <div className="p-4 space-y-3">
            {[
              { subject: "Mathematics", avg: 78.5, high: 100, low: 45, students: 312 },
              { subject: "English", avg: 82.3, high: 98, low: 52, students: 312 },
              { subject: "Science", avg: 80.1, high: 99, low: 48, students: 312 },
              { subject: "History", avg: 84.6, high: 97, low: 55, students: 312 },
              { subject: "Art", avg: 88.2, high: 100, low: 60, students: 312 },
            ].map((subject) => (
              <div key={subject.subject} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{subject.subject}</span>
                  <span className={`font-semibold ${scoreColor(subject.avg)}`}>{subject.avg.toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>High: <span className="text-emerald-400">{subject.high}%</span></span>
                  <span>Low: <span className="text-red-400">{subject.low}%</span></span>
                  <span>{subject.students} students</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                  <div
                    className="h-1.5 rounded-full bg-blue-500"
                    style={{ width: `${subject.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Grade Distribution</h2>
          </div>
          <div className="p-4 space-y-2">
            {[
              { grade: "A+", range: "97-100%", count: 48, pct: 3.8 },
              { grade: "A", range: "93-96%", count: 86, pct: 6.9 },
              { grade: "A-", range: "90-92%", count: 92, pct: 7.4 },
              { grade: "B+", range: "87-89%", count: 124, pct: 9.9 },
              { grade: "B", range: "83-86%", count: 156, pct: 12.5 },
              { grade: "B-", range: "80-82%", count: 142, pct: 11.4 },
              { grade: "C+", range: "77-79%", count: 118, pct: 9.5 },
              { grade: "C", range: "73-76%", count: 156, pct: 12.5 },
              { grade: "D", range: "60-72%", count: 186, pct: 14.9 },
              { grade: "F", range: "Below 60%", count: 140, pct: 11.2 },
            ].map((item) => (
              <div key={item.grade} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{item.grade} ({item.range})</span>
                  <span className="text-slate-300">{item.count} students ({item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.grade.startsWith("A") ? "bg-emerald-500" :
                      item.grade.startsWith("B") ? "bg-blue-500" :
                      item.grade.startsWith("C") ? "bg-amber-500" :
                      "bg-red-500"
                    }`}
                    style={{ width: `${item.pct * 5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="page-card">
        <div className="px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">Recent Report Activity</h2>
        </div>
        <div className="p-4 space-y-3">
          {[
            { action: "Report Generated", details: "Grade 12-A Terminal Report generated", time: "2 hours ago", user: "Admin" },
            { action: "Reports Published", details: "142 reports published for Grade 10", time: "5 hours ago", user: "Principal" },
            { action: "Report Exported", details: "Grade 11-B reports exported to PDF", time: "Yesterday", user: "Admin" },
            { action: "Report Updated", details: "Individual report updated for Noah Davis", time: "Yesterday", user: "Teacher" },
            { action: "Bulk Generation", details: "312 reports generated for Spring 2026", time: "2 days ago", user: "System" },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{activity.action}</p>
                <p className="text-slate-500 text-xs">{activity.details}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-xs">{activity.time}</p>
                <p className="text-slate-500 text-xs">{activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Report Modal */}
      {showClassModal && selectedClassReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-white font-semibold">Class Report Details</h2>
              <button 
                onClick={() => setShowClassModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Class</span>
                <span className="text-white font-medium">{selectedClassReport.className}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Semester</span>
                <span className="text-white">{selectedClassReport.semester}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Academic Year</span>
                <span className="text-white">{selectedClassReport.academicYear}</span>
              </div>
              <div className="border-t border-slate-700 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-800 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">{selectedClassReport.studentCount}</p>
                    <p className="text-slate-400 text-xs">Students</p>
                  </div>
                  <div className="text-center p-3 bg-slate-800 rounded-lg">
                    <p className="text-2xl font-bold text-emerald-400">{selectedClassReport.avgScore.toFixed(1)}%</p>
                    <p className="text-slate-400 text-xs">Avg Score</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-700 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Pass Rate</span>
                  <span className="text-emerald-400 font-semibold">{selectedClassReport.passRate.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Highest Score</span>
                  <span className="text-emerald-400 font-semibold">{selectedClassReport.topScore.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Lowest Score</span>
                  <span className="text-red-400 font-semibold">{selectedClassReport.lowestScore.toFixed(1)}%</span>
                </div>
              </div>
              <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
                <span className="text-slate-400">Generated</span>
                <span className="text-slate-300">{selectedClassReport.generatedAt}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => handleExportClass(selectedClassReport)}
                  className="btn-primary flex-1"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Export CSV
                </button>
                <button 
                  onClick={() => setShowClassModal(false)}
                  className="btn-secondary flex-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Report Modal */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-900">
              <h2 className="text-white font-semibold">Student Report Details</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {selectedReport.studentName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{selectedReport.studentName}</h3>
                    <p className="text-slate-400 text-sm">{selectedReport.studentId} • {selectedReport.class}</p>
                  </div>
                </div>
                <span className={`badge ${statusColor(selectedReport.status)}`}>
                  {selectedReport.status}
                </span>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-slate-800 rounded-lg">
                  <p className="text-2xl font-bold text-blue-400">{selectedReport.overallAverage.toFixed(1)}%</p>
                  <p className="text-slate-400 text-xs">Average</p>
                </div>
                <div className="text-center p-3 bg-slate-800 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-400">{selectedReport.overallGrade}</p>
                  <p className="text-slate-400 text-xs">Grade</p>
                </div>
                <div className="text-center p-3 bg-slate-800 rounded-lg">
                  <p className="text-2xl font-bold text-amber-400">#{selectedReport.rank}</p>
                  <p className="text-slate-400 text-xs">Rank</p>
                </div>
                <div className="text-center p-3 bg-slate-800 rounded-lg">
                  <p className={`text-2xl font-bold ${selectedReport.attendance >= 90 ? "text-emerald-400" : selectedReport.attendance >= 75 ? "text-amber-400" : "text-red-400"}`}>
                    {selectedReport.attendance}%
                  </p>
                  <p className="text-slate-400 text-xs">Attendance</p>
                </div>
              </div>

              {/* Semester Info */}
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-slate-400">Semester: </span>
                  <span className="text-white">{selectedReport.semester}</span>
                </div>
                <div>
                  <span className="text-slate-400">Academic Year: </span>
                  <span className="text-white">{selectedReport.academicYear}</span>
                </div>
                <div>
                  <span className="text-slate-400">Generated: </span>
                  <span className="text-slate-300">{selectedReport.generatedAt}</span>
                </div>
              </div>

              {/* Subject Grades Table */}
              <div className="border-t border-slate-700 pt-4">
                <h4 className="text-white font-medium mb-3">Subject Grades</h4>
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>Score</th>
                        <th>Grade</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReport.subjects.map((subject, idx) => (
                        <tr key={idx}>
                          <td className="text-white font-medium">{subject.name}</td>
                          <td className="text-slate-400">{subject.code}</td>
                          <td className={scoreColor(subject.score)}>{subject.score}%</td>
                          <td>
                            <span className={`badge ${letterColor(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          </td>
                          <td className="text-slate-400">{subject.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Remarks */}
              <div className="border-t border-slate-700 pt-4">
                <h4 className="text-white font-medium mb-2">Teacher Remarks</h4>
                <textarea
                  value={editableRemarks}
                  onChange={(e) => setEditableRemarks(e.target.value)}
                  className="w-full bg-slate-800 text-slate-300 p-3 rounded-lg border border-slate-600 focus:border-emerald-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Enter teacher remarks..."
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => handlePrintStudent(selectedReport)}
                  className="btn-secondary flex-1"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  Print
                </button>
                <button 
                  onClick={() => handleExportSingle(selectedReport)}
                  className="btn-primary flex-1"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Export PDF
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
