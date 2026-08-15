# FestiGràcia v11

Basada directament en la v10 estable, conservant-ne totes les funcionalitats i l’estat compartit.

## Canvis
- Navegació: **Programa · El meu pla · Ja hem fet**.
- Check independent a totes les activitats.
- En marcar una activitat com a feta, desapareix de **Programa** i **El meu pla** i queda a **Ja hem fet**.
- **Ja hem fet** conserva les activitats encara que la data ja hagi passat.
- Data compacta sota l'hora: `DV 14`, `DS 15`, etc.
- Estat **ARA** a les activitats en curs.
- **El meu pla** ordenat cronològicament i agrupat per dies.
- Avís de solapament entre activitats del pla.
- 110 activitats ressaltades en groc al document original incorporades com a favorits inicials.
- Sincronització compartida en un espai nou `gracia26-clean-v10`, separat dels estats corruptes de versions anteriors.
- Els canvis locals pendents tenen prioritat sobre lectures antigues del servidor.
- `activities.json` inclòs i validat (752 activitats).

## Publicació a GitHub Pages
Substitueix **tots els fitxers** del repositori pels d'aquest paquet. En aquesta versió també s'inclou `activities.json`, així que no cal conservar-ne cap fitxer de versions anteriors.

Després de publicar, fes una recàrrega forçada (`Cmd + Shift + R`) una vegada.


## Afegit a v11: analítica anònima
- Registra una visita per sessió de pestanya a la taula `visits` de Supabase.
- Desa `visitor_id` anònim persistent, dispositiu/navegador aproximat i URL.
- No registra noms, correus ni identitat real.
- Manté sense canvis el grup compartit `gracia26-clean-v10`, per no perdre els favorits ni els elements de “Ja hem fet”.
