# Shopping Cart

Shopping Cart is a React frontend project where users can browse products, choose quantities, and manage items in a cart. Product data is fetched from the Fake Store API, then rendered into reusable UI components for the store and cart flows. The app focuses on state management, routing, and accessibility fundamentals in a student-level ecommerce-style interface.

## Live Demo
https://shopping-cart-black-zeta.vercel.app

## Features
- Fetches product data from the Fake Store API (`https://fakestoreapi.com/products`)
- Displays loading and error states while retrieving store data
- Renders product cards with image, title, and price
- Lets users choose quantity before adding items to the cart
- Adds products to cart and combines quantities for duplicate products
- Supports quantity increase/decrease controls directly in the cart
- Removes individual products from the cart
- Shows a dynamic cart count in navigation based on total item quantities
- Calculates subtotal from cart contents
- Calculates tax (10%) and final total in the order summary
- Supports navigation between Home, Store, and Cart routes
- Uses responsive layouts for product grid and cart layout
- Includes accessibility-focused details such as semantic structure (`main`, `section`, `article`, `aside`), ARIA labels, `aria-live` updates, focus-visible styles, and a skip-to-content link

## Technologies
- React
- JavaScript (ES modules)
- Vite
- React Router (`react-router-dom`)
- React Context API
- CSS
- Fake Store API
- Vercel

## Technical Decisions

### Shared Cart State
`CartContext` is used so cart data and cart actions are available from multiple parts of the app without prop-drilling through every component layer. Navigation needs cart count updates, the store needs add-to-cart behavior, and the cart page needs read/update/remove behavior—all backed by the same source of truth.

A custom `useCart()` hook wraps context access so consuming components stay clean and consistent. Core cart operations are exposed through:
- `addToCart()`
- `updateQuantity()`
- `removeFromCart()`

When the same product is added again, `addToCart()` merges quantities for that product ID instead of creating duplicate line items. This keeps cart data normalized and makes totals easier to compute.

### Derived State
The app calculates `cartCount`, `subtotal`, `tax`, and `total` from the existing cart array instead of storing those values as separate state variables. This avoids synchronization bugs (for example, forgetting to update totals after quantity changes) and keeps state minimal.

### Immutable State Updates
Cart operations rely on immutable patterns with `map()`, `filter()`, `reduce()`, and the spread operator. This keeps React updates predictable and avoids directly mutating previous state:
- `map()` updates matching items
- `filter()` removes items
- `reduce()` derives totals and counts
- spread syntax creates updated objects/arrays

### API Integration
`Store.jsx` uses `useEffect` to fetch products from the Fake Store API on mount. It handles the full UI state cycle: loading, success, and error. That keeps asynchronous behavior explicit and provides basic resilience when the network request fails.

### Component Structure
Responsibilities are split into focused components:
- `Store.jsx`: fetches product data and renders product cards
- `Card.jsx`: displays one product and handles quantity/add interactions
- `Cart.jsx`: renders cart line items, quantity controls, removal, and pricing summary
- `CartContext.jsx`: centralizes shared cart state and update functions
- `App.jsx`: handles app shell and route-based page selection/navigation

This structure stays approachable while still demonstrating practical separation of concerns.

## What I Learned
I built this project to practice managing shared React state across multiple pages and components. I used `useState`, `useEffect`, Context API, and a custom hook to support cart operations and API-driven product data. I also practiced immutable state updates, derived values (count/totals), and route-based UI with React Router.

I learned how quickly component organization matters as features grow, especially when state is shared between navigation, product cards, and checkout summary views. I also improved at handling loading/error states, adding accessibility details (skip link, ARIA labels, `aria-live`, semantic structure), and deploying a React/Vite app to Vercel.

## Project Structure
```text
Shopping_Cart/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── Cart.jsx
│   │   ├── CartContext.jsx
│   │   ├── Home.jsx
│   │   ├── NavBar.jsx
│   │   └── Store.jsx
│   ├── styles/
│   │   ├── cart.css
│   │   ├── home.css
│   │   ├── navbar.css
│   │   └── store.css
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   └── reset.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vercel.json
└── vite.config.js
```

## Running Locally
```bash
git clone https://github.com/xdicecle/Shopping_Cart.git
cd Shopping_Cart
npm install
npm run dev
```

Additional scripts:
```bash
npm run build
npm run preview
```

## Project Scope
- This is primarily a frontend React project.
- Cart state is client-side and managed in browser memory.
- The checkout button is present as UI only and does not process real transactions.
- There is currently no backend, database, or payment integration.

## Possible Future Improvements
- Persist cart state (for example via local storage)
- Add a backend + database for product and order management
- Add authentication for user-specific carts
- Add automated testing (unit/integration)
- Implement a real checkout and payment flow

## Author
Justin Myers  
Web & Interactive Development Student  
GitHub: https://github.com/xdicecle
