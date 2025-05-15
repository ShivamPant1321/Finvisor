# FinVisor

**FinVisor** is your personal AI‐powered finance advisor. Track expenses, manage budgets, and get real‐time insights—all in one place.

## Features
- Sign up & sign in via Clerk
- Create and categorize budgets
- Log and review expenses
- AI‐powered financial advice
- Interactive charts & data visualization
- Dark & light theme toggle

## Tech Stack
- Next.js 13 (App Router)
- React & TypeScript
- Clerk for authentication
- Drizzle ORM + Neon serverless Postgres
- Framer Motion for animations
- Tailwind CSS for styling
- Sonner for toast notifications
- Recharts for charts

## Getting Started

1. Clone the repo  
   ```bash
   git clone https://github.com/your‐org/finvisor.git
   cd finvisor
   ```

2. Install dependencies  
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` at project root:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_…
   CLERK_SECRET_KEY=sk_…
   NEXT_PUBLIC_DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

4. Run the development server  
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

## Scripts
- `npm run dev` – start dev server  
- `npm run build` – create production build  
- `npm start` – start production server  
- `npm run lint` – run ESLint

## Deployment
1. Push to your Git provider.
2. Configure the same environment variables in your hosting platform (Vercel, Netlify, etc.).
3. Deploy—FinVisor works out of the box!

## Contribution
Contributions, issues, and feature requests are welcome.  
Feel free to check [issues page](https://github.com/your‐org/finvisor/issues).

## License
MIT © Your Name
