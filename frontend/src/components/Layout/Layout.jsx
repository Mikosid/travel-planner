import { Outlet, Link } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <header>
        <Link
          to="/"
          style={{ display: "inline-block", textDecoration: "none" }}
        >
          <Logo />
        </Link>
        <nav>
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/catalog" className="nav-button">Catalog</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
