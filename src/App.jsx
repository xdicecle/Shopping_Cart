import {Link, useParams} from 'react-router-dom'
import './App.css'
import './styles/navbar.css'
import Cart from './components/Cart'
import Home from './components/Home'
import Store from './components/Store'
import { useCart} from './components/CartContext'

function App() {
  const { page } = useParams();
  //Cart context for navigation updating num
  const {cartCount} = useCart();

  return (
      <div className="app-container">
        <a className="skip-link" href="#main-content">skip to main content</a>
        <nav className="nav" aria-label="main navigation">
          <Link to="/">
            <h1 className="nav-title">Icecle Inc</h1>
          </Link>
          <ul className="links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/store">Store</Link></li>
            <li><Link to="/cart">Cart <span aria-label={`${cartCount} items`}>({cartCount})</span></Link></li>
          </ul>
        </nav>
        {page === "home" ? (
          <Home />
        ) : page === "store" ? (
          <Store />
        ) : page === "cart" ? (
          <Cart />
        ) : (
          <Home />
        )}
      </div>
  );
}

export default App
