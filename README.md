# Rick and Morty Wiki

Primera parte del trabajo integrador de Arquitectura Web (Universidad CAECE, 2026): Actividad 2, consumir una API abierta.

Integrantes: Ramiro Lazzaro, Francisco Hernandez y Manuel Muñoz.

Es una aplicación en Angular que usa [The Rick and Morty API](https://rickandmortyapi.com). Tiene:

- Personajes de a 20, con paginación, búsqueda por nombre y filtro por estado.
- Un botón que muestra un personaje al azar.
- Episodios por temporada y, al elegir uno, los personajes que aparecen.
- Un login simulado con señales.

## Cómo correrlo

```bash
npm install
ng serve
```

Después abrir http://localhost:4200

## Deploy

```bash
ng build
```

Se sube a Netlify la carpeta `dist/rickmorty-app/browser`.
