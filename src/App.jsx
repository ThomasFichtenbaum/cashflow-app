import { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabase";

const UI_STORAGE_KEY = "cashflow-ui-v3";

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
    dashboard: "Dashboard",
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
    skip: "Skip",
    editAmount: "Anpassen",
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
    startMonth: "Startmonat",
    endMonth: "Endmonat",
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
    createdAt: "Erfasst am",
  },
  ru: {
    appTitle: "Cashflow-App",
    appSubtitle: "Сначала для телефона: долги, ежедневные проводки и месячный план.",
    login: "Войти",
    logout: "Выйти",
    email: "Эл. почта",
    password: "Пароль",
    loading: "Загрузка ...",
    notLoggedIn: "Не выполнен вход",
    loginRunning: "Выполняется вход ...",
    loggedIn: "Вход выполнен",
    today: "Сегодня",
    plan: "План",
    book: "Проводка",
    debt: "Долги",
    rules: "Правила",
    settings: "Настройки",
    dashboard: "Панель",
    month: "Месяц",
    role: "Роль",
    owner: "Владелец",
    viewer: "Только просмотр",
    unknown: "неизвестно",
    household: "Домохозяйство",
    status: "Статус",
    amount: "Сумма",
    actualAmount: "Фактическая сумма",
    actualDate: "Фактическая дата",
    title: "Название",
    type: "Тип",
    income: "Доход",
    expense: "Расход",
    category: "Категория",
    account: "Счёт",
    note: "Заметка",
    save: "Сохранить",
    saving: "Сохраняю ...",
    cancel: "Отмена",
    confirm: "Подтвердить",
    skip: "Пропустить",
    editAmount: "Изменить",
    open: "запланировано",
    confirmed: "подтверждено",
    skipped: "пропущено",
    overdue: "просрочено",
    upcoming: "скоро",
    todayDue: "на сегодня",
    next7Days: "Следующие 7 дней",
    overdueItems: "Просрочено",
    noTasks: "Нет открытых операций в этом разделе.",
    monthlyIncome: "Доходы за месяц",
    monthlyExpense: "Расходы за месяц",
    monthlyNet: "Баланс за месяц",
    reserveEnd: "Резерв на конец месяца",
    totalDebt: "Остаток долга на конец месяца",
    availableBeforeDebt: "Доступно до погашения",
    paymentToDebt: "Погашение всего",
    planOverview: "План месяца",
    bookNow: "Ручная проводка",
    addBooking: "Добавить проводку",
    ruleSaved: "Правило сохранено.",
    ruleDeleted: "Правило удалено.",
    bookingSaved: "Проводка сохранена.",
    bookingActionSaved: "Операция обновлена.",
    rulesLoaded: "Данные загружены.",
    onlyOwner: "Только владелец может вносить изменения.",
    mobileHint: "Оптимизировано для телефона: карточки, большие кнопки, короткие действия.",
    settingsTitle: "Вид и язык",
    language: "Язык",
    theme: "Тема",
    light: "День",
    dark: "Ночь",
    familyPhotos: "Фотографии",
    me: "Я",
    wife: "Моя жена",
    uploadImage: "Загрузить фото",
    removeImage: "Удалить фото",
    chooseRule: "Пожалуйста, выберите правило",
    newRule: "Новое правило",
    editRule: "Редактировать правило",
    deleteRule: "Удалить",
    frequency: "Ритм",
    monthly: "Ежемесячно",
    weekly: "Еженедельно",
    everyOtherMonth: "Каждые 2 месяца",
    customMonths: "Определённые месяцы",
    dayOfMonth: "День месяца",
    weekday: "День недели",
    startMonth: "Начальный месяц",
    endMonth: "Конечный месяц",
    customMonthsHint: "например 2026-06, 2026-12",
    monday: "Понедельник",
    tuesday: "Вторник",
    wednesday: "Среда",
    thursday: "Четверг",
    friday: "Пятница",
    saturday: "Суббота",
    sunday: "Воскресенье",
    debtAccounts: "Долговые счета",
    debtPlan: "План погашения",
    noData: "Нет данных.",
    user: "Пользователь",
    createdAt: "Создано",
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
  de: ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
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
  return new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR" }).format(Number(value || 0));
}

function formatMonth(month, lang) {
  const [y, m] = month.split("-").map(Number);
  return `${monthNames[lang][m - 1]} ${y}`;
}

function formatDate(value, lang) {
  if (!value) return "-";
  const d = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
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
      return value.split(",").map((x) => x.trim()).filter(Boolean);
    }
  }
  return [];
}

function ruleActiveInMonth(rule, month) {
  if (!rule.start_month || !rule.end_month) return true;
  return month >= rule.start_month && month <= rule.end_month;
}

