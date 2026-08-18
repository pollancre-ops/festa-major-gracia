# FestiGràcia v14.3

Agenda mòbil de la Festa Major de Gràcia 2026.

## Novetats de la v14

- Nova pestanya **Carrers** amb els 23 carrers/places guarnits facilitats per l'usuari.
- Cada carrer mostra el nom, el tema, una breu descripció i un enllaç a Google Maps.
- Es pot marcar cada carrer com a **visitat**.
- Els carrers visitats es guarden només al `localStorage` de cada navegador.
- Filtres propis de Carrers: **Tots · Pendents · Visitats**.
- Comptador de carrers visitats.
- Barra inferior: **Programa · Carrers · El meu pla · Ja he fet**.
- Text d'El meu pla: **L’agenda de les festes de Gràcia ’26.**
- Nou avís d'actualització:
  “Ara pots consultar els carrers guarnits des d’una nova pestanya i marcar-los com a visitats per portar-ne el compte. Atentament, Lara i Miquel ❤️”
- La resta del funcionament de la v13 es manté: mode públic local, mode privat compartit, Supabase per al pla privat i analítica de visites.

## Enllaços

Públic:
`https://pollancre-ops.github.io/festa-major-gracia/`

Privat:
`https://pollancre-ops.github.io/festa-major-gracia/?group=gracia26-clean-v10`

## Fitxers

- index.html
- style.css
- app.js
- activities.json
- streets.json
- highlight_ids.json
- manifest.json
- manifest-private.json
- sw.js
- icon.svg

## Ajustos v14.1

- La icona de **Carrers** passa a ser `⌂`.
- A la pestanya **Carrers** s'amaga la capçalera promocional, les dates, `Ara / Tot el dia`, `A prop meu` i els filtres de categories.
- A dalt de **Carrers** només queden la cerca i els controls propis `Tots · Pendents · Visitats` amb el comptador.

## Ajustos v14.2

- A la pestanya **Carrers** queden ocults de manera estricta:
  - dates
  - `Ara / Tot el dia`
  - `A prop meu`
  - filtres de categories
  - capçalera gran
- El **buscador es manté visible i transversal** a totes les pestanyes.
- El buscador continua cercant **només activitats**, també quan l'usuari és a `Carrers`.
- Quan s'esborra la cerca des de `Carrers`, torna a aparèixer automàticament el llistat de carrers.

## Ajustos v14.3

- La pestanya **Carrers** recupera el banner superior.
- Copy de Carrers: **“Porta el compte dels carrers que ja has visitat.”**
- Copy d'El meu pla: **“La teva agenda de les festes de Gràcia.”**
