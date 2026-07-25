import { site } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="shell foot__inner">
        <p className="label">
          {site.name} — {site.tagline}
        </p>
        <p className="label">
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </p>
      </div>
    </footer>
  );
}
