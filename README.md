# Vibe Matcher

Vibe Matcher is a small Vite + React prototype that demonstrates a simple "vibe"-based product matching experience. It includes a UI, sample product data, and an example serverless function for generating embeddings.

Live demo: https://vibe-matcher-three.vercel.app/

## Features

- React + Vite frontend scaffolded with TypeScript
- UI components (shadcn-style) under `src/components/ui`
- Supabase integration (client in `src/integrations/supabase`)
- Example serverless function for generating embeddings: `supabase/functions/generate-embedding`

## Quickstart

Prerequisites

- Node.js 16+ and npm (or your preferred package manager)
- (Optional) Supabase project if you want the backend integration to work

Install and run locally

```bash
# Clone the repo
git clone <YOUR_GIT_URL>
cd "Vibe Matcher"

# Install dependencies
npm install

# Start the dev server (hot reload)
npm run dev
```

Build and preview

```bash
# Produce an optimized build
npm run build

# Serve the production build locally
npm run preview
```

Linting

```bash
npm run lint
```

## Environment variables

This project uses Vite environment variables for Supabase. Create a file named `.env.local` (or `.env`) in the project root with the following values:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
```

See `src/integrations/supabase/client.ts` for how these are consumed.

If you wire up OpenAI or another embeddings provider, add the required keys as `VITE_...` variables as well and keep secrets out of source control.

## Project structure (high level)

- `src/` — React app source
	- `components/` — UI components and small atoms
	- `integrations/supabase/` — Supabase client and types
	- `pages/` — Route components
- `supabase/functions/` — serverless function examples (embedding generation)

## Notes about the assignment / prototype

This repository was created as a prototype for a "Vibe Matcher" demo: take a free-text vibe query, convert it to an embedding, and match it with product embeddings (cosine similarity) to return the top-N hits. The implementation includes:

- Example data and UI for querying vibes
- An example embedding generator function at `supabase/functions/generate-embedding/index.ts`
- Supabase client wiring for session/storage

If you want to reproduce the original experimental notebook steps (data prep, embeddings, vector similarity), consider these next tasks:

1. Prepare a small dataset of product descriptions and generate embeddings (OpenAI or other provider).
2. Store embeddings in a vector store (Supabase Vector or Pinecone) and query using cosine similarity.
3. Add fallback handling for low-similarity results and evaluate results with a few queries.

## Contributing

Contributions are welcome. Open an issue or a PR with a short description of the change.


