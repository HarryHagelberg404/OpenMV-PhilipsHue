import { Link } from "react-router-dom";

export default function Header() {return (
    <header className="Header">
      <nav>
        <ul>
          <Link to="/">
            <li>
                <p>Light.AI</p>
            </li>
          </Link>
          <Link to="/register">
            <li>
              <p>Register</p>
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
