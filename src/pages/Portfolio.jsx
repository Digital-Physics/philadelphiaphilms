import { useMemo, useState } from 'react';
import { works, MEDIA } from '../data/works.js';
import { site } from '../data/site.js';
import Frame from '../components/Frame.jsx';

export default function Portfolio() {
  const [medium, setMedium] = useState('all');

  const counts = useMemo(() => {
    const c = { all: works.length };
    for (const m of MEDIA) c[m] = works.filter((w) => w.medium === m).length;
    return c;
  }, []);

  const shown = medium === 'all' ? works : works.filter((w) => w.medium === medium);

  return (
    <>
      <section className="shell hero">
        <h1 className="hero__title">
          Philadelphia
          <br />
          <em>Philms</em>
        </h1>
        <div className="hero__meta">
          <span className="label">{site.tagline}</span>
          {/* <span className="label">{works.length} works</span> */}
        </div>
      </section>

      <div className="shell">
        <div className="filters" role="group" aria-label="Filter works by medium">
          {['all', ...MEDIA].map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={medium === m}
              onClick={() => setMedium(m)}
            >
              {m}
              <sup>{counts[m]}</sup>
            </button>
          ))}
        </div>

        <section className="sheet">
          <ul className="grid">
            {shown.map((work, i) => (
              <Frame key={work.id} work={work} index={i} />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}