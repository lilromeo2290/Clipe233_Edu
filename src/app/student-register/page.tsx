"use client";

import { useState } from "react";

// Types
interface Student {
  id: string;
  name: string;
  admissionNumber: string;
  gender: string;
  dateOfBirth: string;
  parentName: string;
  parentPhone: string;
  address: string;
  class: string;
  status: "active" | "inactive" | "graduated" | "transferred";
  admissionDate: string;
}

interface DailyAttendance {
  date: string;
  day: string;
  students: Record<string, string>;
}

interface ClassAttendance {
  className: string;
  term: string;
  records: DailyAttendance[];
}

// Mock data
const mockStudents: Student[] = [
  { id: "1", name: "Alex Johnson", admissionNumber: "ADM001", gender: "Male", dateOfBirth: "2010-05-15", parentName: "John Johnson", parentPhone: "+1234567890", address: "123 Main St", class: "Grade 9-A", status: "active", admissionDate: "2024-01-15" },
  { id: "2", name: "Emma Williams", admissionNumber: "ADM002", gender: "Female", dateOfBirth: "2010-08-22", parentName: "Mary Williams", parentPhone: "+1234567891", address: "456 Oak Ave", class: "Grade 9-A", status: "active", admissionDate: "2024-01-15" },
  { id: "3", name: "Michael Brown", admissionNumber: "ADM003", gender: "Male", dateOfBirth: "2010-03-10", parentName: "Robert Brown", parentPhone: "+1234567892", address: "789 Pine Rd", class: "Grade 9-A", status: "active", admissionDate: "2024-01-16" },
  { id: "4", name: "Sarah Davis", admissionNumber: "ADM004", gender: "Female", dateOfBirth: "2010-11-28", parentName: "Lisa Davis", parentPhone: "+1234567893", address: "321 Elm St", class: "Grade 9-B", status: "active", admissionDate: "2024-01-15" },
  { id: "5", name: "James Wilson", admissionNumber: "ADM005", gender: "Male", dateOfBirth: "2010-07-04", parentName: "David Wilson", parentPhone: "+1234567894", address: "654 Maple Dr", class: "Grade 9-B", status: "active", admissionDate: "2024-01-17" },
  { id: "6", name: "Emily Taylor", admissionNumber: "ADM006", gender: "Female", dateOfBirth: "2010-02-17", parentName: "Susan Taylor", parentPhone: "+1234567895", address: "987 Cedar Ln", class: "Grade 10-A", status: "active", admissionDate: "2023-01-15" },
  { id: "7", name: "Daniel Martinez", admissionNumber: "ADM007", gender: "Male", dateOfBirth: "2009-09-12", parentName: "Carlos Martinez", parentPhone: "+1234567896", address: "147 Birch Ave", class: "Grade 10-A", status: "active", admissionDate: "2023-01-15" },
  { id: "8", name: "Olivia Anderson", admissionNumber: "ADM008", gender: "Female", dateOfBirth: "2009-12-25", parentName: "Jennifer Anderson", parentPhone: "+1234567897", address: "258 Walnut St", class: "Grade 10-B", status: "active", admissionDate: "2023-01-16" },
  { id: "9", name: "William Thomas", admissionNumber: "ADM009", gender: "Male", dateOfBirth: "2009-06-08", parentName: "George Thomas", parentPhone: "+1234567898", address: "369 Spruce Rd", class: "Grade 10-B", status: "active", admissionDate: "2023-01-17" },
  { id: "10", name: "Sophia Jackson", admissionNumber: "ADM010", gender: "Female", dateOfBirth: "2009-04-19", parentName: "Karen Jackson", parentPhone: "+1234567899", address: "741 Ash Dr", class: "Grade 11-A", status: "active", admissionDate: "2022-01-15" },
  { id: "11", name: "Benjamin White", admissionNumber: "ADM011", gender: "Male", dateOfBirth: "2009-01-30", parentName: "Richard White", parentPhone: "+1234567900", address: "852 Poplar Ln", class: "Grade 11-A", status: "active", admissionDate: "2022-01-15" },
  { id: "12", name: "Isabella Harris", admissionNumber: "ADM012", gender: "Female", dateOfBirth: "2008-10-11", parentName: "Michelle Harris", parentPhone: "+1234567901", address: "963 Hickory Ave", class: "Grade 12-A", status: "active", admissionDate: "2021-01-15" },
  { id: "13", name: "Alexander Clark", admissionNumber: "ADM013", gender: "Male", dateOfBirth: "2008-07-23", parentName: "Steven Clark", parentPhone: "+1234567902", address: "159 Chestnut St", class: "Grade 12-A", status: "active", admissionDate: "2021-01-16" },
  { id: "14", name: "Mia Lewis", admissionNumber: "ADM014", gender: "Female", dateOfBirth: "2008-03-05", parentName: "Patricia Lewis", parentPhone: "+1234567903", address: "357 Sycamore Rd", class: "Grade 12-B", status: "active", admissionDate: "2021-01-17" },
  { id: "15", name: "Ethan Robinson", admissionNumber: "ADM015", gender: "Male", dateOfBirth: "2008-08-14", parentName: "Joseph Robinson", parentPhone: "+1234567904", address: "486 Redwood Dr", class: "Grade 12-B", status: "active", admissionDate: "2021-01-18" },
];

