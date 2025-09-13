// Educational Website - Human & Plant Reproduction: A Qur'anic Perspective
// Vanilla JavaScript with Canvas animations, multilingual support, and accessibility features

// Global state management
const AppState = {
  currentSlide: 0,
  totalSlides: 9,
  language: 'en',
  isDarkMode: false,
  isReducedMotion: false,
  spermAnimation: null,
  isVisible: true,
  navigationHistory: []
};

// Slide URL mapping for deep linking
const slideRoutes = {
  0: 'intro',
  1: 'human-reproduction',
  2: 'plant-reproduction', 
  3: 'comparison',
  4: 'microscope',
  5: 'asexual-reproduction',
  6: 'timeline',
  7: 'quiz',
  8: 'reflection'
};

// Reverse mapping for URL to slide index
const routeToSlide = Object.fromEntries(
  Object.entries(slideRoutes).map(([key, value]) => [value, parseInt(key)])
);

// Internationalization data
const i18n = {
  en: {
    // Page and site info
    pageTitle: "Human & Plant Reproduction: A Qur'anic Perspective",
    siteTitle: "Flow of Life",
    langLabel: "EN",
    
    // Hero slide
    heroTitle: "Human & Plant Reproduction",
    heroSubtitle: "A Qur'anic Perspective",
    versePairs: "And of all things We created [two] mates that you may reflect.",
    versePairsRef: "— Adh-Dhāriyāt 51:49",
    exploreBtn: "Explore",
    
    // Human reproduction slide
    humanRepTitle: "Human Reproduction",
    verseHuman: "And indeed We created man from an extract of clay. Then We placed him as a drop in a firm resting place. Then We made the drop into a clinging clot, and We made the clot into a lump [of flesh], and We made [from] the lump, bones, and We covered the bones with flesh; then We developed him into another creation.",
    verseHumanRef: "— Al-Mu'minūn 23:12-14",
    scientificOverview: "Scientific Overview",
    humanProcess: "Sexual reproduction involves the fusion of male gametes (sperm) with female gametes (eggs) to form a zygote, which develops into an embryo and then a fetus.",
    eggLabel: "Egg Cell",
    spermLabel: "Sperm Cell",
    learnMore: "Learn More",
    
    // Interactive fertilization stepper
    fertilizationProcess: "Human Fertilization Process",
    previous: "Previous",
    next: "Next",
    playAnimation: "Play Animation",
    reset: "Reset",
    step1Description: "Millions of sperm begin their journey through the reproductive tract, but only one will successfully fertilize the egg.",
    step2Description: "Sperm navigate through the reproductive tract, with many being filtered out along the way.",
    step3Description: "The surviving sperm reach the egg and begin attempting to penetrate the protective layers.",
    step4Description: "One sperm successfully penetrates the zona pellucida and reaches the egg membrane.",
    step5Description: "The sperm and egg nuclei fuse, creating a zygote and beginning new life.",
    
    // Plant reproduction slide
    plantRepTitle: "Plant Reproduction",
    versePlant: "Exalted is He who created pairs of all things—from what the earth grows, from themselves, and from that which they do not know.",
    versePlantRef: "— Yā-Sīn 36:36",
    plantProcess: "Plant Sexual Reproduction",
    plantDescription: "Pollen from the anther travels to the stigma, where it germinates and grows a tube to reach the ovule for fertilization.",
    stigmaLabel: "Stigma",
    ovuleLabel: "Ovule",
    antherLabel: "Anther",
    
    // Interactive pollination sequence
    pollinationSequence: "Plant Pollination Sequence",
    pollinationStart: "Click on the anther to see how pollen is released and travels to fertilize the ovule.",
    resetSequence: "Reset Sequence",
    autoPlay: "Auto Play",
    sequenceStep1: "Pollen grains are released from the mature anther.",
    sequenceStep2: "Pollen lands on the sticky stigma surface.",
    sequenceStep3: "The style provides a pathway for the pollen tube.",
    sequenceStep4: "The ovule waits in the ovary for fertilization.",
    sequenceStep5: "Pollen tube grows down the style toward the ovule.",
    sequenceComplete: "Fertilization occurs when the pollen tube reaches the ovule!",
    
    // Comparison slide
    comparisonTitle: "Similarities & Differences",
    aspect: "Aspect",
    humans: "Humans",
    plants: "Plants",
    gameteProduction: "Gamete Production",
    humanGametes: "Meiosis produces sperm & eggs",
    plantGametes: "Meiosis produces pollen & ovules",
    fertilization: "Fertilization",
    humanFertilization: "Internal fertilization",
    plantFertilization: "Fertilization in ovule",
    development: "Development",
    humanDevelopment: "Embryo develops in womb",
    plantDevelopment: "Embryo develops in seed",
    reproduction: "Reproduction Types",
    humanTypes: "Sexual only",
    plantTypes: "Sexual & Asexual",
    advantagesTitle: "Advantages of Sexual Reproduction",
    advantage1: "Genetic variation increases survival",
    advantage2: "Adaptation to environmental changes",
    advantage3: "Elimination of harmful mutations",
    disadvantagesTitle: "Disadvantages",
    disadvantage1: "Requires two parents",
    disadvantage2: "Energy-intensive process",
    disadvantage3: "Slower reproduction rate",
    
    // Microscope slide
    microscopeTitle: "Microscope View",
    microscopeInstructions: "Click on the floating cells to explore their structures",
    toggleShape: "Toggle Shape",
    
    // Modal content for cells
    spermModalTitle: "Sperm Cell Structure",
    spermModalContent: "The sperm cell consists of three main parts: the head containing the acrosome and nucleus with genetic material, the midpiece packed with mitochondria for energy, and the tail with a 9+2 axoneme structure for movement.",
    eggModalTitle: "Egg Cell Structure",
    eggModalContent: "The egg cell is surrounded by the corona radiata and zona pellucida for protection. The large cytoplasm contains nutrients and organelles, while the nucleus holds the female genetic material.",
    pollenModalTitle: "Pollen Grain Structure",
    pollenModalContent: "Pollen grains have a tough outer wall (exine) and inner wall (intine). Inside are the tube cell that forms the pollen tube and the generative cell that produces sperm cells.",
    ovuleModalTitle: "Plant Ovule Structure",
    ovuleModalContent: "The ovule is protected by integuments that become the seed coat. The micropyle allows pollen tube entry, while the nucellus contains the embryo sac with the egg cell.",
    
    // Asexual reproduction slide
    asexualTitle: "Asexual Reproduction in Plants",
    runnersTitle: "Runners",
    runnersDesc: "Horizontal stems that grow along the ground and produce new plants at nodes. Common in strawberries.",
    runnersPro: "Fast colonization",
    runnersCon: "Low genetic diversity",
    tubersTitle: "Tubers",
    tubersDesc: "Underground storage organs that can sprout new plants. Potatoes are a common example.",
    tubersPro: "Stores energy",
    tubersCon: "Limited dispersal",
    cuttingsTitle: "Cuttings",
    cuttingsDesc: "Plant parts that can grow into new individuals when placed in suitable conditions. Used in horticulture.",
    cuttingsPro: "Preserves traits",
    cuttingsCon: "Vulnerable to disease",
    
    // Timeline slide
    timelineTitle: "Hidden Facts & Timeline",
    milestone1Title: "Qur'anic Revelation",
    milestone1Date: "7th Century CE",
    milestone1Text: "The Qur'an mentioned the creation of everything in pairs 1400 years ago, long before scientific discovery of sexual reproduction in living organisms.",
    milestone2Title: "Plant Sexual Reproduction Discovery",
    milestone2Date: "1694 CE",
    milestone2Text: "Rudolf Jakob Camerarius first demonstrated sexual reproduction in plants, proving that both male and female parts are necessary for seed formation.",
    milestone3Title: "Modern Embryology",
    milestone3Date: "19th-20th Century",
    milestone3Text: "Detailed understanding of embryonic development stages emerged, remarkably aligning with Qur'anic descriptions of human development phases.",
    milestone4Title: "Molecular Understanding",
    milestone4Date: "21st Century",
    milestone4Text: "DNA sequencing and molecular biology revealed the intricate mechanisms of reproduction at the cellular and genetic level.",
    
    // Quiz slide
    quizTitle: "Test Your Understanding",
    q1Question: "Which verse mentions that everything was created in pairs?",
    q1a: "Al-Baqarah 2:22",
    q1b: "Adh-Dhāriyāt 51:49",
    q1c: "Al-Mulk 67:3",
    q2Question: "Plants can reproduce without pollen.",
    q3Question: "What is the main advantage of sexual reproduction?",
    q3a: "Faster reproduction",
    q3b: "Genetic variation",
    q3c: "Less energy required",
    q4Question: "Where does fertilization occur in humans?",
    q4a: "Ovary",
    q4b: "Fallopian tube",
    q4c: "Uterus",
    q5Question: "Which type of reproduction produces genetically identical offspring?",
    q5a: "Sexual reproduction",
    q5b: "Asexual reproduction",
    q5c: "Both types",
    true: "True",
    false: "False",
    submitQuiz: "Submit Quiz",
    retakeQuiz: "Retake Quiz",
    selectAnswer: "Please select an answer",
    
    // Navigation labels
    navIntro: "Introduction",
    navHuman: "Human",
    navPlant: "Plant", 
    navComparison: "Compare",
    navMicroscope: "Microscope",
    navAsexual: "Asexual",
    navTimeline: "Timeline",
    navQuiz: "Quiz",
    navReflection: "Reflection",
    
    // Reflection slide
    reflectionTitle: "Reflection & References",
    reflectionPara: "The study of reproduction reveals the intricate design and wisdom in creation. Both the Qur'anic descriptions and scientific discoveries point to the remarkable complexity and purpose in the reproductive processes of all living beings. This knowledge invites us to reflect on the Creator's wisdom and our responsibility as stewards of life.",
    referencesTitle: "References",
    quranRefs: "Qur'anic References",
    ref1: "Adh-Dhāriyāt 51:49 - \"And of all things We created [two] mates...\"",
    ref2: "Yā-Sīn 36:36 - \"Exalted is He who created pairs of all things...\"",
    ref3: "Al-Mu'minūn 23:12-14 - Stages of human embryonic development",
    scienceRefs: "Scientific References",
    ref4: "Campbell Biology - Concepts of sexual and asexual reproduction",
    ref5: "Developmental Biology - Embryonic development stages",
    ref6: "Plant Biology - Reproductive mechanisms in angiosperms",
    footerText: "Educational website created for learning purposes • August 2025"
  },
  
  id: {
    // Page and site info
    pageTitle: "Reproduksi Manusia & Tumbuhan: Perspektif Al-Qur'an",
    siteTitle: "Aliran Kehidupan",
    langLabel: "ID",
    
    // Hero slide
    heroTitle: "Reproduksi Manusia & Tumbuhan",
    heroSubtitle: "Perspektif Al-Qur'an",
    versePairs: "Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu berpikir.",
    versePairsRef: "— Adh-Dhāriyāt 51:49",
    exploreBtn: "Jelajahi",
    
    // Human reproduction slide
    humanRepTitle: "Reproduksi Manusia",
    verseHuman: "Dan sungguh, Kami telah menciptakan manusia dari saripati tanah. Kemudian Kami menjadikannya air mani (yang disimpan) dalam tempat yang kokoh (rahim). Kemudian, air mani itu Kami jadikan sesuatu yang melekat, lalu sesuatu yang melekat itu Kami jadikan segumpal daging, dan segumpal daging itu Kami jadikan tulang belulang, lalu tulang belulang itu Kami bungkus dengan daging. Kemudian, Kami menjadikannya makhluk yang (berbentuk) lain.",
    verseHumanRef: "— Al-Mu'minūn 23:12-14",
    scientificOverview: "Tinjauan Ilmiah",
    humanProcess: "Reproduksi seksual melibatkan peleburan gamet jantan (sperma) dengan gamet betina (sel telur) untuk membentuk zigot, yang berkembang menjadi embrio kemudian janin.",
    eggLabel: "Sel Telur",
    spermLabel: "Sel Sperma",
    learnMore: "Pelajari Lebih Lanjut",
    
    // Interactive fertilization stepper
    fertilizationProcess: "Proses Pembuahan Manusia",
    previous: "Sebelumnya",
    next: "Berikutnya",
    playAnimation: "Putar Animasi",
    reset: "Atur Ulang",
    step1Description: "Jutaan sperma memulai perjalanannya melalui saluran reproduksi, tetapi hanya satu yang akan berhasil membuahi sel telur.",
    step2Description: "Sperma menavigasi melalui saluran reproduksi, banyak yang tersaring di sepanjang jalan.",
    step3Description: "Sperma yang bertahan mencapai sel telur dan mulai menembus lapisan pelindung.",
    step4Description: "Satu sperma berhasil menembus zona pelusida dan mencapai membran sel telur.",
    step5Description: "Inti sperma dan sel telur menyatu, membentuk zigot dan memulai kehidupan baru.",
    
    // Plant reproduction slide
    plantRepTitle: "Reproduksi Tumbuhan",
    versePlant: "Mahasuci Allah yang telah menciptakan pasangan-pasangan semuanya, baik dari apa yang ditumbuhkan oleh bumi dan dari diri mereka maupun dari apa yang tidak mereka ketahui.",
    versePlantRef: "— Yā-Sīn 36:36",
    plantProcess: "Reproduksi Seksual Tumbuhan",
    plantDescription: "Serbuk sari dari kepala sari bergerak ke kepala putik, di mana ia berkecambah dan membentuk tabung untuk mencapai bakal biji untuk pembuahan.",
    stigmaLabel: "Kepala Putik",
    ovuleLabel: "Bakal Biji",
    antherLabel: "Kepala Sari",
    
    // Interactive pollination sequence
    pollinationSequence: "Urutan Penyerbukan Tumbuhan",
    pollinationStart: "Klik pada kepala sari untuk melihat bagaimana serbuk sari dilepaskan dan bergerak untuk membuahi bakal biji.",
    resetSequence: "Atur Ulang Urutan",
    autoPlay: "Putar Otomatis",
    sequenceStep1: "Butir serbuk sari dilepaskan dari kepala sari yang matang.",
    sequenceStep2: "Serbuk sari menempel pada permukaan kepala putik yang lengket.",
    sequenceStep3: "Tangkai putik menyediakan jalur bagi tabung serbuk sari.",
    sequenceStep4: "Bakal biji menunggu di ovarium untuk pembuahan.",
    sequenceStep5: "Tabung serbuk sari tumbuh menuruni tangkai putik menuju bakal biji.",
    sequenceComplete: "Pembuahan terjadi ketika tabung serbuk sari mencapai bakal biji!",
    
    // Comparison slide
    comparisonTitle: "Persamaan & Perbedaan",
    aspect: "Aspek",
    humans: "Manusia",
    plants: "Tumbuhan",
    gameteProduction: "Produksi Gamet",
    humanGametes: "Meiosis menghasilkan sperma & sel telur",
    plantGametes: "Meiosis menghasilkan serbuk sari & bakal biji",
    fertilization: "Pembuahan",
    humanFertilization: "Pembuahan internal",
    plantFertilization: "Pembuahan dalam bakal biji",
    development: "Perkembangan",
    humanDevelopment: "Embrio berkembang di rahim",
    plantDevelopment: "Embrio berkembang dalam biji",
    reproduction: "Jenis Reproduksi",
    humanTypes: "Seksual saja",
    plantTypes: "Seksual & Aseksual",
    advantagesTitle: "Keuntungan Reproduksi Seksual",
    advantage1: "Variasi genetik meningkatkan kelangsungan hidup",
    advantage2: "Adaptasi terhadap perubahan lingkungan",
    advantage3: "Eliminasi mutasi berbahaya",
    disadvantagesTitle: "Kerugian",
    disadvantage1: "Membutuhkan dua induk",
    disadvantage2: "Proses yang membutuhkan banyak energi",
    disadvantage3: "Tingkat reproduksi lebih lambat",
    
    // Microscope slide
    microscopeTitle: "Tampilan Mikroskop",
    microscopeInstructions: "Klik pada sel-sel yang mengambang untuk menjelajahi strukturnya",
    toggleShape: "Ubah Bentuk",
    
    // Modal content for cells
    spermModalTitle: "Struktur Sel Sperma",
    spermModalContent: "Sel sperma terdiri dari tiga bagian utama: kepala yang berisi akrosom dan nukleus dengan materi genetik, bagian tengah yang dipenuhi mitokondria untuk energi, dan ekor dengan struktur aksonem 9+2 untuk pergerakan.",
    eggModalTitle: "Struktur Sel Telur",
    eggModalContent: "Sel telur dikelilingi oleh korona radiata dan zona pelusida untuk perlindungan. Sitoplasma yang besar mengandung nutrisi dan organel, sementara nukleus menyimpan materi genetik betina.",
    pollenModalTitle: "Struktur Serbuk Sari",
    pollenModalContent: "Butir serbuk sari memiliki dinding luar yang keras (eksina) dan dinding dalam (intina). Di dalamnya terdapat sel tabung yang membentuk tabung serbuk sari dan sel generatif yang menghasilkan sel sperma.",
    ovuleModalTitle: "Struktur Bakal Biji Tumbuhan",
    ovuleModalContent: "Bakal biji dilindungi oleh integumen yang menjadi kulit biji. Mikropil memungkinkan masuknya tabung serbuk sari, sementara nuselus berisi kantong embrio dengan sel telur.",
    
    // Asexual reproduction slide
    asexualTitle: "Reproduksi Aseksual pada Tumbuhan",
    runnersTitle: "Stolon",
    runnersDesc: "Batang horizontal yang tumbuh di permukaan tanah dan menghasilkan tanaman baru di buku-bukunya. Umum pada stroberi.",
    runnersPro: "Kolonisasi cepat",
    runnersCon: "Keanekaragaman genetik rendah",
    tubersTitle: "Umbi",
    tubersDesc: "Organ penyimpanan bawah tanah yang dapat menumbuhkan tanaman baru. Kentang adalah contoh umum.",
    tubersPro: "Menyimpan energi",
    tubersCon: "Penyebaran terbatas",
    cuttingsTitle: "Stek",
    cuttingsDesc: "Bagian tumbuhan yang dapat tumbuh menjadi individu baru ketika ditempatkan dalam kondisi yang sesuai. Digunakan dalam hortikultura.",
    cuttingsPro: "Mempertahankan sifat",
    cuttingsCon: "Rentan terhadap penyakit",
    
    // Timeline slide
    timelineTitle: "Fakta Tersembunyi & Garis Waktu",
    milestone1Title: "Wahyu Al-Qur'an",
    milestone1Date: "Abad ke-7 M",
    milestone1Text: "Al-Qur'an menyebutkan penciptaan segala sesuatu berpasangan 1400 tahun yang lalu, jauh sebelum penemuan ilmiah tentang reproduksi seksual pada makhluk hidup.",
    milestone2Title: "Penemuan Reproduksi Seksual Tumbuhan",
    milestone2Date: "1694 M",
    milestone2Text: "Rudolf Jakob Camerarius pertama kali menunjukkan reproduksi seksual pada tumbuhan, membuktikan bahwa bagian jantan dan betina diperlukan untuk pembentukan biji.",
    milestone3Title: "Embriologi Modern",
    milestone3Date: "Abad ke-19-20",
    milestone3Text: "Pemahaman detail tentang tahapan perkembangan embrio muncul, secara mengagumkan selaras dengan deskripsi Al-Qur'an tentang fase-fase perkembangan manusia.",
    milestone4Title: "Pemahaman Molekuler",
    milestone4Date: "Abad ke-21",
    milestone4Text: "Sekuensing DNA dan biologi molekuler mengungkap mekanisme rumit reproduksi di tingkat seluler dan genetik.",
    
    // Quiz slide
    quizTitle: "Uji Pemahaman Anda",
    q1Question: "Ayat mana yang menyebutkan bahwa segala sesuatu diciptakan berpasangan?",
    q1a: "Al-Baqarah 2:22",
    q1b: "Adh-Dhāriyāt 51:49",
    q1c: "Al-Mulk 67:3",
    q2Question: "Tumbuhan dapat bereproduksi tanpa serbuk sari.",
    q3Question: "Apa keuntungan utama reproduksi seksual?",
    q3a: "Reproduksi lebih cepat",
    q3b: "Variasi genetik",
    q3c: "Membutuhkan energi lebih sedikit",
    q4Question: "Di mana pembuahan terjadi pada manusia?",
    q4a: "Ovarium",
    q4b: "Tuba falopi",
    q4c: "Uterus",
    q5Question: "Jenis reproduksi mana yang menghasilkan keturunan yang identik secara genetik?",
    q5a: "Reproduksi seksual",
    q5b: "Reproduksi aseksual",
    q5c: "Kedua jenis",
    true: "Benar",
    false: "Salah",
    submitQuiz: "Kirim Kuis",
    retakeQuiz: "Ulangi Kuis",
    selectAnswer: "Silakan pilih jawaban",
    
    // Navigation labels
    navIntro: "Pengantar",
    navHuman: "Manusia",
    navPlant: "Tumbuhan",
    navComparison: "Bandingkan",
    navMicroscope: "Mikroskop",
    navAsexual: "Aseksual",
    navTimeline: "Garis Waktu",
    navQuiz: "Kuis",
    navReflection: "Refleksi",
    
    // Reflection slide
    reflectionTitle: "Refleksi & Referensi",
    reflectionPara: "Studi tentang reproduksi mengungkap desain yang rumit dan kebijaksanaan dalam penciptaan. Baik deskripsi Al-Qur'an maupun penemuan ilmiah menunjukkan kompleksitas dan tujuan yang luar biasa dalam proses reproduksi semua makhluk hidup. Pengetahuan ini mengundang kita untuk merenungkan kebijaksanaan Sang Pencipta dan tanggung jawab kita sebagai pengurus kehidupan.",
    referencesTitle: "Referensi",
    quranRefs: "Referensi Al-Qur'an",
    ref1: "Adh-Dhāriyāt 51:49 - \"Dan segala sesuatu Kami ciptakan [dua] pasangan...\"",
    ref2: "Yā-Sīn 36:36 - \"Mahasuci Allah yang telah menciptakan pasangan-pasangan semuanya...\"",
    ref3: "Al-Mu'minūn 23:12-14 - Tahapan perkembangan embrio manusia",
    scienceRefs: "Referensi Ilmiah",
    ref4: "Campbell Biology - Konsep reproduksi seksual dan aseksual",
    ref5: "Developmental Biology - Tahapan perkembangan embrio",
    ref6: "Plant Biology - Mekanisme reproduksi pada angiospermae",
    footerText: "Situs web edukatif dibuat untuk tujuan pembelajaran • Agustus 2025"
  }
};

