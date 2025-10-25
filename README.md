# NBA 21 Questions – AI-Driven Game

A fun, interactive "21 Questions" game where you guess NBA players based on yes/no questions, powered by an AI model running locally (no API key needed). The game answers using structured data about each player, with fallback logic for unclear queries.

## Features
- **Offline AI model**: Uses **Ollama** to run a locally stored LLM (`llama3.1:8b`).
- **Fast & responsive**: Chat-style UI built with **Next.js** and **TailwindCSS**.
- **Strict data grounding**: The model only answers based on the provided player data (no hallucinations).
- **Hints**: Get hints about a player's height, position, teams, and more.
- **Fallback logic**: Uses a rule-based system when the AI cannot answer.

## Setup & Installation

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Download and set up Ollama**:
    - Download Ollama from [ollama.com](https://ollama.com/).
    - Run `ollama serve` in your terminal to start the local AI model server.
    - Pull the model using:
      ```bash
      ollama pull llama3.1:8b
      ```

3. **Set up environment variables**:
    - Create a `.env.local` file and add your API key for other models (optional). For local Ollama, no key is needed.

4. **Run the development server**:
    ```bash
    npm run dev
    ```

5. **Visit the game**:
    Open your browser and go to `http://localhost:3000`.

## Game Instructions
- Ask yes/no questions about an NBA player, and the AI will try to guess who it is.
- If you’re stuck, use the **Hint** button for a random fact about the player.
- You can also guess the player at any time.

## Notes
- The game uses **Ollama** for local AI inference, meaning there are no API calls or costs involved.
- You can add more players to the game by editing `public/players.json`.

## License
MIT License.
