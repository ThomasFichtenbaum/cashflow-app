import { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabase";

const UI_STORAGE_KEY = "cashflow-ui-v2";

const DEBT_MODEL = {
  account2: {
    name: "Konto 2",
    startBalance: 1000,
    annualRate: 0.12,
  },
  account1: {
    name: "Konto 1",
    startBalance: 15000,
    annualRate: 0.095,
  },
  quarterlyInterestMonths: [3, 6, 9, 12],
};

const texts = {
  de: {
    appTitle: "Cashflow-App",
    appSubtitle: "Schuldenabbau im Fokus: Regeln aus Supabase, Monatsplan und Tilgungslogik wie im Budgetmodell.",
    login: "Einloggen",
    logout: "Ausloggen",
    email: "E-Mail",
    password: "Passwort",
    loading: "Lade ...",
    notLoggedIn: "Nicht eingeloggt",
    loginRunning: "Login läuft ...",
    loggedIn: "Erfolgreich eingeloggt",
    dashboard: "Dashboard",
    debtPlan: "Schuldenplan",
    rules: "Regeln",
    settings: "Einstellungen",
    month: "Monat",
    monthlyIncome: "Monatliche Einnahmen",
    monthlyExpense: "Monatliche Ausgaben",
    availableBeforeDebt: "Verfügbar vor Tilgung",
    monthlyNet: "Monatssaldo",
    totalRules: "Regeln gesamt",
    basedOnRules: "Berechnet aus den Regeln",
    basedOnPlan: "Berechnet aus Regeln + Schuldentilgung",
    role: "Rolle",
    owner: "Inhaber",
    viewer: "Nur Ansicht",
    unknown: "unbekannt",
    user: "Benutzer",
    household: "Haushalt",
    monthlyOverview: "Monatsüberblick",
    categories: "Ausgaben nach Kategorie",
    noData: "Keine Daten vorhanden.",
    ruleSelection: "Regel auswählen",
    chooseRule: "Bitte Regel auswählen",
    newRule: "Neue Regel",
    editRule: "Regel bearbeiten",
    saveRule: "Speichern",
    deleteRule: "Löschen",
    cancel: "Abbrechen",
    title: "Bezeichnung",
    type: "Typ",
    income: "Einnahme",
    expense: "Ausgabe",
    amount: "Betrag",
    frequency: "Rhythmus",
    monthly: "Monatlich",
    weekly: "Wöchentlich",
    everyOtherMonth: "Alle 2 Monate",
    customMonths: "Bestimmte Monate",
    dayOfMonth: "Tag im Monat",
    weekday: "Wochentag",
    startMonth: "Startmonat",
    endMonth: "Endmonat",
    category: "Kategorie",
    account: "Konto",
    note: "Notiz",
    customMonthsHint: "z. B. 2026-06, 2026-12",
    onlyOwner: "Nur der Inhaber darf Änderungen machen.",
    ruleSaved: "Regel gespeichert.",
    ruleDeleted: "Regel gelöscht.",
    rulesLoaded: "Regeln geladen.",
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
    viewerHint: "Du bist im Ansichtsmodus. Bearbeiten ist deaktiviert.",
    ownerHint: "Du bist Inhaber. Bearbeiten, Speichern und Löschen sind aktiv.",
    mobileHint: "Die Regeln werden bewusst über ein Dropdown ausgewählt, damit die Handyansicht sauber bleibt.",
    noRuleSelected: "Noch keine Regel ausgewählt.",
    ruleDetails: "Regeldetails",
    exportLater: "CSV, manuelle Buchungen und Bestätigen/Skippen bauen wir im nächsten Schritt auf dieser Basis auf.",
    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samstag",
    sunday: "Sonntag",
    debtFocus: "Schuldenabbau",
    startingDebt: "Startverschuldung",
    debtEndOfMonth: "Restschuld Monatsende",
    reserveEndOfMonth: "Reserve Monatsende",
    paymentToAccount1: "Zahlung an Konto 1",
    paymentToAccount2: "Zahlung an Konto 2",
    bookedInterest1: "Gebuchte Zinsen Konto 1",
    bookedInterest2: "Gebuchte Zinsen Konto 2",
    freeSurplus: "Freier Überschuss",
    totalDebt: "Gesamtverschuldung",
    targetDebtFreeDec: "Ziel 31.12.2026",
    targetDebtFreeMar: "Ziel 31.03.2027",
    targetReached: "erreicht",
    targetOpen: "offen",
    debtModelInfo: "Das Schuldenmodell nutzt aktuell die Werte aus deiner Excel-Datei: Konto 2 zuerst, danach Konto 1; Zinsen monatlich berechnet und quartalsweise gebucht.",
    debtTableMonth: "Monat",
    reserve: "Reserve",
    payment: "Tilgung",
    interest: "Zinsen",
  },
  ru: {
    appTitle: "Cashflow-App",
    appSubtitle: "Фокус на погашении долгов: правила из Supabase, месячный план и логика погашения как в бюджетной модели.",
    login: "Войти",
    logout: "Выйти",
    email: "Эл. почта",
    password: "Пароль",
    loading: "Загрузка ...",
    notLoggedIn: "Не выполнен вход",
    loginRunning: "Выполняется вход ...",
    loggedIn: "Вход выполнен",
    dashboard: "Панель",
    debtPlan: "План долгов",
    rules: "Правила",
    settings: "Настройки",
    month: "Месяц",
    monthlyIncome: "Доходы за месяц",
    monthlyExpense: "Расходы за месяц",
    availableBeforeDebt: "Доступно до погашения",
    monthlyNet: "Баланс за месяц",
    totalRules: "Всего правил",
    basedOnRules: "Рассчитано по правилам",
    basedOnPlan: "Рассчитано по правилам и плану погашения",
    role: "Роль",
    owner: "Владелец",
    viewer: "Только просмотр",
    unknown: "неизвестно",
    user: "Пользователь",
    household: "Домохозяйство",
    monthlyOverview: "Обзор месяца",
    categories: "Расходы по категориям",
    noData: "Нет данных.",
    ruleSelection: "Выбрать правило",
    chooseRule: "Пожалуйста, выберите правило",
    newRule: "Новое правило",
    editRule: "Редактировать правило",
    saveRule: "Сохранить",
    deleteRule: "Удалить",
    cancel: "Отмена",
    title: "Название",
    type: "Тип",
    income: "Доход",
    expense: "Расход",
    amount: "Сумма",
    frequency: "Ритм",
    monthly: "Ежемесячно",
    weekly: "Еженедельно",
    everyOtherMonth: "Каждые 2 месяца",
    customMonths: "Определённые месяцы",
    dayOfMonth: "День месяца",
    weekday: "День недели",
    startMonth: "Начальный месяц",
    endMonth: "Конечный месяц",
    category: "Категория",
    account: "Счёт",
    note: "Заметка",
    customMonthsHint: "например 2026-06, 2026-12",
    onlyOwner: "Только владелец может вносить изменения.",
    ruleSaved: "Правило сохранено.",
    ruleDeleted: "Правило удалено.",
    rulesLoaded: "Правила загружены.",
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
    viewerHint: "Вы в режиме просмотра. Редактирование отключено.",
    ownerHint: "Вы владелец. Редактирование, сохранение и удаление доступны.",
    mobileHint: "Для телефона правила специально выбираются через выпадающий список.",
    noRuleSelected: "Правило ещё не выбрано.",
    ruleDetails: "Детали правила",
    exportLater: "CSV, ручные проводки и подтверждение/пропуск мы добавим следующим шагом на этой базе.",
    monday: "Понедельник",
    tuesday: "Вторник",
    wednesday: "Среда",
    thursday: "Четверг",
    friday: "Пятница",
    saturday: "Суббота",
    sunday: "Воскресенье",
    debtFocus: "Погашение долгов",
    startingDebt: "Начальный долг",
    debtEndOfMonth: "Остаток долга на конец месяца",
    reserveEndOfMonth: "Резерв на конец месяца",
    paymentToAccount1: "Платёж на счёт 1",
    paymentToAccount2: "Платёж на счёт 2",
    bookedInterest1: "Начисленные проценты счёт 1",
    bookedInterest2: "Начисленные проценты счёт 2",
    freeSurplus: "Свободный остаток",
    totalDebt: "Общий долг",
    targetDebtFreeDec: "Цель 31.12.2026",
    targetDebtFreeMar: "Цель 31.03.2027",
    targetReached: "достигнуто",
    targetOpen: "открыто",
    debtModelInfo: "Модель долга сейчас использует значения из твоего Excel: сначала счёт 2, затем счёт 1; проценты считаются ежемесячно и списываются поквартально.",
    debtTableMonth: "Месяц",
    reserve: "Резерв",
    payment: "Погашение",
    interest: "Проценты",
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
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value || 0));
}