// Quiz data
const quizData = {
  en: {
    questions: [
      {
        correct: 'b',
        feedback: {
          correct: "Correct! Adh-Dhāriyāt 51:49 mentions that everything was created in pairs.",
          incorrect: "Incorrect. The correct answer is Adh-Dhāriyāt 51:49, which mentions the creation of everything in pairs."
        }
      },
      {
        correct: 'true',
        feedback: {
          correct: "True! Plants can reproduce asexually through methods like runners, tubers, and cuttings, which don't require pollen.",
          incorrect: "Actually, this is true. Plants can reproduce asexually through various methods that don't require pollen, such as vegetative propagation."
        }
      },
      {
        correct: 'b',
        feedback: {
          correct: "Correct! Genetic variation is the main advantage, allowing species to adapt and survive environmental changes.",
          incorrect: "Incorrect. The main advantage is genetic variation, which helps species adapt to changing environments."
        }
      },
      {
        correct: 'b',
        feedback: {
          correct: "Correct! Fertilization typically occurs in the fallopian tubes when sperm meets the egg.",
          incorrect: "Incorrect. Human fertilization usually occurs in the fallopian tubes, not in the ovary or uterus."
        }
      },
      {
        correct: 'b',
        feedback: {
          correct: "Correct! Asexual reproduction produces genetically identical offspring since only one parent is involved.",
          incorrect: "Incorrect. Asexual reproduction produces genetically identical offspring because it involves only one parent."
        }
      }
    ]
  },
  id: {
    questions: [
      {
        correct: 'b',
        feedback: {
          correct: "Benar! Adh-Dhāriyāt 51:49 menyebutkan bahwa segala sesuatu diciptakan berpasangan.",
          incorrect: "Salah. Jawaban yang benar adalah Adh-Dhāriyāt 51:49, yang menyebutkan penciptaan segala sesuatu berpasangan."
        }
      },
      {
        correct: 'true',
        feedback: {
          correct: "Benar! Tumbuhan dapat bereproduksi secara aseksual melalui metode seperti stolon, umbi, dan stek, yang tidak memerlukan serbuk sari.",
          incorrect: "Sebenarnya, ini benar. Tumbuhan dapat bereproduksi secara aseksual melalui berbagai metode yang tidak memerlukan serbuk sari, seperti propagasi vegetatif."
        }
      },
      {
        correct: 'b',
        feedback: {
          correct: "Benar! Variasi genetik adalah keuntungan utama, memungkinkan spesies untuk beradaptasi dan bertahan hidup dari perubahan lingkungan.",
          incorrect: "Salah. Keuntungan utama adalah variasi genetik, yang membantu spesies beradaptasi dengan lingkungan yang berubah."
        }
      },
      {
        correct: 'b',
        feedback: {
          correct: "Benar! Pembuahan biasanya terjadi di tuba falopi ketika sperma bertemu sel telur.",
          incorrect: "Salah. Pembuahan manusia biasanya terjadi di tuba falopi, bukan di ovarium atau uterus."
        }
      },
      {
        correct: 'b',
        feedback: {
          correct: "Benar! Reproduksi aseksual menghasilkan keturunan yang identik secara genetik karena hanya melibatkan satu induk.",
          incorrect: "Salah. Reproduksi aseksual menghasilkan keturunan yang identik secara genetik karena hanya melibatkan satu induk."
        }
      }
    ]
  }
};

