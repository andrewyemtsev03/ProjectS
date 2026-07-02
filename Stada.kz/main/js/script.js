/*
 * Main interactivity script for the STADA “О компании” page.
 *
 * Handles language switching (Russian ↔ Kazakh), mobile menu
 * toggling, hero carousel initialisation and scroll animations.
 */

function hideStadaPageLoader() {
  document.body.classList.add('stada-page-loaded');
}

function showStadaPageLoader() {
  document.body.classList.remove('stada-page-loaded');
}

function shouldWaitForBackendContent() {
  return document.body?.classList.contains('backend-content-pending')
    || !!document.querySelector('[data-dynamic-product-page], [data-i18n-key], [data-backend-text-id], [data-backend-image-id]');
}

function hideStadaPageLoaderWhenReady() {
  if (shouldWaitForBackendContent()) return;
  hideStadaPageLoader();
}

if (document.readyState === 'complete') {
  hideStadaPageLoaderWhenReady();
} else {
  window.addEventListener('load', hideStadaPageLoaderWhenReady, { once: true });
}

let currentLang = 'ru';
let currentCountry = 'kz';

const STADA_COUNTRY_OPTIONS = [
  {
    code: 'kz',
    label: 'KZ',
    name: 'Kazakhstan',
    backendCountry: 'kazakhstan',
    domain: 'stada.kz',
    aliases: ['www.stada.kz'],
    defaultLanguage: 'ru',
    supportedLanguages: ['ru', 'kz'],
  },
  {
    code: 'kg',
    label: 'KG',
    name: 'Kyrgyzstan',
    backendCountry: 'kyrgyzstan',
    domain: 'stada.kg',
    aliases: ['www.stada.kg'],
    defaultLanguage: 'ru',
    supportedLanguages: ['ru', 'kg'],
  },
];

const STADA_COUNTRY_BY_CODE = Object.fromEntries(STADA_COUNTRY_OPTIONS.map(country => [country.code, country]));
const STADA_LANGUAGE_LABELS = {
  ru: 'RU',
  kz: 'KZ',
  kg: 'KG',
};

const FRONTEND_STATIC_TEXT = {
  "ru": {
    "about_heading": "О компании STADA",
    "benefits_heading": "Преимущества",
    "button_products": "Продукты",
    "career_button": "Смотреть вакансии",
    "career_heading": "Карьера в STADA",
    "cta_more": "Подробнее",
    "footer_access_title": "Доступность",
    "footer_back_top": "Наверх",
    "footer_brand_text": "Мы объединяем международный опыт STADA и локальную близость к пациентам, специалистам и партнерам в Казахстане.",
    "footer_company_title": "Компания",
    "footer_global_link": "STADA Global",
    "footer_products_title": "Продукты",
    "footer_rights": "Все права защищены.",
    "footer_trust_countries": "100+ стран",
    "footer_trust_years": "130+ лет опыта",
    "footer_warning_text": "Информация на сайте не заменяет консультацию специалиста. Перед применением лекарственных средств ознакомьтесь с инструкцией.",
    "footer_warning_title": "Важно",
    "hero_kicker": "STADA Kazakhstan",
    "hero_products_label": "НАШИ ПРОДУКТЫ",
    "nav_about": "О компании",
    "nav_career": "Карьера",
    "nav_categories": "Категории",
    "nav_company": "Компания",
    "nav_culture": "Культура",
    "nav_history": "История компании",
    "nav_news": "Новости и Медия",
    "nav_products": "Продукты",
    "nav_worldwide": "Наши филиалы",
    "news_section_lead": "Главные новости, медиа и продуктовые обновления STADA в одном динамичном блоке.",
    "product_aqualor_baby_name": "Аквалор Беби",
    "product_aqualor_forte_name": "Аквалор Актив Форте",
    "product_aqualor_gorlo_name": "Аквалор Горло",
    "product_aqualor_name": "Аквалор",
    "product_aqualor_soft_mini_name": "Аквалор Софт мини",
    "product_aqualor_soft_name": "Аквалор Софт",
    "product_back": "Назад к продуктам",
    "product_cardiomagnil_name": "Кардиомагнил",
    "product_coldrex_name": "Колдрекс",
    "product_enterogermina_name": "Энтерожермина",
    "product_magneb6kids_name": "Магне Б6 Кидс",
    "product_noshpa_name": "НО-ШПА",
    "product_related_heading": "Другие варианты Аквалор",
    "product_related_intro": "Подберите похожий формат линейки Аквалор по объему, способу распыления и зоне применения.",
    "product_related_label": "Похожие товары",
    "product_sinulan_duo_name": "Синулан Дуо",
    "product_vitrum_immunaktiv_name": "Витрум Иммунактив",
    "product_zodak_name": "Зодак",
    "products_browse_catalog": "Смотреть каталог",
    "products_catalog_label": "Каталог STADA",
    "products_category_allergy": "Аллергия",
    "products_category_cardio": "Кардио",
    "products_category_cold": "Простуда и дыхание",
    "products_category_digestive": "Пищеварение",
    "products_category_immunity": "Иммунитет",
    "products_category_kids": "Для детей",
    "products_category_respiratory": "Дыхательные пути",
    "products_category_urology": "Урология",
    "products_filter_all": "Все продукты",
    "products_metric_areas": "терапевтических направлений",
    "products_metric_portfolio": "продуктов в каталоге",
    "products_partners_heading": "Доступны в аптеках и онлайн-сервисах",
    "site_name": "STADA Kazakhstan",
    "where_to_buy_heading": "Где купить"
  },
  "kz": {
    "about_heading": "STADA компаниясы туралы",
    "benefits_heading": "Артықшылықтар",
    "button_products": "Өнімдер",
    "career_button": "Вакансияларды көру",
    "career_heading": "STADA компаниясындағы мансап",
    "cta_more": "Толығырақ",
    "footer_access_title": "Қолжетімділік",
    "footer_back_top": "Жоғары",
    "footer_brand_text": "Біз STADA-ның халықаралық тәжірибесін Қазақстандағы пациенттерге, мамандарға және серіктестерге жақындықпен біріктіреміз.",
    "footer_company_title": "Компания",
    "footer_global_link": "STADA Global",
    "footer_products_title": "Өнімдер",
    "footer_rights": "Барлық құқықтар қорғалған.",
    "footer_trust_countries": "100+ ел",
    "footer_trust_years": "130+ жыл тәжірибе",
    "footer_warning_text": "Сайттағы ақпарат маман кеңесін алмастырмайды. Дәрілік заттарды қолданар алдында нұсқаулықпен танысыңыз.",
    "footer_warning_title": "Маңызды",
    "hero_kicker": "STADA Kazakhstan",
    "hero_products_label": "БІЗДІҢ ӨНІМДЕР",
    "nav_about": "Компания туралы",
    "nav_career": "Мансап",
    "nav_categories": "Санаттар",
    "nav_company": "Компания",
    "nav_culture": "Мәдениет",
    "nav_history": "Компания тарихы",
    "nav_news": "Жаңалықтар мен медиа",
    "nav_products": "Өнімдер",
    "nav_worldwide": "Біздің филиалдарымыз",
    "news_section_lead": "STADA жаңалықтары, медиа материалдары және өнім жаңартулары бір заманауи блокта.",
    "product_aqualor_baby_name": "Аквалор Беби",
    "product_aqualor_forte_name": "Аквалор Актив Форте",
    "product_aqualor_gorlo_name": "Аквалор Горло",
    "product_aqualor_name": "Аквалор",
    "product_aqualor_soft_mini_name": "Аквалор Софт мини",
    "product_aqualor_soft_name": "Аквалор Софт",
    "product_back": "Өнімдерге оралу",
    "product_cardiomagnil_name": "Кардиомагнил",
    "product_coldrex_name": "Колдрекс",
    "product_enterogermina_name": "Энтерожермина",
    "product_magneb6kids_name": "Магне Б6 Кидс",
    "product_noshpa_name": "НО-ШПА",
    "product_related_heading": "Аквалордың басқа нұсқалары",
    "product_related_intro": "Аквалор желісінен көлемі, бүрку форматы және қолдану аймағы бойынша ұқсас нұсқаны таңдаңыз.",
    "product_related_label": "Ұқсас тауарлар",
    "product_sinulan_duo_name": "Синулан Дуо",
    "product_vitrum_immunaktiv_name": "Витрум Иммунактив",
    "product_zodak_name": "Зодак",
    "products_browse_catalog": "Каталогты көру",
    "products_catalog_label": "STADA каталогы",
    "products_category_allergy": "Аллергия",
    "products_category_cardio": "Кардио",
    "products_category_cold": "Суық тию және тыныс алу",
    "products_category_digestive": "Ас қорыту",
    "products_category_immunity": "Иммунитет",
    "products_category_kids": "Балаларға арналған",
    "products_category_respiratory": "Тыныс алу жолдары",
    "products_category_urology": "Урология",
    "products_filter_all": "Барлық өнімдер",
    "products_metric_areas": "терапевтік бағыт",
    "products_metric_portfolio": "каталогтағы өнім",
    "products_partners_heading": "Дәріханалар мен онлайн-сервистерде қолжетімді",
    "site_name": "STADA Kazakhstan",
    "where_to_buy_heading": "Қайдан сатып алуға болады"
  }
};

Object.assign(FRONTEND_STATIC_TEXT.ru, {
  history_source_note: 'Ключевые этапы основаны на корпоративной хронологии STADA.'
});

Object.assign(FRONTEND_STATIC_TEXT.kz, {
  history_source_note: 'Негізгі кезеңдер STADA корпоративтік хронологиясына негізделген.'
});

