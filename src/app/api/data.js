if (!global.shoppingLists) {
  global.shoppingLists = {}; // Gemeinsames Objekt für alle Routen
}

// Demo-Liste zum Ausprobieren, Code DEMO01
if (!global.shoppingLists.DEMO01) {
  global.shoppingLists.DEMO01 = {
    members: ['Anna', 'Ben', 'Chiara'],
    items: [
      { id: 1, name: 'Milch', reservedBy: null, completed: false },
      { id: 2, name: 'Brot', reservedBy: null, completed: false },
      { id: 3, name: 'Äpfel', reservedBy: null, completed: false },
      { id: 4, name: 'Nudeln', reservedBy: null, completed: false },
      { id: 5, name: 'Käse', reservedBy: null, completed: false }
    ]
  }
}

export const shoppingLists = global.shoppingLists;