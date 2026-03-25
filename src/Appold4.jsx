import { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabase";

const UI_STORAGE_KEY = "cashflow-ui-v6";

const texts = {
  de: {
    appTitle: "Cashflow-App",
    appSubtitle: "Mobile first für Schuldenabbau, Tagesbuchungen und Monatsplanung.",
    login: "Einloggen",
    logout: "Ausloggen",
    email: "E-Mail",
    password: "Passwort",
    loading: "Lade ...",
    notLoggedIn: "Nicht eingeloggt",
    loginRunning: "Login läuft ...",
    loggedIn: "Erfolgreich eingeloggt",
    today: "Heute",
    plan: "Plan",
    book: "Buchen",
    debt: "Schulden",
    rules: "Regeln",
    settings: "Einstellungen",
    month: "Monat",
    role: "Rolle",
    owner: "Inhaber",
    viewer: "Nur Ansicht",
    unknown: "unbekannt",
    household: "Haushalt",
    status: "Status",
    amount: "Betrag",
    actualAmount: "Tatsächlicher Betrag",
    actualDate: "Tatsächliches Datum",
    title: "Bezeichnung",
    type: "Typ",
    income: "Einnahme",
    expense: "Ausgabe",
    category: "Kategorie",
    account: "Konto",
    note: "Notiz",
    save: "Speichern",
    saving: "Speichere ...",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    skip: "Überspringen",
    editAmount: "Anpassen",
    undoConfirm: "Zurücknehmen",
    reopen: "Wieder öffnen",
    open: "geplant",
    confirmed: "bestätigt",
    skipped: "übersprungen",
    overdue: "überfällig",
    upcoming: "anstehend",
    todayDue: "heute fällig",
    next7Days: "Nächste 7 Tage",
    overdueItems: "Überfällig",
    noTasks: "Keine offenen Buchungen in diesem Bereich.",
    monthlyIncome: "Einnahmen im Monat",
    monthlyExpense: "Ausgaben im Monat",
    monthlyNet: "Monatssaldo",
    reserveEnd: "Reserve Monatsende",
    totalDebt: "Restschuld Monatsende",
    availableBeforeDebt: "Verfügbar vor Tilgung",
    paymentToDebt: "Tilgung gesamt",
    planOverview: "Monatsplan",
    bookNow: "Manuelle Buchung",
    addBooking: "Buchung anlegen",
    ruleSaved: "Regel gespeichert.",
    ruleDeleted: "Regel gelöscht.",
    bookingSaved: "Buchung gespeichert.",
    bookingActionSaved: "Buchung aktualisiert.",
    bookingUndone: "Bestätigung zurückgenommen.",
    bookingReopened: "Buchung wieder geöffnet.",
    rulesLoaded: "Daten geladen.",
    onlyOwner: "Nur der Inhaber darf Änderungen machen.",
    mobileHint: "Für Handy optimiert: Karten, große Buttons, kurze Wege.",
    settingsTitle: "Darstellung & Sprache",
    language: "Sprache",
    theme: "Thema",
    light: "Tag",
    dark: "Nacht",
    familyPhotos: "Bilder",
    me: "Ich",
    wife: "Meine Frau",
    uploadImage: "Bild hochladen",
    removeImage: "Bild entfernen",
    chooseRule: "Bitte Regel auswählen",
    newRule: "Neue Regel",
    editRule: "Regel bearbeiten",
    deleteRule: "Löschen",
    frequency: "Rhythmus",
    monthly: "Monatlich",
    weekly: "Wöchentlich",
    everyOtherMonth: "Alle 2 Monate",
    customMonths: "Bestimmte Monate",
    dayOfMonth: "Tag im Monat",
    weekday: "Wochentag",
    customMonthsHint: "z. B. 2026-06, 2026-12",
    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samstag",
    sunday: "Sonntag",
    debtAccounts: "Schuldenkonten",
    debtPlan: "Tilgungsplan",
    noData: "Keine Daten vorhanden.",
    user: "Benutzer",
    planned: "Geplant",
    actual: "Tatsächlich",
    planVsActual: "Plan vs. Tatsächlich",
    plannedIncome: "Geplante Einnahmen",
    plannedExpense: "Geplante Ausgaben",
    plannedNet: "Geplanter Saldo",
    actualIncome: "Tatsächliche Einnahmen",
    actualExpense: "Tatsächliche Ausgaben",
    actualNet: "Tatsächlicher Saldo",
    expensesList: "Ausgaben",
    incomeList: "Einnahmen",
    actionEditor: "Buchung anpassen",
    quickConfirm: "Schnell bestätigen",
    headerSettings: "Header anpassen",
    headerTitle: "Header-Titel",
    headerSubtitle: "Header-Untertitel",
    headerImage: "Header-Bild",
    currentTime: "Aktuelle Uhrzeit",
    showClock: "Uhrzeit anzeigen",
    exportMonthCsv: "Monat als CSV exportieren",
    exportAllCsv: "Alles als CSV exportieren",
    notifications: "Notifications",
    notificationsHint:
      "Browser-Berechtigung vorbereiten. Für echte Push-Notifications wäre später zusätzlich ein Service Worker sinnvoll.",
    enableNotifications: "Berechtigung anfragen",
    notificationStatus: "Status",
    allowed: "erlaubt",
    denied: "abgelehnt",
    defaultPermission: "noch nicht entschieden",
    unsupported: "nicht unterstützt",
    browserNotSupported: "Dieser Browser unterstützt Notifications nicht.",
    plusGreenHint: "Plus = positiv",
    minusRedHint: "Minus = Belastung",
    totalIncomeAll: "Einnahmen bis heute",
    totalExpenseAll: "Ausgaben bis heute",
    currentBalanceAll: "Saldo bis heute",
    selectedMonthLabel: "Aktueller Monat",
    tillToday: "Kumuliert bis heute",
    start: "Start",
    interest: "Zinsen",
    end: "Ende",
  },
};

const palettes = {
  light: {
    bg: "#eef3fb",
    panel: "#ffffff",
    panelSoft: "#f7faff",
    border: "#d9e3f0",
    text: "#12233f",
    sub: "#6b7d99",
    accent: "#2858ff",
    accentSoft: "#e8efff",
    success: "#1f9d62",
    danger: "#e23a3a",
    warning: "#cf8a00",
    shadow: "0 14px 30px rgba(16,35,63,0.08)",
    gradient: "linear-gradient(135deg, #2858ff 0%, #6d8bff 100%)",
  },
  dark: {
    bg: "#071120",
    panel: "#0f1b2f",
    panelSoft: "#14243d",
    border: "#243753",
    text: "#eef4ff",
    sub: "#9caed0",
    accent: "#7e9cff",
    accentSoft: "#1a2a48",
    success: "#31d492",
    danger: "#ff7272",
    warning: "#ffbf5e",
    shadow: "0 14px 30px rgba(0,0,0,0.35)",
    gradient: "linear-gradient(135deg, #4e6fff 0%, #8ca4ff 100%)",
  },
};

const monthNames = {
  de: [
    "Jänner",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
};

const DEFAULT_UI = {
  lang: "de",
  theme: "light",
  profileMe: "",
  profileWife: "",
  headerTitle: "",
  headerSubtitle: "",
  headerImage: "",
  showClock: true,
};

function tr(lang, key) {
  return texts[lang]?.[key] || texts.de[key] || key;
}

function roleLabel(lang, role) {
  if (role === "owner") return tr(lang, "owner");
  if (role === "viewer") return tr(lang, "viewer");
  return tr(lang, "unknown");
}

function formatCurrency(value) {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value || 0));
}

function formatSignedCurrency(value, showPlus = false) {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    signDisplay: showPlus ? "always" : "auto",
  }).format(Number(value || 0));
}

function signedAmountForType(value, type) {
  const n = Math.abs(Number(value || 0));
  return type === "expense" ? -n : n;
}

function amountSignedFromType(type, value) {
  const n = Math.abs(Number(value || 0));
  return type === "expense" ? -n : n;
}

function formatMonth(month, lang) {
  const [y, m] = month.split("-").map(Number);
  return `${monthNames[lang]?.[m - 1] || monthNames.de[m - 1]} ${y}`;
}