function isEveryOtherMonthHit(rule, month) {
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

function summarizeMonth(selectedMonth, plannedWithActions, manualTransactions) {
  const monthPlanned = plannedWithActions.filter((x) => x.month === selectedMonth);
  const monthManual = manualTransactions.filter((x) => x.booking_date?.slice(0, 7) === selectedMonth);

  let income = 0;
  let expense = 0;
  const categoryMap = new Map();

  for (const item of monthPlanned) {
    if (item.status === "skipped") continue;
    const amount = Number(item.status === "confirmed" ? item.actual_amount ?? item.planned_amount : item.planned_amount);
    if (item.type === "income") {
      income += amount;
    } else {
      expense += amount;
      categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + amount);
    }
  }

  for (const tx of monthManual) {
    const amount = Number(tx.amount || 0);
    if (tx.type === "income") {
      income += amount;
    } else {
      expense += amount;
      categoryMap.set(tx.category || "Sonstiges", (categoryMap.get(tx.category || "Sonstiges") || 0) + amount);
    }
  }

  return {
    income,
    expense,
    net: income - expense,
    categories: [...categoryMap.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
    plannedItems: monthPlanned,
    manualItems: monthManual,
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

function buildDebtPlan(months, summariesByMonth, debtAccounts) {
  const activeAccounts = [...debtAccounts]
    .filter((x) => x.is_active)
    .sort((a, b) => Number(a.payoff_priority || 999) - Number(b.payoff_priority || 999));

  let reserve = 0;
  const running = new Map(
    activeAccounts.map((acc) => [acc.id, { principal: Number(acc.start_balance || 0), accrued: 0 }])
  );

  return months.map((month) => {
    const summary = summariesByMonth[month] || { income: 0, expense: 0, net: 0, categories: [] };
    let available = round2(summary.net);
    const perAccount = [];

    for (const acc of activeAccounts) {
      const state = running.get(acc.id);
      const principalStart = round2(state.principal);
      const accruedStart = round2(state.accrued);
      const monthlyInterest = round2(principalStart * Number(acc.annual_interest_rate || 0) / 12);
      const bookedInterest = isQuarterlyBookingMonth(month, acc.interest_booking_cycle) ? round2(accruedStart + monthlyInterest) : 0;
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

    reserve = round2(reserve + Math.max(0, available));

    return {
      month,
      summary,
      availableBeforeDebt: round2(summary.net),
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
    months: form.frequency === "customMonths" ? form.customMonthsText.split(",").map((x) => x.trim()).filter(Boolean) : [],
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

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function App() {
  const width = useWindowWidth();
  const isSmall = width < 430;

  const [ui, setUi] = useState(() => {
    const raw = localStorage.getItem(UI_STORAGE_KEY);
    return raw ? JSON.parse(raw) : { lang: "de", theme: "light", profileMe: "", profileWife: "" };
  });
  const palette = palettes[ui.theme];
  const lang = ui.lang;

  useEffect(() => {
    localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(ui));
  }, [ui]);

  const [tab, setTab] = useState("today");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [householdId, setHouseholdId] = useState(null);
  const [householdName, setHouseholdName] = useState("");
  const [rules, setRules] = useState([]);
  const [debtAccounts, setDebtAccounts] = useState([]);
  const [bookingActions, setBookingActions] = useState([]);
  const [manualTransactions, setManualTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingActionKey, setSavingActionKey] = useState("");
  const [message, setMessage] = useState(tr(lang, "notLoggedIn"));
  const [selectedMonth, setSelectedMonth] = useState("2026-04");
  const [selectedRuleId, setSelectedRuleId] = useState("");
  const [ruleForm, setRuleForm] = useState(() => emptyRuleForm("2026-04"));
  const [manualForm, setManualForm] = useState(() => emptyManualForm("2026-04"));

  const isOwner = profile?.role === "owner";

  const styles = useMemo(() => ({
    page: { minHeight: "100vh", background: palette.bg, color: palette.text, fontFamily: "Inter, Arial, Helvetica, sans-serif", paddingBottom: 92 },
    container: { maxWidth: 540, margin: "0 auto", padding: isSmall ? 12 : 16 },
    hero: { display: "grid", gap: 12, marginBottom: 14 },
    heroCard: { background: palette.gradient, color: "#fff", borderRadius: 24, padding: isSmall ? 16 : 20, boxShadow: palette.shadow },
    controlsCard: { background: palette.panel, border: `1px solid ${palette.border}`, borderRadius: 22, padding: 14, boxShadow: palette.shadow },
    title: { margin: 0, fontSize: isSmall ? 28 : 34, lineHeight: 1.05, fontWeight: 800 },
    subtitle: { marginTop: 8, color: "rgba(255,255,255,0.88)", fontSize: 14 },
    card: { background: palette.panel, border: `1px solid ${palette.border}`, borderRadius: 22, padding: 14, boxShadow: palette.shadow },
    cardTitle: { margin: 0, fontSize: 20, fontWeight: 800 },
    cardSubtitle: { marginTop: 6, marginBottom: 12, color: palette.sub, fontSize: 13 },
    metrics: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
    metric: { background: palette.panelSoft, border: `1px solid ${palette.border}`, borderRadius: 18, padding: 14 },
    metricLabel: { fontSize: 12, color: palette.sub },
    metricValue: { marginTop: 6, fontSize: 24, fontWeight: 800 },
    metricHint: { marginTop: 6, fontSize: 12, color: palette.sub },
    input: { width: "100%", padding: "12px 14px", borderRadius: 16, border: `1px solid ${palette.border}`, background: palette.panelSoft, color: palette.text, boxSizing: "border-box", fontSize: 15 },
    textarea: { width: "100%", padding: "12px 14px", borderRadius: 16, border: `1px solid ${palette.border}`, background: palette.panelSoft, color: palette.text, boxSizing: "border-box", fontSize: 15, minHeight: 90, resize: "vertical" },
    button: { padding: "12px 14px", borderRadius: 16, border: `1px solid ${palette.border}`, background: palette.panel, color: palette.text, fontWeight: 700, cursor: "pointer" },
    buttonPrimary: { background: palette.text, color: palette.panel, border: `1px solid ${palette.text}` },
    buttonAccent: { background: palette.accent, color: "#fff", border: `1px solid ${palette.accent}` },
    buttonDanger: { background: palette.danger, color: "#fff", border: `1px solid ${palette.danger}` },
    buttonSoft: { background: palette.accentSoft, color: palette.accent, border: `1px solid ${palette.border}` },
    row: { display: "flex", gap: 8, flexWrap: "wrap" },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
    subtle: { color: palette.sub, fontSize: 13 },
    chip: { display: "inline-flex", alignItems: "center", padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
    bookingCard: { background: palette.panelSoft, border: `1px solid ${palette.border}`, borderRadius: 18, padding: 14, display: "grid", gap: 10 },
    avatar: { width: 54, height: 54, borderRadius: "50%", objectFit: "cover", border: `2px solid ${palette.border}` },
    avatarFallback: { width: 54, height: 54, borderRadius: "50%", background: palette.gradient, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800 },
    bottomNav: { position: "fixed", left: 0, right: 0, bottom: 0, background: palette.panel, borderTop: `1px solid ${palette.border}`, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6, padding: "10px 8px calc(10px + env(safe-area-inset-bottom))" },
    navButton: { background: "transparent", border: "none", color: palette.sub, fontWeight: 700, fontSize: 11, padding: 8, borderRadius: 12, cursor: "pointer" },
    navButtonActive: { background: palette.accentSoft, color: palette.accent },
    chartTrack: { height: 12, background: palette.border, borderRadius: 999, overflow: "hidden" },
  }), [palette, isSmall]);

  useEffect(() => {
    async function init() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          setMessage(error.message);
          setLoading(false);
          return;
        }
        setSession(session);
        if (session?.user) {
          await bootstrapUser(session.user.id);
        }
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        await bootstrapUser(newSession.user.id);
      } else {
        setProfile(null);
        setHouseholdId(null);
        setRules([]);
        setDebtAccounts([]);
        setBookingActions([]);
        setManualTransactions([]);
        setMessage(tr(ui.lang, "notLoggedIn"));
      }
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    ]);
    setMessage(tr(lang, "rulesLoaded"));
  }

  async function loadProfile(userId) {
    const { data, error } = await supabase.from("profiles").select("id, email, role, display_name").eq("id", userId).single();
    if (error) {
      setProfile(null);
      setMessage("Profilfehler: " + error.message);
      return null;
    }
    setProfile(data);
    return data;
  }

  async function loadHousehold(userId) {
    const { data, error } = await supabase.from("household_members").select("household_id, role, households(name)").eq("user_id", userId).single();
    if (error) {
      setMessage("Haushalt konnte nicht geladen werden: " + error.message);
      return null;
    }
    setHouseholdId(data.household_id);
    setHouseholdName(data.households?.name || "");
    return data;
  }

  async function loadRules(hId) {
    const { data, error } = await supabase.from("rules").select("*").eq("household_id", hId).order("created_at", { ascending: true });
    if (error) {
      setMessage("Regeln konnten nicht geladen werden: " + error.message);
      return;
    }
    const safe = (data || []).map((rule) => ({ ...rule, months: normalizeMonths(rule.months) }));
    setRules(safe);
    if (safe.length > 0 && !selectedRuleId) {
      setSelectedRuleId(safe[0].id);
      setRuleForm(ruleToForm(safe[0]));
    }
  }

  async function loadDebtAccounts(hId) {
    const { data, error } = await supabase.from("debt_accounts").select("*").eq("household_id", hId).order("payoff_priority", { ascending: true });
    if (error) {
      setMessage("Schuldenkonten konnten nicht geladen werden: " + error.message);
      return;
    }
    setDebtAccounts(data || []);
  }

  async function loadBookingActions(hId) {
    const { data, error } = await supabase.from("booking_actions").select("*").eq("household_id", hId).order("planned_date", { ascending: true });
    if (error) {
      setMessage("Buchungsaktionen konnten nicht geladen werden: " + error.message);
      return;
    }
    setBookingActions(data || []);
  }

  async function loadManualTransactions(hId) {
    const { data, error } = await supabase.from("manual_transactions").select("*").eq("household_id", hId).order("booking_date", { ascending: true });
    if (error) {
      setMessage("Manuelle Buchungen konnten nicht geladen werden: " + error.message);
      return;
    }
    setManualTransactions(data || []);
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
    setHouseholdId(null);
    setRules([]);
    setDebtAccounts([]);
    setBookingActions([]);
    setManualTransactions([]);
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

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  const plannedOccurrences = useMemo(() => buildPlannedOccurrences(rules, monthOptions), [rules, monthOptions]);
  const plannedWithActions = useMemo(() => mergePlannedWithActions(plannedOccurrences, bookingActions), [plannedOccurrences, bookingActions]);

  const summariesByMonth = useMemo(() => {
    const result = {};
    monthOptions.forEach((month) => {
      result[month] = summarizeMonth(month, plannedWithActions, manualTransactions);
    });
    return result;
  }, [monthOptions, plannedWithActions, manualTransactions]);

  const selectedSummary = summariesByMonth[selectedMonth] || { income: 0, expense: 0, net: 0, categories: [], plannedItems: [], manualItems: [] };
  const debtPlan = useMemo(() => buildDebtPlan(monthOptions, summariesByMonth, debtAccounts), [monthOptions, summariesByMonth, debtAccounts]);
  const selectedDebtRow = useMemo(() => debtPlan.find((row) => row.month === selectedMonth) || debtPlan[0], [debtPlan, selectedMonth]);

  const todayOpenItems = useMemo(() => plannedWithActions.filter((x) => x.planned_date === todayStr && x.status === "open"), [plannedWithActions, todayStr]);
  const overdueItems = useMemo(() => plannedWithActions.filter((x) => x.planned_date < todayStr && x.status === "open"), [plannedWithActions, todayStr]);
  const next7Items = useMemo(() => {
    return plannedWithActions.filter((x) => {
      if (x.status !== "open") return false;
      const diff = (new Date(`${x.planned_date}T00:00:00`) - new Date(`${todayStr}T00:00:00`)) / (1000 * 60 * 60 * 24);
      return diff >= 1 && diff <= 7;
    });
  }, [plannedWithActions, todayStr]);

  function statusChip(statusKey) {
    const colors = {
      confirmed: { bg: `${palette.success}22`, color: palette.success },
      skipped: { bg: palette.border, color: palette.sub },
      overdue: { bg: `${palette.danger}22`, color: palette.danger },
      today: { bg: `${palette.warning}22`, color: palette.warning },
      open: { bg: palette.accentSoft, color: palette.accent },
    };
    const c = colors[statusKey] || colors.open;
    return { ...styles.chip, background: c.bg, color: c.color };
  }

  async function saveBookingAction(item, actionType) {
    if (!isOwner) {
      setMessage(tr(lang, "onlyOwner"));
      return;
    }
    setSavingActionKey(`${item.rule_id}_${item.planned_date}_${actionType}`);

    const actualAmountInput = actionType === "skip" ? 0 : prompt(tr(lang, "actualAmount"), String(item.actual_amount ?? item.planned_amount));
    if (actualAmountInput === null && actionType !== "skip") {
      setSavingActionKey("");
      return;
    }
    const actualDateInput = actionType === "skip" ? item.planned_date : prompt(tr(lang, "actualDate"), item.actual_date || item.planned_date);
    if (actualDateInput === null && actionType !== "skip") {
      setSavingActionKey("");
      return;
    }
    const actualNoteInput = prompt(tr(lang, "note"), item.actual_note || item.note || "") ?? "";

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
      actual_date: actionType === "skip" ? item.planned_date : actualDateInput,
      actual_amount: actionType === "skip" ? 0 : Number(actualAmountInput),
      actual_note: actualNoteInput,
      created_by: profile?.id || null,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (item.action_id) {
      ({ error } = await supabase.from("booking_actions").update(payload).eq("id", item.action_id));
    } else {
      ({ error } = await supabase.from("booking_actions").insert(payload));
    }

    setSavingActionKey("");

    if (error) {
      setMessage("Fehler beim Speichern: " + error.message);
      return;
    }

    await loadBookingActions(householdId);
    setMessage(tr(lang, "bookingActionSaved"));
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

    if (!payload.title || !Number.isFinite(payload.amount)) {
      setMessage("Titel oder Betrag ungültig.");
      return;
    }

    const { error } = await supabase.from("manual_transactions").insert(payload);
    if (error) {
      setMessage("Fehler beim Speichern: " + error.message);
      return;
    }

    setManualForm(emptyManualForm(selectedMonth));
    await loadManualTransactions(householdId);
    setMessage(tr(lang, "bookingSaved"));
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
    if (!payload.title || !Number.isFinite(payload.amount)) {
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
    setSelectedRuleId("");
    setRuleForm(emptyRuleForm(selectedMonth));
    setMessage(tr(lang, "ruleDeleted"));
  }

  async function handleImageUpload(key, event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setUi((prev) => ({ ...prev, [key]: base64 }));
  }

  function BookingCard({ item, showActions = true }) {
    const visualStatus = inferOccurrenceStatus(item, todayStr);
    return (
      <div style={styles.bookingCard}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start" }}>
          <div>
            <div style={{ fontWeight: 800 }}>{item.title}</div>
            <div style={styles.subtle}>{formatDate(item.planned_date, lang)} · {item.type === "income" ? tr(lang, "income") : tr(lang, "expense")}</div>
            <div style={styles.subtle}>{item.category} · {item.account}</div>
          </div>
          <div style={statusChip(visualStatus)}>{mapStatus(lang, visualStatus)}</div>
        </div>

        <div style={styles.grid2}>
          <div>
            <div style={styles.subtle}>{tr(lang, "amount")}</div>
            <div style={{ fontWeight: 800 }}>{formatCurrency(item.planned_amount)}</div>
          </div>
          <div>
            <div style={styles.subtle}>{tr(lang, "actualAmount")}</div>
            <div style={{ fontWeight: 800 }}>{item.status === "confirmed" ? formatCurrency(item.actual_amount) : item.status === "skipped" ? formatCurrency(0) : "-"}</div>
          </div>
        </div>

        {item.actual_date || item.actual_note ? (
          <div style={styles.subtle}>
            {item.actual_date ? `${tr(lang, "actualDate")}: ${formatDate(item.actual_date, lang)}` : ""}
            {item.actual_date && item.actual_note ? " · " : ""}
            {item.actual_note || ""}
          </div>
        ) : null}

        {showActions && isOwner && item.status !== "confirmed" && item.status !== "skipped" ? (
          <div style={styles.row}>
            <button
              style={{ ...styles.button, ...styles.buttonPrimary }}
              onClick={() => saveBookingAction(item, "confirm")}
              disabled={Boolean(savingActionKey)}
            >
              {savingActionKey === `${item.rule_id}_${item.planned_date}_confirm` ? tr(lang, "saving") : tr(lang, "confirm")}
            </button>
            <button style={styles.button} onClick={() => saveBookingAction(item, "confirm")}>{tr(lang, "editAmount")}</button>
            <button style={{ ...styles.button, ...styles.buttonDanger }} onClick={() => saveBookingAction(item, "skip")}>{tr(lang, "skip")}</button>
          </div>
        ) : null}
      </div>
    );
  }

  function Section({ title, subtitle, children }) {
    return (
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>{title}</h2>
        {subtitle ? <div style={styles.cardSubtitle}>{subtitle}</div> : null}
        {children}
      </div>
    );
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.card}><h1 style={styles.cardTitle}>{tr(lang, "appTitle")}</h1><div style={styles.cardSubtitle}>{tr(lang, "loading")}</div></div>
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
              <h1 style={styles.title}>{tr(lang, "appTitle")}</h1>
              <div style={styles.subtitle}>{tr(lang, "appSubtitle")}</div>
            </div>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>{tr(lang, "login")}</h2>
            <div style={styles.cardSubtitle}>{message}</div>
            <form onSubmit={handleLogin} style={{ display: "grid", gap: 12 }}>
              <input style={styles.input} type="email" placeholder={tr(lang, "email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input style={styles.input} type="password" placeholder={tr(lang, "password")} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button style={{ ...styles.button, ...styles.buttonPrimary }} type="submit">{tr(lang, "login")}</button>
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
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
              <div>
                <h1 style={styles.title}>{tr(lang, "appTitle")}</h1>
                <div style={styles.subtitle}>{tr(lang, "appSubtitle")}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {ui.profileMe ? <img src={ui.profileMe} alt="me" style={styles.avatar} /> : <div style={styles.avatarFallback}>T</div>}
                {ui.profileWife ? <img src={ui.profileWife} alt="wife" style={styles.avatar} /> : <div style={styles.avatarFallback}>N</div>}
              </div>
            </div>
          </div>

          <div style={styles.controlsCard}>
            <div style={{ display: "grid", gap: 10 }}>
              <select style={styles.input} value={selectedMonth} onChange={(e) => { setSelectedMonth(e.target.value); setManualForm((prev) => ({ ...prev, booking_date: createDate(e.target.value, 15) })); }}>
                {monthOptions.map((m) => <option key={m} value={m}>{formatMonth(m, lang)}</option>)}
              </select>
              <div style={styles.subtle}>{householdName || "-"} · {tr(lang, "role")}: {roleLabel(lang, profile?.role)}</div>
              <div style={styles.subtle}>{message}</div>
            </div>
          </div>
        </div>

        {tab === "today" && (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={styles.metrics}>
              <div style={styles.metric}><div style={styles.metricLabel}>{tr(lang, "monthlyIncome")}</div><div style={styles.metricValue}>{formatCurrency(selectedSummary.income)}</div><div style={styles.metricHint}>{formatMonth(selectedMonth, lang)}</div></div>
              <div style={styles.metric}><div style={styles.metricLabel}>{tr(lang, "monthlyExpense")}</div><div style={styles.metricValue}>{formatCurrency(selectedSummary.expense)}</div><div style={styles.metricHint}>{formatMonth(selectedMonth, lang)}</div></div>
              <div style={styles.metric}><div style={styles.metricLabel}>{tr(lang, "availableBeforeDebt")}</div><div style={styles.metricValue}>{formatCurrency(selectedDebtRow?.availableBeforeDebt || 0)}</div><div style={styles.metricHint}>{tr(lang, "dashboard")}</div></div>
              <div style={styles.metric}><div style={styles.metricLabel}>{tr(lang, "totalDebt")}</div><div style={styles.metricValue}>{formatCurrency(selectedDebtRow?.totalDebt || 0)}</div><div style={styles.metricHint}>{tr(lang, "reserveEnd")}: {formatCurrency(selectedDebtRow?.reserve || 0)}</div></div>
            </div>

            <Section title={tr(lang, "todayDue")} subtitle={tr(lang, "mobileHint")}>
              <div style={{ display: "grid", gap: 10 }}>
                {todayOpenItems.length ? todayOpenItems.map((item) => <BookingCard key={item.key} item={item} />) : <div style={styles.subtle}>{tr(lang, "noTasks")}</div>}
              </div>
            </Section>

            <Section title={tr(lang, "overdueItems")}>
              <div style={{ display: "grid", gap: 10 }}>
                {overdueItems.length ? overdueItems.map((item) => <BookingCard key={item.key} item={item} />) : <div style={styles.subtle}>{tr(lang, "noTasks")}</div>}
              </div>
            </Section>

            <Section title={tr(lang, "next7Days")}>
              <div style={{ display: "grid", gap: 10 }}>
                {next7Items.length ? next7Items.map((item) => <BookingCard key={item.key} item={item} />) : <div style={styles.subtle}>{tr(lang, "noTasks")}</div>}
              </div>
            </Section>
          </div>
        )}

        {tab === "plan" && (
          <div style={{ display: "grid", gap: 12 }}>
            <Section title={tr(lang, "planOverview")} subtitle={formatMonth(selectedMonth, lang)}>
              <div style={{ display: "grid", gap: 10 }}>
                {selectedSummary.plannedItems.map((item) => <BookingCard key={item.key} item={item} />)}
                {selectedSummary.manualItems.map((item) => (
                  <div key={item.id} style={styles.bookingCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{item.title}</div>
                        <div style={styles.subtle}>{formatDate(item.booking_date, lang)} · {item.type === "income" ? tr(lang, "income") : tr(lang, "expense")}</div>
                        <div style={styles.subtle}>{item.category || "Sonstiges"} · {item.account || "Hauptkonto"}</div>
                      </div>
                      <div style={statusChip("confirmed")}>{tr(lang, "confirmed")}</div>
                    </div>
                    <div style={{ fontWeight: 800 }}>{formatCurrency(item.amount)}</div>
                    {item.note ? <div style={styles.subtle}>{item.note}</div> : null}
                  </div>
                ))}
                {!selectedSummary.plannedItems.length && !selectedSummary.manualItems.length ? <div style={styles.subtle}>{tr(lang, "noData")}</div> : null}
              </div>
            </Section>

            <Section title={tr(lang, "category")} subtitle={formatMonth(selectedMonth, lang)}>
              {selectedSummary.categories.length === 0 ? <div style={styles.subtle}>{tr(lang, "noData")}</div> : (
                <div style={{ display: "grid", gap: 12 }}>
                  {selectedSummary.categories.map((cat) => {
                    const max = Math.max(...selectedSummary.categories.map((x) => x.value), 1);
                    return (
                      <div key={cat.label}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, fontSize: 13 }}>
                          <strong>{cat.label}</strong>
                          <span>{formatCurrency(cat.value)}</span>
                        </div>
                        <div style={styles.chartTrack}><div style={{ width: `${(cat.value / max) * 100}%`, height: 12, background: palette.accent }} /></div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Section>
          </div>
        )}

        {tab === "book" && (
          <div style={{ display: "grid", gap: 12 }}>
            <Section title={tr(lang, "bookNow")} subtitle={isOwner ? tr(lang, "mobileHint") : tr(lang, "onlyOwner")}>
              <form onSubmit={handleSaveManual} style={{ display: "grid", gap: 10 }}>
                <input style={styles.input} type="date" value={manualForm.booking_date} onChange={(e) => setManualForm((prev) => ({ ...prev, booking_date: e.target.value }))} disabled={!isOwner} />
                <input style={styles.input} value={manualForm.title} onChange={(e) => setManualForm((prev) => ({ ...prev, title: e.target.value }))} placeholder={tr(lang, "title")} required disabled={!isOwner} />
                <div style={styles.grid2}>
                  <select style={styles.input} value={manualForm.type} onChange={(e) => setManualForm((prev) => ({ ...prev, type: e.target.value }))} disabled={!isOwner}>
                    <option value="expense">{tr(lang, "expense")}</option>
                    <option value="income">{tr(lang, "income")}</option>
                  </select>
                  <input style={styles.input} type="number" step="0.01" value={manualForm.amount} onChange={(e) => setManualForm((prev) => ({ ...prev, amount: e.target.value }))} placeholder={tr(lang, "amount")} required disabled={!isOwner} />
                </div>
                <div style={styles.grid2}>
                  <input style={styles.input} value={manualForm.category} onChange={(e) => setManualForm((prev) => ({ ...prev, category: e.target.value }))} placeholder={tr(lang, "category")} disabled={!isOwner} />
                  <input style={styles.input} value={manualForm.account} onChange={(e) => setManualForm((prev) => ({ ...prev, account: e.target.value }))} placeholder={tr(lang, "account")} disabled={!isOwner} />
                </div>
                <textarea style={styles.textarea} value={manualForm.note} onChange={(e) => setManualForm((prev) => ({ ...prev, note: e.target.value }))} placeholder={tr(lang, "note")} disabled={!isOwner} />
                <button type="submit" style={{ ...styles.button, ...styles.buttonPrimary }} disabled={!isOwner}>{tr(lang, "addBooking")}</button>
              </form>
            </Section>
          </div>
        )}

        {tab === "debt" && (
          <div style={{ display: "grid", gap: 12 }}>
            <Section title={tr(lang, "debtAccounts")} subtitle={formatMonth(selectedMonth, lang)}>
              <div style={{ display: "grid", gap: 10 }}>
                {selectedDebtRow?.perAccount?.map((acc) => (
                  <div key={acc.id} style={styles.bookingCard}>
                    <div style={{ fontWeight: 800 }}>{acc.name}</div>
                    <div style={styles.grid2}>
                      <div><div style={styles.subtle}>Start</div><div style={{ fontWeight: 800 }}>{formatCurrency(acc.principalStart + acc.accruedStart)}</div></div>
                      <div><div style={styles.subtle}>{tr(lang, "paymentToDebt")}</div><div style={{ fontWeight: 800, color: palette.accent }}>{formatCurrency(acc.payment)}</div></div>
                      <div><div style={styles.subtle}>Zinsen</div><div style={{ fontWeight: 800 }}>{formatCurrency(acc.bookedInterest)}</div></div>
                      <div><div style={styles.subtle}>Ende</div><div style={{ fontWeight: 800 }}>{formatCurrency(acc.totalEnd)}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title={tr(lang, "debtPlan")} subtitle={tr(lang, "dashboard")}>
              <div style={{ display: "grid", gap: 10 }}>
                {debtPlan.map((row) => (
                  <div key={row.month} style={styles.bookingCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ fontWeight: 800 }}>{formatMonth(row.month, lang)}</div>
                      <div style={statusChip(row.totalDebt === 0 ? "confirmed" : "open")}>{formatCurrency(row.totalDebt)}</div>
                    </div>
                    <div style={styles.grid2}>
                      <div><div style={styles.subtle}>{tr(lang, "availableBeforeDebt")}</div><div style={{ fontWeight: 800 }}>{formatCurrency(row.availableBeforeDebt)}</div></div>
                      <div><div style={styles.subtle}>{tr(lang, "paymentToDebt")}</div><div style={{ fontWeight: 800 }}>{formatCurrency(row.totalPayment)}</div></div>
                      <div><div style={styles.subtle}>{tr(lang, "reserveEnd")}</div><div style={{ fontWeight: 800 }}>{formatCurrency(row.reserve)}</div></div>
                      <div><div style={styles.subtle}>{tr(lang, "totalDebt")}</div><div style={{ fontWeight: 800 }}>{formatCurrency(row.totalDebt)}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {tab === "rules" && (
          <div style={{ display: "grid", gap: 12 }}>
            <Section title={tr(lang, "rules")} subtitle={tr(lang, "mobileHint")}>
              <div style={{ display: "grid", gap: 10 }}>
                <select style={styles.input} value={selectedRuleId} onChange={(e) => handleSelectRule(e.target.value)}>
                  {isOwner && <option value="__new__">{tr(lang, "newRule")}</option>}
                  {!selectedRuleId && !isOwner && <option value="">{tr(lang, "chooseRule")}</option>}
                  {rules.map((rule) => <option key={rule.id} value={rule.id}>{rule.title}</option>)}
                </select>

                <form onSubmit={handleSaveRule} style={{ display: "grid", gap: 10 }}>
                  <input style={styles.input} value={ruleForm.title} onChange={(e) => setRuleForm((prev) => ({ ...prev, title: e.target.value }))} placeholder={tr(lang, "title")} disabled={!isOwner} required />
                  <div style={styles.grid2}>
                    <select style={styles.input} value={ruleForm.type} onChange={(e) => setRuleForm((prev) => ({ ...prev, type: e.target.value }))} disabled={!isOwner}>
                      <option value="income">{tr(lang, "income")}</option>
                      <option value="expense">{tr(lang, "expense")}</option>
                    </select>
                    <input style={styles.input} type="number" step="0.01" value={ruleForm.amount} onChange={(e) => setRuleForm((prev) => ({ ...prev, amount: e.target.value }))} placeholder={tr(lang, "amount")} disabled={!isOwner} required />
                  </div>
                  <div style={styles.grid2}>
                    <select style={styles.input} value={ruleForm.frequency} onChange={(e) => setRuleForm((prev) => ({ ...prev, frequency: e.target.value }))} disabled={!isOwner}>
                      <option value="monthly">{tr(lang, "monthly")}</option>
                      <option value="weekly">{tr(lang, "weekly")}</option>
                      <option value="everyOtherMonth">{tr(lang, "everyOtherMonth")}</option>
                      <option value="customMonths">{tr(lang, "customMonths")}</option>
                    </select>
                    {ruleForm.frequency === "weekly" ? (
                      <select style={styles.input} value={ruleForm.weekday} onChange={(e) => setRuleForm((prev) => ({ ...prev, weekday: Number(e.target.value) }))} disabled={!isOwner}>
                        <option value={1}>{tr(lang, "monday")}</option>
                        <option value={2}>{tr(lang, "tuesday")}</option>
                        <option value={3}>{tr(lang, "wednesday")}</option>
                        <option value={4}>{tr(lang, "thursday")}</option>
                        <option value={5}>{tr(lang, "friday")}</option>
                        <option value={6}>{tr(lang, "saturday")}</option>
                        <option value={0}>{tr(lang, "sunday")}</option>
                      </select>
                    ) : (
                      <input style={styles.input} type="number" min="1" max="31" value={ruleForm.day} onChange={(e) => setRuleForm((prev) => ({ ...prev, day: e.target.value }))} placeholder={tr(lang, "dayOfMonth")} disabled={!isOwner} />
                    )}
                  </div>
                  {ruleForm.frequency === "customMonths" ? <input style={styles.input} value={ruleForm.customMonthsText} onChange={(e) => setRuleForm((prev) => ({ ...prev, customMonthsText: e.target.value }))} placeholder={tr(lang, "customMonthsHint")} disabled={!isOwner} /> : null}
                  <div style={styles.grid2}>
                    <input style={styles.input} type="month" value={ruleForm.start_month} onChange={(e) => setRuleForm((prev) => ({ ...prev, start_month: e.target.value }))} disabled={!isOwner} />
                    <input style={styles.input} type="month" value={ruleForm.end_month} onChange={(e) => setRuleForm((prev) => ({ ...prev, end_month: e.target.value }))} disabled={!isOwner} />
                  </div>
                  <div style={styles.grid2}>
                    <input style={styles.input} value={ruleForm.category} onChange={(e) => setRuleForm((prev) => ({ ...prev, category: e.target.value }))} placeholder={tr(lang, "category")} disabled={!isOwner} />
                    <input style={styles.input} value={ruleForm.account} onChange={(e) => setRuleForm((prev) => ({ ...prev, account: e.target.value }))} placeholder={tr(lang, "account")} disabled={!isOwner} />
                  </div>
                  <textarea style={styles.textarea} value={ruleForm.note} onChange={(e) => setRuleForm((prev) => ({ ...prev, note: e.target.value }))} placeholder={tr(lang, "note")} disabled={!isOwner} />
                  <div style={styles.row}>
                    {isOwner ? <button type="submit" style={{ ...styles.button, ...styles.buttonPrimary }}>{tr(lang, "save")}</button> : null}
                    {isOwner ? <button type="button" style={styles.button} onClick={() => { setSelectedRuleId("__new__"); setRuleForm(emptyRuleForm(selectedMonth)); }}>{tr(lang, "newRule")}</button> : null}
                    {isOwner && ruleForm.id ? <button type="button" style={{ ...styles.button, ...styles.buttonDanger }} onClick={handleDeleteRule}>{tr(lang, "deleteRule")}</button> : null}
                  </div>
                </form>
              </div>
            </Section>
          </div>
        )}

        {tab === "settings" && (
          <div style={{ display: "grid", gap: 12 }}>
            <Section title={tr(lang, "settingsTitle")} subtitle={tr(lang, "mobileHint")}>
              <div style={{ display: "grid", gap: 14 }}>
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>{tr(lang, "language")}</div>
                  <div style={styles.row}>
                    <button style={ui.lang === "de" ? { ...styles.button, ...styles.buttonPrimary } : styles.button} onClick={() => setUi((prev) => ({ ...prev, lang: "de" }))}>Deutsch</button>
                    <button style={ui.lang === "ru" ? { ...styles.button, ...styles.buttonPrimary } : styles.button} onClick={() => setUi((prev) => ({ ...prev, lang: "ru" }))}>Русский</button>
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>{tr(lang, "theme")}</div>
                  <div style={styles.row}>
                    <button style={ui.theme === "light" ? { ...styles.button, ...styles.buttonPrimary } : styles.button} onClick={() => setUi((prev) => ({ ...prev, theme: "light" }))}>{tr(lang, "light")}</button>
                    <button style={ui.theme === "dark" ? { ...styles.button, ...styles.buttonPrimary } : styles.button} onClick={() => setUi((prev) => ({ ...prev, theme: "dark" }))}>{tr(lang, "dark")}</button>
                  </div>
                </div>
              </div>
            </Section>

            <Section title={tr(lang, "familyPhotos")}>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={styles.bookingCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {ui.profileMe ? <img src={ui.profileMe} alt="me" style={styles.avatar} /> : <div style={styles.avatarFallback}>T</div>}
                    <div>
                      <div style={{ fontWeight: 800 }}>{tr(lang, "me")}</div>
                      <div style={styles.subtle}>{tr(lang, "uploadImage")}</div>
                    </div>
                  </div>
                  <div style={styles.row}>
                    <label style={{ ...styles.button, ...styles.buttonSoft, cursor: "pointer" }}>
                      {tr(lang, "uploadImage")}
                      <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload("profileMe", e)} />
                    </label>
                    {ui.profileMe ? <button style={styles.button} onClick={() => setUi((prev) => ({ ...prev, profileMe: "" }))}>{tr(lang, "removeImage")}</button> : null}
                  </div>
                </div>
                <div style={styles.bookingCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {ui.profileWife ? <img src={ui.profileWife} alt="wife" style={styles.avatar} /> : <div style={styles.avatarFallback}>N</div>}
                    <div>
                      <div style={{ fontWeight: 800 }}>{tr(lang, "wife")}</div>
                      <div style={styles.subtle}>{tr(lang, "uploadImage")}</div>
                    </div>
                  </div>
                  <div style={styles.row}>
                    <label style={{ ...styles.button, ...styles.buttonSoft, cursor: "pointer" }}>
                      {tr(lang, "uploadImage")}
                      <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload("profileWife", e)} />
                    </label>
                    {ui.profileWife ? <button style={styles.button} onClick={() => setUi((prev) => ({ ...prev, profileWife: "" }))}>{tr(lang, "removeImage")}</button> : null}
                  </div>
                </div>
                <div style={styles.subtle}>{tr(lang, "user")}: {session.user.email}<br />{tr(lang, "household")}: {householdName || householdId || "-"}</div>
                <button style={styles.button} onClick={handleLogout}>{tr(lang, "logout")}</button>
              </div>
            </Section>
          </div>
        )}
      </div>

      <div style={styles.bottomNav}>
        {[
          ["today", tr(lang, "today")],
          ["plan", tr(lang, "plan")],
          ["book", tr(lang, "book")],
          ["debt", tr(lang, "debt")],
          ["rules", tr(lang, "rules")],
          ["settings", tr(lang, "settings")],
        ].map(([key, label]) => (
          <button key={key} style={tab === key ? { ...styles.navButton, ...styles.navButtonActive } : styles.navButton} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
