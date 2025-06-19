const WORDS = {
    4: [
        "aber", "alle", "also", "auge", "auto", "bach", "baum", "bein", "berg", "bett", "bild", "blau",

        "brot", "buch", "chef", "club", "dach", "dame", "dank", "dieb", "ding", "dorf", "duft", "dunk",

        "eben", "echt", "egal", "eher", "eier", "eile", "ende", "erne", "esel", "fahl", "fahr",

        "falt", "fand", "fast", "fett", "fiel", "film", "floh", "flur", "froh", "fund", "gabe", "ganz",

        "gart", "gase", "gast", "gaul", "geld", "gern", "glas", "gold", "grab", "gram", "gras", "grau",

        "grün", "halb", "hall", "hals", "hand", "hart", "haus", "haut", "herz", "hieb", "hoch", "hose",

        "huhn", "hund", "idee", "irrt", "jagd", "jahr", "joke", "jung", "kalt", "kamm", "kant", "keks",

        "kino", "klug", "koch", "kopf", "korn", "kram", "krug", "kuss", "lang", "lauf", "leer",

        "leid", "leim", "lieb", "lied", "loft", "luke", "luft", "lust", "mahl", "mark", "maus",

        "mehr", "mein", "mild", "mund", "name", "nase", "nein", "netz", "ofen", "park", "pfad",

        "plan", "post", "raum", "rund", "rose", "ruhm", "ruhe", "sack", "samt", "sand", "satt", "sehr",

        "seil", "sinn", "sitz", "sofa", "sohn", "solo", "soll", "sorg", "spuk", "spur", "stab",

        "stau", "steg", "takt", "team", "teil", "tier", "tief", "tipp", "toll", "tuch",

        "ufer", "vage", "viel", "voll", "wahl", "wald", "wand", "warm", "welt", "wert", "wien",

        "wild", "wind", "witz", "wolf", "wort", "wurm", "zahn", "zart", "zeit", "zelt", "zoll", "zorn"

],
    5: [
        "abend", "apfel", "aroma", "basis", "bauch", "beton", "blume", "brief", "bruch", "buben",
        "creme", "danke", "decke", "dinge", "dreht", "durst", "ebene", "eigen", "engel",
        "erste", "exakt", "farbe", "faser", "fazit", "feile", "feuer", "fluss", "frage", "frech",
        "front", "fuchs", "funke", "gabel", "geben", "gehen", "geier", "geige", "glanz",
        "grade", "haken", "handy", "haben", "heben", "heiss", "hobby", "holen",
        "immer", "irren", "jagen", "jeder", "joker", "kabel", "karte", "kasse", "kette",
        "knopf", "koala", "kreis", "lampe", "leben", "leise", "licht", "liebe", "limit",
        "liste", "macht", "maler", "masse", "miete", "milch", "moral", "motor", "mutti", "nagel",
        "narbe", "nebel", "nervt", "notiz", "nudel", "offen", "opfer", "orgel", "paket", "panne",
        "papst", "party", "pause", "pegel", "piano", "pixel", "pokal", "power", "preis", "punkt",
        "puppe", "putze", "radio", "raten", "rauch", "reden", "regen", "reise", "rinde",
        "ringe", "rosen", "runde", "saite", "sauce", "schaf", "schal", "schuh", "sinne", "spass",
        "spiel", "spitz", "sport", "start", "stein", "stern", "stock", "stier",  "sturm", "stadt", "tafel", "tante",
        "taube", "tempo", "tenor", "tiger", "tisch", "titel", "trank", "trink", "tropf", "unser",
        "vater", "vogel", "waffe", "wange", "wecke", "weine", "welle", "werke", "winde", "wirre",
        "wolke", "zebra", "zange", "zeige", "zeile", "zitat", "zivil", "zunge", "zutat", "zwerg"
    ],
    6: [
        "garten", "schule", "kirche", "bruecke", "strasse", "fenster", "spiegel", "schrank", "teppich", "vorhang",
        "computer", "telefon", "internet", "programm", "software", "hardware", "netzwerk", "server", "monitor", "tastatur",
        "mauspad", "drucker", "scanner", "kamera", "mikrofon", "lautspr", "bildsch", "festpl", "prozess", "speicher",
        "energie", "strom", "benzin", "diesel", "wasser", "abfall", "recycl", "umwelt", "klima", "wetter",
        "gesund", "kranken", "doktor", "apothe", "medizi", "therap", "patient", "pflege", "krankh", "symptom",
        "geburt", "kindhei", "jugend", "erwach", "alter", "familie", "ehepar", "geschwi", "eltern", "kinder",
        "grossel", "enkelki", "verwand", "nachbar", "kollege", "chef", "angeste", "kunde", "verkaeu", "dienstl",
        "politik", "regieru", "parlame", "demokra", "wahl", "partei", "gesetz", "gericht", "polizei", "armee",
        "wirtschaft", "finanze", "handel", "markt", "firma", "geschaef", "produkt", "dienstl", "werbung", "verkauf",
        "kultur", "geschic", "traditi", "braucht", "kunst", "literat", "theater", "kino", "musik", "himmel",
    ],
    7: [
        "abenteuer", "bibliothek", "universum", "galaxis", "planet", "stern", "komet", "meteor", "astronaut", "teleskop",
        "mikroskop", "wissenschaft", "forschung", "experiment", "entdeckung", "erfindung", "technologie", "innovation", "roboter", "kuenstlich",
        "intelligenz", "algorithmus", "datenbank", "netzwerk", "sicherheit", "verschluesselung", "authentifizierung", "autorisierung", "protokoll", "kommunikation",
        "information", "wissen", "bildung", "lernen", "studium", "pruefung", "diplom", "zertifikat", "karriere", "beruf",
        "unternehmen", "management", "strategie", "planung", "organisation", "produktion", "qualitaet", "marketing", "vertrieb", "kundenservice",
        "finanzen", "investition", "budget", "analyse", "prognose", "risiko", "gewinn", "verlust", "steuer", "bank",
        "versicheru", "immobilie", "miete", "kauf", "verkauf", "vertrag", "recht", "gesetz", "gerechtigk", "verbrechen",
        "strafe", "gefaengnis", "freiheit", "gleichheit", "toleranz", "respekt", "vertrauen", "verantwortung", "pflicht", "ethik",
        "philosophie", "religion", "spiritualitaet", "meditation", "yoga", "gesundheit", "ernaehrung", "fitness", "sportart", "wettkampf",
        "olympiade", "meistersc", "rekord", "training", "wettbewerb", "erfolg", "misserfolg", "motivation", "inspiration", "kreativitaet"
    ],
    8: [
        "architektur", "ingenieurwesen", "mathematik", "physiker", "chemiker", "biologie", "geologie", "astronomie", "psychologie", "soziologie",
        "anthropologie", "archaeologie", "geschichte", "geographie", "literatur", "linguistik", "philosophie", "theologie", "kunstgesch", "musikwiss",
        "theaterwiss", "filmwiss", "medienwiss", "kommunik", "journalism", "publizist", "marketing", "werbewirt", "oeffentlic",
        "beziehung", "personalwe", "finanzman", "rechnungsw", "controlling", "wirtschafts", "informatik", "elektrotec", "maschinenb", "bauingenie",
        "umwelting", "verkehrsp", "stadtplan", "landschaft", "architekt", "innenarch", "produktdes", "modedesign", "grafikdes", "webdesign",
        "softwareen", "datenbanke", "netzwerkad", "systemadmi", "it-berater", "projektman", "qualitaetss", "kundenserv", "vertriebsl", "geschaeftsf",
        "unternehme", "selbststaen", "freiberuf", "beratung", "schulung", "coaching", "training", "workshop", "seminar", "konferenz",
        "symposium", "kongress", "ausstellu", "messe", "festival", "konzert", "auffuehru", "lesung", "vortrag", "diskussion",
        "debatte", "gespraech", "interview", "reportage", "dokumentat", "biografie", "autobiog", "memoiren", "tagebuch", "briefsamml"
    ]
};

const VALID_WORDS = {};
for (const length in WORDS) {
    WORDS[length].forEach(word => {
        VALID_WORDS[word.toUpperCase()] = true;
    });
}