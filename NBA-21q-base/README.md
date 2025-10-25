# NBA 21 Questions — Pro Edition (Next.js + Tailwind + OpenAI)

A polished, modular build of NBA 21 Questions with:
- Next.js App Router (one repo for UI + API)
- Tailwind chat UI, hint button, restart, guess flow
- `/api/ask` using OpenAI (gpt-4o-mini) with strict JSON grounding
- Heuristic fallback if API fails
- Expanded `players.json` seed list

## Quickstart

```bash
npm install
cp .env.example .env.local
# put your OpenAI key in .env.local
npm run dev
# open http://localhost:3000
```

## Notes
- The model is **constrained**: it should answer only from the given JSON. Unknowns → `I don't know.`
- You can add more players by editing `public/players.json`.
- To deploy on Vercel: push this repo and set the `OPENAI_API_KEY` env var.
