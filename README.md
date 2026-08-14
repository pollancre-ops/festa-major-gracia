# FestiGràcia v7

Actualització de la web app de la Festa Major de Gràcia 2026.

## Selecció inicial

- Les **110 activitats ressaltades en groc** al document `GRACIA (1)(1).docx` s'afegeixen automàticament a **El meu pla**.
- Aquesta càrrega inicial es fa una sola vegada per al grup compartit i després els cors es poden afegir o treure normalment.
- Les activitats marcades com a **Ja hem fet** no es tornen a afegir al pla.


## Canvis principals

- Navegació inferior: **Programa · El meu pla · Ja hem fet**.
- Check `✓` disponible a totes les activitats.
- En marcar una activitat com a feta:
  - surt d'**El meu pla**;
  - passa a **Ja hem fet**;
  - es conserva encara que la data ja hagi passat.
- Les activitats passades desapareixen del **Programa** i d'**El meu pla**, però no de **Ja hem fet**.
- Estat **ARA** per activitats que estan en curs.
- **El meu pla** funciona com una agenda cronològica agrupada per dia.
- Avís visual quan dues activitats guardades se solapen.
- Data compacta sota l'hora: `DV 14`, `DS 15`, etc.
- El check i el cor són accions independents i visualment separades.
- La sincronització compartida es manté utilitzant el mateix backend. L'estat de “Ja hem fet” es desa amb un identificador separat.

## IMPORTANT abans de pujar a GitHub

`activities.json` **NO està inclòs en aquest paquet perquè no canvia**. Mantén al repositori el fitxer `activities.json` que ja tens, amb totes les activitats.

Puja/substitueix aquests fitxers:

- `index.html`
- `style.css`
- `app.js`
- `sw.js`
- `manifest.json`
- `icon.svg`
- `README.md`

No eliminis `activities.json`.
