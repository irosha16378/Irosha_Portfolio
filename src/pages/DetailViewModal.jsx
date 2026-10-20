import { useEffect, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';

const headings = {
  project: 'Project documentation',
  qualification: 'More about this milestone',
  passion: 'More beyond the code',
};

export default function DetailViewModal({ item, type, onClose }) {
  const dialogRef = useRef(null);

  function keepFocusInside(event) {
    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusable = [...dialogRef.current.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')];
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === dialogRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || active === dialogRef.current)) {
      event.preventDefault();
      first.focus();
    }
  }

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    function closeOnEscape(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const details = item.documentation ?? item.details ?? [];
  const architecture = item.architecture ?? [];

  return (
    <div className="detail-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section
        className="detail-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        ref={dialogRef}
        tabIndex={-1}
        onKeyDown={keepFocusInside}
      >
        <div className="detail-topline"><span>{type.toUpperCase()} / {item.category ?? item.institution}</span><button type="button" className="detail-close" onClick={onClose} aria-label="Close details"><X size={19} /></button></div>
        <div className="detail-content">
          <span className="section-kicker">{item.date ?? item.status ?? 'PORTFOLIO NOTE'}</span>
          <h2 id="detail-title">{item.title}</h2>
          <p className="detail-summary">{item.summary}</p>

          {type === 'project' && (
            <div className="detail-block">
              <h3>System architecture</h3>
              <div className="architecture-flow">
                {architecture.map((part, index) => (
                  <div className="architecture-step" key={part}><span>0{index + 1}</span><strong>{part}</strong>{index < architecture.length - 1 && <ArrowRight size={15} />}</div>
                ))}
              </div>
            </div>
          )}

          <div className="detail-block">
            <h3>{headings[type]}</h3>
            <ul className="detail-list">
              {details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </div>

          {type === 'project' && (
            <div className="detail-block">
              <h3>Media & documentation</h3>
              {item.media?.length > 0
                ? <div className="detail-media-grid">{item.media.map((media) => (
                  media.type === 'video'
                    ? <video key={media.src} src={media.src} controls preload="metadata" aria-label={media.alt ?? `${item.title} video`} />
                    : <img key={media.src} src={media.src} alt={media.alt ?? `${item.title} project media`} />
                ))}</div>
                : <div className="detail-placeholder"><span className="detail-placeholder-mark">↗</span><span>Project photos, video walkthroughs, diagrams, and full write-up can be added here.</span></div>}
            </div>
          )}
          {type === 'qualification' && (
            <div className="detail-block">
              <h3>Additional information</h3>
              <div className="detail-placeholder"><span className="detail-placeholder-mark">＋</span><span>Semester modules, coursework, project breakdowns, and supporting documents can be added here.</span></div>
            </div>
          )}
          {type === 'passion' && (
            <div className="detail-block">
              <h3>Stories & moments</h3>
              <div className="detail-placeholder"><span className="detail-placeholder-mark">＋</span><span>Event photos, performance clips, and community stories can be added here.</span></div>
            </div>
          )}

          {item.technologies?.length > 0 && <div className="project-tags detail-tags">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>}
        </div>
      </section>
    </div>
  );
}
