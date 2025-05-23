# Pokedex Project

## Project Description

This project is a Pokedex application, inspired by a challenge from Theo, that allows users to view and interact with Pokemon data. It's divided into three main parts, each demonstrating different ways to access and display Pokemon information.

**Tech Stack:**

* **Frontend:** Typescript, Next.js, Material UI
* **Backend:** Typescript, Express.js, Prisma, SQL
* **Data Fetching:** tRPC (React Query)

## Features

The application provides the following functionalities:

**Part 1: Single Pokemon Retrieval**

* Retrieves a single Pokemon from the database based on its name.
* Displays the Pokemon's ID, name, types, and sprite image.
* Implements a form to input a Pokemon name.
* Uses a reusable `<PokemonRow />` component to display the Pokemon data.

**Part 2: Multiple Pokemon Retrieval**

* Retrieves multiple Pokemon from the database based on an array of names.
* Displays the Pokemon data in a table format.
* Implements a form to input an array of Pokemon names.
* Uses a `<PokedexTable />` component to display the Pokemon data.

**Part 3: Pokemon Filtering by Type**

* Retrieves Pokemon from the database based on their type.
* Allows users to filter Pokemon by selecting a type.
* Displays the filtered Pokemon data in a table format.
* Implements a `<PokemonTypeSelection />` component for type selection.
* Uses a `<FilterablePokedexTable />` component to combine the type selection and table display.

## Backend Routes

The backend is built using Express.js and provides the following routes:

* **`GET /`**:  Health check route.  Returns "✅ Server is alive and working!".
* **`GET /pokemons`**: Retrieves all Pokemon from the database.
    * Returns: An array of Pokemon objects.
* **`GET /pokemons/:name`**: Retrieves a single Pokemon by its name (case-insensitive).
    * `name`: The name of the Pokemon to retrieve.
    * Returns: A single Pokemon object if found, or a 404 error if not found.
* **`POST /pokemon`**: Retrieves multiple Pokemon by an array of names (case-insensitive).
    * `body`:  `{ names: string[] }` - An array of Pokemon names.
    * Returns: An array of Pokemon objects.
* **`GET /pokemons/type/:type`**: Retrieves Pokemon by their type.
    * `type`: The type of Pokemon to retrieve.
    * Returns: An array of Pokemon objects that match the specified type.

## How to Run the Project

1.  **Backend:**
    * Ensure you have a NoSQL database set up and configured.
    * Use Mongoose to define and manage your database schema.
    * Run the backend server (e.g., using `node server.js` or `npm start`, depending on your setup).  The provided code snippet uses Express.js and assumes you have a `Pokemon` model defined using a database ORM (like Prisma).  You'll need to set up your database connection and Prisma schema accordingly.
    * Backend URL:  [https://madverse-pokimon.onrender.com](https://madverse-pokimon.onrender.com)

2.  **Frontend:**
    * Clone the frontend repository.
    * Install the necessary dependencies (e.g., using `npm install` or `yarn install`).
    * Configure the frontend to communicate with the backend API.  This usually involves setting an environment variable with the backend URL.
    * Run the frontend application (e.g., using `npm run dev` or `yarn dev`).
    * Frontend URL: [https://vercel.com/abhay-kawles-projects/madverse-pokimon](https://vercel.com/abhay-kawles-projects/madverse-pokimon)

## Project Structure

The project is structured as follows:

* `backend/`: Contains the backend code (Node.js, Express, Mongoose).
    * `models/`: Contains the database models (e.g., `pokemon.js`).
    * `routes/`: Contains the API routes (e.g., `pokemon.js`).
    * `server.js` (or similar):  The main server file.
* `frontend/`: Contains the frontend code (React.js, React, Material UI).
    * `components/`: Contains the React components (e.g., `PokemonRow.tsx`, `PokedexTable.tsx`, `PokemonTypeSelection.tsx`, `FilterablePokedexTable.tsx`).
    * `pages/`: Contains the React.js pages for the different sections of the application.
    * `utils/` or `lib/`:  Contains utility functions and tRPC setup.

## Notes

* The backend code snippet you provided uses `require()` and assumes a CommonJS module system.  A full Next.js/Prisma project would likely use ES modules (`import`/`export`).
* Error handling is included in the backend routes to handle cases where a Pokemon is not found or an error occurs during the database query.
* The project uses tRPC for communication between the frontend and backend, providing a type-safe way to access data.
* The frontend uses Material UI for the user interface components.
* The project implements case-insensitive search for Pokemon names.
* The project addresses the Pokedex problem in 3 parts as requested.
* The README provides information about how to run the project, the routes, and the project structure.