// Timeline milestone data
const milestoneData = {
  en: [
    {
      title: "Qur'anic Revelation",
      text: "The Qur'an mentioned the creation of everything in pairs 1400 years ago, long before scientific discovery of sexual reproduction in living organisms."
    },
    {
      title: "Plant Sexual Reproduction Discovery", 
      text: "Rudolf Jakob Camerarius first demonstrated sexual reproduction in plants, proving that both male and female parts are necessary for seed formation."
    },
    {
      title: "Modern Embryology",
      text: "Detailed understanding of embryonic development stages emerged, remarkably aligning with Qur'anic descriptions of human development phases."
    },
    {
      title: "Molecular Understanding",
      text: "DNA sequencing and molecular biology revealed the intricate mechanisms of reproduction at the cellular and genetic level."
    }
  ],
  id: [
    {
      title: "Wahyu Al-Qur'an",
      text: "Al-Qur'an menyebutkan penciptaan segala sesuatu berpasangan 1400 tahun yang lalu, jauh sebelum penemuan ilmiah tentang reproduksi seksual pada makhluk hidup."
    },
    {
      title: "Penemuan Reproduksi Seksual Tumbuhan",
      text: "Rudolf Jakob Camerarius pertama kali menunjukkan reproduksi seksual pada tumbuhan, membuktikan bahwa bagian jantan dan betina diperlukan untuk pembentukan biji."
    },
    {
      title: "Embriologi Modern", 
      text: "Pemahaman detail tentang tahapan perkembangan embrio muncul, secara mengagumkan selaras dengan deskripsi Al-Qur'an tentang fase-fase perkembangan manusia."
    },
    {
      title: "Pemahaman Molekuler",
      text: "Sekuensing DNA dan biologi molekuler mengungkap mekanisme rumit reproduksi di tingkat seluler dan genetik."
    }
  ]
};

