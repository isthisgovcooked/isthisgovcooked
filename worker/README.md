# GovCooked Chat Proxy — Cloudflare Worker

## Setup (one-time, 10 minutes)

### 1. Get a free Groq API key
- Go to console.groq.com
- Sign up free (no credit card)
- Create API key → copy it

### 2. Get a free Cloudflare account
- Go to cloudflare.com → sign up free
- No credit card required for Workers free tier

### 3. Create the KV namespace
- Cloudflare dashboard → Workers & Pages → KV
- Create namespace: "RATE_LIMIT_KV"
- Copy the namespace ID
- Paste into wrangler.toml replacing PASTE_YOUR_KV_NAMESPACE_ID_HERE

### 4. Deploy
```bash
npm install -g wrangler
wrangler login
npx wrangler secret put GROQ_API_KEY
# (paste your Groq key when prompted — stored encrypted, never in code)
npx wrangler deploy
```

### 5. Get your Worker URL
After deploy, Cloudflare gives you a URL like:
https://govcooked-chat-proxy.YOUR-SUBDOMAIN.workers.dev

### 6. Add to Next.js environment
In your Next.js project, create .env.local:
NEXT_PUBLIC_CHAT_PROXY_URL=https://govcooked-chat-proxy.YOUR-SUBDOMAIN.workers.dev

Add to .env.production (for Cloudflare Pages deploy):
NEXT_PUBLIC_CHAT_PROXY_URL=https://govcooked-chat-proxy.YOUR-SUBDOMAIN.workers.dev

## Free tier limits
- Cloudflare Workers: 100,000 requests/day — free forever
- Groq: 14,400 requests/day, 500,000 tokens/day — free forever
- Rate limit: 10 messages/visitor/day (configurable in chat-proxy.js)

## Updating the system prompt
Edit SYSTEM_PROMPT in chat-proxy.js and redeploy:
npx wrangler deploy