const LOCALIZED_BACKEND_DOM_TEXT = {
  kz: {
    history_text_001: 'STADA - Компания тарихы',
    history_text_002: 'STADA 1895-2022',
    history_text_003: 'Компания тарихы',
    history_text_004: '130 жылдан астам сапа, қолжетімділік және адамдар денсаулығына қамқорлық.',
    history_text_005: 'Хронологияны көру',
    history_text_006: '1895',
    history_text_007: 'Дәріханалық бастаулар',
    history_text_008: 'Фармацевтер дәрілерді бірыңғай стандарттармен, бірдей қаптамада және бір бағада шығару үшін бірікті.',
    history_text_009: '1975',
    history_text_010: 'Дженериктерге бетбұрыс',
    history_text_011: 'STADA өнім желісін дженериктермен кеңейтіп, болашақ халықаралық өсудің негізін қалады.',
    history_text_012: '1997',
    history_text_013: 'Биржаға шығу',
    history_text_014: 'STADA акциялары алғаш рет Франкфурт және Дюссельдорф биржаларындағы ресми саудаға жіберілді.',
    history_text_015: '2022',
    history_text_016: 'Тұрақты өсу',
    history_text_017: 'Компания өндірісті, specialty бағытын және биосимилярларды кеңейтіп, тұрақты даму туралы алғашқы жаһандық есебін жариялады.',
    history_text_018: '1895-1933',
    history_text_019: '1933-1948',
    history_text_020: '1948-1961',
    history_text_021: '1961-1975',
    history_text_022: '1975-1993',
    history_text_023: '1993-2000',
    history_text_024: '2000-2005',
    history_text_025: '2005-2010',
    history_text_026: '2010-2015',
    history_text_027: '2016-2022',
    history_text_028: 'Уақыт арқылы саяхат',
    history_text_029: 'STADA-ның ұрпақтар арқылы жолы',
    history_text_030: '1895-1933',
    history_text_031: 'Бірыңғай стандарт идеясының тууы',
    history_text_032: 'Фармацевтер бірге көбірек нәтижеге жету үшін бірікті: препараттар бірдей ережелермен өндіріліп, біркелкі қапталып, бір бағада сатылды.',
    history_text_033: '1895',
    history_text_034: 'STADA тарихының басталуы',
    history_text_035: '1895 жылғы 14 наурыз STADA-ның бастауы саналады: Берлин, Дрезден, Вюрцбург, Дармштадт және басқа қалалардағы фармацевтер препараттарды бірге шығара бастады.',
    history_text_036: '1903',
    history_text_037: 'Дәріханалық препараттарды реттеу',
    history_text_038: 'Неміс фармацевтер қауымдастығы фармацевтикалық арнайы өнімдерді дербес өндіру ережелерін бекітті: шығарудан және таңбалаудан бастап қаптама мен бағаға дейін.',
    history_text_039: '1908',
    history_text_040: 'Қауымдастықтың мамандандырылған компаниясы',
    history_text_041: 'Неміс фармацевтер қауымдастығының мамандандырылған компаниясы құрылып, қатысушыларға препараттарды бірдей талаптармен шығаруға мүмкіндік берді.',
    history_text_042: '1933',
    history_text_043: 'Жаңа ұйымдастырушылық форма',
    history_text_044: 'Қауымдастық St.d.A кәсіби қоғамдастығына өткеннен кейін мамандандырылған компания Неміс фармацевтер қауымдастығының өз препараттары бөліміне айналды.',
    history_text_045: '1933-1948',
    history_text_046: 'STADA қауымдастық белгісі ретінде',
    history_text_047: 'Екінші дүниежүзілік соғыстан кейін STADA қауымдастық сауда маркасына айналып, бизнес Солтүстік және Оңтүстік атты екі кооперативтік құрылым арқылы қайта іске қосылды.',
    history_text_048: '1935',
    history_text_049: 'STADA брендінің пайда болуы',
    history_text_050: 'St.d.A қысқартуы тіркелген STADA белгісіне айналып, стандартты формулалар бойынша шығарылатын дәріханалық препараттардың ортақ атауы болды.',
    history_text_051: '1938',
    history_text_052: 'Мюнхендегі филиал',
    history_text_053: 'STADA Мюнхенде филиал ашты. 1944 жылғы бомбалаудан кейін кеңселер Галлеге көшірілді, бірақ соғыс соңында жұмыс тоқтады.',
    history_text_054: '1948',
    history_text_055: 'Соғыстан кейін қайта іске қосылу',
    history_text_056: 'STADA бұрынғы ГФР аумағында екі кооператив ретінде қайта құрылды: Эссендегі STADA North және Тюбингендегі STADA South, негізгі назар өзін-өзі емдеуге арналған өнімдерге аударылды.',
    history_text_057: '1948-1961',
    history_text_058: 'Өндірістік компанияға көшу',
    history_text_059: 'Соғыстан кейінгі екі кооператив бірігіп, Бад-Фильбель/Дортельвайльдегі алаң болашақ өнеркәсіптік өсудің негізіне айналды.',
    history_text_060: '1954',
    history_text_061: 'Бірыңғай компания',
    history_text_062: 'STADA North және STADA South Stada, Standardpräparate Deutscher Apotheken eGmbH болып бірікті, компания Франкфурт-на-Майнға көшті және STADA тауар белгісі тіркелді.',
    history_text_063: '1957',
    history_text_064: 'Бад-Фильбельдегі алаң',
    history_text_065: 'Компания Франкфурт маңындағы үй-жайларды сатып алып, онда заманауи фармацевтикалық өндірістік база біртіндеп қалыптасты.',
    history_text_066: '1961',
    history_text_067: 'Орталықтандырылған өндіріс',
    history_text_068: 'Өкілдер жиналысы STADA препараттарын тек дәріханаларда ғана емес, Дортельвайльде орталықтандырылған түрде де өндіруге болады деп шешті.',
    history_text_069: '1961-1975',
    history_text_070: 'Заманауи индустриялық компанияның негізі',
    history_text_071: 'STADA өз препараттарының көтерме саудасын бастады, құқықтық формасын өзгертті және фармацевтермен тығыз байланысын сақтады.',
    history_text_072: '1970',
    history_text_073: 'Акционерлік модельге көшу',
    history_text_074: 'Кооператив көбірек капитал тартып, тұрақты даму үшін корпорацияға айналды; бұл кезеңде акциялар тек фармацевтерге қолжетімді болды.',
    history_text_075: '1971',
    history_text_076: 'Топтың жаңа компаниялары',
    history_text_077: 'NIDDAPHARM GmbH және STADA-CHEMIE GmbH құрылды, сондай-ақ STADA UZARA-Werk GmbH компаниясын сатып алды.',
    history_text_078: '1975-1993',
    history_text_079: 'Дженериктер және алғашқы халықаралық қадамдар',
    history_text_080: 'Дженериктерді дамыту шешімі негізгі бетбұрыс болды: компания қайта құрылып, тез өсіп, шетелдік нарықтарға шықты.',
    history_text_081: '1975',
    history_text_082: 'STADAPHARM және дженериктер',
    history_text_083: 'STADA желісін дженериктермен кеңейтті, STADAPHARM GmbH құрды, алғашқы лицензияларды алды; табысты өнімдердің бірі Nifedipin STADA болды.',
    history_text_084: '1986',
    history_text_085: 'Алғашқы шетелдік инвестициялар',
    history_text_086: 'Швейцариялық Helvepharm AG сатып алынған соң STADA алғаш рет шетелге шықты. Кейін Австрияда STADA GmbH Austria, Бельгияда Eurogenerics SA және Нидерландта Centrafarm BV пайда болды.',
    history_text_087: '1992',
    history_text_088: 'Азиядағы бастау',
    history_text_089: 'STADA Азиядағы қызметін Гонконгтағы STADA Pharmaceuticals (Asia) Ltd. арқылы бастады.',
    history_text_090: '1993-2000',
    history_text_091: 'Жаһандық ойыншы және биржалық тарих',
    history_text_092: '100 жылдығына қарай бизнес қарқынды өсіп, STADA сатылым бойынша Германия саласының топ-10 қатарына кірді және халықаралық экспансиясын жалғастырды.',
    history_text_093: '1993',
    history_text_094: 'Фармацевт емес акционерлер',
    history_text_095: 'Алғаш рет STADA акционерлері фармацевтер мен компания қызметкерлері ғана емес, басқа инвесторлар да бола алды.',
    history_text_096: '1995',
    history_text_097: 'Холдингтік құрылым',
    history_text_098: 'STADA Бад-Фильбельдегі орташа холдингке қайта ұйымдасты; STADAPharm GmbH және STADA OTC Arzneimittel GmbH рецептуралық және OTC препараттардың негізгі маркетингін өз мойнына алды.',
    history_text_099: '1996',
    history_text_100: 'ALIUD және жаңа нарықтар',
    history_text_101: 'STADA ALIUD PHARMA GmbH компаниясын екінші неміс дженерик желісі ретінде сатып алып, Франция мен Чехияда кеңейді.',
    history_text_102: '1997',
    history_text_103: 'IPO',
    history_text_104: '29 қазанда STADA акциялары алғаш рет Франкфурт және Дюссельдорф қор биржаларындағы ресми саудаға жіберілді.',
    history_text_105: '1998',
    history_text_106: 'Портфельді кеңейту',
    history_text_107: 'Атаулы акциялармен IPO аяқталып, STADA Даниядағы активтерді, Onkologika компаниясын және Fresenius рецептуралық брендтер пакетін сатып алды.',
    history_text_108: '1999',
    history_text_109: 'Таиланд, Испания, Италия',
    history_text_110: 'Халықаралық даму жеделдеді: Бангкокта STADA Asiatic Co. Inc. іске қосылды, Испаниядағы Ciclum Farma және Италиядағы EG S.p.A компанияларына инвестиция салынды.',
    history_text_111: '2000',
    history_text_112: 'Ирландия және акцияларды бөлшектеу',
    history_text_113: 'STADA Ирландия дженериктер нарығының көшбасшысы Clonmel Healthcare Ltd. компаниясын сатып алып, жай және артықшылықты акцияларды 1:10 қатынасында бөлшектеді.',
    history_text_114: '2000-2005',
    history_text_115: 'Индекстер, биодженериктер және Ресей',
    history_text_116: 'STADA MDAX және Euro Stoxx 600 индекстеріне кіріп, биодженериктер әзірлеуді бастады және Ресейге стратегиялық кіруді қоса алғанда халықаралық қатысуын күшейтті.',
    history_text_117: '2001',
    history_text_118: 'Биодженериктер және MDAX',
    history_text_119: 'Биодженериктерді әзірлеу басталды, Азия бизнесі кеңейді, түсім 500 млн еуродан асты, артықшылықты акциялар жай акцияларға айырбасталды және STADA MDAX құрамына кірді.',
    history_text_120: '2002',
    history_text_121: 'АҚШ, Испания және EuroSTOXX 600',
    history_text_122: 'Компания STADA Inc. арқылы АҚШ нарығына шықты, Испания мен Италиядағы позициясын күшейтті, жергілікті брендтерді сатып алды және EuroSTOXX 600 индексіне кірді.',
    history_text_123: '2003',
    history_text_124: 'Жаңа активтер және білім беру бастамасы',
    history_text_125: 'STADA Италиядағы New Pharmajani компаниясына инвестиция салды, Europa Fachhochschule Fresenius-пен бірге health management профессорлық кафедрасын жариялады, Schein Pharmaceuticals UK және redinomedica брендтер пакетін сатып алды.',
    history_text_126: '2004',
    history_text_127: 'Nizhpharm',
    history_text_128: 'Акциялар іс жүзінде 1:1 бөлшектелді, Италиядағы брендтік портфель күшейді, ал Nizhpharm-ның шамамен 97,5%-ын сатып алу Ресейдегі маңызды қадам болды.',
    history_text_129: '2005',
    history_text_130: 'Португалия, Қытай және Mobilat',
    history_text_131: 'STADA Португалиядағы Ciclum Farma, Қытайдағы Beijing Center-Lab Pharmaceutical Company компаниясының 58%-ын және Mobilat кіретін 11 еуропалық бренд пакетін сатып алды.',
    history_text_132: '2005-2010',
    history_text_133: 'Hemofarm, биосимилярлар және тиімділік',
    history_text_134: 'Компания стратегиялық маңызды Hemofarm компаниясын сатып алып, топтың алғашқы биосимилярын іске қосты және алғашқы корпоративтік bond орналастырды.',
    history_text_135: '2006',
    history_text_136: 'Hemofarm',
    history_text_137: 'STADA АҚШ-тағы бизнестен шығып, Сербияның Вршац қаласындағы Hemofarm A.D. компаниясын сатып алды.',
    history_text_138: '2007',
    history_text_139: 'MAKIZ және Forum Bioscience',
    history_text_140: 'STADA MAKIZ Group арқылы Ресейдегі қатысуын күшейтіп, британдық Forum Bioscience Holdings Ltd. компаниясын сатып алды.',
    history_text_141: '2008',
    history_text_142: 'Топтың алғашқы биосимиляры',
    history_text_143: 'Неміс cell pharm компаниясы созылмалы бүйрек жеткіліксіздігі және химиотерапия кезіндегі анемияны емдеуге арналған алғашқы STADA биосимилярын ұсынды; Германияда препарат Silapo атауымен сатылды.',
    history_text_144: '2010',
    history_text_145: 'Алғашқы корпоративтік bond',
    history_text_146: 'STADA алғашқы корпоративтік bond-ты сәтті орналастырып, STADA - build the future тиімділік бағдарламасын іске қосты.',
    history_text_147: '2010-2015',
    history_text_148: 'Брендтік портфельдің өсуі',
    history_text_149: 'Компания брендтік өнімдерді белсенді сатып алып, тиімділік бағдарламасын мерзімінен бұрын аяқтады және британдық OTC өндірушісі Thornton & Ross компаниясын сатып алды.',
    history_text_150: '2011',
    history_text_151: 'Cetraben және Gedeon Richter-пен серіктестік',
    history_text_152: 'STADA Cetraben сатып алып, Gedeon Richter-пен екі биосимиляр әзірлеуді бастады және Шығыс Еуропа мен Таяу Шығысқа арналған Grünenthal портфелін сатып алды.',
    history_text_153: '2012',
    history_text_154: 'Spirig және Австралия',
    history_text_155: 'Орталық Еуропадағы ЕО нарықтарына арналған Grünenthal портфелі сатып алынды, швейцариялық Spirig Pharma AG алынды, Австралияда еншілес компания құрылды, ал тиімділік бағдарламасы аясында жеке өндірістік алаңдар сатылды.',
    history_text_156: '2013',
    history_text_157: 'STADA diagnostics және Thornton & Ross',
    history_text_158: 'STADA дербестендірілген терапияға кірді, Германияда алғашқылардың бірі болып 2D-штрихкод енгізді, Thornton & Ross сатып алды, Сербияда IT shared service center құрды, Grastofil лицензиялады, Мьянмада кеңейді және екінші corporate bond орналастырды.',
    history_text_159: '2014',
    history_text_160: '2 млрд еуро сатылым',
    history_text_161: 'Дубайда логистикалық орталық ашылды, STADA сатылымы алғаш рет 2 млрд еуродан асты, Ресейге арналған Aqualor және Ұлыбритания мен Ирландияға арналған Flexitol құқықтары сатып алынды.',
    history_text_162: '2015',
    history_text_163: '120 жылдық',
    history_text_164: 'STADA 120 жылдығын атап өтті, STADA Diagnostik-ті Ebola экспресс-тестімен кеңейтті, Еуропаға арналған Pegfilgrastim лицензиялады, SCIOTEC және аргентиналық Laboratorio Vannier сатып алды, ал CROMA-PHARMA-пен ынтымақтастық aesthetics бағытын күшейтті.',
    history_text_165: '2016-2022',
    history_text_166: 'Жаңа өсу мәдениеті және specialty фокусы',
    history_text_167: 'STADA халықаралық брендтік өнімдерді, биосимилярларды, specialty бағытын және тұрақты дамуды күшейтті.',
    history_text_168: '2016',
    history_text_169: 'Брендтік өнімдерге фокус',
    history_text_170: 'Табысты Branded Products өнімдерін мақсатты халықаралық дамыту басталды.',
    history_text_171: '2017',
    history_text_172: 'Bain Capital және Cinven',
    history_text_173: 'Bain Capital және Cinven тарапынан ерікті ашық сатып алу ұсынысы сәтті өтті; иелік үлесі шамамен 65%-ға жетті.',
    history_text_174: '2018',
    history_text_175: 'Ladival, Nizoral және жаңа CEO',
    history_text_176: 'STADA Ladival құқықтарын қайтарды, Nizoral бойынша EMEA құқықтарын сатып алды, BIOCEUTICALS мажоритарлық акционері болды, Peter Goldschmidt CEO болып, корпоративтік мәдениет процесін бастады; делистинг жарияланды.',
    history_text_177: '2019',
    history_text_178: 'Күшті портфель және One STADA құндылықтары',
    history_text_179: 'Компания GSK OTC портфелін сатып алды, Movymia және Bortezomib STADA іске қосты, Nizoral сатылымын EMEA-да бастады, Walmark сатып алды, Ресей/ТМД-дағы Takeda OTC портфеліне инвестиция салды, Alvotech-пен серіктестік жасады және Biopharma Ukraine бизнесін сатып алды.',
    history_text_180: '2020',
    history_text_181: 'Alvotech және Lobsor',
    history_text_182: 'STADA Еуропаға арналған жеті биосимиляр бойынша Alvotech-пен стратегиялық серіктестік жасады және Паркинсон ауруына арналған препарат құқықтарымен бірге Lobsor Pharmaceuticals компаниясын сатып алды.',
    history_text_183: '2021',
    history_text_184: 'Sanofi, Calliditas және биосимилярлар',
    history_text_185: 'Паркинсон ауруының кеш сатысына арналған заманауи помпалық технологиялы жаңа өнім, oncology-биосимиляр bevacizumab іске қосылды, Sanofi-дің 16 consumer healthcare бренді сатып алынды, ал Calliditas Therapeutics-пен Еуропадағы IgA-нефропатия бойынша серіктестік жасалды.',
    history_text_186: '2022',
    history_text_187: 'Өндіріс, specialty және тұрақтылық',
    history_text_188: 'STADA Румыниядағы құны 50 млн еуродан асатын нысанмен өндірістік желісін кеңейтті, Kinpeygo іске қосты, Еуропада жоғары концентрациялы adalimumab biosimilar шығарды, алғашқы жаһандық Sustainability Report жариялап, ең тұрақты фармкомпаниялардың топ-10% қатарына кірді.',
    history_text_189: 'stada.com'
  }
};

function getFrontendStaticText(lang, key) {
  if (!key) return '';
  const dictionary = FRONTEND_STATIC_TEXT[lang] || FRONTEND_STATIC_TEXT.ru;
  return dictionary?.[key] || FRONTEND_STATIC_TEXT.ru?.[key] || '';
}

function applyFrontendStaticText(lang) {
  document.querySelectorAll('[data-static-i18n-key]').forEach(el => {
    const key = el.getAttribute('data-static-i18n-key');
    const value = getFrontendStaticText(lang, key);
    if (value) {
      el.textContent = value;
      el.hidden = false;
    }
  });

  document.querySelectorAll('[data-i18n-key]').forEach(el => {
    const key = el.getAttribute('data-i18n-key');
    const value = getFrontendStaticText(lang, key);
    if (value) {
      el.textContent = value;
      el.hidden = false;
    }
  });
}

function applyLocalizedBackendDomText(lang) {
  const localizedText = LOCALIZED_BACKEND_DOM_TEXT[lang];
  if (!localizedText) return;

  Object.entries(localizedText).forEach(([id, value]) => {
    document.querySelectorAll(`[data-backend-text-id="${escapeCssIdentifier(id)}"]`).forEach(el => {
      el.textContent = value;
      el.dataset.backendTextValue = value;
      delete el.dataset.animated;
    });
  });
}

const STADA_BACKEND_BASE_URL = window.STADA_BACKEND_BASE_URL || 'https://stada-content-backend.onrender.com';
const STADA_DOMAIN_COUNTRY = getCountryCodeFromHostname(window.location.hostname);
const STADA_CONFIG_COUNTRY = getConfiguredCountryCode();
const STADA_DEFAULT_COUNTRY = STADA_DOMAIN_COUNTRY || STADA_CONFIG_COUNTRY || 'kz';
const backendPageCache = {};
const backendProductCache = {};
let backendPagePayload = null;
let backendProductPayload = null;
const BACKEND_REQUEST_TIMEOUT_MS = 12000;
const CRITICAL_IMAGE_WAIT_MS = 2500;

async function fetchJsonWithTimeout(url) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), BACKEND_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }
    return response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function wait(ms) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

async function waitForCriticalImages() {
  const selectors = [
    'img[fetchpriority="high"]',
    '.catalog-hero img',
    '.product-hero img',
    '[data-product-image]',
    '[data-product-formula-image]'
  ];
  const images = Array.from(new Set(
    selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)))
  )).filter(img => img instanceof HTMLImageElement && (img.currentSrc || img.src));

  if (!images.length) return;

  const imagePromises = images.map(img => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    if (typeof img.decode === 'function') {
      return img.decode().catch(() => undefined);
    }
    return new Promise(resolve => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    });
  });

  await Promise.race([
    Promise.all(imagePromises),
    wait(CRITICAL_IMAGE_WAIT_MS)
  ]);
}

