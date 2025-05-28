import { Link, useLocation } from "@tanstack/react-router";

export default function AppNavbar() {
  const location = useLocation();
  return (
    <nav className="container">
      <ul>
        <li><strong>Tasks App</strong></li>
      </ul>
      <ul>
        {location.pathname !== "/" && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
        {/* {session.data?.user && ( */}
        <>
          <li className="user-avatar">
            {/* <img src={session.data.user.image!} /> */}
            {/* <p>{session.data.user.name}</p> */}
          </li>
          <li>
            <button
              type="button"
              className="outline contrast"

            >
              Sign Out
            </button>
          </li>
        </>
        {/* )} */}
      </ul>
    </nav>
  );
}
