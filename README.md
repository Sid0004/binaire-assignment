# Binaire Media - Netflix Style UI Assessment

A premium, high-performance desktop UI for a short-form media application built with React.

---

## 🛠 Tech Stack
*   **Frontend Library**: React.js (ES6+)
*   **Build Tool**: Vite (For lightning-fast development)
*   **Styling**: **Tailwind CSS** (Utility-first framework for rapid responsive design)
*   **Icons**: Lucide React
*   **API Management**: Axios
*   **Animations**: Framer Motion (Stage 2) / CSS Transitions
*   **Authentication**: Firebase (Stage 2 implementation)

---

## Firebase Auth Setup
1. Create a Firebase project in Firebase Console.
2. Enable Authentication providers:
    - Email/Password
    - Anonymous (for guest login)
3. Create a `.env` file in the project root.
4. Fill all `VITE_FIREBASE_*` values using your Firebase web app config.
5. Restart dev server after updating `.env`.

Auth integration points:
- Login: Email/Password and Guest login
- Signup: Firebase Email/Password account creation
- Session restore: handled globally with Firebase `onAuthStateChanged`
- Sign out: available in sidebar and profile

---

## 📂 Project Structure
*   `src/components/`: Reusable UI elements (Navbar, MovieCard, PreviewModal).
*   `src/pages/`: Main views (Login, Home, Search, Profile).
*   `src/services/`: API configuration and external integrations (TVMaze/Firebase).
*   `src/hooks/`: Custom logic for Debouncing and Infinite Scroll.
*   `src/index.css`: Global Design System (Dark mode, Netflix-red, Typography).

---

## 🚀 Key Features & Optimizations

### 1. 10,000+ Items (Lazy Loading)
*   **Method**: Used `IntersectionObserver` to detect when a user reaches the bottom of the page.
*   **Efficiency**: New items are fetched in pages (approx 250 at a time).
*   **Memory Management**:
    *   **Cleanup**: All event listeners and observers are disconnected when components unmount.
    *   **Re-renders**: Used `React.memo` for Movie Cards and kept local states minimal to prevent the entire grid from re-rendering on every update.

### 2. Search Debouncing
*   **Problem**: Every keystroke sending a request to the server causes lag and rate limits.
*   **Solution**: Implemented a `500ms` debounce timer. The API call only triggers when the user *stops* typing for half a second.

### 3. Offline Capabilities
*   **Detection**: Uses `navigator.onLine` and `window.addEventListener('offline')` to keep the user informed.
*   **Caching**: (Stage 2) LocalStorage/Service Workers are used to store previously fetched results for offline browsing.

---

## 🗺 Implementation Roadmap

### Phase 1: The Shell
*   Initialize project using Vite.
*   Define CSS variables for the Netflix Dark Theme.
*   Setup Sign-in page (Guest focus) and Routing.

### Phase 2: The Core (Stage 1)
*   Integrate TVMaze API.
*   Build the Hero Section (Featured Show).
*   Implement Recursive/Infinite Scroll for the movie grid.

### Phase 3: Search & Interactions
*   Create the Search View with debouncing.
*   Add hover scale animations to Movie Cards.
*   Add the "Category" navigation logic.

### Phase 4: Stage 2 Features
*   Implement the Movie Preview Modal.
*   Connect Firebase for User Sign-up/Authentication.
*   Setup Watchlist/History state management.

---

## 📧 Submission Instructions
*   **Email Subject**: Javascript Developer - Netflix UI Assessment – [Your Full Name] - [Roll Number] - [Institute]
*   **Recipient**: hr@binaire.app
