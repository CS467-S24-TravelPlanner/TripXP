// This is just a temporary HomePage as a placeholder

import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>TripXP HomePage</h1>
      <ul>
        <li>
          <Link to="/profile">Profile Page</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/experiences">Experience Search</Link>
        </li>
        <li>
          <Link to="/trip">View Trip</Link>
        </li>
        <li>
          <Link to="/trip/add">Add Trip</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
