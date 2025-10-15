import { Link } from 'react-router'

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {/* TODO #4
        /// Afegeix un enllaç a /settings per mostrar el component Settings. */}
        <li>
          <Link to='/about'>About</Link>
        </li>
        {/* TODO #5
        /// Afegeix un enllaç a /nothing per comprovar si la ruta NotFound funciona bé. */}
      </ul>
    </nav>
  )
}

export default NavBar
