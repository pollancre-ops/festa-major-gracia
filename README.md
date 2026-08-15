# FestiGràcia — versió final

Web app de la Festa Major de Gràcia 2026 preparada per GitHub Pages.

## Funcions incloses
- Vista **Ara** i activitats de les pròximes 2 hores.
- Vista **Totes** amb cerca global.
- Selector de dies que elimina automàticament els dies ja passats.
- Les activitats de matinada continuen pertanyent a la jornada anterior fins a les 05:00.
- Data visible a cada activitat.
- Categories amb emoji propi.
- Cerca, filtres i “A prop meu”.
- Favorits compartits via Supabase amb el grup `gracia26-x7k9`.
- Còpia local dels favorits i cua offline.
- Les 110 activitats ressaltades en groc al document `GRACIA (1).docx` s’afegeixen una sola vegada com a favorits compartits inicials.
- Si després en desmarqueu una, no es torna a afegir automàticament.
- Analítica anònima de visites a la taula `visits` de Supabase.

## Analítica
Cada nova sessió de navegador registra:
- `visitor_id`: identificador anònim persistent del navegador.
- `device`: dispositiu i navegador aproximats.
- `page_url`: URL oberta.
- `created_at`: data i hora, generades per Supabase.

No registra noms ni identitats reals.

Per consultar-ho:
Supabase → Table Editor → `visits`

## Publicació
Puja tots els fitxers d’aquesta carpeta a l’arrel del repositori GitHub Pages.

La URL pública continua sent:
https://pollancre-ops.github.io/festa-major-gracia/

## Fitxers
- index.html
- style.css
- app.js
- activities.json
- manifest.json
- sw.js
- icon.svg
- README.md
