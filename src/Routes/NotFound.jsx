import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <article className="glass-panel not-found">
      <p>Uh oh! It seems this pages does not exist.</p>
      <Link to="/">
        <button className="glass-button">Back to Dashboard</button>
      </Link>
    </article>
  );
};

export default NotFound;
