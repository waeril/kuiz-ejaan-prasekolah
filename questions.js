const spellingQuestions = 
  [
  // ==========================================
  // TAHAP 1: STRICTLY REAL V+KV & KV+KV WORDS (No trailing consonants)
  // ==========================================
  
    { word: "batu" }, { word: "bola" }, { word: "buku" }, { word: "lori" }, { word: "meja" },
    { word: "baju" }, { word: "gigi" }, { word: "kaki" }, { word: "jari" }, { word: "mata" },
    { word: "topi" }, { word: "roti" }, { word: "susu" }, { word: "kuku" }, { word: "paku" },
    { word: "tali" }, { word: "feri" }, { word: "gula" }, { word: "lada" }, { word: "madu" },
    { word: "nasi" }, { word: "kopi" }, { word: "sudu" }, { word: "peta" }, { word: "rusa" },
    { word: "kera" }, { word: "kuda" }, { word: "sapi" }, { word: "guru" }, { word: "bapa" },
    { word: "pipi" }, { word: "bahu" }, { word: "biji" }, { word: "pasu" }, { word: "tisu" },
    { word: "kayu" }, { word: "raga" }, { word: "jala" }, { word: "guni" }, { word: "ibu" },
    { word: "api" }, { word: "ubi" }, { word: "apa" }, { word: "ada" }, { word: "isi" },
    { word: "itu" }, { word: "ini" }, { word: "uji" }, { word: "baca" }, { word: "bawa" },
    { word: "buka" }, { word: "beli" }, { word: "bina" }, { word: "cari" }, { word: "cuba" },
    { word: "cuci" }, { word: "cita" }, { word: "cuka" }, { word: "duga" }, { word: "daya" },
    { word: "gali" }, { word: "gila" }, { word: "gema" }, { word: "gaya" }, { word: "hawa" },
    { word: "hari" }, { word: "hati" }, { word: "hina" }, { word: "jaga" }, { word: "juri" },
    { word: "jiwa" }, { word: "kata" }, { word: "kena" }, { word: "kira" }, { word: "keji" },
    { word: "kiri" }, { word: "lalu" }, { word: "lima" }, { word: "luka" }, { word: "lari" },
    { word: "lawa" }, { word: "mula" }, { word: "mahu" }, { word: "moga" }, { word: "muda" },
    { word: "muka" }, { word: "nota" }, { word: "nadi" }, { word: "noda" }, { word: "pada" },
    { word: "pagi" }, { word: "padu" }, { word: "puji" }, { word: "ratu" }, { word: "raya" },
    { word: "reka" }, { word: "riba" }, { word: "rugi" }, { word: "satu" }, { word: "saya" },
    { word: "suka" }, { word: "sewa" }, { word: "tahu" }, { word: "tari" }, { word: "teko" },
    { word: "tiga" }, { word: "wira" }, { word: "yoyo" }, { word: "yoga" }, 
    { word: "bela" }, { word: "beza" }, { word: "biru" }, { word: "bucu" }, { word: "buta" },
    { word: "cara" }, { word: "ciri" }, { word: "curi" }, { word: "cuti" }, { word: "dagu" },
    { word: "daki" }, { word: "dosa" }, { word: "gari" }, { word: "goda" }, { word: "gusi" },
    { word: "hala" }, { word: "hulu" }, { word: "haba" }, { word: "jasa" }, { word: "jeti" },
    { word: "juga" }, { word: "kala" }, { word: "kaya" }, { word: "kota" }, { word: "kutu" },
    { word: "pama" }, { word: "duda" }, { word: "nona" }, { word: "buka" }, { word: "kita" },
    { word: "suci" }, { word: "sawi" }, { word: "padi" }, { word: "fasa" },
    { word: "hoki" }, { word: "mimi" }, { word: "geli" }, { word: "pari" }, { word: "feri" },
    { word: "mop" }, { word: "reba" }, { word: "beza" }, { word: "sana" }, { word: "sini" },
    { word: "suhu" }, { word: "paha" }, { word: "dahi" }, { word: "dana" }, { word: "suka" },
    { word: "raja" }, { word: "tugu" }, { word: "lap" },
    { word: "mari" }, { word: "sari" }, { word: "tugu" }, { word: "lidi" },
    { word: "sisi" }, { word: "titi" }, { word: "sara" }, { word: "lara" },
    { word: "mara" }, { word: "para" }, { word: "dara" },
     { word: "koko" }, { word: "soto" }, { word: "foto" },

  // ==========================================
  // TAHAP 2: WORDS ENDING IN CONSONANTS (Heavy focus on -p and -k)
  // ==========================================
  
    // --- TARGET CONSONANT: -K ---
    { word: "cicak" }, { word: "katak" }, { word: "badak" }, { word: "lobak" }, { word: "bilik" }, 
    { word: "sikat" }, { word: "cerek" }, { word: "anak" }, { word: "awak" }, { word: "otak" }, 
    { word: "ulat" }, { word: "pokok" }, { word: "budak" }, { word: "kakak" }, { word: "datuk" }, 
    { word: "poket" }, { word: "kasut" }, { word: "kotak" }, { word: "buku" }, { word: "masak" }, 
    { word: "ketuk" }, { word: "tengok" }, { word: "rosak" }, { word: "bedak" }, { word: "becak" }, 
    { word: "tombak" }, { word: "bengkak" }, { word: "semak" }, { word: "salak" }, { word: "pucuk" }, 
     { word: "tunjuk" }, { word: "sorok" }, { word: "banyak" }, 
    { word: "minyak" }, { word: "lemak" }, { word: "jinak" }, { word: "golek" }, { word: "kocak" }, 
    { word: "kopek" }, { word: "lepak" }, { word: "rosak" }, { word: "sejuk" },

    // --- TARGET CONSONANT: -P ---
    { word: "atap" },{ word: "intip" }, { word: "lipat" }, 
    { word: "asap" }, { word: "ucap" }, { word: "sayap" }, { word: "sedap" }, 
    { word: "kicap" }, { word: "siap" }, { word: "malap"}, { word: "tutup" }, { word: "kuncup" },
    { word: "senyap" }, { word: "lenyap" }, { word: "merayap" }, { word: "sedap" }, { word: "tetap" }, 
    { word: "harap" }, { word: "hidup" }, { word: "gugup" }, { word: "balut" }, 
    { word: "sirap" },{ word: "kakap" }, { word: "kerap" }, { word: "silap" }, 
    { word: "cukup" }, { word: "tutup" }, { word: "kuncup" }, { word: "garip" },

    // --- OTHER STABLE TAHAP 2 WORDS ---
    { word: "ayam" }, { word: "botol" }, { word: "cawan" }, { word: "daun" }, { word: "gajah" },
    { word: "ikan" }, { word: "pensel" }, { word: "rumah" }, { word: "tangan" }, { word: "jarum" }, 
    { word: "ketam" }, { word: "semut" }, { word: "lebah" }, { word: "lalat" }, { word: "siput" },
    { word: "ular" }, { word: "arnab" }, { word: "sayur" }, { word: "buah" }, { word: "timun" }, 
    { word: "bayam" }, { word: "kubis" }, { word: "cili" }, { word: "limau" }, { word: "jambu" }, 
    { word: "nanas" }, { word: "betik" }, { word: "pisang" }, { word: "epal" }, { word: "awan" }, 
    { word: "hujan" }, { word: "bulan" }, { word: "bumi" }, { word: "bukit" }, { word: "laut" }, 
    { word: "kolam" }, { word: "taman" }, { word: "pasar" }, { word: "kedai" }, { word: "kuil" }, 
    { word: "pagar" }, { word: "dapur" }, { word: "tilam" }, { word: "bantal" }, { word: "sabun" }, 
    { word: "baldi" }, { word: "gelas" }, { word: "garpu" }, { word: "kipas" }, { word: "kertas" }, 
    { word: "kamus" }, { word: "kain" }, { word: "sarung" }, { word: "bakar" }, { word: "basuh" }, 
    { word: "campak" }, { word: "cukur" }, { word: "giling" }, { word: "hantar" }, { word: "ikat" }, 
    { word: "jahit" }, { word: "jemur" }, { word: "kejar" }, { word: "mandi" }, { word: "minum" }, 
    { word: "makan" }, { word: "padam" }, { word: "tulis" }, { word: "ukur" }, { word: "ukir" }, 
    { word: "akar" }, { word: "alas" }, { word: "alun" }, { word: "aman" }, { word: "anda" },
    { word: "arah" }, { word: "asin" }, { word: "asuh" }, { word: "atas" }, { word: "awal" }, 
    { word: "ubat" }, { word: "ulam" }, { word: "ekor" }, { word: "obor" }, { word: "otot" }, 
    { word: "pahat" }, { word: "rebat" }, { word: "lebat" }, { word: "hebat" }, { word: "tebal" }, 
    { word: "bekal" }, { word: "kekal" }, { word: "kapal" }, { word: "gagal" }, { word: "mahal" }, 
    { word: "jahat" }, { word: "rehat" }, { word: "lihat" }, { word: "penat" }, { word: "minat" }, 
    { word: "ingat" }, { word: "pukat" }, { word: "lekat" }, { word: "sekat" }, { word: "dekat" }, 
    { word: "takat" }, { word: "bakat" }, { word: "sakat" }, { word: "kilat" }, { word: "silat" }, 
    { word: "gulat" }, { word: "solat" }, { word: "balat" }, { word: "pulas" }, { word: "kelas" }, 
    { word: "belas" }, { word: "selas" }, { word: "ulas" }, { word: "balas" }, { word: "malas" }, 
    { word: "talas" }, { word: "pantas" }, { word: "gantas" }, { word: "batas" }, { word: "getas" }, 
    { word: "panas" }, { word: "ganas" }, { word: "kemas" }, { word: "lemas" }, { word: "cemas" }, 
    { word: "remas" }, { word: "ramas" }, { word: "tamas" }, { word: "emas" }, { word: "beras" }, 
    { word: "teras" }, { word: "keras" }, { word: "deras" }, { word: "peras" }, { word: "paras" }, 
    { word: "marah" }, { word: "darah" }, { word: "parah" }, { word: "barah" }, { word: "karah" }, 
    { word: "murah" }, { word: "lurah" }, { word: "surah" }, { word: "purah" }, { word: "getah" }, 
    { word: "patah" }, { word: "ratah" }, { word: "jatah" }, { word: "matah" }, { word: "tatah" }, 
    { word: "basah" }, { word: "pasah" }, { word: "asah" },

  // ==========================================
  // TAHAP 3: TARGETED DIGRAPHS (ng, ny, sy, kh) & DOUBLE VOWELS (ai, ua, au, io, ia)
  // ==========================================
 
    // --- 1. DOUBLE VOWEL TARGETS (Combats 'kayin', 'beruwang', 'buwaya' traps) ---
    { word: "kain" }, { word: "beruang" }, { word: "buaya" }, { word: "daun" }, { word: "laut" },
    { word: "kait" }, { word: "main" }, { word: "suap" }, { word: "suara" }, { word: "kuasa" },
    { word: "buang" }, { word: "muat" }, { word: "buah" }, { word: "tuan" }, { word: "puan" },
    { word: "jauh" }, { word: "sauh" }, { word: "maut" }, { word: "taun" }, { word: "kaum" },
    { word: "biola" }, { word: "radio" }, { word: "tiup" }, { word: "liar" }, { word: "tiang" },
    { word: "siap" }, { word: "biasa" }, { word: "biar" }, { word: "siang" }, { word: "piano" },
    { word: "duat" }, { word: "luas" }, { word: "tuam" }, { word: "tuas" }, { word: "kuap" },
    { word: "suak" }, { word: "luak" }, { word: "kuak" }, { word: "ruap" }, { word: "muak" },

    // --- 2. DIGRAPH: "NG" ---
    { word: "singa" }, { word: "bintang" }, { word: "panggung" }, { word: "bawang" }, { word: "pisang" },
    { word: "burung" }, { word: "cacing" }, { word: "dinding" }, { word: "mangga" }, { word: "tangan" },
    { word: "bunga" }, { word: "singgah" }, { word: "tangga" }, { word: "taring" }, { word: "piring" },
    { word: "sarung" }, { word: "payung" }, { word: "karung" }, { word: "padang" }, { word: "lalang" },
    { word: "lubang" }, { word: "petang" }, { word: "dulang" }, { word: "gelang" }, { word: "hilang" },
    { word: "angker" }, { word: "nangka" }, { word: "cangkerang" }, { word: "angkasa" }, { word: "tunggal" },
    { word: "panggil" }, { word: "ganggu" }, { word: "pinggang" }, { word: "longgar" }, { word: "langgar" },
    { word: "tangkap" }, { word: "songkok" }, { word: "bengkok" }, { word: "singkat" }, { word: "angkat" },
    { word: "sengat" }, { word: "ingat" }, { word: "sangat" }, { word: "hangat" }, { word: "tunggau" },

    // --- 3. DIGRAPH: "NY" ---
    { word: "monyet" }, { word: "nyamuk" }, { word: "penyu" }, { word: "nyanyi" }, { word: "nyala" },
    { word: "nyawa" }, { word: "nyaris" }, { word: "nyata" }, { word: "nyaman" }, { word: "nyenyak" },
    { word: "minyak" }, { word: "banyak" }, { word: "penyek" }, { word: "punya" }, { word: "sunyi" },
    { word: "bunyi" }, { word: "kunyah" }, { word: "senyum" }, { word: "banyat" }, { word: "lenyap" },
    { word: "senyap" }, { word: "renyak" }, { word: "renyut" }, { word: "denyut" },
    { word: "kenyal" }, { word: "tonjol" }, { word: "nyalang" },

    // --- 4. DIGRAPH: "SY" & "KH" ---
    { word: "syarat" }, { word: "syabas" }, { word: "syurga" }, { word: "syirik" }, { word: "syampu" },
    { word: "syahdu" }, { word: "syawal" }, { word: "syukur" }, { word: "syeikh" }, { word: "syed" },
    { word: "khemah" }, { word: "khamis" }, { word: "khas" }, { word: "khasiat" }, { word: "khabar" },
    { word: "khidmat" }, { word: "khianat" }, { word: "khat" }, { word: "khusyuk" }, { word: "khamir" },

    // --- 5. CHALLENGING 3-4 SYLLABLE REPEATS (Mixed structural words) ---
    { word: "basikal" }, { word: "bendera" }, { word: "harimau" }, { word: "komputer" }, { word: "sekolah" },
    { word: "tembikai" }, { word: "zirafah" }, { word: "makanan" }, { word: "minuman" }, { word: "pakaian" },
    { word: "senaman" }, { word: "serigala" }, { word: "belalang" }, { word: "pepatung" }, { word: "kerengga" },
    { word: "merpati" }, { word: "kakaktua" }, { word: "tenggiri" }, { word: "cempedak" }, { word: "hospital" },
    { word: "tadika" }, { word: "restoran" }, { word: "jururawat" }, { word: "angkasawan" }, { word: "televisyen" },
    { word: "motosikal" }, { word: "selendang" }, { word: "melukis" }, { word: "mewarna" }, { word: "berenang" },
    { word: "keluarga" }, { word: "pahlawan" }, { word: "cendawan" }, { word: "kejora" }, { word: "mentari" },
    { word: "seluar" }, { word: "kemeja" }, { word: "kopiah" }, { word: "senjata" }, { word: "penjara" },
    { word: "mentega" }, { word: "kereta" }, { word: "selipar" }, { word: "bateri" }, { word: "kemarin" },
    { word: "perahu" }, { word: "keladi" }, { word: "delima" }, { word: "cerita" }, { word: "dahaga" }, 
    { word: "bahaya" }, { word: "rahsia" }, { word: "manusia" }, { word: "kerana" }, { word: "bahawa" }, 
    { word: "cahaya" }, { word: "bahasa" }, { word: "istana" }, { word: "celana" }, { word: "petola" }, 
    { word: "ketawa" }, { word: "budaya" }, { word: "kerjaya" }, { word: "percaya" }, { word: "selasa" }, 
    { word: "semalam" }, { word: "sebelum" }, { word: "sepasang" }, { word: "seterusnya" }, { word: "teratai" }, 
    { word: "merak" }, { word: "puteri" }, { word: "putera" }, { word: "tembaga" }, { word: "kenari" }
  ];
