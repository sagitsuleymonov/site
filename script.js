// Footer'dagi yilni avtomatik yangilash
document.getElementById("year").textContent = new Date().getFullYear();

const heroImg = document.querySelector(".hero-photo img");

// Tanlovni eslab qolish (brauzer ruxsat bermasa ham sayt ishlayveradi)
const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch {} },
};

/* ---------- Tungi / kunduzgi rejim ---------- */
const root = document.documentElement;
const themeBtn = document.querySelector(".theme-toggle");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  if (theme) root.dataset.theme = theme;
  const dark = theme ? theme === "dark" : systemDark.matches;
  root.classList.toggle("is-dark", dark);
}
applyTheme(store.get("theme"));
systemDark.addEventListener("change", () => applyTheme(store.get("theme")));
themeBtn.addEventListener("click", () => {
  const next = root.classList.contains("is-dark") ? "light" : "dark";
  store.set("theme", next);
  applyTheme(next);
  updateThemeLabel();
});

/* ---------- O'zbekcha / Ruscha ----------
   Sahifadagi o'zbekcha matn kalit sifatida ishlatiladi.
   HTML'dagi matnni o'zgartirsangiz, bu yerdagi kalitni ham o'zgartiring. */
const RU = {
  "Bog'lanish": "Связаться",
  "Texnika buzildimi?": "Сломалась техника?",
  "Tez va halol tuzataman.": "Починю быстро и честно.",
  "Men Sagit Suleymanov — 5 yillik tajribaga ega maishiy texnika ustasiman. Kir yuvish mashinasi, muzlatgich, konditsioner va boshqa texnikani sifatli ta'mirlayman.": "Я Сагит Сулейманов — мастер по ремонту бытовой техники с опытом 5 лет. Качественно ремонтирую стиральные машины, холодильники, кондиционеры и другую технику.",
  "Kir yuvish mashinasidan konditsionergacha — 6 turdagi texnika.": "От стиральной машины до кондиционера — 6 видов техники.",
  "Buyurtma qabul qilinmoqda — bugun qo'ng'iroq qiling.": "Принимаю заказы — звоните сегодня.",
  "Qo'ng'iroq qilish": "Позвонить",

  "Xizmatlar": "Услуги",
  "Nimalarni ta'mirlayman": "Что я ремонтирую",
  "Kir yuvish mashinasi": "Стиральная машина",
  "Avtomat va yarim avtomat kir yuvish mashinalarining barcha turdagi nosozliklari.": "Все виды неисправностей автоматических и полуавтоматических стиральных машин.",
  "Suv olmaydi yoki chiqarmaydi": "Не набирает или не сливает воду",
  "Baraban aylanmaydi": "Не крутится барабан",
  "Kuchli shovqin va titrash": "Сильный шум и вибрация",
  "Ekranda xato kodi chiqadi": "На экране код ошибки",
  "Muzlatgich": "Холодильник",
  "Bir va ikki kamerali, No Frost muzlatgichlar va muzlatish kameralari.": "Одно- и двухкамерные холодильники, No Frost и морозильные камеры.",
  "Sovutmaydi yoki kam sovutadi": "Не морозит или морозит слабо",
  "Muz bosib qoladi": "Обрастает льдом",
  "To'xtovsiz ishlaydi": "Работает без остановки",
  "Ostidan suv oqadi": "Течёт вода снизу",
  "Konditsioner": "Кондиционер",
  "Uy konditsionerlarini ta'mirlash va profilaktik tozalash.": "Ремонт и профилактическая чистка бытовых кондиционеров.",
  "Sovutmaydi yoki isitmaydi": "Не охлаждает или не греет",
  "Ichki blokdan suv tomadi": "Капает вода из внутреннего блока",
  "Yoqimsiz hid chiqaradi": "Неприятный запах",
  "Pult buyrug'ini olmaydi": "Не реагирует на пульт",
  "Mikroto'lqinli pech": "Микроволновая печь",
  "Oddiy va grilli mikroto'lqinli pechlar.": "Обычные микроволновки и с грилем.",
  "Isitmaydi": "Не греет",
  "Tugmalar ishlamaydi": "Не работают кнопки",
  "Ichida uchqun chiqadi": "Искрит внутри",
  "Tarelka aylanmaydi": "Не крутится тарелка",
  "Suv isitgich": "Водонагреватель",
  "Elektr suv isitgichlar (boylerlar).": "Электрические водонагреватели (бойлеры).",
  "Suv isimaydi": "Не греет воду",
  "Suv oqadi": "Протекает",
  "Avtomat o'chirib qo'yadi": "Выбивает автомат",
  "Isitish elementi (TEN) almashtirish": "Замена нагревательного элемента (ТЭН)",
  "Boshqa texnika": "Другая техника",
  "Ro'yxatda bo'lmagan texnika ham bo'lsa — qo'ng'iroq qiling, so'rang.": "Если вашей техники нет в списке — позвоните и спросите.",
  "Idish yuvish mashinasi": "Посудомоечная машина",
  "Duxovka va elektr plita": "Духовка и электроплита",
  "Changyutgich": "Пылесос",
  "Boshqa maishiy texnika": "Другая бытовая техника",

  "Nega men": "Почему я",
  "Ishonch bilan topshiring": "Доверьте технику мне",
  "Tajriba": "Опыт",
  "5 yil davomida yuzlab texnikani qayta ishga tushirganman.": "За 5 лет вернул к жизни сотни единиц техники.",
  "Halol narx": "Честная цена",
  "Avval nosozlikni aniqlayman, narxni ishdan oldin aytaman.": "Сначала нахожу неисправность, цену называю до начала работы.",
  "Tez aloqa": "Быстрая связь",
  "Qo'ng'iroq yoki Telegram orqali tez javob beraman.": "Быстро отвечаю по телефону и в Telegram.",

  "Hamkorlar": "Партнёры",
  "Birga ishlaymiz": "Работаем вместе",
  "Hamkor nomi": "Название партнёра",
  "Hamkorlik haqida qisqa ma'lumot": "Коротко о сотрудничестве",

  "Aloqa": "Контакты",
  "Texnikangiz buzildimi?": "Сломалась техника?",
  "Qo'ng'iroq qiling yoki Telegram'ga yozing — muammoni eshitib, qachon kela olishimni aytaman.": "Позвоните или напишите в Telegram — выслушаю проблему и скажу, когда смогу приехать.",
  "Telefon": "Телефон",
  "Savolingiz bormi — yozing, javob beraman": "Есть вопрос — пишите, отвечу",
  "Sagit Suleymanov · Maishiy texnika ustasi": "Сагит Сулейманов · Мастер бытовой техники",

  // Sahifa sarlavhasi, tavsifi va tugma yorliqlari
  "Sagit Suleymanov — Maishiy texnika ustasi": "Сагит Сулейманов — Мастер бытовой техники",
  "Sagit Suleymanov — maishiy texnika ustasi": "Сагит Сулейманов — мастер бытовой техники",
  "Tungi rejim": "Тёмная тема",
  "Kunduzgi rejim": "Светлая тема",
};

