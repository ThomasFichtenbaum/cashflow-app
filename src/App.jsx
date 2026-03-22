import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cashflow-budget-app-v3";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f6fb",
    color: "#1f2937",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  container: {
    maxWidth: 1280,
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
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
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
    whiteSpace: "nowrap",
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
  buttonSoft: {
    background: "#eff6ff",
    color: "#1d4ed8",
    border: "1px solid #bfdbfe",
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
  actionWrap: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 10,
  },
  infoBox: {
    background: "#f8fafc",
    border: "1px solid #dbe3ef",
    borderRadius: 16,
    padding: 14,
  },
};

const seedRules = [
  { id: "r1", title: "Miete 1", type: "income", amount: 683, frequency: "monthly", day: 1, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Mieteinnahmen", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r2", title: "Miete 2", type: "income", amount: 175, frequency: "monthly", day: 1, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Mieteinnahmen", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r3", title: "Miete 3", type: "income", amount: 150, frequency: "monthly", day: 1, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Mieteinnahmen", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r4", title: "Wartung EDV", type: "income", amount: 300, frequency: "monthly", day: 1, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Nebeneinkünfte", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r5", title: "Gehalt Thomas", type: "income", amount: 3700, frequency: "monthly", day: 28, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Gehalt", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r6", title: "13./14. Gehalt", type: "income", amount: 3700, frequency: "customMonths", months: ["2026-06", "2026-12"], day: 15, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Gehalt", account: "Hauptkonto", note: "Juni und Dezember" },
  { id: "r7", title: "Prämie Thomas", type: "income", amount: 15000, frequency: "customMonths", months: ["2027-02"], day: 28, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Prämie", account: "Hauptkonto", note: "Ende Februar" },
  { id: "r8", title: "Wochengeld Natalya", type: "income", amount: 1790, frequency: "customMonths", months: ["2026-04", "2026-05"], day: 25, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Familie", account: "Hauptkonto", note: "April und Mai" },
  { id: "r9", title: "Kinderbetreuungsgeld", type: "income", amount: 1432, frequency: "monthly", day: 20, weekday: 1, startMonth: "2026-06", endMonth: "2027-03", category: "Familie", account: "Hauptkonto", note: "Annahme", months: [] },
  { id: "r10", title: "Familienbeihilfe + Kinderabsetzbetrag", type: "income", amount: 209.3, frequency: "monthly", day: 10, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Familie", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r11", title: "Rückzahlung Dolbilov", type: "income", amount: 750, frequency: "everyOtherMonth", day: 5, weekday: 1, startMonth: "2026-04", endMonth: "2027-02", category: "Privatkredit", account: "Hauptkonto", note: "alle 2 Monate", months: [] },
  { id: "r12", title: "Kredit Haus", type: "expense", amount: 1250, frequency: "monthly", day: 3, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Wohnen", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r13", title: "Kredit Wohnung", type: "expense", amount: 580, frequency: "monthly", day: 3, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Wohnen", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r14", title: "Betriebskosten Wohnung", type: "expense", amount: 245, frequency: "monthly", day: 3, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Wohnen", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r15", title: "Heizung Wohnung", type: "expense", amount: 90, frequency: "monthly", day: 3, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Wohnen", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r16", title: "Strom Haus", type: "expense", amount: 325, frequency: "monthly", day: 12, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Haus", account: "Hauptkonto", note: "Ø aus 3.900/Jahr", months: [] },
  { id: "r17", title: "BK Haus", type: "expense", amount: 166.67, frequency: "monthly", day: 12, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Haus", account: "Hauptkonto", note: "Rücklage", months: [] },
  { id: "r18", title: "Versicherung E-Golf", type: "expense", amount: 70, frequency: "monthly", day: 8, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Auto", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r19", title: "Pickerl E-Golf", type: "expense", amount: 700, frequency: "customMonths", months: ["2026-04"], day: 8, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Auto", account: "Hauptkonto", note: "einmalig April" },
  { id: "r20", title: "Eigenheimversicherung", type: "expense", amount: 90, frequency: "monthly", day: 8, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Versicherung", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r21", title: "Ablebensversicherung", type: "expense", amount: 34, frequency: "monthly", day: 8, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Versicherung", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r22", title: "Fitness", type: "expense", amount: 34, frequency: "monthly", day: 8, weekday: 1, startMonth: "2026-04", endMonth: "2026-12", category: "Freizeit", account: "Hauptkonto", note: "endet 31.12.2026", months: [] },
  { id: "r23", title: "Handy + Internet", type: "expense", amount: 110, frequency: "monthly", day: 15, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Kommunikation", account: "Hauptkonto", note: "monatlich", months: [] },
  { id: "r24", title: "SVS Rückzahlung", type: "expense", amount: 85, frequency: "monthly", day: 15, weekday: 1, startMonth: "2026-04", endMonth: "2026-10", category: "Versicherung", account: "Hauptkonto", note: "bis Oktober 2026", months: [] },
  { id: "r25", title: "Haushaltskonto", type: "expense", amount: 530, frequency: "weekly", weekday: 1, day: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Lebensmittel", account: "Haushaltskonto", note: "wöchentlich", months: [] },
  { id: "r26", title: "Quartalszinsen Konto 1", type: "expense", amount: 356.25, frequency: "customMonths", months: ["2026-06", "2026-09", "2026-12"], day: 30, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Zinsen", account: "Konto 1", note: "Modellwert" },
  { id: "r27", title: "Quartalszinsen Konto 2", type: "expense", amount: 30, frequency: "customMonths", months: ["2026-06"], day: 30, weekday: 1, startMonth: "2026-04", endMonth: "2027-03", category: "Zinsen", account: "Konto 2", note: "Modellwert" },
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

function signedAmount(type, amount) {
  return type === "income" ? Number(amount || 0) : -Number(amount || 0);
}

function describeFrequency(rule) {
  if (rule.frequency === "monthly") return `monatlich am ${rule.day}.`;
  if (rule.frequency === "weekly") return `wöchentlich am ${weekdayLabel(rule.weekday)}`;
  if (rule.frequency === "everyOtherMonth") return `alle 2 Monate am ${rule.day}.`;
  if (rule.frequency === "customMonths") return `in Monaten: ${(rule.months || []).join(", ")}`;
  return rule.frequency;
}

function weekdayLabel(value) {
  const names = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  return names[Number(value)] || "Montag";
}

function normalizeRule(rule) {
  return {
    ...rule,
    amount: Number(rule.amount || 0),
    day: Number(rule.day || 1),
    weekday: Number(rule.weekday ?? 1),
    months: Array.isArray(rule.months) ? rule.months : [],
  };
}

function emptyForm(currentMonth, planningEnd) {
  return {
    id: null,
    title: "",
    type: "expense",
    amount: "",
    frequency: "monthly",
    day: 1,
    weekday: 1,
    startMonth: currentMonth,
    endMonth: planningEnd,
    category: "Sonstiges",
    account: "Hauptkonto",
    note: "",
    customMonthsText: "",
  };
}

function ruleToForm(rule) {
  return {
    id: rule.id,
    title: rule.title,
    type: rule.type,
    amount: String(rule.amount),
    frequency: rule.frequency,
    day: rule.day ?? 1,
    weekday: rule.weekday ?? 1,
    startMonth: rule.startMonth,
    endMonth: rule.endMonth,
    category: rule.category,
    account: rule.account,
    note: rule.note || "",
    customMonthsText: (rule.months || []).join(", "),
  };
}

function formToRule(form) {
  return normalizeRule({
    id: form.id || uid("rule"),
    title: form.title.trim(),
    type: form.type,
    amount: Number(form.amount),
    frequency: form.frequency,
    day: Number(form.day || 1),
    weekday: Number(form.weekday || 1),
    startMonth: form.startMonth,
    endMonth: form.endMonth,
    category: form.category.trim() || "Sonstiges",
    account: form.account.trim() || "Hauptkonto",
    note: form.note || "",
    months: form.frequency === "customMonths"
      ? form.customMonthsText.split(",").map((x) => x.trim()).filter(Boolean)
      : [],
  });
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

function BarChart({ title, subtitle, items, positiveColor = "#1d4ed8", negativeColor = "#dc2626" }) {
  const max = Math.max(...items.map((item) => Math.abs(item.value)), 1);
  return (
    <Card title={title} subtitle={subtitle}>
      {items.length === 0 ? <div style={styles.smallText}>Keine Daten vorhanden.</div> : null}
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((item) => {
          const width = `${(Math.abs(item.value) / max) * 100}%`;
          const color = item.value >= 0 ? positiveColor : negativeColor;
          return (
            <div key={item.label}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 5 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{item.label}</div>
                <div style={{ fontSize: 13 }}>{typeof item.formatter === "function" ? item.formatter(item.value) : formatCurrency(item.value)}</div>
              </div>
              <div style={{ height: 12, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width, height: 12, background: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function App() {
  const [app, setApp] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedState;
  });
  const [tab, setTab] = useState("dashboard");
  const [selectedMonth, setSelectedMonth] = useState(app.appSettings.currentMonth);
  const [ruleForm, setRuleForm] = useState(() => emptyForm(app.appSettings.currentMonth, app.appSettings.planningEnd));
  const [manualForm, setManualForm] = useState({
    title: "",
    type: "expense",
    amount: "",
    category: "Sonstiges",
    account: "Hauptkonto",
    note: "",
    date: createDate(app.appSettings.currentMonth, 15),
  });

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(app));
  }, [app]);

  useEffect(() => {
    setManualForm((prev) => ({ ...prev, date: createDate(selectedMonth, 15) }));
  }, [selectedMonth]);

  const months = useMemo(() => monthRange(app.appSettings.currentMonth, app.appSettings.planningEnd), [app.appSettings.currentMonth, app.appSettings.planningEnd]);

  const transactions = useMemo(() => {
    const fromRules = app.rules.flatMap((rule) => expandRule(normalizeRule(rule), months));
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

  const dueThisWeek = transactions.filter((tx) => {
    const d = new Date(tx.date);
    const diff = (d - today) / (1000 * 60 * 60 * 24);
    return diff >= -1 && diff <= 7 && statusForTransaction(tx, app.confirmed, todayStr) !== "bestätigt";
  });

  const openTxs = monthTxs.filter((tx) => statusForTransaction(tx, app.confirmed, todayStr) !== "bestätigt");
  const totalDebt = sum(app.debtAccounts, (d) => Math.abs(d.balance));

  const expenseByCategory = useMemo(() => {
    const map = new Map();
    monthTxs.filter((tx) => tx.type === "expense").forEach((tx) => {
      const current = map.get(tx.category) || 0;
      map.set(tx.category, current + getActualOrPlanned(tx, app.confirmed));
    });
    return [...map.entries()]
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }, [monthTxs, app.confirmed]);

  const monthlyNetBars = useMemo(() => {
    return monthlyViews.map((row) => ({ label: prettyMonth(row.month), value: row.net }));
  }, [monthlyViews]);

  const varianceData = useMemo(() => {
    const relevant = monthTxs.filter((tx) => app.confirmed[tx.id] || statusForTransaction(tx, app.confirmed, todayStr) === "überfällig");
    const rows = relevant.map((tx) => {
      const status = statusForTransaction(tx, app.confirmed, todayStr);
      const planned = signedAmount(tx.type, tx.plannedAmount);
      const actualValue = app.confirmed[tx.id]?.status === "confirmed"
        ? signedAmount(tx.type, app.confirmed[tx.id]?.actualAmount ?? tx.plannedAmount)
        : app.confirmed[tx.id]?.status === "skipped"
          ? 0
          : planned;
      const variance = actualValue - planned;
      return { ...tx, status, plannedSigned: planned, actualSigned: actualValue, variance };
    });
    const totalVariance = sum(rows, (row) => row.variance);
    const overdueIncomes = rows.filter((row) => row.status === "überfällig" && row.type === "income");
    const remainingHousehold = monthTxs.filter((tx) => tx.category === "Lebensmittel" && !app.confirmed[tx.id]);
    return { rows, totalVariance, overdueIncomes, remainingHouseholdCount: remainingHousehold.length };
  }, [monthTxs, app.confirmed, todayStr]);

  function recommendationText() {
    const diff = varianceData.totalVariance;
    if (diff < 0) {
      const perRemaining = varianceData.remainingHouseholdCount > 0 ? Math.abs(diff) / varianceData.remainingHouseholdCount : Math.abs(diff);
      return `Du liegst aktuell ${formatCurrency(Math.abs(diff))} unter Plan. Markiere ausfallende Einnahmen mit „Skip“ oder Betrag 0. Empfehlung: Haushaltskonto für die verbleibenden Wochen um ca. ${formatCurrency(perRemaining)} je Auszahlung senken oder denselben Betrag aus Reserve/Sondertilgung herausnehmen.`;
    }
    if (diff > 0) {
      return `Du liegst aktuell ${formatCurrency(diff)} über Plan. Empfehlung: den Überschuss direkt als Sondertilgung auf Konto 2 und danach Konto 1 verwenden oder als Reserve stehen lassen.`;
    }
    return "Du liegst aktuell im Plan. Sobald du Abweichungen bestätigst oder überspringst, passt sich die Prognose automatisch an.";
  }

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
    setRuleForm(emptyForm(seedState.appSettings.currentMonth, seedState.appSettings.planningEnd));
  }

  function startEditRule(rule) {
    setRuleForm(ruleToForm(normalizeRule(rule)));
    setTab("regeln");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelRuleEdit() {
    setRuleForm(emptyForm(app.appSettings.currentMonth, app.appSettings.planningEnd));
  }

  function saveRule(e) {
    e.preventDefault();
    const rule = formToRule(ruleForm);
    if (!rule.title) return;
    setApp((prev) => {
      const exists = prev.rules.some((r) => r.id === rule.id);
      return {
        ...prev,
        rules: exists ? prev.rules.map((r) => (r.id === rule.id ? rule : r)) : [...prev.rules, rule],
      };
    });
    cancelRuleEdit();
  }

  function deleteRule(ruleId) {
    if (!window.confirm("Regel löschen?")) return;
    setApp((prev) => ({ ...prev, rules: prev.rules.filter((r) => r.id !== ruleId) }));
    if (ruleForm.id === ruleId) cancelRuleEdit();
  }

  function addManualTransaction(e) {
    e.preventDefault();
    const tx = {
      id: uid("manual"),
      ruleId: null,
      month: manualForm.date.slice(0, 7),
      date: manualForm.date,
      title: manualForm.title,
      type: manualForm.type,
      plannedAmount: Number(manualForm.amount),
      actualAmount: null,
      category: manualForm.category,
      account: manualForm.account,
      note: manualForm.note,
      source: "manual",
    };
    setApp((prev) => ({ ...prev, manualTransactions: [...prev.manualTransactions, tx] }));
    setManualForm({ ...manualForm, title: "", amount: "", note: "", date: createDate(selectedMonth, 15) });
  }

  function ActionButtons({ tx }) {
    return (
      <div style={styles.actionWrap}>
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
            <div style={styles.subtitle}>Mit Bearbeiten von Regeln, Diagrammen und dynamischer Planabweichung.</div>
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
            <button key={key} style={tab === key ? { ...styles.tab, ...styles.tabActive } : styles.tab} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && (
          <div style={{ display: "grid", gap: 16 }}>
            <div style={styles.grid4}>
              <Metric label="Einnahmen im Monat" value={formatCurrency(monthView?.incomeSum || 0)} hint={prettyMonth(selectedMonth)} />
              <Metric label="Ausgaben im Monat" value={formatCurrency(monthView?.expenseSum || 0)} hint={prettyMonth(selectedMonth)} />
              <Metric label="Monatssaldo" value={formatCurrency(monthView?.net || 0)} hint="passt sich mit Ist-Werten an" />
              <Metric label="Laufender Stand" value={formatCurrency(monthView?.runningCash || 0)} hint="kumuliert ab Start" />
            </div>

            <div style={styles.grid3}>
              <Card title="Planabweichung" subtitle="Reagiert auf bestätigte, übersprungene oder veränderte Beträge">
                <div style={{ ...styles.infoBox, marginBottom: 12 }}>
                  <div style={styles.smallText}>Abweichung im ausgewählten Monat</div>
                  <div style={{ fontSize: 30, fontWeight: 700, color: varianceData.totalVariance >= 0 ? "#166534" : "#b91c1c" }}>
                    {formatCurrency(varianceData.totalVariance)}
                  </div>
                </div>
                <div style={styles.smallText}>{recommendationText()}</div>
                {varianceData.overdueIncomes.length > 0 ? (
                  <div style={{ marginTop: 12, ...styles.smallText }}>
                    Überfällige Einnahmen werden noch als geplant gezählt, bis du sie mit „Skip“ oder Betrag 0 bestätigst.
                  </div>
                ) : null}
              </Card>

              <Card title="Heute zu tun" subtitle="Offene oder bald fällige Buchungen">
                {dueThisWeek.length === 0 ? <div style={styles.smallText}>Keine offenen Buchungen in den nächsten 7 Tagen.</div> : null}
                {dueThisWeek.slice(0, 4).map((tx) => {
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
                      <ActionButtons tx={tx} />
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

            <div style={styles.grid2}>
              <BarChart title="Ausgaben nach Kategorie" subtitle={prettyMonth(selectedMonth)} items={expenseByCategory} positiveColor="#1d4ed8" negativeColor="#1d4ed8" />
              <BarChart title="Monatssalden im Verlauf" subtitle="Positiv = Überschuss, negativ = Defizit" items={monthlyNetBars} positiveColor="#16a34a" negativeColor="#dc2626" />
            </div>

            <Card title="Monatsvorschau" subtitle="Der laufende Stand ändert sich automatisch, sobald du Ist-Werte bestätigst">
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
          <Card title="Heute & Fälligkeiten" subtitle="Wenn eine Einnahme ausfällt: auf Skip oder Betrag 0 setzen, dann rechnet die Prognose neu">
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
                    <ActionButtons tx={tx} />
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {tab === "regeln" && (
          <div style={styles.grid2}>
            <Card title="Wiederkehrende Regeln" subtitle="Jetzt mit Bearbeiten, Umbenennen und Fälligkeiten ändern">
              {app.rules.map((rule) => (
                <div key={rule.id} style={styles.itemBox}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{rule.title}</div>
                      <div style={styles.smallText}>{rule.type === "income" ? "Einnahme" : "Ausgabe"} · {formatCurrency(rule.amount)} · {describeFrequency(rule)}</div>
                      <div style={styles.smallText}>{rule.category} · {rule.startMonth} bis {rule.endMonth}</div>
                    </div>
                    <div style={styles.row}>
                      <button style={{ ...styles.button, ...styles.buttonSoft }} onClick={() => startEditRule(rule)}>Bearbeiten</button>
                      <button style={styles.button} onClick={() => deleteRule(rule.id)}>Löschen</button>
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            <Card title={ruleForm.id ? "Regel bearbeiten" : "Neue Regel"} subtitle={ruleForm.id ? "Bestehende Regel ändern und speichern" : "Fixe oder wiederkehrende Zahlungen hinzufügen"}>
              <form onSubmit={saveRule}>
                <div style={{ display: "grid", gap: 10 }}>
                  <input style={styles.input} value={ruleForm.title} onChange={(e) => setRuleForm({ ...ruleForm, title: e.target.value })} placeholder="Bezeichnung" required />
                  <div style={styles.grid2}>
                    <select style={styles.input} value={ruleForm.type} onChange={(e) => setRuleForm({ ...ruleForm, type: e.target.value })}>
                      <option value="income">Einnahme</option>
                      <option value="expense">Ausgabe</option>
                    </select>
                    <input style={styles.input} type="number" step="0.01" value={ruleForm.amount} onChange={(e) => setRuleForm({ ...ruleForm, amount: e.target.value })} placeholder="Betrag" required />
                  </div>
                  <div style={styles.grid2}>
                    <select style={styles.input} value={ruleForm.frequency} onChange={(e) => setRuleForm({ ...ruleForm, frequency: e.target.value })}>
                      <option value="monthly">Monatlich</option>
                      <option value="weekly">Wöchentlich</option>
                      <option value="everyOtherMonth">Alle 2 Monate</option>
                      <option value="customMonths">Bestimmte Monate</option>
                    </select>
                    {ruleForm.frequency === "weekly" ? (
                      <select style={styles.input} value={ruleForm.weekday} onChange={(e) => setRuleForm({ ...ruleForm, weekday: e.target.value })}>
                        <option value="1">Montag</option>
                        <option value="2">Dienstag</option>
                        <option value="3">Mittwoch</option>
                        <option value="4">Donnerstag</option>
                        <option value="5">Freitag</option>
                        <option value="6">Samstag</option>
                        <option value="0">Sonntag</option>
                      </select>
                    ) : (
                      <input style={styles.input} type="number" min="1" max="31" value={ruleForm.day} onChange={(e) => setRuleForm({ ...ruleForm, day: e.target.value })} placeholder="Tag im Monat" />
                    )}
                  </div>
                  {ruleForm.frequency === "customMonths" ? (
                    <input style={styles.input} value={ruleForm.customMonthsText} onChange={(e) => setRuleForm({ ...ruleForm, customMonthsText: e.target.value })} placeholder="Monate, z. B. 2026-06, 2026-12" />
                  ) : null}
                  <div style={styles.grid2}>
                    <input style={styles.input} value={ruleForm.category} onChange={(e) => setRuleForm({ ...ruleForm, category: e.target.value })} placeholder="Kategorie" />
                    <input style={styles.input} value={ruleForm.account} onChange={(e) => setRuleForm({ ...ruleForm, account: e.target.value })} placeholder="Konto" />
                  </div>
                  <div style={styles.grid2}>
                    <input style={styles.input} type="month" value={ruleForm.startMonth} onChange={(e) => setRuleForm({ ...ruleForm, startMonth: e.target.value })} />
                    <input style={styles.input} type="month" value={ruleForm.endMonth} onChange={(e) => setRuleForm({ ...ruleForm, endMonth: e.target.value })} />
                  </div>
                  <textarea style={styles.input} rows={3} value={ruleForm.note} onChange={(e) => setRuleForm({ ...ruleForm, note: e.target.value })} placeholder="Notiz" />
                  <div style={styles.row}>
                    <button style={{ ...styles.button, ...styles.buttonDark }} type="submit">{ruleForm.id ? "Änderungen speichern" : "Regel speichern"}</button>
                    {ruleForm.id ? <button type="button" style={styles.button} onClick={cancelRuleEdit}>Abbrechen</button> : null}
                  </div>
                </div>
              </form>
            </Card>
          </div>
        )}

        {tab === "buchung" && (
          <div style={styles.grid2}>
            <Card title="Manuelle Buchung" subtitle="Für spontane Einnahmen oder Ausgaben. Diese beeinflussen die Prognose sofort.">
              <form onSubmit={addManualTransaction}>
                <div style={{ display: "grid", gap: 10 }}>
                  <input style={styles.input} value={manualForm.title} onChange={(e) => setManualForm({ ...manualForm, title: e.target.value })} placeholder="Bezeichnung" required />
                  <div style={styles.grid2}>
                    <select style={styles.input} value={manualForm.type} onChange={(e) => setManualForm({ ...manualForm, type: e.target.value })}>
                      <option value="expense">Ausgabe</option>
                      <option value="income">Einnahme</option>
                    </select>
                    <input style={styles.input} type="number" step="0.01" value={manualForm.amount} onChange={(e) => setManualForm({ ...manualForm, amount: e.target.value })} placeholder="Betrag" required />
                  </div>
                  <div style={styles.grid2}>
                    <input style={styles.input} type="date" value={manualForm.date} onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })} />
                    <input style={styles.input} value={manualForm.category} onChange={(e) => setManualForm({ ...manualForm, category: e.target.value })} placeholder="Kategorie" />
                  </div>
                  <input style={styles.input} value={manualForm.account} onChange={(e) => setManualForm({ ...manualForm, account: e.target.value })} placeholder="Konto" />
                  <textarea style={styles.input} rows={3} value={manualForm.note} onChange={(e) => setManualForm({ ...manualForm, note: e.target.value })} placeholder="Notiz" />
                  <button style={{ ...styles.button, ...styles.buttonDark }} type="submit">Buchung anlegen</button>
                </div>
              </form>
            </Card>

            <Card title="Wie die dynamische Anpassung funktioniert" subtitle="Einfach und alltagstauglich">
              <div style={{ lineHeight: 1.7 }}>
                <div>1. Geplante Werte kommen aus deinen Regeln.</div>
                <div>2. Wenn etwas anders kommt, bestätigst du es mit „Betrag“ oder „Skip“.</div>
                <div>3. Dadurch ändern sich Monatssaldo, Diagramme und laufender Stand automatisch.</div>
                <div>4. Fällt Dolbilov aus, markierst du den Eingang als Skip oder 0.</div>
                <div>5. Kommt eine hohe Extra-Einnahme, trägst du sie hier als manuelle Einnahme ein.</div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
