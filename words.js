const WORDS = {
    4: [
        "haus", "baum", "tuch", "geld", "buch", "kind", "tuer", "zeit", "land", "lied",
        "hand", "kopf", "fuss", "auge", "mund", "haar", "knie", "bein", "fisch", "vogel",
        "hund", "katz", "maus", "wolf", "loewe", "tiger", "baer", "ente", "rose", "lilie",
        "tulpe", "klee", "gras", "holz", "stein", "erde", "luft", "feuer", "wasser", "gold",
        "silber", "eisen", "glas", "salz", "zucker", "brot", "milch", "wein", "reis", "saft"
    ],
    5: [
        "apfel", "birne", "traube", "banane", "orange", "zitrone", "kirsche", "pflaume", "mango", "ananas",
        "blume", "wolke", "sonne", "regen", "schnee", "wind", "sturm", "himmel", "fluss", "strand",
        "stuhl", "tisch", "bett", "sofa", "lampe", "uhr", "bild", "stift", "papier", "essen",
        "trink", "schlaf", "lachen", "weinen", "gehen", "stehen", "sitzen", "laufen", "reden", "singen",
        "tanzen", "malen", "lesen", "schreib", "reisen", "kaufen", "verkauf", "lernen", "lehren", "freund",
        "familie", "liebe", "glueck", "trauer", "angst", "mut", "ruhe", "stress", "frieden", "musik",
        "sport", "spiel", "kunst", "natur", "leben", "tod", "zeit", "raum", "licht", "dunkel",
        "warm", "kalt", "gross", "klein", "schnell", "langsam", "neu", "alt", "gut", "boese",
        "schoen", "hässlich", "reich", "arm", "stark", "schwach", "hell", "dunkel", "leise", "spass"
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
        "kultur", "geschic", "traditi", "braucht", "kunst", "literat", "theater", "kino", "musik", "tanzen"
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