function normalizeCountryCode(countryInput) {
  const requested = String(countryInput || '').trim().toLowerCase();
  const matched = STADA_COUNTRY_OPTIONS.find(country => {
    return [
      country.code,
      country.label,
      country.backendCountry,
      country.name,
      country.domain,
      ...(country.aliases || []),
    ].some(value => String(value || '').toLowerCase() === requested);
  });
  return matched?.code || 'kz';
}

function getConfiguredCountryCode() {
  const configuredCountry = window.STADA_BACKEND_COUNTRY || window.STADA_COUNTRY || '';
  return configuredCountry ? normalizeCountryCode(configuredCountry) : '';
}

function getCountryCodeFromHostname(hostname) {
  const normalizedHostname = String(hostname || '')
    .trim()
    .toLowerCase()
    .replace(/^www\./, '')
    .split(':')[0];

  const matchedDomainCountry = STADA_COUNTRY_OPTIONS.find(country => {
    return [
      country.domain,
      ...(country.aliases || []),
    ]
      .map(value => String(value || '').trim().toLowerCase().replace(/^www\./, ''))
      .includes(normalizedHostname);
  });

  if (matchedDomainCountry) return matchedDomainCountry.code;

  const topLevelDomain = normalizedHostname.split('.').pop();
  const matchedTldCountry = STADA_COUNTRY_OPTIONS.find(country => country.code === topLevelDomain);
  return matchedTldCountry?.code || '';
}

function getCountryConfig(countryCode = currentCountry) {
  return STADA_COUNTRY_BY_CODE[normalizeCountryCode(countryCode)] || STADA_COUNTRY_BY_CODE.kz;
}

function getSupportedLanguages(countryCode = currentCountry) {
  return getCountryConfig(countryCode).supportedLanguages;
}

function getLanguageLabel(lang) {
  return STADA_LANGUAGE_LABELS[lang] || String(lang || '').toUpperCase();
}

function resolveLanguageForCountry(lang, countryCode = currentCountry) {
  const country = getCountryConfig(countryCode);
  const requested = String(lang || '').trim().toLowerCase();
  if (country.supportedLanguages.includes(requested)) return requested;
  return country.defaultLanguage || country.supportedLanguages[0] || 'ru';
}

function persistLocaleState() {
  try {
    localStorage.setItem('stada-country', currentCountry);
    localStorage.setItem('stada-lang', currentLang);
  } catch (e) {
    // Ignore storage failures.
  }
}

function initializeLocaleState() {
  currentCountry = STADA_DEFAULT_COUNTRY;
  try {
    const savedCountry = localStorage.getItem('stada-country');
    if (savedCountry && !STADA_DOMAIN_COUNTRY) {
      currentCountry = normalizeCountryCode(savedCountry);
    }
    const savedLang = localStorage.getItem('stada-lang');
    if (savedLang) {
      currentLang = resolveLanguageForCountry(savedLang, currentCountry);
    } else {
      currentLang = resolveLanguageForCountry(currentLang, currentCountry);
    }
  } catch (e) {
    currentLang = resolveLanguageForCountry(currentLang, currentCountry);
  }
}

function setToggleActiveIndex(toggle, index) {
  if (!toggle) return;
  toggle.dataset.activeIndex = String(index);
  toggle.style.setProperty('--toggle-active-x', index === 0 ? '0%' : 'calc(100% + 4px)');
  toggle.style.setProperty('--lang-active-x', index === 0 ? '0%' : 'calc(100% + 4px)');
}

function renderLanguageOptions(countryCode = currentCountry) {
  const supportedLanguages = getSupportedLanguages(countryCode);
  document.querySelectorAll('.lang-toggle').forEach(toggle => {
    const buttons = Array.from(toggle.querySelectorAll('.lang-option'));
    buttons.forEach((button, index) => {
      const lang = supportedLanguages[index];
      if (!lang) {
        button.hidden = true;
        return;
      }
      button.hidden = false;
      button.dataset.lang = lang;
      button.id = `lang-${lang}`;
      button.textContent = getLanguageLabel(lang);
      button.setAttribute('aria-label', `Switch language to ${getLanguageLabel(lang)}`);
    });
  });
}

function isBackendDrivenPage() {
  return !!document.querySelector('[data-i18n-key], [data-backend-text-id], [data-backend-image-id]');
}

function isDynamicProductDetailPage() {
  return !!document.querySelector('[data-dynamic-product-page]');
}

function getCurrentBackendPagePath() {
  const pathname = decodeURIComponent(window.location.pathname || '').replace(/\\/g, '/');
  const mainMarker = '/main/';
  const mainIndex = pathname.lastIndexOf(mainMarker);
  let pagePath = mainIndex >= 0 ? pathname.slice(mainIndex + mainMarker.length) : pathname.replace(/^\/+/, '');

  pagePath = pagePath.replace(/^main\//, '');
  if (!pagePath || pagePath.endsWith('/')) pagePath = `${pagePath}index.html`;
  if (pagePath === 'main') pagePath = 'index.html';
  return pagePath || 'index.html';
}

function getSiteAssetPath(relativePath) {
  const depth = Math.max(0, getCurrentBackendPagePath().split('/').length - 1);
  return `${'../'.repeat(depth)}${String(relativePath || '').replace(/^\/+/, '')}`;
}

function getCurrentProductCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search || '');
  const explicitCategory = params.get('category') || params.get('filter');
  if (explicitCategory) return explicitCategory.trim().toLowerCase();

  const hashMatch = String(window.location.hash || '').match(/^#category-([a-z0-9-]+)$/i);
  return hashMatch ? hashMatch[1].toLowerCase() : '';
}

function buildBackendPageUrl(lang) {
  const country = getCountryConfig();
  const url = new URL(`/api/page/${encodeURIComponent(country.backendCountry)}`, STADA_BACKEND_BASE_URL);
  url.searchParams.set('lang', lang);
  url.searchParams.set('page', getCurrentBackendPagePath());
  return url.href;
}

function getDynamicProductSlug() {
  const params = new URLSearchParams(window.location.search || '');
  const explicitSlug = params.get('slug') || params.get('product') || params.get('id');
  if (explicitSlug) return normalizeProductCardId(explicitSlug);

  const slugFromPath = normalizeProductCardId(window.location.pathname.split('/').pop() || '');
  return slugFromPath && slugFromPath !== 'product' ? slugFromPath : '';
}

function buildBackendProductUrl(lang) {
  const slug = getDynamicProductSlug();
  const country = getCountryConfig();
  const url = new URL(`/api/products/${encodeURIComponent(slug)}`, STADA_BACKEND_BASE_URL);
  url.searchParams.set('country', country.backendCountry);
  url.searchParams.set('lang', lang);
  return url.href;
}

async function fetchBackendProduct(lang) {
  const slug = getDynamicProductSlug();
  if (!slug) {
    throw new Error('Product slug is missing.');
  }

  const cacheKey = `${currentCountry}:${lang}:${slug}`;
  if (!backendProductCache[cacheKey]) {
    backendProductCache[cacheKey] = fetchJsonWithTimeout(buildBackendProductUrl(lang));
  }
  return backendProductCache[cacheKey];
}

async function fetchBackendPage(lang) {
  const cacheKey = `${currentCountry}:${lang}:${getCurrentBackendPagePath()}`;
  if (!backendPageCache[cacheKey]) {
    backendPageCache[cacheKey] = fetchJsonWithTimeout(buildBackendPageUrl(lang));
  }
  return backendPageCache[cacheKey];
}

function getBackendPageText(key) {
  if (!backendPagePayload?.content?.text) return '';
  return getBackendTextValue(backendPagePayload.content.text, key);
}

const BACKEND_TEXT_KEY_ALIASES = {
  footer_nav_about: 'nav_about',
  footer_nav_culture: 'nav_culture',
  footer_nav_history: 'nav_history',
  footer_nav_worldwide: 'nav_worldwide',
  footer_nav_news: 'nav_news',
  footer_nav_career: 'nav_career',
};

function getBackendTextValue(text, key) {
  if (!key) return '';
  return text?.[key] || text?.[BACKEND_TEXT_KEY_ALIASES[key]] || '';
}

function escapeCssIdentifier(value) {
  if (window.CSS?.escape) return window.CSS.escape(value);
  return String(value).replace(/["\\]/g, '\\$&');
}

function getTranslatedText(lang, key) {
  return getBackendPageText(key) || getFrontendStaticText(lang, key);
}

function setLanguageToggleState(lang) {
  renderLanguageOptions(currentCountry);
  document.querySelectorAll('.lang-toggle').forEach(langToggle => {
    const buttons = Array.from(langToggle.querySelectorAll('.lang-option:not([hidden])'));
    const activeIndex = Math.max(0, buttons.findIndex(button => button.dataset.lang === lang));
    langToggle.dataset.activeLang = lang;
    setToggleActiveIndex(langToggle, activeIndex);
    buttons.forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  });
}

function applyTextFromBackendPayload(payload) {
  const text = payload?.content?.text || {};
  const dynamicText = {
    hero_kicker: payload?.country?.siteName,
    site_name: payload?.country?.siteName,
  };

  applyFrontendStaticText(currentLang);

  document.querySelectorAll('[data-i18n-key]').forEach(el => {
    const key = el.getAttribute('data-i18n-key');
    const value = dynamicText[key] || getBackendTextValue(text, key) || getFrontendStaticText(currentLang, key);
    if (value) {
      el.textContent = value;
      el.hidden = false;
    } else if (el.closest('.benefits-list')) {
      el.textContent = '';
      el.hidden = true;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder-key]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder-key');
    const value = getBackendTextValue(text, key) || getFrontendStaticText(currentLang, key);
    if (value) el.setAttribute('placeholder', value);
  });

  document.querySelectorAll('[data-i18n-aria-label-key]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label-key');
    const value = getBackendTextValue(text, key) || getFrontendStaticText(currentLang, key);
    if (value) el.setAttribute('aria-label', value);
  });

  (payload?.content?.dom?.text || []).forEach(item => {
    if (!item?.id) return;
    document.querySelectorAll(`[data-backend-text-id="${escapeCssIdentifier(item.id)}"]`).forEach(el => {
      const value = item.value || '';
      el.textContent = value;
      if (el.closest('.benefits-list')) {
        el.hidden = !value;
      }
      el.dataset.backendTextValue = value;
      delete el.dataset.animated;
    });
  });

  applyLocalizedBackendDomText(currentLang);
}

