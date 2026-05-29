"use client";

import { useState } from "react";

interface FeedingReceipt {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  mealPlan: string;
  amount: number;
  paymentMethod: string;
  date: string;
}

interface Student {
  id: number;
  name: string;
  class: string;
  mealPlan: string;
  amountDue: number;
  amountPaid: number;
  balance: number;
  status: "Paid" | "Partial" | "Unpaid";
}

interface WeeklySummary {
  week: string;
  period: string;
  totalStudents: number;
  paid: number;
  unpaid: number;
  collectionRate: string;
  amountCollected: string;
  inProgress?: boolean;
}

interface MealPlanDistribution {
  name: string;
  students: number;
  percentage: number;
  color: string;
  barColor: string;
}

interface Transaction {
  id: string;
  student: string;
  class: string;
  mealPlan: string;
  amount: number;
  paymentMethod: string;
  dateTime: string;
  status: "Paid" | "Partial";
}

const initialStudents: Student[] = [
  { id: 1, name: "Kwame Asante", class: "Grade 7A", mealPlan: "Full Day", amountDue: 15.00, amountPaid: 15.00, balance: 0.00, status: "Paid" },
  { id: 2, name: "Abena Mensah", class: "Grade 8B", mealPlan: "Lunch Only", amountDue: 8.00, amountPaid: 0.00, balance: 8.00, status: "Unpaid" },
  { id: 3, name: "Kofi Boateng", class: "Grade 6C", mealPlan: "Full Day", amountDue: 15.00, amountPaid: 10.00, balance: 5.00, status: "Partial" },
  { id: 4, name: "Ama Owusu", class: "Grade 9A", mealPlan: "Breakfast Only", amountDue: 5.00, amountPaid: 5.00, balance: 0.00, status: "Paid" },
  { id: 5, name: "Yaw Darko", class: "Grade 7B", mealPlan: "Full Day", amountDue: 15.00, amountPaid: 15.00, balance: 0.00, status: "Paid" },
  { id: 6, name: "Akosua Frimpong", class: "Grade 8A", mealPlan: "Lunch Only", amountDue: 8.00, amountPaid: 0.00, balance: 8.00, status: "Unpaid" },
  { id: 7, name: "Kwesi Acheampong", class: "Grade 6A", mealPlan: "Full Day", amountDue: 15.00, amountPaid: 15.00, balance: 0.00, status: "Paid" },
  { id: 8, name: "Efua Asiedu", class: "Grade 9B", mealPlan: "Snack Only", amountDue: 3.00, amountPaid: 3.00, balance: 0.00, status: "Paid" },
  { id: 9, name: "Nana Adjei", class: "Grade 7C", mealPlan: "Full Day", amountDue: 15.00, amountPaid: 8.00, balance: 7.00, status: "Partial" },
  { id: 10, name: "Adwoa Amponsah", class: "Grade 8C", mealPlan: "Breakfast Only", amountDue: 5.00, amountPaid: 0.00, balance: 5.00, status: "Unpaid" },
];

const weeklySummary: WeeklySummary[] = [
  { week: "Week 1", period: "Feb 3–7", totalStudents: 1247, paid: 1198, unpaid: 49, collectionRate: "96.1%", amountCollected: "GHS 89,850" },
  { week: "Week 2", period: "Feb 10–14", totalStudents: 1247, paid: 1201, unpaid: 46, collectionRate: "96.3%", amountCollected: "GHS 90,075" },
  { week: "Week 3", period: "Feb 17–21", totalStudents: 1247, paid: 1189, unpaid: 58, collectionRate: "95.3%", amountCollected: "GHS 89,175" },
  { week: "Week 4", period: "Feb 24–28", totalStudents: 1247, paid: 1089, unpaid: 158, collectionRate: "87.3%", amountCollected: "GHS 62,350", inProgress: true },
];

