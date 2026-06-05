/*
 * Main interactivity script for the STADA “О компании” page.
 *
 * Handles language switching (Russian ↔ Kazakh), mobile menu
 * toggling, hero carousel initialisation and scroll animations.
 */

// Translation dictionary. Each key maps to a Russian and Kazakh version.
const translations = {
  ru: {
    nav_about: 'О компании',
    nav_news: 'Новости и Медия',
    nav_products: 'Продукты',
    nav_career: 'Карьера',
    hero_title1: 'Наша миссия — ваше здоровье',
    hero_sub1: 'STADA заботится о качестве жизни через инновации и надежные лекарственные решения.',
    hero_title2: 'Ведущий производитель фармацевтических препаратов',
    hero_sub2: '130-летний опыт и международное присутствие более чем в 100 странах мира.',
    hero_title3: 'Партнер, которому доверяют',
    hero_sub3: 'Мы предлагаем доступные дженерики, потребительские бренды и специальные препараты.',
    hero_metric_years: 'лет опыта',
    hero_metric_countries: 'стран присутствия',
    hero_metric_employees: 'сотрудников по всему миру',
    hero_media_caption: 'Фармацевтическое качество, которому доверяют каждый день',
    hero_caption_office: 'STADA в Казахстане: ближе к пациентам и партнерам',
    hero_caption_scientists: 'Качество и безопасность на каждом этапе производства',
    hero_caption_logo: '130 лет опыта STADA в заботе о здоровье людей',
    about_heading: 'О компании STADA',
    about_par1: 'STADA — ведущий производитель высококачественных фармацевтических препаратов. С более чем 130‑летней историей, уходящей корнями в аптечную практику, мы являемся надежным и заслуживающим доверия партнером.',
    about_par2: 'Компания сосредоточена на трех направлениях: потребительские здравоохранительные продукты, дженерики и специальные препараты. Сегодня STADA присутствует более чем в 100 странах мира и обеспечивает более 11 600 рабочих мест.',
    about_list1: 'Доступность: наши дженерики помогают сделать здравоохранение доступным для всех.',
    about_list2: 'Инновации: мы инвестируем в исследования и разработки для улучшения качества жизни.',
    about_list3: 'Надежность: мы стремимся быть вашим партнером, которому вы можете доверять.',
    stats_sales: '4 059 млн € — объём продаж группы в 2024 году',
    stats_employees: '> 11 600 сотрудников по всему миру',
    stats_countries: '> 100 стран присутствия',
        hero_text1: 'CapVest приобретает контрольный пакет акций STADA у Brain Capital и Cinven',
        hero_text2: 'Путь роста STADA продолжается в 2024 году — значительное увеличение продаж и прибыли — рост опережает рынок.',
        hero_text3: 'В Казахстане велико доверие к врачам, но профилактика остается слабым местом',
        news_section_lead: 'Главные новости, медиа и продуктовые обновления STADA в одном динамичном блоке.',
        news_1_text: 'Сделка открывает новый этап развития группы и усиливает долгосрочную стратегию STADA на международных рынках.',
        news_2_text: 'Компания продолжает показывать устойчивый рост продаж и прибыли, опережая динамику фармацевтического рынка.',
        news_3_text: 'Исследования подчеркивают важность профилактики, доступной информации и доверительного диалога с медицинскими специалистами.',
        news_4_title: 'STADA признана Top Employer Europe 2025',
        news_4_text: 'Признание отражает культуру роста, заботы о сотрудниках и возможности развития для команд STADA.',
        news_5_title: 'Портфель STADA объединяет сильные потребительские бренды и дженерики',
        news_5_text: 'Продуктовая линейка помогает поддерживать здоровье пациентов в разных терапевтических направлениях.',
        news_6_title: 'Enterogermina поддерживает здоровье микрофлоры',
        news_6_text: 'Пробиотическое направление остается важной частью решений STADA для повседневного здоровья.',
        news_7_title: 'Coldrex остается узнаваемым брендом в сезон простуды',
        news_7_text: 'Средства для облегчения симптомов простуды помогают пациентам сохранять привычный ритм жизни.',
        news_8_title: 'Vitrum Immunaktiv в фокусе ежедневной поддержки',
        news_8_text: 'Витаминно-минеральные комплексы дополняют портфель продуктов для заботы о самочувствии.',
        cta_more: 'Подробнее',
    // Gallery
    gallery_heading: 'Галерея',
    // Products section
    products_heading: 'Наши продукты',
    product_enterogermina_name: 'Энтерожермина',
    product_magneb6kids_name: 'Магне B6 Кидс',
    product_sinulan_duo_name: 'Синулан Дуо',
    product_snup_name: 'Снуп',
    product_edarbi_klo_name: 'Эдарби Кло',
    product_coldrex_name: 'Колдрекс',
    // Product page titles and descriptions
    product_enterogermina_page_title: 'Энтерожермина',
    product_enterogermina_page_desc: 'Энтерожермина — пробиотик для лечения и профилактики дисбактериоза. Содержит споры Bacillus clausii, которые помогают восстановить кишечную микрофлору.',
    product_magneb6kids_page_title: 'Магне B6 Кидс',
    product_magneb6kids_page_desc: 'Магне B6 Кидс — жевательные таблетки с магнием и витамином B6 для детей с 4 лет. Компоненты помогают поддерживать нормальную работу нервной системы и энергетический обмен.',
    product_sinulan_duo_page_title: 'Синулан Дуо',
    product_sinulan_duo_page_desc: 'Синулан Дуо — комплекс растительных экстрактов для облегчения дыхания при простуде и поддержания здоровья дыхательных путей.',
    product_snup_page_title: 'Снуп',
    product_snup_page_desc: 'Снуп — дозированный назальный спрей с ксилометазолином и морской водой для облегчения носового дыхания при заложенности носа.',
    product_edarbi_klo_page_title: 'Эдарби Кло',
    product_edarbi_klo_page_desc: 'Эдарби Кло — комбинированный препарат на основе азилсартана медоксомила и хлорталидона для снижения артериального давления.',
        product_back: 'Назад к продуктам',
    // Enterogermina benefits
    product_enterogermina_benefit1: 'Восстанавливает здоровую микрофлору кишечника',
    product_enterogermina_benefit2: 'Содержит споры Bacillus clausii, устойчивые к влиянию антибиотиков',
    product_enterogermina_benefit3: 'Удобная жидкая форма — подходит детям и взрослым',
    product_enterogermina_benefit4: 'Подходит для лечения и профилактики дисбактериоза',
    product_enterogermina_kicker: 'Пробиотик для микрофлоры',
    product_enterogermina_badge_spores: 'Споры Bacillus clausii',
    product_enterogermina_badge_pack: '10 флаконов',
    product_enterogermina_badge_liquid: 'Жидкая форма',
    product_enterogermina_metric_spores: 'споры Bacillus clausii',
    product_enterogermina_metric_pack: 'флаконов в упаковке',
    product_enterogermina_metric_format: 'готовая жидкая форма',
    product_enterogermina_overview_label: 'Поддержка микрофлоры',
    product_enterogermina_overview_heading: 'Формат для восстановления баланса кишечной микрофлоры',
    product_enterogermina_overview_intro: 'Энтерожермина помогает восполнить полезные бактерии при нарушении баланса кишечной микрофлоры и после воздействия неблагоприятных факторов.',
    product_enterogermina_card_bacillus_title: 'Bacillus clausii',
    product_enterogermina_card_bacillus_text: 'Пробиотические споры помогают поддерживать нормальный состав кишечной микрофлоры.',
    product_enterogermina_card_spores_title: 'Споровая форма',
    product_enterogermina_card_spores_text: 'Споры устойчивы к кислой среде и помогают доставить Bacillus clausii в кишечник.',
    product_enterogermina_card_pack_title: '10 флаконов',
    product_enterogermina_card_pack_text: 'Упаковка рассчитана на удобный курсовой прием согласно инструкции.',
    product_enterogermina_card_format_title: '5 мл',
    product_enterogermina_card_format_text: 'Флакон легко открыть и принять без дополнительных приготовлений.',
    product_enterogermina_formula_label: 'Формула',
    product_enterogermina_formula_heading: 'В центре — Bacillus clausii и удобная жидкая форма',
    product_enterogermina_formula_intro: 'Компоненты собраны вокруг упаковки, чтобы сразу показать состав, устойчивость спор и удобство приема.',
    product_enterogermina_formula_bacillus_title: 'Bacillus clausii',
    product_enterogermina_formula_bacillus_text: 'Пробиотические споры помогают поддерживать нормальную кишечную микрофлору.',
    product_enterogermina_formula_spores_title: 'Споровая форма',
    product_enterogermina_formula_spores_text: 'Форма спор помогает бактериям сохранять стабильность до попадания в кишечник.',
    product_enterogermina_formula_pack_title: 'Готовая суспензия',
    product_enterogermina_formula_pack_text: 'Жидкая форма во флаконе: удобно принимать без предварительного приготовления.',
    product_enterogermina_usage_label: 'Когда актуально',
    product_enterogermina_usage_heading: 'Для поддержки кишечной микрофлоры в повседневной заботе',
    product_enterogermina_usage_microflora_title: 'При нарушении баланса',
    product_enterogermina_usage_microflora_text: 'Подходит для восстановления микрофлоры при дисбактериозе согласно инструкции.',
    product_enterogermina_usage_antibiotic_title: 'После антибиотиков',
    product_enterogermina_usage_antibiotic_text: 'Может применяться для поддержки микрофлоры во время или после антибактериальной терапии согласно инструкции.',
    product_enterogermina_usage_family_title: 'Для семьи',
    product_enterogermina_usage_family_text: 'Жидкий формат подходит детям и взрослым при соблюдении рекомендаций по применению.',
    product_enterogermina_note_title: 'Важно помнить',
    product_enterogermina_note_text: 'Перед применением ознакомьтесь с инструкцией и проконсультируйтесь со специалистом, особенно для детей.',
    product_enterogermina_buy_intro: 'Ищите Энтерожермину у аптечных партнеров STADA в Казахстане.',
    // Career page translations (added)
    career_heading: 'Карьера в STADA',
    career_par1: 'Работать в STADA — это уникальное путешествие. Мы предлагаем разнообразные и увлекательные роли: от стартовых должностей для выпускников до экспертных позиций. Наши вакансии охватывают широкий спектр навыков и не ограничиваются фармацевтической отраслью — вы также найдёте возможности в области цепочки поставок, маркетинга, финансов, управления проектами и многого другого.',
    career_par2: 'Мы работаем в пяти основных функциональных областях, чтобы вы могли выбрать направление, которое лучше всего подходит вашему карьерному пути:',
    career_list1: 'Технические операции',
    career_list2: 'Продажи и маркетинг',
    career_list3: 'Разработка продуктов и портфеля',
    career_list4: 'Стратегия и развитие бизнеса',
    career_list5: 'Бизнес‑функции',
    career_fact1: 'руководителей — женщины',
    career_fact2: 'сотрудников гордятся нашей целью «Забота о здоровье людей как надёжный партнёр»',
    career_fact3: 'сотрудников по всему миру',
    career_fact4: 'национальности в нашей команде',
    career_fact5: 'фармацевтических компаний по рейтингу Sustainalytics ESG 2023',
    career_par3: 'Мы были признаны «Top Employer Europe 2025», что подтверждает нашу уникальную культуру роста и заботы о сотрудниках. Вы можете подать заявку на конкретную вакансию или отправить резюме, чтобы стать частью нашего сообщества талантов. После подачи заявки вы получите подтверждение по электронной почте.',
    career_button: 'Смотреть вакансии',
    hero_products_label: 'НАШИ ПРОДУКТЫ',
    hero_products_heading: 'Качественные лекарства для лучшей жизни',
    hero_products_description: 'Мы предлагаем широкий ассортимент высококачественных дженериков и продуктов для здоровья потребителей в различных терапевтических областях.',
    products_browse_catalog: 'Смотреть каталог',
    products_metric_portfolio: 'продуктов в каталоге',
    products_metric_areas: 'терапевтических направлений',
    products_catalog_label: 'Каталог STADA',
    products_catalog_intro: 'Выберите направление или откройте карточку продукта, чтобы узнать больше о составе, преимуществах и местах покупки.',
    products_filter_all: 'Все продукты',
    products_category_cold: 'Простуда и дыхание',
    products_category_immunity: 'Иммунитет',
    products_category_digestive: 'Пищеварение',
    products_category_kids: 'Для детей',
    products_category_cardio: 'Кардио',
    products_category_respiratory: 'Дыхательные пути',
    products_partners_heading: 'Доступны в аптеках и онлайн-сервисах',
    products_partners_intro: 'Продукты STADA можно найти у партнеров в Казахстане: от крупных аптечных сетей до удобных цифровых сервисов.',
    footer_pill: 'STADA Казахстан',
    footer_heading: 'Забота о здоровье начинается с надежной информации',
    footer_lead: 'Перейдите к каталогу продуктов, узнайте больше о компании или откройте карьерные возможности STADA.',
    footer_catalog_cta: 'Открыть каталог',
    footer_career_cta: 'Карьера в STADA',
    footer_brand_text: 'Мы объединяем международный опыт STADA и локальную близость к пациентам, специалистам и партнерам в Казахстане.',
    footer_trust_years: '130+ лет опыта',
    footer_trust_countries: '100+ стран',
    footer_company_title: 'Компания',
    footer_products_title: 'Продукты',
    footer_access_title: 'Доступность',
    footer_global_link: 'STADA Global',
    footer_warning_title: 'Важно',
    footer_warning_text: 'Информация на сайте не заменяет консультацию специалиста. Перед применением лекарственных средств ознакомьтесь с инструкцией.',
    footer_rights: 'Все права защищены.',
    footer_back_top: 'Наверх',
    where_to_buy_heading: 'Где купить',
    benefits_heading: 'Преимущества',
    // The comma below starts the product-specific keys inserted later
    
    // Coldrex page title and description
    product_coldrex_page_title: 'Колдрекс',
    product_coldrex_page_desc: 'Колдрекс — комбинированный препарат для облегчения симптомов простуды и гриппа.',
    // Coldrex benefits
    product_coldrex_benefit1: 'Парацетамол помогает снижать повышенную температуру и облегчать боль',
    product_coldrex_benefit2: 'Фенилэфрин помогает уменьшать заложенность носа и синусов',
    product_coldrex_benefit3: 'Витамин C дополняет формулу и поддерживает организм в сезон простуд',
    product_coldrex_benefit4: 'Горячий формат помогает сделать прием привычным и комфортным',
    product_coldrex_benefit5: 'Комплексное действие направлено на основные симптомы простуды и гриппа',
    product_coldrex_benefit6: 'Применяется согласно инструкции с учетом возраста и противопоказаний',
    product_coldrex_overview_label: 'О продукте',
    product_coldrex_overview_heading: 'Комплексная помощь при симптомах простуды',
    product_coldrex_overview_intro: 'Колдрекс ХотРем объединяет жаропонижающий, противозаложенный и поддерживающий компоненты в формате горячего напитка, чтобы помогать при типичных симптомах простуды и гриппа.',
    product_coldrex_card_format_title: '10 пакетиков',
    product_coldrex_card_format_text: 'Упаковка рассчитана на несколько приемов по схеме, указанной в инструкции.',
    product_coldrex_card_action_title: 'Тройной фокус',
    product_coldrex_card_action_text: 'Формула сфокусирована на температуре, боли, заложенности носа и общем самочувствии.',
    product_coldrex_card_vitamin_title: 'Витамин C',
    product_coldrex_card_vitamin_text: 'Аскорбиновая кислота дополняет формулу в сезон повышенной нагрузки на организм.',
    product_coldrex_card_pack_title: 'Порционный формат',
    product_coldrex_card_pack_text: 'Каждый пакетик удобно использовать для приготовления одной порции горячего напитка.',
    product_coldrex_formula_label: 'Формула',
    product_coldrex_formula_heading: 'Три компонента комплексного действия',
    product_coldrex_formula_intro: 'Формула Колдрекс ХотРем объединяет компоненты для облегчения основных симптомов простуды и поддержки организма.',
    product_coldrex_formula_paracetamol_title: 'Парацетамол',
    product_coldrex_formula_paracetamol_text: 'Помогает снижать повышенную температуру и облегчать головную боль, боль в горле и ломоту.',
    product_coldrex_formula_phenylephrine_title: 'Фенилэфрин',
    product_coldrex_formula_phenylephrine_text: 'Помогает уменьшать заложенность носа и синусов, облегчая дыхание.',
    product_coldrex_formula_vitamin_c_title: 'Витамин C',
    product_coldrex_formula_vitamin_c_text: 'Дополняет формулу и поддерживает организм в сезон простуд.',
    product_coldrex_usage_label: 'Когда особенно актуально',
    product_coldrex_usage_heading: 'При температуре, боли и заложенности',
    product_coldrex_usage_fever_title: 'Температура и ломота',
    product_coldrex_usage_fever_text: 'Актуален, когда простуда сопровождается повышенной температурой, головной болью и ломотой.',
    product_coldrex_usage_congestion_title: 'Заложенность носа',
    product_coldrex_usage_congestion_text: 'Подходит при симптомах заложенности носа и синусов, когда дыхание становится менее свободным.',
    product_coldrex_usage_season_title: 'Сезон простуд',
    product_coldrex_usage_season_text: 'Уместен как симптоматическая поддержка в периоды простуды и гриппа согласно инструкции.',
    product_coldrex_note_title: 'Ответственное применение',
    product_coldrex_note_text: 'Перед применением ознакомьтесь с инструкцией и проконсультируйтесь со специалистом, особенно при хронических заболеваниях или приеме других средств.',
    // Magne B6 Kids
    product_magneb6kids_benefit1: 'Магний и витамин B6 помогают поддерживать нормальную работу нервной системы',
    product_magneb6kids_benefit2: 'Компоненты участвуют в энергетическом обмене и помогают снижать утомляемость',
    product_magneb6kids_benefit3: 'Витамин B6 дополняет действие магния и поддерживает его усвоение',
    product_magneb6kids_benefit4: 'Формула помогает поддерживать нормальную психологическую функцию',
    product_magneb6kids_benefit5: 'Жевательный формат удобен для ежедневного приема детьми согласно инструкции',
    product_magneb6kids_benefit6: 'Подходит детям с 4 лет; дозировку выбирают с учетом возраста',
    product_magneb6kids_kicker: 'Магний + витамин B6',
    product_magneb6kids_badge_age: 'Для детей 4+',
    product_magneb6kids_badge_chewable: 'Жевательные таблетки',
    product_magneb6kids_badge_formula: 'Mg + B6',
    product_magneb6kids_metric_magnesium: 'мг магния',
    product_magneb6kids_metric_vitamin: 'витамин B6',
    product_magneb6kids_metric_age: 'для детей',
    product_magneb6kids_overview_label: 'О продукте',
    product_magneb6kids_overview_heading: 'Поддержка нервной системы в детском ритме',
    product_magneb6kids_overview_intro: 'Магне B6 Кидс объединяет магний и витамин B6 в жевательном формате, который помогает встроить нутриентную поддержку в ежедневный режим ребенка.',
    product_magneb6kids_card_magnesium_title: '70 мг магния',
    product_magneb6kids_card_magnesium_text: 'Магний важен для нормальной работы нервной системы и мышц, а также для ежедневного обмена веществ.',
    product_magneb6kids_card_b6_title: 'Витамин B6',
    product_magneb6kids_card_b6_text: 'Витамин B6 участвует в энергетическом обмене и помогает снижать утомляемость.',
    product_magneb6kids_card_format_title: '30 таблеток',
    product_magneb6kids_card_format_text: 'Жевательная форма помогает сделать прием понятным и привычным для ребенка.',
    product_magneb6kids_card_age_title: 'С 4 лет',
    product_magneb6kids_card_age_text: 'Формат предназначен для детей старше 4 лет; режим приема подбирают по инструкции.',
    product_magneb6kids_formula_label: 'Формула',
    product_magneb6kids_formula_heading: 'Три элемента спокойной поддержки',
    product_magneb6kids_formula_intro: 'Формула строится вокруг магния, витамина B6 и детского жевательного формата, чтобы поддержка была понятной и регулярной.',
    product_magneb6kids_formula_magnesium_title: 'Магний',
    product_magneb6kids_formula_magnesium_text: 'Помогает поддерживать нормальную работу нервной системы и мышц.',
    product_magneb6kids_formula_b6_title: 'Витамин B6',
    product_magneb6kids_formula_b6_text: 'Дополняет магний и участвует в процессах энергетического обмена.',
    product_magneb6kids_formula_format_title: 'Детский формат',
    product_magneb6kids_formula_format_text: 'Жевательные таблетки удобно вписываются в ежедневный режим согласно инструкции.',
    product_magneb6kids_usage_label: 'Когда особенно актуально',
    product_magneb6kids_usage_heading: 'В период учебы, роста и активного ритма',
    product_magneb6kids_usage_school_title: 'Учебная нагрузка',
    product_magneb6kids_usage_school_text: 'Подходит как нутриентная поддержка в периоды, когда ребенку важно сохранять устойчивый ежедневный ритм.',
    product_magneb6kids_usage_activity_title: 'Активные дни',
    product_magneb6kids_usage_activity_text: 'Магний и витамин B6 помогают поддерживать энергетический обмен при насыщенном графике.',
    product_magneb6kids_usage_diet_title: 'Особенности рациона',
    product_magneb6kids_usage_diet_text: 'Может быть уместен, когда рациону нужна дополнительная поддержка магнием и витамином B6.',
    product_magneb6kids_note_title: 'Ответственный прием',
    product_magneb6kids_note_text: 'Перед применением ознакомьтесь с инструкцией и проконсультируйтесь со специалистом, особенно если у ребенка есть хронические заболевания или он принимает другие средства.',
    product_magneb6kids_buy_intro: 'Ищите Магне B6 Кидс у аптечных партнеров STADA в Казахстане.',
    // Snup benefits
    product_snup_benefit1: 'Ксилометазолин помогает уменьшать отек слизистой оболочки носа и облегчать носовое дыхание',
    product_snup_benefit2: 'Действие обычно начинается в течение 5–10 минут после применения',
    product_snup_benefit3: 'Деконгестантный эффект в среднем сохраняется 6–8 часов после однократного применения',
    product_snup_benefit4: 'Морская вода поддерживает нормальное физиологическое состояние слизистой оболочки носа',
    product_snup_benefit5: 'Формат 0,1% предназначен для взрослых и детей старше 6 лет',
    product_snup_benefit6: 'Курс применения по инструкции не должен превышать 5–7 дней',
    product_snup_kicker: 'Назальный спрей',
    product_snup_badge_spray: 'Дозированный спрей',
    product_snup_badge_seawater: 'Морская вода',
    product_snup_badge_age: 'С 6 лет для 0,1%',
    product_snup_metric_minutes: 'минут до начала действия',
    product_snup_metric_hours: 'часов эффекта в среднем',
    product_snup_metric_doses: 'доз во флаконе',
    product_snup_overview_label: 'О продукте',
    product_snup_overview_heading: 'Дыхание свободнее при заложенности носа',
    product_snup_overview_intro: 'Снуп сочетает местное сосудосуживающее действие ксилометазолина и морскую воду, чтобы помогать уменьшать отек слизистой и облегчать носовое дыхание при рините.',
    product_snup_card_strength_title: '0,1% / 90 мкг',
    product_snup_card_strength_text: 'Формат на упаковке предназначен для взрослых и детей старше 6 лет согласно инструкции.',
    product_snup_card_action_title: 'Ксилометазолин',
    product_snup_card_action_text: 'Деконгестант помогает уменьшать отек и гиперемию слизистой оболочки носа.',
    product_snup_card_seawater_title: 'Морская вода',
    product_snup_card_seawater_text: 'Компонент поддерживает физиологическое состояние слизистой и работу мерцательного эпителия.',
    product_snup_card_course_title: '5–7 дней',
    product_snup_card_course_text: 'Рекомендуемая продолжительность курса не должна превышать 5–7 дней.',
    product_snup_formula_label: 'Формула',
    product_snup_formula_heading: 'Три элемента одной системы',
    product_snup_formula_intro: 'Ксилометазолин, морская вода и дозированный формат работают вместе: помогают облегчать дыхание, поддерживать слизистую и делать применение понятным.',
    product_snup_formula_active_text: 'Помогает сужать сосуды слизистой оболочки носа, уменьшая отек и освобождая носовое дыхание.',
    product_snup_formula_seawater_text: 'Дополняет действие формулы поддержкой физиологического состояния слизистой оболочки носа.',
    product_snup_formula_format_text: 'Дозированный спрей соединяет действие компонентов в привычном местном применении по инструкции.',
    product_snup_usage_label: 'Когда особенно актуально',
    product_snup_usage_heading: 'При насморке, аллергии и заложенности',
    product_snup_usage_cold_title: 'Ринит при ОРЗ',
    product_snup_usage_cold_text: 'Подходит для облегчения носового дыхания при рините на фоне острых респираторных заболеваний.',
    product_snup_usage_allergy_title: 'Аллергический ринит',
    product_snup_usage_allergy_text: 'Может применяться при аллергическом рините и поллинозе согласно инструкции.',
    product_snup_usage_sinus_title: 'Околоносовые пазухи',
    product_snup_usage_sinus_text: 'Используется для улучшения оттока секрета при воспалении околоносовых пазух.',
    product_snup_note_title: 'Важная информация',
    product_snup_note_text: 'Перед применением ознакомьтесь с инструкцией. Не применяйте чаще 3 раз в день и дольше 5–7 дней; для детей выбирайте концентрацию по возрасту.',
    product_snup_buy_intro: 'Ищите Снуп у аптечных партнеров STADA в Казахстане.',
    // Sinulan Duo benefits
    product_sinulan_duo_benefit1: 'Комбинация растительных экстрактов поддерживает верхние и нижние дыхательные пути',
    product_sinulan_duo_benefit2: 'Люцерна способствует иммунной защите и здоровью дыхательных путей',
    product_sinulan_duo_benefit3: 'Цветки бузины поддерживают естественную защиту и здоровье дыхательной системы',
    product_sinulan_duo_benefit4: 'Вербена укрепляет дыхательную систему и природную защиту',
    product_sinulan_duo_benefit5: 'Корень желтолистника улучшает общее состояние организма',
    product_sinulan_duo_benefit6: 'Подходит для взрослых и детей с 6 лет',
    product_sinulan_duo_kicker: 'Растительный комплекс для дыхания',
    product_sinulan_duo_badge_plant: 'Растительные экстракты',
    product_sinulan_duo_badge_breathing: 'Свободное дыхание',
    product_sinulan_duo_badge_age: 'Для детей с 6 лет',
    product_sinulan_duo_metric_complex: 'растительный комплекс',
    product_sinulan_duo_metric_tablets: 'таблеток в упаковке',
    product_sinulan_duo_metric_age: 'детям и взрослым',
    product_sinulan_duo_overview_label: 'Дыхательные пути',
    product_sinulan_duo_overview_heading: 'Поддержка свободного дыхания в растительном формате',
    product_sinulan_duo_overview_intro: 'Синулан Дуо сочетает растительные компоненты для поддержки дыхательных путей и естественной защиты организма.',
    product_sinulan_duo_card_plant_title: 'Растительный комплекс',
    product_sinulan_duo_card_plant_text: 'Комбинация экстрактов помогает поддерживать верхние и нижние дыхательные пути.',
    product_sinulan_duo_card_breathing_title: 'Свободное дыхание',
    product_sinulan_duo_card_breathing_text: 'Формула направлена на поддержку комфортного дыхания в сезон простуды.',
    product_sinulan_duo_card_format_title: '15 таблеток',
    product_sinulan_duo_card_format_text: 'Удобный таблетированный формат для приема согласно инструкции.',
    product_sinulan_duo_card_age_title: 'С 6 лет',
    product_sinulan_duo_card_age_text: 'Подходит взрослым и детям с 6 лет при соблюдении рекомендаций по применению.',
    product_sinulan_duo_formula_label: 'Формула',
    product_sinulan_duo_formula_heading: 'В центре — растительный комплекс и поддержка дыхания',
    product_sinulan_duo_formula_intro: 'Карточки показывают ключевые свойства продукта: растительную основу, дыхательный фокус и применение с 6 лет.',
    product_sinulan_duo_formula_plant_title: 'Растительные экстракты',
    product_sinulan_duo_formula_plant_text: 'Комплекс компонентов помогает поддерживать здоровье дыхательных путей.',
    product_sinulan_duo_formula_breathing_title: 'Свободное дыхание',
    product_sinulan_duo_formula_breathing_text: 'Подходит для поддержки дыхания при простуде и сезонном дискомфорте.',
    product_sinulan_duo_formula_format_title: 'С 6 лет',
    product_sinulan_duo_formula_format_text: 'Подходит детям с 6 лет и взрослым при соблюдении рекомендаций по применению.',
    product_sinulan_duo_usage_label: 'Когда актуально',
    product_sinulan_duo_usage_heading: 'Для поддержки дыхательных путей в сезон простуды',
    product_sinulan_duo_usage_cold_title: 'При простуде',
    product_sinulan_duo_usage_cold_text: 'Может использоваться для поддержки дыхания и общего самочувствия согласно инструкции.',
    product_sinulan_duo_usage_sinus_title: 'При заложенности',
    product_sinulan_duo_usage_sinus_text: 'Растительная формула помогает поддерживать комфорт дыхательных путей.',
    product_sinulan_duo_usage_family_title: 'Для семьи',
    product_sinulan_duo_usage_family_text: 'Подходит взрослым и детям с 6 лет при соблюдении рекомендаций по применению.',
    product_sinulan_duo_note_title: 'Важно помнить',
    product_sinulan_duo_note_text: 'Перед применением ознакомьтесь с инструкцией и проконсультируйтесь со специалистом при наличии хронических заболеваний.',
    product_sinulan_duo_buy_intro: 'Ищите Синулан Дуо у аптечных партнеров STADA в Казахстане.',
    // Vitrum Immunaktiv
    product_vitrum_immunaktiv_name: 'Витрум Иммунактив',
    product_vitrum_immunaktiv_page_title: 'Витрум Иммунактив',
    product_vitrum_immunaktiv_page_desc: 'Витрум Иммунактив — витаминно-минеральный комплекс из 13 витаминов, 8 минералов и β-глюкана для поддержки иммунитета.',
    product_vitrum_immunaktiv_benefit1: 'Балансированная формула из 13 витаминов, 8 минералов и β-глюкана для поддержки иммунитета',
    product_vitrum_immunaktiv_benefit2: 'Укрепляет иммунитет и обеспечивает здоровое функционирование иммунных клеток',
    product_vitrum_immunaktiv_benefit3: 'Повышает защиту организма от сезонных, вирусных и бактериальных инфекций',
    product_vitrum_immunaktiv_benefit4: 'Сокращает время выздоровления и снижает риск осложнений',
    product_vitrum_immunaktiv_benefit5: 'Ускоряет реабилитацию и уменьшает риск рецидивов после болезни',
    product_vitrum_immunaktiv_benefit6: 'Рекомендовано для взрослых с 18 лет',
    product_vitrum_immunaktiv_kicker: 'Витаминно-минеральный комплекс',
    product_vitrum_immunaktiv_badge_adults: 'Для взрослых 18+',
    product_vitrum_immunaktiv_badge_immune: 'Поддержка иммунитета',
    product_vitrum_immunaktiv_badge_course: 'Для курсового приема',
    product_vitrum_immunaktiv_metric_vitamins: 'витаминов',
    product_vitrum_immunaktiv_metric_minerals: 'минералов',
    product_vitrum_immunaktiv_metric_beta: 'β-глюкан',
    product_vitrum_immunaktiv_overview_label: 'О продукте',
    product_vitrum_immunaktiv_overview_heading: 'Комплексная формула для периода повышенной нагрузки',
    product_vitrum_immunaktiv_overview_intro: 'Витрум Иммунактив объединяет витаминно-минеральную основу и β-глюкан, чтобы поддерживать нормальную работу иммунной системы в сезон простуд, при интенсивном ритме и после болезни.',
    product_vitrum_immunaktiv_card_vitamins_title: '13 витаминов',
    product_vitrum_immunaktiv_card_vitamins_text: 'Помогают восполнять ежедневную потребность организма в важных микронутриентах.',
    product_vitrum_immunaktiv_card_minerals_title: '8 минералов',
    product_vitrum_immunaktiv_card_minerals_text: 'Поддерживают обменные процессы и нормальное функционирование организма.',
    product_vitrum_immunaktiv_card_beta_title: 'β-глюкан',
    product_vitrum_immunaktiv_card_beta_text: 'Компонент, который дополняет формулу для комплексной иммунной поддержки.',
    product_vitrum_immunaktiv_card_adults_title: 'Для взрослых',
    product_vitrum_immunaktiv_card_adults_text: 'Формула предназначена для взрослых с 18 лет.',
    product_vitrum_immunaktiv_formula_label: 'Формула',
    product_vitrum_immunaktiv_formula_heading: 'Три слоя ежедневной поддержки',
    product_vitrum_immunaktiv_formula_intro: 'Состав сфокусирован на нутриентах, которые важны для нормального иммунного ответа, обмена веществ и восстановления ресурсов организма.',
    product_vitrum_immunaktiv_formula_vitamins_title: 'Витамины',
    product_vitrum_immunaktiv_formula_vitamins_text: 'Комплекс витаминов помогает поддерживать энергетический обмен и естественные защитные функции.',
    product_vitrum_immunaktiv_formula_minerals_title: 'Минералы',
    product_vitrum_immunaktiv_formula_minerals_text: 'Минеральная часть формулы дополняет рацион и поддерживает устойчивость организма.',
    product_vitrum_immunaktiv_formula_beta_title: 'β-глюкан',
    product_vitrum_immunaktiv_formula_beta_text: 'β-глюкан усиливает акцент продукта на поддержке иммунной системы.',
    product_vitrum_immunaktiv_usage_label: 'Когда особенно актуально',
    product_vitrum_immunaktiv_usage_heading: 'Для сезона, восстановления и насыщенного ритма',
    product_vitrum_immunaktiv_usage_season_title: 'В сезон простуд',
    product_vitrum_immunaktiv_usage_season_text: 'Подходит как часть ежедневной поддержки в периоды повышенной нагрузки на иммунитет.',
    product_vitrum_immunaktiv_usage_recovery_title: 'После болезни',
    product_vitrum_immunaktiv_usage_recovery_text: 'Помогает восполнять ресурсы организма во время восстановления после перенесенного заболевания.',
    product_vitrum_immunaktiv_usage_daily_title: 'При активном графике',
    product_vitrum_immunaktiv_usage_daily_text: 'Удобный вариант для взрослых, которым важно поддерживать баланс витаминов и минералов.',
    product_vitrum_immunaktiv_note_title: 'Ответственный прием',
    product_vitrum_immunaktiv_note_text: 'Перед применением ознакомьтесь с инструкцией и проконсультируйтесь со специалистом, особенно при хронических заболеваниях или одновременном приеме других средств.',
    product_vitrum_immunaktiv_buy_intro: 'Ищите Витрум Иммунактив у аптечных партнеров STADA в Казахстане.',
    // Edarbi Klo benefits
    product_edarbi_klo_benefit1: 'Комбинация азилсартана и хлорталидона для эффективного контроля гипертонии',
    product_edarbi_klo_benefit2: 'Азилсартан блокирует сосудосуживающее действие ангиотензина II и снижает задержку натрия',
    product_edarbi_klo_benefit3: 'Хлорталидон вызывает диурез, увеличивая выведение натрия и хлорида',
    product_edarbi_klo_benefit4: 'Снижают кровяное давление за счет снижения периферического сопротивления по взаимодополняющим механизмам',
    product_edarbi_klo_benefit5: 'Рекомендуется пациентам, которым недостаточно одного препарата для контроля давления',
    product_edarbi_klo_kicker: 'Комбинированный контроль давления',
    product_edarbi_klo_badge_combo: 'Азилсартан + хлорталидон',
    product_edarbi_klo_badge_pressure: 'Контроль АД',
    product_edarbi_klo_badge_pack: '28 таблеток',
    product_edarbi_klo_metric_dose: 'мг активных компонентов',
    product_edarbi_klo_metric_pack: 'таблеток в упаковке',
    product_edarbi_klo_metric_mechanism: 'механизма действия',
    product_edarbi_klo_overview_label: 'Артериальное давление',
    product_edarbi_klo_overview_heading: 'Комбинация для контроля гипертонии',
    product_edarbi_klo_overview_intro: 'Эдарби Кло объединяет азилсартан и хлорталидон для контроля артериального давления по назначению врача.',
    product_edarbi_klo_card_azilsartan_title: 'Азилсартан',
    product_edarbi_klo_card_azilsartan_text: 'Помогает блокировать действие ангиотензина II, связанного с сосудистым тонусом.',
    product_edarbi_klo_card_chlorthalidone_title: 'Хлорталидон',
    product_edarbi_klo_card_chlorthalidone_text: 'Диуретический компонент способствует выведению натрия и жидкости согласно механизму действия.',
    product_edarbi_klo_card_pack_title: '28 таблеток',
    product_edarbi_klo_card_pack_text: 'Формат упаковки для регулярного приема по назначенной врачом схеме.',
    product_edarbi_klo_card_control_title: 'Контроль давления',
    product_edarbi_klo_card_control_text: 'Компоненты дополняют друг друга в терапии артериальной гипертензии.',
    product_edarbi_klo_formula_label: 'Формула',
    product_edarbi_klo_formula_heading: 'В центре — два активных компонента',
    product_edarbi_klo_formula_intro: 'Линии показывают, как азилсартан, хлорталидон и общий контроль давления собираются вокруг упаковки.',
    product_edarbi_klo_formula_azilsartan_title: 'Азилсартан',
    product_edarbi_klo_formula_azilsartan_text: 'Компонент направлен на блокирование рецепторов ангиотензина II.',
    product_edarbi_klo_formula_chlorthalidone_title: 'Хлорталидон',
    product_edarbi_klo_formula_chlorthalidone_text: 'Диуретический компонент помогает уменьшать объем жидкости и нагрузку на сосуды.',
    product_edarbi_klo_formula_control_title: 'Контроль АД',
    product_edarbi_klo_formula_control_text: 'Два механизма действия дополняют друг друга в контроле повышенного давления.',
    product_edarbi_klo_usage_label: 'Когда назначают',
    product_edarbi_klo_usage_heading: 'Для пациентов, которым нужен комбинированный контроль давления',
    product_edarbi_klo_usage_pressure_title: 'Артериальная гипертензия',
    product_edarbi_klo_usage_pressure_text: 'Используется для снижения повышенного артериального давления по назначению врача.',
    product_edarbi_klo_usage_combo_title: 'Когда одного средства недостаточно',
    product_edarbi_klo_usage_combo_text: 'Комбинация компонентов может быть назначена, если монотерапия не обеспечивает нужный контроль.',
    product_edarbi_klo_usage_routine_title: 'Ежедневная схема',
    product_edarbi_klo_usage_routine_text: 'Принимается в режиме, который определяет врач; важно соблюдать рекомендации и контроль давления.',
    product_edarbi_klo_note_title: 'Важно',
    product_edarbi_klo_note_text: 'Эдарби Кло применяют по назначению врача. Перед применением ознакомьтесь с инструкцией и не изменяйте схему терапии самостоятельно.',
    product_edarbi_klo_buy_intro: 'Ищите Эдарби Кло у аптечных партнеров STADA в Казахстане.'
  },
  kz: {
    nav_about: 'Компания туралы',
    nav_news: 'Жаңалықтар мен медиа',
    nav_products: 'Өнімдер',
    nav_career: 'Мансап',
    hero_title1: 'Біздің миссиямыз – сіздің денсаулығыңыз',
    hero_sub1: 'STADA инновациялар мен сенімді дәрі-дәрмектер арқылы өмір сапасын жақсартады.',
    hero_title2: 'Фармацевтикалық өнімдердің жетекші өндірушісі',
    hero_sub2: '130 жылдық тәжірибе және 100-ден астам елдегі халықаралық қатысу.',
    hero_title3: 'Сенімді серіктес',
    hero_sub3: 'Біз қолжетімді дженериктерді, тұтынушылық брендтерді және арнайы препараттарды ұсынамыз.',
    hero_metric_years: 'жылдық тәжірибе',
    hero_metric_countries: 'елдегі қатысу',
    hero_metric_employees: 'қызметкер әлем бойынша',
    hero_media_caption: 'Күн сайын сенім артатын фармацевтикалық сапа',
    hero_caption_office: 'STADA Қазақстанда: пациенттер мен серіктестерге жақын',
    hero_caption_scientists: 'Өндірістің әр кезеңіндегі сапа мен қауіпсіздік',
    hero_caption_logo: 'STADA-ның адамдар денсаулығына қамқорлық жасаудағы 130 жылдық тәжірибесі',
    about_heading: 'STADA компаниясы туралы',
    about_par1: 'STADA – жоғары сапалы фармацевтикалық өнімдердің жетекші өндірушісі. 130 жылдық тарихы бар біздің компания дәріхана тәжірибесінен бастау алып, сенімді серіктес ретінде танылған.',
    about_par2: 'Компанияның қызметі үш бағытқа шоғырланған: тұтынушылық денсаулық өнімдері, дженериктер және арнайы препараттар. Бүгінде STADA 100-ден астам елде қызмет етіп, 11 600-ден астам жұмыс орнын қамтамасыз етеді.',
    about_list1: 'Қолжетімділік: біздің дженериктер денсаулық сақтауды баршаға қолжетімді етеді.',
    about_list2: 'Инновациялар: біз өмір сапасын жақсарту үшін ғылыми зерттеулер мен әзірлемелерге инвестиция саламыз.',
    about_list3: 'Сенімділік: біз сіз сенетін серіктес болуға тырысамыз.',
    stats_sales: '4 059 млн € — 2024 жылғы топтың сатылым көлемі',
    stats_employees: '> 11 600 қызметкер',
    stats_countries: '> 100 елдегі қатысу',
        hero_text1: 'CapVest Brain Capital және Cinven компанияларынан STADA-ның бақылау пакетін сатып алуда',
        hero_text2: 'STADA-ның өсу жолы 2024 жылы жалғасады — сатылым мен пайда айтарлықтай өсуде — өсу нарықтан алда.',
        hero_text3: 'Қазақстанда дәрігерлерге сенім зор, бірақ алдын алу әлсіз тұс болып қалуда',
        news_section_lead: 'STADA жаңалықтары, медиа материалдары және өнім жаңартулары бір заманауи блокта.',
        news_1_text: 'Мәміле топтың дамуына жаңа серпін беріп, STADA-ның халықаралық нарықтардағы ұзақ мерзімді стратегиясын күшейтеді.',
        news_2_text: 'Компания фармацевтикалық нарық қарқынынан озып, сатылым мен пайданың тұрақты өсуін көрсетуді жалғастыруда.',
        news_3_text: 'Зерттеулер алдын алудың, қолжетімді ақпараттың және медицина мамандарымен сенімді диалогтың маңызын көрсетеді.',
        news_4_title: 'STADA Top Employer Europe 2025 ретінде танылды',
        news_4_text: 'Бұл мойындау STADA командалары үшін өсу мәдениетін, қызметкерлерге қамқорлықты және даму мүмкіндіктерін көрсетеді.',
        news_5_title: 'STADA портфелі күшті тұтынушылық брендтер мен дженериктерді біріктіреді',
        news_5_text: 'Өнім желісі әртүрлі терапевтикалық бағыттарда пациенттердің денсаулығын қолдауға көмектеседі.',
        news_6_title: 'Enterogermina микрофлора денсаулығын қолдайды',
        news_6_text: 'Пробиотиктер бағыты STADA-ның күнделікті денсаулыққа арналған шешімдерінің маңызды бөлігі болып қала береді.',
        news_7_title: 'Coldrex суық тию маусымындағы танымал бренд болып қала береді',
        news_7_text: 'Суық тию белгілерін жеңілдетуге арналған өнімдер пациенттерге әдеттегі өмір ырғағын сақтауға көмектеседі.',
        news_8_title: 'Vitrum Immunaktiv күнделікті қолдауға арналған',
        news_8_text: 'Витаминді-минералды кешендер өзін жақсы сезінуге бағытталған өнімдер портфелін толықтырады.',
        cta_more: 'Толығырақ',
    // Gallery
    gallery_heading: 'Галерея',
    // Products section
    products_heading: 'Өнімдеріміз',
    product_enterogermina_name: 'Энтерожермина',
    product_magneb6kids_name: 'Магне B6 Кидс',
    product_sinulan_duo_name: 'Синулан Дуо',
    product_snup_name: 'Снуп',
    product_edarbi_klo_name: 'Эдарби Кло',
    product_coldrex_name: 'Колдрекс',
    product_vitrum_immunaktiv_name: 'Витрум Иммунактив',
    // Product page titles and descriptions
    product_enterogermina_page_title: 'Энтерожермина',
    product_enterogermina_page_desc: 'Энтерожермина — пробиотик, дисбактериозды емдеу және алдын алу үшін қолданылады. Bacillus clausii спораларын қамтиды, ішек микрофлорасын қалпына келтіруге көмектеседі.',
    product_magneb6kids_page_title: 'Магне B6 Кидс',
    product_magneb6kids_page_desc: 'Магне B6 Кидс — 4 жастан бастап балаларға арналған магний мен B6 дәрумені бар шайнайтын таблеткалар. Компоненттер жүйке жүйесінің қалыпты жұмысын және энергия алмасуын қолдауға көмектеседі.',
    product_sinulan_duo_page_title: 'Синулан Дуо',
    product_sinulan_duo_page_desc: 'Синулан Дуо — суық тию кезінде тыныс алуды жеңілдетуге және тыныс алу жолдарының денсаулығын қолдауға арналған өсімдік сығындыларының кешені.',
    product_snup_page_title: 'Снуп',
    product_snup_page_desc: 'Снуп — мұрын бітелгенде тыныс алуды жеңілдетуге арналған ксилометазолин мен теңіз суы бар дозаланған мұрын спрейі.',
    product_edarbi_klo_page_title: 'Эдарби Кло',
    product_edarbi_klo_page_desc: 'Эдарби Кло — азилсартан медоксомил калийі мен хлорталидон негізіндегі артериялық қысымды төмендететін біріктірілген препарат.',
        product_back: 'Өнімдерге оралу',
    // Enterogermina benefits
    product_enterogermina_benefit1: 'Ішектің сау микрофлорасын қалпына келтіреді',
    product_enterogermina_benefit2: 'Антибиотиктерге төзімді Bacillus clausii спораларын қамтиды',
    product_enterogermina_benefit3: 'Ыңғайлы сұйық түрі – балалар мен ересектерге арналған',
    product_enterogermina_benefit4: 'Дисбактериозды емдеу және алдын алу үшін қолайлы',
    product_enterogermina_kicker: 'Микрофлораға арналған пробиотик',
    product_enterogermina_badge_spores: 'Bacillus clausii споралары',
    product_enterogermina_badge_pack: '10 флакон',
    product_enterogermina_badge_liquid: 'Сұйық түрі',
    product_enterogermina_metric_spores: 'Bacillus clausii споралары',
    product_enterogermina_metric_pack: 'қаптамадағы флакон',
    product_enterogermina_metric_format: 'дайын сұйық түрі',
    product_enterogermina_overview_label: 'Микрофлораны қолдау',
    product_enterogermina_overview_heading: 'Ішек микрофлорасының тепе-теңдігін қалпына келтіруге арналған формат',
    product_enterogermina_overview_intro: 'Энтерожермина ішек микрофлорасының тепе-теңдігі бұзылғанда және қолайсыз факторлардан кейін пайдалы бактерияларды толықтыруға көмектеседі.',
    product_enterogermina_card_bacillus_title: 'Bacillus clausii',
    product_enterogermina_card_bacillus_text: 'Пробиотикалық споралар ішек микрофлорасының қалыпты құрамын қолдауға көмектеседі.',
    product_enterogermina_card_spores_title: 'Споралы түрі',
    product_enterogermina_card_spores_text: 'Споралар қышқыл ортаға төзімді және Bacillus clausii-ді ішекке жеткізуге көмектеседі.',
    product_enterogermina_card_pack_title: '10 флакон',
    product_enterogermina_card_pack_text: 'Қаптама нұсқаулыққа сай ыңғайлы курстық қабылдауға арналған.',
    product_enterogermina_card_format_title: '5 мл',
    product_enterogermina_card_format_text: 'Флаконды ашып, қосымша дайындаусыз қабылдау оңай.',
    product_enterogermina_formula_label: 'Формула',
    product_enterogermina_formula_heading: 'Ортасында — Bacillus clausii және ыңғайлы сұйық түрі',
    product_enterogermina_formula_intro: 'Негізгі акцент қаптамаға қойылған: құрамы, споралардың тұрақтылығы және қабылдау ыңғайлылығы бірден көрінеді.',
    product_enterogermina_formula_bacillus_title: 'Bacillus clausii',
    product_enterogermina_formula_bacillus_text: 'Пробиотикалық споралар қалыпты ішек микрофлорасын қолдауға көмектеседі.',
    product_enterogermina_formula_spores_title: 'Споралы түрі',
    product_enterogermina_formula_spores_text: 'Споралы түрі бактериялардың ішекке жеткенге дейін тұрақтылығын сақтауға көмектеседі.',
    product_enterogermina_formula_pack_title: 'Дайын суспензия',
    product_enterogermina_formula_pack_text: 'Флакондағы сұйық түрі: алдын ала дайындаусыз қабылдауға ыңғайлы.',
    product_enterogermina_usage_label: 'Қашан өзекті',
    product_enterogermina_usage_heading: 'Күнделікті күтімде ішек микрофлорасын қолдау үшін',
    product_enterogermina_usage_microflora_title: 'Тепе-теңдік бұзылғанда',
    product_enterogermina_usage_microflora_text: 'Нұсқаулыққа сай дисбактериоз кезінде микрофлораны қалпына келтіруге қолайлы.',
    product_enterogermina_usage_antibiotic_title: 'Антибиотиктерден кейін',
    product_enterogermina_usage_antibiotic_text: 'Нұсқаулыққа сай антибактериалды терапия кезінде немесе одан кейін микрофлораны қолдау үшін қолданылуы мүмкін.',
    product_enterogermina_usage_family_title: 'Отбасы үшін',
    product_enterogermina_usage_family_text: 'Сұйық формат қолдану бойынша ұсынымдарды сақтағанда балалар мен ересектерге қолайлы.',
    product_enterogermina_note_title: 'Есте сақтау маңызды',
    product_enterogermina_note_text: 'Қолданар алдында нұсқаулықты оқып, әсіресе балаларға қолданғанда маманмен кеңесіңіз.',
    product_enterogermina_buy_intro: 'Энтерожерминаны Қазақстандағы STADA дәріхана серіктестерінен іздеңіз.',
    // Career page translations (added)
    career_heading: 'STADA компаниясындағы мансап',
    career_par1: 'STADA-да жұмыс істеу – бұл бірегей саяхат. Біз түлектерге арналған бастапқы лауазымдардан бастап сарапшылық позицияларға дейін әртүрлі және қызықты рөлдерді ұсынамыз. Біздің бос орындар дағдылардың кең ауқымын қамтиды және тек фармацевтика саласымен шектелмейді – сіз жеткізілім тізбегі, маркетинг, қаржы, жобаларды басқару және тағы басқа салаларда мүмкіндіктер таба аласыз.',
    career_par2: 'Біз бес негізгі функционалдық салада жұмыс істейміз, сондықтан сіз өз мансап жолыңызға ең жақсы сәйкес келетін бағытты таңдай аласыз:',
    career_list1: 'Техникалық операциялар',
    career_list2: 'Сату және маркетинг',
    career_list3: 'Өнімдер мен портфельді әзірлеу',
    career_list4: 'Стратегия және бизнесті дамыту',
    career_list5: 'Бизнес функциялары',
    career_fact1: 'басшылар – әйелдер',
    career_fact2: 'қызметкерлер біздің «Адамдардың денсаулығына сенімді серіктес ретінде қамқорлық жасау» мақсатымызды мақтан тұтады',
    career_fact3: 'қызметкер әлем бойынша',
    career_fact4: 'командамызда 93 ұлт өкілі',
    career_fact5: 'Sustainalytics ESG 2023 рейтингі бойынша фармацевтикалық компаниялардың жоғарғы 6%-ы',
    career_par3: 'Біз «Top Employer Europe 2025» ретінде танылдық, бұл біздің өсу мен қызметкерлерге қамқорлық жасау мәдениетіміздің бірегейлігін растайды. Сіз нақты бос орынға өтініш бере аласыз немесе таланттар қауымдастығымыздың бір бөлігі болу үшін түйіндемеңізді жібере аласыз. Өтініш бергеннен кейін сізге электрондық пошта арқылы растау келеді.',
    career_button: 'Вакансияларды көру',
    hero_products_label: 'БІЗДІҢ ӨНІМДЕР',
    hero_products_heading: 'Үздік өмір үшін сапалы дәрілер',
    hero_products_description: 'Біз әртүрлі терапевтік салаларда жоғары сапалы дженериктер мен тұтынушылар денсаулығы өнімдерінің кең ассортиментін ұсынамыз.',
    products_browse_catalog: 'Каталогты көру',
    products_metric_portfolio: 'каталогтағы өнім',
    products_metric_areas: 'терапевтік бағыт',
    products_catalog_label: 'STADA каталогы',
    products_catalog_intro: 'Бағытты таңдаңыз немесе өнім карточкасын ашып, құрамы, артықшылықтары және сатып алу орындары туралы көбірек біліңіз.',
    products_filter_all: 'Барлық өнімдер',
    products_category_cold: 'Суық тию және тыныс алу',
    products_category_immunity: 'Иммунитет',
    products_category_digestive: 'Ас қорыту',
    products_category_kids: 'Балаларға арналған',
    products_category_cardio: 'Кардио',
    products_category_respiratory: 'Тыныс алу жолдары',
    products_partners_heading: 'Дәріханалар мен онлайн-сервистерде қолжетімді',
    products_partners_intro: 'STADA өнімдерін Қазақстандағы серіктестерден табуға болады: ірі дәріхана желілерінен бастап ыңғайлы цифрлық сервистерге дейін.',
    footer_pill: 'STADA Қазақстан',
    footer_heading: 'Денсаулыққа қамқорлық сенімді ақпараттан басталады',
    footer_lead: 'Өнімдер каталогын ашыңыз, компания туралы көбірек біліңіз немесе STADA-дағы мансап мүмкіндіктерін қараңыз.',
    footer_catalog_cta: 'Каталогты ашу',
    footer_career_cta: 'STADA мансабы',
    footer_brand_text: 'Біз STADA-ның халықаралық тәжірибесін Қазақстандағы пациенттерге, мамандарға және серіктестерге жақындықпен біріктіреміз.',
    footer_trust_years: '130+ жыл тәжірибе',
    footer_trust_countries: '100+ ел',
    footer_company_title: 'Компания',
    footer_products_title: 'Өнімдер',
    footer_access_title: 'Қолжетімділік',
    footer_global_link: 'STADA Global',
    footer_warning_title: 'Маңызды',
    footer_warning_text: 'Сайттағы ақпарат маман кеңесін алмастырмайды. Дәрілік заттарды қолданар алдында нұсқаулықпен танысыңыз.',
    footer_rights: 'Барлық құқықтар қорғалған.',
    footer_back_top: 'Жоғары',
    where_to_buy_heading: 'Қайдан сатып алуға болады',
    benefits_heading: 'Артықшылықтар',
    
    // Coldrex page title and description
    product_coldrex_page_title: 'Колдрекс',
    product_coldrex_page_desc: 'Колдрекс — суық тию мен тұмаудың белгілерін жеңілдететін кешенді препарат.',
    // Coldrex benefits
    product_coldrex_benefit1: 'Парацетамол жоғары температураны төмендетуге және ауырсынуды жеңілдетуге көмектеседі',
    product_coldrex_benefit2: 'Фенилэфрин мұрын мен қойнаулардың бітелуін азайтуға көмектеседі',
    product_coldrex_benefit3: 'C дәрумені формуланы толықтырып, суық тию маусымында ағзаны қолдайды',
    product_coldrex_benefit4: 'Ыстық сусын форматы қабылдауды үйреншікті әрі жайлы етеді',
    product_coldrex_benefit5: 'Кешенді әсер суық тию мен тұмаудың негізгі симптомдарына бағытталған',
    product_coldrex_benefit6: 'Нұсқаулыққа сай, жас пен қарсы көрсетілімдерді ескере отырып қолданылады',
    product_coldrex_overview_label: 'Өнім туралы',
    product_coldrex_overview_heading: 'Суық тию симптомдары кезіндегі кешенді көмек',
    product_coldrex_overview_intro: 'Колдрекс ХотРем қызуды түсіретін, мұрын бітелуін азайтатын және ағзаны қолдайтын компоненттерді ыстық сусын форматында біріктіріп, суық тию мен тұмаудың типтік симптомдарын жеңілдетуге көмектеседі.',
    product_coldrex_card_format_title: '10 пакетик',
    product_coldrex_card_format_text: 'Қаптама нұсқаулықта көрсетілген схема бойынша бірнеше қабылдауға арналған.',
    product_coldrex_card_action_title: 'Үш бағыт',
    product_coldrex_card_action_text: 'Формула температура, ауырсыну, мұрын бітелуі және жалпы хал-жағдайға бағытталған.',
    product_coldrex_card_vitamin_title: 'C дәрумені',
    product_coldrex_card_vitamin_text: 'Аскорбин қышқылы ағзаға жүктеме артатын маусымда формуланы толықтырады.',
    product_coldrex_card_pack_title: 'Порциялық формат',
    product_coldrex_card_pack_text: 'Әр пакетик ыстық сусынның бір порциясын дайындауға ыңғайлы.',
    product_coldrex_formula_label: 'Формула',
    product_coldrex_formula_heading: 'Кешенді әсердің үш компоненті',
    product_coldrex_formula_intro: 'Колдрекс ХотРем формуласы суық тиюдің негізгі симптомдарын жеңілдетуге және ағзаны қолдауға арналған компоненттерді біріктіреді.',
    product_coldrex_formula_paracetamol_title: 'Парацетамол',
    product_coldrex_formula_paracetamol_text: 'Жоғары температураны төмендетуге, бас ауыруы, тамақ ауыруы және дене сырқырауын жеңілдетуге көмектеседі.',
    product_coldrex_formula_phenylephrine_title: 'Фенилэфрин',
    product_coldrex_formula_phenylephrine_text: 'Мұрын мен қойнаулардың бітелуін азайтып, тыныс алуды жеңілдетуге көмектеседі.',
    product_coldrex_formula_vitamin_c_title: 'C дәрумені',
    product_coldrex_formula_vitamin_c_text: 'Формуланы толықтырып, суық тию маусымында ағзаны қолдауға көмектеседі.',
    product_coldrex_usage_label: 'Қашан әсіресе өзекті',
    product_coldrex_usage_heading: 'Температура, ауырсыну және мұрын бітелуі кезінде',
    product_coldrex_usage_fever_title: 'Температура және сырқырау',
    product_coldrex_usage_fever_text: 'Суық тию жоғары температурамен, бас ауыруымен және дене сырқырауымен қатар жүргенде өзекті.',
    product_coldrex_usage_congestion_title: 'Мұрын бітелуі',
    product_coldrex_usage_congestion_text: 'Мұрын мен қойнаулар бітеліп, тыныс алу қиындаған симптомдарда қолайлы.',
    product_coldrex_usage_season_title: 'Суық тию маусымы',
    product_coldrex_usage_season_text: 'Нұсқаулыққа сәйкес суық тию және тұмау кезеңінде симптоматикалық қолдау ретінде қолданылады.',
    product_coldrex_note_title: 'Жауапты қолдану',
    product_coldrex_note_text: 'Қолданар алдында нұсқаулықпен танысып, маманмен кеңесіңіз, әсіресе созылмалы аурулар немесе басқа дәрілерді бірге қабылдау жағдайында.',
    // Magne B6 Kids
    product_magneb6kids_benefit1: 'Магний мен B6 дәрумені жүйке жүйесінің қалыпты жұмысын қолдауға көмектеседі',
    product_magneb6kids_benefit2: 'Компоненттер энергия алмасуына қатысып, шаршауды азайтуға көмектеседі',
    product_magneb6kids_benefit3: 'B6 дәрумені магнийдің әсерін толықтырып, оның сіңірілуін қолдайды',
    product_magneb6kids_benefit4: 'Формула қалыпты психологиялық функцияны қолдауға көмектеседі',
    product_magneb6kids_benefit5: 'Шайнайтын формат балалардың күнделікті қабылдауына ыңғайлы',
    product_magneb6kids_benefit6: '4 жастан бастап балаларға арналған; дозасы жасына қарай таңдалады',
    product_magneb6kids_kicker: 'Магний + B6 дәрумені',
    product_magneb6kids_badge_age: 'Балаларға 4+',
    product_magneb6kids_badge_chewable: 'Шайнайтын таблеткалар',
    product_magneb6kids_badge_formula: 'Mg + B6',
    product_magneb6kids_metric_magnesium: 'мг магний',
    product_magneb6kids_metric_vitamin: 'B6 дәрумені',
    product_magneb6kids_metric_age: 'балаларға',
    product_magneb6kids_overview_label: 'Өнім туралы',
    product_magneb6kids_overview_heading: 'Баланың күнделікті ырғағына жүйке жүйесін қолдау',
    product_magneb6kids_overview_intro: 'Магне B6 Кидс магний мен B6 дәруменін шайнайтын форматта біріктіріп, нутриенттік қолдауды баланың күнделікті режиміне ыңғайлы енгізуге көмектеседі.',
    product_magneb6kids_card_magnesium_title: '70 мг магний',
    product_magneb6kids_card_magnesium_text: 'Магний жүйке жүйесі мен бұлшықеттердің қалыпты жұмысына және күнделікті зат алмасуға маңызды.',
    product_magneb6kids_card_b6_title: 'B6 дәрумені',
    product_magneb6kids_card_b6_text: 'B6 дәрумені энергия алмасуына қатысып, шаршауды азайтуға көмектеседі.',
    product_magneb6kids_card_format_title: '30 таблетка',
    product_magneb6kids_card_format_text: 'Шайнайтын форма қабылдауды балаға түсінікті әрі үйреншікті етуге көмектеседі.',
    product_magneb6kids_card_age_title: '4 жастан бастап',
    product_magneb6kids_card_age_text: 'Формат 4 жастан асқан балаларға арналған; қабылдау режимі нұсқаулық бойынша таңдалады.',
    product_magneb6kids_formula_label: 'Формула',
    product_magneb6kids_formula_heading: 'Сабырлы қолдаудың үш элементі',
    product_magneb6kids_formula_intro: 'Формула магний, B6 дәрумені және балаларға арналған шайнайтын форматқа негізделген.',
    product_magneb6kids_formula_magnesium_title: 'Магний',
    product_magneb6kids_formula_magnesium_text: 'Жүйке жүйесі мен бұлшықеттердің қалыпты жұмысын қолдауға көмектеседі.',
    product_magneb6kids_formula_b6_title: 'B6 дәрумені',
    product_magneb6kids_formula_b6_text: 'Магнийді толықтырып, энергия алмасу процестеріне қатысады.',
    product_magneb6kids_formula_format_title: 'Балалар форматы',
    product_magneb6kids_formula_format_text: 'Шайнайтын таблеткалар нұсқаулыққа сай күнделікті режимге ыңғайлы қосылады.',
    product_magneb6kids_usage_label: 'Қашан әсіресе өзекті',
    product_magneb6kids_usage_heading: 'Оқу, өсу және белсенді ырғақ кезеңінде',
    product_magneb6kids_usage_school_title: 'Оқу жүктемесі',
    product_magneb6kids_usage_school_text: 'Балаға тұрақты күнделікті ырғақты сақтау маңызды болған кезеңдерде нутриенттік қолдау ретінде жарайды.',
    product_magneb6kids_usage_activity_title: 'Белсенді күндер',
    product_magneb6kids_usage_activity_text: 'Магний мен B6 дәрумені қарқынды кесте кезінде энергия алмасуын қолдауға көмектеседі.',
    product_magneb6kids_usage_diet_title: 'Рацион ерекшеліктері',
    product_magneb6kids_usage_diet_text: 'Рационға магний мен B6 дәрумені бойынша қосымша қолдау қажет болғанда орынды болуы мүмкін.',
    product_magneb6kids_note_title: 'Жауапты қабылдау',
    product_magneb6kids_note_text: 'Қолданар алдында нұсқаулықпен танысып, маманмен кеңесіңіз, әсіресе балада созылмалы аурулар болса немесе басқа құралдарды қабылдаса.',
    product_magneb6kids_buy_intro: 'Магне B6 Кидсті Қазақстандағы STADA дәріхана серіктестерінен іздеңіз.',
    // Snup benefits
    product_snup_benefit1: 'Ксилометазолин мұрын шырышты қабығының ісінуін азайтып, тыныс алуды жеңілдетуге көмектеседі',
    product_snup_benefit2: 'Әсері қолданғаннан кейін әдетте 5–10 минут ішінде басталады',
    product_snup_benefit3: 'Деконгестанттық әсер бір қолданудан кейін орта есеппен 6–8 сағат сақталады',
    product_snup_benefit4: 'Теңіз суы мұрын шырышты қабығының қалыпты физиологиялық жағдайын қолдайды',
    product_snup_benefit5: '0,1% форматы ересектерге және 6 жастан асқан балаларға арналған',
    product_snup_benefit6: 'Нұсқаулық бойынша қолдану курсы 5–7 күннен аспауы керек',
    product_snup_kicker: 'Мұрын спрейі',
    product_snup_badge_spray: 'Дозаланған спрей',
    product_snup_badge_seawater: 'Теңіз суы',
    product_snup_badge_age: '0,1% үшін 6+',
    product_snup_metric_minutes: 'әсер басталуына минут',
    product_snup_metric_hours: 'орташа әсер сағаты',
    product_snup_metric_doses: 'құтыдағы доза',
    product_snup_overview_label: 'Өнім туралы',
    product_snup_overview_heading: 'Мұрын бітелгенде тыныс алу жеңілдейді',
    product_snup_overview_intro: 'Снуп ксилометазолиннің жергілікті тамыр тарылтатын әсерін және теңіз суын біріктіріп, ринит кезінде шырышты қабықтың ісінуін азайтуға және мұрынмен тыныс алуды жеңілдетуге көмектеседі.',
    product_snup_card_strength_title: '0,1% / 90 мкг',
    product_snup_card_strength_text: 'Қаптамадағы формат нұсқаулыққа сәйкес ересектерге және 6 жастан асқан балаларға арналған.',
    product_snup_card_action_title: 'Ксилометазолин',
    product_snup_card_action_text: 'Деконгестант мұрын шырышты қабығының ісінуі мен гиперемиясын азайтуға көмектеседі.',
    product_snup_card_seawater_title: 'Теңіз суы',
    product_snup_card_seawater_text: 'Компонент шырышты қабықтың физиологиялық жағдайын және кірпікшелі эпителий жұмысын қолдайды.',
    product_snup_card_course_title: '5–7 күн',
    product_snup_card_course_text: 'Ұсынылатын қолдану курсының ұзақтығы 5–7 күннен аспауы керек.',
    product_snup_formula_label: 'Формула',
    product_snup_formula_heading: 'Бір жүйенің үш элементі',
    product_snup_formula_intro: 'Ксилометазолин, теңіз суы және дозаланған формат бірге жұмыс істейді: тыныс алуды жеңілдетуге, шырышты қабықты қолдауға және қолдануды түсінікті етуге көмектеседі.',
    product_snup_formula_active_text: 'Мұрын шырышты қабығының тамырларын тарылтып, ісінуді азайтуға және тыныс алуды жеңілдетуге көмектеседі.',
    product_snup_formula_seawater_text: 'Формуланың әсерін мұрын шырышты қабығының физиологиялық жағдайын қолдаумен толықтырады.',
    product_snup_formula_format_text: 'Дозаланған спрей компоненттердің әсерін нұсқаулық бойынша жергілікті қолданудың үйреншікті форматына біріктіреді.',
    product_snup_usage_label: 'Қашан әсіресе өзекті',
    product_snup_usage_heading: 'Тұмауратқанда, аллергияда және мұрын бітелгенде',
    product_snup_usage_cold_title: 'ЖРВИ кезіндегі ринит',
    product_snup_usage_cold_text: 'Жедел респираторлық аурулар аясындағы ринит кезінде мұрынмен тыныс алуды жеңілдетуге жарамды.',
    product_snup_usage_allergy_title: 'Аллергиялық ринит',
    product_snup_usage_allergy_text: 'Нұсқаулыққа сәйкес аллергиялық ринит және поллиноз кезінде қолданылуы мүмкін.',
    product_snup_usage_sinus_title: 'Мұрын маңы қойнаулары',
    product_snup_usage_sinus_text: 'Мұрын маңы қойнаулары қабынғанда секреттің ағуын жақсарту үшін қолданылады.',
    product_snup_note_title: 'Маңызды ақпарат',
    product_snup_note_text: 'Қолданар алдында нұсқаулықпен танысыңыз. Күніне 3 реттен жиі және 5–7 күннен ұзақ қолданбаңыз; балаларға концентрацияны жасына қарай таңдаңыз.',
    product_snup_buy_intro: 'Снупты Қазақстандағы STADA дәріхана серіктестерінен іздеңіз.',
    // Sinulan Duo benefits
    product_sinulan_duo_benefit1: 'Өсімдік сығындыларының комбинациясы жоғарғы және төменгі тыныс жолдарын қолдайды',
    product_sinulan_duo_benefit2: 'Жоңышқа иммундық қорғауды және тыныс жолдарының саулығын қолдайды',
    product_sinulan_duo_benefit3: 'Бузина гүлдері табиғи қорғанысты және тыныс жолдарының саулығын қолдайды',
    product_sinulan_duo_benefit4: 'Вербена тыныс алу жүйесін және табиғи қорғанысты нығайтады',
    product_sinulan_duo_benefit5: 'Сары теңгежапырақ тамыры дененің жалпы жағдайын жақсартады',
    product_sinulan_duo_benefit6: '6 жастан бастап ересектер мен балаларға жарамды',
    product_sinulan_duo_kicker: 'Тыныс алуға арналған өсімдік кешені',
    product_sinulan_duo_badge_plant: 'Өсімдік сығындылары',
    product_sinulan_duo_badge_breathing: 'Еркін тыныс алу',
    product_sinulan_duo_badge_age: '6 жастан бастап',
    product_sinulan_duo_metric_complex: 'өсімдік кешені',
    product_sinulan_duo_metric_tablets: 'қаптамадағы таблетка',
    product_sinulan_duo_metric_age: 'балалар мен ересектерге',
    product_sinulan_duo_overview_label: 'Тыныс алу жолдары',
    product_sinulan_duo_overview_heading: 'Өсімдік форматында еркін тыныс алуды қолдау',
    product_sinulan_duo_overview_intro: 'Синулан Дуо тыныс алу жолдарын және ағзаның табиғи қорғанысын қолдау үшін өсімдік компоненттерін біріктіреді.',
    product_sinulan_duo_card_plant_title: 'Өсімдік кешені',
    product_sinulan_duo_card_plant_text: 'Сығындылар комбинациясы жоғарғы және төменгі тыныс алу жолдарын қолдауға көмектеседі.',
    product_sinulan_duo_card_breathing_title: 'Еркін тыныс алу',
    product_sinulan_duo_card_breathing_text: 'Формула суық тию маусымында жайлы тыныс алуды қолдауға бағытталған.',
    product_sinulan_duo_card_format_title: '15 таблетка',
    product_sinulan_duo_card_format_text: 'Нұсқаулыққа сай қабылдауға арналған ыңғайлы таблетка форматы.',
    product_sinulan_duo_card_age_title: '6 жастан бастап',
    product_sinulan_duo_card_age_text: 'Қолдану бойынша ұсынымдарды сақтағанда ересектер мен 6 жастан асқан балаларға жарамды.',
    product_sinulan_duo_formula_label: 'Формула',
    product_sinulan_duo_formula_heading: 'Ортасында — өсімдік кешені және тыныс алуды қолдау',
    product_sinulan_duo_formula_intro: 'Карточкалар өнімнің негізгі қасиеттерін көрсетеді: өсімдік негізі, тыныс алу фокусы және 6 жастан бастап қолдану.',
    product_sinulan_duo_formula_plant_title: 'Өсімдік сығындылары',
    product_sinulan_duo_formula_plant_text: 'Компоненттер кешені тыныс алу жолдарының саулығын қолдауға көмектеседі.',
    product_sinulan_duo_formula_breathing_title: 'Еркін тыныс алу',
    product_sinulan_duo_formula_breathing_text: 'Суық тию және маусымдық жайсыздық кезінде тыныс алуды қолдауға жарамды.',
    product_sinulan_duo_formula_format_title: '6 жастан бастап',
    product_sinulan_duo_formula_format_text: 'Қолдану бойынша ұсынымдарды сақтағанда 6 жастан асқан балалар мен ересектерге жарамды.',
    product_sinulan_duo_usage_label: 'Қашан өзекті',
    product_sinulan_duo_usage_heading: 'Суық тию маусымында тыныс алу жолдарын қолдау үшін',
    product_sinulan_duo_usage_cold_title: 'Суық тигенде',
    product_sinulan_duo_usage_cold_text: 'Нұсқаулыққа сай тыныс алуды және жалпы жай-күйді қолдау үшін қолданылуы мүмкін.',
    product_sinulan_duo_usage_sinus_title: 'Мұрын бітелгенде',
    product_sinulan_duo_usage_sinus_text: 'Өсімдік формуласы тыныс алу жолдарының жайлылығын қолдауға көмектеседі.',
    product_sinulan_duo_usage_family_title: 'Отбасы үшін',
    product_sinulan_duo_usage_family_text: 'Қолдану бойынша ұсынымдарды сақтағанда ересектер мен 6 жастан асқан балаларға жарамды.',
    product_sinulan_duo_note_title: 'Есте сақтау маңызды',
    product_sinulan_duo_note_text: 'Қолданар алдында нұсқаулықты оқып, созылмалы аурулар болса маманмен кеңесіңіз.',
    product_sinulan_duo_buy_intro: 'Синулан Дуоны Қазақстандағы STADA дәріхана серіктестерінен іздеңіз.',
    // Vitrum Immunaktiv translations
    product_vitrum_immunaktiv_page_title: 'Витрум Иммунактив',
    product_vitrum_immunaktiv_page_desc: 'Витрум Иммунактив — иммунитетті қолдау үшін 13 витамин, 8 минерал және β-глюканнан тұратын витамин-минерал кешені.',
    product_vitrum_immunaktiv_benefit1: 'Иммунитетті қолдау үшін 13 витамин, 8 минерал және β-глюканнан тұратын теңдестірілген формула',
    product_vitrum_immunaktiv_benefit2: 'Иммунитетті күшейтіп, иммундық жасушалардың дұрыс жұмыс істеуін қамтамасыз етеді',
    product_vitrum_immunaktiv_benefit3: 'Денені маусымдық, вирустық және бактериялық инфекциялардан қорғайды',
    product_vitrum_immunaktiv_benefit4: 'Жазылу уақытын қысқартып, асқынулардың қаупін азайтады',
    product_vitrum_immunaktiv_benefit5: 'Аурудан кейінгі тезірек реабилитацияға көмектесіп, қайта ауру қаупін азайтады',
    product_vitrum_immunaktiv_benefit6: '18 жастан асқан ересектерге арналған',
    product_vitrum_immunaktiv_kicker: 'Витамин-минерал кешені',
    product_vitrum_immunaktiv_badge_adults: '18+ ересектерге',
    product_vitrum_immunaktiv_badge_immune: 'Иммунитетті қолдау',
    product_vitrum_immunaktiv_badge_course: 'Курстық қабылдауға',
    product_vitrum_immunaktiv_metric_vitamins: 'витамин',
    product_vitrum_immunaktiv_metric_minerals: 'минерал',
    product_vitrum_immunaktiv_metric_beta: 'β-глюкан',
    product_vitrum_immunaktiv_overview_label: 'Өнім туралы',
    product_vitrum_immunaktiv_overview_heading: 'Жоғары жүктеме кезеңіне арналған кешенді формула',
    product_vitrum_immunaktiv_overview_intro: 'Витрум Иммунактив витамин-минерал негізін және β-глюканды біріктіріп, суық тию маусымында, қарқынды өмір ырғағында және аурудан кейін иммундық жүйенің қалыпты жұмысын қолдауға көмектеседі.',
    product_vitrum_immunaktiv_card_vitamins_title: '13 витамин',
    product_vitrum_immunaktiv_card_vitamins_text: 'Ағзаның маңызды микронутриенттерге күнделікті қажеттілігін толықтыруға көмектеседі.',
    product_vitrum_immunaktiv_card_minerals_title: '8 минерал',
    product_vitrum_immunaktiv_card_minerals_text: 'Зат алмасу процестерін және ағзаның қалыпты жұмысын қолдайды.',
    product_vitrum_immunaktiv_card_beta_title: 'β-глюкан',
    product_vitrum_immunaktiv_card_beta_text: 'Кешенді иммундық қолдауға арналған формуланы толықтыратын компонент.',
    product_vitrum_immunaktiv_card_adults_title: 'Ересектерге',
    product_vitrum_immunaktiv_card_adults_text: 'Формула 18 жастан асқан ересектерге арналған.',
    product_vitrum_immunaktiv_formula_label: 'Формула',
    product_vitrum_immunaktiv_formula_heading: 'Күнделікті қолдаудың үш деңгейі',
    product_vitrum_immunaktiv_formula_intro: 'Құрамы қалыпты иммундық жауап, зат алмасу және ағза ресурстарын қалпына келтіру үшін маңызды нутриенттерге бағытталған.',
    product_vitrum_immunaktiv_formula_vitamins_title: 'Витаминдер',
    product_vitrum_immunaktiv_formula_vitamins_text: 'Витаминдер кешені энергия алмасуын және табиғи қорғаныс қызметтерін қолдауға көмектеседі.',
    product_vitrum_immunaktiv_formula_minerals_title: 'Минералдар',
    product_vitrum_immunaktiv_formula_minerals_text: 'Минералды бөлігі рационды толықтырып, ағзаның төзімділігін қолдайды.',
    product_vitrum_immunaktiv_formula_beta_title: 'β-глюкан',
    product_vitrum_immunaktiv_formula_beta_text: 'β-глюкан өнімнің иммундық жүйені қолдауға бағытталған әсерін толықтырады.',
    product_vitrum_immunaktiv_usage_label: 'Қашан әсіресе өзекті',
    product_vitrum_immunaktiv_usage_heading: 'Маусымға, қалпына келуге және қарқынды өмірге',
    product_vitrum_immunaktiv_usage_season_title: 'Суық тию маусымында',
    product_vitrum_immunaktiv_usage_season_text: 'Иммунитетке жүктеме артатын кезеңдерде күнделікті қолдаудың бір бөлігі ретінде жарамды.',
    product_vitrum_immunaktiv_usage_recovery_title: 'Аурудан кейін',
    product_vitrum_immunaktiv_usage_recovery_text: 'Аурудан кейін қалпына келу кезінде ағза ресурстарын толықтыруға көмектеседі.',
    product_vitrum_immunaktiv_usage_daily_title: 'Белсенді кестеде',
    product_vitrum_immunaktiv_usage_daily_text: 'Витаминдер мен минералдар балансын қолдағысы келетін ересектерге ыңғайлы нұсқа.',
    product_vitrum_immunaktiv_note_title: 'Жауапты қабылдау',
    product_vitrum_immunaktiv_note_text: 'Қолданар алдында нұсқаулықпен танысып, маманмен кеңесіңіз, әсіресе созылмалы аурулар немесе басқа құралдарды бірге қабылдау жағдайында.',
    product_vitrum_immunaktiv_buy_intro: 'Витрум Иммунактивті Қазақстандағы STADA дәріхана серіктестерінен іздеңіз.',
    // Edarbi Klo benefits
    product_edarbi_klo_benefit1: 'Азилсартан мен хлорталидонның комбинациясы гипертонияны тиімді бақылау үшін',
    product_edarbi_klo_benefit2: 'Азилсартан ангиотензин II-нің тамырларды тарылту және натрийді ұстап қалу әсерін блоктайды',
    product_edarbi_klo_benefit3: 'Хлорталидон натрий мен хлоридтің бөлінуін арттыра отырып, диурез тудырады',
    product_edarbi_klo_benefit4: 'Қан қысымын шеткері кедергіні төмендету арқылы толықтыратын механизмдермен төмендетеді',
    product_edarbi_klo_benefit5: 'Қан қысымын бақылауға бір дәрі жеткіліксіз науқастарға ұсынылады',
    product_edarbi_klo_kicker: 'Қан қысымын біріктірілген бақылау',
    product_edarbi_klo_badge_combo: 'Азилсартан + хлорталидон',
    product_edarbi_klo_badge_pressure: 'Қан қысымын бақылау',
    product_edarbi_klo_badge_pack: '28 таблетка',
    product_edarbi_klo_metric_dose: 'мг белсенді компоненттер',
    product_edarbi_klo_metric_pack: 'қаптамадағы таблетка',
    product_edarbi_klo_metric_mechanism: 'әсер ету механизмі',
    product_edarbi_klo_overview_label: 'Артериялық қысым',
    product_edarbi_klo_overview_heading: 'Гипертонияны бақылауға арналған комбинация',
    product_edarbi_klo_overview_intro: 'Эдарби Кло дәрігердің тағайындауы бойынша артериялық қысымды бақылау үшін азилсартан мен хлорталидонды біріктіреді.',
    product_edarbi_klo_card_azilsartan_title: 'Азилсартан',
    product_edarbi_klo_card_azilsartan_text: 'Тамыр тонусымен байланысты ангиотензин II әсерін тежеуге көмектеседі.',
    product_edarbi_klo_card_chlorthalidone_title: 'Хлорталидон',
    product_edarbi_klo_card_chlorthalidone_text: 'Диуретикалық компонент натрий мен сұйықтықтың шығарылуына ықпал етеді.',
    product_edarbi_klo_card_pack_title: '28 таблетка',
    product_edarbi_klo_card_pack_text: 'Дәрігер тағайындаған схема бойынша тұрақты қабылдауға арналған қаптама форматы.',
    product_edarbi_klo_card_control_title: 'Қысымды бақылау',
    product_edarbi_klo_card_control_text: 'Компоненттер артериялық гипертензия терапиясында бірін-бірі толықтырады.',
    product_edarbi_klo_formula_label: 'Формула',
    product_edarbi_klo_formula_heading: 'Ортасында — екі белсенді компонент',
    product_edarbi_klo_formula_intro: 'Сызықтар азилсартан, хлорталидон және жалпы қысым бақылауы қаптама айналасында қалай бірігетінін көрсетеді.',
    product_edarbi_klo_formula_azilsartan_title: 'Азилсартан',
    product_edarbi_klo_formula_azilsartan_text: 'Компонент ангиотензин II рецепторларын тежеуге бағытталған.',
    product_edarbi_klo_formula_chlorthalidone_title: 'Хлорталидон',
    product_edarbi_klo_formula_chlorthalidone_text: 'Диуретикалық компонент сұйықтық көлемін және тамырларға түсетін жүктемені азайтуға көмектеседі.',
    product_edarbi_klo_formula_control_title: 'Қан қысымын бақылау',
    product_edarbi_klo_formula_control_text: 'Екі әсер ету механизмі жоғары қысымды бақылауда бірін-бірі толықтырады.',
    product_edarbi_klo_usage_label: 'Қашан тағайындалады',
    product_edarbi_klo_usage_heading: 'Біріктірілген қысым бақылауы қажет пациенттерге',
    product_edarbi_klo_usage_pressure_title: 'Артериялық гипертензия',
    product_edarbi_klo_usage_pressure_text: 'Жоғары артериялық қысымды төмендету үшін дәрігердің тағайындауы бойынша қолданылады.',
    product_edarbi_klo_usage_combo_title: 'Бір препарат жеткіліксіз болғанда',
    product_edarbi_klo_usage_combo_text: 'Монотерапия қажетті бақылауды қамтамасыз етпесе, компоненттер комбинациясы тағайындалуы мүмкін.',
    product_edarbi_klo_usage_routine_title: 'Күнделікті схема',
    product_edarbi_klo_usage_routine_text: 'Қабылдау режимін дәрігер анықтайды; ұсыныстарды және қысым бақылауын сақтау маңызды.',
    product_edarbi_klo_note_title: 'Маңызды',
    product_edarbi_klo_note_text: 'Эдарби Кло дәрігердің тағайындауы бойынша қолданылады. Қолданар алдында нұсқаулықпен танысыңыз және терапия схемасын өз бетіңізше өзгертпеңіз.',
    product_edarbi_klo_buy_intro: 'Эдарби Кло препаратын Қазақстандағы STADA дәріхана серіктестерінен іздеңіз.'
  }
};

