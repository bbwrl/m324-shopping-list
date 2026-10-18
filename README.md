# Einkaufsliste (shared-shopping-list)

Eine kleine Next.js-App (Version 15, JavaScript) für eine gemeinsame Einkaufsliste. Wer eine Liste erstellt, erhält einen 6-stelligen Code. Mit diesem Code können andere der Liste beitreten und Artikel hinzufügen.

## Start

Benötigt Node.js 20 (siehe `.nvmrc`, z. B. `nvm use`).

```bash
npm ci          # Abhängigkeiten gemäss package-lock.json installieren
npm run dev     # Entwicklungsserver auf http://localhost:3000
npm run lint    # ESLint (next lint)
npm run build   # Produktions-Build
```

## Seiten

| Pfad        | Beschreibung |
|-------------|--------------|
| `/`         | Startseite mit Links zum Erstellen einer Liste und zum Beitreten. |
| `/register` | Erstellt per Knopfdruck eine neue Liste und zeigt den Code zum Teilen an. |
| `/join`     | Tritt einer Liste mit Code und Namen bei. |
| `/list`     | Fügt einer Liste (per Code) einen Artikel hinzu. Die Artikel werden hier nicht angezeigt. |

## API-Routen

Alle Routen akzeptieren nur `POST`.

| Route           | Body                      | Beschreibung |
|-----------------|---------------------------|--------------|
| `/api/register` | –                         | Legt eine leere Liste an und gibt `{ code }` zurück (die ersten 6 Zeichen einer UUID). |
| `/api/join`     | `{ code, memberName }`    | Fügt `memberName` zu den `members` der Liste hinzu; 404, wenn der Code unbekannt ist. |
| `/api/addItem`  | `{ code, itemName }`      | Fügt der Liste einen neuen Artikel hinzu; 404, wenn der Code unbekannt ist. |

## Datenmodell

Die Listen liegen in einem Objekt, das den Code als Schlüssel verwendet (`src/app/api/data.js`):

```js
shoppingLists = {
  "a1b2c3": {
    members: ["Anna", "Ben"],      // Namen aus /api/join
    items: [
      {
        id: 1730000000000,         // Date.now() beim Hinzufügen
        name: "Milch",
        reservedBy: null,          // wird beim Anlegen auf null gesetzt
        completed: false           // wird beim Anlegen auf false gesetzt
      }
    ]
  }
}
```

`reservedBy` und `completed` werden bisher nur beim Anlegen gesetzt. Es gibt noch keine Route, die sie ändert.

## Hinweise

- **Keine Persistenz:** Die Daten liegen nur im Arbeitsspeicher des Servers (`global.shoppingLists`) und sind nach einem Neustart weg.
- **Keine Tests:** Das Projekt enthält bisher keine automatisierten Tests. Die CI-Pipeline prüft nur Lint und Build (siehe «Übung W11»).

## Übung W11

Der Branch `uebung/w11-start` ist der Startpunkt für die Übung «Security in der Pipeline».

- Die CI-Pipeline (`.github/workflows/ci.yml`) prüft bisher nur Lint und Build.
- Die Datei `src/app/api/config.js` enthält absichtlich ein Test-Geheimnis. Es ist kein echter Schlüssel.
- Das `Dockerfile` verwendet bewusst ein älteres Basis-Image (`node:18`).