const mealPlans: MealPlanDistribution[] = [
  { name: "Full Day (All Meals)", students: 687, percentage: 55.1, color: "text-blue-400", barColor: "bg-blue-500" },
  { name: "Lunch Only", students: 312, percentage: 25.0, color: "text-emerald-400", barColor: "bg-emerald-500" },
  { name: "Breakfast Only", students: 156, percentage: 12.5, color: "text-amber-400", barColor: "bg-amber-500" },
  { name: "Snack Only", students: 92, percentage: 7.4, color: "text-red-400", barColor: "bg-red-500" },
];

const transactions: Transaction[] = [
  { id: "TXN-2024-001", student: "Kwame Asante", class: "Grade 7A", mealPlan: "Full Day", amount: 15.00, paymentMethod: "Cash", dateTime: "Today 08:15 AM", status: "Paid" },
  { id: "TXN-2024-002", student: "Yaw Darko", class: "Grade 7B", mealPlan: "Full Day", amount: 15.00, paymentMethod: "Mobile Money", dateTime: "Today 08:22 AM", status: "Paid" },
  { id: "TXN-2024-003", student: "Efua Asiedu", class: "Grade 9B", mealPlan: "Snack Only", amount: 3.00, paymentMethod: "Cash", dateTime: "Today 08:30 AM", status: "Paid" },
  { id: "TXN-2024-004", student: "Kwesi Acheampong", class: "Grade 6A", mealPlan: "Full Day", amount: 15.00, paymentMethod: "Card", dateTime: "Today 08:45 AM", status: "Paid" },
  { id: "TXN-2024-005", student: "Ama Owusu", class: "Grade 9A", mealPlan: "Breakfast Only", amount: 5.00, paymentMethod: "Cash", dateTime: "Today 09:00 AM", status: "Paid" },
  { id: "TXN-2024-006", student: "Nana Adjei", class: "Grade 7C", mealPlan: "Full Day", amount: 8.00, paymentMethod: "Mobile Money", dateTime: "Today 09:15 AM", status: "Partial" },
];

const classOptions = [
  "Grade 6A", "Grade 6B", "Grade 6C",
  "Grade 7A", "Grade 7B", "Grade 7C",
  "Grade 8A", "Grade 8B", "Grade 8C",
  "Grade 9A", "Grade 9B", "Grade 9C",
];

const mealPlanOptions = ["Full Day", "Lunch Only", "Breakfast Only", "Snack Only"];

function getStatusBadge(status: string): string {
  if (status === "Paid") return "badge badge-green";
  if (status === "Partial") return "badge badge-yellow";
  if (status === "Unpaid") return "badge badge-red";
  return "badge badge-blue";
}

function getPaymentMethodColor(method: string): string {
  if (method === "Cash") return "text-emerald-400";
  if (method === "Mobile Money") return "text-purple-400";
  if (method === "Card") return "text-blue-400";
  return "text-slate-400";
}

