# Baumann Website

A modern Next.js 15 web application for product presentation and product management with an admin dashboard.

## 📋 Table of Contents

- [Technology Stack](#-technology-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Development](#-development)
- [Database](#-database)
- [Authentication](#-authentication)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Code Conventions](#-code-conventions)

## 🚀 Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict Mode)
- **UI Library:** React 19
- **Styling:** TailwindCSS + Shadcn/UI
- **Database:** MongoDB (via Prisma ORM)
- **Authentication:** NextAuth v5
- **Image Management:** Cloudinary
- **Package Manager:** pnpm
- **Deployment:** Vercel

### Key Dependencies

- **UI Components:** Radix UI (Dialog, Dropdown, Select, Navigation, etc.)
- **Forms:** React Hook Form + Zod
- **Styling Tools:** class-variance-authority, clsx, tailwind-merge
- **Carousel:** Embla Carousel React
- **Email:** Nodemailer
- **Password Hashing:** bcryptjs

## ✨ Features

### Public Area

- **Product Catalog:** Overview of all products by category
- **Product Details:** Detailed view with image gallery, articles, and color variants
- **Product Search:** Combobox-based search across all products
- **Responsive Design:** Optimized for desktop and mobile
- **Dark/Light Mode:** Theme toggle for better user experience

### Admin Area (Dashboard)

- **Product Management:**
  - Create new products
  - Edit existing products
  - Delete products
  - Image upload via Cloudinary
- **Article Management:**
  - Add articles to products
  - Edit and delete articles
- **Color Management:**
  - Manage color palettes
  - Assign colors to products

### Authentication

- **Admin Login:** Email/password-based authentication
- **Password Reset:** Secure password recovery via email
- **Session Management:** Automatic session validation
- **Protected Routes:** Middleware-protected admin area

## 📁 Project Structure

```
baumann/
├── prisma/
│   └── schema.prisma              # Datenbankschema (MongoDB)
├── public/
│   ├── fonts/                     # Fonts
│   ├── icons/                     # Icons
│   └── images/                    # Static images
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (admin)/              # Admin area (protected)
│   │   │   └── dashboard/        # Dashboard pages
│   │   ├── (auth)/               # Authentication pages
│   │   │   ├── login/
│   │   │   ├── password-request/
│   │   │   └── password-reset/
│   │   ├── api/auth/             # NextAuth API routes
│   │   ├── products/             # Public product pages
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Homepage
│   ├── components/               # React components
│   │   ├── auth/                 # Auth components
│   │   ├── forms/                # Form components
│   │   ├── layout/               # Layout components (Navbar, Theme)
│   │   ├── products/             # Product components
│   │   ├── shared/               # Shared components
│   │   └── ui/                   # Shadcn/UI components
│   ├── constants/                # Constants and configuration
│   ├── features/                 # Feature modules
│   │   ├── article/              # Article feature
│   │   ├── auth/                 # Auth feature
│   │   ├── color/                # Color feature
│   │   └── product/             # Products feature
│   ├── lib/                      # Utilities and helpers
│   │   ├── helpers/              # Helper functions
│   │   └── hooks/                # Custom React hooks
│   ├── styles/                   # Global styles
│   ├── auth.ts                   # NextAuth configuration
│   └── middleware.ts             # Next.js middleware
├── .github/
│   └── instructions/             # Copilot instructions
├── components.json               # Shadcn/UI config
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
└── tsconfig.json                 # TypeScript config
```

## 🔧 Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- MongoDB database
- Cloudinary account

### Setup

1. **Clone repository:**

```bash
git clone <repository-url>
cd baumann
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Configure environment variables:**

```bash
cp .env.example .env
```

Fill the `.env` file with your values (see [Environment Variables](#-environment-variables)).

4. **Generate Prisma client:**

```bash
pnpm prisma generate
```

5. **Initialize database:**

```bash
# Optional: Open Prisma Studio
pnpm prisma studio
```

## 💻 Development

### Start development server

```bash
# With Turbopack (faster)
pnpm dev

# Without Turbopack
pnpm no-turbo
```

The application runs at [http://localhost:3000](http://localhost:3000).

### Additional commands

```bash
# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint

# Prisma Studio (database GUI)
pnpm prisma studio
```

## 🗄️ Database

### Schema Overview

**Collections:**

- `admin` - Admin users for authentication
- `password_reset` - Temporary password reset tokens
- `products` - Product information
- `articles` - Article variants for products
- `colors` - Color definitions
- `product_colors_connection` - Products ↔ Colors mapping

### TTL Index for Password Reset

MongoDB automatically deletes expired password reset tokens:

```sh
db.password_reset.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
```

### Prisma Commands

```bash
# Update schema and migrate
pnpm prisma db push

# Regenerate Prisma Client
pnpm prisma generate

# Open Prisma Studio
pnpm prisma studio
```

## 🔐 Authentication

The app uses **NextAuth v5** (Beta) with Credentials Provider.

### Features

- Email/password login for admin users
- Session-based authentication
- Password hashing with bcryptjs
- Password reset via email (Nodemailer)
- Protected routes via middleware

### Create Admin Access

An admin user must be manually created in the database:

```javascript
// Hash password
const hashedPassword = await bcrypt.hash("your-password", 10);

// Insert into MongoDB
db.admin.insertOne({
  email: "admin@example.com",
  password: hashedPassword,
});
```

## 🌐 Deployment

The app is optimized for **Vercel**.

### Vercel Deployment

1. Connect repository with Vercel
2. Set environment variables
3. Deploy!

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Build Optimizations

- Turbopack for faster dev builds
- Automatic image optimization via next/image
- Server Components for better performance
- Static & Dynamic Rendering

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mongodb+srv://..."

# NextAuth
AUTH_SECRET="<generate-with-openssl-rand-base64-32>"
AUTH_URL="http://localhost:3000"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (Nodemailer)
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-email-password"
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_FROM="noreply@example.com"

# Environment
NODE_ENV="development"
```

## 📝 Code Conventions

### TypeScript

- **Strict Mode** enabled
- Explicit typing required
- No `any` (unless absolutely necessary)
- JSDoc for complex functions

### React/Next.js

- **Server Components** as default
- Client Components only when interactivity needed (`"use client"`)
- **Server Actions** for mutations (no `fetch` from client)
- `useActionState` for form logic
- No `useEffect` for data fetching

### Styling

- Only **TailwindCSS** (no CSS Modules, no inline styles)
- **Shadcn/UI** as component base
- Prettier plugin for automatic class sorting

### File Naming

- **kebab-case** for files and folders
- Components: `ComponentName.tsx`
- Actions: `actionName.ts`
- Types: `types.ts` or `schema.ts`

### Feature Organization

Each feature (article, color, products, auth) has:

```
feature/
├── actions/      # Server Actions
├── schemas/      # Zod Schemas
├── types/        # TypeScript Types
└── index.ts      # Public API
```

## 🤝 Contributing

1. Create feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add some AmazingFeature'`)
3. Push branch (`git push origin feature/AmazingFeature`)
4. Open Pull Request

## 📄 License

This project is private and not intended for public use.

---

**Note:** This documentation is based on the current project structure (as of October 2025). Please update this README when changes are made.
