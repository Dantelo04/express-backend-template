# Express Template

A clean and organized Express.js template with a modular structure for building RESTful APIs.

## Features

- **Express 5.x** - Latest version with modern ES modules
- **Modular Architecture** - Organized folder structure with routes, controllers, and config
- **PostgreSQL Support** - Ready for database integration with `pg` package
- **Morgan Logger** - HTTP request logging middleware
- **Environment Configuration** - Configurable port via environment variables
- **Development Mode** - Hot reload with `--watch` flag

## Project Structure

```
express-test/
├── src/
│   ├── config.js          # Application configuration
│   ├── db.js              # Database connection setup
│   ├── index.js           # Main application entry point
│   ├── controllers/       # Route controllers
│   │   └── users.controller.js
│   └── routes/            # API routes
│       └── users.routes.js
├── package.json
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone or download this template
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (optional):
   ```bash
   PORT=3000
   ```

### Running the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
node src/index.js
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

Currently, the template includes a basic "Hello World" endpoint:

- `GET /` - Returns "Hello World"

## Adding New Features

### Creating Routes

1. Add your route logic in `src/routes/`
2. Import and use routes in `src/index.js`

Example:
```javascript
// src/routes/users.routes.js
import express from 'express';
import { getUsers, createUser } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

export default router;
```

### Creating Controllers

Add your business logic in `src/controllers/`:

```javascript
// src/controllers/users.controller.js
export const getUsers = (req, res) => {
  res.json({ message: 'Get users' });
};

export const createUser = (req, res) => {
  res.json({ message: 'Create user' });
};
```

### Database Integration

The template includes PostgreSQL support. Configure your database connection in `src/db.js`:

```javascript
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
```

## Dependencies

- **express** - Web framework for Node.js
- **morgan** - HTTP request logger middleware
- **pg** - PostgreSQL client for Node.js

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_database
DB_PASSWORD=your_password
DB_PORT=5432
```

## Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server

## Contributing

Feel free to customize this template for your specific needs. The modular structure makes it easy to add new features and maintain clean, organized code.

## License

ISC 