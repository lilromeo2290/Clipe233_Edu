"use client";

import { useState } from "react";

interface ReceiptData {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  amount: number;
  paymentMethod: string;
  date: string;
  term: string;
}

// Data type definitions
type FeeRecord = {
  id: string;
  studentId: string;
  name: string;
  class: string;
  term: string;
  amount: number;
  paid: number;
  balance: number;
  dueDate: string;
  status: string;
};

type FeedingRecord = {
  id: string;
  studentId: string;
  name: string;
  class: string;
  dailyRate: number;
  daysEnrolled: number;
  daysAttended: number;
  amountDue: number;
  paid: number;
  balance: number;
  status: string;
};

// Fee Type definition interface
interface FeeType {
  id: string;
  name: string;
  key: string; // used as property name
  defaultAmount: number;
}

// Default fee types
const defaultFeeTypes: FeeType[] = [
  { id: "1", name: "Tuition Fee", key: "tuitionFee", defaultAmount: 800 },
  { id: "2", name: "Registration Fee", key: "registrationFee", defaultAmount: 100 },
  { id: "3", name: "Books Fee", key: "booksFee", defaultAmount: 150 },
  { id: "4", name: "Uniform Fee", key: "uniformFee", defaultAmount: 100 },
  { id: "5", name: "Lab Fee", key: "labFee", defaultAmount: 50 },
  { id: "6", name: "Sports Fee", key: "sportsFee", defaultAmount: 30 },
  { id: "7", name: "Technology Fee", key: "technologyFee", defaultAmount: 40 },
  { id: "8", name: "Transport Fee", key: "transportFee", defaultAmount: 0 },
  { id: "9", name: "Development Fee", key: "developmentFee", defaultAmount: 25 },
  { id: "10", name: "Other Fees", key: "otherFees", defaultAmount: 50 },
];

// Fee Configuration type
interface FeeConfig {
  id: string;
  className: string;
  fees: Record<string, number>; // Dynamic fee amounts by fee type key
  dueDate: string;
  term: string;
  academicYear: string;
}

// Default fee configurations by class
const defaultFeeConfigs: FeeConfig[] = [
  { id: "1", className: "Grade 9", fees: { tuitionFee: 800, registrationFee: 100, booksFee: 150, uniformFee: 100, labFee: 50, sportsFee: 30, technologyFee: 40, transportFee: 0, developmentFee: 25, otherFees: 50 }, dueDate: "2026-02-15", term: "First Term", academicYear: "2025-2026" },
  { id: "2", className: "Grade 10", fees: { tuitionFee: 900, registrationFee: 100, booksFee: 200, uniformFee: 100, labFee: 50, sportsFee: 30, technologyFee: 40, transportFee: 0, developmentFee: 25, otherFees: 50 }, dueDate: "2026-02-15", term: "First Term", academicYear: "2025-2026" },
  { id: "3", className: "Grade 11", fees: { tuitionFee: 1000, registrationFee: 100, booksFee: 250, uniformFee: 100, labFee: 75, sportsFee: 30, technologyFee: 40, transportFee: 0, developmentFee: 25, otherFees: 50 }, dueDate: "2026-02-15", term: "First Term", academicYear: "2025-2026" },
  { id: "4", className: "Grade 12", fees: { tuitionFee: 1200, registrationFee: 100, booksFee: 300, uniformFee: 100, labFee: 75, sportsFee: 30, technologyFee: 40, transportFee: 0, developmentFee: 25, otherFees: 50 }, dueDate: "2026-02-15", term: "First Term", academicYear: "2025-2026" },
];