function normalizeImageLookupKey(value) {
  return String(value || '')
    .split('#')[0]
    .split('?')[0]
    .replace(/\\/g, '/')
    .replace(/^https?:\/\/[^/]+\/?/i, '')
    .replace(/^(\.\/)+/, '')
    .replace(/^\/+/, '')
    .replace(/^\.\.\//, '');
}

function isStableCloudinaryImageUrl(src) {
  return /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/(?!v\d+\/)/i.test(String(src || ''));
}

function withRuntimeImageRefresh(src, cacheKey = '') {
  if (!isStableCloudinaryImageUrl(src)) return src;
  if (!cacheKey && !window.location.hostname.match(/^(localhost|127\.0\.0\.1)$/)) return src;

  try {
    const url = new URL(src);
    url.searchParams.set(cacheKey ? 'v' : 'fresh', cacheKey || String(Date.now()));
    return url.href;
  } catch (error) {
    const separator = String(src).includes('?') ? '&' : '?';
    return `${src}${separator}${cacheKey ? 'v' : 'fresh'}=${encodeURIComponent(cacheKey || String(Date.now()))}`;
  }
}

function getCloudinaryProductImageSrc(slug, filename = 'card') {
  const normalizedSlug = normalizeProductCardId(slug);
  if (!normalizedSlug) return '';
  const normalizedFilename = String(filename || 'card')
    .split(/[?#]/)[0]
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9-]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase() || 'card';
  const extension = normalizedSlug === 'cardiomagnil' ? 'jpg' : 'png';
  return `https://res.cloudinary.com/ds2aaznn7/image/upload/stada/products/${normalizedSlug}/${normalizedFilename}.${extension}`;
}

function resolveProductAssetImageSrc(src) {
  const value = String(src || '').trim();
  const normalized = value.replace(/\\/g, '/');
  const productAssetMatch = normalized.match(/(?:^|\/)assets\/products\/([^/?#]+)(?:\/([^?#]+))?/i);
  if (!productAssetMatch) return value;

  const slug = productAssetMatch[1];
  const filename = productAssetMatch[2]?.split('/').pop() || '';
  const cloudinaryName = /(?:packshot|capsules|flacon|spore|bacillus|product)/i.test(filename)
    ? 'card'
    : filename || 'card';
  return getCloudinaryProductImageSrc(slug, cloudinaryName);
}

function applyImagesFromBackendPayload(payload) {
  const overrideImageCacheKey = payload?.content?.overrides?.updatedAt || '';

  (payload?.content?.dom?.images || []).forEach(image => {
    if (!image?.id) return;
    document.querySelectorAll(`img[data-backend-image-id="${escapeCssIdentifier(image.id)}"]`).forEach(img => {
      if (img.dataset.optimizedStaticSrc === 'true' && image.source !== 'override') return;

      const nextSrc = image.source === 'override'
        ? image.url || image.src || img.src
        : image.src || img.src;
      img.src = withRuntimeImageRefresh(resolveProductAssetImageSrc(nextSrc), image.source === 'override' ? overrideImageCacheKey : '');
      if (image.srcset) img.srcset = image.srcset;
      if (image.sizes) img.sizes = image.sizes;
      img.alt = image.alt || '';
      if (image.loading) img.loading = image.loading;
      img.dataset.backendImageApplied = 'true';
    });
  });

  const photosBySrc = new Map();
  (payload?.content?.photos || []).forEach(photo => {
    const keys = [photo.src, photo.url].map(normalizeImageLookupKey).filter(Boolean);
    keys.forEach(key => photosBySrc.set(key, photo));
  });

  document.querySelectorAll('img').forEach(img => {
    if (img.dataset.backendImageApplied === 'true') return;
    const originalSrc = img.getAttribute('data-backend-src') || img.getAttribute('src') || '';
    const photo = photosBySrc.get(normalizeImageLookupKey(originalSrc));
    if (!photo) return;
    img.src = photo.src || photo.url || img.src;
    if (photo.alt) img.alt = photo.alt;
    if (photo.loading) img.loading = photo.loading;
  });
}

function renderHomeProductPreview(payload) {
  const grid = document.querySelector('[data-home-products-grid]');
  const products = payload?.content?.homeProducts || [];
  if (!grid || !products.length) return;

  grid.innerHTML = '';
  products.slice(0, 4).forEach(product => {
    const card = document.createElement('a');
    const categoryClass = product.categoryClass ? ` product-preview-card--${product.categoryClass}` : '';
    card.className = `product-preview-card${categoryClass}`;
    const productHref = String(product.href || '');
    const productSlug = product.slug || product.id || normalizeProductCardId(productHref);
    card.href = productHref && !/^(?:products\/)?(?!index|product)[^/]+\.html(?:$|[?#])/i.test(productHref)
      ? productHref
      : `products/product.html?slug=${encodeURIComponent(productSlug)}`;
    if (product.accent) card.style.setProperty('--product-accent', product.accent);

    const category = document.createElement('span');
    category.className = 'product-preview-card__category';
    category.textContent = product.therapeuticArea || product.category || '';

    const image = document.createElement('img');
    image.src = product.image?.src || product.image?.url || '';
    image.alt = product.image?.alt || product.name || product.id || '';
    image.loading = 'lazy';

    const name = document.createElement('span');
    name.className = 'product-preview-card__name';
    name.textContent = product.name || product.id || '';

    card.append(category, image, name);
    grid.appendChild(card);
  });
}

function applyProductMetrics(payload) {
  const productCount = (payload?.content?.productCatalog || []).length;
  if (!productCount) return;

  ['index_text_026', 'products_index_text_002'].forEach(id => {
    document.querySelectorAll(`[data-backend-text-id="${escapeCssIdentifier(id)}"]`).forEach(el => {
      el.textContent = String(productCount);
      el.dataset.backendTextValue = String(productCount);
      delete el.dataset.animated;
    });
  });
}

function normalizeProductCardId(value) {
  const rawValue = String(value || '').trim();
  const slugMatch = rawValue.match(/[?&]slug=([^&#]+)/);
  if (slugMatch) {
    try {
      return decodeURIComponent(slugMatch[1]).trim();
    } catch (error) {
      return slugMatch[1].trim();
    }
  }

  return rawValue
    .split(/[?#]/)[0]
    .replace(/\\/g, '/')
    .replace(/^(\.\/)+/, '')
    .replace(/^(\.\.\/)+/, '')
    .replace(/^products\//, '')
    .replace(/\.html$/i, '')
    .replace(/\/index$/i, '')
    .trim();
}

function resolveProductCardHref(href) {
  const value = String(href || '').trim();
  if (!value || /^(?:https?:)?\/\//i.test(value) || value.startsWith('#')) return value;

  const normalized = value.replace(/\\/g, '/').replace(/^(\.\/)+/, '');
  if (getCurrentBackendPagePath().startsWith('products/') && normalized.startsWith('products/')) {
    return normalized.replace(/^products\//, '');
  }
  return normalized;
}

function getDynamicProductHref(product) {
  const slug = product?.slug || product?.id || normalizeProductCardId(product?.href || '');
  return `product.html?slug=${encodeURIComponent(slug)}`;
}

function createProductCatalogCard(product) {
  const card = document.createElement('a');
  card.className = 'catalog-card';
  card.dataset.productCard = '';
  card.dataset.dynamicProductCard = 'true';
  card.dataset.productId = product.id || '';
  card.dataset.category = product.category || '';
  card.href = resolveProductCardHref(getDynamicProductHref(product));
  if (product.accent) card.style.setProperty('--card-accent', product.accent);

  const media = document.createElement('div');
  media.className = 'catalog-card__media';

  const image = document.createElement('img');
  image.src = withRuntimeImageRefresh(product.image?.url || product.image?.src || '');
  image.alt = product.image?.alt || product.name || product.id || '';
  image.loading = 'lazy';
  media.appendChild(image);

  const body = document.createElement('div');
  body.className = 'catalog-card__body';

  const category = document.createElement('span');
  category.className = 'catalog-card__category';
  category.textContent = product.therapeuticArea || product.category || '';

  const title = document.createElement('h3');
  title.textContent = product.name || product.id || '';

  const description = document.createElement('p');
  description.textContent = product.shortDescription || '';

  const cta = document.createElement('span');
  cta.className = 'catalog-card__cta';
  cta.textContent = getTranslatedText(currentLang, 'cta_more') || '';

  body.append(category, title, description, cta);
  card.append(media, body);
  return card;
}

function applyProductCatalogCards(payload) {
  const products = payload?.content?.productCatalog || [];
  if (!products.length) return;

  const productsById = new Map(products.map(product => [product.id, product]));
  document.querySelectorAll('[data-product-card]').forEach(card => {
    const cardId = card.dataset.productId || normalizeProductCardId(card.getAttribute('href'));
    const product = productsById.get(cardId);
    if (!product) return;

    card.dataset.productId = product.id;
    card.setAttribute('href', resolveProductCardHref(getDynamicProductHref(product)));
    if (product.category) card.dataset.category = product.category;
    if (product.accent) card.style.setProperty('--card-accent', product.accent);

    const image = card.querySelector('.catalog-card__media img, img');
    const imageSrc = product.image?.url || product.image?.src || '';
    if (image && imageSrc) {
      image.src = withRuntimeImageRefresh(imageSrc);
      image.alt = product.image?.alt || product.name || product.id || '';
      image.dataset.backendImageApplied = 'true';
    }

    const category = card.querySelector('.catalog-card__category');
    if (category && product.therapeuticArea) {
      category.textContent = product.therapeuticArea;
    }

    const title = card.querySelector('.catalog-card__body h3, h3');
    if (title && product.name) {
      title.textContent = product.name;
    }

    const description = card.querySelector('.catalog-card__body p, p');
    if (description && product.shortDescription) {
      description.textContent = product.shortDescription;
    }
  });

  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;

  const existingIds = new Set(
    Array.from(grid.querySelectorAll('[data-product-card]'))
      .map(card => card.dataset.productId || normalizeProductCardId(card.getAttribute('href')))
      .filter(Boolean)
  );
  products.forEach(product => {
    if (!product.id || existingIds.has(product.id)) return;
    grid.appendChild(createProductCatalogCard(product));
    existingIds.add(product.id);
  });
}

function showBackendRequiredMessage(error) {
  backendPagePayload = null;
  delete backendPageCache[`${currentCountry}:${currentLang}:${getCurrentBackendPagePath()}`];
  hideStadaPageLoader();
  document.body.classList.add('backend-content-pending');

  let screen = document.querySelector('[data-backend-error-screen]');
  if (!screen) {
    screen = document.createElement('div');
    screen.setAttribute('data-backend-error-screen', '');
    screen.style.cssText = 'position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:24px;background:#f7f8fb;color:#141414;font:400 16px/1.5 Noto Sans,Arial,sans-serif;';
    document.body.appendChild(screen);
  }

  screen.innerHTML = `
    <section role="alert" aria-live="assertive" style="width:min(100%,560px);padding:44px 38px;border-radius:18px;background:#fff;box-shadow:0 24px 70px rgba(20,20,20,.14);text-align:center;">
      <img src="${getSiteAssetPath('assets/logos/stada_logo.png')}" alt="STADA logo" style="display:block;width:118px;height:auto;margin:0 auto 26px;">
      <p style="margin:0 0 10px;color:#c4002f;font-weight:700;text-transform:uppercase;font-size:13px;letter-spacing:.08em;">Service unavailable</p>
      <h1 style="margin:0 0 14px;font-size:clamp(28px,4vw,42px);line-height:1.12;color:#1d1d1f;">Sorry, our services are unavailable.</h1>
      <p style="margin:0 auto 28px;max-width:420px;color:#4b4b55;font-size:17px;">We're working on fixing it. Please try refreshing the page in a moment.</p>
      <button type="button" data-backend-retry style="appearance:none;border:0;border-radius:999px;background:#005db9;color:#fff;padding:13px 24px;font:700 15px/1 Noto Sans,Arial,sans-serif;cursor:pointer;">Refresh page</button>
    </section>
  `;
  screen.querySelector('[data-backend-retry]')?.addEventListener('click', () => window.location.reload());
  document.title = 'STADA - Service unavailable';
  console.warn('Page backend unavailable.', error);
}

function clearBackendRequiredMessage() {
  document.querySelector('[data-backend-error-screen]')?.remove();
}

function handleBackendPageFailure(error) {
  backendPagePayload = null;
  delete backendPageCache[`${currentCountry}:${currentLang}:${getCurrentBackendPagePath()}`];
  document.body.classList.remove('backend-content-pending');
  hideStadaPageLoader();
  showBackendRequiredMessage(error);
}

function normalizeDynamicProductImageSrc(src) {
  const value = String(src || '').trim();
  if (!value) return 'https://res.cloudinary.com/ds2aaznn7/image/upload/stada/hero/kazakhstan/index/index_image_016.png';
  if (/^(?:https?:)?\/\//i.test(value) || /^data:/i.test(value)) return withRuntimeImageRefresh(value);
  const resolvedProductAsset = resolveProductAssetImageSrc(value);
  if (resolvedProductAsset !== value) return withRuntimeImageRefresh(resolvedProductAsset);
  return getSiteAssetPath(value.replace(/^(\.\/|\.\.\/)+/, ''));
}

function hexToRgbTriplet(hex) {
  const value = String(hex || '').trim().replace(/^#/, '');
  const normalized = value.length === 3
    ? value.split('').map(char => `${char}${char}`).join('')
    : value;
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return '';
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16)
  ].join(', ');
}

function setText(selector, value, { hideEmpty = false } = {}) {
  const el = document.querySelector(selector);
  if (!el) return;
  const text = String(value || '').trim();
  el.textContent = text;
  if (hideEmpty) el.hidden = !text;
}

function replaceChildrenFromList(selector, items, renderItem, { hideEmpty = false } = {}) {
  const container = document.querySelector(selector);
  if (!container) return;
  container.innerHTML = '';
  const renderedItems = (items || []).map(renderItem).filter(Boolean);
  renderedItems.forEach(item => container.appendChild(item));
  if (hideEmpty) container.hidden = !renderedItems.length;
}

function createDynamicProductMetric(item) {
  const article = document.createElement('div');
  article.className = 'product-hero-metric';
  const value = document.createElement('strong');
  value.textContent = item.value || item.title || '';
  const label = document.createElement('span');
  label.textContent = item.title && item.value ? item.title : item.text || '';
  article.append(value, label);
  return article;
}

function createDynamicProductFact(item) {
  const article = document.createElement('article');
  article.className = 'product-fact-card vitrum-animate is-visible';
  const value = document.createElement('span');
  value.textContent = item.value || '';
  const title = document.createElement('h3');
  title.textContent = item.title || '';
  const text = document.createElement('p');
  text.textContent = item.text || '';
  article.append(value, title, text);
  return article;
}

function createDynamicProductBenefit(text) {
  const item = document.createElement('li');
  item.className = 'vitrum-animate is-visible';
  item.textContent = text;
  return item;
}

function createDynamicPartnerCard(link) {
  const card = document.createElement('a');
  card.className = 'partner-card vitrum-animate is-visible';
  card.href = link.url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.setAttribute('aria-label', link.ariaLabel || link.label || 'Pharmacy partner');

  const image = document.createElement('img');
  image.src = normalizeDynamicProductImageSrc(link.logoSrc);
  image.alt = link.logoAlt || link.label || '';
  image.loading = 'lazy';
  const label = document.createElement('p');
  label.textContent = link.label || '';
  card.append(image, label);
  return card;
}

function applyLegacyProductLayout(legacy) {
  if (!legacy) return;
  legacy.bodyClasses
    .filter(className => className.startsWith('product-') && className !== 'product-detail-page')
    .forEach(className => document.body.classList.add(className));

  const heroKicker = document.querySelector('[data-product-kicker]');
  if (heroKicker) heroKicker.hidden = !legacy.heroOptions.hasKicker || !heroKicker.textContent.trim();

  const actions = document.querySelector('.product-hero-actions');
  if (actions) actions.hidden = !legacy.heroOptions.hasActions;

  const badges = document.querySelector('[data-product-badges]');
  if (badges) badges.hidden = !legacy.heroOptions.hasBadges || !badges.children.length;

  document.querySelector('.product-formula-layout')?.setAttribute('class', 'product-section-inner product-formula-layout snup-formula-layout');
  document.querySelector('.snup-formula-system')?.setAttribute('class', 'snup-formula-system vitrum-animate is-visible');
  document.querySelector('.snup-formula-lines')?.setAttribute('class', 'snup-formula-lines');
  document.querySelectorAll('.snup-formula-lines path').forEach(path => path.setAttribute('class', 'snup-formula-line'));
  document.querySelectorAll('.snup-formula-lines circle').forEach(circle => circle.setAttribute('class', 'snup-formula-dot'));
}

function getApiProductBlueprint(product, page) {
  const layout = page?.layout || {};
  const heroOptions = page?.heroOptions || {};
  const hasLayout = Object.values(layout).some(value => {
    return Array.isArray(value) ? value.length : String(value || '').trim();
  });
  const hasHeroOptions = Object.prototype.hasOwnProperty.call(heroOptions, 'hasKicker')
    || Object.prototype.hasOwnProperty.call(heroOptions, 'hasActions')
    || Object.prototype.hasOwnProperty.call(heroOptions, 'hasBadges');

  if (!hasLayout && !hasHeroOptions) return null;

  return {
    bodyClasses: Array.isArray(layout.bodyClasses) ? layout.bodyClasses : [],
    heroOptions: {
      hasKicker: heroOptions.hasKicker !== false,
      hasActions: heroOptions.hasActions !== false,
      hasBadges: heroOptions.hasBadges !== false,
    },
    badges: [],
    metrics: [],
    facts: [],
    benefits: [],
    formulaPoints: [],
    usageItems: [],
    purchaseLinks: [],
    heroImageSrc: '',
    heroImageAlt: product?.image?.alt || product?.name || '',
    formulaImageSrc: '',
    formulaLayoutClassName: layout.formulaLayoutClassName || '',
    formulaSystemClassName: layout.formulaSystemClassName || '',
    formulaLinesClassName: layout.formulaLinesClassName || '',
    formulaLineClassName: layout.formulaLineClassName || '',
    formulaDotClassName: layout.formulaDotClassName || '',
  };
}

function createDynamicFormulaPoint(item, index) {
  const article = document.createElement('article');
  const modifiers = ['active', 'seawater', 'format'];
  article.className = `snup-formula-point snup-formula-point--${modifiers[index] || 'format'} vitrum-animate is-visible`;
  if (!item.title && !item.text) article.classList.add('snup-formula-point--icon-only');
  if (item.imageSrc) {
    const image = document.createElement('img');
    image.src = normalizeDynamicProductImageSrc(item.imageSrc);
    image.alt = item.imageAlt || '';
    image.loading = 'lazy';
    article.appendChild(image);
  } else {
    const value = document.createElement('span');
    value.textContent = item.value || String(index + 1);
    article.appendChild(value);
  }

  if (item.title) {
    const title = document.createElement('h3');
    title.textContent = item.title;
    article.appendChild(title);
  }

  if (item.text) {
    const text = document.createElement('p');
    text.textContent = item.text;
    article.appendChild(text);
  }
  return article;
}

let formulaConnectorFrame = 0;

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function scheduleFormulaConnectorUpdate() {
  if (formulaConnectorFrame) window.cancelAnimationFrame(formulaConnectorFrame);
  formulaConnectorFrame = window.requestAnimationFrame(() => {
    formulaConnectorFrame = 0;
    updateFormulaConnectors();
  });
}

function getFormulaConnectorPoint(rect, anchor) {
  if (anchor === 'right') return { x: rect.right, y: rect.top + rect.height * 0.5 };
  if (anchor === 'left') return { x: rect.left, y: rect.top + rect.height * 0.5 };
  return { x: rect.left + rect.width * 0.5, y: rect.top };
}

function getRenderedFormulaImageRect(image) {
  const rect = image.getBoundingClientRect();
  const naturalWidth = image.naturalWidth || rect.width;
  const naturalHeight = image.naturalHeight || rect.height;
  if (!naturalWidth || !naturalHeight || !rect.width || !rect.height) return rect;

  const scale = Math.min(rect.width / naturalWidth, rect.height / naturalHeight);
  const renderedWidth = naturalWidth * scale;
  const renderedHeight = naturalHeight * scale;

  return {
    left: rect.left + (rect.width - renderedWidth) / 2,
    right: rect.left + (rect.width + renderedWidth) / 2,
    top: rect.top + (rect.height - renderedHeight) / 2,
    bottom: rect.top + (rect.height + renderedHeight) / 2,
    width: renderedWidth,
    height: renderedHeight
  };
}

function getFormulaProductConnectorPoint(productRect, cardAnchor, anchor) {
  const horizontalY = clampNumber(cardAnchor.y, productRect.top + productRect.height * 0.16, productRect.bottom - productRect.height * 0.2);
  if (anchor === 'right') {
    return { x: productRect.left - 10, y: horizontalY };
  }
  if (anchor === 'left') {
    return { x: productRect.right + 10, y: horizontalY };
  }
  const bottomOffset = Math.max(24, Math.min(46, productRect.height * 0.12));
  return {
    x: productRect.left + productRect.width * 0.5,
    y: productRect.bottom + bottomOffset
  };
}

function toFormulaSvgPoint(point, systemRect, viewBox) {
  return {
    x: ((point.x - systemRect.left) / systemRect.width) * viewBox.width,
    y: ((point.y - systemRect.top) / systemRect.height) * viewBox.height
  };
}

function createFormulaConnectorPath(start, end, anchor) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (anchor === 'top') {
    const direction = dy < 0 ? -1 : 1;
    const pull = Math.max(28, Math.min(86, Math.abs(dy) * 0.48));
    return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} C ${start.x.toFixed(1)} ${(start.y + direction * pull).toFixed(1)} ${end.x.toFixed(1)} ${(end.y - direction * pull).toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
  }
  const direction = dx < 0 ? -1 : 1;
  const horizontalPull = Math.max(48, Math.min(124, Math.abs(dx) * 0.72));
  const verticalEase = dy * 0.12;
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} C ${(start.x + direction * horizontalPull).toFixed(1)} ${(start.y + verticalEase).toFixed(1)} ${(end.x - direction * horizontalPull).toFixed(1)} ${(end.y - verticalEase).toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

function getFormulaSourceDots(svg, count) {
  const dots = Array.from(svg.querySelectorAll('.snup-formula-source-dot'));
  while (dots.length < count) {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('class', 'snup-formula-source-dot');
    dot.setAttribute('r', '4');
    svg.appendChild(dot);
    dots.push(dot);
  }
  return dots;
}

function updateFormulaConnectors() {
  const system = document.querySelector('.snup-formula-system');
  const svg = system?.querySelector('.snup-formula-lines');
  const product = system?.querySelector('.snup-formula-product');
  if (!system || !svg || !product) return;

  const viewBox = svg.viewBox?.baseVal;
  const systemRect = system.getBoundingClientRect();
  const productRect = getRenderedFormulaImageRect(product);
  if (!viewBox || !systemRect.width || !systemRect.height || !productRect.width || !productRect.height) return;

  const connectors = [
    { point: system.querySelector('.snup-formula-point--active'), path: svg.querySelectorAll('.snup-formula-line')[0], dot: svg.querySelectorAll('.snup-formula-dot')[0], anchor: 'right' },
    { point: system.querySelector('.snup-formula-point--seawater'), path: svg.querySelectorAll('.snup-formula-line')[1], dot: svg.querySelectorAll('.snup-formula-dot')[1], anchor: 'left' },
    { point: system.querySelector('.snup-formula-point--format'), path: svg.querySelectorAll('.snup-formula-line')[2], dot: svg.querySelectorAll('.snup-formula-dot')[2], anchor: 'top' }
  ];
  const sourceDots = getFormulaSourceDots(svg, connectors.length);

  connectors.forEach((connector, index) => {
    if (!connector.point || !connector.path || !connector.dot) return;
    const cardAnchor = getFormulaConnectorPoint(connector.point.getBoundingClientRect(), connector.anchor);
    const productAnchor = getFormulaProductConnectorPoint(productRect, cardAnchor, connector.anchor);
    const start = toFormulaSvgPoint(productAnchor, systemRect, viewBox);
    const end = toFormulaSvgPoint(cardAnchor, systemRect, viewBox);
    connector.path.setAttribute('d', createFormulaConnectorPath(start, end, connector.anchor));
    connector.dot.setAttribute('cx', end.x.toFixed(1));
    connector.dot.setAttribute('cy', end.y.toFixed(1));
    connector.dot.setAttribute('r', '5.5');
    sourceDots[index]?.setAttribute('cx', start.x.toFixed(1));
    sourceDots[index]?.setAttribute('cy', start.y.toFixed(1));
  });
}

function createDynamicUsageItem(item, index) {
  const article = document.createElement('article');
  article.className = item.className || `usage-item vitrum-animate is-visible${index === 0 ? ' is-active' : ''}`;
  if (!article.classList.contains('is-visible')) article.classList.add('is-visible');
  if (item.isActive || index === 0) article.classList.add('is-active');
  article.tabIndex = 0;
  const marker = document.createElement('span');
  const content = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = item.title || '';
  const text = document.createElement('p');
  text.textContent = item.text || '';
  content.append(title, text);
  article.append(marker, content);
  return article;
}

function renderDynamicProductPage(payload) {
  const product = payload?.product || {};
  const page = product.page || {};
  const blueprint = getApiProductBlueprint(product, page);
  const body = document.body;
  const accent = product.accent || '#005db9';
  const accentRgb = hexToRgbTriplet(accent);

  backendProductPayload = payload;
  clearBackendRequiredMessage();
  body.dataset.productSlug = product.slug || product.id || '';
  const productClass = `product-${String(product.slug || product.id || 'dynamic').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-page`;
  body.classList.add(productClass);
  body.style.setProperty('--product-accent', accent);
  body.style.setProperty('--product-accent-strong', accent);
  if (accentRgb) {
    body.style.setProperty('--product-accent-rgb', accentRgb);
    body.style.setProperty('--product-accent-strong-rgb', accentRgb);
  }

  setText('[data-product-kicker]', page.kicker || product.therapeuticArea);
  setText('[data-product-title]', product.name);
  setText('[data-product-lead]', page.lead || product.shortDescription);
  setText('[data-product-overview-label]', page.overviewLabel || product.therapeuticArea);
  setText('[data-product-overview-heading]', page.overviewHeading || product.name);
  setText('[data-product-overview-intro]', page.overviewIntro || product.shortDescription, { hideEmpty: true });
  setText('[data-product-formula-label]', page.formulaLabel);
  setText('[data-product-formula-heading]', page.formulaHeading || product.name);
  setText('[data-product-formula-intro]', page.formulaIntro, { hideEmpty: true });
  setText('[data-product-usage-label]', page.usageLabel);
  setText('[data-product-usage-heading]', page.usageHeading || product.name);
  setText('[data-product-note-title]', page.noteTitle);
  setText('[data-product-note-text]', page.noteText, { hideEmpty: true });
  setText('[data-product-buy-intro]', page.buyIntro, { hideEmpty: true });

  const image = document.querySelector('[data-product-image]');
  if (image) {
    image.src = blueprint?.heroImageSrc || normalizeDynamicProductImageSrc(product.image?.url || product.image?.src);
    image.alt = blueprint?.heroImageAlt || product.image?.alt || product.name || '';
  }
  const formulaImage = document.querySelector('[data-product-formula-image]');
  if (formulaImage) {
    formulaImage.src = blueprint?.formulaImageSrc || normalizeDynamicProductImageSrc(page.formulaImage || product.image?.url || product.image?.src);
    formulaImage.alt = '';
    formulaImage.addEventListener('load', scheduleFormulaConnectorUpdate, { once: true });
  }

  const badges = page.badges?.length ? page.badges : [product.therapeuticArea, product.shortDescription].filter(Boolean).slice(0, 3);
  replaceChildrenFromList('[data-product-badges]', badges, text => {
    const item = document.createElement('span');
    item.textContent = text;
    return item;
  }, { hideEmpty: true });

  const metrics = page.metrics?.length ? page.metrics : page.facts?.length ? page.facts.slice(0, 3) : [];
  const facts = page.facts || [];
  const formulaPoints = page.formulaPoints || [];
  const usageItems = page.usageItems || [];
  const benefits = page.benefits || [];
  const purchaseLinks = page.purchaseLinks || [];
  replaceChildrenFromList('[data-product-metrics]', metrics, createDynamicProductMetric, { hideEmpty: true });
  replaceChildrenFromList('[data-product-facts]', facts, createDynamicProductFact, { hideEmpty: true });
  replaceChildrenFromList('[data-product-benefits]', benefits, createDynamicProductBenefit, { hideEmpty: true });
  replaceChildrenFromList('[data-product-formula-points]', formulaPoints, createDynamicFormulaPoint, { hideEmpty: true });
  replaceChildrenFromList('[data-product-usage-items]', usageItems, createDynamicUsageItem, { hideEmpty: true });
  replaceChildrenFromList('[data-product-partners]', purchaseLinks, createDynamicPartnerCard, { hideEmpty: true });
  applyLegacyProductLayout(blueprint);
  scheduleFormulaConnectorUpdate();

  document.title = page.title || `STADA - ${product.name || ''}`;
  document.dispatchEvent(new CustomEvent('stada:dynamicproductrender', { detail: { product, lang: currentLang, country: currentCountry } }));

  document.querySelectorAll('[data-vitrum-usage] .usage-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('[data-vitrum-usage] .usage-item').forEach(current => current.classList.toggle('is-active', current === item));
    });
    item.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      item.click();
    });
  });

}

async function updateDynamicProductPage(lang) {
  lang = resolveLanguageForCountry(lang);
  currentLang = lang;
  persistLocaleState();
  document.documentElement.lang = lang;
  document.body.classList.add('backend-content-pending');
  showStadaPageLoader();
  setLanguageToggleState(lang);
  applyFrontendStaticText(lang);
  const payload = await fetchBackendProduct(lang);
  renderDynamicProductPage(payload);
  await waitForCriticalImages();
  scheduleFormulaConnectorUpdate();
  document.body.classList.remove('backend-content-pending');
  hideStadaPageLoader();
}

async function updateBackendDrivenPage(lang) {
  lang = resolveLanguageForCountry(lang);
  currentLang = lang;
  persistLocaleState();
  document.documentElement.lang = lang;
  document.body.classList.add('backend-content-pending');
  showStadaPageLoader();
  setLanguageToggleState(lang);
  applyFrontendStaticText(lang);

  const payload = await fetchBackendPage(lang);
  backendPagePayload = payload;
  clearBackendRequiredMessage();
  applyTextFromBackendPayload(payload);
  applyImagesFromBackendPayload(payload);
  initHistoryTimelineMedia();
  applyProductCatalogCards(payload);
  renderHomeProductPreview(payload);
  applyProductMetrics(payload);
  await waitForCriticalImages();
  document.body.classList.remove('backend-content-pending');
  hideStadaPageLoader();

  updateDocumentTitle(lang);
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.setAttribute('aria-label', getBackendPageText('footer_back_top') || 'Back to top');
  }

  document.dispatchEvent(new CustomEvent('stada:languagechange', { detail: { lang, country: currentCountry } }));
  document.querySelectorAll('.hero-overlay').forEach(overlay => {
    overlay.classList.add('visible');
  });
}

function updateStaticLanguage(lang) {
  lang = resolveLanguageForCountry(lang);
  currentLang = lang;
  persistLocaleState();
  document.documentElement.lang = lang;
  applyFrontendStaticText(lang);

  document.querySelectorAll('[data-i18n-key]').forEach(el => {
    const key = el.getAttribute('data-i18n-key');
    const translation = getTranslatedText(lang, key);
    if (translation) {
      el.textContent = translation;
      el.hidden = false;
    } else if (el.closest('.benefits-list')) {
      el.textContent = '';
      el.hidden = true;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder-key]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder-key');
    const translation = getTranslatedText(lang, key);
    if (translation) el.setAttribute('placeholder', translation);
  });

  document.querySelectorAll('[data-i18n-aria-label-key]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label-key');
    const translation = getTranslatedText(lang, key);
    if (translation) el.setAttribute('aria-label', translation);
  });

  setLanguageToggleState(lang);

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.setAttribute('aria-label', lang === 'kz' ? 'Жоғарыға қайту' : 'Вернуться наверх');
  }

  updateDocumentTitle(lang);
  document.dispatchEvent(new CustomEvent('stada:languagechange', { detail: { lang, country: currentCountry } }));
  document.querySelectorAll('.hero-overlay').forEach(overlay => {
    overlay.classList.add('visible');
  });
}

// Helper to update all elements with data-i18n-key
function updateLanguage(lang) {
  lang = resolveLanguageForCountry(lang);
  if (isDynamicProductDetailPage()) {
    updateDynamicProductPage(lang).catch(error => {
      showBackendRequiredMessage(error);
    });
    return;
  }
  if (isBackendDrivenPage()) {
    updateBackendDrivenPage(lang).catch(error => {
      handleBackendPageFailure(error);
    });
    return;
  }
  updateStaticLanguage(lang);
}

function updateCountry(countryCode) {
  const nextCountry = normalizeCountryCode(countryCode);
  if (nextCountry === currentCountry) return;
  currentCountry = nextCountry;
  backendPagePayload = null;
  updateLanguage(resolveLanguageForCountry(currentLang, nextCountry));
}

// Toggle languages on button click
function toggleLanguage() {
  const supportedLanguages = getSupportedLanguages();
  const currentIndex = supportedLanguages.indexOf(currentLang);
  updateLanguage(supportedLanguages[(currentIndex + 1) % supportedLanguages.length] || supportedLanguages[0]);
}

function updateDocumentTitle(lang) {
  const explicitTitle = document.querySelector('title[data-i18n-key]');
  if (explicitTitle) {
    const titleKey = explicitTitle.getAttribute('data-i18n-key');
    const title = getTranslatedText(lang, titleKey);
    if (title) {
      explicitTitle.textContent = title;
      return;
    }
  }

  const productHeading = document.querySelector('.product-detail-page h1[data-i18n-key]');
  if (productHeading?.textContent.trim()) {
    document.title = `STADA - ${productHeading.textContent.trim()}`;
    return;
  }

  const pageTitleMap = [
    ['worldwide-page', 'worldwide_page_title'],
    ['products-page', 'products_heading'],
    ['history-page', 'nav_history'],
    ['culture-page', 'culture_page_title']
  ];
  const bodyClass = document.body?.classList;
  const matched = pageTitleMap.find(([className]) => bodyClass?.contains(className));
  if (matched) {
    const title = getTranslatedText(lang, matched[1]);
    if (title) {
      document.title = matched[1] === 'worldwide_page_title' ? title : `STADA - ${title}`;
      return;
    }
  }

  const homeTitle = getTranslatedText(lang, 'nav_about');
  if (homeTitle) document.title = `STADA - ${homeTitle}`;
}

// Mobile menu toggle
function setMenuOpen(isOpen) {
  const menu = document.querySelector('.menu');
  const hamburger = document.querySelector('.hamburger');
  if (!menu || !hamburger) return;

  menu.classList.toggle('open', isOpen);
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
}

function toggleMenu() {
  const menu = document.querySelector('.menu');
  if (!menu) return;
  setMenuOpen(!menu.classList.contains('open'));
}

// Initialise Swiper carousel
function initSwiper() {
  // Only initialise the hero swiper if the element exists.  Product pages
  // do not include a hero carousel, so without this guard Swiper would
  // throw an error.  If a container with the `.hero-swiper` class is
  // found, configure it with the same settings used on the landing page.
  const swiperEl = document.querySelector('.hero-swiper');
  if (!swiperEl) return;
  new Swiper('.hero-swiper', {
    loop: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // Use the default slide effect to avoid overlay glitches when the page loads.
    effect: 'slide'
  });
}

// Initialise AOS library
function initAOS() {
  // Only initialise AOS if the library is present.  In the redesigned
  // site the AOS script may be omitted to reduce external dependencies.
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true
    });
  }
}

// Initialise the homepage hero image carousel.
function initHeroCarousel() {
  const carousel = document.querySelector('[data-hero-carousel]');
  if (!carousel) return;

  const hero = carousel.closest('.stada-home-hero');
  const slides = Array.from(carousel.querySelectorAll('.hero-carousel-slide'));
  const dots = Array.from(carousel.querySelectorAll('.hero-carousel-dot'));
  const caption = document.querySelector('[data-hero-caption]');
  const heroTitle = hero?.querySelector('.stada-home-hero__copy h1');
  const heroLead = hero?.querySelector('.stada-home-hero__lead');
  const prevButton = carousel.querySelector('[data-hero-prev]');
  const nextButton = carousel.querySelector('[data-hero-next]');
  if (slides.length < 2) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let timerId = null;
  let transitionTimerId = null;
  let transitionEndTimerId = null;
  let isTransitioning = false;
  let queuedIndex = null;

  function clearHeroTransitionTimers() {
    if (transitionTimerId) {
      window.clearTimeout(transitionTimerId);
      transitionTimerId = null;
    }
    if (transitionEndTimerId) {
      window.clearTimeout(transitionEndTimerId);
      transitionEndTimerId = null;
    }
  }

  function setHeroTransitionState(state) {
    if (!hero) return;
    hero.classList.toggle('is-changing-out', state === 'out');
    hero.classList.toggle('is-changing-in', state === 'in');
  }

  function applySlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    if (hero) {
      hero.dataset.heroActiveSlide = String(activeIndex);
    }
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeIndex);
    });
    carousel.classList.toggle('hero-carousel--awards-active', slides[activeIndex].classList.contains('hero-carousel-slide--awards'));
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('is-active', isActive);
      if (isActive) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });

    const captionKey = slides[activeIndex].dataset.captionKey;
    if (caption && captionKey) {
      caption.setAttribute('data-i18n-key', captionKey);
      caption.textContent = getTranslatedText(currentLang, captionKey) || '';
    }

    const titleKey = slides[activeIndex].dataset.titleKey;
    if (heroTitle && titleKey) {
      heroTitle.setAttribute('data-i18n-key', titleKey);
      heroTitle.textContent = getTranslatedText(currentLang, titleKey) || '';
    }

    const leadKey = slides[activeIndex].dataset.leadKey;
    if (heroLead && leadKey) {
      heroLead.setAttribute('data-i18n-key', leadKey);
      heroLead.textContent = getTranslatedText(currentLang, leadKey) || '';
    }
  }

  function showSlide(index, options = {}) {
    const nextIndex = (index + slides.length) % slides.length;
    const animate = options.animate !== false && !reduceMotion && !!hero;

    if (nextIndex === activeIndex && !isTransitioning) return;

    if (!animate) {
      clearHeroTransitionTimers();
      isTransitioning = false;
      queuedIndex = null;
      setHeroTransitionState(null);
      applySlide(nextIndex);
      return;
    }

    if (isTransitioning) {
      queuedIndex = nextIndex;
      return;
    }

    isTransitioning = true;
    hero.classList.add('has-carousel-transitioned');
    setHeroTransitionState('out');

    transitionTimerId = window.setTimeout(() => {
      transitionTimerId = null;
      applySlide(nextIndex);
      setHeroTransitionState('in');

      transitionEndTimerId = window.setTimeout(() => {
        transitionEndTimerId = null;
        isTransitioning = false;
        setHeroTransitionState(null);

        if (queuedIndex !== null && queuedIndex !== activeIndex) {
          const queued = queuedIndex;
          queuedIndex = null;
          showSlide(queued);
        } else {
          queuedIndex = null;
        }
      }, 980);
    }, 560);
  }

  function stopAutoplay() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function startAutoplay() {
    if (reduceMotion) return;
    stopAutoplay();
    timerId = window.setInterval(() => {
      showSlide(activeIndex + 1);
    }, 5500);
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      showSlide(activeIndex - 1);
      startAutoplay();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      showSlide(activeIndex + 1);
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.heroSlide));
      startAutoplay();
    });
  });

  carousel.addEventListener('pointerenter', stopAutoplay);
  carousel.addEventListener('pointerleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  applySlide(0);
  startAutoplay();
}

