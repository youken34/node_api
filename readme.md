J'ai conçu le modèle pour les flippers en intégrant toutes les caractéristiques essentielles, mais j'ai omis initialement la propriété "stock".
Par ailleurs, j'ai structuré les marques dans une collection distincte.
Cela permet de les associer facilement aux flippers sans répéter les informations sur les fabricants.

Optimisations possibles :

- Utiliser un système de pagination pour limiter les requêtes
- Utiliser un système de filtre pour les flippers quant aux marques, noms, prix etc...

### Requête POST pour créer un nouveau flipper

Endpoint: `http://localhost:3000/api/flippers`

```json
{
  "title": "Flipper Marvel Super Heroes: Ultimate Edition",
  "price": 17000,
  "état": "Neuf",
  "contactInfo": "Nous consulter",
  "features": {
    "releaseDate": "2024-04-10T00:00:00.000Z",
    "moreInfo": "Pour plus d'informations, appelez le :",
    "phoneNumber": "03 45 67 89 01"
  },
  "marqueId": "66742c473758d8221968d751", // L'id de la marque ici
  "notes": "Les prix peuvent varier en fonction des conditions du marché."
}
```

Endpoint: `http://localhost:3000/api/marques`

```json
{
  "nom": "Williams Electronics",
  "logo": "https://example.com/williams_logo.png",
  "description": "Guide de démarrage de Williams Electronics (2)"
}
```