// O'zbekcha asl matnlarni bir marta yig'ib olamiz
const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  const node = walker.currentNode;
  const key = node.nodeValue.trim();
  if (RU[key]) textNodes.push({ node, uz: node.nodeValue, key });
}
const metaDesc = document.querySelector('meta[name="description"]');
const uzMeta = { title: document.title, desc: metaDesc.content, alt: heroImg.alt };
const RU_DESC = "Сагит Сулейманов — мастер бытовой техники, 5 лет опыта. Ремонт стиральных машин, холодильников, кондиционеров и другой техники.";

let lang = store.get("lang") === "ru" ? "ru" : "uz";
const t = (uz) => (lang === "ru" && RU[uz]) || uz;

function updateThemeLabel() {
  themeBtn.setAttribute("aria-label", t(root.classList.contains("is-dark") ? "Kunduzgi rejim" : "Tungi rejim"));
}

function applyLang() {
  root.lang = lang;
  for (const { node, uz, key } of textNodes) {
    node.nodeValue = lang === "ru" ? uz.replace(key, RU[key]) : uz;
  }
  document.title = t(uzMeta.title);
  metaDesc.content = lang === "ru" ? RU_DESC : uzMeta.desc;
  heroImg.alt = t(uzMeta.alt);
  document.querySelectorAll("[data-lang]").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  updateThemeLabel();
}

document.querySelectorAll("[data-lang]").forEach((btn) =>
  btn.addEventListener("click", () => {
    lang = btn.dataset.lang;
    store.set("lang", lang);
    applyLang();
  })
);
applyLang();