// Sperm animation class
class Sperm {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.5 + Math.random() * 1;
    this.wigglePhase = Math.random() * Math.PI * 2;
    this.wiggleSpeed = 0.1 + Math.random() * 0.1;
    this.tailLength = 20 + Math.random() * 15;
    this.headRadius = 4 + Math.random() * 2;
  }
  
  update() {
    // Update position
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    
    // Update wiggle phase
    this.wigglePhase += this.wiggleSpeed;
    
    // Soft steering toward center
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const dx = centerX - this.x;
    const dy = centerY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > this.canvas.width * 0.4) {
      const targetAngle = Math.atan2(dy, dx);
      const angleDiff = targetAngle - this.angle;
      this.angle += angleDiff * 0.01;
    }
    
    // Add slight random steering
    this.angle += (Math.random() - 0.5) * 0.02;
    
    // Wrap around edges with some padding
    const margin = 50;
    if (this.x < -margin) this.x = this.canvas.width + margin;
    if (this.x > this.canvas.width + margin) this.x = -margin;
    if (this.y < -margin) this.y = this.canvas.height + margin;
    if (this.y > this.canvas.height + margin) this.y = -margin;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    
    // Draw tail with sine wave
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    
    const segments = 10;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = -t * this.tailLength;
      const y = Math.sin(this.wigglePhase + t * Math.PI * 2) * (3 * (1 - t));
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    
    // Draw head
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.arc(0, 0, this.headRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw nucleus
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.arc(0, 0, this.headRadius * 0.6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Load saved preferences
  loadPreferences();
  
  // Initialize language system
  initializeLanguage();
  
  // Initialize theme toggles
  initializeTheme();
  
  // Initialize navigation system
  initializeNavigation();
  
  // Initialize canvas animation
  initializeSpermCanvas();
  
  // Initialize interactive elements
  initializeMicroscope();
  initializeQuiz();
  initializeTimeline();
  initializeInteractiveLearning();
  
  // Initialize accessibility features
  initializeAccessibility();
  
  // Initialize intersection observer for reveal animations
  initializeIntersectionObserver();
  
  // Initialize visibility change handler
  initializeVisibilityHandler();
  
  console.log('Educational website initialized successfully');
}

function loadPreferences() {
  // Load language preference
  const savedLang = localStorage.getItem('preferred-language');
  if (savedLang && (savedLang === 'en' || savedLang === 'id')) {
    AppState.language = savedLang;
  }
  
  // Load dark mode preference
  const savedDarkMode = localStorage.getItem('dark-mode');
  if (savedDarkMode === 'true') {
    AppState.isDarkMode = true;
    document.body.classList.add('dark');
  }
  
  // Load reduced motion preference
  const savedReducedMotion = localStorage.getItem('reduced-motion');
  if (savedReducedMotion === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    AppState.isReducedMotion = true;
    document.body.classList.add('reduce-motion');
  }
}

function initializeLanguage() {
  const langToggle = document.getElementById('langToggle');
  
  // Set initial language
  applyLanguage(AppState.language);
  
  // Language toggle event listener
  langToggle?.addEventListener('click', function() {
    AppState.language = AppState.language === 'en' ? 'id' : 'en';
    applyLanguage(AppState.language);
    localStorage.setItem('preferred-language', AppState.language);
  });
}

function applyLanguage(lang) {
  const translations = i18n[lang];
  if (!translations) return;
  
  // Update all elements with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });
  
  // Update page title
  document.title = translations.pageTitle;
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

function initializeTheme() {
  const darkToggle = document.getElementById('darkToggle');
  const motionToggle = document.getElementById('motionToggle');
  
  // Dark mode toggle
  darkToggle?.addEventListener('click', function() {
    AppState.isDarkMode = !AppState.isDarkMode;
    document.body.classList.toggle('dark', AppState.isDarkMode);
    localStorage.setItem('dark-mode', AppState.isDarkMode);
  });
  
  // Reduced motion toggle
  motionToggle?.addEventListener('click', function() {
    AppState.isReducedMotion = !AppState.isReducedMotion;
    document.body.classList.toggle('reduce-motion', AppState.isReducedMotion);
    localStorage.setItem('reduced-motion', AppState.isReducedMotion);
    
    // Update sperm animation
    if (AppState.spermAnimation) {
      if (AppState.isReducedMotion) {
        AppState.spermAnimation.pause();
      } else if (AppState.currentSlide === 0 && AppState.isVisible) {
        AppState.spermAnimation.resume();
      }
    }
  });
}

function initializeNavigation() {
  const slides = document.querySelectorAll('.slide');
  const navBtns = document.querySelectorAll('.nav-btn');
  const progressFill = document.getElementById('progressFill');
  const mainContainer = document.querySelector('.main-container');
  
  // Update active states
  function updateNavigation() {
    // Update navigation buttons
    navBtns.forEach((navBtn, index) => {
      navBtn.classList.toggle('active', index === AppState.currentSlide);
      
      // Update aria-current for screen readers
      if (index === AppState.currentSlide) {
        navBtn.setAttribute('aria-current', 'page');
      } else {
        navBtn.removeAttribute('aria-current');
      }
    });
    
    // Update slides aria-hidden state for screen readers
    slides.forEach((slide, index) => {
      if (index === AppState.currentSlide) {
        slide.setAttribute('aria-hidden', 'false');
        slide.removeAttribute('inert');
      } else {
        slide.setAttribute('aria-hidden', 'true');
        slide.setAttribute('inert', '');
      }
    });
    
    // Update progress bar
    const progress = (AppState.currentSlide / (AppState.totalSlides - 1)) * 100;
    if (progressFill) {
      progressFill.style.width = `${progress}%`;
      progressFill.setAttribute('aria-valuenow', AppState.currentSlide + 1);
      progressFill.setAttribute('aria-valuetext', `Slide ${AppState.currentSlide + 1} of ${AppState.totalSlides}`);
    }
    
    // Handle sperm animation based on current slide
    if (AppState.spermAnimation) {
      if (AppState.currentSlide === 0 && !AppState.isReducedMotion && AppState.isVisible) {
        AppState.spermAnimation.resume();
      } else {
        AppState.spermAnimation.pause();
      }
    }
  }
  
  // Scroll-based navigation with intersection observer
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const slideIndex = Array.from(slides).indexOf(entry.target);
        if (slideIndex !== -1 && slideIndex !== AppState.currentSlide) {
          AppState.currentSlide = slideIndex;
          updateNavigation();
        }
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-50px 0px'
  });
  
  slides.forEach(slide => {
    slideObserver.observe(slide);
  });
  
  // Section navigation
  navBtns.forEach((navBtn, index) => {
    navBtn.addEventListener('click', function() {
      navigateToSlide(index);
    });
  });
  
  // Enhanced keyboard navigation
  document.addEventListener('keydown', function(e) {
    // More comprehensive check for interactive elements
    const interactiveElements = 'input, textarea, select, button, a[href], [role="button"], [contenteditable], [tabindex]:not([tabindex="-1"])';
    if (e.target.closest('.modal') || e.target.matches(interactiveElements) || e.altKey || e.ctrlKey || e.metaKey) {
      return; // Don't interfere with modal, form, or interactive element interactions
    }
    
    switch(e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
      case ' ': // Spacebar for next slide (only when body has focus)
        // Only handle spacebar when body/document has focus to avoid hijacking button activation
        if (e.target === document.body || e.target === document.documentElement) {
          e.preventDefault();
          navigateToSlide(Math.min(AppState.currentSlide + 1, AppState.totalSlides - 1));
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        navigateToSlide(Math.max(AppState.currentSlide - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        navigateToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        navigateToSlide(AppState.totalSlides - 1);
        break;
      case 'Escape':
        // Close modal or go to first slide
        const modal = document.querySelector('.modal.show');
        if (modal) {
          closeModal();
        } else {
          navigateToSlide(0);
        }
        break;
      // Number keys for direct navigation (1-9)
      case '1': case '2': case '3': case '4': case '5': 
      case '6': case '7': case '8': case '9':
        e.preventDefault();
        const slideNum = parseInt(e.key) - 1;
        if (slideNum < AppState.totalSlides) {
          navigateToSlide(slideNum);
        }
        break;
    }
  });
  
  // Hero next button
  const nextBtnHero = document.getElementById('nextBtnHero');
  nextBtnHero?.addEventListener('click', function() {
    navigateToSlide(1);
  });
  
  // Learn more button
  const toMicroscope = document.getElementById('toMicroscope');
  toMicroscope?.addEventListener('click', function() {
    navigateToSlide(4); // Microscope slide
  });
  
  function navigateToSlide(index, options = {}) {
    if (index >= 0 && index < AppState.totalSlides && index !== AppState.currentSlide) {
      // Add to navigation history
      AppState.navigationHistory.push(AppState.currentSlide);
      if (AppState.navigationHistory.length > 10) {
        AppState.navigationHistory.shift(); // Keep only last 10 entries
      }
      
      const targetSlide = slides[index];
      if (targetSlide) {
        // Update URL hash without triggering scroll (unless from hash change)
        const newHash = slideRoutes[index];
        if (newHash && !options.fromHashChange) {
          history.pushState({ slide: index }, '', `#${newHash}`);
        }
        
        targetSlide.scrollIntoView({ 
          behavior: AppState.isReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
        
        AppState.currentSlide = index;
        updateNavigation();
        
        // Enhanced focus management for accessibility
        setTimeout(() => {
          const slideHeading = targetSlide.querySelector('h1, h2');
          if (slideHeading) {
            slideHeading.setAttribute('tabindex', '-1');
            slideHeading.focus({ preventScroll: true });
          } else {
            targetSlide.setAttribute('tabindex', '-1');
            targetSlide.focus({ preventScroll: true });
          }
          
          // Announce slide change for screen readers
          const slideTitle = slideHeading?.textContent || '';
          const slideNumber = index + 1;
          const announcement = `Now viewing slide ${slideNumber} of ${AppState.totalSlides}: ${slideTitle}`;
          
          // Create temporary announcement for screen readers
          const announcer = document.getElementById('slide-announcer') || document.createElement('div');
          if (!announcer.id) {
            announcer.id = 'slide-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            document.body.appendChild(announcer);
          }
          
          announcer.textContent = announcement;
        }, options.fromHashChange ? 100 : 300); // Delay focus to allow smooth scroll completion
        
        // Update page title for better user experience
        const slideHeading = targetSlide.querySelector('h1, h2');
        const slideTitle = slideHeading?.textContent || '';
        document.title = slideTitle ? `${slideTitle} - ${i18n[AppState.language].siteTitle}` : i18n[AppState.language].pageTitle;
      }
    }
  }
  
  // Handle browser back/forward navigation
  window.addEventListener('popstate', function(e) {
    if (e.state && typeof e.state.slide === 'number') {
      const targetIndex = e.state.slide;
      if (targetIndex !== AppState.currentSlide && targetIndex >= 0 && targetIndex < AppState.totalSlides) {
        const targetSlide = slides[targetIndex];
        if (targetSlide) {
          targetSlide.scrollIntoView({
            behavior: 'auto', // No smooth scroll for browser navigation
            block: 'start'
          });
          AppState.currentSlide = targetIndex;
          updateNavigation();
        }
      }
    }
  });
  
  // Handle manual hash changes (e.g., clicking anchor links)
  window.addEventListener('hashchange', function(e) {
    const hash = window.location.hash.slice(1);
    if (hash && routeToSlide.hasOwnProperty(hash)) {
      const targetIndex = routeToSlide[hash];
      if (targetIndex !== AppState.currentSlide && targetIndex >= 0 && targetIndex < AppState.totalSlides) {
        navigateToSlide(targetIndex, { fromHashChange: true });
      }
    }
  });
  
  // Initialize from URL hash on page load
  function initializeFromHash() {
    const hash = window.location.hash.slice(1); // Remove #
    let targetIndex = 0; // Default to first slide
    
    if (hash && routeToSlide.hasOwnProperty(hash)) {
      targetIndex = routeToSlide[hash];
      // Validate target index
      if (targetIndex < 0 || targetIndex >= AppState.totalSlides) {
        targetIndex = 0; // Fallback to first slide if invalid
      }
    }
    
    // Set initial state
    AppState.currentSlide = targetIndex;
    const targetSlide = slides[targetIndex];
    
    if (targetSlide) {
      // Initialize without smooth scroll for better performance
      setTimeout(() => {
        targetSlide.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
        updateNavigation();
        
        // Initialize focus management
        const slideHeading = targetSlide.querySelector('h1, h2');
        if (slideHeading) {
          slideHeading.setAttribute('tabindex', '-1');
        } else {
          targetSlide.setAttribute('tabindex', '-1');
        }
      }, 100); // Small delay to ensure DOM is ready
      
      // Set initial browser state
      const routeHash = slideRoutes[targetIndex] || slideRoutes[0];
      history.replaceState({ slide: targetIndex }, '', `#${routeHash}`);
    }
    
    // Initialize progress bar ARIA attributes
    if (progressFill) {
      progressFill.setAttribute('role', 'progressbar');
      progressFill.setAttribute('aria-label', 'Slide progress');
      progressFill.setAttribute('aria-valuemin', '1');
      progressFill.setAttribute('aria-valuemax', AppState.totalSlides.toString());
      progressFill.setAttribute('aria-valuenow', (targetIndex + 1).toString());
      progressFill.setAttribute('aria-valuetext', `Slide ${targetIndex + 1} of ${AppState.totalSlides}`);
    }
  }
  
  // Initialize navigation from URL hash
  initializeFromHash();
  
  // Initial navigation update
  updateNavigation();
  
  // Enhanced updateNavigation function to handle aria-current
  const originalUpdateNavigation = updateNavigation;
  updateNavigation = function() {
    originalUpdateNavigation();
    
    // Update aria-current for screen readers
    navBtns.forEach((navBtn, index) => {
      if (index === AppState.currentSlide) {
        navBtn.setAttribute('aria-current', 'page');
      } else {
        navBtn.removeAttribute('aria-current');
      }
    });
  };
  
  // Enhance navigation buttons with tooltips and better accessibility
  navBtns.forEach((btn, index) => {
    const slideTitle = slides[index]?.querySelector('h1, h2')?.textContent || `Slide ${index + 1}`;
    btn.setAttribute('aria-label', `Navigate to ${slideTitle}`);
    btn.setAttribute('title', slideTitle);
    
    // Add enhanced keyboard interaction
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateToSlide(index);
      }
    });
  });
}

function initializeSpermCanvas() {
  const canvas = document.getElementById('spermCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let spermArray = [];
  let animationId = null;
  let isAnimating = false;
  
  // Resize canvas to match display size and handle retina displays
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    // Recreate sperm array with new dimensions
    createSpermArray();
  }
  
  function createSpermArray() {
    spermArray = [];
    const spermCount = Math.max(30, Math.min(50, Math.floor(canvas.width * canvas.height / 10000)));
    
    for (let i = 0; i < spermCount; i++) {
      spermArray.push(new Sperm(canvas));
    }
  }
  
  function animate() {
    if (!isAnimating) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw sperm
    spermArray.forEach(sperm => {
      sperm.update();
      sperm.draw(ctx);
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  function start() {
    if (!isAnimating && !AppState.isReducedMotion) {
      isAnimating = true;
      animate();
    }
  }
  
  function pause() {
    isAnimating = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }
  
  function drawStaticPattern() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw subtle static pattern for reduced motion
    const dotCount = 20;
    for (let i = 0; i < dotCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = 2 + Math.random() * 3;
      
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.random() * 0.2})`;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Initialize canvas
  resizeCanvas();
  
  // Handle resize
  window.addEventListener('resize', resizeCanvas);
  
  // Store animation controls in global state
  AppState.spermAnimation = {
    start,
    pause,
    resume: start
  };
  
  // Show static pattern if reduced motion is enabled
  if (AppState.isReducedMotion) {
    drawStaticPattern();
  }
}

function initializeMicroscope() {
  const floatingCells = document.querySelectorAll('.floating-cell');
  const modal = document.getElementById('cellModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeModal = document.getElementById('closeModal');
  const microscopeToggle = document.getElementById('microscopeToggle');
  const scope = document.getElementById('scope');
  
  let animationIds = [];
  
  // Cell modal content
  const cellData = {
    sperm: {
      titleKey: 'spermModalTitle',
      contentKey: 'spermModalContent',
      svg: `
        <svg width="300" height="200" viewBox="0 0 300 200" style="margin: 20px 0;">
          <g transform="translate(150,100)">
            <!-- Head -->
            <circle cx="0" cy="0" r="25" fill="var(--brand)" opacity="0.3" stroke="var(--brand)" stroke-width="2"/>
            <circle cx="0" cy="0" r="15" fill="var(--brand)"/>
            <text x="0" y="-35" text-anchor="middle" font-size="12" fill="var(--ink)">Acrosome & Nucleus</text>
            
            <!-- Midpiece -->
            <rect x="-30" y="-8" width="30" height="16" rx="8" fill="var(--accent)" opacity="0.7"/>
            <text x="-45" y="-15" text-anchor="middle" font-size="12" fill="var(--ink)">Mitochondria</text>
            
            <!-- Tail -->
            <path d="M-30,0 Q-60,-10 -90,0 Q-120,10 -150,0" stroke="var(--brand)" stroke-width="4" fill="none"/>
            <text x="-120" y="-15" text-anchor="middle" font-size="12" fill="var(--ink)">Flagellum (9+2 structure)</text>
          </g>
        </svg>
      `
    },
    egg: {
      titleKey: 'eggModalTitle',
      contentKey: 'eggModalContent',
      svg: `
        <svg width="300" height="200" viewBox="0 0 300 200" style="margin: 20px 0;">
          <g transform="translate(150,100)">
            <!-- Corona Radiata -->
            <circle cx="0" cy="0" r="70" fill="var(--warn)" opacity="0.1" stroke="var(--warn)" stroke-width="1" stroke-dasharray="5,5"/>
            <text x="0" y="-80" text-anchor="middle" font-size="12" fill="var(--ink)">Corona Radiata</text>
            
            <!-- Zona Pellucida -->
            <circle cx="0" cy="0" r="50" fill="var(--accent)" opacity="0.2" stroke="var(--accent)" stroke-width="2"/>
            <text x="0" y="-60" text-anchor="middle" font-size="12" fill="var(--ink)">Zona Pellucida</text>
            
            <!-- Cytoplasm -->
            <circle cx="0" cy="0" r="40" fill="var(--accent)" opacity="0.4"/>
            <text x="0" y="50" text-anchor="middle" font-size="12" fill="var(--ink)">Cytoplasm</text>
            
            <!-- Nucleus -->
            <circle cx="0" cy="0" r="15" fill="var(--accent)"/>
            <text x="0" y="5" text-anchor="middle" font-size="10" fill="white">Nucleus</text>
          </g>
        </svg>
      `
    },
    pollen: {
      titleKey: 'pollenModalTitle',
      contentKey: 'pollenModalContent',
      svg: `
        <svg width="300" height="200" viewBox="0 0 300 200" style="margin: 20px 0;">
          <g transform="translate(150,100)">
            <!-- Exine (outer wall) -->
            <circle cx="0" cy="0" r="45" fill="var(--warn)" opacity="0.2" stroke="var(--warn)" stroke-width="3"/>
            <text x="0" y="-55" text-anchor="middle" font-size="12" fill="var(--ink)">Exine (outer wall)</text>
            
            <!-- Intine (inner wall) -->
            <circle cx="0" cy="0" r="35" fill="var(--warn)" opacity="0.4" stroke="var(--warn)" stroke-width="2"/>
            <text x="0" y="55" text-anchor="middle" font-size="12" fill="var(--ink)">Intine (inner wall)</text>
            
            <!-- Tube cell -->
            <circle cx="-10" cy="-5" r="12" fill="var(--good)" opacity="0.7"/>
            <text x="-30" y="-15" text-anchor="middle" font-size="10" fill="var(--ink)">Tube cell</text>
            
            <!-- Generative cell -->
            <circle cx="10" cy="5" r="8" fill="var(--brand)"/>
            <text x="30" y="15" text-anchor="middle" font-size="10" fill="var(--ink)">Generative cell</text>
          </g>
        </svg>
      `
    },
    ovule: {
      titleKey: 'ovuleModalTitle',
      contentKey: 'ovuleModalContent',
      svg: `
        <svg width="300" height="200" viewBox="0 0 300 200" style="margin: 20px 0;">
          <g transform="translate(150,100)">
            <!-- Integuments -->
            <ellipse cx="0" cy="0" rx="60" ry="45" fill="var(--good)" opacity="0.2" stroke="var(--good)" stroke-width="2"/>
            <text x="0" y="-55" text-anchor="middle" font-size="12" fill="var(--ink)">Integuments (future seed coat)</text>
            
            <!-- Micropyle -->
            <path d="M 60,0 L 75,0" stroke="var(--brand)" stroke-width="4"/>
            <text x="85" y="5" text-anchor="start" font-size="10" fill="var(--ink)">Micropyle</text>
            
            <!-- Nucellus -->
            <ellipse cx="0" cy="0" rx="40" ry="30" fill="var(--good)" opacity="0.4"/>
            <text x="0" y="40" text-anchor="middle" font-size="12" fill="var(--ink)">Nucellus</text>
            
            <!-- Embryo sac -->
            <ellipse cx="0" cy="0" rx="20" ry="15" fill="var(--good)" opacity="0.8"/>
            <circle cx="0" cy="0" r="5" fill="var(--good)"/>
            <text x="0" y="5" text-anchor="middle" font-size="8" fill="white">Egg cell</text>
          </g>
        </svg>
      `
    }
  };
  
  // Floating animation for cells
  function animateFloatingCells() {
    if (AppState.isReducedMotion) return;
    
    floatingCells.forEach((cell, index) => {
      const startTime = Date.now() + index * 1000;
      
      function animate() {
        const time = (Date.now() - startTime) / 1000;
        const x = Math.sin(time * 0.5) * 10;
        const y = Math.cos(time * 0.7) * 8;
        
        cell.style.transform = `translate(${x}px, ${y}px)`;
        
        animationIds[index] = requestAnimationFrame(animate);
      }
      
      animate();
    });
  }
  
  // Stop floating animation
  function stopFloatingAnimation() {
    animationIds.forEach(id => {
      if (id) cancelAnimationFrame(id);
    });
    animationIds = [];
    
    floatingCells.forEach(cell => {
      cell.style.transform = '';
    });
  }
  
  // Cell click handlers
  floatingCells.forEach(cell => {
    cell.addEventListener('click', function() {
      const cellType = this.getAttribute('data-cell');
      openCellModal(cellType);
    });
    
    cell.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const cellType = this.getAttribute('data-cell');
        openCellModal(cellType);
      }
    });
  });
  
  function openCellModal(cellType) {
    const data = cellData[cellType];
    if (!data) return;
    
    const translations = i18n[AppState.language];
    modalTitle.textContent = translations[data.titleKey];
    modalBody.innerHTML = `
      <div class="modal-cell-diagram">
        ${data.svg}
      </div>
      <div class="modal-description">
        <h4>Structure & Function</h4>
        <p>${translations[data.contentKey]}</p>
      </div>
      <div class="modal-reflection">
        <h4>Qur'an & Science</h4>
        <p>This intricate cellular structure reflects the wisdom mentioned in the verses about the creation of pairs and the detailed stages of development.</p>
      </div>
    `;
    
    showModal();
  }
  
  function showModal() {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus trap
    const focusableElements = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
  
  function hideModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  
  // Modal event listeners
  closeModal?.addEventListener('click', hideModal);
  
  modal?.addEventListener('click', function(e) {
    if (e.target === modal) {
      hideModal();
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      hideModal();
    }
  });
  
  // Microscope shape toggle (Easter egg)
  microscopeToggle?.addEventListener('click', function() {
    scope?.classList.toggle('square');
  });
  
  // Handle 'M' key for microscope toggle (Easter egg)
  document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'm' && !e.target.closest('input') && !e.target.closest('textarea')) {
      scope?.classList.toggle('square');
    }
  });
  
  // Start floating animation
  animateFloatingCells();
  
  // Update animation based on reduced motion preference
  const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function handleMotionChange() {
    if (motionMediaQuery.matches || AppState.isReducedMotion) {
      stopFloatingAnimation();
    } else {
      stopFloatingAnimation();
      animateFloatingCells();
    }
  }
  
  motionMediaQuery.addListener(handleMotionChange);
}

function initializeQuiz() {
  const submitBtn = document.getElementById('submitQuiz');
  const retakeBtn = document.getElementById('retakeQuiz');
  const resultsDiv = document.getElementById('quizResults');
  
  let quizSubmitted = false;
  
  submitBtn?.addEventListener('click', function() {
    if (quizSubmitted) return;
    
    submitQuiz();
  });
  
  retakeBtn?.addEventListener('click', function() {
    resetQuiz();
  });
  
  function submitQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    let score = 0;
    let totalQuestions = questions.length;
    
    questions.forEach((question, index) => {
      const questionId = `q${index + 1}`;
      const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
      const feedback = document.getElementById(`feedback-${index}`);
      
      if (!selectedAnswer) {
        feedback.textContent = i18n[AppState.language].selectAnswer || "Please select an answer";
        feedback.className = 'feedback incorrect';
        feedback.style.display = 'block';
        return;
      }
      
      const quizDataLang = quizData[AppState.language];
      const questionData = quizDataLang.questions[index];
      const isCorrect = selectedAnswer.value === questionData.correct;
      
      if (isCorrect) {
        score++;
        feedback.textContent = questionData.feedback.correct;
        feedback.className = 'feedback correct';
      } else {
        feedback.textContent = questionData.feedback.incorrect;
        feedback.className = 'feedback incorrect';
      }
      
      feedback.style.display = 'block';
      
      // Disable all options for this question
      const options = question.querySelectorAll('input[type="radio"]');
      options.forEach(option => {
        option.disabled = true;
      });
    });
    
    // Calculate percentage
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Display results
    displayResults(score, totalQuestions, percentage);
    
    // Save best score
    const bestScore = parseInt(localStorage.getItem('best-quiz-score') || '0');
    if (percentage > bestScore) {
      localStorage.setItem('best-quiz-score', percentage.toString());
      showNewBestScore(percentage);
    }
    
    // Update UI
    submitBtn.style.display = 'none';
    retakeBtn.style.display = 'inline-flex';
    quizSubmitted = true;
  }
  
  function displayResults(score, total, percentage) {
    let resultClass = '';
    let resultMessage = '';
    
    if (percentage >= 90) {
      resultClass = 'score-excellent';
      resultMessage = AppState.language === 'en' ? 'Excellent!' : 'Luar biasa!';
    } else if (percentage >= 70) {
      resultClass = 'score-good';
      resultMessage = AppState.language === 'en' ? 'Good job!' : 'Bagus!';
    } else if (percentage >= 50) {
      resultClass = 'score-fair';
      resultMessage = AppState.language === 'en' ? 'Fair' : 'Cukup';
    } else {
      resultClass = 'score-poor';
      resultMessage = AppState.language === 'en' ? 'Keep learning!' : 'Terus belajar!';
    }
    
    const scoreText = AppState.language === 'en' 
      ? `You scored ${score} out of ${total} (${percentage}%)`
      : `Skor Anda ${score} dari ${total} (${percentage}%)`;
    
    resultsDiv.innerHTML = `
      <div class="${resultClass}">
        ${resultMessage}<br>
        <span style="font-size: 1.2em;">${scoreText}</span>
      </div>
    `;
  }
  
  function showNewBestScore(score) {
    const message = AppState.language === 'en' 
      ? `🎉 New best score: ${score}%!`
      : `🎉 Skor terbaik baru: ${score}%!`;
    
    // Create temporary celebration element
    const celebration = document.createElement('div');
    celebration.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--brand);
      color: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      z-index: 2000;
      text-align: center;
      font-weight: 600;
    `;
    celebration.textContent = message;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
      celebration.remove();
    }, 3000);
  }
  
  function resetQuiz() {
    const questions = document.querySelectorAll('.quiz-question');
    
    questions.forEach((question, index) => {
      // Re-enable options
      const options = question.querySelectorAll('input[type="radio"]');
      options.forEach(option => {
        option.disabled = false;
        option.checked = false;
      });
      
      // Hide feedback
      const feedback = document.getElementById(`feedback-${index}`);
      if (feedback) {
        feedback.style.display = 'none';
      }
    });
    
    // Reset UI
    resultsDiv.innerHTML = '';
    submitBtn.style.display = 'inline-flex';
    retakeBtn.style.display = 'none';
    quizSubmitted = false;
  }
}

function initializeTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const popover = document.getElementById('timelinePopover');
  const popoverTitle = document.getElementById('popoverTitle');
  const popoverText = document.getElementById('popoverText');
  
  let currentPopover = null;
  
  timelineItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      showMilestonePopover(index, item);
    });
    
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showMilestonePopover(index, item);
      }
    });
  });
  
  function showMilestonePopover(index, element) {
    const milestones = milestoneData[AppState.language];
    const milestone = milestones[index];
    
    if (!milestone) return;
    
    popoverTitle.textContent = milestone.title;
    popoverText.textContent = milestone.text;
    
    // Position popover
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    popover.style.left = `${rect.left + rect.width / 2}px`;
    popover.style.top = `${rect.bottom + scrollTop + 10}px`;
    popover.style.transform = 'translateX(-50%)';
    
    // Ensure popover stays in viewport
    const popoverRect = popover.getBoundingClientRect();
    if (popoverRect.right > window.innerWidth) {
      popover.style.left = `${window.innerWidth - popoverRect.width - 10}px`;
      popover.style.transform = 'none';
    }
    if (popoverRect.left < 0) {
      popover.style.left = '10px';
      popover.style.transform = 'none';
    }
    
    popover.classList.add('show');
    popover.setAttribute('aria-hidden', 'false');
    currentPopover = popover;
  }
  
  function hidePopover() {
    if (currentPopover) {
      currentPopover.classList.remove('show');
      currentPopover.setAttribute('aria-hidden', 'true');
      currentPopover = null;
    }
  }
  
  // Hide popover on outside click
  document.addEventListener('click', function(e) {
    if (currentPopover && !e.target.closest('.timeline-item') && !e.target.closest('.popover')) {
      hidePopover();
    }
  });
  
  // Hide popover on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && currentPopover) {
      hidePopover();
    }
  });
}