function formatMonth(month, lang) {
  const [y, m] = month.split("-").map(Number);
  return `${monthNames[lang][m - 1]} ${y}`;
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

function getMonthBoundsFromRules(rules) {
  if (!rules.length) {
    return { start: "2026-04", end: "2027-03" };
  }

  let start = rules[0].start_month || "2026-04";
  let end = rules[0].end_month || "2027-03";

  for (const rule of rules) {
    if (rule.start_month && monthIndex(rule.start_month) < monthIndex(start)) start = rule.start_month;
    if (rule.end_month && monthIndex(rule.end_month) > monthIndex(end)) end = rule.end_month;
  }

  return { start, end };
}

function datesForWeeklyInMonth(month, weekday) {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  const result = [];

  while (d.getMonth() === m - 1) {
    if (d.getDay() === Number(weekday)) {
      result.push(d.getDate());
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
  return (monthIndex(month) - monthIndex(rule.start_month)) % 2 === 0;
}

function expandRuleForMonth(rule, month) {
  if (!ruleActiveInMonth(rule, month)) return [];

  const amount = Number(rule.amount || 0);
  const category = rule.category || "Sonstiges";
  const account = rule.account || "Hauptkonto";
  const months = normalizeMonths(rule.months);

  if (rule.frequency === "monthly") {
    return [{ type: rule.type, amount, category, account, title: rule.title }];
  }

  if (rule.frequency === "weekly") {
    const days = datesForWeeklyInMonth(month, rule.weekday ?? 1);
    return days.map(() => ({ type: rule.type, amount, category, account, title: rule.title }));
  }

  if (rule.frequency === "everyOtherMonth") {
    if (isEveryOtherMonthHit(rule, month)) {
      return [{ type: rule.type, amount, category, account, title: rule.title }];
    }
    return [];
  }

  if (rule.frequency === "customMonths") {
    if (months.includes(month)) {
      return [{ type: rule.type, amount, category, account, title: rule.title }];
    }
    return [];
  }

  return [];
}

function summarizeRulesForMonth(rules, month) {
  let income = 0;
  let expense = 0;
  const categoryMap = new Map();

  for (const rule of rules) {
    const entries = expandRuleForMonth(rule, month);
    for (const entry of entries) {
      if (entry.type === "income") {
        income += entry.amount;
      } else {
        expense += entry.amount;
        categoryMap.set(entry.category, (categoryMap.get(entry.category) || 0) + entry.amount);
      }
    }
  }

  return {
    income,
    expense,
    net: income - expense,
    categories: [...categoryMap.entries()]
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value),
  };
}

function isQuarterlyBookingMonth(month) {
  const m = Number(month.split("-")[1]);
  return DEBT_MODEL.quarterlyInterestMonths.includes(m);
}

function round2(value) {
  return Math.round((Number(value || 0) + Number.EPSILON) * 100) / 100;
}

function buildDebtPlan(months, rules) {
  let reserve = 0;
  let account2Balance = DEBT_MODEL.account2.startBalance;
  let account2Accrued = 0;
  let account1Balance = DEBT_MODEL.account1.startBalance;
  let account1Accrued = 0;

  return months.map((month) => {
    const summary = summarizeRulesForMonth(rules, month);
    const availableBeforeDebt = round2(summary.income - summary.expense);
    const quarterlyMonth = isQuarterlyBookingMonth(month);

    const account2Start = round2(account2Balance);
    const account2AccruedStart = round2(account2Accrued);
    const account2MonthlyInterest = round2(account2Start * DEBT_MODEL.account2.annualRate / 12);
    const account2BookedInterest = quarterlyMonth ? round2(account2AccruedStart + account2MonthlyInterest) : 0;
    const account2PaymentBase = round2(account2Start + account2BookedInterest);
    const paymentToAccount2 = round2(Math.max(0, Math.min(availableBeforeDebt, account2PaymentBase)));
    const account2End = round2(Math.max(0, account2Start + account2BookedInterest - paymentToAccount2));
    const account2AccruedEnd = account2BookedInterest > 0 ? 0 : round2(account2AccruedStart + account2MonthlyInterest);

    const account1Start = round2(account1Balance);
    const account1AccruedStart = round2(account1Accrued);
    const account1MonthlyInterest = round2(account1Start * DEBT_MODEL.account1.annualRate / 12);
    const account1BookedInterest = quarterlyMonth ? round2(account1AccruedStart + account1MonthlyInterest) : 0;
    const availableForAccount1 = round2(Math.max(0, availableBeforeDebt - paymentToAccount2));
    const account1PaymentBase = round2(account1Start + account1BookedInterest);
    const paymentToAccount1 = round2(Math.max(0, Math.min(availableForAccount1, account1PaymentBase)));
    const account1End = round2(Math.max(0, account1Start + account1BookedInterest - paymentToAccount1));
    const account1AccruedEnd = account1BookedInterest > 0 ? 0 : round2(account1AccruedStart + account1MonthlyInterest);

    const freeSurplus = round2(availableBeforeDebt - paymentToAccount2 - paymentToAccount1);
    reserve = round2(reserve + freeSurplus);
    const totalDebt = round2(account2End + account2AccruedEnd + account1End + account1AccruedEnd);

    const row = {
      month,
      summary,
      availableBeforeDebt,
      account2Start,
      account2AccruedStart,
      account2MonthlyInterest,
      account2BookedInterest,
      paymentToAccount2,
      account2End,
      account2AccruedEnd,
      account1Start,
      account1AccruedStart,
      account1MonthlyInterest,
      account1BookedInterest,
      paymentToAccount1,
      account1End,
      account1AccruedEnd,
      freeSurplus,
      reserve,
      totalDebt,
    };

    account2Balance = account2End;
    account2Accrued = account2AccruedEnd;
    account1Balance = account1End;
    account1Accrued = account1AccruedEnd;

    return row;
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

function formToPayload(form, householdId) {
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

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function App() {
  const width = useWindowWidth();
  const isMobile = width < 900;
  const isSmall = width < 560;

  const [ui, setUi] = useState(() => {
    const raw = localStorage.getItem(UI_STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : {
          lang: "de",
          theme: "light",
          profileMe: "",
          profileWife: "",
        };
  });

  const palette = palettes[ui.theme];
  const lang = ui.lang;

  useEffect(() => {
    localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(ui));
  }, [ui]);

  const [tab, setTab] = useState("dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [householdId, setHouseholdId] = useState(null);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(tr(lang, "notLoggedIn"));
  const [selectedMonth, setSelectedMonth] = useState("2026-04");
  const [selectedRuleId, setSelectedRuleId] = useState("");
  const [ruleForm, setRuleForm] = useState(() => emptyRuleForm("2026-04"));

  const isOwner = profile?.role === "owner";

  const styles = useMemo(
    () => ({
      page: {
        minHeight: "100vh",
        background: palette.bg,
        color: palette.text,
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
      },
      container: {
        maxWidth: 1240,
        margin: "0 auto",
        padding: isSmall ? 12 : 18,
      },
      hero: {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr",
        gap: 14,
        marginBottom: 16,
      },
      heroCard: {
        background: palette.gradient,
        color: "#fff",
        borderRadius: 26,
        padding: isSmall ? 18 : 24,
        boxShadow: palette.shadow,
      },
      controlsCard: {
        background: palette.panel,
        border: `1px solid ${palette.border}`,
        borderRadius: 24,
        padding: isSmall ? 14 : 18,
        boxShadow: palette.shadow,
      },
      title: {
        margin: 0,
        fontSize: isSmall ? 34 : 44,
        lineHeight: 1.02,
        fontWeight: 800,
      },
      subtitle: {
        marginTop: 10,
        color: "rgba(255,255,255,0.88)",
        fontSize: isSmall ? 14 : 16,
        maxWidth: 720,
      },
      tabs: {
        display: "flex",
        gap: 8,
        overflowX: "auto",
        paddingBottom: 4,
        marginBottom: 16,
      },
      tab: {
        padding: "12px 16px",
        borderRadius: 18,
        border: `1px solid ${palette.border}`,
        background: palette.panel,
        color: palette.text,
        fontWeight: 700,
        whiteSpace: "nowrap",
        cursor: "pointer",
      },
      tabActive: {
        background: palette.text,
        color: palette.panel,
        border: `1px solid ${palette.text}`,
      },
      card: {
        background: palette.panel,
        border: `1px solid ${palette.border}`,
        borderRadius: 24,
        padding: isSmall ? 14 : 18,
        boxShadow: palette.shadow,
      },
      cardTitle: {
        margin: 0,
        fontSize: isSmall ? 20 : 24,
        fontWeight: 800,
      },
      cardSubtitle: {
        marginTop: 6,
        marginBottom: 14,
        color: palette.sub,
        fontSize: 14,
      },
      metrics: {
        display: "grid",
        gridTemplateColumns: isSmall ? "1fr 1fr" : isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
        gap: 12,
      },
      metric: {
        background: palette.panelSoft,
        border: `1px solid ${palette.border}`,
        borderRadius: 20,
        padding: 15,
      },
      metricLabel: {
        fontSize: 13,
        color: palette.sub,
      },
      metricValue: {
        marginTop: 6,
        fontSize: isSmall ? 24 : 30,
        fontWeight: 800,
      },
      metricHint: {
        marginTop: 6,
        fontSize: 12,
        color: palette.sub,
      },
      grid2: {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: 14,
      },
      grid3: {
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: 14,
      },
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
      buttonAccent: {
        background: palette.accent,
        color: "#fff",
        border: `1px solid ${palette.accent}`,
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
      row: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
      },
      subtle: {
        color: palette.sub,
        fontSize: 13,
      },
      chartTrack: {
        height: 12,
        background: palette.border,
        borderRadius: 999,
        overflow: "hidden",
      },
      tableWrap: {
        overflowX: "auto",
        borderRadius: 18,
      },
      table: {
        width: "100%",
        minWidth: isMobile ? 860 : "100%",
        borderCollapse: "collapse",
        fontSize: 14,
      },
      th: {
        textAlign: "left",
        padding: "12px 10px",
        borderBottom: `1px solid ${palette.border}`,
        color: palette.sub,
        whiteSpace: "nowrap",
        fontWeight: 700,
      },
      td: {
        padding: "12px 10px",
        borderBottom: `1px solid ${palette.border}`,
        verticalAlign: "top",
      },
      ruleCard: {
        background: palette.panelSoft,
        border: `1px solid ${palette.border}`,
        borderRadius: 20,
        padding: 14,
      },
      avatar: {
        width: 72,
        height: 72,
        borderRadius: "50%",
        objectFit: "cover",
        border: `2px solid ${palette.border}`,
      },
      avatarFallback: {
        width: 72,
        height: 72,
        borderRadius: "50%",
        background: palette.gradient,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        fontWeight: 800,
      },
      chip: {
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
      },
    }),
    [palette, isMobile, isSmall]
  );

  useEffect(() => {
    async function init() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          setMessage(error.message);
          setLoading(false);
          return;
        }

        setSession(session);

        if (session?.user) {
          const loadedProfile = await loadProfile(session.user.id);
          if (loadedProfile) {
            await loadHousehold(session.user.id);
          }
        }
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    }

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);

      if (newSession?.user) {
        const loadedProfile = await loadProfile(newSession.user.id);
        if (loadedProfile) {
          await loadHousehold(newSession.user.id);
        }
      } else {
        setProfile(null);
        setHouseholdId(null);
        setRules([]);
        setMessage(tr(ui.lang, "notLoggedIn"));
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, role, display_name")
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
      .select("household_id, role")
      .eq("user_id", userId)
      .single();

    if (error) {
      setMessage("Haushalt konnte nicht geladen werden: " + error.message);
      return;
    }

    setHouseholdId(data.household_id);
    await loadRules(data.household_id);
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

    const safeRules = (data || []).map((rule) => ({
      ...rule,
      months: normalizeMonths(rule.months),
    }));

    setRules(safeRules);

    const bounds = getMonthBoundsFromRules(safeRules);
    setSelectedMonth((prev) => prev || bounds.start);

    if (!selectedRuleId && safeRules.length > 0) {
      setSelectedRuleId(safeRules[0].id);
      setRuleForm(ruleToForm(safeRules[0]));
    }

    setMessage(tr(lang, "rulesLoaded"));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setMessage(tr(lang, "loginRunning"));

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

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
    setSelectedRuleId("");
    setRuleForm(emptyRuleForm(selectedMonth));
    setMessage(tr(lang, "notLoggedIn"));
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

    if (!householdId) {
      setMessage("Kein Haushalt gefunden.");
      return;
    }

    const payload = formToPayload(ruleForm, householdId);

    if (!payload.title) {
      setMessage("Titel fehlt.");
      return;
    }

    if (!Number.isFinite(payload.amount)) {
      setMessage("Betrag ungültig.");
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
    if (!isOwner) {
      setMessage(tr(lang, "onlyOwner"));
      return;
    }

    if (!ruleForm.id) return;

    const currentId = ruleForm.id;
    const { error } = await supabase.from("rules").delete().eq("id", currentId);

    if (error) {
      setMessage("Fehler beim Löschen: " + error.message);
      return;
    }

    await loadRules(householdId);

    const remaining = rules.filter((r) => r.id !== currentId);
    if (remaining.length > 0) {
      setSelectedRuleId(remaining[0].id);
      setRuleForm(ruleToForm(remaining[0]));
    } else {
      setSelectedRuleId("");
      setRuleForm(emptyRuleForm(selectedMonth));
    }

    setMessage(tr(lang, "ruleDeleted"));
  }

  function handleNewRule() {
    setSelectedRuleId("__new__");
    setRuleForm(emptyRuleForm(selectedMonth));
  }

  async function handleImageUpload(key, event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setUi((prev) => ({ ...prev, [key]: base64 }));
  }

  const monthBounds = useMemo(() => getMonthBoundsFromRules(rules), [rules]);
  const monthOptions = useMemo(() => monthRange(monthBounds.start, monthBounds.end), [monthBounds]);
  const debtPlan = useMemo(() => buildDebtPlan(monthOptions, rules), [monthOptions, rules]);
  const selectedPlanRow = useMemo(() => debtPlan.find((row) => row.month === selectedMonth) || debtPlan[0], [debtPlan, selectedMonth]);
  const selectedSummary = selectedPlanRow?.summary || { income: 0, expense: 0, net: 0, categories: [] };
  const startDebt = DEBT_MODEL.account1.startBalance + DEBT_MODEL.account2.startBalance;
  const rowDec2026 = debtPlan.find((row) => row.month === "2026-12");
  const rowMar2027 = debtPlan.find((row) => row.month === "2027-03");

  useEffect(() => {
    if (monthOptions.length && !monthOptions.includes(selectedMonth)) {
      setSelectedMonth(monthOptions[0]);
    }
  }, [monthOptions, selectedMonth]);

  useEffect(() => {
    if (tab !== "rules") return;
    if (!selectedRuleId && rules.length > 0) {
      setSelectedRuleId(rules[0].id);
      setRuleForm(ruleToForm(rules[0]));
    }
  }, [rules, selectedRuleId, tab]);

  function renderCategoryBars() {
    if (!selectedSummary.categories.length) {
      return <div style={styles.subtle}>{tr(lang, "noData")}</div>;
    }

    const max = Math.max(...selectedSummary.categories.map((x) => x.value), 1);

    return (
      <div style={{ display: "grid", gap: 12 }}>
        {selectedSummary.categories.map((cat) => {
          const widthPct = `${(cat.value / max) * 100}%`;
          return (
            <div key={cat.label}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, fontSize: 13 }}>
                <strong>{cat.label}</strong>
                <span>{formatCurrency(cat.value)}</span>
              </div>
              <div style={styles.chartTrack}>
                <div style={{ width: widthPct, height: 12, background: palette.accent }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function renderDebtStatusChip(isReached) {
    return (
      <div
        style={{
          ...styles.chip,
          background: isReached ? `${palette.success}22` : palette.accentSoft,
          color: isReached ? palette.success : palette.accent,
        }}
      >
        {isReached ? tr(lang, "targetReached") : tr(lang, "targetOpen")}
      </div>
    );
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.cardTitle}>{tr(lang, "appTitle")}</h1>
            <p style={styles.cardSubtitle}>{tr(lang, "loading")}</p>
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
              <h1 style={styles.title}>{tr(lang, "appTitle")}</h1>
              <div style={styles.subtitle}>{tr(lang, "appSubtitle")}</div>
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
            <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "start", flexWrap: "wrap" }}>
              <div>
                <h1 style={styles.title}>{tr(lang, "appTitle")}</h1>
                <div style={styles.subtitle}>{tr(lang, "appSubtitle")}</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {ui.profileMe ? (
                  <img src={ui.profileMe} alt="me" style={{ ...styles.avatar, width: 54, height: 54 }} />
                ) : (
                  <div style={{ ...styles.avatarFallback, width: 54, height: 54, fontSize: 18 }}>T</div>
                )}
                {ui.profileWife ? (
                  <img src={ui.profileWife} alt="wife" style={{ ...styles.avatar, width: 54, height: 54 }} />
                ) : (
                  <div style={{ ...styles.avatarFallback, width: 54, height: 54, fontSize: 18 }}>N</div>
                )}
              </div>
            </div>
          </div>

          <div style={styles.controlsCard}>
            <div style={{ display: "grid", gap: 12 }}>
              <select style={styles.input} value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                {monthOptions.map((m) => (
                  <option key={m} value={m}>
                    {formatMonth(m, lang)}
                  </option>
                ))}
              </select>

              <div style={styles.row}>
                <button style={{ ...styles.button, ...styles.buttonAccent }} onClick={() => setTab("debtPlan")}>
                  {tr(lang, "debtPlan")}
                </button>
                <button style={styles.button} onClick={handleLogout}>
                  {tr(lang, "logout")}
                </button>
              </div>

              <div style={styles.subtle}>{message}</div>
            </div>
          </div>
        </div>

        <div style={styles.tabs}>
          {[
            ["dashboard", tr(lang, "dashboard")],
            ["debtPlan", tr(lang, "debtPlan")],
            ["rules", tr(lang, "rules")],
            ["settings", tr(lang, "settings")],
          ].map(([key, label]) => (
            <button key={key} style={tab === key ? { ...styles.tab, ...styles.tabActive } : styles.tab} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && (
          <div style={{ display: "grid", gap: 14 }}>
            <div style={styles.metrics}>
              <div style={styles.metric}>
                <div style={styles.metricLabel}>{tr(lang, "monthlyIncome")}</div>
                <div style={styles.metricValue}>{formatCurrency(selectedSummary.income)}</div>
                <div style={styles.metricHint}>{tr(lang, "basedOnRules")}</div>
              </div>
              <div style={styles.metric}>
                <div style={styles.metricLabel}>{tr(lang, "monthlyExpense")}</div>
                <div style={styles.metricValue}>{formatCurrency(selectedSummary.expense)}</div>
                <div style={styles.metricHint}>{tr(lang, "basedOnRules")}</div>
              </div>
              <div style={styles.metric}>
                <div style={styles.metricLabel}>{tr(lang, "availableBeforeDebt")}</div>
                <div style={styles.metricValue}>{formatCurrency(selectedPlanRow?.availableBeforeDebt || 0)}</div>
                <div style={styles.metricHint}>{tr(lang, "basedOnPlan")}</div>
              </div>
              <div style={styles.metric}>
                <div style={styles.metricLabel}>{tr(lang, "debtEndOfMonth")}</div>
                <div style={styles.metricValue}>{formatCurrency(selectedPlanRow?.totalDebt || 0)}</div>
                <div style={styles.metricHint}>{formatMonth(selectedMonth, lang)}</div>
              </div>
            </div>

            <div style={styles.grid3}>
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>{tr(lang, "debtFocus")}</h2>
                <div style={styles.cardSubtitle}>{formatMonth(selectedMonth, lang)}</div>
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={styles.ruleCard}>
                    <div style={styles.subtle}>{tr(lang, "startingDebt")}</div>
                    <div style={{ fontSize: 28, fontWeight: 800 }}>{formatCurrency(startDebt)}</div>
                  </div>
                  <div style={styles.ruleCard}>
                    <div style={styles.subtle}>{tr(lang, "paymentToAccount2")}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: palette.accent }}>{formatCurrency(selectedPlanRow?.paymentToAccount2 || 0)}</div>
                  </div>
                  <div style={styles.ruleCard}>
                    <div style={styles.subtle}>{tr(lang, "paymentToAccount1")}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: palette.accent }}>{formatCurrency(selectedPlanRow?.paymentToAccount1 || 0)}</div>
                  </div>
                </div>
              </div>

              <div style={styles.card}>
                <h2 style={styles.cardTitle}>{tr(lang, "monthlyOverview")}</h2>
                <div style={styles.cardSubtitle}>
                  {tr(lang, "user")}: {session.user.email}
                  <br />
                  {tr(lang, "role")}: {roleLabel(lang, profile?.role)}
                  <br />
                  {tr(lang, "household")}: {householdId || "-"}
                </div>

                <div style={{ ...styles.chip, background: isOwner ? `${palette.success}22` : palette.accentSoft, color: isOwner ? palette.success : palette.accent }}>
                  {isOwner ? tr(lang, "ownerHint") : tr(lang, "viewerHint")}
                </div>

                <div style={{ marginTop: 14, color: palette.sub, fontSize: 14 }}>{tr(lang, "debtModelInfo")}</div>
              </div>

              <div style={styles.card}>
                <h2 style={styles.cardTitle}>{tr(lang, "reserveEndOfMonth")}</h2>
                <div style={styles.cardSubtitle}>{formatMonth(selectedMonth, lang)}</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: (selectedPlanRow?.reserve || 0) >= 0 ? palette.success : palette.danger }}>
                  {formatCurrency(selectedPlanRow?.reserve || 0)}
                </div>
                <div style={{ marginTop: 12, color: palette.sub }}>{tr(lang, "exportLater")}</div>
              </div>
            </div>

            <div style={styles.grid2}>
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>{tr(lang, "categories")}</h2>
                <div style={styles.cardSubtitle}>{formatMonth(selectedMonth, lang)}</div>
                {renderCategoryBars()}
              </div>

              <div style={styles.card}>
                <h2 style={styles.cardTitle}>{tr(lang, "targetDebtFreeDec")}</h2>
                <div style={styles.cardSubtitle}>{tr(lang, "debtFocus")}</div>
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={styles.ruleCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{tr(lang, "targetDebtFreeDec")}</div>
                        <div style={styles.subtle}>{rowDec2026 ? formatCurrency(rowDec2026.totalDebt) : "-"}</div>
                      </div>
                      {renderDebtStatusChip((rowDec2026?.totalDebt || 0) === 0)}
                    </div>
                  </div>
                  <div style={styles.ruleCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{tr(lang, "targetDebtFreeMar")}</div>
                        <div style={styles.subtle}>{rowMar2027 ? formatCurrency(rowMar2027.totalDebt) : "-"}</div>
                      </div>
                      {renderDebtStatusChip((rowMar2027?.totalDebt || 0) === 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "debtPlan" && (
          <div style={{ display: "grid", gap: 14 }}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{tr(lang, "debtPlan")}</h2>
              <div style={styles.cardSubtitle}>{tr(lang, "debtModelInfo")}</div>

              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>{tr(lang, "debtTableMonth")}</th>
                      <th style={styles.th}>{tr(lang, "monthlyIncome")}</th>
                      <th style={styles.th}>{tr(lang, "monthlyExpense")}</th>
                      <th style={styles.th}>{tr(lang, "availableBeforeDebt")}</th>
                      <th style={styles.th}>{tr(lang, "bookedInterest2")}</th>
                      <th style={styles.th}>{tr(lang, "paymentToAccount2")}</th>
                      <th style={styles.th}>{tr(lang, "bookedInterest1")}</th>
                      <th style={styles.th}>{tr(lang, "paymentToAccount1")}</th>
                      <th style={styles.th}>{tr(lang, "freeSurplus")}</th>
                      <th style={styles.th}>{tr(lang, "reserveEndOfMonth")}</th>
                      <th style={styles.th}>{tr(lang, "totalDebt")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debtPlan.map((row) => (
                      <tr key={row.month}>
                        <td style={styles.td}>{formatMonth(row.month, lang)}</td>
                        <td style={styles.td}>{formatCurrency(row.summary.income)}</td>
                        <td style={styles.td}>{formatCurrency(row.summary.expense)}</td>
                        <td style={{ ...styles.td, fontWeight: 700 }}>{formatCurrency(row.availableBeforeDebt)}</td>
                        <td style={styles.td}>{formatCurrency(row.account2BookedInterest)}</td>
                        <td style={{ ...styles.td, color: palette.accent, fontWeight: 700 }}>{formatCurrency(row.paymentToAccount2)}</td>
                        <td style={styles.td}>{formatCurrency(row.account1BookedInterest)}</td>
                        <td style={{ ...styles.td, color: palette.accent, fontWeight: 700 }}>{formatCurrency(row.paymentToAccount1)}</td>
                        <td style={{ ...styles.td, color: row.freeSurplus >= 0 ? palette.success : palette.danger }}>{formatCurrency(row.freeSurplus)}</td>
                        <td style={{ ...styles.td, color: row.reserve >= 0 ? palette.success : palette.danger }}>{formatCurrency(row.reserve)}</td>
                        <td style={{ ...styles.td, fontWeight: 800, color: row.totalDebt === 0 ? palette.success : palette.danger }}>{formatCurrency(row.totalDebt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.grid2}>
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>{DEBT_MODEL.account2.name}</h2>
                <div style={styles.cardSubtitle}>{formatMonth(selectedMonth, lang)}</div>
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={styles.ruleCard}>
                    <div style={styles.subtle}>{tr(lang, "payment")}</div>
                    <div style={{ fontSize: 26, fontWeight: 800 }}>{formatCurrency(selectedPlanRow?.paymentToAccount2 || 0)}</div>
                  </div>
                  <div style={styles.ruleCard}>
                    <div style={styles.subtle}>{tr(lang, "interest")}</div>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{formatCurrency(selectedPlanRow?.account2BookedInterest || 0)}</div>
                  </div>
                  <div style={styles.ruleCard}>
                    <div style={styles.subtle}>{tr(lang, "debtEndOfMonth")}</div>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{formatCurrency((selectedPlanRow?.account2End || 0) + (selectedPlanRow?.account2AccruedEnd || 0))}</div>
                  </div>
                </div>
              </div>

              <div style={styles.card}>
                <h2 style={styles.cardTitle}>{DEBT_MODEL.account1.name}</h2>
                <div style={styles.cardSubtitle}>{formatMonth(selectedMonth, lang)}</div>
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={styles.ruleCard}>
                    <div style={styles.subtle}>{tr(lang, "payment")}</div>
                    <div style={{ fontSize: 26, fontWeight: 800 }}>{formatCurrency(selectedPlanRow?.paymentToAccount1 || 0)}</div>
                  </div>
                  <div style={styles.ruleCard}>
                    <div style={styles.subtle}>{tr(lang, "interest")}</div>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{formatCurrency(selectedPlanRow?.account1BookedInterest || 0)}</div>
                  </div>
                  <div style={styles.ruleCard}>
                    <div style={styles.subtle}>{tr(lang, "debtEndOfMonth")}</div>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{formatCurrency((selectedPlanRow?.account1End || 0) + (selectedPlanRow?.account1AccruedEnd || 0))}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "rules" && (
          <div style={{ display: "grid", gap: 14 }}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{tr(lang, "rules")}</h2>
              <div style={styles.cardSubtitle}>{tr(lang, "mobileHint")}</div>

              <div style={{ display: "grid", gap: 12 }}>
                <select style={styles.input} value={selectedRuleId} onChange={(e) => handleSelectRule(e.target.value)}>
                  {isOwner && <option value="__new__">{tr(lang, "newRule")}</option>}
                  {!selectedRuleId && !isOwner && <option value="">{tr(lang, "chooseRule")}</option>}
                  {rules.map((rule) => (
                    <option key={rule.id} value={rule.id}>
                      {rule.title}
                    </option>
                  ))}
                </select>

                {selectedRuleId && selectedRuleId !== "__new__" && (
                  <div style={styles.ruleCard}>
                    <div style={{ fontWeight: 800 }}>{tr(lang, "ruleDetails")}</div>
                    <div style={styles.subtle}>
                      {ruleForm.type === "income" ? tr(lang, "income") : tr(lang, "expense")} · {formatCurrency(ruleForm.amount || 0)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {(selectedRuleId || (isOwner && selectedRuleId === "__new__")) ? (
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>{selectedRuleId === "__new__" ? tr(lang, "newRule") : tr(lang, "editRule")}</h2>
                <div style={styles.cardSubtitle}>{isOwner ? tr(lang, "ownerHint") : tr(lang, "viewerHint")}</div>

                <form onSubmit={handleSaveRule} style={{ display: "grid", gap: 12 }}>
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

                  {ruleForm.frequency === "customMonths" && (
                    <input
                      style={styles.input}
                      value={ruleForm.customMonthsText}
                      onChange={(e) => setRuleForm((prev) => ({ ...prev, customMonthsText: e.target.value }))}
                      placeholder={tr(lang, "customMonthsHint")}
                      disabled={!isOwner}
                    />
                  )}

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
                    style={{ ...styles.input, minHeight: 90, resize: "vertical" }}
                    value={ruleForm.note}
                    onChange={(e) => setRuleForm((prev) => ({ ...prev, note: e.target.value }))}
                    placeholder={tr(lang, "note")}
                    disabled={!isOwner}
                  />

                  <div style={styles.row}>
                    {isOwner && (
                      <>
                        <button type="submit" style={{ ...styles.button, ...styles.buttonPrimary }}>
                          {tr(lang, "saveRule")}
                        </button>
                        <button type="button" style={styles.button} onClick={handleNewRule}>
                          {tr(lang, "newRule")}
                        </button>
                        {ruleForm.id && (
                          <button type="button" style={{ ...styles.button, ...styles.buttonDanger }} onClick={handleDeleteRule}>
                            {tr(lang, "deleteRule")}
                          </button>
                        )}
                      </>
                    )}

                    {isOwner && selectedRuleId === "__new__" && (
                      <button
                        type="button"
                        style={styles.button}
                        onClick={() => {
                          if (rules.length > 0) {
                            setSelectedRuleId(rules[0].id);
                            setRuleForm(ruleToForm(rules[0]));
                          } else {
                            setSelectedRuleId("");
                            setRuleForm(emptyRuleForm(selectedMonth));
                          }
                        }}
                      >
                        {tr(lang, "cancel")}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div style={styles.card}>
                <div style={styles.cardTitle}>{tr(lang, "ruleSelection")}</div>
                <div style={styles.cardSubtitle}>{tr(lang, "noRuleSelected")}</div>
              </div>
            )}
          </div>
        )}

        {tab === "settings" && (
          <div style={{ display: "grid", gap: 14 }}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{tr(lang, "settingsTitle")}</h2>
              <div style={styles.cardSubtitle}>{tr(lang, "mobileHint")}</div>

              <div style={{ display: "grid", gap: 14 }}>
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>{tr(lang, "language")}</div>
                  <div style={styles.row}>
                    <button style={ui.lang === "de" ? { ...styles.button, ...styles.buttonPrimary } : styles.button} onClick={() => setUi((prev) => ({ ...prev, lang: "de" }))}>
                      Deutsch
                    </button>
                    <button style={ui.lang === "ru" ? { ...styles.button, ...styles.buttonPrimary } : styles.button} onClick={() => setUi((prev) => ({ ...prev, lang: "ru" }))}>
                      Русский
                    </button>
                  </div>
                </div>

                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>{tr(lang, "theme")}</div>
                  <div style={styles.row}>
                    <button style={ui.theme === "light" ? { ...styles.button, ...styles.buttonPrimary } : styles.button} onClick={() => setUi((prev) => ({ ...prev, theme: "light" }))}>
                      {tr(lang, "light")}
                    </button>
                    <button style={ui.theme === "dark" ? { ...styles.button, ...styles.buttonPrimary } : styles.button} onClick={() => setUi((prev) => ({ ...prev, theme: "dark" }))}>
                      {tr(lang, "dark")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>{tr(lang, "familyPhotos")}</h2>
              <div style={styles.cardSubtitle}>Profilbilder werden aktuell lokal auf dem Gerät gespeichert.</div>

              <div style={styles.grid2}>
                <div style={styles.ruleCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
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
                    {ui.profileMe && (
                      <button style={styles.button} onClick={() => setUi((prev) => ({ ...prev, profileMe: "" }))}>
                        {tr(lang, "removeImage")}
                      </button>
                    )}
                  </div>
                </div>

                <div style={styles.ruleCard}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
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
                    {ui.profileWife && (
                      <button style={styles.button} onClick={() => setUi((prev) => ({ ...prev, profileWife: "" }))}>
                        {tr(lang, "removeImage")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
