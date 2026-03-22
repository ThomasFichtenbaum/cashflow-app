import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "cashflow-budget-app-v4";

const translations = {
  de: {
    appTitle: "Cashflow App",
    appSubtitle: "Modern, mobil, zweisprachig und mit Live-Planabweichung.",
    dashboard: "Dashboard",
    monthPlan: "Monatsplan",
    tasks: "Fälligkeiten",
    rules: "Regeln",
    manual: "Buchung",
    settings: "Einstellungen",
    exportCsv: "CSV exportieren",
    reset: "Reset",
    incomes: "Einnahmen im Monat",
    expenses: "Ausgaben im Monat",
    balance: "Monatssaldo",
    running: "Laufender Stand",
    debtOverview: "Schuldenübersicht",
    totalDebt: "Gesamte Überziehung",
    todayTodo: "Was jetzt zu tun ist",
    noTasks: "Keine offenen Buchungen in den nächsten 7 Tagen.",
    variance: "Planabweichung",
    expenseByCategory: "Ausgaben nach Kategorie",
    monthlyFlow: "Monatsverlauf",
    monthPreview: "Monatsvorschau",
    selectedMonth: "Gewählter Monat",
    income: "Einnahme",
    expense: "Ausgabe",
    planned: "Geplant",
    actual: "Tatsächlich",
    status: "Status",
    action: "Aktion",
    date: "Datum",
    title: "Titel",
    category: "Kategorie",
    account: "Konto",
    type: "Typ",
    note: "Notiz",
    confirm: "OK",
    amount: "Betrag",
    skip: "Skip",
    overdue: "überfällig",
    today: "heute",
    confirmed: "bestätigt",
    skipped: "übersprungen",
    open: "geplant",
    ruleList: "Wiederkehrende Regeln",
    newRule: "Neue Regel",
    editRule: "Regel bearbeiten",
    saveRule: "Regel speichern",
    saveChanges: "Änderungen speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    edit: "Bearbeiten",
    description: "Bezeichnung",
    monthly: "Monatlich",
    weekly: "Wöchentlich",
    everyOtherMonth: "Alle 2 Monate",
    customMonths: "Bestimmte Monate",
    startMonth: "Startmonat",
    endMonth: "Endmonat",
    customMonthsHint: "Monate, z. B. 2026-06, 2026-12",
    manualBooking: "Manuelle Buchung",
    addBooking: "Buchung anlegen",
    dynamicHelp: "Die Planung passt sich automatisch an, sobald du echte Beträge bestätigst, auf Skip setzt oder neue Buchungen erfasst.",
    settingsTitle: "Einstellungen & Darstellung",
    language: "Sprache",
    theme: "Thema",
    light: "Tag",
    dark: "Nacht",
    profileArea: "Familie & Profilbilder",
    me: "Ich",
    wife: "Meine Frau",
    uploadImage: "Bild hochladen",
    removeImage: "Bild entfernen",
    mobileHint: "Die Oberfläche ist jetzt für Handy und Desktop optimiert. Auf kleinen Bildschirmen wird alles untereinander angezeigt.",
    recommendation: "Empfehlung",
    recommendationPositive: "Du liegst über Plan. Den Überschuss kannst du direkt für Sondertilgung oder Reserve verwenden.",
    recommendationNeutral: "Du liegst aktuell im Plan.",
    householdAccount: "Haushaltskonto",
    monthOverview: "Überblick des ausgewählten Monats",
    noData: "Keine Daten vorhanden.",
    april2026: "April 2026",
  },
  ru: {
    appTitle: "Приложение Cashflow",
    appSubtitle: "Современно, удобно для телефона, на двух языках и с живым контролем отклонений.",
    dashboard: "Панель",
    monthPlan: "Месяц",
    tasks: "Сроки",
    rules: "Правила",
    manual: "Проводка",
    settings: "Настройки",
    exportCsv: "Экспорт CSV",
    reset: "Сброс",
    incomes: "Доходы за месяц",
    expenses: "Расходы за месяц",
    balance: "Баланс месяца",
    running: "Текущий остаток",
    debtOverview: "Обзор долгов",
    totalDebt: "Общая задолженность",
    todayTodo: "Что нужно сделать сейчас",
    noTasks: "Нет открытых операций на ближайшие 7 дней.",
    variance: "Отклонение от плана",
    expenseByCategory: "Расходы по категориям",
    monthlyFlow: "Динамика по месяцам",
    monthPreview: "Прогноз по месяцам",
    selectedMonth: "Выбранный месяц",
    income: "Доход",
    expense: "Расход",
    planned: "План",
    actual: "Факт",
    status: "Статус",
    action: "Действие",
    date: "Дата",
    title: "Название",
    category: "Категория",
    account: "Счёт",
    type: "Тип",
    note: "Заметка",
    confirm: "ОК",
    amount: "Сумма",
    skip: "Пропустить",
    overdue: "просрочено",
    today: "сегодня",
    confirmed: "подтверждено",
    skipped: "пропущено",
    open: "запланировано",
    ruleList: "Повторяющиеся правила",
    newRule: "Новое правило",
    editRule: "Редактировать правило",
    saveRule: "Сохранить правило",
    saveChanges: "Сохранить изменения",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Изменить",
    description: "Название",
    monthly: "Ежемесячно",
    weekly: "Еженедельно",
    everyOtherMonth: "Каждые 2 месяца",
    customMonths: "Определённые месяцы",
    startMonth: "Начальный месяц",
    endMonth: "Конечный месяц",
    customMonthsHint: "Месяцы, напр. 2026-06, 2026-12",
    manualBooking: "Ручная проводка",
    addBooking: "Добавить проводку",
    dynamicHelp: "План автоматически меняется, когда вы подтверждаете реальные суммы, ставите Skip или добавляете новые операции.",
    settingsTitle: "Настройки и внешний вид",
    language: "Язык",
    theme: "Тема",
    light: "День",
    dark: "Ночь",
    profileArea: "Семья и фотографии",
    me: "Я",
    wife: "Моя жена",
    uploadImage: "Загрузить фото",
    removeImage: "Удалить фото",
    mobileHint: "Интерфейс теперь оптимизирован для телефона и компьютера. На маленьком экране всё идёт колонкой.",
    recommendation: "Рекомендация",
    recommendationPositive: "Вы идёте лучше плана. Излишек можно отправить на досрочное погашение или в резерв.",
    recommendationNeutral: "Сейчас вы идёте по плану.",
    householdAccount: "Счёт на хозяйство",
    monthOverview: "Обзор выбранного месяца",
    noData: "Нет данных.",
    april2026: "Апрель 2026",
  },
};