function initializeAccessibility() {
  // Focus outline visibility
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
  });
  
  // Announce slide changes for screen readers
  const slides = document.querySelectorAll('.slide');
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  document.body.appendChild(announcer);
  
  // Update announcer when slide changes
  let lastSlide = -1;
  function announceSlideChange() {
    if (AppState.currentSlide !== lastSlide) {
      const slideTitle = slides[AppState.currentSlide]?.querySelector('h1, h2')?.textContent || '';
      const slideNumber = AppState.currentSlide + 1;
      const message = `Slide ${slideNumber} of ${AppState.totalSlides}: ${slideTitle}`;
      
      setTimeout(() => {
        announcer.textContent = message;
      }, 100);
      
      lastSlide = AppState.currentSlide;
    }
  }
  
  // Monitor slide changes
  const slideObserver = new MutationObserver(announceSlideChange);
  slideObserver.observe(document.body, { 
    attributes: true, 
    subtree: true, 
    attributeFilter: ['class'] 
  });
}

function initializeIntersectionObserver() {
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

function initializeVisibilityHandler() {
  // Handle page visibility changes for performance
  document.addEventListener('visibilitychange', function() {
    AppState.isVisible = !document.hidden;
    
    // Pause/resume animations based on visibility
    if (AppState.spermAnimation) {
      if (AppState.isVisible && AppState.currentSlide === 0 && !AppState.isReducedMotion) {
        AppState.spermAnimation.resume();
      } else {
        AppState.spermAnimation.pause();
      }
    }
  });
  
  // Handle window focus/blur
  window.addEventListener('focus', function() {
    AppState.isVisible = true;
  });
  
  window.addEventListener('blur', function() {
    AppState.isVisible = false;
    if (AppState.spermAnimation) {
      AppState.spermAnimation.pause();
    }
  });
}

// Plant interaction handlers
document.addEventListener('DOMContentLoaded', function() {
  const stigma = document.getElementById('stigma');
  const pollenTube = document.getElementById('pollenTube');
  
  if (stigma && pollenTube) {
    stigma.addEventListener('mouseenter', function() {
      if (!AppState.isReducedMotion) {
        pollenTube.style.opacity = '1';
        pollenTube.style.strokeDasharray = '100, 0';
      }
    });
    
    stigma.addEventListener('mouseleave', function() {
      pollenTube.style.opacity = '0';
      pollenTube.style.strokeDasharray = '0, 100';
    });
  }
});

// Export for debugging in development
if (typeof window !== 'undefined') {
  window.AppState = AppState;
  window.i18n = i18n;
}

// Interactive Learning Features
function initializeInteractiveLearning() {
  initializeFertilizationStepper();
  initializePollinationSequence();
  enhanceQuizFeedback();
}

function initializeFertilizationStepper() {
  const container = document.querySelector('.stepper-container');
  if (!container || container.dataset.initialized) return;
  
  const progressBar = document.getElementById('fertilizationProgress');
  const mainSperm = document.getElementById('mainSperm');
  const eggGroup = document.getElementById('eggGroup');
  const stageIndicators = document.getElementById('stageIndicators');
  const stepLabel = document.getElementById('stepLabel');
  const stepDescription = document.getElementById('stepDescription');
  const prevBtn = document.getElementById('prevStep');
  const nextBtn = document.getElementById('nextStep');
  const playBtn = document.getElementById('playAnimation');
  const resetBtn = document.getElementById('resetStepper');
  const dots = document.querySelectorAll('.stepper-dots .dot');
  
  if (!progressBar || !mainSperm || !eggGroup) return;
  
  let currentStep = 1;
  const totalSteps = 5;
  let isAnimating = false;
  
  const steps = [
    {
      spermX: 60, spermY: 125,
      eggOpacity: 0.3,
      indicatorsOpacity: 0,
      label: 'Step 1: Sperm Journey Begins',
      description: 'Millions of sperm begin their journey through the reproductive tract, but only one will successfully fertilize the egg.'
    },
    {
      spermX: 150, spermY: 125,
      eggOpacity: 0.5,
      indicatorsOpacity: 0,
      label: 'Step 2: Navigation Through Tract',
      description: 'Sperm navigate through the reproductive tract, with many being filtered out along the way.'
    },
    {
      spermX: 240, spermY: 125,
      eggOpacity: 0.7,
      indicatorsOpacity: 0.3,
      label: 'Step 3: Approaching the Egg',
      description: 'The surviving sperm reach the egg and begin attempting to penetrate the protective layers.'
    },
    {
      spermX: 290, spermY: 125,
      eggOpacity: 0.9,
      indicatorsOpacity: 0.7,
      label: 'Step 4: Penetrating Protective Layers',
      description: 'One sperm successfully penetrates the zona pellucida and reaches the egg membrane.'
    },
    {
      spermX: 320, spermY: 125,
      eggOpacity: 1,
      indicatorsOpacity: 1,
      label: 'Step 5: Fertilization Complete',
      description: 'The sperm and egg nuclei fuse, creating a zygote and beginning new life.'
    }
  ];
  
  function updateStep(step, animate = true) {
    if (step < 1 || step > totalSteps) return;
    
    currentStep = step;
    const stepData = steps[step - 1];
    
    // Update progress bar
    const progress = ((step - 1) / (totalSteps - 1)) * 100;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
    
    // Update visual elements
    if (!AppState.isReducedMotion && animate) {
      // Animate sperm movement
      if (mainSperm) {
        mainSperm.style.transition = 'transform 1s ease-out';
        mainSperm.style.transform = `translate(${stepData.spermX}px, ${stepData.spermY}px)`;
      }
      
      // Animate other elements
      if (eggGroup) {
        eggGroup.style.transition = 'opacity 0.5s ease-out';
        eggGroup.style.opacity = stepData.eggOpacity;
      }
      
      if (stageIndicators) {
        stageIndicators.style.transition = 'opacity 0.5s ease-out';
        stageIndicators.style.opacity = stepData.indicatorsOpacity;
      }
    } else {
      // Instant positioning for reduced motion
      if (mainSperm) {
        mainSperm.style.transition = 'none';
        mainSperm.style.transform = `translate(${stepData.spermX}px, ${stepData.spermY}px)`;
      }
      
      if (eggGroup) {
        eggGroup.style.transition = 'none';
        eggGroup.style.opacity = stepData.eggOpacity;
      }
      
      if (stageIndicators) {
        stageIndicators.style.transition = 'none';
        stageIndicators.style.opacity = stepData.indicatorsOpacity;
      }
    }
    
    // Update text elements
    if (stepLabel) stepLabel.textContent = stepData.label;
    if (stepDescription) stepDescription.querySelector('p').textContent = stepData.description;
    
    // Update navigation buttons
    if (prevBtn) prevBtn.disabled = (step === 1);
    if (nextBtn) nextBtn.disabled = (step === totalSteps);
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === step - 1);
      dot.classList.toggle('completed', index < step - 1);
    });
  }
  
  function playAnimation() {
    if (isAnimating) return;
    
    isAnimating = true;
    if (playBtn) playBtn.disabled = true;
    
    let step = 1;
    updateStep(step);
    
    const interval = setInterval(() => {
      step++;
      if (step > totalSteps) {
        clearInterval(interval);
        isAnimating = false;
        if (playBtn) playBtn.disabled = false;
        return;
      }
      updateStep(step);
    }, 2000);
  }
  
  function resetStepper() {
    currentStep = 1;
    updateStep(1);
  }
  
  // Event listeners
  prevBtn?.addEventListener('click', () => {
    if (currentStep > 1) updateStep(currentStep - 1);
  });
  
  nextBtn?.addEventListener('click', () => {
    if (currentStep < totalSteps) updateStep(currentStep + 1);
  });
  
  playBtn?.addEventListener('click', playAnimation);
  resetBtn?.addEventListener('click', resetStepper);
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateStep(index + 1));
  });
  
  // Initialize to step 1
  updateStep(1, false);
  container.dataset.initialized = 'true';
}

