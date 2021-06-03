# MyTravels.no

## Før du begynner:
Sjekk at du har installert siste versjoner av: `node js & firebase cli`

## Installering av MyTravels.no

For å installere MyTravels.no, følg disse stegene:

Installer npm packages:
```
npm install
```

Build:
```
npm run build
```

Deploye til Firebase:
```
npm run deploy
```

Starte web-applikasjonen:
```
npm start
```

## Miljøvariabler 
Miljøvariabler er ikke inkludert i env-fil og API'ene ligger derfor i koden,
ettersom det står i oppgaventeksten at vi skal poste oppgaven i public-git-rep
der env-filer ikke vises så tenkte jeg dette var best i tilfelle sensor må hente
back-up koden min fra github og få den til å funke.


## Funksjonalitet og implementering: 

Bruk av ReactJS, Firebase Autentisering, Firestore & Bootstrap

1. Applikasjonen lar brukeren logge inn, registrere seg & logge ut.
3. Inneholder en informasjons-popup som forklarer bruken av applikasjonen.
4. Består av et Mapbox kart med markeringer og en searc geocoder.
5. Lar deg søke, legge til, oppdatere, slette & dele destinasjoner.
6. En velkomst pop-up som møter deg første gang du tar i bruk applikasjonen.
7. Simple animasjoner når du logger inn, registrerer deg & når destinasjon-pop-upen vises.
8. Inneholder en dropdown menu i venstre hjørne med en liste over lagrede destinasjoner på kartet.
9. Applikasjonen er fullstendig responsiv ned til kravet på 320px, den er også accessible med tabs.