export default function FeedingPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<FeedingReceipt | null>(null);
  const [receiptNumber, setReceiptNumber] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Add Student Form State
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentClass, setNewStudentClass] = useState("Grade 6A");
  const [newStudentMealPlan, setNewStudentMealPlan] = useState("Full Day");

  // Get unique classes from students
  const classes = ["All", ...Array.from(new Set(students.map(s => s.class)))].sort();

  // Filter students by class and search query
  const filteredStudents = students.filter(student => {
    const matchesClass = selectedClass === "All" || student.class === selectedClass;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // Get meal plan price
  const getMealPlanPrice = (plan: string): number => {
    switch (plan) {
      case "Full Day": return 15.00;
      case "Lunch Only": return 8.00;
      case "Breakfast Only": return 5.00;
      case "Snack Only": return 3.00;
      default: return 0;
    }
  };

  const printFeedingReceipt = (student: Student) => {
    const defaultReceiptId = `FD-${student.id}-${new Date().toISOString().split("T")[0].replace(/-/g, "")}`;
    setReceiptNumber(defaultReceiptId);
    const receipt: FeedingReceipt = {
      id: defaultReceiptId,
      studentName: student.name,
      studentId: `STU-${String(student.id).padStart(3, "0")}`,
      class: student.class,
      mealPlan: student.mealPlan,
      amount: student.amountPaid,
      paymentMethod: "Cash",
      date: new Date().toISOString().split("T")[0],
    };
    setReceiptData(receipt);
    setShowReceipt(true);
  };

  const handleAddStudent = () => {
    if (!newStudentName.trim()) return;
    
    const newStudent: Student = {
      id: students.length + 1,
      name: newStudentName,
      class: newStudentClass,
      mealPlan: newStudentMealPlan,
      amountDue: getMealPlanPrice(newStudentMealPlan),
      amountPaid: 0,
      balance: getMealPlanPrice(newStudentMealPlan),
      status: "Unpaid",
    };
    
    setStudents([...students, newStudent]);
    setNewStudentName("");
    setNewStudentClass("Grade 6A");
    setNewStudentMealPlan("Full Day");
    setShowAddStudent(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Daily Feeding Fees</h1>
          <p className="text-slate-400 text-sm mt-1">Track and manage daily meal fees for all students</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Report
          </button>
          <button className="btn-secondary" onClick={() => setShowAddStudent(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            Add Student
          </button>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Record Payment
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Total Enrolled</p>
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{students.length}</p>
          <p className="text-slate-500 text-xs mt-1">Students in programme</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Paid Today</p>
            <span className="badge badge-green text-xs">Today</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{students.filter(s => s.status === "Paid").length}</p>
          <p className="text-slate-500 text-xs mt-1">Students paid</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Unpaid Today</p>
            <span className="badge badge-red text-xs">Pending</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{students.filter(s => s.status === "Unpaid").length}</p>
          <p className="text-slate-500 text-xs mt-1">Students unpaid</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Monthly Revenue</p>
            <span className="badge badge-blue text-xs">Feb 2024</span>
          </div>
          <p className="text-2xl font-bold text-blue-400">GHS {students.reduce((sum, s) => sum + s.amountPaid, 0).toFixed(2)}</p>
          <p className="text-slate-500 text-xs mt-1">Current week</p>
        </div>
      </div>

      {/* Daily Fee Rate Card */}
      <div className="page-card px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-semibold">Daily Fee Rates</h2>
            <p className="text-slate-500 text-xs mt-0.5">Current meal plan pricing</p>
          </div>
          <button className="btn-secondary text-xs px-3 py-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Rates
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { meal: "Breakfast", price: "GHS 5.00", icon: "🌅", color: "bg-amber-500/10 border-amber-500/20", textColor: "text-amber-400" },
            { meal: "Lunch", price: "GHS 8.00", icon: "☀️", color: "bg-blue-500/10 border-blue-500/20", textColor: "text-blue-400" },
            { meal: "Snack", price: "GHS 3.00", icon: "🍎", color: "bg-emerald-500/10 border-emerald-500/20", textColor: "text-emerald-400" },
            { meal: "Full Day (All Meals)", price: "GHS 15.00", icon: "🍽️", color: "bg-purple-500/10 border-purple-500/20", textColor: "text-purple-400" },
          ].map((item) => (
            <div key={item.meal} className={`rounded-lg border p-4 ${item.color}`}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-slate-300 text-sm font-medium">{item.meal}</p>
              <p className={`text-xl font-bold mt-1 ${item.textColor}`}>{item.price}</p>
              <p className="text-slate-500 text-xs mt-0.5">per student / day</p>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Payment Status Table */}
      <div className="page-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h2 className="text-white font-semibold">Today&apos;s Feeding Fee Status</h2>
            <p className="text-slate-500 text-xs mt-0.5">Daily payment tracking for all enrolled students</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input w-48"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Meal Plan</th>
                <th>Amount Due</th>
                <th>Amount Paid</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300 flex-shrink-0">
                        {student.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <p className="text-white font-medium text-sm">{student.name}</p>
                    </div>
                  </td>
                  <td className="text-slate-400 text-sm">{student.class}</td>
                  <td>
                    <span className="text-slate-300 text-sm">{student.mealPlan}</span>
                  </td>
                  <td className="text-white font-medium">GHS {student.amountDue.toFixed(2)}</td>
                  <td className="text-emerald-400">GHS {student.amountPaid.toFixed(2)}</td>
                  <td className={student.balance > 0 ? "text-red-400 font-medium" : "text-slate-500"}>
                    GHS {student.balance.toFixed(2)}
                  </td>
                  <td>
                    <span className={getStatusBadge(student.status)}>{student.status}</span>
                  </td>
                  <td>
                    {student.status === "Paid" ? (
                      <button
                        className="text-xs text-slate-400 hover:text-blue-400 transition-colors border border-slate-700 hover:border-blue-500/50 rounded px-2 py-1"
                        onClick={() => printFeedingReceipt(student)}
                      >
                        Receipt
                      </button>
                    ) : (
                      <button className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors border border-emerald-500/30 hover:border-emerald-400/60 rounded px-2 py-1">
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
          <p className="text-slate-500 text-sm">Showing {filteredStudents.length} of {students.length} enrolled students</p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary px-3 py-1.5 text-xs">Previous</button>
            <button className="btn-primary px-3 py-1.5 text-xs">Next</button>
          </div>
        </div>
      </div>

      {/* Monthly Summary + Meal Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Collection Summary */}
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Monthly Collection Summary</h2>
            <p className="text-slate-500 text-xs mt-0.5">February 2024 weekly breakdown</p>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Unpaid</th>
                  <th>Rate</th>
                  <th>Collected</th>
                </tr>
              </thead>
              <tbody>
                {weeklySummary.map((week) => (
                  <tr key={week.week} className={week.inProgress ? "bg-blue-500/5" : ""}>
                    <td>
                      <div>
                        <p className="text-white font-medium text-sm">{week.week}</p>
                        <p className="text-slate-500 text-xs">{week.period}</p>
                      </div>
                    </td>
                    <td className="text-slate-400 text-sm">{week.totalStudents.toLocaleString()}</td>
                    <td className="text-emerald-400 font-medium">{week.paid.toLocaleString()}</td>
                    <td className="text-red-400">{week.unpaid}</td>
                    <td>
                      <span className={`text-sm font-medium ${
                        parseFloat(week.collectionRate) >= 95 ? "text-emerald-400" :
                        parseFloat(week.collectionRate) >= 90 ? "text-amber-400" : "text-red-400"
                      }`}>
                        {week.collectionRate}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <span className="text-blue-400 font-medium text-sm">{week.amountCollected}</span>
                        {week.inProgress && (
                          <span className="badge badge-blue text-xs ml-1">Live</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Meal Plan Distribution */}
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Meal Plan Distribution</h2>
            <p className="text-slate-500 text-xs mt-0.5">Student enrollment by meal plan type</p>
          </div>
          <div className="px-6 py-4 space-y-5">
            {mealPlans.map((plan) => (
              <div key={plan.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-300 text-sm font-medium">{plan.name}</p>
                    <span className="badge badge-blue text-xs">{plan.students.toLocaleString()} students</span>
                  </div>
                  <span className={`text-sm font-semibold ${plan.color}`}>{plan.percentage}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5">
                  <div
                    className={`${plan.barColor} h-2.5 rounded-full transition-all`}
                    style={{ width: `${plan.percentage}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <p className="text-slate-400 text-sm">Total Enrolled</p>
                <p className="text-white font-semibold">{students.length} students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="page-card">
        <div className="px-6 py-4 border-b border-slate-800">
          <h2 className="text-white font-semibold">Recent Transactions</h2>
          <p className="text-slate-500 text-xs mt-0.5">Latest feeding fee payments recorded today</p>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Student</th>
                <th>Class</th>
                <th>Meal Plan</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Date / Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>
                    <span className="text-slate-400 text-xs font-mono">{txn.id}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300 flex-shrink-0">
                        {txn.student.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <p className="text-white font-medium text-sm">{txn.student}</p>
                    </div>
                  </td>
                  <td className="text-slate-400 text-sm">{txn.class}</td>
                  <td className="text-slate-300 text-sm">{txn.mealPlan}</td>
                  <td className="text-emerald-400 font-medium">GHS {txn.amount.toFixed(2)}</td>
                  <td>
                    <span className={`text-sm font-medium ${getPaymentMethodColor(txn.paymentMethod)}`}>
                      {txn.paymentMethod}
                    </span>
                  </td>
                  <td className="text-slate-400 text-sm">{txn.dateTime}</td>
                  <td>
                    <span className={getStatusBadge(txn.status)}>{txn.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
          <p className="text-slate-500 text-sm">Showing 6 of today&apos;s transactions</p>
          <button className="btn-secondary text-xs px-3 py-1.5">View All Transactions</button>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                <h3 className="text-white font-semibold">Add New Student</h3>
              </div>
              <button
                onClick={() => setShowAddStudent(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Student Name</label>
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Enter student full name"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">Class</label>
                <select
                  value={newStudentClass}
                  onChange={(e) => setNewStudentClass(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 text-sm mb-2">Meal Plan</label>
                <select
                  value={newStudentMealPlan}
                  onChange={(e) => setNewStudentMealPlan(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  {mealPlanOptions.map((plan) => (
                    <option key={plan} value={plan}>{plan} - GHS {getMealPlanPrice(plan).toFixed(2)}</option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Daily Fee Amount:</span>
                  <span className="text-emerald-400 font-bold text-lg">GHS {getMealPlanPrice(newStudentMealPlan).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 bg-slate-800/50 flex gap-3">
              <button
                onClick={handleAddStudent}
                className="flex-1 btn-primary justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                Add Student
              </button>
              <button
                onClick={() => setShowAddStudent(false)}
                className="flex-1 btn-secondary justify-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && receiptData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                <h3 className="text-white font-semibold">Feeding Fee Receipt</h3>
              </div>
              <button
                onClick={() => setShowReceipt(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Receipt Content */}
            <div className="p-6 space-y-4">
              {/* School Header */}
              <div className="text-center border-b border-slate-700 pb-4">
                <h2 className="text-white font-bold text-lg">Clipe233 Edu School</h2>
                <p className="text-slate-400 text-xs">123 Education Street, Accra, Ghana</p>
                <p className="text-slate-400 text-xs">Daily Feeding Programme</p>
              </div>

              {/* Receipt Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Receipt No:</span>
                  <input
                    type="text"
                    value={receiptNumber}
                    onChange={(e) => setReceiptNumber(e.target.value)}
                    className="bg-slate-800 border border-slate-600 rounded px-3 py-1.5 text-white font-mono text-sm text-right w-48 focus:outline-none focus:border-emerald-500"
                    placeholder="Enter receipt number"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Date:</span>
                  <span className="text-white text-sm">{receiptData.date}</span>
                </div>
                <div className="border-t border-slate-700 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Student Name:</span>
                    <span className="text-white text-sm font-medium">{receiptData.studentName}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Student ID:</span>
                  <span className="text-white text-sm font-mono">{receiptData.studentId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Class:</span>
                  <span className="text-white text-sm">{receiptData.class}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Meal Plan:</span>
                  <span className="text-emerald-400 text-sm">{receiptData.mealPlan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Payment Method:</span>
                  <span className="text-emerald-400 text-sm">{receiptData.paymentMethod}</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-slate-800 rounded-lg p-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Amount Paid:</span>
                  <span className="text-emerald-400 font-bold text-xl">GHS {receiptData.amount.toFixed(2)}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-slate-700">
                <p className="text-slate-500 text-xs">Thank you for your payment!</p>
                <p className="text-slate-600 text-xs mt-1">Please keep this receipt for your records.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 bg-slate-800/50 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 btn-primary justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                Print Receipt
              </button>
              <button
                onClick={() => setShowReceipt(false)}
                className="flex-1 btn-secondary justify-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
