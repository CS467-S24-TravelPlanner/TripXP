// This is just a temporary HomePage as a placeholder
import ResponsiveAppBar from "../components/NavBar";

function HomePage() {
  return (
    <div>
      <ResponsiveAppBar />
      <h1>TripXP HomePage</h1>
      <ul>
        <li>
          <a href="/profilepage">Profile Page</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/experiencesearch">Experience Search</a>
        </li>
        <li>
          <a href="/trip">View Trip</a>
        </li>
        <li>
          <a href="/trip/add">Add Trip</a>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