// Current language state
let currentLang = 'ru';

// Helper to update all elements with data-i18n-key
function updateLanguage(lang) {
  currentLang = lang;
  // Persist the selected language so that navigation between pages retains the user’s choice
  try {
    localStorage.setItem('stada-lang', lang);
  } catch (e) {
    // If localStorage is unavailable (e.g. due to privacy settings), silently ignore
  }
  document.documentElement.lang = lang;
  const elements = document.querySelectorAll('[data-i18n-key]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n-key');
    const translation = translations[lang][key];
    if (translation) {
      el.textContent = translation;
    }
  });
  // Highlight the active language option in the custom toggle.  Each
  // language button is annotated with a `data-lang` attribute; we
  // assign the `active` class based on the current language.  If
  // legacy markup with a single `#langBtn` exists (e.g. before
  // applying the redesign) we leave it untouched.
  const langOptions = document.querySelectorAll('.lang-toggle .lang-option');
  if (langOptions.length) {
    langOptions.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  } else {
    // Fallback: update the text of the single toggle button to reflect
    // the current language order (RU/KZ or KZ/RU).
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
      langBtn.textContent = lang === 'ru' ? 'RU / KZ' : 'KZ / RU';
    }
  }

  // Update back-to-top button label if it exists
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.setAttribute('aria-label', lang === 'ru' ? 'Вернуться наверх' : 'Жоғарыға қайту');
  }

  // Reveal hero overlays after text has been populated.  Without this
  // call the overlays remain hidden (opacity 0) to prevent a flash of
  // unstyled content while CSS and translations are loading.  We add
  // the class on every language update so that toggling languages
  // re‑triggers the fade in effect if desired.
  const heroOverlays = document.querySelectorAll('.hero-overlay');
  heroOverlays.forEach(overlay => {
    overlay.classList.add('visible');
  });
}

