import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="Header">
      <nav>
        <ul>
          <Link to="/">
            <li>
              <p className="Header-headline">Light.AI</p>
              <p>An interface controlling your smart lamps</p>
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
