## Portfolio 2.0

An enhanced-dynamic & responsive portfolio website, designed to effectively showcase my skills, projects, & resume to potential employers & peers, enhancing visibility & professional branding.

![Eshan Sud's Portfolio](https://res.cloudinary.com/dpjhwcj4q/image/upload/v1755773898/portfolio2.0_myyptt.png)

Deployed link: <a href="https://eshan-sud.vercel.app/" target="_blank"> here </a>

Tech stack:

- Next.js
- Tailwind CSS
- GSAP
- Framer Motion
- Supabase / PostgreSQL
- Cloudinary
- Vercel

---

Run the development server:

```bash
npm run dev
```

### Database Backup & Restore

The project includes integrated database backup and restore utilities:

**Export (Backup):**

```bash
npm run db:export
```

**Import (Restore):**

```bash
npm run db:import
```

**Features:**

- Complete database schema in `scripts/database/schema.sql`
- Automated data export/import scripts
- Supports JSON and SQL formats
- Batch processing for large datasets

For detailed documentation, see [scripts/database/README.md](scripts/database/README.md)

### Future Additions:

- [ ] FIX: GitHubActivityGraph hover functionality
- [ ] FIX: Cite this blur effect
- [ ] FIX: Project sample pictures
- [ ] Add accessibility
  - [ ] Language switcher
  - [ ] Auto-detect language
  - [ ] Reduced motion support — respect prefers-reduced-motion in GSAP/Framer Motion
  - [ ] High contrast mode — toggle stored in localStorage
- [ ] Add more features or functionalities
  - [ ] Cursor trail effect — you have CustomCursor.jsx, extend it with a particle trail
  - [ ] "Contact form" using nodemailer api
  - [ ] "View counter"
  - [ ] Print-friendly CV page - /cv route that renders a clean printable version via @media print
  - [ ] Admin dashboard - protected /admin route (NextAuth) to edit DB entries without SQL
  - [ ] Blog/Articles section - MDX-based or DB-backed, with tags, search, RSS feed
  - [ ] Email newsletter - "Subscribe for updates" using Resend audiences
- [ ] Touch-friendly interactive elements on mobile
- [ ] RAG-based ChatBot
- [ ] Use Prima/Redis for cache
