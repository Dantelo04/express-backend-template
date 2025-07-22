# Express TypeScript Template

A modern Express.js template built with TypeScript, featuring a clean modular architecture, Prisma ORM for PostgreSQL, and comprehensive RESTful API endpoints.

## Features

- **Express 5.x** - Latest version with modern ES modules
- **TypeScript** - Full type safety and modern JavaScript features
- **Prisma ORM** - Type-safe database client for PostgreSQL
- **Modular Architecture** - Organized folder structure with routes, controllers, and config
- **PostgreSQL Support** - Ready for database integration with Prisma
- **Morgan Logger** - HTTP request logging middleware
- **Environment Configuration** - Configurable via environment variables
- **Development Mode** - Hot reload with TypeScript support
- **RESTful API** - Complete CRUD operations for Users and Posts

## Project Structure

```
express-template/
├── src/
│   ├── config.ts              # Application configuration
│   ├── prisma.ts              # Prisma client setup
│   ├── index.ts               # Main application entry point
│   ├── controllers/           # Route controllers
│   │   ├── users.controller.ts
│   │   └── posts.controller.ts
│   └── routes/                # API routes
│       ├── users.routes.ts
│       └── posts.routes.ts
├── prisma/
│   └── schema.prisma          # Database schema
├── generated/                 # Generated Prisma client
├── dist/                      # TypeScript build output
├── loader.mjs                 # TypeScript loader for Node.js
├── tsconfig.json              # TypeScript configuration
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager
- PostgreSQL database

### Installation

1. Clone or download this template
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your database and create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_URL="postgresql://username:password@localhost:5432/database_name"
   ```

4. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### Running the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

**Build and run production:**
```bash
npm run build:start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Users Endpoints

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create a new user
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID
- `GET /users/:id/posts` - Get all posts by user

### Posts Endpoints

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get post by ID
- `POST /users/:id/posts` - Create a new post for a user
- `PUT /posts/:id` - Update post by ID
- `DELETE /posts/:id` - Delete post by ID

### Root Endpoint

- `GET /` - Returns "Hello World" message

## Database Schema

The application uses Prisma with the following models:

### Users Model
```prisma
model users {
  id         Int       @id @default(autoincrement())
  name       String    @unique @db.VarChar(255)
  email      String    @unique @db.VarChar(255)
  created_at DateTime? @default(now()) @db.Timestamp(6)
  posts      posts[]
}
```

### Posts Model
```prisma
model posts {
  id         Int       @id @default(autoincrement())
  user_id    Int
  title      String    @db.VarChar(200)
  content    String
  created_at DateTime? @default(now()) @db.Timestamp(6)
  users      users     @relation(fields: [user_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
}
```

## Adding New Features

### Creating Routes

1. Add your route logic in `src/routes/`
2. Import and use routes in `src/index.ts`

Example:
```typescript
// src/routes/example.routes.ts
import { Router } from "express";
import exampleController from "../controllers/example.controller.js";

const router = Router();

router.get("/example", exampleController.getExamples);
router.post("/example", exampleController.createExample);

export default router;
```

### Creating Controllers

Add your business logic in `src/controllers/`:

```typescript
// src/controllers/example.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma.js";

const getExamples = async (req: Request, res: Response) => {
  try {
    const examples = await prisma.example.findMany();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener ejemplos" });
  }
};

const createExample = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const example = await prisma.example.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
    res.json(example);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el ejemplo" });
  }
};

export default {
  getExamples,
  createExample,
};
```

## Dependencies

### Production Dependencies
- **express** - Web framework for Node.js
- **@prisma/client** - Type-safe database client
- **morgan** - HTTP request logger middleware
- **pg** - PostgreSQL client for Node.js
- **dotenv** - Environment variable management

### Development Dependencies
- **typescript** - TypeScript compiler
- **@types/express** - TypeScript definitions for Express
- **@types/morgan** - TypeScript definitions for Morgan
- **@types/node** - TypeScript definitions for Node.js
- **@types/pg** - TypeScript definitions for PostgreSQL
- **prisma** - Prisma CLI and development tools
- **ts-node** - TypeScript execution engine
- **nodemon** - Development server with auto-reload

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_URL="postgresql://username:password@localhost:5432/database_name"
```

## Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm run build` - Build TypeScript to JavaScript
- `npm run build:start` - Build and start production server

## Database Setup

1. Install PostgreSQL and create a database
2. Update the `DB_URL` in your `.env` file
3. Run Prisma migrations:
   ```bash
   npx prisma db push
   ```
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

## Contributing

Feel free to customize this template for your specific needs. The modular structure makes it easy to add new features and maintain clean, organized code.

## License

ISC 