function initHeroMetricCounters() {
  const counters = document.querySelectorAll('[data-hero-count]');
  if (!counters.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const formatNumber = value => Math.round(value).toLocaleString('ru-RU').replace(/\u00a0/g, ' ');

  counters.forEach(counter => {
    const target = Number(counter.dataset.heroCount);
    const suffix = counter.dataset.heroSuffix || '';
    if (!Number.isFinite(target)) return;

    if (reduceMotion) {
      counter.textContent = `${formatNumber(target)}${suffix}`;
      return;
    }

    const duration = target > 1000 ? 1700 : 1350;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${formatNumber(target * eased)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = `${formatNumber(target)}${suffix}`;
      }
    }

    requestAnimationFrame(animate);
  });
}

function initNewsCarousel() {
  const carousel = document.querySelector('[data-news-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-news-track]');
  const cards = Array.from(carousel.querySelectorAll('.news-card'));
  const prevButton = document.querySelector('[data-news-prev]');
  const nextButton = document.querySelector('[data-news-next]');
  const current = document.querySelector('[data-news-current]');
  const total = document.querySelector('[data-news-total]');
  const progress = carousel.querySelector('[data-news-progress]');
  if (!track || !cards.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  track.scrollLeft = 0;
  let autoplayId = null;
  let rafId = null;

  const formatIndex = value => String(value).padStart(2, '0');
  const getPositions = () => cards.map(card => card.offsetLeft - track.offsetLeft);
  const getMaxStartIndex = () => {
    const positions = getPositions();
    const maxScroll = track.scrollWidth - track.clientWidth;
    const tolerance = Math.max(24, cards[0].getBoundingClientRect().width * 0.1);
    let maxIndex = positions.length - 1;
    while (maxIndex > 0 && positions[maxIndex] - maxScroll > tolerance) {
      maxIndex -= 1;
    }
    return maxIndex;
  };
  const getIndex = () => {
    const positions = getPositions();
    const closestIndex = positions.reduce((closest, position, index) => {
      const currentDistance = Math.abs(track.scrollLeft - positions[closest]);
      const nextDistance = Math.abs(track.scrollLeft - position);
      return nextDistance < currentDistance ? index : closest;
    }, 0);
    return Math.min(closestIndex, getMaxStartIndex());
  };

  function updateState() {
    const index = getIndex();
    const pageCount = getMaxStartIndex() + 1;
    if (current) current.textContent = formatIndex(index + 1);
    if (total) total.textContent = formatIndex(pageCount);
    if (progress) {
      progress.style.width = `${100 / pageCount}%`;
      progress.style.transform = `translateX(${index * 100}%)`;
    }
  }

  function scrollToIndex(index) {
    const maxStartIndex = getMaxStartIndex();
    const pageCount = maxStartIndex + 1;
    const normalized = (index + pageCount) % pageCount;
    const positions = getPositions();
    track.scrollTo({
      left: positions[normalized],
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  }

  function stopAutoplay() {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function startAutoplay() {
    if (reduceMotion) return;
    stopAutoplay();
    autoplayId = window.setInterval(() => {
      scrollToIndex(getIndex() + 1);
    }, 6500);
  }

  prevButton?.addEventListener('click', () => {
    scrollToIndex(getIndex() - 1);
    startAutoplay();
  });

  nextButton?.addEventListener('click', () => {
    scrollToIndex(getIndex() + 1);
    startAutoplay();
  });

  track.addEventListener('scroll', () => {
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = window.requestAnimationFrame(updateState);
  });

  carousel.addEventListener('pointerenter', stopAutoplay);
  carousel.addEventListener('pointerleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);
  window.addEventListener('resize', updateState);

  updateState();
  startAutoplay();
}

// Initialise the auto-scrolling products carousel.
function initProductsCarousel() {
  const carousel = document.querySelector('.products-carousel');
  if (!carousel) return;
  // Duplicate the current children to allow seamless looping.  Append
  // the existing inner HTML once so that the original set of products
  // appears twice in sequence.  This allows us to translate the
  // container continuously across the viewport without exposing a gap.
  carousel.innerHTML += carousel.innerHTML;
  let isPaused = false;
  let offset = 0;
  // Increase the speed slightly compared to the previous iteration to
  // achieve a brisker scroll.  This value represents the number of
  // pixels moved per animation frame.
  const speed = 0.5;
  // Record the total width of the original (pre‑duplicated) content.
  const originalWidth = carousel.scrollWidth / 2;
  // Enable hardware acceleration for smoother animations.
  carousel.style.willChange = 'transform';
  function animate() {
    if (!isPaused) {
      offset += speed;
      if (offset >= originalWidth) {
        // Loop back by subtracting the original width rather than
        // resetting to zero.  This prevents any visible jump.
        offset -= originalWidth;
      }
      carousel.style.transform = `translateX(-${offset}px)`;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  // Pause scrolling when the pointer enters the carousel and resume
  // when it leaves.  Using pointer events captures mouse and touch
  // interactions uniformly.
  carousel.addEventListener('pointerenter', () => { isPaused = true; });
  carousel.addEventListener('pointerleave', () => { isPaused = false; });
}

function initProductCatalogFilters() {
  const filters = Array.from(document.querySelectorAll('[data-product-filter]'));
  if (!filters.length) return;

  const applyProductCatalogFilter = (activeFilter) => {
    const targetFilter = filters.find(button => button.dataset.productFilter === activeFilter) || filters.find(button => button.dataset.productFilter === 'all');
    if (!targetFilter) return;

    filters.forEach(button => {
      const isActive = button === targetFilter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    const cards = Array.from(document.querySelectorAll('[data-product-card]'));
    cards.forEach(card => {
      const categories = (card.dataset.category || '').split(' ');
      const isVisible = targetFilter.dataset.productFilter === 'all' || categories.includes(targetFilter.dataset.productFilter);
      card.hidden = !isVisible;
      card.setAttribute('aria-hidden', String(!isVisible));
      if (isVisible && card.classList.contains('home-reveal')) {
        card.classList.remove('is-visible');
        requestAnimationFrame(() => card.classList.add('is-visible'));
      }
    });
  };

  filters.forEach(filterButton => {
    filterButton.addEventListener('click', () => {
      applyProductCatalogFilter(filterButton.dataset.productFilter);
    });
  });

  const linkedCategory = getCurrentProductCategoryFromUrl();
  if (linkedCategory) applyProductCatalogFilter(linkedCategory);
}

function initProductDetailPage() {
  const page = document.querySelector('.product-detail-page');
  if (!page) return;

  scheduleFormulaConnectorUpdate();
  window.addEventListener('resize', scheduleFormulaConnectorUpdate);
  document.addEventListener('stada:dynamicproductrender', scheduleFormulaConnectorUpdate);

  page.classList.add('vitrum-reveal-ready');
  const revealItems = Array.from(page.querySelectorAll('.vitrum-animate'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealPassedItems = () => {
    revealItems.forEach(item => {
      if (item.classList.contains('is-visible')) return;
      if (item.getBoundingClientRect().top < window.innerHeight * 0.92) {
        item.classList.add('is-visible');
      }
    });
  };

  if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    revealItems.forEach(item => revealObserver.observe(item));
    revealPassedItems();
    window.addEventListener('scroll', revealPassedItems, { passive: true });
    window.addEventListener('resize', revealPassedItems);
  }

  const usageItems = Array.from(page.querySelectorAll('[data-vitrum-usage] .usage-item'));
  usageItems.forEach(item => {
    const activate = () => {
      usageItems.forEach(current => current.classList.toggle('is-active', current === item));
    };

    item.addEventListener('click', activate);
    item.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      activate();
    });
  });
}

function initVitrumFizzyHeroLevitation() {
  const configs = [
    {
      pageSelector: '.product-vitrum-vitamin-c-page',
      heroSelector: '.product-hero--vitrum-vitamin-c',
      duration: 1420,
      lift: 6,
      shadowBase: 0.72
    },
    {
      pageSelector: '.product-vitrum-energy-page',
      heroSelector: '.product-hero--vitrum-energy',
      duration: 1460,
      lift: 7,
      shadowBase: 0.72
    },
    {
      pageSelector: '.product-vitrum-fizzy-page',
      heroSelector: '.product-hero--vitrum-fizzy',
      duration: 1400,
      lift: 6,
      shadowBase: 0.74
    }
  ];

  const config = configs.find(item => document.querySelector(item.pageSelector));
  if (!config) return;

  const page = document.querySelector(config.pageSelector);
  const hero = page.querySelector(config.heroSelector);
  const packshot = hero?.querySelector('.product-hero-packshot');
  const heroImage = hero?.querySelector('.product-hero-image');
  if (!hero || !packshot || !heroImage) return;

  const resetHero = () => {
    packshot.style.setProperty('--vitrum-fizzy-hero-float-y', '0px');
    heroImage.style.setProperty('--vitrum-fizzy-hero-shadow-opacity', config.shadowBase.toFixed(2));
    heroImage.style.setProperty('--vitrum-fizzy-hero-shadow-transform', 'scale3d(1, 1, 1)');
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    resetHero();
    return;
  }

  let animationFrame = 0;
  let isVisible = true;

  const renderFrame = time => {
    if (!isVisible || document.hidden) {
      animationFrame = 0;
      resetHero();
      return;
    }

    const phase = Math.sin(time / config.duration);
    const progress = (phase + 1) / 2;
    const lift = progress * -config.lift;
    const shadowScaleX = 1 - progress * 0.05;
    const shadowScaleY = 1 - progress * 0.09;
    const shadowOpacity = config.shadowBase - progress * 0.1;

    packshot.style.setProperty('--vitrum-fizzy-hero-float-y', `${lift.toFixed(2)}px`);
    heroImage.style.setProperty('--vitrum-fizzy-hero-shadow-opacity', shadowOpacity.toFixed(3));
    heroImage.style.setProperty('--vitrum-fizzy-hero-shadow-transform', `scale3d(${shadowScaleX.toFixed(3)}, ${shadowScaleY.toFixed(3)}, 1)`);

    animationFrame = window.requestAnimationFrame(renderFrame);
  };

  const start = () => {
    if (!animationFrame && isVisible && !document.hidden) {
      animationFrame = window.requestAnimationFrame(renderFrame);
    }
  };

  const stop = () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }
    resetHero();
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      });
    }, { threshold: 0.08 });

    observer.observe(hero);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  resetHero();
  start();
}

function initHomeScrollReveal() {
  const page = document.querySelector('.home-main');
  if (!page) return;

  const revealGroups = [
    ['.about-copy', 'home-reveal--left'],
    ['.about-stats', 'home-reveal--right'],
    ['.about-values li', 'home-reveal--scale'],
    ['.news-section .section-header', 'home-reveal'],
    ['.news-card', 'home-reveal--scale'],
    ['.career-media', 'home-reveal--left'],
    ['.career-content', 'home-reveal--right'],
    ['.career-fact', 'home-reveal--scale'],
    ['.hero-products-text', 'home-reveal--left'],
    ['.hero-products-image', 'home-reveal--right'],
    ['.products-highlight', 'home-reveal--scale'],
    ['.product-preview-header', 'home-reveal'],
    ['.product-preview-card', 'home-reveal--scale'],
    ['.site-footer .footer-brand', 'home-reveal--left'],
    ['.site-footer .footer-nav__group', 'home-reveal'],
    ['.site-footer .footer-warning', 'home-reveal--scale']
  ];

  const revealItems = [];
  revealGroups.forEach(([selector, variant]) => {
    document.querySelectorAll(selector).forEach((item, index) => {
      if (item.classList.contains('home-reveal')) return;
      item.classList.add('home-reveal', variant);
      item.style.setProperty('--home-reveal-delay', `${Math.min(index, 5) * 70}ms`);
      revealItems.push(item);
    });
  });

  if (!revealItems.length) return;

  const showPassedItems = () => {
    revealItems.forEach(item => {
      if (item.classList.contains('is-visible')) return;
      if (item.getBoundingClientRect().top < window.innerHeight * 0.92) {
        item.classList.add('is-visible');
      }
    });
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    revealItems.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
  showPassedItems();
  window.addEventListener('scroll', showPassedItems, { passive: true });
  window.addEventListener('resize', showPassedItems);
}

function initProductsScrollReveal() {
  const page = document.querySelector('.products-page');
  if (!page) return;

  const revealGroups = [
    ['.catalog-hero__content', 'home-reveal--left'],
    ['.catalog-hero__visual', 'home-reveal--right'],
    ['.catalog-metric', 'home-reveal--scale'],
    ['.catalog-section__header', 'home-reveal'],
    ['.catalog-filter', 'home-reveal'],
    ['.catalog-card', 'home-reveal--scale'],
    ['.catalog-partners__copy', 'home-reveal--left'],
    ['.catalog-partner', 'home-reveal--scale'],
    ['.site-footer .footer-brand', 'home-reveal--left'],
    ['.site-footer .footer-nav__group', 'home-reveal'],
    ['.site-footer .footer-warning', 'home-reveal--scale']
  ];

  const revealItems = [];
  revealGroups.forEach(([selector, variant]) => {
    document.querySelectorAll(selector).forEach((item, index) => {
      if (item.classList.contains('home-reveal')) return;
      item.classList.add('home-reveal', variant);
      item.style.setProperty('--home-reveal-delay', `${Math.min(index, 6) * 65}ms`);
      revealItems.push(item);
    });
  });

  if (!revealItems.length) return;

  const showPassedItems = () => {
    revealItems.forEach(item => {
      if (item.classList.contains('is-visible')) return;
      if (item.getBoundingClientRect().top < window.innerHeight * 0.92) {
        item.classList.add('is-visible');
      }
    });
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    revealItems.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
  showPassedItems();
  window.addEventListener('scroll', showPassedItems, { passive: true });
  window.addEventListener('resize', showPassedItems);
}

function initHistoryScrollReveal() {
  const page = document.querySelector('.history-page');
  if (!page) return;

  const revealGroups = [
    ['.history-hero__content', 'home-reveal--left'],
    ['.history-hero__visual', 'home-reveal--right'],
    ['.history-summary-card', 'home-reveal--scale'],
    ['.history-periods__inner', 'home-reveal'],
    ['.history-section-heading', 'home-reveal'],
    ['.history-period__header', 'home-reveal--left'],
    ['.history-event', 'home-reveal--scale'],
    ['.site-footer .footer-brand', 'home-reveal--left'],
    ['.site-footer .footer-nav__group', 'home-reveal'],
    ['.site-footer .footer-warning', 'home-reveal--scale']
  ];

  const revealItems = [];
  revealGroups.forEach(([selector, variant]) => {
    document.querySelectorAll(selector).forEach((item, index) => {
      if (item.classList.contains('home-reveal')) return;
      item.classList.add('home-reveal', variant);
      item.style.setProperty('--home-reveal-delay', `${Math.min(index, 6) * 65}ms`);
      revealItems.push(item);
    });
  });

  if (!revealItems.length) return;

  const showPassedItems = () => {
    revealItems.forEach(item => {
      if (item.classList.contains('is-visible')) return;
      if (item.getBoundingClientRect().top < window.innerHeight * 0.92) {
        item.classList.add('is-visible');
      }
    });
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    revealItems.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
  showPassedItems();
  window.addEventListener('scroll', showPassedItems, { passive: true });
  window.addEventListener('resize', showPassedItems);
}

function initMagneHeroLevitation() {
  const page = document.querySelector('.product-magne-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--magne');
  const packshot = page.querySelector('.magne-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  if (!hero || !packshot || !heroImage) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    packshot.style.setProperty('--magne-hero-float-y', '0px');
    heroImage.style.setProperty('--magne-hero-shadow-opacity', '0.78');
    heroImage.style.setProperty('--magne-hero-shadow-transform', 'scale3d(1, 1, 1)');
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      page.classList.toggle('magne-hero-paused', !entry.isIntersecting);
    });
  }, { threshold: 0.08 });

  observer.observe(hero);
}

function initEnterogerminaCapsulesHeroLevitation() {
  const page = document.querySelector('.product-enterogermina-capsules-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--enterogermina-capsules');
  const packshot = page.querySelector('.enterogermina-capsules-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  if (!hero || !packshot || !heroImage) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    packshot.style.setProperty('--enterogermina-capsules-hero-float-y', '0px');
    heroImage.style.setProperty('--enterogermina-capsules-hero-shadow-opacity', '0.76');
    heroImage.style.setProperty('--enterogermina-capsules-hero-shadow-transform', 'scale3d(1, 1, 1)');
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      page.classList.toggle('enterogermina-capsules-hero-paused', !entry.isIntersecting);
    });
  }, { threshold: 0.08 });

  observer.observe(hero);
}

