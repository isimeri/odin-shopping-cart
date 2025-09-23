import { Link } from 'react-router';
import "./Nav.css";
import { mdiController } from '@mdi/js';

function Nav() {
  return (
    <nav>
      <Link to="/">HOME</Link>
      <Link to="/shop">STORE</Link>
      <Link to="/cart">CART</Link>
    </nav>
  )
}

export default Nav;