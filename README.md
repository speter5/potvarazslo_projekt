

# Pótvarázsló

Pótvarázsló egy autós fórum ahova szerelők tudnak regisztrálni és feltölteni szerviz manuálokat és videókat többi szerelőnek vagy átalános
autó tulajdonosoknak. 

## Telepítési követelmények

- [**Xampp**](https://www.apachefriends.org/hu/download.html)
- [**Node.js**](https://nodejs.org/en/download)

**Telepítését ezzel a folyamattal kezdhetjük el**

Tölsd le a forráskódot:

```bash
git clone https://github.com/speter5/potvarazslo_projekt.git
cd potvarazslo_projekt
```

**Importáld be MySQL adatbázisba az alábbi potvarazslo2.sql fájlt**

Telepítsd a szükséges szoftverek aztán indítsd el a szervereket:

```bash
cd backend
npm install
node index.js
```

```bash
cd frontend
npm install
npm run build
npm run start
```

Sikeres telepítés után a szoftver elérhető lesz a http://127.0.0.1:3000 címen!

## A belépéshez használható adatok:

> email: "admin@admin"

> jelszó: "admin"