const classes = [
  "Grade 9-A", "Grade 9-B", "Grade 9-C",
  "Grade 10-A", "Grade 10-B", "Grade 10-C",
  "Grade 11-A", "Grade 11-B",
  "Grade 12-A", "Grade 12-B"
];

const terms = [
  { label: "First Term 2026", startDate: "2026-01-12", endDate: "2026-03-27" },
  { label: "Second Term 2026", startDate: "2026-04-13", endDate: "2026-07-03" },
  { label: "Third Term 2026", startDate: "2026-09-07", endDate: "2026-12-18" },
];

function generateTermDates(startDate: string, endDate: string): DailyAttendance[] {
  const dates: DailyAttendance[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const current = new Date(start);
  while (current <= end) {
    const dayOfWeek = current.getDay();
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

export default function StudentRegisterPage() {
  const [selectedClass, setSelectedClass] = useState("Grade 9-A");
  const [selectedTerm, setSelectedTerm] = useState(terms[0].label);
  const [showStats, setShowStats] = useState(false);
  
  const currentTerm = terms.find(t => t.label === selectedTerm) || terms[0];
  const students = mockStudents.filter(s => s.class === selectedClass);
  const termDates = generateTermDates(currentTerm.startDate, currentTerm.endDate);
  
  const [attendance, setAttendance] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    students.forEach(student => {
      initial[student.id] = {};
      termDates.forEach(date => {
        initial[student.id][date.date] = "P";
      });
    });
    return initial;
  });

  const handleAttendanceChange = (studentId: string, date: string, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [date]: status,
      }
    }));
  };

  const getStats = () => {
    let present = 0, absent = 0, late = 0, excused = 0;
    students.forEach(student => {
      termDates.forEach(date => {
        const status = attendance[student.id]?.[date.date] || "P";
        if (status === "P") present++;
        else if (status === "A") absent++;
        else if (status === "L") late++;
        else if (status === "E") excused++;
      });
    });
    const total = present + absent + late + excused;
    const rate = total > 0 ? ((present + late) / total * 100).toFixed(1) : "0.0";
    return { present, absent, late, excused, rate, total };
  };

  const stats = getStats();

  const getStudentStats = (studentId: string) => {
    let present = 0, absent = 0, late = 0, excused = 0;
    termDates.forEach(date => {
      const status = attendance[studentId]?.[date.date] || "P";
      if (status === "P") present++;
      else if (status === "A") absent++;
      else if (status === "L") late++;
      else if (status === "E") excused++;
    });
    const total = present + absent + late + excused;
    const rate = total > 0 ? ((present + late) / total * 100).toFixed(1) : "0.0";
    return { present, absent, late, excused, rate, total };
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Student Register</h1>
          <p className="text-slate-400 text-sm mt-1">Track and manage student attendance records</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export Register
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-slate-400 text-xs font-medium mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-slate-400 text-xs font-medium mb-2">Term</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {terms.map(term => (
                <option key={term.label} value={term.label}>{term.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setShowStats(!showStats)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                showStats 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : "bg-slate-700 hover:bg-slate-600 text-slate-300"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 20V10" />
                <path d="M12 20V4" />
                <path d="M6 20v-6" />
              </svg>
              {showStats ? "Hide Statistics" : "View Statistics"}
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
            <p className="text-slate-400 text-xs font-medium">Average Attendance</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.rate}%</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
            <p className="text-slate-400 text-xs font-medium">Total Present</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.present}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
            <p className="text-slate-400 text-xs font-medium">Total Absent</p>
            <p className="text-2xl font-bold text-red-400 mt-1">{stats.absent}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
            <p className="text-slate-400 text-xs font-medium">Total Late</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{stats.late}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
            <p className="text-slate-400 text-xs font-medium">Total Excused</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">{stats.excused}</p>
          </div>
        </div>
      )}

      {/* Info Bar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-400 text-sm">
          <span className="font-medium text-white">{students.length}</span> students enrolled in{" "}
          <span className="font-medium text-white">{selectedClass}</span>
        </p>
        <p className="text-slate-400 text-sm">
          <span className="font-medium text-white">{termDates.length}</span> school days in{" "}
          <span className="font-medium text-white">{selectedTerm}</span>
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-emerald-500 rounded"></span>
          <span className="text-slate-400 text-xs">P = Present</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded"></span>
          <span className="text-slate-400 text-xs">A = Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-amber-500 rounded"></span>
          <span className="text-slate-400 text-xs">L = Late</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded"></span>
          <span className="text-slate-400 text-xs">E = Excused</span>
        </div>
      </div>

      {/* Attendance Grid */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-slate-800/80">
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium sticky left-0 bg-slate-800/80 z-10 min-w-[180px]">
                  Student Name
                </th>
                {termDates.map((date) => (
                  <th key={date.date} className="text-center px-1 py-3 text-slate-400 text-xs font-medium min-w-[32px]">
                    <div className="transform -rotate-45 origin-center whitespace-nowrap">{date.day}</div>
                    <div className="text-[9px]">{date.date.slice(8)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t border-slate-700/50 hover:bg-slate-700/20">
                  <td className="px-4 py-2 text-white text-sm font-medium sticky left-0 bg-slate-800/50">
                    {student.name}
                    <span className="text-slate-500 text-xs ml-2">({student.admissionNumber})</span>
                  </td>
                  {termDates.map((date) => {
                    const status = attendance[student.id]?.[date.date] || "P";
                    return (
                      <td key={date.date} className="text-center px-1 py-2">
                        <select
                          value={status}
                          onChange={(e) => handleAttendanceChange(student.id, date.date, e.target.value)}
                          className={`w-8 h-6 text-xs font-medium text-center rounded cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                            status === "P" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                            status === "A" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                            status === "L" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                            "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          }`}
                        >
                          <option value="P">P</option>
                          <option value="A">A</option>
                          <option value="L">L</option>
                          <option value="E">E</option>
                        </select>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Statistics Table */}
      {showStats && (
        <div className="mt-6 bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
          <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
            <h3 className="text-white font-medium">Per-Student Attendance Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium">Student</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium">Present</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium">Absent</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium">Late</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium">Excused</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium">Attendance Rate</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const studentStats = getStudentStats(student.id);
                  return (
                    <tr key={student.id} className="border-t border-slate-700/50">
                      <td className="px-4 py-3 text-white text-sm font-medium">{student.name}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-emerald-400 font-medium">{studentStats.present}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-red-400 font-medium">{studentStats.absent}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-amber-400 font-medium">{studentStats.late}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-blue-400 font-medium">{studentStats.excused}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-medium ${
                          parseFloat(studentStats.rate) >= 90 ? "text-emerald-400" :
                          parseFloat(studentStats.rate) >= 75 ? "text-amber-400" :
                          "text-red-400"
                        }`}>
                          {studentStats.rate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
