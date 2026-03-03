"use client";

import { useState } from "react";

// Types
interface Teacher {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  passportPicture?: string;
}

interface AttendanceRecord {
  id: string;
  teacherId: string;
  date: string;
  status: "present" | "absent" | "late" | "leave";
  remarks?: string;
}

interface DayAttendance {
  date: string;
  dayName: string;
  records: {
    [teacherId: string]: AttendanceRecord;
  };
}

// Mock Data
const mockTeachers: Teacher[] = [
  { id: "T001", name: "Dr. Sarah Johnson", employeeId: "EMP/2021/001", department: "Science" },
  { id: "T002", name: "Mr. Michael Chen", employeeId: "EMP/2021/002", department: "Mathematics" },
  { id: "T003", name: "Mrs. Emily Williams", employeeId: "EMP/2021/003", department: "English" },
  { id: "T004", name: "Mr. David Brown", employeeId: "EMP/2022/001", department: "History" },
  { id: "T005", name: "Mrs. Jessica Davis", employeeId: "EMP/2022/002", department: "Geography" },
  { id: "T006", name: "Mr. Robert Miller", employeeId: "EMP/2022/003", department: "Physics" },
  { id: "T007", name: "Ms. Amanda Wilson", employeeId: "EMP/2023/001", department: "Chemistry" },
  { id: "T008", name: "Mr. James Taylor", employeeId: "EMP/2023/002", department: "Biology" },
];

const departments = ["All Departments", "Science", "Mathematics", "English", "History", "Geography", "Physics", "Chemistry", "Biology"];

const terms = [
  { id: "T1", name: "First Term 2025-2026", startDate: "2025-09-01", endDate: "2025-12-15" },
  { id: "T2", name: "Second Term 2025-2026", startDate: "2026-01-10", endDate: "2026-04-15" },
  { id: "T3", name: "Third Term 2025-2026", startDate: "2026-04-20", endDate: "2026-07-31" },
];