function initializePollinationSequence() {
  const container = document.querySelector('.pollination-container');
  if (!container || container.dataset.initialized) return;
  
  const steps = document.querySelectorAll('.sequence-step');
  const sequenceLabel = document.getElementById('sequenceLabel');
  const sequenceDescription = document.getElementById('sequenceDescription');
  const resetBtn = document.getElementById('resetSequence');
  const autoPlayBtn = document.getElementById('autoPlay');
  const pollenGrains = document.getElementById('pollenGrains');
  const pollenTube = document.getElementById('pollenTube');
  const tubeNucleus = document.getElementById('tubeNucleus');
  const fertilizationGroup = document.getElementById('fertilizationGroup');
  
  if (!steps.length) return;
  
  let currentSequenceStep = 0;
  let isAutoPlaying = false;
  
  const sequenceData = [
    { 
      label: 'Click on the anther to begin',
      description: 'Click on the anther to see how pollen is released and travels to fertilize the ovule.'
    },
    {
      label: 'Step 1: Pollen Release',
      description: 'Pollen grains are released from the mature anther when conditions are right.'
    },
    {
      label: 'Step 2: Landing on Stigma',
      description: 'Pollen grains land on the sticky stigma surface and begin to germinate.'
    },
    {
      label: 'Step 3: Style Pathway',
      description: 'The style provides a protective pathway for the pollen tube to grow.'
    },
    {
      label: 'Step 4: Ovule Target',
      description: 'The ovule in the ovary waits to receive the male gametes from the pollen tube.'
    },
    {
      label: 'Step 5: Tube Growth & Fertilization',
      description: 'The pollen tube grows down the style, and fertilization occurs when it reaches the ovule!'
    }
  ];
  
  function updateSequence(stepIndex) {
    if (stepIndex < 0 || stepIndex >= sequenceData.length) return;
    
    currentSequenceStep = stepIndex;
    const data = sequenceData[stepIndex];
    
    // Update labels
    if (sequenceLabel) sequenceLabel.textContent = data.label;
    if (sequenceDescription) {
      const p = sequenceDescription.querySelector('p');
      if (p) p.textContent = data.description;
    }
    
    // Show steps progressively
    steps.forEach((step, index) => {
      if (index < stepIndex) {
        step.style.opacity = '1';
        step.classList.add('active');
      } else if (index === stepIndex - 1) {
        step.style.opacity = '1';
        step.classList.add('active');
        
        // Special animations for specific steps
        if (index === 0 && pollenGrains) {
          // Animate pollen release
          pollenGrains.style.opacity = '1';
          if (!AppState.isReducedMotion) {
            pollenGrains.querySelectorAll('.pollen-grain').forEach(grain => {
              grain.classList.add('released');
            });
          }
        }
        
        if (index === 4 && pollenTube && tubeNucleus) {
          // Animate pollen tube growth
          pollenTube.style.opacity = '1';
          if (!AppState.isReducedMotion) {
            pollenTube.classList.add('pollen-tube-growing');
            setTimeout(() => {
              tubeNucleus.style.opacity = '1';
              tubeNucleus.classList.add('tube-nucleus-moving');
            }, 1000);
            
            setTimeout(() => {
              if (fertilizationGroup) {
                fertilizationGroup.style.opacity = '1';
              }
            }, 3000);
          } else {
            tubeNucleus.style.opacity = '1';
            if (fertilizationGroup) {
              fertilizationGroup.style.opacity = '1';
            }
          }
        }
      }
    });
  }
  
  function resetSequence() {
    currentSequenceStep = 0;
    steps.forEach(step => {
      step.style.opacity = '0.3';
      step.classList.remove('active');
    });
    
    // Reset special elements
    if (pollenGrains) {
      pollenGrains.style.opacity = '0';
      pollenGrains.querySelectorAll('.pollen-grain').forEach(grain => {
        grain.classList.remove('released');
      });
    }
    
    if (pollenTube) {
      pollenTube.style.opacity = '0';
      pollenTube.classList.remove('pollen-tube-growing');
    }
    
    if (tubeNucleus) {
      tubeNucleus.style.opacity = '0';
      tubeNucleus.classList.remove('tube-nucleus-moving');
    }
    
    if (fertilizationGroup) {
      fertilizationGroup.style.opacity = '0';
    }
    
    updateSequence(0);
  }
  
  function autoPlay() {
    if (isAutoPlaying) return;
    
    isAutoPlaying = true;
    if (autoPlayBtn) autoPlayBtn.disabled = true;
    
    resetSequence();
    
    let step = 1;
    const interval = setInterval(() => {
      updateSequence(step);
      step++;
      
      if (step >= sequenceData.length) {
        clearInterval(interval);
        isAutoPlaying = false;
        if (autoPlayBtn) autoPlayBtn.disabled = false;
      }
    }, 2500);
  }
  
  // Event listeners for interactive steps
  steps.forEach((step, index) => {
    step.addEventListener('click', () => {
      if (!isAutoPlaying) {
        updateSequence(Math.min(index + 2, sequenceData.length - 1));
      }
    });
  });
  
  resetBtn?.addEventListener('click', resetSequence);
  autoPlayBtn?.addEventListener('click', autoPlay);
  
  // Initialize
  resetSequence();
  container.dataset.initialized = 'true';
}

