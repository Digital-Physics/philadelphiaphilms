import { Link } from 'react-router-dom';
import { imageUrl } from '../data/works.js';

export default function Frame({ work, index }) {
  const linked = Boolean(work.href);
  const internal = work.href.startsWith('/');

  const plate = (
    <>
      <div className="frame__plate">
        <img
          src={imageUrl(work, 800)}
          alt={work.title}
          loading={index < 6 ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      <div className="frame__head">
        <h2 className="frame__title">{work.title}</h2>
        <span className="label">{work.medium}</span>
      </div>
      {work.blurb && <p className="frame__blurb">{work.blurb}</p>}
    </>
  );

  if (!linked) {
    return (
      <li>
        <div className="frame frame--unlinked">{plate}</div>
      </li>
    );
  }

  if (internal) {
    return (
      <li>
        <Link className="frame" to={work.href}>
          {plate}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a
        className="frame"
        href={work.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {plate}
      </a>
    </li>
  );
}
