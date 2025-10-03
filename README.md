# SSCAcademy
Smart and Sustainable Communities Academy - Cagayan Valley

A Next.js 13+ application designed for the Smart and Sustainable Communities Program of DOST Region 2, providing online learning resources, course management, and certificate verification.

## Features

*   **Course Management:** Browse, enroll in, and complete courses organized into modules and lessons.
*   **Learning Paths:** Follow structured learning paths.
*   **Progress Tracking:** Monitor learning progress, time spent, and lesson completion.
*   **Certificate Issuance:** Earn and download certificates upon course completion.
*   **Certificate Verification:** Verify the authenticity of certificates using unique IDs and verification hashes.
*   **User Authentication:** Secure login and registration system (likely via Supabase Auth).
*   **Responsive Design:** Built with Tailwind CSS for adaptability across devices.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (v13+ with App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** Reusable components (located in `components/`)
*   **Database:** [Supabase](https://supabase.com/) (PostgreSQL backend)
*   **Authentication:** Supabase Auth
*   **Database Client:** Supabase JavaScript/TypeScript Library (`@supabase/supabase-js`)
*   **UI Icons:** [Lucide React](https://lucide.dev/)
*   **State Management:** React Hooks (useState, useEffect, etc.)
*   **API Routes:** Next.js API routes (located in `app/api/`)
*   **PDF Handling:** Likely involves `pdfjs-dist` or similar for client-side viewing and `pdfkit` for generation (in backend/api routes).

## Project Structure

smart-city-elearning/ # Root project directory
├── app/ # Next.js App Router pages and layouts
│ ├── admin/ # Admin dashboard (if applicable)
│ ├── api/ # API routes (analytics, certificates, courses, etc.)
│ ├── certificates/ # Certificate related pages (verify, download)
│ ├── courses/ # Course listing, individual course pages, modules
│ ├── dashboard/ # User dashboard
│ ├── learning-paths/ # Learning path pages
│ ├── login/ # Login page
│ ├── register/ # Registration page
│ └── verify/ # Generic verification page (if used)
├── components/ # Reusable UI components (admin, auth, certificates, courses, dashboard, ui)
├── hooks/ # Custom React hooks
├── lib/ # Utility functions (database queries, Supabase client setup, types)
│ ├── database/ # Client-side database query helpers
│ └── supabase/ # Supabase client configuration
├── public/ # Static assets (images, favicon, etc.)
├── supabase/ # Supabase configuration, migrations, functions
│ └── config.toml # Supabase project configuration
├── .env.example # Example environment variables file
├── .gitignore # Files and directories ignored by Git
├── next.config.js # Next.js configuration
├── package.json # Project dependencies and scripts
├── postcss.config.mjs # PostCSS configuration (used with Tailwind)
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── README.md # This file