function enhanceQuizFeedback() {
  const quizContainer = document.querySelector('.quiz-container');
  if (!quizContainer || quizContainer.dataset.enhanced) return;
  
  // Add progress bar to quiz
  const progressDiv = document.createElement('div');
  progressDiv.className = 'quiz-progress';
  progressDiv.innerHTML = `
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" id="quizProgressFill"></div>
    </div>
    <div class="quiz-counter">
      <span id="quizCounter">Question 1 of 5</span>
    </div>
  `;
  
  const firstQuestion = quizContainer.querySelector('.quiz-question');
  if (firstQuestion) {
    quizContainer.insertBefore(progressDiv, firstQuestion);
  }
  
  // Enhanced feedback with explanations
  const questions = quizContainer.querySelectorAll('.quiz-question');
  questions.forEach((question, index) => {
    const feedback = question.querySelector('.feedback');
    if (feedback) {
      const explanation = document.createElement('div');
      explanation.className = 'quiz-explanation';
      explanation.style.display = 'none';
      
      explanation.innerHTML = `
        <h4>Understanding the Answer</h4>
        <p>This question tests your knowledge of reproductive biology. The correct answer demonstrates the intricate design in biological processes.</p>
        <div class="quranic-connection">
          <h5>Qur'anic Connection</h5>
          <p>This scientific fact aligns with the Qur'anic verse about the creation of everything in pairs, highlighting the wisdom in divine creation.</p>
        </div>
      `;
      
      feedback.parentNode.insertBefore(explanation, feedback.nextSibling);
    }
  });
  
  // Update progress tracking
  function updateQuizProgress() {
    const answered = quizContainer.querySelectorAll('input[type="radio"]:checked').length;
    const total = questions.length;
    const progress = (answered / total) * 100;
    
    const progressFill = document.getElementById('quizProgressFill');
    const counter = document.getElementById('quizCounter');
    
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (counter) counter.textContent = `Question ${Math.min(answered + 1, total)} of ${total}`;
  }
  
  // Listen for answer selections
  quizContainer.addEventListener('change', updateQuizProgress);
  
  quizContainer.dataset.enhanced = 'true';
}

