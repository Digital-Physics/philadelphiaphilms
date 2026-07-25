import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="shell page">
      <h1 className="page__title">No such page</h1>
      <p>That address does not exist on this site.</p>
      <Link className="cta" to="/">
        Back to the portfolio
      </Link>
    </section>
  );
}