function initEnterogerminaForteHeroLevitation() {
  const page = document.querySelector('.product-enterogermina-forte-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--enterogermina-forte');
  const packshot = page.querySelector('.enterogermina-forte-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  if (!hero || !packshot || !heroImage) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    packshot.style.setProperty('--enterogermina-forte-hero-float-y', '0px');
    heroImage.style.setProperty('--enterogermina-forte-hero-shadow-opacity', '0.72');
    heroImage.style.setProperty('--enterogermina-forte-hero-shadow-transform', 'scale3d(1, 1, 1)');
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      page.classList.toggle('enterogermina-forte-hero-paused', !entry.isIntersecting);
    });
  }, { threshold: 0.08 });

  observer.observe(hero);
}

function initAqualorForteHeroLevitation() {
  const page = document.querySelector('.product-aqualor-forte-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--aqualor-forte');
  const packshot = page.querySelector('.aqualor-forte-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  if (!hero || !packshot || !heroImage) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    heroImage.style.setProperty('--aqualor-hero-shadow-opacity', '0.68');
    heroImage.style.setProperty('--aqualor-hero-shadow-transform', 'scale3d(1, 1, 1)');
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      page.classList.toggle('aqualor-forte-hero-paused', !entry.isIntersecting);
    });
  }, { threshold: 0.08 });

  observer.observe(hero);
}

