import { Link } from 'react-router';
import Icon from '@mdi/react';
import { mdiController } from '@mdi/js';
import { mdiCartVariant } from '@mdi/js';
import "./Nav.css";

function Nav() {
  return (
    <nav>
      <Link to="/"><Icon path={mdiController} size={2.5} />GameBruh</Link>
      {/* <Link to="/shop">STORE</Link> */}
      <Link to="/cart"><Icon path={mdiCartVariant} size={1.5} /></Link>
    </nav>
  )
}

export default Nav;