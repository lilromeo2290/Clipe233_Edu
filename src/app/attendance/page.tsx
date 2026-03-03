"use client";

import { useState } from "react";

// Types
interface Student {
  id: string;
  name: string;
  classId: string;
  className: string;
}

interface DailyAttendance {
  date: string;
  day: string;
  students: {
    [studentId: string]: {
      status: "present" | "absent" | "late" | "excused";
      remarks?: string;
    };
  };
}

interface ClassAttendance {
  classId: string;
  className: string;
  term: string;
  year: number;
  attendance: DailyAttendance[];
}

// Mock Data
const classes = [
  { id: "G10A", name: "Grade 10-A" },
  { id: "G10B", name: "Grade 10-B" },
  { id: "G10C", name: "Grade 10-C" },
  { id: "G11A", name: "Grade 11-A" },
  { id: "G11B", name: "Grade 11-B" },
  { id: "G11C", name: "Grade 11-C" },
  { id: "G12A", name: "Grade 12-A" },
  { id: "G12B", name: "Grade 12-B" },
  { id: "G9A", name: "Grade 9-A" },
  { id: "G9B", name: "Grade 9-B" },
  { id: "G9C", name: "Grade 9-C" },
];

const students: Student[] = [
  { id: "STU-001", name: "Emma Johnson", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-002", name: "Liam Williams", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-003", name: "Olivia Brown", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-004", name: "Noah Davis", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-005", name: "Ava Martinez", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-006", name: "Ethan Wilson", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-007", name: "Sophia Anderson", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-008", name: "Mason Taylor", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-009", name: "Isabella Thomas", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-010", name: "James Jackson", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-011", name: "Charlotte White", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-012", name: "Benjamin Harris", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-013", name: "Amelia Clark", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-014", name: "Lucas Lewis", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-015", name: "Mia Robinson", classId: "G10A", className: "Grade 10-A" },
  { id: "STU-016", name: "Henry Walker", classId: "G10B", className: "Grade 10-B" },
  { id: "STU-017", name: "Harper Hall", classId: "G10B", className: "Grade 10-B" },
  { id: "STU-018", name: "Alexander Young", classId: "G10B", className: "Grade 10-B" },
  { id: "STU-019", name: "Evelyn King", classId: "G10B", className: "Grade 10-B" },
  { id: "STU-020", name: "Daniel Wright", classId: "G10B", className: "Grade 10-B" },
];

const terms = [
  { id: "1st", name: "First Term", year: 2026, startDate: "2026-01-06", endDate: "2026-04-03" },
  { id: "2nd", name: "Second Term", year: 2026, startDate: "2026-04-14", endDate: "2026-07-12" },
  { id: "3rd", name: "Third Term", year: 2026, startDate: "2026-09-01", endDate: "2026-12-15" },
];

