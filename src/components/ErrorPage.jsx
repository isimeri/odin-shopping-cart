import { Link } from "react-router";
import "./ErrorPage.css";

const styles = {
  height: "100vh",
  display: "grid",
  placeItems: "center"

}

const ErrorPage = () => {
  return (
    <div style={styles}>
      <div className="error-page-inner">
        <h1>Oh no, this page doesn't exist!</h1>
        <Link to="/">
          You can go back to the home page by clicking here, though!
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;