function initAqualorBabyHeroLevitation() {
  const page = document.querySelector('.product-aqualor-baby-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--aqualor-baby');
  const packshot = page.querySelector('.aqualor-baby-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  if (!hero || !packshot || !heroImage) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    heroImage.style.setProperty('--aqualor-hero-shadow-opacity', '0.7');
    heroImage.style.setProperty('--aqualor-hero-shadow-transform', 'scale3d(1, 1, 1)');
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      page.classList.toggle('aqualor-baby-hero-paused', !entry.isIntersecting);
    });
  }, { threshold: 0.08 });

  observer.observe(hero);
}

function initAqualorGorloHeroLevitation() {
  const page = document.querySelector('.product-aqualor-gorlo-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--aqualor-gorlo');
  const packshot = page.querySelector('.aqualor-gorlo-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  if (!hero || !packshot || !heroImage) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    heroImage.style.setProperty('--aqualor-hero-shadow-opacity', '0.68');
    heroImage.style.setProperty('--aqualor-hero-shadow-transform', 'scale3d(1, 1, 1)');
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      page.classList.toggle('aqualor-gorlo-hero-paused', !entry.isIntersecting);
    });
  }, { threshold: 0.08 });

  observer.observe(hero);
}

function initAqualorSoftHeroLevitation() {
  const page = document.querySelector('.product-aqualor-soft-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--aqualor-soft');
  const packshot = page.querySelector('.aqualor-soft-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  if (!hero || !packshot || !heroImage) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    heroImage.style.setProperty('--aqualor-hero-shadow-opacity', '0.7');
    heroImage.style.setProperty('--aqualor-hero-shadow-transform', 'scale3d(1, 1, 1)');
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      page.classList.toggle('aqualor-soft-hero-paused', !entry.isIntersecting);
    });
  }, { threshold: 0.08 });

  observer.observe(hero);
}

function initAqualorSoftMiniHeroLevitation() {
  const page = document.querySelector('.product-aqualor-soft-mini-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--aqualor-soft-mini');
  const packshot = page.querySelector('.aqualor-soft-mini-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  if (!hero || !packshot || !heroImage) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    heroImage.style.setProperty('--aqualor-hero-shadow-opacity', '0.7');
    heroImage.style.setProperty('--aqualor-hero-shadow-transform', 'scale3d(1, 1, 1)');
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      page.classList.toggle('aqualor-soft-mini-hero-paused', !entry.isIntersecting);
    });
  }, { threshold: 0.08 });

  observer.observe(hero);
}

function initNizoralHeroLevitation() {
  const page = document.querySelector('.product-nizoral-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--nizoral');
  const packshot = page.querySelector('.nizoral-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  if (!hero || !packshot || !heroImage) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    heroImage.style.setProperty('--nizoral-hero-shadow-opacity', '0.7');
    heroImage.style.setProperty('--nizoral-hero-shadow-transform', 'scale3d(1, 1, 1)');
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      page.classList.toggle('nizoral-hero-paused', !entry.isIntersecting);
    });
  }, { threshold: 0.08 });

  observer.observe(hero);
}

function initFemilexHeroLevitation() {
  const page = document.querySelector('.product-femilex-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--femilex');
  const packshot = page.querySelector('.femilex-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  if (!hero || !packshot || !heroImage) return;

  const resetHero = () => {
    packshot.style.setProperty('--femilex-hero-float-y', '0px');
    heroImage.style.setProperty('--femilex-hero-shadow-opacity', '0.78');
    heroImage.style.setProperty('--femilex-hero-shadow-transform', 'scale3d(1, 1, 1)');
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    resetHero();
    return;
  }

  let animationFrame = 0;
  let isVisible = true;

  const renderFrame = time => {
    if (!isVisible || document.hidden) {
      animationFrame = 0;
      resetHero();
      return;
    }

    const phase = Math.sin(time / 1350);
    const lift = ((phase + 1) / 2) * -7;
    const shadowScaleX = 1 - ((phase + 1) / 2) * 0.055;
    const shadowScaleY = 1 - ((phase + 1) / 2) * 0.1;
    const shadowOpacity = 0.78 - ((phase + 1) / 2) * 0.12;

    packshot.style.setProperty('--femilex-hero-float-y', `${lift.toFixed(2)}px`);
    heroImage.style.setProperty('--femilex-hero-shadow-opacity', shadowOpacity.toFixed(3));
    heroImage.style.setProperty('--femilex-hero-shadow-transform', `scale3d(${shadowScaleX.toFixed(3)}, ${shadowScaleY.toFixed(3)}, 1)`);

    animationFrame = window.requestAnimationFrame(renderFrame);
  };

  const start = () => {
    if (!animationFrame && isVisible && !document.hidden) {
      animationFrame = window.requestAnimationFrame(renderFrame);
    }
  };

  const stop = () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }
    resetHero();
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      });
    }, { threshold: 0.08 });

    observer.observe(hero);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  start();
}

function initNoshpaForteLevitation() {
  const page = document.querySelector('.product-noshpa-forte-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--noshpa-forte');
  const packshot = page.querySelector('.noshpa-forte-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  const formula = page.querySelector('.noshpa-forte-formula-system');
  const formulaCards = Array.from(page.querySelectorAll('.noshpa-forte-formula-point'));
  if (!hero || !packshot || !heroImage) return;

  const resetHero = () => {
    packshot.style.setProperty('--noshpa-forte-hero-float-y', '0px');
    heroImage.style.setProperty('--noshpa-forte-hero-shadow-opacity', '0.74');
    heroImage.style.setProperty('--noshpa-forte-hero-shadow-transform', 'scale3d(1, 1, 1)');
  };

  const resetFormula = () => {
    formulaCards.forEach(card => {
      card.style.setProperty('--noshpa-forte-formula-card-y', '0px');
    });
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    resetHero();
    resetFormula();
    return;
  }

  let animationFrame = 0;
  let heroVisible = true;
  let formulaVisible = !!formula;

  const renderFrame = time => {
    if (document.hidden || (!heroVisible && !formulaVisible)) {
      animationFrame = 0;
      resetHero();
      resetFormula();
      return;
    }

    if (heroVisible) {
      const phase = Math.sin(time / 1400);
      const liftProgress = (phase + 1) / 2;
      const lift = liftProgress * -6;
      const shadowScaleX = 1 - liftProgress * 0.05;
      const shadowScaleY = 1 - liftProgress * 0.08;
      const shadowOpacity = 0.74 - liftProgress * 0.1;

      packshot.style.setProperty('--noshpa-forte-hero-float-y', `${lift.toFixed(2)}px`);
      heroImage.style.setProperty('--noshpa-forte-hero-shadow-opacity', shadowOpacity.toFixed(3));
      heroImage.style.setProperty('--noshpa-forte-hero-shadow-transform', `scale3d(${shadowScaleX.toFixed(3)}, ${shadowScaleY.toFixed(3)}, 1)`);
    } else {
      resetHero();
    }

    if (formulaVisible) {
      formulaCards.forEach((card, index) => {
        const cardPhase = Math.sin(time / 1250 + index * 0.86);
        card.style.setProperty('--noshpa-forte-formula-card-y', `${(cardPhase * 5).toFixed(2)}px`);
      });
    } else {
      resetFormula();
    }

    animationFrame = window.requestAnimationFrame(renderFrame);
  };

  const start = () => {
    if (!animationFrame && !document.hidden && (heroVisible || formulaVisible)) {
      animationFrame = window.requestAnimationFrame(renderFrame);
    }
  };

  const stopIfIdle = () => {
    if (animationFrame && (document.hidden || (!heroVisible && !formulaVisible))) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      resetHero();
      resetFormula();
    }
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === formula) formulaVisible = entry.isIntersecting;
      });
      stopIfIdle();
      start();
    }, { threshold: 0.08 });

    observer.observe(hero);
    if (formula) observer.observe(formula);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopIfIdle();
    } else {
      start();
    }
  });

  start();
}