const themePresets = {
  light: {
    bg: "#eef3fb",
    panel: "#ffffff",
    panelSoft: "#f8fbff",
    text: "#10213d",
    sub: "#6b7a94",
    border: "#d9e2ef",
    accent: "#1f4cff",
    accentSoft: "#eaf0ff",
    danger: "#e53935",
    success: "#1f9d55",
    warning: "#d97706",
    shadow: "0 16px 30px rgba(17,24,39,0.06)",
    gradient: "linear-gradient(135deg, #2346ff 0%, #6a7cff 100%)",
  },
  dark: {
    bg: "#08111f",
    panel: "#101a2d",
    panelSoft: "#15213a",
    text: "#eef4ff",
    sub: "#96a6c8",
    border: "#24344f",
    accent: "#7c9cff",
    accentSoft: "#18274a",
    danger: "#ff6b6b",
    success: "#3ddc97",
    warning: "#ffb347",
    shadow: "0 16px 30px rgba(0,0,0,0.35)",
    gradient: "linear-gradient(135deg, #5678ff 0%, #7c9cff 100%)",
  },
};

const monthLabels = {
  de: ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
};

const weekdayNames = {
  de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  ru: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
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
    language: "de",
    theme: "light",
    profileMe: "",
    profileWife: "",
  },
};

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function t(lang, key) {
  return translations[lang]?.[key] || translations.de[key] || key;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR" }).format(value || 0);
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

function formatMonth(dateOrMonth) {
  if (typeof dateOrMonth === "string") return dateOrMonth.slice(0, 7);
  const y = dateOrMonth.getFullYear();
  const m = String(dateOrMonth.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function prettyMonth(month, lang = "de") {
  const [y, m] = month.split("-").map(Number);
  return `${monthLabels[lang][m - 1]} ${y}`;
}

function prettyDate(dateString, lang = "de") {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "de-AT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
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
  if (c?.status === "confirmed") return "confirmed";
  if (c?.status === "skipped") return "skipped";
  if (tx.date < todayStr) return "overdue";
  if (tx.date === todayStr) return "today";
  return "open";
}

function statusLabel(lang, statusKey) {
  const map = {
    confirmed: t(lang, "confirmed"),
    skipped: t(lang, "skipped"),
    overdue: t(lang, "overdue"),
    today: t(lang, "today"),
    open: t(lang, "open"),
  };
  return map[statusKey] || statusKey;
}

function exportCsv(rows, filename = "cashflow_export.csv") {
  const headers = Object.keys(rows[0] || {});
  const csv = [headers.join(";"), ...rows.map((row) => headers.map((h) => JSON.stringify(row[h] ?? "")).join(";"))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function signedAmount(type, amount) {
  return type === "income" ? Number(amount || 0) : -Number(amount || 0);
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

function emptyRuleForm(currentMonth, planningEnd) {
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
    months: form.frequency === "customMonths" ? form.customMonthsText.split(",").map((x) => x.trim()).filter(Boolean) : [],
  });
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
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

function App() {
  const [app, setApp] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedState;
  });
  const width = useWindowWidth();
  const isMobile = width < 820;
  const isSmall = width < 560;
  const lang = app.appSettings.language || "de";
  const theme = app.appSettings.theme || "light";
  const palette = themePresets[theme];
  const [tab, setTab] = useState("dashboard");
  const [selectedMonth, setSelectedMonth] = useState(app.appSettings.currentMonth);
  const [ruleForm, setRuleForm] = useState(() => emptyRuleForm(app.appSettings.currentMonth, app.appSettings.planningEnd));
  const [manualForm, setManualForm] = useState({
    title: "",
    type: "expense",
    amount: "",
    category: "Sonstiges",
    account: "Hauptkonto",
    note: "",
    date: createDate(app.appSettings.currentMonth, 15),
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(app));
  }, [app]);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const months = useMemo(() => monthRange(app.appSettings.currentMonth, app.appSettings.planningEnd), [app.appSettings.currentMonth, app.appSettings.planningEnd]);

  const styles = useMemo(() => ({
    page: { minHeight: "100vh", background: palette.bg, color: palette.text, fontFamily: "Inter, Arial, Helvetica, sans-serif" },
    container: { maxWidth: 1320, margin: "0 auto", padding: isSmall ? 12 : 20 },
    hero: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr", gap: 16, marginBottom: 18 },
    heroCard: { background: palette.gradient, color: "#fff", borderRadius: 28, padding: isSmall ? 18 : 26, boxShadow: palette.shadow, position: "relative", overflow: "hidden" },
    controlsCard: { background: palette.panel, border: `1px solid ${palette.border}`, borderRadius: 28, padding: isSmall ? 16 : 22, boxShadow: palette.shadow },
    title: { fontSize: isSmall ? 32 : 44, lineHeight: 1.02, margin: 0, fontWeight: 800 },
    subtitle: { marginTop: 10, color: "rgba(255,255,255,0.86)", maxWidth: 620, fontSize: isSmall ? 14 : 16 },
    tabs: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 16 },
    tab: { minWidth: isSmall ? 110 : 128, padding: "12px 14px", borderRadius: 18, border: `1px solid ${palette.border}`, background: palette.panel, color: palette.text, cursor: "pointer", fontWeight: 700, whiteSpace: "nowrap" },
    tabActive: { background: palette.text, color: palette.panel, border: `1px solid ${palette.text}` },
    card: { background: palette.panel, border: `1px solid ${palette.border}`, borderRadius: 24, padding: isSmall ? 14 : 18, boxShadow: palette.shadow },
    cardTitle: { margin: 0, fontSize: isSmall ? 20 : 24, fontWeight: 800 },
    cardSubtitle: { marginTop: 6, marginBottom: 14, color: palette.sub, fontSize: 14 },
    metrics: { display: "grid", gridTemplateColumns: isSmall ? "1fr 1fr" : isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12 },
    metric: { background: palette.panelSoft, border: `1px solid ${palette.border}`, borderRadius: 20, padding: 16 },
    metricLabel: { fontSize: 13, color: palette.sub },
    metricValue: { fontSize: isSmall ? 24 : 32, fontWeight: 800, marginTop: 8 },
    metricHint: { fontSize: 12, color: palette.sub, marginTop: 6 },
    grid3: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 },
    grid2: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 },
    tableWrap: { overflowX: "auto", borderRadius: 18 },
    table: { width: "100%", minWidth: isMobile ? 760 : "100%", borderCollapse: "collapse", fontSize: 14 },
    th: { textAlign: "left", padding: "12px 10px", borderBottom: `1px solid ${palette.border}`, color: palette.sub, whiteSpace: "nowrap", fontWeight: 700 },
    td: { padding: "12px 10px", borderBottom: `1px solid ${palette.border}`, verticalAlign: "top" },
    input: { width: "100%", padding: "12px 14px", borderRadius: 16, border: `1px solid ${palette.border}`, background: palette.panelSoft, color: palette.text, boxSizing: "border-box", fontSize: 15 },
    button: { padding: "11px 14px", borderRadius: 16, border: `1px solid ${palette.border}`, background: palette.panel, color: palette.text, cursor: "pointer", fontWeight: 700 },
    buttonPrimary: { background: palette.text, color: palette.panel, border: `1px solid ${palette.text}` },
    buttonAccent: { background: palette.accent, color: "#fff", border: `1px solid ${palette.accent}` },
    buttonDanger: { background: palette.danger, color: "#fff", border: `1px solid ${palette.danger}` },
    buttonSoft: { background: palette.accentSoft, color: palette.accent, border: `1px solid ${palette.border}` },
    row: { display: "flex", gap: 8, flexWrap: "wrap" },
    ruleItem: { background: palette.panelSoft, border: `1px solid ${palette.border}`, borderRadius: 20, padding: 14, marginBottom: 12 },
    subtle: { color: palette.sub, fontSize: 13 },
    chartTrack: { height: 12, background: palette.border, borderRadius: 999, overflow: "hidden" },
    chip: { display: "inline-flex", alignItems: "center", padding: "6px 10px", borderRadius: 999, fontWeight: 700, fontSize: 12 },
    people: { display: "grid", gridTemplateColumns: isSmall ? "1fr" : "1fr 1fr", gap: 12 },
    avatarCard: { background: palette.panelSoft, border: `1px solid ${palette.border}`, borderRadius: 20, padding: 14 },
    avatar: { width: 72, height: 72, borderRadius: "50%", objectFit: "cover", display: "block", border: `2px solid ${palette.border}` },
    avatarFallback: { width: 72, height: 72, borderRadius: "50%", background: palette.gradient, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24 },
    mobileStack: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 },
    sectionGap: { display: "grid", gap: 16 },
  }), [palette, isMobile, isSmall]);

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
    return diff >= -1 && diff <= 7 && statusForTransaction(tx, app.confirmed, todayStr) !== "confirmed";
  });
  const totalDebt = sum(app.debtAccounts, (d) => Math.abs(d.balance));

  const expenseByCategory = useMemo(() => {
    const map = new Map();
    monthTxs.filter((tx) => tx.type === "expense").forEach((tx) => {
      map.set(tx.category, (map.get(tx.category) || 0) + getActualOrPlanned(tx, app.confirmed));
    });
    return [...map.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
  }, [monthTxs, app.confirmed]);

  const netBars = useMemo(() => monthlyViews.map((row) => ({ label: prettyMonth(row.month, lang), value: row.net })), [monthlyViews, lang]);

  const varianceData = useMemo(() => {
    const rows = monthTxs.map((tx) => {
      const planned = signedAmount(tx.type, tx.plannedAmount);
      const actualSigned = app.confirmed[tx.id]?.status === "confirmed"
        ? signedAmount(tx.type, app.confirmed[tx.id]?.actualAmount ?? tx.plannedAmount)
        : app.confirmed[tx.id]?.status === "skipped"
          ? 0
          : planned;
      return { ...tx, variance: actualSigned - planned };
    });
    return { total: sum(rows, (x) => x.variance) };
  }, [monthTxs, app.confirmed]);

  function recommendationText() {
    if (varianceData.total > 0) return t(lang, "recommendationPositive");
    if (varianceData.total < 0) return `${t(lang, "recommendation")}: ${formatCurrency(Math.abs(varianceData.total))} unter Plan. Haushaltskonto oder Sonderausgaben reduzieren.`;
    return t(lang, "recommendationNeutral");
  }

  function setSetting(key, value) {
    setApp((prev) => ({ ...prev, appSettings: { ...prev.appSettings, [key]: value } }));
  }

  async function handleImageUpload(personKey, event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setSetting(personKey, base64);
  }

  function removeImage(personKey) {
    setSetting(personKey, "");
  }

  function confirmTransaction(tx, customAmount) {
    setApp((prev) => ({
      ...prev,
      confirmed: {
        ...prev.confirmed,
        [tx.id]: { status: "confirmed", actualAmount: Number(customAmount ?? tx.plannedAmount), confirmedAt: new Date().toISOString() },
      },
    }));
  }

  function skipTransaction(tx) {
    setApp((prev) => ({
      ...prev,
      confirmed: {
        ...prev.confirmed,
        [tx.id]: { status: "skipped", actualAmount: 0, confirmedAt: new Date().toISOString() },
      },
    }));
  }

  function startEditRule(rule) {
    setRuleForm(ruleToForm(normalizeRule(rule)));
    setTab("rules");
  }

  function cancelRuleEdit() {
    setRuleForm(emptyRuleForm(app.appSettings.currentMonth, app.appSettings.planningEnd));
  }

  function saveRule(e) {
    e.preventDefault();
    const rule = formToRule(ruleForm);
    if (!rule.title) return;
    setApp((prev) => {
      const exists = prev.rules.some((r) => r.id === rule.id);
      return { ...prev, rules: exists ? prev.rules.map((r) => (r.id === rule.id ? rule : r)) : [...prev.rules, rule] };
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

  function handleExportMonth() {
    const rows = monthTxs.map((tx) => ({
      Monat: tx.month,
      Datum: tx.date,
      Titel: tx.title,
      Typ: tx.type === "income" ? t(lang, "income") : t(lang, "expense"),
      Kategorie: tx.category,
      Konto: tx.account,
      Geplant: tx.plannedAmount,
      Status: statusLabel(lang, statusForTransaction(tx, app.confirmed, todayStr)),
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
    setRuleForm(emptyRuleForm(seedState.appSettings.currentMonth, seedState.appSettings.planningEnd));
  }

  function describeFrequency(rule) {
    if (rule.frequency === "monthly") return `${t(lang, "monthly")} · ${rule.day}`;
    if (rule.frequency === "weekly") return `${t(lang, "weekly")} · ${weekdayNames[lang][rule.weekday]}`;
    if (rule.frequency === "everyOtherMonth") return `${t(lang, "everyOtherMonth")} · ${rule.day}`;
    if (rule.frequency === "customMonths") return `${t(lang, "customMonths")} · ${(rule.months || []).join(", ")}`;
    return rule.frequency;
  }

  function statusChip(statusKey) {
    const colors = {
      confirmed: { bg: "rgba(31,157,85,0.15)", color: palette.success },
      skipped: { bg: palette.border, color: palette.sub },
      overdue: { bg: "rgba(229,57,53,0.15)", color: palette.danger },
      today: { bg: "rgba(217,119,6,0.15)", color: palette.warning },
      open: { bg: palette.accentSoft, color: palette.accent },
    };
    return { ...styles.chip, background: colors[statusKey].bg, color: colors[statusKey].color };
  }

  function SectionCard({ title, subtitle, children, extra }) {
    return (
      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start", flexWrap: "wrap" }}>
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

  function ActionButtons({ tx }) {
    return (
      <div style={styles.row}>
        <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => confirmTransaction(tx)}>{t(lang, "confirm")}</button>
        <button style={styles.button} onClick={() => {
          const value = prompt(t(lang, "amount"), String(tx.plannedAmount));
          if (value !== null) confirmTransaction(tx, Number(value));
        }}>{t(lang, "amount")}</button>
        <button style={styles.button} onClick={() => skipTransaction(tx)}>{t(lang, "skip")}</button>
      </div>
    );
  }

  function BarChart({ title, items, positiveColor, negativeColor }) {
    const max = Math.max(...items.map((item) => Math.abs(item.value)), 1);
    return (
      <SectionCard title={title} subtitle={t(lang, "selectedMonth") + ": " + prettyMonth(selectedMonth, lang)}>
        {items.length === 0 ? <div style={styles.subtle}>{t(lang, "noData")}</div> : null}
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((item) => {
            const width = `${(Math.abs(item.value) / max) * 100}%`;
            const color = item.value >= 0 ? positiveColor : negativeColor;
            return (
              <div key={item.label}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, fontSize: 13 }}>
                  <strong>{item.label}</strong>
                  <span>{formatCurrency(item.value)}</span>
                </div>
                <div style={styles.chartTrack}><div style={{ width, height: 12, background: color }} /></div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    );
  }

  function AvatarBlock({ label, image, initials, personKey }) {
    return (
      <div style={styles.avatarCard}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          {image ? <img src={image} alt={label} style={styles.avatar} /> : <div style={styles.avatarFallback}>{initials}</div>}
          <div>
            <div style={{ fontWeight: 800 }}>{label}</div>
            <div style={styles.subtle}>{t(lang, "uploadImage")}</div>
          </div>
        </div>
        <div style={styles.row}>
          <label style={{ ...styles.button, ...styles.buttonSoft, cursor: "pointer" }}>
            {t(lang, "uploadImage")}
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(personKey, e)} />
          </label>
          {image ? <button style={styles.button} onClick={() => removeImage(personKey)}>{t(lang, "removeImage")}</button> : null}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.heroCard}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "start", flexWrap: "wrap" }}>
              <div>
                <h1 style={styles.title}>{t(lang, "appTitle")}</h1>
                <div style={styles.subtitle}>{t(lang, "appSubtitle")}</div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {app.appSettings.profileMe ? <img src={app.appSettings.profileMe} alt="me" style={{ ...styles.avatar, width: 54, height: 54 }} /> : <div style={{ ...styles.avatarFallback, width: 54, height: 54, fontSize: 18 }}>T</div>}
                {app.appSettings.profileWife ? <img src={app.appSettings.profileWife} alt="wife" style={{ ...styles.avatar, width: 54, height: 54 }} /> : <div style={{ ...styles.avatarFallback, width: 54, height: 54, fontSize: 18 }}>N</div>}
              </div>
            </div>
          </div>
          <div style={styles.controlsCard}>
            <div style={{ display: "grid", gap: 12 }}>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} style={styles.input}>
                {months.map((month) => <option key={month} value={month}>{prettyMonth(month, lang)}</option>)}
              </select>
              <div style={styles.row}>
                <button style={{ ...styles.button, ...styles.buttonAccent }} onClick={handleExportMonth}>{t(lang, "exportCsv")}</button>
                <button style={{ ...styles.button, ...styles.buttonDanger }} onClick={resetAll}>{t(lang, "reset")}</button>
              </div>
              <div style={styles.subtle}>{t(lang, "mobileHint")}</div>
            </div>
          </div>
        </div>

        <div style={styles.tabs}>
          {[
            ["dashboard", t(lang, "dashboard")],
            ["month", t(lang, "monthPlan")],
            ["tasks", t(lang, "tasks")],
            ["rules", t(lang, "rules")],
            ["manual", t(lang, "manual")],
            ["settings", t(lang, "settings")],
          ].map(([key, label]) => (
            <button key={key} style={tab === key ? { ...styles.tab, ...styles.tabActive } : styles.tab} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>

        {tab === "dashboard" && (
          <div style={styles.sectionGap}>
            <div style={styles.metrics}>
              <Metric label={t(lang, "incomes")} value={formatCurrency(monthView?.incomeSum || 0)} hint={prettyMonth(selectedMonth, lang)} />
              <Metric label={t(lang, "expenses")} value={formatCurrency(monthView?.expenseSum || 0)} hint={prettyMonth(selectedMonth, lang)} />
              <Metric label={t(lang, "balance")} value={formatCurrency(monthView?.net || 0)} hint={t(lang, "monthOverview")} />
              <Metric label={t(lang, "running")} value={formatCurrency(monthView?.runningCash || 0)} hint={t(lang, "monthPreview")} />
            </div>

            <div style={styles.grid3}>
              <SectionCard title={t(lang, "todayTodo")} subtitle={prettyMonth(selectedMonth, lang)}>
                {dueThisWeek.length === 0 ? <div style={styles.subtle}>{t(lang, "noTasks")}</div> : null}
                {dueThisWeek.slice(0, 4).map((tx) => {
                  const statusKey = statusForTransaction(tx, app.confirmed, todayStr);
                  return (
                    <div key={tx.id} style={styles.ruleItem}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}>
                        <div>
                          <div style={{ fontWeight: 800 }}>{tx.title}</div>
                          <div style={styles.subtle}>{prettyDate(tx.date, lang)} · {formatCurrency(tx.plannedAmount)}</div>
                        </div>
                        <span style={statusChip(statusKey)}>{statusLabel(lang, statusKey)}</span>
                      </div>
                      <div style={{ marginTop: 10 }}><ActionButtons tx={tx} /></div>
                    </div>
                  );
                })}
              </SectionCard>

              <SectionCard title={t(lang, "variance")} subtitle={t(lang, "dynamicHelp")}>
                <div style={{ fontSize: 34, fontWeight: 800, color: varianceData.total >= 0 ? palette.success : palette.danger, marginBottom: 10 }}>{formatCurrency(varianceData.total)}</div>
                <div style={styles.subtle}>{recommendationText()}</div>
              </SectionCard>

              <SectionCard title={t(lang, "debtOverview")} subtitle={prettyMonth(selectedMonth, lang)}>
                {app.debtAccounts.map((debt) => (
                  <div key={debt.id} style={styles.ruleItem}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{debt.name}</div>
                        <div style={styles.subtle}>Zinssatz {String(debt.rate).replace(".", ",")} %</div>
                      </div>
                      <div style={{ fontWeight: 800, color: palette.danger }}>{formatCurrency(debt.balance)}</div>
                    </div>
                  </div>
                ))}
                <div style={{ ...styles.ruleItem, background: palette.gradient, color: "#fff" }}>
                  <div style={{ fontSize: 13, opacity: 0.9 }}>{t(lang, "totalDebt")}</div>
                  <div style={{ fontSize: 34, fontWeight: 800 }}>{formatCurrency(-totalDebt)}</div>
                </div>
              </SectionCard>
            </div>

            <div style={styles.grid2}>
              <BarChart title={t(lang, "expenseByCategory")} items={expenseByCategory} positiveColor={palette.accent} negativeColor={palette.accent} />
              <BarChart title={t(lang, "monthlyFlow")} items={netBars} positiveColor={palette.success} negativeColor={palette.danger} />
            </div>

            <SectionCard title={t(lang, "monthPreview")} subtitle={t(lang, "monthOverview")}>
              <div style={styles.tableWrap}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>{t(lang, "selectedMonth")}</th>
                      <th style={styles.th}>{t(lang, "incomes")}</th>
                      <th style={styles.th}>{t(lang, "expenses")}</th>
                      <th style={styles.th}>{t(lang, "balance")}</th>
                      <th style={styles.th}>{t(lang, "running")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyViews.map((row) => (
                      <tr key={row.month}>
                        <td style={styles.td}>{prettyMonth(row.month, lang)}</td>
                        <td style={styles.td}>{formatCurrency(row.incomeSum)}</td>
                        <td style={styles.td}>{formatCurrency(row.expenseSum)}</td>
                        <td style={{ ...styles.td, fontWeight: 800, color: row.net >= 0 ? palette.success : palette.danger }}>{formatCurrency(row.net)}</td>
                        <td style={styles.td}>{formatCurrency(row.runningCash)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </div>
        )}

        {tab === "month" && (
          <SectionCard title={`${t(lang, "monthPlan")} · ${prettyMonth(selectedMonth, lang)}`} subtitle={t(lang, "monthOverview")}>
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>{t(lang, "date")}</th>
                    <th style={styles.th}>{t(lang, "title")}</th>
                    <th style={styles.th}>{t(lang, "category")}</th>
                    <th style={styles.th}>{t(lang, "account")}</th>
                    <th style={styles.th}>{t(lang, "type")}</th>
                    <th style={styles.th}>{t(lang, "planned")}</th>
                    <th style={styles.th}>{t(lang, "status")}</th>
                    <th style={styles.th}>{t(lang, "action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {monthTxs.map((tx) => {
                    const statusKey = statusForTransaction(tx, app.confirmed, todayStr);
                    return (
                      <tr key={tx.id}>
                        <td style={styles.td}>{prettyDate(tx.date, lang)}</td>
                        <td style={styles.td}><strong>{tx.title}</strong><div style={styles.subtle}>{tx.note}</div></td>
                        <td style={styles.td}>{tx.category}</td>
                        <td style={styles.td}>{tx.account}</td>
                        <td style={styles.td}>{tx.type === "income" ? t(lang, "income") : t(lang, "expense")}</td>
                        <td style={styles.td}>{formatCurrency(tx.plannedAmount)}</td>
                        <td style={styles.td}><span style={statusChip(statusKey)}>{statusLabel(lang, statusKey)}</span></td>
                        <td style={styles.td}><ActionButtons tx={tx} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SectionCard>
        )}

        {tab === "tasks" && (
          <SectionCard title={t(lang, "todayTodo")} subtitle={t(lang, "dynamicHelp")}>
            <div style={styles.grid2}>
              {monthTxs.filter((tx) => statusForTransaction(tx, app.confirmed, todayStr) !== "confirmed").map((tx) => {
                const statusKey = statusForTransaction(tx, app.confirmed, todayStr);
                return (
                  <div key={tx.id} style={styles.ruleItem}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start" }}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{tx.title}</div>
                        <div style={styles.subtle}>{prettyDate(tx.date, lang)} · {tx.type === "income" ? t(lang, "income") : t(lang, "expense")}</div>
                      </div>
                      <span style={statusChip(statusKey)}>{statusLabel(lang, statusKey)}</span>
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, marginTop: 8 }}>{formatCurrency(tx.plannedAmount)}</div>
                    <div style={{ marginTop: 10 }}><ActionButtons tx={tx} /></div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        )}

        {tab === "rules" && (
          <div style={styles.mobileStack}>
            <SectionCard title={t(lang, "ruleList")} subtitle={isMobile ? "Bearbeiten ist jetzt auch am Handy sichtbar." : ""}>
              {app.rules.map((rule) => (
                <div key={rule.id} style={styles.ruleItem}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start", flexWrap: "wrap" }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 800 }}>{rule.title}</div>
                      <div style={styles.subtle}>{rule.type === "income" ? t(lang, "income") : t(lang, "expense")} · {formatCurrency(rule.amount)} · {describeFrequency(rule)}</div>
                      <div style={styles.subtle}>{rule.category} · {rule.startMonth} – {rule.endMonth}</div>
                    </div>
                    <div style={styles.row}>
                      <button style={{ ...styles.button, ...styles.buttonSoft }} onClick={() => startEditRule(rule)}>{t(lang, "edit")}</button>
                      <button style={styles.button} onClick={() => deleteRule(rule.id)}>{t(lang, "delete")}</button>
                    </div>
                  </div>
                </div>
              ))}
            </SectionCard>

            <SectionCard title={ruleForm.id ? t(lang, "editRule") : t(lang, "newRule")} subtitle={t(lang, "dynamicHelp")}>
              <form onSubmit={saveRule} style={{ display: "grid", gap: 10 }}>
                <input style={styles.input} value={ruleForm.title} onChange={(e) => setRuleForm({ ...ruleForm, title: e.target.value })} placeholder={t(lang, "description")} required />
                <div style={styles.mobileStack}>
                  <select style={styles.input} value={ruleForm.type} onChange={(e) => setRuleForm({ ...ruleForm, type: e.target.value })}>
                    <option value="income">{t(lang, "income")}</option>
                    <option value="expense">{t(lang, "expense")}</option>
                  </select>
                  <input style={styles.input} type="number" step="0.01" value={ruleForm.amount} onChange={(e) => setRuleForm({ ...ruleForm, amount: e.target.value })} placeholder={t(lang, "amount")} required />
                </div>
                <div style={styles.mobileStack}>
                  <select style={styles.input} value={ruleForm.frequency} onChange={(e) => setRuleForm({ ...ruleForm, frequency: e.target.value })}>
                    <option value="monthly">{t(lang, "monthly")}</option>
                    <option value="weekly">{t(lang, "weekly")}</option>
                    <option value="everyOtherMonth">{t(lang, "everyOtherMonth")}</option>
                    <option value="customMonths">{t(lang, "customMonths")}</option>
                  </select>
                  {ruleForm.frequency === "weekly" ? (
                    <select style={styles.input} value={ruleForm.weekday} onChange={(e) => setRuleForm({ ...ruleForm, weekday: e.target.value })}>
                      {weekdayNames[lang].map((name, index) => <option key={index} value={index}>{name}</option>)}
                    </select>
                  ) : (
                    <input style={styles.input} type="number" min="1" max="31" value={ruleForm.day} onChange={(e) => setRuleForm({ ...ruleForm, day: e.target.value })} placeholder={t(lang, "date")} />
                  )}
                </div>
                {ruleForm.frequency === "customMonths" ? <input style={styles.input} value={ruleForm.customMonthsText} onChange={(e) => setRuleForm({ ...ruleForm, customMonthsText: e.target.value })} placeholder={t(lang, "customMonthsHint")} /> : null}
                <div style={styles.mobileStack}>
                  <input style={styles.input} value={ruleForm.category} onChange={(e) => setRuleForm({ ...ruleForm, category: e.target.value })} placeholder={t(lang, "category")} />
                  <input style={styles.input} value={ruleForm.account} onChange={(e) => setRuleForm({ ...ruleForm, account: e.target.value })} placeholder={t(lang, "account")} />
                </div>
                <div style={styles.mobileStack}>
                  <input style={styles.input} type="month" value={ruleForm.startMonth} onChange={(e) => setRuleForm({ ...ruleForm, startMonth: e.target.value })} />
                  <input style={styles.input} type="month" value={ruleForm.endMonth} onChange={(e) => setRuleForm({ ...ruleForm, endMonth: e.target.value })} />
                </div>
                <textarea style={styles.input} rows={3} value={ruleForm.note} onChange={(e) => setRuleForm({ ...ruleForm, note: e.target.value })} placeholder={t(lang, "note")} />
                <div style={styles.row}>
                  <button type="submit" style={{ ...styles.button, ...styles.buttonPrimary }}>{ruleForm.id ? t(lang, "saveChanges") : t(lang, "saveRule")}</button>
                  {ruleForm.id ? <button type="button" style={styles.button} onClick={cancelRuleEdit}>{t(lang, "cancel")}</button> : null}
                </div>
              </form>
            </SectionCard>
          </div>
        )}

        {tab === "manual" && (
          <div style={styles.mobileStack}>
            <SectionCard title={t(lang, "manualBooking")} subtitle={t(lang, "dynamicHelp")}>
              <form onSubmit={addManualTransaction} style={{ display: "grid", gap: 10 }}>
                <input style={styles.input} value={manualForm.title} onChange={(e) => setManualForm({ ...manualForm, title: e.target.value })} placeholder={t(lang, "description")} required />
                <div style={styles.mobileStack}>
                  <select style={styles.input} value={manualForm.type} onChange={(e) => setManualForm({ ...manualForm, type: e.target.value })}>
                    <option value="expense">{t(lang, "expense")}</option>
                    <option value="income">{t(lang, "income")}</option>
                  </select>
                  <input style={styles.input} type="number" step="0.01" value={manualForm.amount} onChange={(e) => setManualForm({ ...manualForm, amount: e.target.value })} placeholder={t(lang, "amount")} required />
                </div>
                <div style={styles.mobileStack}>
                  <input style={styles.input} type="date" value={manualForm.date} onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })} />
                  <input style={styles.input} value={manualForm.category} onChange={(e) => setManualForm({ ...manualForm, category: e.target.value })} placeholder={t(lang, "category")} />
                </div>
                <input style={styles.input} value={manualForm.account} onChange={(e) => setManualForm({ ...manualForm, account: e.target.value })} placeholder={t(lang, "account")} />
                <textarea style={styles.input} rows={3} value={manualForm.note} onChange={(e) => setManualForm({ ...manualForm, note: e.target.value })} placeholder={t(lang, "note")} />
                <button type="submit" style={{ ...styles.button, ...styles.buttonPrimary }}>{t(lang, "addBooking")}</button>
              </form>
            </SectionCard>

            <SectionCard title={t(lang, "variance")} subtitle={t(lang, "dynamicHelp")}>
              <div style={{ fontSize: 34, fontWeight: 800, color: varianceData.total >= 0 ? palette.success : palette.danger }}>{formatCurrency(varianceData.total)}</div>
              <div style={{ marginTop: 10, color: palette.sub }}>{recommendationText()}</div>
            </SectionCard>
          </div>
        )}

        {tab === "settings" && (
          <div style={styles.sectionGap}>
            <SectionCard title={t(lang, "settingsTitle")} subtitle={t(lang, "mobileHint")}>
              <div style={styles.mobileStack}>
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>{t(lang, "language")}</div>
                  <div style={styles.row}>
                    <button style={{ ...(lang === "de" ? { ...styles.button, ...styles.buttonPrimary } : styles.button) }} onClick={() => setSetting("language", "de")}>Deutsch</button>
                    <button style={{ ...(lang === "ru" ? { ...styles.button, ...styles.buttonPrimary } : styles.button) }} onClick={() => setSetting("language", "ru")}>Русский</button>
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>{t(lang, "theme")}</div>
                  <div style={styles.row}>
                    <button style={{ ...(theme === "light" ? { ...styles.button, ...styles.buttonPrimary } : styles.button) }} onClick={() => setSetting("theme", "light")}>{t(lang, "light")}</button>
                    <button style={{ ...(theme === "dark" ? { ...styles.button, ...styles.buttonPrimary } : styles.button) }} onClick={() => setSetting("theme", "dark")}>{t(lang, "dark")}</button>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard title={t(lang, "profileArea")} subtitle={t(lang, "mobileHint")}>
              <div style={styles.people}>
                <AvatarBlock label={t(lang, "me")} image={app.appSettings.profileMe} initials="T" personKey="profileMe" />
                <AvatarBlock label={t(lang, "wife")} image={app.appSettings.profileWife} initials="N" personKey="profileWife" />
              </div>
            </SectionCard>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