// Toggle languages on button click
function toggleLanguage() {
  updateLanguage(currentLang === 'ru' ? 'kz' : 'ru');
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

  const slides = Array.from(carousel.querySelectorAll('.hero-carousel-slide'));
  const dots = Array.from(carousel.querySelectorAll('.hero-carousel-dot'));
  const caption = document.querySelector('[data-hero-caption]');
  const prevButton = carousel.querySelector('[data-hero-prev]');
  const nextButton = carousel.querySelector('[data-hero-next]');
  if (slides.length < 2) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let timerId = null;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeIndex);
    });
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
      caption.textContent = translations[currentLang]?.[captionKey] || '';
    }
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

  showSlide(0);
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
  const cards = Array.from(document.querySelectorAll('[data-product-card]'));
  if (!filters.length || !cards.length) return;

  filters.forEach(filterButton => {
    filterButton.addEventListener('click', () => {
      const activeFilter = filterButton.dataset.productFilter;

      filters.forEach(button => {
        const isActive = button === filterButton;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });

      cards.forEach(card => {
        const categories = (card.dataset.category || '').split(' ');
        const isVisible = activeFilter === 'all' || categories.includes(activeFilter);
        card.hidden = !isVisible;
        card.setAttribute('aria-hidden', String(!isVisible));
      });
    });
  });
}

