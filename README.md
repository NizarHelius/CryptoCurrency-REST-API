# CryptoScope

CryptoScope is a Next.js 16 application that displays global cryptocurrency data and allows users to save favorite coins. The project includes server API routes that proxy CoinGecko data and client UI components built with Tailwind CSS.

This repository was prepared for publishing from a local workspace.

## Quick start (development)

Requirements:
- Node.js 18+ (or compatible LTS)
- pnpm (recommended) or npm

Install dependencies and run the dev server:

```powershell
pnpm install
pnpm dev
```

Open http://localhost:3000 in your browser.

## Notes
- The app proxies data from the CoinGecko API via server routes in `app/api/*`. To reduce rate-limit issues, the server implements short caching and retries.
- Favorites are stored in localStorage and the Favorites page requests coin data by IDs to avoid excessive paging.

If you encounter issues pushing this repo to GitHub from your environment, make sure you have proper Git credentials (PAT or SSH key) configured.