// Helper to get days in a month
function getDaysInMonth(year: number, month: number): { date: string; dayName: string }[] {
  const days: { date: string; dayName: string }[] = [];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    days.push({
      date: `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      dayName: daysOfWeek[date.getDay()],
    });
  }
  
  return days;
}

// Generate mock attendance data
function generateMockAttendance(teachers: Teacher[], days: { date: string; dayName: string }[]): DayAttendance[] {
  const attendanceData: DayAttendance[] = [];
  
  days.forEach((day) => {
    const records: { [teacherId: string]: AttendanceRecord } = {};
    
    teachers.forEach((teacher) => {
      // Skip weekends for attendance
      if (day.dayName === "Sun" || day.dayName === "Sat") {
        return;
      }
      
      // Random attendance status
      const rand = Math.random();
      let status: AttendanceRecord["status"] = "present";
      
      if (rand < 0.05) {
        status = "absent";
      } else if (rand < 0.1) {
        status = "late";
      } else if (rand < 0.15) {
        status = "leave";
      }
      
      records[teacher.id] = {
        id: `ATT-${teacher.id}-${day.date}`,
        teacherId: teacher.id,
        date: day.date,
        status,
        remarks: status === "absent" && Math.random() > 0.5 ? "Sick Leave" : undefined,
      };
    });
    
    attendanceData.push({
      date: day.date,
      dayName: day.dayName,
      records,
    });
  });
  
  return attendanceData;
}

export default function TeachersAttendancePage() {
  const [selectedTerm, setSelectedTerm] = useState(terms[1]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [attendanceData, setAttendanceData] = useState<DayAttendance[]>([]);
  const [loading, setLoading] = useState(false);

  // Filter teachers by department
  const filteredTeachers = selectedDepartment === "All Departments"
    ? mockTeachers
    : mockTeachers.filter((t) => t.department === selectedDepartment);

  // Generate attendance data when filters change
  const days = getDaysInMonth(selectedYear, selectedMonth);
  
  // Calculate statistics
  const calculateStats = () => {
    let present = 0;
    let absent = 0;
    let late = 0;
    let leave = 0;
    let total = 0;
    
    days.forEach((day) => {
      if (day.dayName === "Sun" || day.dayName === "Sat") return;
      
      filteredTeachers.forEach((teacher) => {
        const rand = Math.random();
        total++;
        
        if (rand < 0.05) {
          absent++;
        } else if (rand < 0.1) {
          late++;
        } else if (rand < 0.15) {
          leave++;
        } else {
          present++;
        }
      });
    });
    
    return { present, absent, late, leave, total };
  };

  const stats = calculateStats();

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-700 border-green-200";
      case "absent":
        return "bg-red-100 text-red-700 border-red-200";
      case "late":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "leave":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "absent":
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case "late":
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "leave":
        return (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Generate random status for display
  const getRandomStatus = (teacherId: string, date: string): AttendanceRecord["status"] => {
    const key = `${teacherId}-${date}`;
    const hash = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rand = (hash * 9301 + 49297) % 233280;
    const normalized = rand / 233280;
    
    if (normalized < 0.05) return "absent";
    if (normalized < 0.1) return "late";
    if (normalized < 0.15) return "leave";
    return "present";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Teachers Attendance</h1>
        <p className="text-slate-600 mt-1">Track and manage teacher attendance records</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Term Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Academic Term</label>
            <select
              value={selectedTerm.id}
              onChange={(e) => setSelectedTerm(terms.find((t) => t.id === e.target.value) || terms[0])}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {terms.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.name}
                </option>
              ))}
            </select>
          </div>

          {/* Department Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Month Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Year Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[2024, 2025, 2026].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Present</p>
              <p className="text-xl font-bold text-slate-900">{stats.present}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Absent</p>
              <p className="text-xl font-bold text-slate-900">{stats.absent}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Late</p>
              <p className="text-xl font-bold text-slate-900">{stats.late}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">On Leave</p>
              <p className="text-xl font-bold text-slate-900">{stats.leave}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Register */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Attendance Register - {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ][selectedMonth]} {selectedYear}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {filteredTeachers.length} teachers • {selectedDepartment}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider sticky left-0 bg-slate-50">
                  Teacher
                </th>
                {days.map((day) => (
                  <th
                    key={day.date}
                    className={`px-2 py-3 text-center text-xs font-semibold tracking-wider min-w-[40px] ${
                      day.dayName === "Sun" || day.dayName === "Sat"
                        ? "text-slate-400 bg-slate-100"
                        : "text-slate-600"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span>{day.dayName}</span>
                      <span className="text-[10px]">{day.date.split("-")[2]}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 sticky left-0 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                        {teacher.passportPicture ? (
                          <img
                            src={teacher.passportPicture}
                            alt={teacher.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          teacher.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{teacher.name}</p>
                        <p className="text-xs text-slate-500">{teacher.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  {days.map((day) => {
                    const isWeekend = day.dayName === "Sun" || day.dayName === "Sat";
                    const status = isWeekend ? "weekend" : getRandomStatus(teacher.id, day.date);
                    
                    return (
                      <td key={day.date} className="px-1 py-2 text-center">
                        {isWeekend ? (
                          <span className="text-slate-300">-</span>
                        ) : (
                          <div
                            className={`inline-flex items-center justify-center w-7 h-7 rounded text-xs font-medium ${getStatusColor(
                              status
                            )}`}
                            title={`${teacher.name}: ${status}`}
                          >
                            {getStatusIcon(status)}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
        <span className="font-medium">Legend:</span>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-green-100 text-green-700 flex items-center justify-center">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>Present</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-red-100 text-red-700 flex items-center justify-center">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          <span>Absent</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-yellow-100 text-yellow-700 flex items-center justify-center">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span>Late</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-blue-100 text-blue-700 flex items-center justify-center">
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <span>Leave</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-4 rounded bg-slate-100 text-slate-400 flex items-center justify-center">-</span>
          <span>Weekend</span>
        </div>
      </div>
    </div>
  );
}