function initProductDetailPage() {
  const page = document.querySelector('.product-detail-page');
  if (!page) return;

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

// Highlight the current navigation link as its section enters the viewport
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.menu a');
  if (!sections.length || !navLinks.length) return;
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
  const animateCounter = (el, endVal, formatValue) => {
    const duration = 2000;
    const startTime = performance.now();
    const startVal = 0;
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * (endVal - startVal) + startVal);
      el.textContent = el.dataset.prefix + formatValue(value) + el.dataset.suffix;
      if (progress < 1) {
        requestAnimationFrame(animate);
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
          const text = el.textContent;
          const prefixMatch = text.match(/^[^0-9]+/);
          const suffixMatch = text.match(/[^0-9]+$/);
          el.dataset.prefix = prefixMatch ? prefixMatch[0] : '';
          el.dataset.suffix = suffixMatch ? suffixMatch[0] : '';
          const endVal = parseNumber(text);
          const shouldGroup = endVal >= 1000 || /\d[\s\u00a0]\d/.test(text);
          const formatValue = shouldGroup
            ? value => value.toLocaleString('ru-RU').replace(/\s/g, '\u00a0')
            : value => String(value);
          animateCounter(el, endVal, formatValue);
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

// Bind event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Determine the initial language.  If the user has previously selected
  // a language and it is stored in localStorage, respect that choice.
  try {
    const savedLang = localStorage.getItem('stada-lang');
    if (savedLang === 'ru' || savedLang === 'kz') {
      currentLang = savedLang;
    }
  } catch (e) {
    // Fallback to default language when localStorage is not available
  }
  // Initial language update
  updateLanguage(currentLang);
  // Initialise libraries
  initSwiper();
  initAOS();
  // Initialise custom scroll behaviours
  initScrollSpy();
  initScrollEffects();
  initCounters();
  setYear();
  // Bind language switcher
  // Prefer the redesigned dual‑button toggle if present.  Each button
  // specifies its target language via the data‑lang attribute.  If
  // neither is found (e.g. on older pages) fall back to the single
  // toggle button and the toggleLanguage() helper.
  const langRu = document.getElementById('lang-ru');
  const langKz = document.getElementById('lang-kz');
  if (langRu && langKz) {
    langRu.addEventListener('click', () => updateLanguage('ru'));
    langKz.addEventListener('click', () => updateLanguage('kz'));
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
  initMagneHeroLevitation();
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
  // translations are ready.  The class toggled here corresponds to
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
