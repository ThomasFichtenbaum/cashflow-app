import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cashflow-budget-app-v2";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f6fb",
    color: "#1f2937",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: 20,
  },
  topBar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    marginTop: 6,
    color: "#64748b",
  },
  tabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    padding: "10px 16px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  tabActive: {
    background: "#0f172a",
    color: "#fff",
    border: "1px solid #0f172a",
  },
  card: {
    background: "#fff",
    border: "1px solid #dbe3ef",
    borderRadius: 20,
    padding: 18,
    boxShadow: "0 2px 10px rgba(15,23,42,0.05)",
  },
  cardTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
  },
  cardSubtitle: {
    marginTop: 6,
    marginBottom: 16,
    color: "#64748b",
    fontSize: 14,
  },
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 16,
  },
  metric: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 14,
  },
  metricLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 700,
    marginTop: 6,
  },
  metricHint: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  th: {
    textAlign: "left",
    padding: "10px 8px",
    borderBottom: "1px solid #dbe3ef",
    color: "#64748b",
  },
  td: {
    padding: "10px 8px",
    borderBottom: "1px solid #eef2f7",
    verticalAlign: "top",
  },
  badgeBase: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  },
  button: {
    padding: "9px 12px",
    borderRadius: 12,
    border: "1px solid #cbd5e1",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  buttonDark: {
    background: "#0f172a",
    color: "#fff",
    border: "1px solid #0f172a",
  },
  buttonDanger: {
    background: "#dc2626",
    color: "#fff",
    border: "1px solid #dc2626",
  },
  input: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 12,
    border: "1px solid #cbd5e1",
    background: "#fff",
    boxSizing: "border-box",
  },
  smallText: {
    color: "#64748b",
    fontSize: 13,
  },
  row: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  itemBox: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
};