function initGecsikonLevitation() {
  const page = document.querySelector('.product-gecsikon-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--gecsikon');
  const packshot = page.querySelector('.gecsikon-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  const formula = page.querySelector('.gecsikon-formula-system');
  const formulaCards = Array.from(page.querySelectorAll('.gecsikon-formula-point'));
  if (!hero || !packshot || !heroImage) return;

  const resetHero = () => {
    packshot.style.setProperty('--gecsikon-hero-float-y', '0px');
    heroImage.style.setProperty('--gecsikon-hero-shadow-opacity', '0.72');
    heroImage.style.setProperty('--gecsikon-hero-shadow-transform', 'scale3d(1, 1, 1)');
  };

  const resetFormula = () => {
    formulaCards.forEach(card => {
      card.style.setProperty('--gecsikon-formula-card-y', '0px');
    });
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    resetHero();
    resetFormula();
    return;
  }

  let animationFrame = 0;
  let heroVisible = true;
  let formulaVisible = !!formula;

  const renderFrame = time => {
    if (document.hidden || (!heroVisible && !formulaVisible)) {
      animationFrame = 0;
      resetHero();
      resetFormula();
      return;
    }

    if (heroVisible) {
      const phase = Math.sin(time / 1380);
      const liftProgress = (phase + 1) / 2;
      const lift = liftProgress * -6;
      const shadowScaleX = 1 - liftProgress * 0.05;
      const shadowScaleY = 1 - liftProgress * 0.08;
      const shadowOpacity = 0.72 - liftProgress * 0.1;

      packshot.style.setProperty('--gecsikon-hero-float-y', `${lift.toFixed(2)}px`);
      heroImage.style.setProperty('--gecsikon-hero-shadow-opacity', shadowOpacity.toFixed(3));
      heroImage.style.setProperty('--gecsikon-hero-shadow-transform', `scale3d(${shadowScaleX.toFixed(3)}, ${shadowScaleY.toFixed(3)}, 1)`);
    } else {
      resetHero();
    }

    if (formulaVisible) {
      formulaCards.forEach((card, index) => {
        const cardPhase = Math.sin(time / 1260 + index * 0.84);
        card.style.setProperty('--gecsikon-formula-card-y', `${(cardPhase * 5).toFixed(2)}px`);
      });
    } else {
      resetFormula();
    }

    animationFrame = window.requestAnimationFrame(renderFrame);
  };

  const start = () => {
    if (!animationFrame && !document.hidden && (heroVisible || formulaVisible)) {
      animationFrame = window.requestAnimationFrame(renderFrame);
    }
  };

  const stopIfIdle = () => {
    if (animationFrame && (document.hidden || (!heroVisible && !formulaVisible))) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      resetHero();
      resetFormula();
    }
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === formula) formulaVisible = entry.isIntersecting;
      });
      stopIfIdle();
      start();
    }, { threshold: 0.08 });

    observer.observe(hero);
    if (formula) observer.observe(formula);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopIfIdle();
    } else {
      start();
    }
  });

  start();
}

function initKlopidogrelTevaLevitation() {
  const page = document.querySelector('.product-klopidogrel-teva-page');
  if (!page) return;

  const hero = page.querySelector('.product-hero--klopidogrel-teva');
  const packshot = page.querySelector('.klopidogrel-teva-hero-packshot');
  const heroImage = page.querySelector('.product-hero-image');
  const formula = page.querySelector('.klopidogrel-teva-formula-system');
  const formulaCards = Array.from(page.querySelectorAll('.klopidogrel-teva-formula-point'));
  if (!hero || !packshot || !heroImage) return;

  const resetHero = () => {
    packshot.style.setProperty('--klopidogrel-teva-hero-float-y', '0px');
    heroImage.style.setProperty('--klopidogrel-teva-hero-shadow-opacity', '0.74');
    heroImage.style.setProperty('--klopidogrel-teva-hero-shadow-transform', 'scale3d(1, 1, 1)');
  };

  const resetFormula = () => {
    formulaCards.forEach(card => {
      card.style.setProperty('--klopidogrel-teva-formula-card-y', '0px');
    });
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    resetHero();
    resetFormula();
    return;
  }

  let animationFrame = 0;
  let heroVisible = true;
  let formulaVisible = !!formula;

  const renderFrame = time => {
    if (document.hidden || (!heroVisible && !formulaVisible)) {
      animationFrame = 0;
      resetHero();
      resetFormula();
      return;
    }

    if (heroVisible) {
      const phase = Math.sin(time / 1380);
      const liftProgress = (phase + 1) / 2;
      const lift = liftProgress * -6;
      const shadowScaleX = 1 - liftProgress * 0.05;
      const shadowScaleY = 1 - liftProgress * 0.08;
      const shadowOpacity = 0.74 - liftProgress * 0.1;

      packshot.style.setProperty('--klopidogrel-teva-hero-float-y', `${lift.toFixed(2)}px`);
      heroImage.style.setProperty('--klopidogrel-teva-hero-shadow-opacity', shadowOpacity.toFixed(3));
      heroImage.style.setProperty('--klopidogrel-teva-hero-shadow-transform', `scale3d(${shadowScaleX.toFixed(3)}, ${shadowScaleY.toFixed(3)}, 1)`);
    } else {
      resetHero();
    }

    if (formulaVisible) {
      formulaCards.forEach((card, index) => {
        const cardPhase = Math.sin(time / 1260 + index * 0.84);
        card.style.setProperty('--klopidogrel-teva-formula-card-y', `${(cardPhase * 5).toFixed(2)}px`);
      });
    } else {
      resetFormula();
    }

    animationFrame = window.requestAnimationFrame(renderFrame);
  };

  const start = () => {
    if (!animationFrame && !document.hidden && (heroVisible || formulaVisible)) {
      animationFrame = window.requestAnimationFrame(renderFrame);
    }
  };

  const stopIfIdle = () => {
    if (animationFrame && (document.hidden || (!heroVisible && !formulaVisible))) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      resetHero();
      resetFormula();
    }
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === formula) formulaVisible = entry.isIntersecting;
      });
      stopIfIdle();
      start();
    }, { threshold: 0.08 });

    observer.observe(hero);
    if (formula) observer.observe(formula);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopIfIdle();
    } else {
      start();
    }
  });

  start();
}

// Highlight the current navigation link as its section enters the viewport
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.menu a');
  if (!sections.length || !navLinks.length) return;
  if (document.body.classList.contains('culture-page')) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === 'culture.html' || href === '../culture.html');
    });
    return;
  }
  if (document.body.classList.contains('history-page')) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === 'history.html');
    });
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          // Remove previous actives
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}` || link.getAttribute('href') === `${location.pathname}#${id}` || link.getAttribute('href') === `../index.html#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

// Shrink the navigation bar on scroll and reveal back to top button
function initScrollEffects() {
  const navBar = document.querySelector('nav');
  if (!navBar) return;
  const backToTop = document.createElement('button');
  backToTop.id = 'backToTop';
  backToTop.setAttribute('aria-label', currentLang === 'ru' ? 'Вернуться наверх' : 'Жоғарыға қайту');
  backToTop.innerHTML = '↑';
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(backToTop);
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    navBar.classList.toggle('scrolled', scrolled);
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  });
}

// Animate numerical counters when they become visible
function initCounters() {
  const counters = document.querySelectorAll('.career-fact .number');
  if (!counters.length) return;
  const animateCounter = (el, endVal, formatValue, finalText) => {
    const duration = 2000;
    const startTime = performance.now();
    const startVal = 0;
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * (endVal - startVal) + startVal);
      el.textContent = el.dataset.prefix + formatValue(value) + el.dataset.suffix;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = finalText;
      }
    };
    requestAnimationFrame(animate);
  };
  const parseNumber = (text) => {
    // Extract digits and return numeric value; ignore thousands separators and symbols
    const match = text.replace(/[^0-9]/g, '');
    return parseInt(match, 10) || 0;
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (!el.dataset.animated) {
          // Store prefix and suffix so we can reassemble the original format
          const text = el.dataset.backendTextValue || el.textContent;
          if (!/[0-9]/.test(text)) {
            el.textContent = text;
            el.dataset.animated = 'true';
            return;
          }
          const prefixMatch = text.match(/^[^0-9]+/);
          const suffixMatch = text.match(/[^0-9]+$/);
          el.dataset.prefix = prefixMatch ? prefixMatch[0] : '';
          el.dataset.suffix = suffixMatch ? suffixMatch[0] : '';
          const endVal = parseNumber(text);
          const shouldGroup = endVal >= 1000 || /\d[\s\u00a0]\d/.test(text);
          const formatValue = shouldGroup
            ? value => value.toLocaleString('ru-RU').replace(/\s/g, '\u00a0')
            : value => String(value);
          animateCounter(el, endVal, formatValue, text);
          el.dataset.animated = 'true';
        }
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(el => observer.observe(el));
}

// Set the current year in the footer
function setYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

function initHistoryTimelineMedia() {
  if (!document.body.classList.contains('history-page')) return;

  const periodImages = {
    'period-1895': 'assets/history/period-1895-1933.jpg',
    'period-1933': 'assets/history/period-1933-1948.jpg',
    'period-1948': 'assets/history/period-1948-1961.jpg',
    'period-1961': 'assets/history/period-1961-1975.jpg',
    'period-1975': 'assets/history/period-1975-1993.png',
    'period-1993': 'assets/history/period-1993-2000.jpg',
    'period-2000': 'assets/history/period-2000-2005.png',
    'period-2005': 'assets/history/period-2005-2010.jpg',
    'period-2010': 'assets/history/period-2010-2015.jpg',
    'period-2016': 'assets/history/2019.jpg'
  };

  const eventImages = {
    '1895': 'assets/history/1895.jpg',
    '1903': 'assets/history/1903.jpg',
    '1908': 'assets/history/1908.jpg',
    '1933': 'assets/history/1933.jpg',
    '1935': 'assets/history/1935.jpg',
    '1938': 'assets/history/1938.jpg',
    '1948': 'assets/history/1948.jpg',
    '1954': 'assets/history/1954.jpg',
    '1957': 'assets/history/1957.jpg',
    '1961': 'assets/history/1961.jpg',
    '1970': 'assets/history/1970.jpg',
    '1971': 'assets/history/1971.jpg',
    '1975': 'assets/history/1975.jpg',
    '1986': 'assets/history/1986.png',
    '1992': 'assets/history/1992.png',
    '1993': 'assets/history/1993.png',
    '1995': 'assets/history/1995.jpg',
    '1996': 'assets/history/1996.jpg',
    '1997': 'assets/history/1997.jpg',
    '1998': 'assets/history/1998.jpg',
    '1999': 'assets/history/1999.jpg',
    '2000': 'assets/history/2000.jpg',
    '2001': 'assets/history/2001.jpg',
    '2002': 'assets/history/2002.png',
    '2003': 'assets/history/2003.png',
    '2004': 'assets/history/2004.png',
    '2005': 'assets/history/2005.jpg',
    '2006': 'assets/history/2006.jpg',
    '2007': 'assets/history/2007.jpg',
    '2008': 'assets/history/2008.jpg',
    '2010': 'assets/history/2010.png',
    '2011': 'assets/history/2011.png',
    '2012': 'assets/history/2012.png',
    '2013': 'assets/history/2013.jpg',
    '2014': 'assets/history/2014.jpg',
    '2015': 'assets/history/2015.jpg',
    '2016': 'assets/history/2016.jpg',
    '2017': 'assets/history/2017.jpg',
    '2018': 'assets/history/2018.jpg',
    '2019': 'assets/history/2019.jpg',
    '2020': 'assets/history/2020.jpg',
    '2021': 'assets/history/2021.jpg',
    '2022': 'assets/history/2022.png'
  };

  const summaryImages = {
    '1895': 'assets/history/period-1895-1933.jpg',
    '1975': 'assets/history/period-1975-1993.png',
    '1997': 'assets/history/1997.jpg',
    '2022': 'assets/history/2022.png'
  };

  document.querySelectorAll('.history-summary-card').forEach(card => {
    const year = card.querySelector('span')?.textContent.trim();
    const src = summaryImages[year];
    if (!src || card.querySelector('.history-summary-card__media')) return;

    const title = card.querySelector('h2')?.textContent.trim() || `STADA ${year}`;
    const figure = document.createElement('figure');
    figure.className = 'history-summary-card__media';
    figure.innerHTML = `<img src="${src}" alt="${title}" loading="lazy">`;
    card.insertBefore(figure, card.firstElementChild);
  });

  document.querySelectorAll('.history-period').forEach(period => {
    const src = periodImages[period.id];
    const header = period.querySelector('.history-period__header');
    if (!src || !header || header.querySelector('.history-period__media')) return;

    const title = header.querySelector('h3')?.textContent.trim() || 'STADA company history';
    const figure = document.createElement('figure');
    figure.className = 'history-period__media';
    figure.innerHTML = `<img src="${src}" alt="${title}" loading="lazy">`;
    header.insertBefore(figure, header.firstElementChild);
  });

  document.querySelectorAll('.history-event').forEach(event => {
    const year = event.querySelector('time')?.textContent.trim();
    const src = eventImages[year];
    if (!src || event.querySelector('.history-event__media')) return;

    const title = event.querySelector('h4')?.textContent.trim() || `STADA ${year}`;
    const figure = document.createElement('figure');
    figure.className = 'history-event__media';
    figure.innerHTML = `<img src="${src}" alt="${title}" loading="lazy">`;
    event.insertBefore(figure, event.firstElementChild);
  });
}

// Bind event listeners
document.addEventListener('DOMContentLoaded', () => {
  initializeLocaleState();
  renderLanguageOptions(currentCountry);
  // Initial language update
  updateLanguage(currentLang);
  // Initialise libraries
  initSwiper();
  initAOS();
  // Initialise custom scroll behaviours
  initScrollSpy();
  initScrollEffects();
  initHomeScrollReveal();
  initProductsScrollReveal();
  initCounters();
  initHistoryTimelineMedia();
  initHistoryScrollReveal();
  setYear();
  // Bind language switcher
  // Prefer the redesigned dual‑button toggle if present.  Each button
  // specifies its target language via the data‑lang attribute.  If
  // neither is found (e.g. on older pages) fall back to the single
  // toggle button and the toggleLanguage() helper.
  const langOptions = document.querySelectorAll('.lang-toggle .lang-option');
  if (langOptions.length) {
    langOptions.forEach(button => {
      button.addEventListener('click', () => updateLanguage(button.dataset.lang));
    });
  } else {
    const langBtn = document.getElementById('langBtn');
    if (langBtn) langBtn.addEventListener('click', toggleLanguage);
  }

  // Initialise homepage carousels
  initHeroCarousel();
  initHeroMetricCounters();
  initNewsCarousel();
  initProductsCarousel();
  initProductCatalogFilters();
  initProductDetailPage();
  initVitrumFizzyHeroLevitation();
  initMagneHeroLevitation();
  initEnterogerminaCapsulesHeroLevitation();
  initEnterogerminaForteHeroLevitation();
  initAqualorForteHeroLevitation();
  initAqualorBabyHeroLevitation();
  initAqualorGorloHeroLevitation();
  initAqualorSoftHeroLevitation();
  initAqualorSoftMiniHeroLevitation();
  initNizoralHeroLevitation();
  initFemilexHeroLevitation();
  initNoshpaForteLevitation();
  initGecsikonLevitation();
  initKlopidogrelTevaLevitation();
  // Bind hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  if (hamburger && menu) {
    if (!menu.id) menu.id = 'site-menu';
    hamburger.setAttribute('type', 'button');
    hamburger.setAttribute('aria-controls', menu.id);
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', toggleMenu);
  }
  // Close mobile menu when clicking a nav link
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      setMenuOpen(false);
    });
  });
  document.addEventListener('click', event => {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    if (!menu || !hamburger || !menu.classList.contains('open')) return;
    if (menu.contains(event.target) || hamburger.contains(event.target)) return;
    setMenuOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenuOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setMenuOpen(false);
  });

  // After initialisation, reveal the hero section.  This prevents
  // unstyled content from flashing onscreen before the overlay and
  // backend content is ready. The class toggled here corresponds to
  // CSS rules that fade in the hero section.
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    // Mark all hero overlays as visible and remove inline hidden styles to prevent initial centered flash
    document.querySelectorAll('.hero-overlay').forEach(el => {
      el.classList.add('visible');
      // Unhide overlays if inline styles were set to hide them initially
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    });
    heroSection.classList.add('loaded');
  }
});
