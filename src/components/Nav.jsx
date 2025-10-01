import { useCart } from '../CartContext';
import { Link } from 'react-router';
import Icon from '@mdi/react';
import { mdiController } from '@mdi/js';
import { mdiCartVariant } from '@mdi/js';
import "./Nav.css";

function Nav() {
  const { cart } = useCart();

  return (
    <nav>
      <Link to="/" className='home-link'><Icon path={mdiController} size={2.5} />GameBruh</Link>
      <span className="added-success-msg hidden" data-testid="added-success-msg">Added successfully!</span>
      <Link to="/cart" className='cart-link' aria-label='cart-link'><Icon path={mdiCartVariant} size={1.5} /><span className="cart-count" data-testid="cart-count">{cart.length}</span></Link>
    </nav>
  )
}

export default Nav;