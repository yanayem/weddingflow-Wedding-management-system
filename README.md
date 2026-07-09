# WeddingFlow - Wedding Management System

WeddingFlow is a comprehensive wedding management system designed to streamline the planning and coordination of weddings.

## Project Structure

This project is divided into two main parts:
- **`frontend/`**: The React + Vite frontend application.
- **`backend/`**: The Node.js + Express + MongoDB backend API.

---

## Backend Setup (Node.js & MongoDB)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the `backend/` directory (see `.env` for example).
   - Set your `MONGODB_URI` (local or Atlas).

4. **Start the backend server:**
   ```bash
   # Production mode
   npm start

   # Development mode (requires nodemon)
   npm run dev
   ```
   The server will typically run on [http://localhost:5000](http://localhost:5000).

---

## Frontend Setup (React + Vite)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will typically run on [http://localhost:5173](http://localhost:5173).

---

## Tech Stack

### Frontend
- **React**: UI library.
- **Vite**: Build tool.
- **Tailwind CSS**: Styling.
- **React Router**: Navigation.

### Backend
- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **MongoDB**: Database.
- **Mongoose**: ODM for MongoDB.

## Visual Design & Color Theme

WeddingFlow follows a modern, elegant, and romantic aesthetic.

- **Primary Brand Color**: `Pink (#EC4899 / pink-500)` and `Rose (#F43F5E / rose-500)`
- **Secondary Accents**: `Rose-600` (for high contrast) and `Rose-100` (for soft borders)
- **Backgrounds**: `Rose-50` (soft tinted background) and `White`
- **Typography**: `Gray-900` (headings) and `Gray-500/600` (body text)
- **Status Colors**:
  - `Green-500`: Success / Confirmed
  - `Orange-500`: Pending
  - `Red-500`: Cancelled

## Build and Run

### Frontend Build
To create a production-ready build of the frontend:
```bash
cd frontend
npm run build
```
The output will be in `frontend/dist/`.

### Running the App
1. Ensure your MongoDB service is running.
2. Start the backend server (`cd backend && npm start`).
3. Start the frontend development server (`cd frontend && npm run dev`) or serve the production build.

## License
MIT License
