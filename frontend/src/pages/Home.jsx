// This is just a temporary HomePage as a placeholder
import ResponsiveAppBar from "../components/NavBar";

function HomePage() {
  return (
    <div>
      <ResponsiveAppBar />
      <h1>TripXP HomePage</h1>
      <ul>
        <li>
          <a href="/ProfilePage">Profile Page</a>
        </li>
        <li>
          <a href="/ExperienceSearch">Experience Search</a>
        </li>
        <li>
          <a href="/TripPage">Trip Page</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