export default function FeesPage() {
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [receiptNumber, setReceiptNumber] = useState("");
  
  // Data arrays - defined before state that uses them
  const feedingRecords: FeedingRecord[] = [
    { id: "FD-001", studentId: "STU-001", name: "Emma Johnson", class: "Grade 10-A", dailyRate: 5, daysEnrolled: 20, daysAttended: 20, amountDue: 100, paid: 100, balance: 0, status: "Paid" },
    { id: "FD-002", studentId: "STU-002", name: "Liam Williams", class: "Grade 11-B", dailyRate: 5, daysEnrolled: 20, daysAttended: 18, amountDue: 100, paid: 50, balance: 50, status: "Partial" },
    { id: "FD-003", studentId: "STU-003", name: "Olivia Brown", class: "Grade 9-C", dailyRate: 5, daysEnrolled: 20, daysAttended: 20, amountDue: 100, paid: 100, balance: 0, status: "Paid" },
    { id: "FD-004", studentId: "STU-004", name: "Noah Davis", class: "Grade 12-A", dailyRate: 5, daysEnrolled: 20, daysAttended: 15, amountDue: 100, paid: 0, balance: 100, status: "Overdue" },
    { id: "FD-005", studentId: "STU-005", name: "Ava Martinez", class: "Grade 10-B", dailyRate: 5, daysEnrolled: 20, daysAttended: 20, amountDue: 100, paid: 100, balance: 0, status: "Paid" },
    { id: "FD-006", studentId: "STU-006", name: "Ethan Wilson", class: "Grade 11-A", dailyRate: 5, daysEnrolled: 20, daysAttended: 19, amountDue: 100, paid: 60, balance: 40, status: "Partial" },
    { id: "FD-007", studentId: "STU-007", name: "Sophia Anderson", class: "Grade 9-A", dailyRate: 5, daysEnrolled: 20, daysAttended: 20, amountDue: 100, paid: 100, balance: 0, status: "Paid" },
    { id: "FD-008", studentId: "STU-008", name: "Mason Taylor", class: "Grade 12-B", dailyRate: 5, daysEnrolled: 20, daysAttended: 12, amountDue: 100, paid: 0, balance: 100, status: "Overdue" },
  ];

  const totalFeedingExpected = feedingRecords.reduce((sum, r) => sum + r.amountDue, 0);
  const totalFeedingCollected = feedingRecords.reduce((sum, r) => sum + r.paid, 0);
  const totalFeedingOutstanding = feedingRecords.reduce((sum, r) => sum + r.balance, 0);

  const feeRecords: FeeRecord[] = [
    { id: "FEE-001", studentId: "STU-001", name: "Emma Johnson", class: "Grade 10-A", term: "Term 1 2024", amount: 1500, paid: 1500, balance: 0, dueDate: "2024-02-15", status: "Paid" },
    { id: "FEE-002", studentId: "STU-002", name: "Liam Williams", class: "Grade 11-B", term: "Term 1 2024", amount: 1500, paid: 750, balance: 750, dueDate: "2024-02-15", status: "Partial" },
    { id: "FEE-003", studentId: "STU-003", name: "Olivia Brown", class: "Grade 9-C", term: "Term 1 2024", amount: 1200, paid: 1200, balance: 0, dueDate: "2024-02-15", status: "Paid" },
    { id: "FEE-004", studentId: "STU-004", name: "Noah Davis", class: "Grade 12-A", term: "Term 1 2024", amount: 1800, paid: 0, balance: 1800, dueDate: "2024-02-15", status: "Overdue" },
    { id: "FEE-005", studentId: "STU-005", name: "Ava Martinez", class: "Grade 10-B", term: "Term 1 2024", amount: 1500, paid: 1500, balance: 0, dueDate: "2024-02-15", status: "Paid" },
    { id: "FEE-006", studentId: "STU-006", name: "Ethan Wilson", class: "Grade 11-A", term: "Term 1 2024", amount: 1500, paid: 500, balance: 1000, dueDate: "2024-02-15", status: "Partial" },
    { id: "FEE-007", studentId: "STU-007", name: "Sophia Anderson", class: "Grade 9-A", term: "Term 1 2024", amount: 1200, paid: 1200, balance: 0, dueDate: "2024-03-01", status: "Paid" },
    { id: "FEE-008", studentId: "STU-008", name: "Mason Taylor", class: "Grade 12-B", term: "Term 1 2024", amount: 1800, paid: 0, balance: 1800, dueDate: "2024-02-15", status: "Overdue" },
    { id: "FEE-009", studentId: "STU-009", name: "Isabella Thomas", class: "Grade 10-C", term: "Term 1 2024", amount: 1500, paid: 1500, balance: 0, dueDate: "2024-03-01", status: "Paid" },
    { id: "FEE-010", studentId: "STU-010", name: "James Jackson", class: "Grade 11-C", term: "Term 1 2024", amount: 1500, paid: 0, balance: 1500, dueDate: "2024-03-15", status: "Pending" },
  ];

  // Payment modal state - using a union type to support both fee and feeding records
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | FeedingRecord | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Student search for payment modal
  const [studentSearch, setStudentSearch] = useState("");
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  
  // Class filter for fee records
  const [classFilter, setClassFilter] = useState("All");
  
  // Get unique classes from fee records
  const classes = ["All", ...new Set(feeRecords.map(r => r.class))];
  
  // Filter fee records by class
  const filteredFeeRecords = classFilter === "All" 
    ? feeRecords 
    : feeRecords.filter(r => r.class === classFilter);
  
  // Fee Configuration state
  const [feeConfigs, setFeeConfigs] = useState<FeeConfig[]>(defaultFeeConfigs);
  const [feeTypes, setFeeTypes] = useState<FeeType[]>(defaultFeeTypes);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showFeeTypesModal, setShowFeeTypesModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState<FeeConfig | null>(null);
  const [newConfig, setNewConfig] = useState<{ className: string; fees: Record<string, number>; dueDate: string; term: string; academicYear: string }>({
    className: "",
    fees: {},
    dueDate: "",
    term: "First Term",
    academicYear: "2025-2026"
  });
  const [newFeeType, setNewFeeType] = useState({ name: "", defaultAmount: 0 });
  const [editingFeeType, setEditingFeeType] = useState<FeeType | null>(null);
  const [editFeeTypeValue, setEditFeeTypeValue] = useState({ name: "", defaultAmount: 0 });
  
  // Inline editing state for fee amounts in the table
  const [editingCell, setEditingCell] = useState<{ configId: string; feeKey: string } | null>(null);
  const [cellEditValue, setCellEditValue] = useState("");
  
  // Calculate outstanding balance based on payment amount
  const calculateOutstanding = (): number => {
    if (!selectedRecord) return 0;
    const paid = parseFloat(paymentAmount) || 0;
    const totalDue = 'amount' in selectedRecord ? selectedRecord.amount : selectedRecord.amountDue;
    return Math.max(0, totalDue - selectedRecord.paid - paid);
  };

  // Fee Configuration handlers
  const handleAddConfig = () => {
    if (!newConfig.className || !newConfig.dueDate) return;
    // Build fees object from feeTypes, using values from newConfig or defaults
    const fees: Record<string, number> = {};
    feeTypes.forEach(ft => {
      fees[ft.key] = newConfig.fees[ft.key] || ft.defaultAmount;
    });
    const config: FeeConfig = {
      id: Date.now().toString(),
      className: newConfig.className,
      fees,
      dueDate: newConfig.dueDate,
      term: newConfig.term || "First Term",
      academicYear: newConfig.academicYear || "2025-2026"
    };
    setFeeConfigs([...feeConfigs, config]);
    setNewConfig({
      className: "",
      fees: {},
      dueDate: "",
      term: "First Term",
      academicYear: "2025-2026"
    });
    setShowConfigModal(false);
  };

  const handleEditConfig = (config: FeeConfig) => {
    setEditingConfig(config);
    setNewConfig({
      className: config.className,
      fees: { ...config.fees },
      dueDate: config.dueDate,
      term: config.term,
      academicYear: config.academicYear
    });
    setShowConfigModal(true);
  };

  const handleUpdateConfig = () => {
    if (!editingConfig || !newConfig.className || !newConfig.dueDate) return;
    // Build updated fees object from feeTypes
    const fees: Record<string, number> = {};
    feeTypes.forEach(ft => {
      fees[ft.key] = newConfig.fees[ft.key] || 0;
    });
    setFeeConfigs(feeConfigs.map(c =>
      c.id === editingConfig.id
        ? {
            ...c,
            className: newConfig.className,
            fees,
            dueDate: newConfig.dueDate,
            term: newConfig.term || "First Term",
            academicYear: newConfig.academicYear || "2025-2026"
          }
        : c
    ));
    setEditingConfig(null);
    setNewConfig({
      className: "",
      fees: {},
      dueDate: "",
      term: "First Term",
      academicYear: "2025-2026"
    });
    setShowConfigModal(false);
  };

  const handleDeleteConfig = (id: string) => {
    if (confirm('Are you sure you want to delete this fee structure? This action cannot be undone.')) {
      setFeeConfigs(feeConfigs.filter(c => c.id !== id));
    }
  };

  // Fee Type management handlers
  const handleAddFeeType = () => {
    if (!newFeeType.name.trim()) return;
    const key = newFeeType.name.toLowerCase().replace(/\s+/g, '') + Date.now().toString();
    const feeType: FeeType = {
      id: Date.now().toString(),
      name: newFeeType.name,
      key,
      defaultAmount: newFeeType.defaultAmount
    };
    setFeeTypes([...feeTypes, feeType]);
    setNewFeeType({ name: "", defaultAmount: 0 });
  };

  const handleDeleteFeeType = (id: string) => {
    if (confirm('Are you sure you want to delete this fee type? It will be removed from all fee structures.')) {
      const feeTypeToDelete = feeTypes.find(ft => ft.id === id);
      if (feeTypeToDelete) {
        setFeeTypes(feeTypes.filter(ft => ft.id !== id));
        // Also remove from existing configs
        setFeeConfigs(feeConfigs.map(config => {
          const newFees = { ...config.fees };
          delete newFees[feeTypeToDelete.key];
          return { ...config, fees: newFees };
        }));
      }
    }
  };

  const handleEditFeeTypeClick = (feeType: FeeType) => {
    setEditingFeeType(feeType);
    setEditFeeTypeValue({ name: feeType.name, defaultAmount: feeType.defaultAmount });
  };

  const handleSaveFeeTypeEdit = () => {
    if (!editingFeeType || !editFeeTypeValue.name.trim()) return;
    
    const oldKey = editingFeeType.key;
    const newKey = editFeeTypeValue.name.toLowerCase().replace(/\s+/g, '') + editingFeeType.id;
    
    setFeeTypes(feeTypes.map(ft => 
      ft.id === editingFeeType.id 
        ? { ...ft, name: editFeeTypeValue.name, key: newKey, defaultAmount: editFeeTypeValue.defaultAmount }
        : ft
    ));
    
    // Also update in existing configs if key changed
    if (oldKey !== newKey) {
      setFeeConfigs(feeConfigs.map(config => {
        const newFees = { ...config.fees };
        if (newFees[oldKey] !== undefined) {
          newFees[newKey] = newFees[oldKey];
          delete newFees[oldKey];
        }
        return { ...config, fees: newFees };
      }));
    }
    
    setEditingFeeType(null);
    setEditFeeTypeValue({ name: "", defaultAmount: 0 });
  };

  const handleCancelFeeTypeEdit = () => {
    setEditingFeeType(null);
    setEditFeeTypeValue({ name: "", defaultAmount: 0 });
  };

  // Inline edit handlers for fee amounts in table
  const handleStartCellEdit = (configId: string, feeKey: string, currentValue: number) => {
    setEditingCell({ configId, feeKey });
    setCellEditValue(currentValue.toString());
  };

  const handleSaveCellEdit = () => {
    if (!editingCell) return;
    const newValue = parseFloat(cellEditValue) || 0;
    setFeeConfigs(feeConfigs.map(config => {
      if (config.id === editingCell.configId) {
        return {
          ...config,
          fees: { ...config.fees, [editingCell.feeKey]: newValue }
        };
      }
      return config;
    }));
    setEditingCell(null);
    setCellEditValue("");
  };

  const handleCancelCellEdit = () => {
    setEditingCell(null);
    setCellEditValue("");
  };

  // Combine all students from feeRecords and feedingRecords for search
  const allStudents: (FeeRecord | FeedingRecord)[] = [...new Map([...feeRecords, ...feedingRecords].map(s => [s.studentId, s])).values()];
  const filteredStudents = studentSearch.length > 0 
    ? allStudents.filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase())) 
    : [];

  const recentPayments = [
    { student: "Emma Johnson", amount: 1500, date: "2024-02-10", method: "Bank Transfer", receipt: "RCP-0041" },
    { student: "Olivia Brown", amount: 1200, date: "2024-02-09", method: "Cash", receipt: "RCP-0040" },
    { student: "Sophia Anderson", amount: 1200, date: "2024-02-08", method: "Online", receipt: "RCP-0039" },
    { student: "Ava Martinez", amount: 1500, date: "2024-02-07", method: "Bank Transfer", receipt: "RCP-0038" },
    { student: "Isabella Thomas", amount: 1500, date: "2024-02-06", method: "Cash", receipt: "RCP-0037" },
  ];

  const statusColor = (status: string) => {
    if (status === "Paid") return "badge-green";
    if (status === "Partial") return "badge-yellow";
    if (status === "Overdue") return "badge-red";
    return "badge-blue";
  };

  const methodColor = (method: string) => {
    if (method === "Bank Transfer") return "text-blue-400";
    if (method === "Cash") return "text-emerald-400";
    return "text-purple-400";
  };

  const printReceipt = (record: typeof feeRecords[0]) => {
    const defaultReceiptId = `RCP-${record.studentId}-${record.term.replace(/\s/g, "")}`;
    setReceiptNumber(defaultReceiptId);
    const receipt: ReceiptData = {
      id: defaultReceiptId,
      studentName: record.name,
      studentId: record.studentId,
      class: record.class,
      amount: record.paid,
      paymentMethod: "Bank Transfer",
      date: new Date().toISOString().split("T")[0],
      term: record.term,
    };
    setReceiptData(receipt);
    setShowReceipt(true);
  };

  const totalCollected = feeRecords.reduce((sum, r) => sum + r.paid, 0);
  const totalOutstanding = feeRecords.reduce((sum, r) => sum + r.balance, 0);
  const totalExpected = feeRecords.reduce((sum, r) => sum + r.amount, 0);
  const collectionRate = Math.round((totalCollected / totalExpected) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">School Fees</h1>
          <p className="text-slate-400 text-sm mt-1">Track and manage student fee payments</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
          <button className="btn-primary" onClick={() => {
            const overdueRecord = feeRecords.find(r => r.balance > 0);
            if (overdueRecord) {
              setSelectedRecord(overdueRecord);
              setStudentSearch(overdueRecord.name);
              setPaymentAmount(overdueRecord.balance.toString());
              setShowPaymentModal(true);
            }
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Record Payment
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Total Expected</p>
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">${totalExpected.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">Term 1 2024</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Collected</p>
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-400">${totalCollected.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{collectionRate}% collection rate</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Outstanding</p>
            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-amber-400">${totalOutstanding.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{feeRecords.filter(r => r.balance > 0).length} students pending</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Overdue</p>
            <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-red-400">{feeRecords.filter(r => r.status === "Overdue").length}</p>
          <p className="text-slate-500 text-xs mt-1">Overdue accounts</p>
        </div>
      </div>

      {/* Collection Progress */}
      <div className="page-card px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Collection Progress — Term 1 2024</h2>
          <span className="text-slate-400 text-sm">{collectionRate}% collected</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-blue-600 to-emerald-500 h-3 rounded-full transition-all"
            style={{ width: `${collectionRate}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-emerald-400 font-semibold">{feeRecords.filter(r => r.status === "Paid").length}</p>
            <p className="text-slate-500 text-xs mt-0.5">Fully Paid</p>
          </div>
          <div>
            <p className="text-amber-400 font-semibold">{feeRecords.filter(r => r.status === "Partial").length}</p>
            <p className="text-slate-500 text-xs mt-0.5">Partial</p>
          </div>
          <div>
            <p className="text-red-400 font-semibold">{feeRecords.filter(r => r.status === "Overdue" || r.status === "Pending").length}</p>
            <p className="text-slate-500 text-xs mt-0.5">Unpaid / Overdue</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fee Records Table */}
        <div className="lg:col-span-2 page-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Fee Records</h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search student..."
                className="search-input w-48"
              />
              <select 
                className="search-input text-sm pr-8"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              >
                {classes.map(c => (
                  <option key={c} value={c}>{c === "All" ? "All Classes" : c}</option>
                ))}
              </select>
              <select className="search-input text-sm pr-8">
                <option>All Status</option>
                <option>Paid</option>
                <option>Partial</option>
                <option>Overdue</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Amount</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeeRecords.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300 flex-shrink-0">
                          {r.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{r.name}</p>
                          <p className="text-slate-500 text-xs font-mono">{r.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-slate-400 text-sm">{r.class}</td>
                    <td className="text-white font-medium">${r.amount.toLocaleString()}</td>
                    <td className="text-emerald-400">${r.paid.toLocaleString()}</td>
                    <td className={r.balance > 0 ? "text-red-400 font-medium" : "text-slate-500"}>
                      ${r.balance.toLocaleString()}
                    </td>
                    <td className="text-slate-400 text-sm">{r.dueDate}</td>
                    <td>
                      <span className={`badge ${statusColor(r.status)}`}>{r.status}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          className="text-slate-400 hover:text-blue-400 transition-colors"
                          title="View Receipt"
                          onClick={() => printReceipt(r)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                          </svg>
                        </button>
                        <button 
                          className="text-slate-400 hover:text-emerald-400 transition-colors" 
                          title="Record Payment"
                          onClick={() => {
                            setSelectedRecord(r);
                            setStudentSearch(r.name);
                            setPaymentAmount(r.balance > 0 ? r.balance.toString() : "");
                            setShowPaymentModal(true);
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                        </button>
                        <button className="text-slate-400 hover:text-amber-400 transition-colors" title="Send Reminder">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
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
            <p className="text-slate-500 text-sm">Showing 10 of 1,248 records</p>
            <div className="flex items-center gap-2">
              <button className="btn-secondary px-3 py-1.5 text-xs">Previous</button>
              <button className="btn-primary px-3 py-1.5 text-xs">Next</button>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="page-card">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white font-semibold">Recent Payments</h2>
            <p className="text-slate-500 text-xs mt-0.5">Last 5 transactions</p>
          </div>
          <div className="divide-y divide-slate-800">
            {recentPayments.map((p, i) => (
              <div key={i} className="px-6 py-4">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300 flex-shrink-0">
                      {p.student.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <p className="text-white text-sm font-medium">{p.student}</p>
                  </div>
                  <p className="text-emerald-400 font-semibold text-sm">${p.amount.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between ml-9">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${methodColor(p.method)}`}>{p.method}</span>
                    <span className="text-slate-600 text-xs">·</span>
                    <span className="text-slate-500 text-xs">{p.date}</span>
                  </div>
                  <span className="text-slate-600 text-xs font-mono">{p.receipt}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-slate-800">
            <button className="w-full btn-secondary text-sm justify-center">
              View All Transactions
            </button>
          </div>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="page-card">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold">Fee Structure</h2>
            <p className="text-slate-500 text-xs mt-0.5">Configure fee breakdown by class/grade level</p>
          </div>
          <button 
            className="btn-primary text-sm"
            onClick={() => {
              setEditingConfig(null);
              setNewConfig({
                className: "",
                fees: {},
                dueDate: "",
                term: "First Term",
                academicYear: "2025-2026"
              });
              setShowConfigModal(true);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Class
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                {feeTypes.map(ft => (
                  <th key={ft.id}>{ft.name.replace(' Fee', '')}</th>
                ))}
                <th>Total</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feeConfigs.map((config) => {
                const total = Object.values(config.fees).reduce((sum, val) => sum + (val || 0), 0);
                return (
                  <tr key={config.id} className="group">
                    <td className="text-white font-medium">{config.className}</td>
                    {feeTypes.map((ft, index) => {
                      const colors = ['text-blue-400', 'text-purple-400', 'text-green-400', 'text-cyan-400', 'text-orange-400', 'text-pink-400', 'text-yellow-400', 'text-red-400', 'text-indigo-400', 'text-teal-400'];
                      const isEditing = editingCell?.configId === config.id && editingCell?.feeKey === ft.key;
                      return (
                        <td key={ft.id} className={index < colors.length ? colors[index] : ''}>
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={cellEditValue}
                                onChange={(e) => setCellEditValue(e.target.value)}
                                className="w-20 bg-slate-800 text-white text-sm px-2 py-1 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveCellEdit();
                                  if (e.key === 'Escape') handleCancelCellEdit();
                                }}
                              />
                              <button onClick={handleSaveCellEdit} className="text-green-400 hover:text-green-300 p-1">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </button>
                              <button onClick={handleCancelCellEdit} className="text-red-400 hover:text-red-300 p-1">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <button 
                              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                              title="Click to edit"
                              onClick={() => handleStartCellEdit(config.id, ft.key, config.fees[ft.key] || 0)}
                            >
                              ${(config.fees[ft.key] || 0).toLocaleString()}
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 group-hover:opacity-50">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                          )}
                        </td>
                      );
                    })}
                    <td className="text-emerald-400 font-semibold">${total.toLocaleString()}</td>
                    <td className="text-slate-400">{config.dueDate}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button 
                          className="text-slate-400 hover:text-blue-400 transition-colors p-1"
                          title="Edit"
                          onClick={() => handleEditConfig(config)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button 
                          className="text-slate-400 hover:text-red-400 transition-colors p-1"
                          title="Delete"
                          onClick={() => handleDeleteConfig(config.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Fee Types Button */}
      <div className="page-card">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold">Manage Fee Types</h2>
            <p className="text-slate-500 text-xs mt-0.5">Add or remove fee categories from the fee structure</p>
          </div>
          <button 
            className="btn-secondary text-sm"
            onClick={() => setShowFeeTypesModal(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Manage Fee Types
          </button>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {feeTypes.map((ft, index) => {
              const colors = ['bg-blue-500/20 text-blue-400 border-blue-500/30', 'bg-purple-500/20 text-purple-400 border-purple-500/30', 'bg-green-500/20 text-green-400 border-green-500/30', 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30', 'bg-orange-500/20 text-orange-400 border-orange-500/30', 'bg-pink-500/20 text-pink-400 border-pink-500/30', 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', 'bg-red-500/20 text-red-400 border-red-500/30', 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30', 'bg-teal-500/20 text-teal-400 border-teal-500/30'];
              return (
                <span 
                  key={ft.id} 
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${index < colors.length ? colors[index] : 'bg-slate-700 text-slate-400 border-slate-600'}`}
                >
                  {ft.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Feeding Fee Section */}
      <div className="page-card">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold">Daily Feeding Fee</h2>
            <p className="text-slate-500 text-xs mt-0.5">Monthly feeding fee tracking — $5.00 per school day</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <p className="text-white font-semibold">${totalFeedingExpected.toLocaleString()}</p>
              <p className="text-slate-500 text-xs">Expected</p>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div className="text-center">
              <p className="text-emerald-400 font-semibold">${totalFeedingCollected.toLocaleString()}</p>
              <p className="text-slate-500 text-xs">Collected</p>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div className="text-center">
              <p className="text-red-400 font-semibold">${totalFeedingOutstanding.toLocaleString()}</p>
              <p className="text-slate-500 text-xs">Outstanding</p>
            </div>
          </div>
        </div>

        {/* Feeding Fee Info Banner */}
        <div className="mx-6 mt-4 mb-2 bg-orange-500/10 border border-orange-500/20 rounded-lg px-4 py-3 flex items-start gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
          <div>
            <p className="text-orange-300 text-sm font-medium">Daily Feeding Programme</p>
            <p className="text-slate-400 text-xs mt-0.5">Students are charged $5.00 per school day attended. Monthly billing is based on actual attendance. Term total is calculated over 20 school days per month × 3 months.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Daily Rate</th>
                <th>Days Enrolled</th>
                <th>Days Attended</th>
                <th>Amount Due</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedingRecords.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300 flex-shrink-0">
                        {r.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{r.name}</p>
                        <p className="text-slate-500 text-xs font-mono">{r.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-slate-400 text-sm">{r.class}</td>
                  <td className="text-orange-400 font-medium">${r.dailyRate.toFixed(2)}/day</td>
                  <td className="text-slate-400">{r.daysEnrolled} days</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-white">{r.daysAttended}</span>
                      <div className="w-16 bg-slate-800 rounded-full h-1.5">
                        <div
                          className="bg-orange-400 h-1.5 rounded-full"
                          style={{ width: `${(r.daysAttended / r.daysEnrolled) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="text-white font-medium">${r.amountDue.toLocaleString()}</td>
                  <td className="text-emerald-400">${r.paid.toLocaleString()}</td>
                  <td className={r.balance > 0 ? "text-red-400 font-medium" : "text-slate-500"}>
                    ${r.balance.toLocaleString()}
                  </td>
                  <td>
                    <span className={`badge ${
                      r.status === "Paid" ? "badge-green" :
                      r.status === "Partial" ? "badge-yellow" :
                      r.status === "Overdue" ? "badge-red" : "badge-blue"
                    }`}>{r.status}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button 
                        className="text-slate-400 hover:text-emerald-400 transition-colors" 
                        title="Record Payment"
                        onClick={() => {
                          setSelectedRecord(r);
                          setStudentSearch(r.name);
                          setPaymentAmount(r.balance > 0 ? r.balance.toString() : "");
                          setShowPaymentModal(true);
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="1" x2="12" y2="23" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                      </button>
                      <button className="text-slate-400 hover:text-amber-400 transition-colors" title="Send Reminder">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
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
          <p className="text-slate-500 text-sm">Showing 8 of 1,248 enrolled students</p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary px-3 py-1.5 text-xs">Previous</button>
            <button className="btn-primary px-3 py-1.5 text-xs">Next</button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && receiptData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <h3 className="text-white font-semibold">Payment Receipt</h3>
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
                <h2 className="text-white font-bold text-lg">EduManage School</h2>
                <p className="text-slate-400 text-xs">123 Education Street, Accra, Ghana</p>
                <p className="text-slate-400 text-xs">Tel: +233 20 123 4567</p>
              </div>

              {/* Receipt Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Receipt No:</span>
                  <input
                    type="text"
                    value={receiptNumber}
                    onChange={(e) => setReceiptNumber(e.target.value)}
                    className="bg-slate-800 border border-slate-600 rounded px-3 py-1.5 text-white font-mono text-sm text-right w-48 focus:outline-none focus:border-blue-500"
                    placeholder="Enter receipt number"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Date:</span>
                  <span className="text-white text-sm">{receiptData.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Term:</span>
                  <span className="text-white text-sm">{receiptData.term}</span>
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
                  <span className="text-slate-400 text-sm">Payment Method:</span>
                  <span className="text-emerald-400 text-sm">{receiptData.paymentMethod}</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-slate-800 rounded-lg p-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Amount Paid:</span>
                  <span className="text-emerald-400 font-bold text-xl">${receiptData.amount.toLocaleString()}</span>
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

      {/* Record Payment Modal */}
      {showPaymentModal && selectedRecord && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto custom-scrollbar">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-white font-semibold">Record Payment</h3>
              <button 
                onClick={() => {
                  setShowPaymentModal(false);
                  setPaymentSuccess(false);
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Success State */}
            {paymentSuccess ? (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">Payment Recorded!</h4>
                <p className="text-slate-400 text-sm mb-4">
                  A receipt has been generated for {selectedRecord?.name}
                </p>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentSuccess(false);
                    setStudentSearch("");
                    setSelectedRecord(null);
                    setPaymentAmount("");
                  }}
                  className="btn-primary w-full justify-center"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Payment Form */
              <div className="p-6 space-y-4">
                {/* Student Search */}
                <div className="relative">
                  <label className="block text-slate-400 text-sm mb-2">Student Name</label>
                  <input
                    type="text"
                    value={selectedRecord ? selectedRecord.name : studentSearch}
                    onChange={(e) => {
                      setStudentSearch(e.target.value);
                      setSelectedRecord(null);
                      setPaymentAmount("");
                      setShowStudentDropdown(true);
                    }}
                    onFocus={() => setShowStudentDropdown(true)}
                    onBlur={() => setTimeout(() => setShowStudentDropdown(false), 200)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    placeholder="Search student by name..."
                  />
                  {showStudentDropdown && filteredStudents.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredStudents.map((student) => (
                        <button
                          key={student.studentId}
                          onClick={() => {
                            setSelectedRecord(student);
                            setStudentSearch(student.name);
                            setPaymentAmount("");
                            setShowStudentDropdown(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors flex items-center justify-between"
                        >
                          <span className="text-white">{student.name}</span>
                          <span className="text-slate-400 text-sm">{student.class}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Student Info - shown when student is selected */}
                {selectedRecord && (
                  <div className="bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold text-slate-300">
                        {selectedRecord.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-white font-medium">{selectedRecord.name}</p>
                        <p className="text-slate-400 text-xs">{selectedRecord.class} • {selectedRecord.studentId}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700">
                      <div>
                        <p className="text-slate-500 text-xs">Amount Due</p>
                        <p className="text-white font-medium">${('amount' in selectedRecord ? selectedRecord.amount : selectedRecord.amountDue).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">Already Paid</p>
                        <p className="text-emerald-400 font-medium">${selectedRecord.paid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">Outstanding</p>
                        <p className="text-red-400 font-medium">${selectedRecord.balance.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Amount */}
                {selectedRecord && (
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Amount to be Paid</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-8 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => setPaymentAmount(selectedRecord.balance.toString())}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Full Balance
                      </button>
                      <button 
                        onClick={() => setPaymentAmount(Math.ceil(selectedRecord.balance / 2).toString())}
                        className="text-xs text-slate-500 hover:text-slate-400"
                      >
                        Half Balance
                      </button>
                    </div>
                    
                    {/* Dynamic Outstanding Balance Calculation */}
                    <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Outstanding After Payment:</span>
                        <span className={`font-semibold ${calculateOutstanding() === 0 ? 'text-emerald-400' : 'text-orange-400'}`}>
                          ${calculateOutstanding().toLocaleString()}
                        </span>
                      </div>
                      {calculateOutstanding() === 0 && (
                        <p className="text-emerald-400 text-xs mt-1 text-center">✓ This payment will clear the balance</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Payment Method */}
                {selectedRecord && (
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="Online">Online Payment</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                )}

                {/* Payment Date */}
                {selectedRecord && (
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Payment Date</label>
                    <input
                      type="date"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={() => {
                    // In a real app, this would update the record in the database
                    setPaymentSuccess(true);
                  }}
                  disabled={!selectedRecord || !paymentAmount || parseFloat(paymentAmount) <= 0 || parseFloat(paymentAmount) > calculateOutstanding() + selectedRecord.paid}
                  className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Record Payment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fee Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg h-[80vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between flex-shrink-0">
              <h3 className="text-white font-semibold">{editingConfig ? 'Edit Fee Structure' : 'Add Fee Structure'}</h3>
              <button 
                onClick={() => {
                  setShowConfigModal(false);
                  setEditingConfig(null);
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar min-h-0 flex-1">
              <div>
                <label className="block text-slate-400 text-sm mb-2">Class / Grade Level</label>
                <input
                  type="text"
                  value={newConfig.className}
                  onChange={(e) => setNewConfig({ ...newConfig, className: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Grade 9 or Form 1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {feeTypes.map((ft) => (
                  <div key={ft.id}>
                    <label className="block text-slate-400 text-sm mb-2">{ft.name} ($)</label>
                    <input
                      type="number"
                      value={newConfig.fees[ft.key] || 0}
                      onChange={(e) => setNewConfig({ 
                        ...newConfig, 
                        fees: { ...newConfig.fees, [ft.key]: parseFloat(e.target.value) || 0 } 
                      })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newConfig.dueDate}
                    onChange={(e) => setNewConfig({ ...newConfig, dueDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Term</label>
                  <select
                    value={newConfig.term}
                    onChange={(e) => setNewConfig({ ...newConfig, term: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="First Term">First Term</option>
                    <option value="Second Term">Second Term</option>
                    <option value="Third Term">Third Term</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">Academic Year</label>
                <select
                  value={newConfig.academicYear}
                  onChange={(e) => setNewConfig({ ...newConfig, academicYear: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="2025-2026">2025-2026</option>
                  <option value="2026-2027">2026-2027</option>
                  <option value="2027-2028">2027-2028</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  onClick={editingConfig ? handleUpdateConfig : handleAddConfig}
                  className="flex-1 btn-primary justify-center"
                >
                  {editingConfig ? 'Update Fee Structure' : 'Add Fee Structure'}
                </button>
                <button
                  onClick={() => {
                    setShowConfigModal(false);
                    setEditingConfig(null);
                  }}
                  className="flex-1 btn-secondary justify-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Fee Types Modal */}
      {showFeeTypesModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between flex-shrink-0">
              <h3 className="text-white font-semibold">Manage Fee Types</h3>
              <button 
                onClick={() => setShowFeeTypesModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Add new fee type */}
              <div className="bg-slate-800 rounded-lg p-4">
                <h4 className="text-white text-sm font-medium mb-3">Add New Fee Type</h4>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={newFeeType.name}
                      onChange={(e) => setNewFeeType({ ...newFeeType, name: e.target.value })}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                      placeholder="e.g., Library Fee"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={newFeeType.defaultAmount}
                      onChange={(e) => setNewFeeType({ ...newFeeType, defaultAmount: parseFloat(e.target.value) || 0 })}
                      className="flex-1 bg-slate-700 border border-slate-600 rounded-lg py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                      placeholder="Default amount ($)"
                    />
                    <button
                      onClick={handleAddFeeType}
                      disabled={!newFeeType.name.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Existing fee types list */}
              <div>
                <h4 className="text-white text-sm font-medium mb-3">Current Fee Types</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                  {feeTypes.map((ft, index) => {
                    const colors = ['border-blue-500 bg-blue-500/10', 'border-purple-500 bg-purple-500/10', 'border-green-500 bg-green-500/10', 'border-cyan-500 bg-cyan-500/10', 'border-orange-500 bg-orange-500/10', 'border-pink-500 bg-pink-500/10', 'border-yellow-500 bg-yellow-500/10', 'border-red-500 bg-red-500/10', 'border-indigo-500 bg-indigo-500/10', 'border-teal-500 bg-teal-500/10'];
                    const isEditing = editingFeeType?.id === ft.id;
                    
                    return (
                      <div 
                        key={ft.id} 
                        className={`flex items-center justify-between p-3 rounded-lg border ${index < colors.length ? colors[index] : 'border-slate-600 bg-slate-800'}`}
                      >
                        {isEditing ? (
                          <div className="flex-1 flex gap-2 items-center">
                            <input
                              type="text"
                              value={editFeeTypeValue.name}
                              onChange={(e) => setEditFeeTypeValue({ ...editFeeTypeValue, name: e.target.value })}
                              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg py-1.5 px-2 text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <input
                              type="number"
                              value={editFeeTypeValue.defaultAmount}
                              onChange={(e) => setEditFeeTypeValue({ ...editFeeTypeValue, defaultAmount: parseFloat(e.target.value) || 0 })}
                              className="w-24 bg-slate-700 border border-slate-600 rounded-lg py-1.5 px-2 text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                            <button
                              onClick={handleSaveFeeTypeEdit}
                              disabled={!editFeeTypeValue.name.trim()}
                              className="p-1.5 text-green-400 hover:text-green-300 disabled:opacity-50"
                              title="Save"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </button>
                            <button
                              onClick={handleCancelFeeTypeEdit}
                              className="p-1.5 text-slate-400 hover:text-white"
                              title="Cancel"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <>
                            <div>
                              <p className="text-white font-medium text-sm">{ft.name}</p>
                              <p className="text-slate-400 text-xs">Default: ${ft.defaultAmount}</p>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleEditFeeTypeClick(ft)}
                                className="text-slate-400 hover:text-blue-400 transition-colors p-1"
                                title="Edit fee type"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteFeeType(ft.id)}
                                className="text-slate-400 hover:text-red-400 transition-colors p-1"
                                title="Delete fee type"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setShowFeeTypesModal(false)}
                className="w-full btn-secondary justify-center"
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
