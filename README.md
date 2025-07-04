# Modul 288 - Dokumentation
Kurzbeschreibung der Webapplikation

Die Webapplikation ist eine selbst programmierte Wordle-Variante mit Benutzeranmeldung, Wortprüfung und einer Rangliste.
Benutzer geben ein Wort ein und erhalten visuelles Feedback (grün, orange, grau) zu Position und Vorhandensein der Buchstaben.
Ziel ist es, das richtige Wort mit möglichst wenigen Versuchen zu erraten, um möglichst viele Punkte zu erhalten. Die Eingaben, Versuche und Ergebnisse werden ausgewertet und in einer Rangliste dargestellt.


<h1>Testprotokoll</h1>

<h2>1. Login und Benutzername wird übernommen</h2>
<img width="425" alt="image" src="https://github.com/user-attachments/assets/0597122e-c7e9-47a3-bbbd-b06b62eab368" />


Was wird getestet: Der eingegebene Benutzername wird übernommen und später in der Rangliste korrekt angezeigt.
Zweck: Identifikation des Spielenden und Zuweisung des Ergebnisses zur richtigen Person.
Ergebnis: Funktioniert korrekt – Name „Benaja-Test“ erscheint später als Ranglisten-Eintrag.


<h2>2. Ungültiges Wort wird abgelehnt</h2>
<img width="445" alt="image" src="https://github.com/user-attachments/assets/ff65ad7b-85bb-4357-8ee4-efea004aa6b6" />


Was wird getestet: Die Validierung eines eingegebenen Wortes gegen eine zugelassene Wörterliste.
Zweck: Verhindert, dass Fantasiewörter oder Tippfehler gespielt werden.
Ergebnis: Funktioniert – ungültiges Wort wird abgewiesen, Fehlermeldung erscheint.


<h2>Alle Versuche aufgebraucht – Spielende</h2>
<img width="454" alt="image" src="https://github.com/user-attachments/assets/fee87e57-5a20-4e32-8ed1-ec418c138fa0" />


Was wird getestet: Das Spielverhalten bei maximaler Anzahl an Versuchen ohne richtigen Treffer.
Zweck: Korrekte Beendigung des Spiels und Offenlegung des gesuchten Wortes.
Ergebnis: Funktioniert – nach 6 Versuchen erscheint die Meldung „Das Wort war: RUNDE“.


<h2>Richtige Eingabe – Spiel wird erfolgreich beendet</h2>
<img width="454" alt="image" src="https://github.com/user-attachments/assets/1c6f4a23-349a-4200-a16a-91667fff5406" />


Was wird getestet: Erkennung des korrekten Wortes und Abschluss des Spiels mit Erfolgsmeldung.
Zweck: Spielziel ist erreicht, Punktevergabe kann erfolgen.
Ergebnis: Funktioniert – das richtige Wort wird erkannt, der Punktestand wird berechnet.


<h2>Rangliste wird korrekt angezeigt</h2>
<img width="302" alt="image" src="https://github.com/user-attachments/assets/b8ca473a-84b9-46c0-be8a-1b0099b13c79" />


Was wird getestet: Speicherung und Anzeige aller gespielten Ergebnisse mit Benutzername, Versuchen, Wortlänge, Zeit und Punkten.
Zweck: Motivationssystem, Vergleich mit anderen Spielern.
Ergebnis: Funktioniert – die Rangliste enthält alle relevanten Informationen, sortiert korrekt nach Punkten.

<h1>Validator</h1>

<h2>index.html</h2>
![Screenshot 2025-06-19 104812](https://github.com/user-attachments/assets/40d29a2d-9294-4fe8-b2dc-806195b4da68)


<h2>game.html</h2>
![image](https://github.com/user-attachments/assets/de1e52ef-c3ac-4a5a-9cbe-a86c71ea6096)

<h2>style.css</h2>
![image](https://github.com/user-attachments/assets/25794321-eefa-40e4-a457-b34279b60d7b)

<h2>script.js</h2>
![image](https://github.com/user-attachments/assets/82d757d4-83ed-4391-8b7d-3bd5c8045065)


<h2>words.js</h2>
![image](https://github.com/user-attachments/assets/367e8673-6799-4fce-89e1-268d849014e5)

<h1>BBK-Kriterien</h1>
<h2>L.1</h2>
<h3>Die Applikation enthält ein funktionierendes Benutzer-Login mit Datenspeicherung im Local Storage.</h3>

<h2>L.2</h2>
<h3>Der Spieler kann die Spielschwierigkeit durch Auswahl der Wortlänge individuell anpassen.</h3>

<h2>L.3</h2>
<h3>Die Applikation enthält eine Echtzeit-Feedback-Funktion für falsche Wörter oder Eingaben.</h3>

<h2>L.4</h2>
<h3>Ergebnisse und Leistungen der Spieler werden gespeichert und als Rangliste visuell dargestellt.</h3>

<h2>L.5</h2>
<h3>Es liegt eine Meilensteinplanung vor.</h3>

<h1>Meilensteinplanung</h1>
![image](https://github.com/user-attachments/assets/6e482dd6-b7ae-4a03-adef-80b00119832f)
