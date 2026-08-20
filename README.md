# KYNECTED Next.js migration

This project converts the existing static HTML/CSS/JavaScript site into a Next.js App Router application while keeping the current visual layout.

## Security changes

- The Formspark endpoint is no longer present in browser HTML or JavaScript.
- The reCAPTCHA **secret key** is only read in server Route Handlers.
- The browser only receives the reCAPTCHA **site key**, which is meant to be public.
- Contact and event forms now post to `/api/contact` and `/api/events`.
- Server-side validation checks input length, email format, allowed origin and reCAPTCHA.
- Honeypot fields reject basic automated form spam.
- The old `kynected-admin` keyboard shortcut and browser `localStorage` registration database have been removed.
- Security headers are configured in `next.config.ts`.
- `.env*` files containing secrets are ignored by Git.

No web framework can make a public website "vulnerability free". Keep dependencies updated, rotate any secret that was previously committed publicly, and use your host's firewall/rate-limit controls.

## Important: GitHub vs hosting

GitHub can store the source repository, but **GitHub Pages is static hosting**. It cannot run the secure POST Route Handlers in this project.

Recommended setup:

1. Keep the code in GitHub.
2. Deploy the GitHub repository to Vercel.
3. Store secret environment variables in Vercel, not in GitHub and not in client code.

## VS Code folder layout

```text
kynected-nextjs/
├─ app/
│  ├─ api/
│  │  ├─ contact/route.ts
│  │  └─ events/route.ts
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ robots.ts
│  └─ sitemap.ts
├─ components/
│  └─ SiteClient.tsx
├─ lib/
│  ├─ homeMarkup.ts
│  └─ security.ts
├─ public/
│  └─ images/
├─ .env.example
├─ .gitignore
├─ next.config.ts
├─ package.json
└─ tsconfig.json
```

## Copy your images

Your uploaded files did not include the `images` folder. Copy the existing website images into:

```text
public/images/
```

For example:

```text
public/images/Kynected_trans_logo.png
public/images/3dk1_trans.png
public/images/IMG_0779.png
```

## Local setup in Visual Studio Code

Open a terminal in VS Code and run:

```bash
cd kynected-nextjs
npm install
```

Create your private environment file:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=YOUR_PUBLIC_SITE_KEY
RECAPTCHA_SECRET_KEY=YOUR_PRIVATE_SECRET
FORMSPARK_ENDPOINT=YOUR_PRIVATE_FORMSPARK_ENDPOINT
ALLOWED_ORIGINS=http://localhost:3000,https://kynected.co.uk,https://www.kynected.co.uk
```

Then run:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## GitHub

Before the first push:

```bash
git init
git add .
git commit -m "Migrate KYNECTED to secure Next.js app"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Do **not** add `.env.local` to Git.

## Vercel

Import the GitHub repository into Vercel.

In **Project > Settings > Environment Variables**, add:

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`
- `FORMSPARK_ENDPOINT`
- `ALLOWED_ORIGINS`

Deploy.

Then point `kynected.co.uk` to the Vercel project and add the production domain to your reCAPTCHA allowed domains.

## Rotate exposed secrets

If a genuine secret key was ever committed to the old public GitHub repository, remove it from current code **and rotate/revoke the old key**. Removing it from one file does not make the historical value secret again.