const seedRules = [
  { id: "r1", title: "Miete 1", type: "income", amount: 683, frequency: "monthly", day: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Mieteinnahmen", account: "Hauptkonto", note: "monatlich" },
  { id: "r2", title: "Miete 2", type: "income", amount: 175, frequency: "monthly", day: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Mieteinnahmen", account: "Hauptkonto", note: "monatlich" },
  { id: "r3", title: "Miete 3", type: "income", amount: 150, frequency: "monthly", day: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Mieteinnahmen", account: "Hauptkonto", note: "monatlich" },
  { id: "r4", title: "Wartung EDV", type: "income", amount: 300, frequency: "monthly", day: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Nebeneinkünfte", account: "Hauptkonto", note: "monatlich" },
  { id: "r5", title: "Gehalt Thomas", type: "income", amount: 3700, frequency: "monthly", day: 28, startMonth: "2026-04", endMonth: "2027-03", category: "Gehalt", account: "Hauptkonto", note: "monatlich" },
  { id: "r6", title: "13./14. Gehalt", type: "income", amount: 3700, frequency: "customMonths", months: ["2026-06", "2026-12"], day: 15, startMonth: "2026-04", endMonth: "2027-03", category: "Gehalt", account: "Hauptkonto", note: "Juni und Dezember" },
  { id: "r7", title: "Prämie Thomas", type: "income", amount: 15000, frequency: "customMonths", months: ["2027-02"], day: 28, startMonth: "2026-04", endMonth: "2027-03", category: "Prämie", account: "Hauptkonto", note: "Ende Februar" },
  { id: "r8", title: "Wochengeld Natalya", type: "income", amount: 1790, frequency: "customMonths", months: ["2026-04", "2026-05"], day: 25, startMonth: "2026-04", endMonth: "2027-03", category: "Familie", account: "Hauptkonto", note: "April und Mai" },
  { id: "r9", title: "Kinderbetreuungsgeld", type: "income", amount: 1432, frequency: "monthly", day: 20, startMonth: "2026-06", endMonth: "2027-03", category: "Familie", account: "Hauptkonto", note: "Annahme" },
  { id: "r10", title: "Familienbeihilfe + Kinderabsetzbetrag", type: "income", amount: 209.3, frequency: "monthly", day: 10, startMonth: "2026-04", endMonth: "2027-03", category: "Familie", account: "Hauptkonto", note: "monatlich" },
  { id: "r11", title: "Rückzahlung Dolbilov", type: "income", amount: 750, frequency: "everyOtherMonth", day: 5, startMonth: "2026-04", endMonth: "2027-02", category: "Privatkredit", account: "Hauptkonto", note: "alle 2 Monate" },

  { id: "r12", title: "Kredit Haus", type: "expense", amount: 1250, frequency: "monthly", day: 3, startMonth: "2026-04", endMonth: "2027-03", category: "Wohnen", account: "Hauptkonto", note: "monatlich" },
  { id: "r13", title: "Kredit Wohnung", type: "expense", amount: 580, frequency: "monthly", day: 3, startMonth: "2026-04", endMonth: "2027-03", category: "Wohnen", account: "Hauptkonto", note: "monatlich" },
  { id: "r14", title: "Betriebskosten Wohnung", type: "expense", amount: 245, frequency: "monthly", day: 3, startMonth: "2026-04", endMonth: "2027-03", category: "Wohnen", account: "Hauptkonto", note: "monatlich" },
  { id: "r15", title: "Heizung Wohnung", type: "expense", amount: 90, frequency: "monthly", day: 3, startMonth: "2026-04", endMonth: "2027-03", category: "Wohnen", account: "Hauptkonto", note: "monatlich" },
  { id: "r16", title: "Strom Haus", type: "expense", amount: 325, frequency: "monthly", day: 12, startMonth: "2026-04", endMonth: "2027-03", category: "Haus", account: "Hauptkonto", note: "Ø aus 3.900/Jahr" },
  { id: "r17", title: "BK Haus", type: "expense", amount: 166.67, frequency: "monthly", day: 12, startMonth: "2026-04", endMonth: "2027-03", category: "Haus", account: "Hauptkonto", note: "Rücklage" },
  { id: "r18", title: "Versicherung E-Golf", type: "expense", amount: 70, frequency: "monthly", day: 8, startMonth: "2026-04", endMonth: "2027-03", category: "Auto", account: "Hauptkonto", note: "monatlich" },
  { id: "r19", title: "Pickerl E-Golf", type: "expense", amount: 700, frequency: "customMonths", months: ["2026-04"], day: 8, startMonth: "2026-04", endMonth: "2027-03", category: "Auto", account: "Hauptkonto", note: "einmalig April" },
  { id: "r20", title: "Eigenheimversicherung", type: "expense", amount: 90, frequency: "monthly", day: 8, startMonth: "2026-04", endMonth: "2027-03", category: "Versicherung", account: "Hauptkonto", note: "monatlich" },
  { id: "r21", title: "Ablebensversicherung", type: "expense", amount: 34, frequency: "monthly", day: 8, startMonth: "2026-04", endMonth: "2027-03", category: "Versicherung", account: "Hauptkonto", note: "monatlich" },
  { id: "r22", title: "Fitness", type: "expense", amount: 34, frequency: "monthly", day: 8, startMonth: "2026-04", endMonth: "2026-12", category: "Freizeit", account: "Hauptkonto", note: "endet 31.12.2026" },
  { id: "r23", title: "Handy + Internet", type: "expense", amount: 110, frequency: "monthly", day: 15, startMonth: "2026-04", endMonth: "2027-03", category: "Kommunikation", account: "Hauptkonto", note: "monatlich" },
  { id: "r24", title: "SVS Rückzahlung", type: "expense", amount: 85, frequency: "monthly", day: 15, startMonth: "2026-04", endMonth: "2026-10", category: "Versicherung", account: "Hauptkonto", note: "bis Oktober 2026" },
  { id: "r25", title: "Haushaltskonto", type: "expense", amount: 530, frequency: "weekly", weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Lebensmittel", account: "Haushaltskonto", note: "wöchentlich" },
  { id: "r26", title: "Quartalszinsen Konto 1", type: "expense", amount: 356.25, frequency: "customMonths", months: ["2026-06", "2026-09", "2026-12"], day: 30, startMonth: "2026-04", endMonth: "2027-03", category: "Zinsen", account: "Konto 1", note: "Modellwert" },
  { id: "r27", title: "Quartalszinsen Konto 2", type: "expense", amount: 30, frequency: "customMonths", months: ["2026-06"], day: 30, startMonth: "2026-04", endMonth: "2027-03", category: "Zinsen", account: "Konto 2", note: "Modellwert" },
];

const seedDebtAccounts = [
  { id: "d1", name: "Konto 1", balance: -15000, rate: 9.5 },
  { id: "d2", name: "Konto 2", balance: -1000, rate: 12 },
];

const seedState = {
  rules: seedRules,
  manualTransactions: [],
  confirmed: {},
  debtAccounts: seedDebtAccounts,
  appSettings: {
    currentMonth: "2026-04",
    planningEnd: "2027-03",
    startCash: 0,
  },
};

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function monthRange(startMonth, endMonth) {
  const result = [];
  const start = new Date(`${startMonth}-01T00:00:00`);
  const end = new Date(`${endMonth}-01T00:00:00`);
  const date = new Date(start);
  while (date <= end) {
    result.push(formatMonth(date));
    date.setMonth(date.getMonth() + 1);
  }
  return result;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR" }).format(value || 0);
}

function formatMonth(dateOrMonth) {
  if (typeof dateOrMonth === "string") return dateOrMonth.slice(0, 7);
  const y = dateOrMonth.getFullYear();
  const m = String(dateOrMonth.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function prettyMonth(month) {
  const [y, m] = month.split("-");
  const date = new Date(Number(y), Number(m) - 1, 1);
  return new Intl.DateTimeFormat("de-AT", { month: "long", year: "numeric" }).format(date);
}

function prettyDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function monthDays(year, monthIndexZeroBased) {
  return new Date(year, monthIndexZeroBased + 1, 0).getDate();
}

function createDate(month, day) {
  const [y, m] = month.split("-").map(Number);
  const maxDay = monthDays(y, m - 1);
  return `${y}-${String(m).padStart(2, "0")}-${String(Math.min(day, maxDay)).padStart(2, "0")}`;
}

function datesForWeeklyInMonth(month, weekday = 1) {
  const [y, m] = month.split("-").map(Number);
  const result = [];
  const date = new Date(y, m - 1, 1);
  while (date.getMonth() === m - 1) {
    if (date.getDay() === weekday) {
      result.push(`${y}-${String(m).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`);
    }
    date.setDate(date.getDate() + 1);
  }
  return result;
}

function ruleActiveInMonth(rule, month) {
  return month >= rule.startMonth && month <= rule.endMonth;
}

function monthIndex(month) {
  const [y, m] = month.split("-").map(Number);
  return y * 12 + m;
}

function isEveryOtherMonthHit(rule, month) {
  const offset = monthIndex(month) - monthIndex(rule.startMonth);
  return offset % 2 === 0;
}

function transactionFromRule(rule, month, date) {
  return {
    id: `${rule.id}_${date}`,
    ruleId: rule.id,
    month,
    date,
    title: rule.title,
    type: rule.type,
    plannedAmount: Number(rule.amount),
    actualAmount: null,
    category: rule.category,
    account: rule.account,
    note: rule.note || "",
    source: "rule",
  };
}

function expandRule(rule, months) {
  const txs = [];
  for (const month of months) {
    if (!ruleActiveInMonth(rule, month)) continue;
    if (rule.frequency === "monthly") {
      txs.push(transactionFromRule(rule, month, createDate(month, rule.day || 1)));
    }
    if (rule.frequency === "weekly") {
      const dates = datesForWeeklyInMonth(month, rule.weekday ?? 1);
      dates.forEach((date) => txs.push(transactionFromRule(rule, month, date)));
    }
    if (rule.frequency === "everyOtherMonth" && isEveryOtherMonthHit(rule, month)) {
      txs.push(transactionFromRule(rule, month, createDate(month, rule.day || 1)));
    }
    if (rule.frequency === "customMonths" && (rule.months || []).includes(month)) {
      txs.push(transactionFromRule(rule, month, createDate(month, rule.day || 1)));
    }
  }
  return txs;
}

function sum(list, selector = (x) => x) {
  return list.reduce((acc, item) => acc + Number(selector(item) || 0), 0);
}

function getActualOrPlanned(tx, confirmedMap) {
  const c = confirmedMap[tx.id];
  if (c?.status === "confirmed") return Number(c.actualAmount ?? tx.plannedAmount);
  if (c?.status === "skipped") return 0;
  return Number(tx.plannedAmount);
}

function statusForTransaction(tx, confirmedMap, todayStr) {
  const c = confirmedMap[tx.id];
  if (c?.status === "confirmed") return "bestätigt";
  if (c?.status === "skipped") return "übersprungen";
  if (tx.date < todayStr) return "überfällig";
  if (tx.date === todayStr) return "heute";
  return "geplant";
}

function exportCsv(rows, filename = "cashflow_export.csv") {
  const headers = Object.keys(rows[0] || {});
  const csv = [
    headers.join(";"),
    ...rows.map((row) => headers.map((h) => JSON.stringify(row[h] ?? "")).join(";")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function badgeStyle(status) {
  const map = {
    bestätigt: { background: "#dcfce7", color: "#166534" },
    geplant: { background: "#dbeafe", color: "#1d4ed8" },
    heute: { background: "#fef3c7", color: "#92400e" },
    überfällig: { background: "#fee2e2", color: "#b91c1c" },
    übersprungen: { background: "#e2e8f0", color: "#334155" },
  };
  return { ...styles.badgeBase, ...(map[status] || map.geplant) };
}

function Card({ title, subtitle, children, extra }) {
  return (
    <div style={styles.card}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h2 style={styles.cardTitle}>{title}</h2>
          {subtitle ? <div style={styles.cardSubtitle}>{subtitle}</div> : null}
        </div>
        {extra}
      </div>
      {children}
    </div>
  );
}

function Metric({ label, value, hint }) {
  return (
    <div style={styles.metric}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={styles.metricValue}>{value}</div>
      {hint ? <div style={styles.metricHint}>{hint}</div> : null}
    </div>
  );
}

export default function App() {
  const [app, setApp] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedState;
  });
  const [tab, setTab] = useState("dashboard");
  const [selectedMonth, setSelectedMonth] = useState(app.appSettings.currentMonth);
  const [form, setForm] = useState({
    title: "",
    type: "expense",
    amount: "",
    category: "Sonstiges",
    frequency: "monthly",
    day: 1,
    startMonth: selectedMonth,
    endMonth: app.appSettings.planningEnd,
    account: "Hauptkonto",
    note: "",
  });

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(app));
  }, [app]);

  const months = useMemo(() => monthRange(app.appSettings.currentMonth, app.appSettings.planningEnd), [app.appSettings.currentMonth, app.appSettings.planningEnd]);

  const transactions = useMemo(() => {
    const fromRules = app.rules.flatMap((rule) => expandRule(rule, months));
    const manual = (app.manualTransactions || []).filter((tx) => months.includes(tx.month));
    return [...fromRules, ...manual].sort((a, b) => a.date.localeCompare(b.date));
  }, [app.rules, app.manualTransactions, months]);

  const monthlyViews = useMemo(() => {
    let runningCash = Number(app.appSettings.startCash || 0);
    return months.map((month) => {
      const txs = transactions.filter((tx) => tx.month === month);
      const incomeSum = sum(txs.filter((tx) => tx.type === "income"), (tx) => getActualOrPlanned(tx, app.confirmed));
      const expenseSum = sum(txs.filter((tx) => tx.type === "expense"), (tx) => getActualOrPlanned(tx, app.confirmed));
      const net = incomeSum - expenseSum;
      runningCash += net;
      return { month, txs, incomeSum, expenseSum, net, runningCash };
    });
  }, [months, transactions, app.confirmed, app.appSettings.startCash]);

  const monthView = monthlyViews.find((m) => m.month === selectedMonth) || monthlyViews[0];
  const monthTxs = monthView?.txs || [];
  const openTxs = monthTxs.filter((tx) => statusForTransaction(tx, app.confirmed, todayStr) !== "bestätigt");
  const dueThisWeek = transactions.filter((tx) => {
    const d = new Date(tx.date);
    const diff = (d - today) / (1000 * 60 * 60 * 24);
    return diff >= -1 && diff <= 7 && statusForTransaction(tx, app.confirmed, todayStr) !== "bestätigt";
  });
  const totalDebt = sum(app.debtAccounts, (d) => Math.abs(d.balance));

  function confirmTransaction(tx, customAmount) {
    setApp((prev) => ({
      ...prev,
      confirmed: {
        ...prev.confirmed,
        [tx.id]: {
          status: "confirmed",
          actualAmount: Number(customAmount ?? tx.plannedAmount),
          confirmedAt: new Date().toISOString(),
        },
      },
    }));
  }

  function skipTransaction(tx) {
    setApp((prev) => ({
      ...prev,
      confirmed: {
        ...prev.confirmed,
        [tx.id]: {
          status: "skipped",
          actualAmount: 0,
          confirmedAt: new Date().toISOString(),
        },
      },
    }));
  }

  function handleExportMonth() {
    const rows = monthTxs.map((tx) => ({
      Monat: tx.month,
      Datum: tx.date,
      Titel: tx.title,
      Typ: tx.type === "income" ? "Einnahme" : "Ausgabe",
      Kategorie: tx.category,
      Konto: tx.account,
      Geplant: tx.plannedAmount,
      Status: statusForTransaction(tx, app.confirmed, todayStr),
      Tatsächlich: app.confirmed[tx.id]?.actualAmount ?? "",
      Notiz: tx.note,
    }));
    exportCsv(rows, `cashflow_${selectedMonth}.csv`);
  }

  function resetAll() {
    if (!window.confirm("Wirklich alles zurücksetzen?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setApp(seedState);
    setSelectedMonth(seedState.appSettings.currentMonth);
  }

  function addManualTransaction(e) {
    e.preventDefault();
    const tx = {
      id: uid("manual"),
      ruleId: null,
      month: selectedMonth,
      date: createDate(selectedMonth, 15),
      title: form.title,
      type: form.type,
      plannedAmount: Number(form.amount),
      actualAmount: null,
      category: form.category,
      account: form.account,
      note: form.note,
      source: "manual",
    };
    setApp((prev) => ({ ...prev, manualTransactions: [...prev.manualTransactions, tx] }));
    setForm({ ...form, title: "", amount: "", note: "" });
  }

  function addRecurringRule(e) {
    e.preventDefault();
    const rule = {
      id: uid("rule"),
      title: form.title,
      type: form.type,
      amount: Number(form.amount),
      frequency: form.frequency,
      day: Number(form.day || 1),
      weekday: 1,
      startMonth: form.startMonth,
      endMonth: form.endMonth,
      category: form.category,
      account: form.account,
      note: form.note,
    };
    setApp((prev) => ({ ...prev, rules: [...prev.rules, rule] }));
    setForm({ ...form, title: "", amount: "", note: "" });
  }

  function deleteRule(ruleId) {
    if (!window.confirm("Regel löschen?")) return;
    setApp((prev) => ({ ...prev, rules: prev.rules.filter((r) => r.id !== ruleId) }));
  }

  function ActionButtons({ tx }) {
    return (
      <div style={styles.row}>
        <button style={{ ...styles.button, ...styles.buttonDark }} onClick={() => confirmTransaction(tx)}>OK</button>
        <button
          style={styles.button}
          onClick={() => {
            const value = prompt("Tatsächlichen Betrag eingeben", String(tx.plannedAmount));
            if (value !== null) confirmTransaction(tx, Number(value));
          }}
        >
          Betrag
        </button>
        <button style={styles.button} onClick={() => skipTransaction(tx)}>Skip</button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.title}>Cashflow- und Budget-App</h1>
            <div style={styles.subtitle}>Private Monatsplanung mit Fälligkeiten, Bestätigungen und CSV-Export.</div>
          </div>
          <div style={styles.row}>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} style={styles.input}>
              {months.map((month) => (
                <option key={month} value={month}>{prettyMonth(month)}</option>
              ))}
            </select>
            <button style={styles.button} onClick={handleExportMonth}>CSV exportieren</button>
            <button style={{ ...styles.button, ...styles.buttonDanger }} onClick={resetAll}>Reset</button>
          </div>
        </div>

        <div style={styles.tabs}>
          {[
            ["dashboard", "Dashboard"],
            ["monat", "Monatsplan"],
            ["aufgaben", "Heute & Fälligkeiten"],
            ["regeln", "Regeln"],
            ["buchung", "Manuelle Buchung"],
          ].map(([key, label]) => (
            <button
              key={key}
              style={tab === key ? { ...styles.tab, ...styles.tabActive } : styles.tab}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && (
          <div style={{ display: "grid", gap: 16 }}>
            <div style={styles.grid4}>
              <Metric label="Einnahmen im Monat" value={formatCurrency(monthView?.incomeSum || 0)} hint={prettyMonth(selectedMonth)} />
              <Metric label="Ausgaben im Monat" value={formatCurrency(monthView?.expenseSum || 0)} hint={prettyMonth(selectedMonth)} />
              <Metric label="Monatssaldo" value={formatCurrency(monthView?.net || 0)} hint="Plan/Ist je nach Bestätigung" />
              <Metric label="Laufender Stand" value={formatCurrency(monthView?.runningCash || 0)} hint="kumuliert ab Start" />
            </div>

            <div style={styles.grid2}>
              <Card title="Heute zu tun" subtitle="Offene oder bald fällige Buchungen">
                {dueThisWeek.length === 0 ? <div style={styles.smallText}>Keine offenen Buchungen in den nächsten 7 Tagen.</div> : null}
                {dueThisWeek.slice(0, 8).map((tx) => {
                  const status = statusForTransaction(tx, app.confirmed, todayStr);
                  return (
                    <div key={tx.id} style={styles.itemBox}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                        <div>
                          <div style={{ fontWeight: 700 }}>{tx.title}</div>
                          <div style={styles.smallText}>{prettyDate(tx.date)} · {formatCurrency(tx.plannedAmount)}</div>
                        </div>
                        <span style={badgeStyle(status)}>{status}</span>
                      </div>
                      <div style={{ marginTop: 10 }}><ActionButtons tx={tx} /></div>
                    </div>
                  );
                })}
              </Card>

              <Card title="Schuldenübersicht" subtitle="Einfaches Monitoring deiner Minusstände">
                {app.debtAccounts.map((debt) => (
                  <div key={debt.id} style={styles.itemBox}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{debt.name}</div>
                        <div style={styles.smallText}>Zinssatz {String(debt.rate).replace(".", ",")} %</div>
                      </div>
                      <div style={{ fontWeight: 700, color: "#b91c1c" }}>{formatCurrency(debt.balance)}</div>
                    </div>
                  </div>
                ))}
                <div style={{ ...styles.itemBox, background: "#0f172a", color: "#fff" }}>
                  <div style={{ color: "#cbd5e1", fontSize: 13 }}>Gesamte Überziehung</div>
                  <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4 }}>{formatCurrency(-totalDebt)}</div>
                </div>
              </Card>
            </div>

            <Card title="Monatsvorschau" subtitle="Von April 2026 bis März 2027">
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Monat</th>
                      <th style={styles.th}>Einnahmen</th>
                      <th style={styles.th}>Ausgaben</th>
                      <th style={styles.th}>Saldo</th>
                      <th style={styles.th}>Laufender Stand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyViews.map((row) => (
                      <tr key={row.month}>
                        <td style={styles.td}>{prettyMonth(row.month)}</td>
                        <td style={styles.td}>{formatCurrency(row.incomeSum)}</td>
                        <td style={styles.td}>{formatCurrency(row.expenseSum)}</td>
                        <td style={{ ...styles.td, fontWeight: 700, color: row.net >= 0 ? "#166534" : "#b91c1c" }}>{formatCurrency(row.net)}</td>
                        <td style={styles.td}>{formatCurrency(row.runningCash)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {tab === "monat" && (
          <Card title={`Monatsplan · ${prettyMonth(selectedMonth)}`} subtitle="Alle Buchungen im gewählten Monat">
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Datum</th>
                    <th style={styles.th}>Titel</th>
                    <th style={styles.th}>Kategorie</th>
                    <th style={styles.th}>Konto</th>
                    <th style={styles.th}>Typ</th>
                    <th style={styles.th}>Geplant</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {monthTxs.map((tx) => {
                    const status = statusForTransaction(tx, app.confirmed, todayStr);
                    return (
                      <tr key={tx.id}>
                        <td style={styles.td}>{prettyDate(tx.date)}</td>
                        <td style={styles.td}>
                          <div style={{ fontWeight: 700 }}>{tx.title}</div>
                          {tx.note ? <div style={styles.smallText}>{tx.note}</div> : null}
                        </td>
                        <td style={styles.td}>{tx.category}</td>
                        <td style={styles.td}>{tx.account}</td>
                        <td style={styles.td}>{tx.type === "income" ? "Einnahme" : "Ausgabe"}</td>
                        <td style={styles.td}>{formatCurrency(tx.plannedAmount)}</td>
                        <td style={styles.td}><span style={badgeStyle(status)}>{status}</span></td>
                        <td style={styles.td}><ActionButtons tx={tx} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {tab === "aufgaben" && (
          <Card title="Heute & Fälligkeiten" subtitle="Deine operative Liste zum Abarbeiten">
            {openTxs.length === 0 ? <div style={styles.smallText}>Alles im ausgewählten Monat ist bestätigt oder es gibt keine offenen Einträge.</div> : null}
            <div style={styles.grid2}>
              {openTxs.map((tx) => {
                const status = statusForTransaction(tx, app.confirmed, todayStr);
                return (
                  <div key={tx.id} style={styles.itemBox}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{tx.title}</div>
                        <div style={styles.smallText}>{prettyDate(tx.date)} · {tx.type === "income" ? "Eingang" : "Ausgang"}</div>
                      </div>
                      <span style={badgeStyle(status)}>{status}</span>
                    </div>
                    <div style={{ marginTop: 8, ...styles.smallText }}>{tx.category} · {tx.account}</div>
                    <div style={{ marginTop: 6, fontSize: 24, fontWeight: 700 }}>{formatCurrency(tx.plannedAmount)}</div>
                    <div style={{ marginTop: 10 }}><ActionButtons tx={tx} /></div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {tab === "regeln" && (
          <div style={styles.grid2}>
            <Card title="Wiederkehrende Regeln" subtitle="Geplante Einnahmen und Ausgaben">
              {app.rules.map((rule) => (
                <div key={rule.id} style={styles.itemBox}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{rule.title}</div>
                      <div style={styles.smallText}>{rule.type === "income" ? "Einnahme" : "Ausgabe"} · {formatCurrency(rule.amount)} · {rule.frequency}</div>
                      <div style={styles.smallText}>{rule.category} · {rule.startMonth} bis {rule.endMonth}</div>
                    </div>
                    <button style={styles.button} onClick={() => deleteRule(rule.id)}>Löschen</button>
                  </div>
                </div>
              ))}
            </Card>

            <Card title="Neue Regel" subtitle="Fixe oder wiederkehrende Zahlungen hinzufügen">
              <form onSubmit={addRecurringRule}>
                <div style={{ display: "grid", gap: 10 }}>
                  <input style={styles.input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Bezeichnung" required />
                  <div style={styles.grid2}>
                    <select style={styles.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                      <option value="income">Einnahme</option>
                      <option value="expense">Ausgabe</option>
                    </select>
                    <input style={styles.input} type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Betrag" required />
                  </div>
                  <div style={styles.grid2}>
                    <select style={styles.input} value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })}>
                      <option value="monthly">Monatlich</option>
                      <option value="everyOtherMonth">Alle 2 Monate</option>
                    </select>
                    <input style={styles.input} type="number" min="1" max="31" value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} placeholder="Tag im Monat" />
                  </div>
                  <div style={styles.grid2}>
                    <input style={styles.input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Kategorie" />
                    <input style={styles.input} value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} placeholder="Konto" />
                  </div>
                  <div style={styles.grid2}>
                    <input style={styles.input} type="month" value={form.startMonth} onChange={(e) => setForm({ ...form, startMonth: e.target.value })} />
                    <input style={styles.input} type="month" value={form.endMonth} onChange={(e) => setForm({ ...form, endMonth: e.target.value })} />
                  </div>
                  <textarea style={styles.input} rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Notiz" />
                  <button style={{ ...styles.button, ...styles.buttonDark }} type="submit">Regel speichern</button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {tab === "buchung" && (
          <div style={styles.grid2}>
            <Card title="Manuelle Buchung" subtitle="Für spontane Einnahmen oder Ausgaben">
              <form onSubmit={addManualTransaction}>
                <div style={{ display: "grid", gap: 10 }}>
                  <input style={styles.input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Bezeichnung" required />
                  <div style={styles.grid2}>
                    <select style={styles.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                      <option value="expense">Ausgabe</option>
                      <option value="income">Einnahme</option>
                    </select>
                    <input style={styles.input} type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="Betrag" required />
                  </div>
                  <div style={styles.grid2}>
                    <input style={styles.input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Kategorie" />
                    <input style={styles.input} value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} placeholder="Konto" />
                  </div>
                  <textarea style={styles.input} rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Notiz" />
                  <button style={{ ...styles.button, ...styles.buttonDark }} type="submit">Buchung anlegen</button>
                </div>
              </form>
            </Card>

            <Card title="So benutzt du die App" subtitle="Die erste, einfache Arbeitsweise">
              <div style={{ lineHeight: 1.7 }}>
                <div>1. Alles startet mit Regeln für regelmäßige Zahlungen.</div>
                <div>2. Im Tab „Heute & Fälligkeiten“ bestätigst du echte Ein- und Ausgänge.</div>
                <div>3. Mit „Betrag“ kannst du den echten Wert eintragen, wenn er abweicht.</div>
                <div>4. Mit „CSV exportieren“ bekommst du den Monat für Excel.</div>
                <div>5. Alles wird lokal im Browser gespeichert, ohne Cloud oder Server.</div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
