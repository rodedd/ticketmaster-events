import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";

import styles from './Profile.module.css';

const Profile = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    navigate(`/profile/${path}`);
  };
  
  return (
    <div>
      <Link to='/' className={styles.homeLink}>Inicio</Link>
      <div className={styles.tabsContainer}>
        <span
          className={`${pathname.includes('my-info') ? styles.activeTab : ''} ${styles.tab}`}
          onClick={() => handleTabClick('my-info')}
        >
          Mi información
        </span>
        <span
          className={`${pathname.includes('liked-events') ? styles.activeTab : ''} ${styles.tab}`}
          onClick={() => handleTabClick('liked-events')}
        >
          Eventos favoritos
        </span>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;