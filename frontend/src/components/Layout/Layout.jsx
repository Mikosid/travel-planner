import { Outlet, NavLink, Link } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <Logo />
        </Link>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Catalog
          </NavLink>
        </nav>
      </header>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}
