import "../styles/home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main id="main-content" className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-copy">
          <h2 id="home-title" className="home-title">
            make room for
            <br />
            the good stuff.
          </h2>
          <p className="home-text">
            Thoughtfully designed pieces for comfortable, considered spaces.
            Find everyday furniture with character, warmth, and purpose.
          </p>
          <Link className="home-cta" to="/store">
            browse the collection <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