// Generate dates for a term
function generateTermDates(startDate: string, endDate: string): DailyAttendance[] {
  const dates: DailyAttendance[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const current = new Date(start);
  while (current <= end) {
    const dayOfWeek = current.getDay();
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      dates.push({
        date: current.toISOString().split("T")[0],
        day: dayNames[dayOfWeek],
        students: {},
      });
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

// Generate random attendance for demo
function generateRandomAttendance(dates: DailyAttendance[], studentIds: string[]): DailyAttendance[] {
  return dates.map((day) => ({
    ...day,
    students: studentIds.reduce((acc, studentId) => {
      const rand = Math.random();
      let status: "present" | "absent" | "late" | "excused" = "present";
      if (rand > 0.95) status = "excused";
      else if (rand > 0.90) status = "absent";
      else if (rand > 0.82) status = "late";
      
      acc[studentId] = { status };
      return acc;
    }, {} as { [key: string]: { status: "present" | "absent" | "late" | "excused"; remarks?: string } }),
  }));
}

// Calculate statistics
function calculateStats(attendance: DailyAttendance[], studentIds: string[]) {
  const stats: { [studentId: string]: { present: number; absent: number; late: number; excused: number; total: number } } = {};
  
  studentIds.forEach((id) => {
    stats[id] = { present: 0, absent: 0, late: 0, excused: 0, total: 0 };
  });
  
  attendance.forEach((day) => {
    studentIds.forEach((studentId) => {
      const record = day.students[studentId];
      if (record) {
        stats[studentId].total++;
        if (record.status === "present") stats[studentId].present++;
        else if (record.status === "absent") stats[studentId].absent++;
        else if (record.status === "late") stats[studentId].late++;
        else if (record.status === "excused") stats[studentId].excused++;
      }
    });
  });
  
  return stats;
}

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState<string>("G10A");
  const [selectedTerm, setSelectedTerm] = useState<string>("1st");
  const [attendanceData, setAttendanceData] = useState<DailyAttendance[]>(() => {
    const term = terms.find((t) => t.id === selectedTerm)!;
    const dates = generateTermDates(term.startDate, term.endDate);
    return generateRandomAttendance(dates, students.filter((s) => s.classId === selectedClass).map((s) => s.id));
  });
  const [showStats, setShowStats] = useState(false);
  
  const classStudents = students.filter((s) => s.classId === selectedClass);
  const stats = calculateStats(attendanceData, classStudents.map((s) => s.id));
  const currentTerm = terms.find((t) => t.id === selectedTerm)!;
  
  // Reset attendance when class or term changes
  const handleClassChange = (classId: string) => {
    setSelectedClass(classId);
    const term = terms.find((t) => t.id === selectedTerm)!;
    const dates = generateTermDates(term.startDate, term.endDate);
    const classStudents = students.filter((s) => s.classId === classId);
    setAttendanceData(generateRandomAttendance(dates, classStudents.map((s) => s.id)));
    setShowStats(false);
  };
  
  const handleTermChange = (termId: string) => {
    setSelectedTerm(termId);
    const term = terms.find((t) => t.id === termId)!;
    const dates = generateTermDates(term.startDate, term.endDate);
    const classStudents = students.filter((s) => s.classId === selectedClass);
    setAttendanceData(generateRandomAttendance(dates, classStudents.map((s) => s.id)));
    setShowStats(false);
  };
  
  const handleAttendanceChange = (date: string, studentId: string, status: "present" | "absent" | "late" | "excused") => {
    setAttendanceData((prev) =>
      prev.map((day) =>
        day.date === date
          ? {
              ...day,
              students: {
                ...day.students,
                [studentId]: { status },
              },
            }
          : day
      )
    );
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-emerald-500";
      case "absent": return "bg-red-500";
      case "late": return "bg-amber-500";
      case "excused": return "bg-blue-500";
      default: return "bg-slate-600";
    }
  };
  
  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "present": return "text-emerald-400";
      case "absent": return "text-red-400";
      case "late": return "text-amber-400";
      case "excused": return "text-blue-400";
      default: return "text-slate-400";
    }
  };
  
  const getStatusInitial = (status: string) => {
    switch (status) {
      case "present": return "P";
      case "absent": return "A";
      case "late": return "L";
      case "excused": return "E";
      default: return "-";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance Register</h1>
          <p className="text-slate-400 text-sm mt-1">Class attendance tracking for term {selectedTerm}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {currentTerm.startDate} - {currentTerm.endDate}
          </div>
          <button 
            onClick={() => setShowStats(!showStats)}
            className="btn-secondary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 20V10" />
              <path d="M12 20V4" />
              <path d="M6 20v-6" />
            </svg>
            {showStats ? "Hide Statistics" : "View Statistics"}
          </button>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Register
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-slate-400 text-sm">Class:</label>
          <select 
            value={selectedClass}
            onChange={(e) => handleClassChange(e.target.value)}
            className="search-input w-48"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-slate-400 text-sm">Term:</label>
          <select 
            value={selectedTerm}
            onChange={(e) => handleTermChange(e.target.value)}
            className="search-input w-48"
          >
            {terms.map((t) => (
              <option key={t.id} value={t.id}>{t.name} {t.year}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {attendanceData.length} school days in term
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {classStudents.length} students enrolled
        </div>
      </div>

      {/* Statistics Summary */}
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(() => {
            const totalPresent = Object.values(stats).reduce((sum, s) => sum + s.present, 0);
            const totalAbsent = Object.values(stats).reduce((sum, s) => sum + s.absent, 0);
            const totalLate = Object.values(stats).reduce((sum, s) => sum + s.late, 0);
            const totalExcused = Object.values(stats).reduce((sum, s) => sum + s.excused, 0);
            const grandTotal = totalPresent + totalAbsent + totalLate + totalExcused;
            const avgAttendance = grandTotal > 0 ? Math.round((totalPresent / grandTotal) * 100) : 0;
            
            return (
              <>
                <div className="stat-card">
                  <p className="text-2xl font-bold text-emerald-400">{avgAttendance}%</p>
                  <p className="text-slate-400 text-sm mt-1">Average Attendance</p>
                  <p className="text-slate-600 text-xs mt-1">Across all students</p>
                </div>
                <div className="stat-card">
                  <p className="text-2xl font-bold text-emerald-400">{totalPresent}</p>
                  <p className="text-slate-400 text-sm mt-1">Total Present</p>
                  <p className="text-slate-600 text-xs mt-1">{Math.round((totalPresent / grandTotal) * 100)}% of all records</p>
                </div>
                <div className="stat-card">
                  <p className="text-2xl font-bold text-red-400">{totalAbsent}</p>
                  <p className="text-slate-400 text-sm mt-1">Total Absent</p>
                  <p className="text-slate-600 text-xs mt-1">{Math.round((totalAbsent / grandTotal) * 100)}% of all records</p>
                </div>
                <div className="stat-card">
                  <p className="text-2xl font-bold text-amber-400">{totalLate}</p>
                  <p className="text-slate-400 text-sm mt-1">Total Late</p>
                  <p className="text-slate-600 text-xs mt-1">{Math.round((totalLate / grandTotal) * 100)}% of all records</p>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Student Statistics Table (when stats shown) */}
      {showStats && (
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Student Attendance Summary - {classes.find((c) => c.id === selectedClass)?.name}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Late</th>
                  <th>Excused</th>
                  <th>Total Days</th>
                  <th>Attendance Rate</th>
                </tr>
              </thead>
              <tbody>
                {classStudents.map((student) => {
                  const s = stats[student.id];
                  const rate = s.total > 0 ? Math.round((s.present / s.total) * 100) : 0;
                  const rateColor = rate >= 95 ? "badge-green" : rate >= 85 ? "badge-blue" : rate >= 75 ? "badge-yellow" : "badge-red";
                  
                  return (
                    <tr key={student.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
                            {student.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="text-white font-medium">{student.name}</span>
                          <span className="text-slate-500 text-xs ml-1">{student.id}</span>
                        </div>
                      </td>
                      <td className="text-emerald-400">{s.present}</td>
                      <td className="text-red-400">{s.absent}</td>
                      <td className="text-amber-400">{s.late}</td>
                      <td className="text-blue-400">{s.excused}</td>
                      <td className="text-slate-400">{s.total}</td>
                      <td>
                        <span className={`badge ${rateColor}`}>{rate}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attendance Register */}
      <div className="page-card">
        <div className="px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">Daily Attendance Register - {classes.find((c) => c.id === selectedClass)?.name} ({currentTerm.name})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900">
                <th className="text-left text-slate-400 text-xs font-medium uppercase tracking-wider p-3 sticky left-0 bg-slate-900 z-10 min-w-[180px]">
                  Student Name
                </th>
                {attendanceData.map((day) => (
                  <th key={day.date} className="text-center text-slate-400 text-xs font-medium p-2 min-w-[40px]">
                    <div className="flex flex-col items-center">
                      <span>{day.day}</span>
                      <span className="text-[10px]">{day.date.slice(5)}</span>
                    </div>
                  </th>
                ))}
                <th className="text-center text-slate-400 text-xs font-medium uppercase p-3 min-w-[60px]">Total</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map((student) => {
                const s = stats[student.id];
                const rate = s.total > 0 ? Math.round((s.present / s.total) * 100) : 0;
                
                return (
                  <tr key={student.id} className="border-t border-slate-800 hover:bg-slate-900/50">
                    <td className="p-3 sticky left-0 bg-slate-800/95 z-10">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300">
                          {student.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{student.name}</p>
                          <p className="text-slate-500 text-xs">{student.id}</p>
                        </div>
                      </div>
                    </td>
                    {attendanceData.map((day) => {
                      const record = day.students[student.id];
                      const status = record?.status || "absent";
                      
                      return (
                        <td key={day.date} className="text-center p-1">
                          <select
                            value={status}
                            onChange={(e) => handleAttendanceChange(day.date, student.id, e.target.value as any)}
                            className={`w-10 h-8 text-xs font-bold rounded cursor-pointer transition-colors ${getStatusTextColor(status)} bg-slate-900 border border-slate-700 hover:border-slate-500 focus:outline-none focus:border-blue-500`}
                          >
                            <option value="present" className="text-emerald-400">P</option>
                            <option value="absent" className="text-red-400">A</option>
                            <option value="late" className="text-amber-400">L</option>
                            <option value="excused" className="text-blue-400">E</option>
                          </select>
                        </td>
                      );
                    })}
                    <td className="text-center p-3">
                      <div className="flex flex-col items-center">
                        <span className={`text-sm font-bold ${rate >= 90 ? "text-emerald-400" : rate >= 75 ? "text-amber-400" : "text-red-400"}`}>
                          {rate}%
                        </span>
                        <span className="text-xs text-slate-500">{s.present}/{s.total}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
        <span className="font-medium">Legend:</span>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">P</span>
          <span>Present</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-red-500 flex items-center justify-center text-white text-xs font-bold">A</span>
          <span>Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-white text-xs font-bold">L</span>
          <span>Late</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">E</span>
          <span>Excused</span>
        </div>
      </div>
    </div>
  );
}
