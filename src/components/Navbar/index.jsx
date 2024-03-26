import { useState, forwardRef } from "react";
import styles from './Navbar.module.css';
import { Link } from "react-router-dom";

const Navbar = forwardRef(({ onSearch }, ref) => {

  const [search, setSearch] = useState('');

  const handleInputChange = (evt) => {
    setSearch(evt.target.value);
  };

  const handleInputKeyDown = (evt) => {
    if(evt.key === 'Enter') {
      onSearch(search);
    }
  };
  
  return (
    <div ref={ref} className={styles.navbarContainer}>
      <p>Ticketmaster</p>
      <input
        type="text"
        placeholder="Busca tu evento favorito..."
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        value={search} 
      />
      <Link to='/profile/my-info'>Mi perfil</Link>
    </div>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;