function formatDate(value, lang) {
  if (!value) return "-";
  const d = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat(lang === "de" ? "de-AT" : "de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

function formatClock(value, lang) {
  return new Intl.DateTimeFormat(lang === "de" ? "de-AT" : "de-AT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(value);
}

function monthIndex(month) {
  const [y, m] = month.split("-").map(Number);
  return y * 12 + m;
}

function monthRange(startMonth, endMonth) {
  const result = [];
  const start = new Date(`${startMonth}-01T00:00:00`);
  const end = new Date(`${endMonth}-01T00:00:00`);
  const d = new Date(start);

  while (d <= end) {
    result.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
    d.setMonth(d.getMonth() + 1);
  }

  return result;
}

function monthDays(year, monthIndexZeroBased) {
  return new Date(year, monthIndexZeroBased + 1, 0).getDate();
}

function createDate(month, day) {
  const [y, m] = month.split("-").map(Number);
  const maxDay = monthDays(y, m - 1);
  return `${y}-${String(m).padStart(2, "0")}-${String(Math.min(Number(day || 1), maxDay)).padStart(2, "0")}`;
}

function dateKeyFromDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function datesForWeeklyInMonth(month, weekday) {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  const result = [];

  while (d.getMonth() === m - 1) {
    if (d.getDay() === Number(weekday)) {
      result.push(`${y}-${String(m).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    }
    d.setDate(d.getDate() + 1);
  }

  return result;
}

function normalizeMonths(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return value
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function ruleActiveInMonth(rule, month) {
  if (!rule.start_month || !rule.end_month) return true;
  return month >= rule.start_month && month <= rule.end_month;
}

function isEveryOtherMonthHit(rule, month) {
  if (!rule.start_month) return false;
  return (monthIndex(month) - monthIndex(rule.start_month)) % 2 === 0;
}

function buildPlannedOccurrences(rules, months) {
  const occurrences = [];

  for (const rule of rules) {
    for (const month of months) {
      if (!ruleActiveInMonth(rule, month)) continue;

      const base = {
        id: `${rule.id}_${month}`,
        key: null,
        rule_id: rule.id,
        month,
        title: rule.title,
        type: rule.type,
        planned_amount: Number(rule.amount || 0),
        category: rule.category || "Sonstiges",
        account: rule.account || "Hauptkonto",
        note: rule.note || "",
        source: "rule",
      };

      if (rule.frequency === "monthly") {
        const planned_date = createDate(month, rule.day || 1);
        occurrences.push({ ...base, key: `${rule.id}_${planned_date}`, planned_date });
      }

      if (rule.frequency === "weekly") {
        const dates = datesForWeeklyInMonth(month, rule.weekday ?? 1);
        dates.forEach((planned_date) => {
          occurrences.push({ ...base, key: `${rule.id}_${planned_date}`, planned_date });
        });
      }

      if (rule.frequency === "everyOtherMonth" && isEveryOtherMonthHit(rule, month)) {
        const planned_date = createDate(month, rule.day || 1);
        occurrences.push({ ...base, key: `${rule.id}_${planned_date}`, planned_date });
      }

      if (rule.frequency === "customMonths" && normalizeMonths(rule.months).includes(month)) {
        const planned_date = createDate(month, rule.day || 1);
        occurrences.push({ ...base, key: `${rule.id}_${planned_date}`, planned_date });
      }
    }
  }

  return occurrences.sort((a, b) => a.planned_date.localeCompare(b.planned_date));
}

function mapStatus(lang, statusKey) {
  const map = {
    open: tr(lang, "open"),
    confirmed: tr(lang, "confirmed"),
    skipped: tr(lang, "skipped"),
    overdue: tr(lang, "overdue"),
    upcoming: tr(lang, "upcoming"),
    today: tr(lang, "todayDue"),
  };
  return map[statusKey] || statusKey;
}

function inferOccurrenceStatus(item, todayStr) {
  if (item.status === "confirmed") return "confirmed";
  if (item.status === "skipped") return "skipped";
  if (item.planned_date < todayStr) return "overdue";
  if (item.planned_date === todayStr) return "today";
  return "open";
}

function mergePlannedWithActions(planned, actions) {
  const actionMap = new Map(actions.map((a) => [`${a.rule_id}_${a.planned_date}`, a]));

  return planned.map((occ) => {
    const action = actionMap.get(occ.key);

    if (!action) {
      return {
        ...occ,
        status: "open",
        actual_amount: null,
        actual_date: null,
        actual_note: "",
      };
    }

    return {
      ...occ,
      action_id: action.id,
      status: action.status,
      actual_amount: action.actual_amount,
      actual_date: action.actual_date,
      actual_note: action.actual_note || "",
      created_by: action.created_by,
    };
  });
}

function summarizeMonth(selectedMonth, plannedWithActions, journalEntries) {
  const monthPlanned = plannedWithActions.filter((x) => x.month === selectedMonth);
  const monthJournal = journalEntries.filter((x) => x.month_key === selectedMonth && !x.is_void);

  let plannedIncome = 0;
  let plannedExpense = 0;
  let actualIncome = 0;
  let actualExpense = 0;

  for (const item of monthPlanned) {
    const plannedAmount = Math.abs(Number(item.planned_amount || 0));
    if (item.type === "income") {
      if (item.status !== "skipped") plannedIncome += plannedAmount;
    } else {
      if (item.status !== "skipped") plannedExpense += plannedAmount;
    }
  }

  for (const j of monthJournal) {
    const signed = Number(j.amount_signed || 0);
    if (signed >= 0) actualIncome += Math.abs(signed);
    else actualExpense += Math.abs(signed);
  }

  const manualItems = monthJournal.filter((x) => x.source_kind === "manual_transaction");

  return {
    plannedIncome,
    plannedExpense,
    plannedNet: plannedIncome - plannedExpense,
    actualIncome,
    actualExpense,
    actualNet: actualIncome - actualExpense,
    plannedItems: monthPlanned,
    manualItems,
    journalItems: monthJournal,
  };
}

function isQuarterlyBookingMonth(month, cycle) {
  const m = Number(month.split("-")[1]);
  if (cycle === "monthly") return true;
  if (cycle === "yearly") return m === 12;
  return [3, 6, 9, 12].includes(m);
}

function round2(value) {
  return Math.round((Number(value || 0) + Number.EPSILON) * 100) / 100;
}

function buildDebtPlan(months, summariesByMonth, debtAccounts, currentMonth) {
  const activeAccounts = [...debtAccounts]
    .filter((x) => x.is_active)
    .sort((a, b) => Number(a.payoff_priority || 999) - Number(b.payoff_priority || 999));

  const running = new Map(
    activeAccounts.map((acc) => [
      acc.id,
      {
        principal: Number(acc.start_balance || 0),
        accrued: 0,
      },
    ])
  );

  let reserve = 0;

  return months.map((month) => {
    const summary = summariesByMonth[month] || {
      plannedNet: 0,
      actualNet: 0,
    };

    const reserveStart = reserve;
    const baseNet = month <= currentMonth ? Number(summary.actualNet || 0) : Number(summary.plannedNet || 0);
    let available = round2(reserveStart + baseNet);
    const perAccount = [];

    for (const acc of activeAccounts) {
      const state = running.get(acc.id);
      const principalStart = round2(state.principal);
      const accruedStart = round2(state.accrued);
      const monthlyInterest = round2(principalStart * Number(acc.annual_interest_rate || 0) / 12);
      const bookedInterest = isQuarterlyBookingMonth(month, acc.interest_booking_cycle)
        ? round2(accruedStart + monthlyInterest)
        : 0;

      const payable = round2(principalStart + bookedInterest);
      const payment = round2(Math.max(0, Math.min(available, payable)));
      const principalEnd = round2(Math.max(0, principalStart + bookedInterest - payment));
      const accruedEnd = bookedInterest > 0 ? 0 : round2(accruedStart + monthlyInterest);

      available = round2(available - payment);
      running.set(acc.id, { principal: principalEnd, accrued: accruedEnd });

      perAccount.push({
        id: acc.id,
        name: acc.name,
        priority: acc.payoff_priority,
        principalStart,
        accruedStart,
        monthlyInterest,
        bookedInterest,
        payment,
        principalEnd,
        accruedEnd,
        totalEnd: round2(principalEnd + accruedEnd),
      });
    }

    reserve = round2(Math.max(0, available));

    return {
      month,
      summary,
      reserveStart,
      availableBeforeDebt: round2(reserveStart + baseNet),
      totalDebt: round2(perAccount.reduce((sum, x) => sum + x.totalEnd, 0)),
      totalPayment: round2(perAccount.reduce((sum, x) => sum + x.payment, 0)),
      reserve,
      perAccount,
    };
  });
}

function emptyRuleForm(defaultMonth) {
  return {
    id: null,
    title: "",
    type: "expense",
    amount: "",
    frequency: "monthly",
    day: 1,
    weekday: 1,
    start_month: defaultMonth,
    end_month: defaultMonth,
    category: "Sonstiges",
    account: "Hauptkonto",
    note: "",
    customMonthsText: "",
  };
}

function ruleToForm(rule) {
  return {
    id: rule.id,
    title: rule.title || "",
    type: rule.type || "expense",
    amount: String(rule.amount ?? ""),
    frequency: rule.frequency || "monthly",
    day: rule.day ?? 1,
    weekday: rule.weekday ?? 1,
    start_month: rule.start_month || "2026-04",
    end_month: rule.end_month || "2027-03",
    category: rule.category || "Sonstiges",
    account: rule.account || "Hauptkonto",
    note: rule.note || "",
    customMonthsText: normalizeMonths(rule.months).join(", "),
  };
}

function formToRulePayload(form, householdId) {
  return {
    household_id: householdId,
    title: form.title.trim(),
    type: form.type,
    amount: Number(form.amount),
    frequency: form.frequency,
    day: form.frequency === "weekly" ? null : Number(form.day || 1),
    weekday: form.frequency === "weekly" ? Number(form.weekday || 1) : null,
    start_month: form.start_month,
    end_month: form.end_month,
    category: form.category.trim() || "Sonstiges",
    account: form.account.trim() || "Hauptkonto",
    note: form.note || "",
    months:
      form.frequency === "customMonths"
        ? form.customMonthsText
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean)
        : [],
  };
}

function emptyManualForm(defaultMonth) {
  return {
    booking_date: createDate(defaultMonth, 15),
    title: "",
    type: "expense",
    amount: "",
    category: "Sonstiges",
    account: "Hauptkonto",
    note: "",
  };
}

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 390);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}

function useClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function escapeCsvValue(value) {
  const stringValue = String(value ?? "");
  if (stringValue.includes('"') || stringValue.includes(";") || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function downloadCsv(filename, rows) {
  const content = rows.map((row) => row.map(escapeCsvValue).join(";")).join("\n");
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function Section({ styles, title, subtitle, children, right }) {
  return (
    <div style={styles.card}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
        <div>
          <h2 style={styles.cardTitle}>{title}</h2>
          {subtitle ? <div style={styles.cardSubtitle}>{subtitle}</div> : null}
        </div>
        {right || null}
      </div>
      {children}
    </div>
  );
}

function MetricCard({ styles, label, value, hint, color }) {
  return (
    <div style={styles.metric}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={{ ...styles.metricValue, color: color || styles.metricValue.color }}>{value}</div>
      {hint ? <div style={styles.metricHint}>{hint}</div> : null}
    </div>
  );
}

function ComparisonBar({ styles, palette, label, planned, actual, lang, mode = "normal" }) {
  const max = Math.max(planned, actual, 1);
  const plannedWidth = `${(Math.abs(planned) / max) * 100}%`;
  const actualWidth = `${(Math.abs(actual) / max) * 100}%`;
  const plannedColor = mode === "expense" ? palette.danger : palette.accent;
  const actualColor = mode === "expense" ? palette.warning : palette.success;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13 }}>
        <strong>{label}</strong>
        <span>
          {formatCurrency(planned)} / {formatCurrency(actual)}
        </span>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <div>
          <div style={{ fontSize: 12, color: palette.sub, marginBottom: 4 }}>{tr(lang, "planned")}</div>
          <div style={styles.chartTrack}>
            <div style={{ width: plannedWidth, height: 12, background: plannedColor }} />
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, color: palette.sub, marginBottom: 4 }}>{tr(lang, "actual")}</div>
          <div style={styles.chartTrack}>
            <div style={{ width: actualWidth, height: 12, background: actualColor }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusChip({ styles, palette, label, statusKey }) {
  const colors = {
    confirmed: { bg: `${palette.success}22`, color: palette.success },
    skipped: { bg: palette.border, color: palette.sub },
    overdue: { bg: `${palette.danger}22`, color: palette.danger },
    today: { bg: `${palette.warning}22`, color: palette.warning },
    open: { bg: palette.accentSoft, color: palette.accent },
  };

  const c = colors[statusKey] || colors.open;
  return <div style={{ ...styles.chip, background: c.bg, color: c.color }}>{label}</div>;
}

function BookingCard({
  styles,
  palette,
  lang,
  item,
  todayStr,
  isOwner,
  onConfirm,
  onEdit,
  onSkip,
  onUndoConfirm,
  onReopen,
  savingActionKey,
}) {
  const visualStatus = inferOccurrenceStatus(item, todayStr);
  const signedPlanned = signedAmountForType(item.planned_amount, item.type);
  const signedActual =
    item.status === "confirmed"
      ? signedAmountForType(item.actual_amount, item.type)
      : item.status === "skipped"
        ? 0
        : null;

  const amountColor = item.type === "expense" ? palette.danger : palette.success;

  return (
    <div style={styles.bookingCard}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start" }}>
        <div>
          <div style={{ fontWeight: 800 }}>{item.title}</div>
          <div style={styles.subtle}>
            {formatDate(item.planned_date, lang)} · {item.type === "income" ? tr(lang, "income") : tr(lang, "expense")}
          </div>
          <div style={styles.subtle}>
            {item.category} · {item.account}
          </div>
        </div>

        <StatusChip
          styles={styles}
          palette={palette}
          statusKey={visualStatus}
          label={mapStatus(lang, visualStatus)}
        />
      </div>

      <div style={styles.grid2}>
        <div>
          <div style={styles.subtle}>{tr(lang, "planned")}</div>
          <div style={{ fontWeight: 800, color: amountColor }}>{formatSignedCurrency(signedPlanned, true)}</div>
        </div>
        <div>
          <div style={styles.subtle}>{tr(lang, "actual")}</div>
          <div style={{ fontWeight: 800, color: signedActual == null ? palette.text : amountColor }}>
            {signedActual == null ? "-" : formatSignedCurrency(signedActual, true)}
          </div>
        </div>
      </div>

      {item.actual_date || item.actual_note ? (
        <div style={styles.subtle}>
          {item.actual_date ? `${tr(lang, "actualDate")}: ${formatDate(item.actual_date, lang)}` : ""}
          {item.actual_date && item.actual_note ? " · " : ""}
          {item.actual_note || ""}
        </div>
      ) : null}

      {isOwner && item.source !== "manual" ? (
        <div style={styles.row}>
          {item.status === "open" ? (
            <>
              <button
                style={{ ...styles.button, ...styles.buttonPrimary }}
                onClick={() => onConfirm(item)}
                disabled={Boolean(savingActionKey)}
                type="button"
              >
                {savingActionKey === `${item.rule_id}_${item.planned_date}_confirm`
                  ? tr(lang, "saving")
                  : tr(lang, "quickConfirm")}
              </button>
              <button style={styles.button} onClick={() => onEdit(item)} type="button">
                {tr(lang, "editAmount")}
              </button>
              <button style={{ ...styles.button, ...styles.buttonDanger }} onClick={() => onSkip(item)} type="button">
                {tr(lang, "skip")}
              </button>
            </>
          ) : null}

          {item.status === "confirmed" ? (
            <>
              <button style={styles.button} onClick={() => onEdit(item)} type="button">
                {tr(lang, "editAmount")}
              </button>
              <button style={{ ...styles.button, ...styles.buttonDanger }} onClick={() => onUndoConfirm(item)} type="button">
                {tr(lang, "undoConfirm")}
              </button>
            </>
          ) : null}

          {item.status === "skipped" ? (
            <button style={styles.button} onClick={() => onReopen(item)} type="button">
              {tr(lang, "reopen")}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function ActionModal({
  styles,
  palette,
  lang,
  isOpen,
  item,
  form,
  setForm,
  onClose,
  onSave,
  saving,
}) {
  if (!isOpen || !item) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.42)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 14,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: palette.panel,
          border: `1px solid ${palette.border}`,
          borderRadius: 24,
          padding: 16,
          boxShadow: palette.shadow,
          display: "grid",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{tr(lang, "actionEditor")}</div>
          <div style={{ color: palette.sub, marginTop: 4 }}>{item.title}</div>
        </div>

        <div style={styles.grid2}>
          <div>
            <div style={styles.subtle}>{tr(lang, "amount")}</div>
            <div style={{ fontWeight: 800 }}>
              {formatSignedCurrency(signedAmountForType(item.planned_amount, item.type), true)}
            </div>
          </div>

          <div>
            <div style={styles.subtle}>{tr(lang, "actualDate")}</div>
            <div style={{ fontWeight: 800 }}>{formatDate(form.actual_date, lang)}</div>
          </div>
        </div>

        <input
          style={styles.input}
          type="number"
          step="0.01"
          value={form.actual_amount}
          onChange={(e) => setForm((prev) => ({ ...prev, actual_amount: e.target.value }))}
          placeholder={tr(lang, "actualAmount")}
        />

        <input
          style={styles.input}
          type="date"
          value={form.actual_date}
          onChange={(e) => setForm((prev) => ({ ...prev, actual_date: e.target.value }))}
        />

        <textarea
          style={styles.textarea}
          value={form.actual_note}
          onChange={(e) => setForm((prev) => ({ ...prev, actual_note: e.target.value }))}
          placeholder={tr(lang, "note")}
        />

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button type="button" style={styles.button} onClick={onClose}>
            {tr(lang, "cancel")}
          </button>
          <button type="button" style={{ ...styles.button, ...styles.buttonPrimary }} onClick={onSave} disabled={saving}>
            {saving ? tr(lang, "saving") : tr(lang, "save")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const width = useWindowWidth();
  const isSmall = width < 430;
  const now = useClock();

  const [ui, setUi] = useState(() => {
    try {
      if (typeof window === "undefined") return DEFAULT_UI;
      const raw = localStorage.getItem(UI_STORAGE_KEY);
      return raw ? { ...DEFAULT_UI, ...JSON.parse(raw) } : DEFAULT_UI;
    } catch {
      return DEFAULT_UI;
    }
  });

  const palette = palettes[ui.theme];
  const lang = ui.lang;

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(ui));
    }
  }, [ui]);

  const [tab, setTab] = useState("today");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [memberRole, setMemberRole] = useState(null);
  const [householdId, setHouseholdId] = useState(null);
  const [householdName, setHouseholdName] = useState("");

  const [rules, setRules] = useState([]);
  const [debtAccounts, setDebtAccounts] = useState([]);
  const [bookingActions, setBookingActions] = useState([]);
  const [manualTransactions, setManualTransactions] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [savingActionKey, setSavingActionKey] = useState("");
  const [message, setMessage] = useState(tr(lang, "notLoggedIn"));

  const [selectedMonth, setSelectedMonth] = useState("2026-04");
  const [selectedRuleId, setSelectedRuleId] = useState("");
  const [ruleForm, setRuleForm] = useState(() => emptyRuleForm("2026-04"));
  const [manualForm, setManualForm] = useState(() => emptyManualForm("2026-04"));

  const [actionEditorItem, setActionEditorItem] = useState(null);
  const [actionEditorForm, setActionEditorForm] = useState({
    actual_amount: "",
    actual_date: "",
    actual_note: "",
  });

  const [notificationPermission, setNotificationPermission] = useState(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "unsupported"
  );

  const isOwner = memberRole === "owner";
  const todayStr = dateKeyFromDate(now);
  const currentMonthKey = todayStr.slice(0, 7);

  const styles = useMemo(
    () => ({
      page: {
        minHeight: "100vh",
        background: palette.bg,
        color: palette.text,
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
        paddingBottom: 92,
      },
      container: { maxWidth: 560, margin: "0 auto", padding: isSmall ? 12 : 16 },
      hero: { display: "grid", gap: 12, marginBottom: 14 },
      heroCard: {
        background: palette.gradient,
        color: "#fff",
        borderRadius: 24,
        padding: isSmall ? 16 : 20,
        boxShadow: palette.shadow,
        position: "relative",
        overflow: "hidden",
      },
      heroImage: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: 0.22,
      },
      heroOverlay: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, rgba(10,20,50,0.35) 0%, rgba(10,20,50,0.12) 100%)",
      },
      heroTopRow: {
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        alignItems: "start",
      },
      heroStats: {
        marginTop: 16,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
      },
      heroStatCard: {
        background: "rgba(255,255,255,0.14)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 16,
        padding: 10,
        backdropFilter: "blur(6px)",
      },
      heroStatLabel: {
        fontSize: 11,
        color: "rgba(255,255,255,0.84)",
      },
      heroStatValue: {
        marginTop: 4,
        fontSize: isSmall ? 15 : 17,
        fontWeight: 800,
        color: "#fff",
        lineHeight: 1.15,
      },
      heroMetaRow: {
        display: "grid",
        gap: 6,
      },
      controlsCard: {
        background: palette.panel,
        border: `1px solid ${palette.border}`,
        borderRadius: 22,
        padding: 14,
        boxShadow: palette.shadow,
      },
      title: { margin: 0, fontSize: isSmall ? 28 : 34, lineHeight: 1.05, fontWeight: 800 },
      subtitle: { marginTop: 8, color: "rgba(255,255,255,0.9)", fontSize: 14, maxWidth: 360 },
      card: {
        background: palette.panel,
        border: `1px solid ${palette.border}`,
        borderRadius: 22,
        padding: 14,
        boxShadow: palette.shadow,
      },
      cardTitle: { margin: 0, fontSize: 20, fontWeight: 800 },
      cardSubtitle: { marginTop: 6, marginBottom: 12, color: palette.sub, fontSize: 13 },
      metrics: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
      metric: {
        background: palette.panelSoft,
        border: `1px solid ${palette.border}`,
        borderRadius: 18,
        padding: 14,
      },
      metricLabel: { fontSize: 12, color: palette.sub },
      metricValue: { marginTop: 6, fontSize: 22, fontWeight: 800 },
      metricHint: { marginTop: 6, fontSize: 12, color: palette.sub },
      input: {
        width: "100%",
        padding: "12px 14px",
        borderRadius: 16,
        border: `1px solid ${palette.border}`,
        background: palette.panelSoft,
        color: palette.text,
        boxSizing: "border-box",
        fontSize: 15,
      },
      textarea: {
        width: "100%",
        padding: "12px 14px",
        borderRadius: 16,
        border: `1px solid ${palette.border}`,
        background: palette.panelSoft,
        color: palette.text,
        boxSizing: "border-box",
        fontSize: 15,
        minHeight: 90,
        resize: "vertical",
      },
      button: {
        padding: "12px 14px",
        borderRadius: 16,
        border: `1px solid ${palette.border}`,
        background: palette.panel,
        color: palette.text,
        fontWeight: 700,
        cursor: "pointer",
      },
      buttonPrimary: {
        background: palette.text,
        color: palette.panel,
        border: `1px solid ${palette.text}`,
      },
      buttonDanger: {
        background: palette.danger,
        color: "#fff",
        border: `1px solid ${palette.danger}`,
      },
      buttonSoft: {
        background: palette.accentSoft,
        color: palette.accent,
        border: `1px solid ${palette.border}`,
      },
      row: { display: "flex", gap: 8, flexWrap: "wrap" },
      grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
      subtle: { color: palette.sub, fontSize: 13 },
      chip: {
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
      },
      bookingCard: {
        background: palette.panelSoft,
        border: `1px solid ${palette.border}`,
        borderRadius: 18,
        padding: 14,
        display: "grid",
        gap: 10,
      },
      avatar: {
        width: 54,
        height: 54,
        borderRadius: "50%",
        objectFit: "cover",
        border: `2px solid rgba(255,255,255,0.35)`,
      },
      avatarFallback: {
        width: 54,
        height: 54,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.18)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 800,
        border: `2px solid rgba(255,255,255,0.35)`,
      },
      bottomNav: {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        background: palette.panel,
        borderTop: `1px solid ${palette.border}`,
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 6,
        padding: "10px 8px calc(10px + env(safe-area-inset-bottom))",
      },
      navButton: {
        background: "transparent",
        border: "none",
        color: palette.sub,
        fontWeight: 700,
        fontSize: 11,
        padding: 8,
        borderRadius: 12,
        cursor: "pointer",
      },
      navButtonActive: {
        background: palette.accentSoft,
        color: palette.accent,
      },
      chartTrack: {
        height: 12,
        background: palette.border,
        borderRadius: 999,
        overflow: "hidden",
      },
    }),
    [palette, isSmall]
  );

  useEffect(() => {
    let alive = true;

    function resetAppState() {
      setProfile(null);
      setMemberRole(null);
      setHouseholdId(null);
      setHouseholdName("");
      setRules([]);
      setDebtAccounts([]);
      setBookingActions([]);
      setManualTransactions([]);
      setJournalEntries([]);
      setSelectedRuleId("");
      setRuleForm(emptyRuleForm("2026-04"));
      setManualForm(emptyManualForm("2026-04"));
      setMessage(tr(lang, "notLoggedIn"));
    }

    async function init() {
      setLoading(true);
      try {
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;
        if (!alive) return;

        setSession(currentSession ?? null);

        if (currentSession?.user) {
          await bootstrapUser(currentSession.user.id);
        } else {
          resetAppState();
        }
      } catch (err) {
        if (alive) setMessage(err.message || "Auth-Fehler");
      } finally {
        if (alive) setLoading(false);
      }
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!alive) return;

      setSession(newSession ?? null);

      window.setTimeout(async () => {
        if (!alive) return;
        if (newSession?.user) {
          await bootstrapUser(newSession.user.id);
        } else {
          resetAppState();
        }
      }, 0);
    });

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, []);

  async function bootstrapUser(userId) {
    const loadedProfile = await loadProfile(userId);
    if (!loadedProfile) return;

    const household = await loadHousehold(userId);
    if (!household) return;

    await Promise.all([
      loadRules(household.household_id),
      loadDebtAccounts(household.household_id),
      loadBookingActions(household.household_id),
      loadManualTransactions(household.household_id),
      loadJournalEntries(household.household_id),
    ]);

    setMessage(tr(lang, "rulesLoaded"));
  }

  async function loadProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, display_name")
      .eq("id", userId)
      .single();

    if (error) {
      setProfile(null);
      setMessage("Profilfehler: " + error.message);
      return null;
    }

    setProfile(data);
    return data;
  }

  async function loadHousehold(userId) {
    const { data, error } = await supabase
      .from("household_members")
      .select("household_id, role, households(name)")
      .eq("user_id", userId)
      .single();

    if (error) {
      setMessage("Haushalt konnte nicht geladen werden: " + error.message);
      return null;
    }

    setHouseholdId(data.household_id);
    setHouseholdName(data.households?.name || "");
    setMemberRole(data.role || null);
    return data;
  }

  async function loadRules(hId) {
    const { data, error } = await supabase
      .from("rules")
      .select("*")
      .eq("household_id", hId)
      .order("created_at", { ascending: true });

    if (error) {
      setMessage("Regeln konnten nicht geladen werden: " + error.message);
      return;
    }

    const safe = (data || []).map((rule) => ({ ...rule, months: normalizeMonths(rule.months) }));
    setRules(safe);

    const stillSelected = safe.find((r) => r.id === selectedRuleId);
    if (stillSelected) {
      setRuleForm(ruleToForm(stillSelected));
      return;
    }

    if (safe.length > 0) {
      setSelectedRuleId(safe[0].id);
      setRuleForm(ruleToForm(safe[0]));
    } else {
      setSelectedRuleId("__new__");
      setRuleForm(emptyRuleForm(selectedMonth));
    }
  }

  async function loadDebtAccounts(hId) {
    const { data, error } = await supabase
      .from("debt_accounts")
      .select("*")
      .eq("household_id", hId)
      .order("payoff_priority", { ascending: true });

    if (error) {
      setMessage("Schuldenkonten konnten nicht geladen werden: " + error.message);
      return;
    }

    setDebtAccounts(data || []);
  }

  async function loadBookingActions(hId) {
    const { data, error } = await supabase
      .from("booking_actions")
      .select("*")
      .eq("household_id", hId)
      .order("planned_date", { ascending: true });

    if (error) {
      setMessage("Buchungsaktionen konnten nicht geladen werden: " + error.message);
      return;
    }

    setBookingActions(data || []);
  }

  async function loadManualTransactions(hId) {
    const { data, error } = await supabase
      .from("manual_transactions")
      .select("*")
      .eq("household_id", hId)
      .order("booking_date", { ascending: true });

    if (error) {
      setMessage("Manuelle Buchungen konnten nicht geladen werden: " + error.message);
      return;
    }

    setManualTransactions(data || []);
  }

  async function loadJournalEntries(hId) {
    const { data, error } = await supabase
      .from("booking_journal")
      .select("*")
      .eq("household_id", hId)
      .order("booking_date", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      setMessage("Journal konnte nicht geladen werden: " + error.message);
      return;
    }

    setJournalEntries(data || []);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setMessage(tr(lang, "loginRunning"));

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage("Login-Fehler: " + error.message);
      return;
    }

    setMessage(tr(lang, "loggedIn"));
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage("Logout-Fehler: " + error.message);
      return;
    }

    setSession(null);
    setProfile(null);
    setMemberRole(null);
    setHouseholdId(null);
    setHouseholdName("");
    setRules([]);
    setDebtAccounts([]);
    setBookingActions([]);
    setManualTransactions([]);
    setJournalEntries([]);
    setSelectedRuleId("");
    setRuleForm(emptyRuleForm(selectedMonth));
    setMessage(tr(lang, "notLoggedIn"));
  }

  const monthBounds = useMemo(() => {
    if (!rules.length) return { start: "2026-04", end: "2027-03" };

    let start = rules[0].start_month || "2026-04";
    let end = rules[0].end_month || "2027-03";

    for (const rule of rules) {
      if (rule.start_month && monthIndex(rule.start_month) < monthIndex(start)) start = rule.start_month;
      if (rule.end_month && monthIndex(rule.end_month) > monthIndex(end)) end = rule.end_month;
    }

    return { start, end };
  }, [rules]);

  const monthOptions = useMemo(() => monthRange(monthBounds.start, monthBounds.end), [monthBounds]);

  useEffect(() => {
    if (monthOptions.length && !monthOptions.includes(selectedMonth)) {
      setSelectedMonth(monthOptions[0]);
      setManualForm(emptyManualForm(monthOptions[0]));
    }
  }, [monthOptions, selectedMonth]);

  const plannedOccurrences = useMemo(() => buildPlannedOccurrences(rules, monthOptions), [rules, monthOptions]);

  const plannedWithActions = useMemo(
    () => mergePlannedWithActions(plannedOccurrences, bookingActions),
    [plannedOccurrences, bookingActions]
  );

  const summariesByMonth = useMemo(() => {
    const result = {};
    monthOptions.forEach((month) => {
      result[month] = summarizeMonth(month, plannedWithActions, journalEntries);
    });
    return result;
  }, [monthOptions, plannedWithActions, journalEntries]);

  const selectedSummary =
    summariesByMonth[selectedMonth] || {
      plannedIncome: 0,
      plannedExpense: 0,
      plannedNet: 0,
      actualIncome: 0,
      actualExpense: 0,
      actualNet: 0,
      plannedItems: [],
      manualItems: [],
      journalItems: [],
    };

  const cumulativeActualTotals = useMemo(() => {
    let income = 0;
    let expense = 0;

    for (const entry of journalEntries) {
      if (entry.is_void) continue;
      if (!entry.booking_date) continue;
      if (entry.booking_date > todayStr) continue;

      const signed = Number(entry.amount_signed || 0);
      if (signed >= 0) income += Math.abs(signed);
      else expense += Math.abs(signed);
    }

    return {
      income: round2(income),
      expense: round2(expense),
      net: round2(income - expense),
    };
  }, [journalEntries, todayStr]);

  const debtPlan = useMemo(
    () => buildDebtPlan(monthOptions, summariesByMonth, debtAccounts, currentMonthKey),
    [monthOptions, summariesByMonth, debtAccounts, currentMonthKey]
  );

  const selectedDebtRow = useMemo(
    () => debtPlan.find((row) => row.month === selectedMonth) || debtPlan[0],
    [debtPlan, selectedMonth]
  );

  const todayOpenItems = useMemo(
    () => plannedWithActions.filter((x) => x.planned_date === todayStr && x.status === "open"),
    [plannedWithActions, todayStr]
  );

  const overdueItems = useMemo(
    () => plannedWithActions.filter((x) => x.planned_date < todayStr && x.status === "open"),
    [plannedWithActions, todayStr]
  );

  const next7Items = useMemo(() => {
    return plannedWithActions.filter((x) => {
      if (x.status !== "open") return false;
      const diff =
        (new Date(`${x.planned_date}T00:00:00`) - new Date(`${todayStr}T00:00:00`)) / (1000 * 60 * 60 * 24);
      return diff >= 1 && diff <= 7;
    });
  }, [plannedWithActions, todayStr]);

  const displayItems = useMemo(() => {
    const planned = selectedSummary.plannedItems.map((item) => ({
      ...item,
      source: "rule",
    }));

    const manual = selectedSummary.manualItems.map((item) => ({
      id: item.id,
      key: `manual_${item.id}`,
      source: "manual",
      rule_id: null,
      month: item.month_key,
      title: item.title,
      type: Number(item.amount_signed || 0) < 0 ? "expense" : "income",
      planned_amount: Math.abs(Number(item.amount_signed || 0)),
      actual_amount: Math.abs(Number(item.amount_signed || 0)),
      planned_date: item.booking_date,
      actual_date: item.booking_date,
      category: item.category || "Sonstiges",
      account: item.account || "Hauptkonto",
      note: item.note || "",
      actual_note: item.note || "",
      status: "confirmed",
    }));

    return [...planned, ...manual].sort((a, b) => {
      if (a.planned_date === b.planned_date) return a.title.localeCompare(b.title);
      return a.planned_date.localeCompare(b.planned_date);
    });
  }, [selectedSummary]);

  const incomeDisplayItems = useMemo(
    () => displayItems.filter((item) => item.type === "income"),
    [displayItems]
  );

  const expenseDisplayItems = useMemo(
    () => displayItems.filter((item) => item.type === "expense"),
    [displayItems]
  );

  const headerInfoMessage = useMemo(() => {
    const hiddenMessages = [tr(lang, "rulesLoaded"), tr(lang, "loggedIn")];
    return hiddenMessages.includes(message) ? "" : message;
  }, [message, lang]);

  async function findExistingJournalRow(sourceKind, sourceId) {
    const { data, error } = await supabase
      .from("booking_journal")
      .select("id, is_void")
      .eq("household_id", householdId)
      .eq("source_kind", sourceKind)
      .eq("source_id", sourceId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) throw error;
    return data?.[0] || null;
  }

  async function syncBookingActionJournal(actionRow) {
    const payload = {
      household_id: householdId,
      booking_date: actionRow.actual_date || actionRow.planned_date,
      title: actionRow.planned_title || "Buchung",
      amount_signed: amountSignedFromType(actionRow.planned_type, actionRow.actual_amount ?? actionRow.planned_amount ?? 0),
      category: actionRow.planned_category || "Sonstiges",
      account: actionRow.planned_account || "Hauptkonto",
      source_kind: "booking_action",
      source_id: actionRow.id,
      planned_date: actionRow.planned_date,
      rule_id: actionRow.rule_id,
      note: actionRow.actual_note || "",
      created_by: profile?.id || null,
      is_void: false,
    };

    const existing = await findExistingJournalRow("booking_action", actionRow.id);

    if (existing) {
      const { error } = await supabase.from("booking_journal").update(payload).eq("id", existing.id);
      if (error) throw error;
      return;
    }

    const { error } = await supabase.from("booking_journal").insert(payload);
    if (error) throw error;
  }

  async function voidBookingActionJournal(actionId) {
    const existing = await findExistingJournalRow("booking_action", actionId);
    if (!existing) return;

    const { error } = await supabase
      .from("booking_journal")
      .update({ is_void: true })
      .eq("id", existing.id);

    if (error) throw error;
  }

  async function persistBookingAction(item, actionType, override = {}) {
    if (!isOwner) {
      setMessage(tr(lang, "onlyOwner"));
      return;
    }

    const key = `${item.rule_id}_${item.planned_date}_${actionType}`;
    setSavingActionKey(key);

    try {
      const payload = {
        household_id: householdId,
        rule_id: item.rule_id,
        planned_date: item.planned_date,
        planned_amount: Number(item.planned_amount),
        planned_title: item.title,
        planned_type: item.type,
        planned_category: item.category,
        planned_account: item.account,
        planned_note: item.note,
        status: actionType === "skip" ? "skipped" : "confirmed",
        actual_date: actionType === "skip" ? item.planned_date : item.planned_date,
        actual_amount: actionType === "skip" ? 0 : Number(item.planned_amount),
        actual_note: "",
        created_by: profile?.id || null,
        updated_at: new Date().toISOString(),
        ...override,
      };

      let savedAction;
      if (item.action_id) {
        const { data, error } = await supabase
          .from("booking_actions")
          .update(payload)
          .eq("id", item.action_id)
          .select()
          .single();

        if (error) throw error;
        savedAction = data;
      } else {
        const { data, error } = await supabase
          .from("booking_actions")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        savedAction = data;
      }

      if (savedAction.status === "confirmed") {
        await syncBookingActionJournal(savedAction);
      } else {
        await voidBookingActionJournal(savedAction.id);
      }

      await Promise.all([loadBookingActions(householdId), loadJournalEntries(householdId)]);
      setMessage(tr(lang, "bookingActionSaved"));
    } catch (err) {
      setMessage("Fehler beim Speichern: " + err.message);
    } finally {
      setSavingActionKey("");
    }
  }

  async function handleUndoConfirm(item) {
    if (!isOwner || !item.action_id) {
      setMessage(tr(lang, "onlyOwner"));
      return;
    }

    const key = `${item.rule_id}_${item.planned_date}_undo`;
    setSavingActionKey(key);

    try {
      const { error } = await supabase
        .from("booking_actions")
        .update({
          status: "open",
          actual_amount: null,
          actual_date: null,
          actual_note: "",
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.action_id);

      if (error) throw error;

      await voidBookingActionJournal(item.action_id);
      await Promise.all([loadBookingActions(householdId), loadJournalEntries(householdId)]);
      setMessage(tr(lang, "bookingUndone"));
    } catch (err) {
      setMessage("Fehler beim Zurücknehmen: " + err.message);
    } finally {
      setSavingActionKey("");
    }
  }

  async function handleReopen(item) {
    if (!isOwner || !item.action_id) {
      setMessage(tr(lang, "onlyOwner"));
      return;
    }

    const key = `${item.rule_id}_${item.planned_date}_reopen`;
    setSavingActionKey(key);

    try {
      const { error } = await supabase
        .from("booking_actions")
        .update({
          status: "open",
          actual_amount: null,
          actual_date: null,
          actual_note: "",
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.action_id);

      if (error) throw error;

      await voidBookingActionJournal(item.action_id);
      await Promise.all([loadBookingActions(householdId), loadJournalEntries(householdId)]);
      setMessage(tr(lang, "bookingReopened"));
    } catch (err) {
      setMessage("Fehler beim Wiederöffnen: " + err.message);
    } finally {
      setSavingActionKey("");
    }
  }

  function openActionEditor(item) {
    setActionEditorItem(item);
    setActionEditorForm({
      actual_amount: String(item.actual_amount ?? item.planned_amount ?? ""),
      actual_date: item.actual_date || item.planned_date,
      actual_note: item.actual_note || item.note || "",
    });
  }

  function closeActionEditor() {
    setActionEditorItem(null);
    setActionEditorForm({
      actual_amount: "",
      actual_date: "",
      actual_note: "",
    });
  }

  async function handleSaveActionEditor() {
    if (!actionEditorItem) return;

    await persistBookingAction(actionEditorItem, "confirm", {
      status: "confirmed",
      actual_amount: Number(actionEditorForm.actual_amount || 0),
      actual_date: actionEditorForm.actual_date,
      actual_note: actionEditorForm.actual_note || "",
    });

    closeActionEditor();
  }

  async function syncManualTransactionJournal(tx) {
    const payload = {
      household_id: householdId,
      booking_date: tx.booking_date,
      title: tx.title || "Manuelle Buchung",
      amount_signed: amountSignedFromType(tx.type, tx.amount),
      category: tx.category || "Sonstiges",
      account: tx.account || "Hauptkonto",
      source_kind: "manual_transaction",
      source_id: tx.id,
      planned_date: null,
      rule_id: null,
      note: tx.note || "",
      created_by: profile?.id || null,
      is_void: false,
    };

    const existing = await findExistingJournalRow("manual_transaction", tx.id);

    if (existing) {
      const { error } = await supabase.from("booking_journal").update(payload).eq("id", existing.id);
      if (error) throw error;
      return;
    }

    const { error } = await supabase.from("booking_journal").insert(payload);
    if (error) throw error;
  }

  async function handleSaveManual(e) {
    e.preventDefault();

    if (!isOwner) {
      setMessage(tr(lang, "onlyOwner"));
      return;
    }

    const payload = {
      household_id: householdId,
      booking_date: manualForm.booking_date,
      title: manualForm.title.trim(),
      type: manualForm.type,
      amount: Number(manualForm.amount),
      category: manualForm.category.trim() || "Sonstiges",
      account: manualForm.account.trim() || "Hauptkonto",
      note: manualForm.note,
      created_by: profile?.id || null,
      updated_at: new Date().toISOString(),
    };

    if (!payload.title || !Number.isFinite(payload.amount) || manualForm.amount === "") {
      setMessage("Titel oder Betrag ungültig.");
      return;
    }

    try {
      const { data: insertedTx, error } = await supabase
        .from("manual_transactions")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;

      await syncManualTransactionJournal(insertedTx);
      setManualForm(emptyManualForm(selectedMonth));
      await Promise.all([loadManualTransactions(householdId), loadJournalEntries(householdId)]);
      setMessage(tr(lang, "bookingSaved"));
    } catch (err) {
      setMessage("Fehler beim Speichern: " + err.message);
    }
  }

  function handleSelectRule(id) {
    setSelectedRuleId(id);

    if (id === "__new__") {
      setRuleForm(emptyRuleForm(selectedMonth));
      return;
    }

    const rule = rules.find((r) => r.id === id);
    if (rule) setRuleForm(ruleToForm(rule));
  }

  async function handleSaveRule(e) {
    e.preventDefault();

    if (!isOwner) {
      setMessage(tr(lang, "onlyOwner"));
      return;
    }

    const payload = formToRulePayload(ruleForm, householdId);
    if (!payload.title || !Number.isFinite(payload.amount) || ruleForm.amount === "") {
      setMessage("Titel oder Betrag ungültig.");
      return;
    }

    let error;
    if (ruleForm.id) {
      ({ error } = await supabase.from("rules").update(payload).eq("id", ruleForm.id));
    } else {
      ({ error } = await supabase.from("rules").insert(payload));
    }

    if (error) {
      setMessage("Fehler beim Speichern: " + error.message);
      return;
    }

    await loadRules(householdId);
    setMessage(tr(lang, "ruleSaved"));
  }

  async function handleDeleteRule() {
    if (!isOwner || !ruleForm.id) {
      setMessage(tr(lang, "onlyOwner"));
      return;
    }

    const { error } = await supabase.from("rules").delete().eq("id", ruleForm.id);
    if (error) {
      setMessage("Fehler beim Löschen: " + error.message);
      return;
    }

    await loadRules(householdId);
    setSelectedRuleId("__new__");
    setRuleForm(emptyRuleForm(selectedMonth));
    setMessage(tr(lang, "ruleDeleted"));
  }

  async function handleImageUpload(key, event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setUi((prev) => ({ ...prev, [key]: base64 }));
  }

  async function handleRequestNotifications() {
    if (!("Notification" in window)) {
      setNotificationPermission("unsupported");
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  }

  function exportSelectedMonthCsv() {
    const rows = [
      ["Monat", selectedMonth],
      [],
      ["Typ", "Quelle", "Datum", "Titel", "Kategorie", "Konto", "Status", "Geplant", "Tatsächlich", "Notiz"],
      ...displayItems.map((item) => [
        item.type === "income" ? "Einnahme" : "Ausgabe",
        item.source === "manual" ? "manuell" : "Regel",
        item.planned_date,
        item.title,
        item.category,
        item.account,
        item.status,
        item.planned_amount,
        item.status === "confirmed" ? item.actual_amount : "",
        item.actual_note || item.note || "",
      ]),
    ];

    downloadCsv(`cashflow_${selectedMonth}.csv`, rows);
  }

  function exportAllCsv() {
    const rows = [
      ["Monat", "Typ", "Quelle", "Datum", "Titel", "Kategorie", "Konto", "Status", "Geplant", "Tatsächlich", "Notiz"],
    ];

    monthOptions.forEach((month) => {
      const summary = summariesByMonth[month];
      const planned = summary.plannedItems.map((item) => ({
        ...item,
        source: "rule",
      }));

      const manual = summary.manualItems.map((item) => ({
        source: "manual",
        type: Number(item.amount_signed || 0) < 0 ? "expense" : "income",
        planned_date: item.booking_date,
        title: item.title,
        category: item.category || "Sonstiges",
        account: item.account || "Hauptkonto",
        status: "confirmed",
        planned_amount: Math.abs(Number(item.amount_signed || 0)),
        actual_amount: Math.abs(Number(item.amount_signed || 0)),
        actual_note: item.note || "",
        note: item.note || "",
      }));

      [...planned, ...manual].forEach((item) => {
        rows.push([
          month,
          item.type === "income" ? "Einnahme" : "Ausgabe",
          item.source === "manual" ? "manuell" : "Regel",
          item.planned_date,
          item.title,
          item.category,
          item.account,
          item.status,
          item.planned_amount,
          item.status === "confirmed" ? item.actual_amount : "",
          item.actual_note || item.note || "",
        ]);
      });
    });

    downloadCsv("cashflow_gesamt.csv", rows);
  }

  const heroTitle = ui.headerTitle?.trim() || tr(lang, "appTitle");
  const heroSubtitle = ui.headerSubtitle?.trim() || tr(lang, "appSubtitle");

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.cardTitle}>{tr(lang, "appTitle")}</h1>
            <div style={styles.cardSubtitle}>{tr(lang, "loading")}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.hero}>
            <div style={styles.heroCard}>
              {ui.headerImage ? <img src={ui.headerImage} alt="header" style={styles.heroImage} /> : null}
              {ui.headerImage ? <div style={styles.heroOverlay} /> : null}

              <div style={{ position: "relative", zIndex: 1 }}>
                <h1 style={styles.title}>{heroTitle}</h1>
                <div style={styles.subtitle}>{heroSubtitle}</div>
                {ui.showClock ? (
                  <div style={{ marginTop: 12, fontSize: 13, fontWeight: 700 }}>
                    {tr(lang, "currentTime")}: {formatClock(now, lang)}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>{tr(lang, "login")}</h2>
            <div style={styles.cardSubtitle}>{message}</div>

            <form onSubmit={handleLogin} style={{ display: "grid", gap: 12 }}>
              <input
                style={styles.input}
                type="email"
                placeholder={tr(lang, "email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                style={styles.input}
                type="password"
                placeholder={tr(lang, "password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button style={{ ...styles.button, ...styles.buttonPrimary }} type="submit">
                {tr(lang, "login")}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.heroCard}>
            {ui.headerImage ? <img src={ui.headerImage} alt="header" style={styles.heroImage} /> : null}
            {ui.headerImage ? <div style={styles.heroOverlay} /> : null}

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={styles.heroTopRow}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h1 style={styles.title}>{heroTitle}</h1>
                  <div style={styles.subtitle}>{heroSubtitle}</div>

                  <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.92)" }}>
                    {tr(lang, "selectedMonthLabel")}: {formatMonth(selectedMonth, lang)}
                  </div>

                  <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.92)" }}>
                    {tr(lang, "tillToday")}
                  </div>

                  {ui.showClock ? (
                    <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700 }}>
                      {tr(lang, "currentTime")}: {formatClock(now, lang)}
                    </div>
                  ) : null}
                </div>

                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  {ui.profileMe ? (
                    <img src={ui.profileMe} alt="me" style={styles.avatar} />
                  ) : (
                    <div style={styles.avatarFallback}>T</div>
                  )}

                  {ui.profileWife ? (
                    <img src={ui.profileWife} alt="wife" style={styles.avatar} />
                  ) : (
                    <div style={styles.avatarFallback}>N</div>
                  )}
                </div>
              </div>

              <div style={styles.heroStats}>
                <div style={styles.heroStatCard}>
                  <div style={styles.heroStatLabel}>{tr(lang, "totalIncomeAll")}</div>
                  <div style={styles.heroStatValue}>{formatSignedCurrency(cumulativeActualTotals.income, true)}</div>
                </div>

                <div style={styles.heroStatCard}>
                  <div style={styles.heroStatLabel}>{tr(lang, "totalExpenseAll")}</div>
                  <div style={styles.heroStatValue}>{formatSignedCurrency(-cumulativeActualTotals.expense, true)}</div>
                </div>

                <div style={styles.heroStatCard}>
                  <div style={styles.heroStatLabel}>{tr(lang, "currentBalanceAll")}</div>
                  <div style={styles.heroStatValue}>{formatSignedCurrency(cumulativeActualTotals.net, true)}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.controlsCard}>
            <div style={styles.heroMetaRow}>
              <select
                style={styles.input}
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  setManualForm((prev) => ({ ...prev, booking_date: createDate(e.target.value, 15) }));
                }}
              >
                {monthOptions.map((m) => (
                  <option key={m} value={m}>
                    {formatMonth(m, lang)}
                  </option>
                ))}
              </select>

              <div style={styles.subtle}>
                {householdName || "-"} · {tr(lang, "role")}: {roleLabel(lang, memberRole)}
              </div>

              {headerInfoMessage ? <div style={styles.subtle}>{headerInfoMessage}</div> : null}
            </div>
          </div>
        </div>

        {tab === "today" && (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={styles.metrics}>
              <MetricCard
                styles={styles}
                label={tr(lang, "actualIncome")}
                value={formatSignedCurrency(selectedSummary.actualIncome, true)}
                hint={formatMonth(selectedMonth, lang)}
                color={palette.success}
              />
              <MetricCard
                styles={styles}
                label={tr(lang, "actualExpense")}
                value={formatSignedCurrency(-selectedSummary.actualExpense, true)}
                hint={formatMonth(selectedMonth, lang)}
                color={palette.danger}
              />
              <MetricCard
                styles={styles}
                label={tr(lang, "actualNet")}
                value={formatSignedCurrency(selectedSummary.actualNet, true)}
                hint={tr(lang, "today")}
                color={selectedSummary.actualNet >= 0 ? palette.success : palette.danger}
              />
              <MetricCard
                styles={styles}
                label={tr(lang, "totalDebt")}
                value={formatSignedCurrency(-(selectedDebtRow?.totalDebt || 0), true)}
                hint={`${tr(lang, "reserveEnd")}: ${formatSignedCurrency(selectedDebtRow?.reserve || 0, true)}`}
                color={palette.danger}
              />
            </div>

            <Section styles={styles} title={tr(lang, "todayDue")} subtitle={tr(lang, "mobileHint")}>
              <div style={{ display: "grid", gap: 10 }}>
                {todayOpenItems.length ? (
                  todayOpenItems.map((item) => (
                    <BookingCard
                      key={item.key}
                      styles={styles}
                      palette={palette}
                      lang={lang}
                      item={item}
                      todayStr={todayStr}
                      isOwner={isOwner}
                      onConfirm={(booking) => persistBookingAction(booking, "confirm")}
                      onEdit={openActionEditor}
                      onSkip={(booking) => persistBookingAction(booking, "skip")}
                      onUndoConfirm={handleUndoConfirm}
                      onReopen={handleReopen}
                      savingActionKey={savingActionKey}
                    />
                  ))
                ) : (
                  <div style={styles.subtle}>{tr(lang, "noTasks")}</div>
                )}
              </div>
            </Section>

            <Section styles={styles} title={tr(lang, "overdueItems")}>
              <div style={{ display: "grid", gap: 10 }}>
                {overdueItems.length ? (
                  overdueItems.map((item) => (
                    <BookingCard
                      key={item.key}
                      styles={styles}
                      palette={palette}
                      lang={lang}
                      item={item}
                      todayStr={todayStr}
                      isOwner={isOwner}
                      onConfirm={(booking) => persistBookingAction(booking, "confirm")}
                      onEdit={openActionEditor}
                      onSkip={(booking) => persistBookingAction(booking, "skip")}
                      onUndoConfirm={handleUndoConfirm}
                      onReopen={handleReopen}
                      savingActionKey={savingActionKey}
                    />
                  ))
                ) : (
                  <div style={styles.subtle}>{tr(lang, "noTasks")}</div>
                )}
              </div>
            </Section>

            <Section styles={styles} title={tr(lang, "next7Days")}>
              <div style={{ display: "grid", gap: 10 }}>
                {next7Items.length ? (
                  next7Items.map((item) => (
                    <BookingCard
                      key={item.key}
                      styles={styles}
                      palette={palette}
                      lang={lang}
                      item={item}
                      todayStr={todayStr}
                      isOwner={isOwner}
                      onConfirm={(booking) => persistBookingAction(booking, "confirm")}
                      onEdit={openActionEditor}
                      onSkip={(booking) => persistBookingAction(booking, "skip")}
                      onUndoConfirm={handleUndoConfirm}
                      onReopen={handleReopen}
                      savingActionKey={savingActionKey}
                    />
                  ))
                ) : (
                  <div style={styles.subtle}>{tr(lang, "noTasks")}</div>
                )}
              </div>
            </Section>
          </div>
        )}

        {tab === "plan" && (
          <div style={{ display: "grid", gap: 12 }}>
            <Section
              styles={styles}
              title={tr(lang, "planVsActual")}
              subtitle={formatMonth(selectedMonth, lang)}
              right={
                <div style={styles.row}>
                  <button type="button" style={styles.button} onClick={exportSelectedMonthCsv}>
                    {tr(lang, "exportMonthCsv")}
                  </button>
                  <button type="button" style={styles.button} onClick={exportAllCsv}>
                    {tr(lang, "exportAllCsv")}
                  </button>
                </div>
              }
            >
              <div style={styles.metrics}>
                <MetricCard
                  styles={styles}
                  label={tr(lang, "plannedIncome")}
                  value={formatSignedCurrency(selectedSummary.plannedIncome, true)}
                  color={palette.accent}
                />
                <MetricCard
                  styles={styles}
                  label={tr(lang, "actualIncome")}
                  value={formatSignedCurrency(selectedSummary.actualIncome, true)}
                  color={palette.success}
                />
                <MetricCard
                  styles={styles}
                  label={tr(lang, "plannedExpense")}
                  value={formatSignedCurrency(-selectedSummary.plannedExpense, true)}
                  color={palette.danger}
                />
                <MetricCard
                  styles={styles}
                  label={tr(lang, "actualExpense")}
                  value={formatSignedCurrency(-selectedSummary.actualExpense, true)}
                  color={palette.warning}
                />
                <MetricCard
                  styles={styles}
                  label={tr(lang, "plannedNet")}
                  value={formatSignedCurrency(selectedSummary.plannedNet, true)}
                  color={selectedSummary.plannedNet >= 0 ? palette.success : palette.danger}
                />
                <MetricCard
                  styles={styles}
                  label={tr(lang, "actualNet")}
                  value={formatSignedCurrency(selectedSummary.actualNet, true)}
                  color={selectedSummary.actualNet >= 0 ? palette.success : palette.danger}
                />
              </div>

              <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
                <ComparisonBar
                  styles={styles}
                  palette={palette}
                  label={tr(lang, "income")}
                  planned={selectedSummary.plannedIncome}
                  actual={selectedSummary.actualIncome}
                  lang={lang}
                />
                <ComparisonBar
                  styles={styles}
                  palette={palette}
                  label={tr(lang, "expense")}
                  planned={selectedSummary.plannedExpense}
                  actual={selectedSummary.actualExpense}
                  lang={lang}
                  mode="expense"
                />
                <ComparisonBar
                  styles={styles}
                  palette={palette}
                  label={tr(lang, "monthlyNet")}
                  planned={Math.abs(selectedSummary.plannedNet)}
                  actual={Math.abs(selectedSummary.actualNet)}
                  lang={lang}
                  mode={selectedSummary.actualNet < 0 ? "expense" : "normal"}
                />
              </div>
            </Section>

            <Section styles={styles} title={tr(lang, "incomeList")} subtitle={`${tr(lang, "plusGreenHint")} · ${formatMonth(selectedMonth, lang)}`}>
              <div style={{ display: "grid", gap: 10 }}>
                {incomeDisplayItems.length ? (
                  incomeDisplayItems.map((item) => (
                    <BookingCard
                      key={item.key}
                      styles={styles}
                      palette={palette}
                      lang={lang}
                      item={item}
                      todayStr={todayStr}
                      isOwner={isOwner}
                      onConfirm={(booking) => persistBookingAction(booking, "confirm")}
                      onEdit={openActionEditor}
                      onSkip={(booking) => persistBookingAction(booking, "skip")}
                      onUndoConfirm={handleUndoConfirm}
                      onReopen={handleReopen}
                      savingActionKey={savingActionKey}
                    />
                  ))
                ) : (
                  <div style={styles.subtle}>{tr(lang, "noData")}</div>
                )}
              </div>
            </Section>

            <Section styles={styles} title={tr(lang, "expensesList")} subtitle={`${tr(lang, "minusRedHint")} · ${formatMonth(selectedMonth, lang)}`}>
              <div style={{ display: "grid", gap: 10 }}>
                {expenseDisplayItems.length ? (
                  expenseDisplayItems.map((item) => (
                    <BookingCard
                      key={item.key}
                      styles={styles}
                      palette={palette}
                      lang={lang}
                      item={item}
                      todayStr={todayStr}
                      isOwner={isOwner}
                      onConfirm={(booking) => persistBookingAction(booking, "confirm")}
                      onEdit={openActionEditor}
                      onSkip={(booking) => persistBookingAction(booking, "skip")}
                      onUndoConfirm={handleUndoConfirm}
                      onReopen={handleReopen}
                      savingActionKey={savingActionKey}
                    />
                  ))
                ) : (
                  <div style={styles.subtle}>{tr(lang, "noData")}</div>
                )}
              </div>
            </Section>
          </div>
        )}

        {tab === "book" && (
          <div style={{ display: "grid", gap: 12 }}>
            <Section styles={styles} title={tr(lang, "bookNow")} subtitle={isOwner ? tr(lang, "mobileHint") : tr(lang, "onlyOwner")}>
              <form onSubmit={handleSaveManual} style={{ display: "grid", gap: 10 }}>
                <input
                  style={styles.input}
                  type="date"
                  value={manualForm.booking_date}
                  onChange={(e) => setManualForm((prev) => ({ ...prev, booking_date: e.target.value }))}
                  disabled={!isOwner}
                />
                <input
                  style={styles.input}
                  value={manualForm.title}
                  onChange={(e) => setManualForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder={tr(lang, "title")}
                  required
                  disabled={!isOwner}
                />
                <div style={styles.grid2}>
                  <select
                    style={styles.input}
                    value={manualForm.type}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, type: e.target.value }))}
                    disabled={!isOwner}
                  >
                    <option value="expense">{tr(lang, "expense")}</option>
                    <option value="income">{tr(lang, "income")}</option>
                  </select>
                  <input
                    style={styles.input}
                    type="number"
                    step="0.01"
                    value={manualForm.amount}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, amount: e.target.value }))}
                    placeholder={tr(lang, "amount")}
                    required
                    disabled={!isOwner}
                  />
                </div>
                <div style={styles.grid2}>
                  <input
                    style={styles.input}
                    value={manualForm.category}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder={tr(lang, "category")}
                    disabled={!isOwner}
                  />
                  <input
                    style={styles.input}
                    value={manualForm.account}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, account: e.target.value }))}
                    placeholder={tr(lang, "account")}
                    disabled={!isOwner}
                  />
                </div>
                <textarea
                  style={styles.textarea}
                  value={manualForm.note}
                  onChange={(e) => setManualForm((prev) => ({ ...prev, note: e.target.value }))}
                  placeholder={tr(lang, "note")}
                  disabled={!isOwner}
                />
                <button type="submit" style={{ ...styles.button, ...styles.buttonPrimary }} disabled={!isOwner}>
                  {tr(lang, "addBooking")}
                </button>
              </form>
            </Section>
          </div>
        )}

        {tab === "debt" && (
          <div style={{ display: "grid", gap: 12 }}>
            <Section styles={styles} title={tr(lang, "debtAccounts")} subtitle={formatMonth(selectedMonth, lang)}>
              <div style={{ display: "grid", gap: 10 }}>
                {selectedDebtRow?.perAccount?.length ? (
                  selectedDebtRow.perAccount.map((acc) => (
                    <div key={acc.id} style={styles.bookingCard}>
                      <div style={{ fontWeight: 800 }}>{acc.name}</div>

                      <div style={styles.grid2}>
                        <div>
                          <div style={styles.subtle}>{tr(lang, "start")}</div>
                          <div style={{ fontWeight: 800, color: palette.danger }}>
                            {formatSignedCurrency(-(acc.principalStart + acc.accruedStart), true)}
                          </div>
                        </div>

                        <div>
                          <div style={styles.subtle}>{tr(lang, "paymentToDebt")}</div>
                          <div style={{ fontWeight: 800, color: palette.success }}>
                            {formatSignedCurrency(acc.payment, true)}
                          </div>
                        </div>

                        <div>
                          <div style={styles.subtle}>{tr(lang, "interest")}</div>
                          <div style={{ fontWeight: 800, color: palette.danger }}>
                            {formatSignedCurrency(-acc.bookedInterest, true)}
                          </div>
                        </div>

                        <div>
                          <div style={styles.subtle}>{tr(lang, "end")}</div>
                          <div style={{ fontWeight: 800, color: palette.danger }}>
                            {formatSignedCurrency(-acc.totalEnd, true)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={styles.subtle}>{tr(lang, "noData")}</div>
                )}
              </div>
            </Section>

            <Section styles={styles} title={tr(lang, "debtPlan")} subtitle={tr(lang, "planVsActual")}>
              <div style={{ display: "grid", gap: 10 }}>
                {debtPlan.map((row) => (
                  <div key={row.month} style={styles.bookingCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ fontWeight: 800 }}>{formatMonth(row.month, lang)}</div>
                      <div style={{ ...styles.chip, background: `${palette.danger}22`, color: palette.danger }}>
                        {formatSignedCurrency(-row.totalDebt, true)}
                      </div>
                    </div>

                    <div style={styles.grid2}>
                      <div>
                        <div style={styles.subtle}>{tr(lang, "availableBeforeDebt")}</div>
                        <div style={{ fontWeight: 800, color: row.availableBeforeDebt >= 0 ? palette.success : palette.danger }}>
                          {formatSignedCurrency(row.availableBeforeDebt, true)}
                        </div>
                      </div>

                      <div>
                        <div style={styles.subtle}>{tr(lang, "paymentToDebt")}</div>
                        <div style={{ fontWeight: 800, color: palette.success }}>
                          {formatSignedCurrency(row.totalPayment, true)}
                        </div>
                      </div>

                      <div>
                        <div style={styles.subtle}>{tr(lang, "reserveEnd")}</div>
                        <div style={{ fontWeight: 800, color: palette.success }}>
                          {formatSignedCurrency(row.reserve, true)}
                        </div>
                      </div>

                      <div>
                        <div style={styles.subtle}>{tr(lang, "totalDebt")}</div>
                        <div style={{ fontWeight: 800, color: palette.danger }}>
                          {formatSignedCurrency(-row.totalDebt, true)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {tab === "rules" && (
          <div style={{ display: "grid", gap: 12 }}>
            <Section styles={styles} title={tr(lang, "rules")} subtitle={tr(lang, "mobileHint")}>
              <div style={{ display: "grid", gap: 10 }}>
                <select style={styles.input} value={selectedRuleId} onChange={(e) => handleSelectRule(e.target.value)}>
                  {isOwner && <option value="__new__">{tr(lang, "newRule")}</option>}
                  {!selectedRuleId && !isOwner && <option value="">{tr(lang, "chooseRule")}</option>}
                  {rules.map((rule) => (
                    <option key={rule.id} value={rule.id}>
                      {rule.title}
                    </option>
                  ))}
                </select>

                <form onSubmit={handleSaveRule} style={{ display: "grid", gap: 10 }}>
                  <input
                    style={styles.input}
                    value={ruleForm.title}
                    onChange={(e) => setRuleForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder={tr(lang, "title")}
                    disabled={!isOwner}
                    required
                  />

                  <div style={styles.grid2}>
                    <select
                      style={styles.input}
                      value={ruleForm.type}
                      onChange={(e) => setRuleForm((prev) => ({ ...prev, type: e.target.value }))}
                      disabled={!isOwner}
                    >
                      <option value="income">{tr(lang, "income")}</option>
                      <option value="expense">{tr(lang, "expense")}</option>
                    </select>

                    <input
                      style={styles.input}
                      type="number"
                      step="0.01"
                      value={ruleForm.amount}
                      onChange={(e) => setRuleForm((prev) => ({ ...prev, amount: e.target.value }))}
                      placeholder={tr(lang, "amount")}
                      disabled={!isOwner}
                      required
                    />
                  </div>

                  <div style={styles.grid2}>
                    <select
                      style={styles.input}
                      value={ruleForm.frequency}
                      onChange={(e) => setRuleForm((prev) => ({ ...prev, frequency: e.target.value }))}
                      disabled={!isOwner}
                    >
                      <option value="monthly">{tr(lang, "monthly")}</option>
                      <option value="weekly">{tr(lang, "weekly")}</option>
                      <option value="everyOtherMonth">{tr(lang, "everyOtherMonth")}</option>
                      <option value="customMonths">{tr(lang, "customMonths")}</option>
                    </select>

                    {ruleForm.frequency === "weekly" ? (
                      <select
                        style={styles.input}
                        value={ruleForm.weekday}
                        onChange={(e) => setRuleForm((prev) => ({ ...prev, weekday: Number(e.target.value) }))}
                        disabled={!isOwner}
                      >
                        <option value={1}>{tr(lang, "monday")}</option>
                        <option value={2}>{tr(lang, "tuesday")}</option>
                        <option value={3}>{tr(lang, "wednesday")}</option>
                        <option value={4}>{tr(lang, "thursday")}</option>
                        <option value={5}>{tr(lang, "friday")}</option>
                        <option value={6}>{tr(lang, "saturday")}</option>
                        <option value={0}>{tr(lang, "sunday")}</option>
                      </select>
                    ) : (
                      <input
                        style={styles.input}
                        type="number"
                        min="1"
                        max="31"
                        value={ruleForm.day}
                        onChange={(e) => setRuleForm((prev) => ({ ...prev, day: e.target.value }))}
                        placeholder={tr(lang, "dayOfMonth")}
                        disabled={!isOwner}
                      />
                    )}
                  </div>

                  {ruleForm.frequency === "customMonths" ? (
                    <input
                      style={styles.input}
                      value={ruleForm.customMonthsText}
                      onChange={(e) => setRuleForm((prev) => ({ ...prev, customMonthsText: e.target.value }))}
                      placeholder={tr(lang, "customMonthsHint")}
                      disabled={!isOwner}
                    />
                  ) : null}

                  <div style={styles.grid2}>
                    <input
                      style={styles.input}
                      type="month"
                      value={ruleForm.start_month}
                      onChange={(e) => setRuleForm((prev) => ({ ...prev, start_month: e.target.value }))}
                      disabled={!isOwner}
                    />
                    <input
                      style={styles.input}
                      type="month"
                      value={ruleForm.end_month}
                      onChange={(e) => setRuleForm((prev) => ({ ...prev, end_month: e.target.value }))}
                      disabled={!isOwner}
                    />
                  </div>

                  <div style={styles.grid2}>
                    <input
                      style={styles.input}
                      value={ruleForm.category}
                      onChange={(e) => setRuleForm((prev) => ({ ...prev, category: e.target.value }))}
                      placeholder={tr(lang, "category")}
                      disabled={!isOwner}
                    />
                    <input
                      style={styles.input}
                      value={ruleForm.account}
                      onChange={(e) => setRuleForm((prev) => ({ ...prev, account: e.target.value }))}
                      placeholder={tr(lang, "account")}
                      disabled={!isOwner}
                    />
                  </div>

                  <textarea
                    style={styles.textarea}
                    value={ruleForm.note}
                    onChange={(e) => setRuleForm((prev) => ({ ...prev, note: e.target.value }))}
                    placeholder={tr(lang, "note")}
                    disabled={!isOwner}
                  />

                  <div style={styles.row}>
                    {isOwner ? (
                      <button type="submit" style={{ ...styles.button, ...styles.buttonPrimary }}>
                        {tr(lang, "save")}
                      </button>
                    ) : null}

                    {isOwner ? (
                      <button
                        type="button"
                        style={styles.button}
                        onClick={() => {
                          setSelectedRuleId("__new__");
                          setRuleForm(emptyRuleForm(selectedMonth));
                        }}
                      >
                        {tr(lang, "newRule")}
                      </button>
                    ) : null}

                    {isOwner && ruleForm.id ? (
                      <button type="button" style={{ ...styles.button, ...styles.buttonDanger }} onClick={handleDeleteRule}>
                        {tr(lang, "deleteRule")}
                      </button>
                    ) : null}
                  </div>
                </form>
              </div>
            </Section>
          </div>
        )}

        {tab === "settings" && (
          <div style={{ display: "grid", gap: 12 }}>
            <Section styles={styles} title={tr(lang, "settingsTitle")} subtitle={tr(lang, "mobileHint")}>
              <div style={{ display: "grid", gap: 14 }}>
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>{tr(lang, "language")}</div>
                  <div style={styles.row}>
                    <button
                      type="button"
                      style={ui.lang === "de" ? { ...styles.button, ...styles.buttonPrimary } : styles.button}
                      onClick={() => setUi((prev) => ({ ...prev, lang: "de" }))}
                    >
                      Deutsch
                    </button>
                  </div>
                </div>

                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>{tr(lang, "theme")}</div>
                  <div style={styles.row}>
                    <button
                      type="button"
                      style={ui.theme === "light" ? { ...styles.button, ...styles.buttonPrimary } : styles.button}
                      onClick={() => setUi((prev) => ({ ...prev, theme: "light" }))}
                    >
                      {tr(lang, "light")}
                    </button>
                    <button
                      type="button"
                      style={ui.theme === "dark" ? { ...styles.button, ...styles.buttonPrimary } : styles.button}
                      onClick={() => setUi((prev) => ({ ...prev, theme: "dark" }))}
                    >
                      {tr(lang, "dark")}
                    </button>
                  </div>
                </div>
              </div>
            </Section>

            <Section styles={styles} title={tr(lang, "headerSettings")} subtitle={tr(lang, "currentTime")}>
              <div style={{ display: "grid", gap: 10 }}>
                <input
                  style={styles.input}
                  value={ui.headerTitle}
                  onChange={(e) => setUi((prev) => ({ ...prev, headerTitle: e.target.value }))}
                  placeholder={tr(lang, "headerTitle")}
                />
                <textarea
                  style={styles.textarea}
                  value={ui.headerSubtitle}
                  onChange={(e) => setUi((prev) => ({ ...prev, headerSubtitle: e.target.value }))}
                  placeholder={tr(lang, "headerSubtitle")}
                />
                <div style={styles.row}>
                  <label style={{ ...styles.button, ...styles.buttonSoft, cursor: "pointer" }}>
                    {tr(lang, "uploadImage")}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleImageUpload("headerImage", e)}
                    />
                  </label>
                  {ui.headerImage ? (
                    <button type="button" style={styles.button} onClick={() => setUi((prev) => ({ ...prev, headerImage: "" }))}>
                      {tr(lang, "removeImage")}
                    </button>
                  ) : null}
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                  <input
                    type="checkbox"
                    checked={ui.showClock}
                    onChange={(e) => setUi((prev) => ({ ...prev, showClock: e.target.checked }))}
                  />
                  {tr(lang, "showClock")}
                </label>
              </div>
            </Section>

            <Section styles={styles} title={tr(lang, "familyPhotos")}>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={styles.bookingCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {ui.profileMe ? (
                      <img src={ui.profileMe} alt="me" style={styles.avatar} />
                    ) : (
                      <div style={styles.avatarFallback}>T</div>
                    )}
                    <div>
                      <div style={{ fontWeight: 800 }}>{tr(lang, "me")}</div>
                    </div>
                  </div>
                  <div style={styles.row}>
                    <label style={{ ...styles.button, ...styles.buttonSoft, cursor: "pointer" }}>
                      {tr(lang, "uploadImage")}
                      <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload("profileMe", e)} />
                    </label>
                    {ui.profileMe ? (
                      <button type="button" style={styles.button} onClick={() => setUi((prev) => ({ ...prev, profileMe: "" }))}>
                        {tr(lang, "removeImage")}
                      </button>
                    ) : null}
                  </div>
                </div>

                <div style={styles.bookingCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {ui.profileWife ? (
                      <img src={ui.profileWife} alt="wife" style={styles.avatar} />
                    ) : (
                      <div style={styles.avatarFallback}>N</div>
                    )}
                    <div>
                      <div style={{ fontWeight: 800 }}>{tr(lang, "wife")}</div>
                    </div>
                  </div>
                  <div style={styles.row}>
                    <label style={{ ...styles.button, ...styles.buttonSoft, cursor: "pointer" }}>
                      {tr(lang, "uploadImage")}
                      <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload("profileWife", e)} />
                    </label>
                    {ui.profileWife ? (
                      <button type="button" style={styles.button} onClick={() => setUi((prev) => ({ ...prev, profileWife: "" }))}>
                        {tr(lang, "removeImage")}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </Section>

            <Section styles={styles} title={tr(lang, "notifications")} subtitle={tr(lang, "notificationsHint")}>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={styles.subtle}>
                  {tr(lang, "notificationStatus")}:{" "}
                  {notificationPermission === "granted"
                    ? tr(lang, "allowed")
                    : notificationPermission === "denied"
                      ? tr(lang, "denied")
                      : notificationPermission === "default"
                        ? tr(lang, "defaultPermission")
                        : tr(lang, "unsupported")}
                </div>

                {"Notification" in window ? (
                  <button type="button" style={styles.button} onClick={handleRequestNotifications}>
                    {tr(lang, "enableNotifications")}
                  </button>
                ) : (
                  <div style={styles.subtle}>{tr(lang, "browserNotSupported")}</div>
                )}
              </div>
            </Section>

            <Section styles={styles} title={tr(lang, "user")}>
              <div style={{ display: "grid", gap: 10 }}>
                <div style={styles.subtle}>
                  {tr(lang, "user")}: {session.user.email}
                  <br />
                  {tr(lang, "household")}: {householdName || householdId || "-"}
                  <br />
                  {tr(lang, "role")}: {roleLabel(lang, memberRole)}
                </div>
                <button type="button" style={styles.button} onClick={handleLogout}>
                  {tr(lang, "logout")}
                </button>
              </div>
            </Section>
          </div>
        )}
      </div>

      <ActionModal
        styles={styles}
        palette={palette}
        lang={lang}
        isOpen={Boolean(actionEditorItem)}
        item={actionEditorItem}
        form={actionEditorForm}
        setForm={setActionEditorForm}
        onClose={closeActionEditor}
        onSave={handleSaveActionEditor}
        saving={Boolean(savingActionKey)}
      />

      <div style={styles.bottomNav}>
        {[
          ["today", tr(lang, "today")],
          ["plan", tr(lang, "plan")],
          ["book", tr(lang, "book")],
          ["debt", tr(lang, "debt")],
          ["rules", tr(lang, "rules")],
          ["settings", tr(lang, "settings")],
        ].map(([key, label]) => (
          <button
            key={key}
            style={tab === key ? { ...styles.navButton, ...styles.navButtonActive } : styles.navButton}
            onClick={() => setTab(key)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}