import React from 'react';
import { useApp } from '../context/AppContext';
import '../styles/components.css';

// Fallback map for course images when admin/persisted data doesn't provide an image
// Use embedded asset paths (project-relative) so images are sourced from /public/assets
const FALLBACK_IMAGES = {
  1: '/assets/pa.png',
  2: '/assets/IA.png',
  3: '/assets/dweb.jpg'
};

const normalizePath = (imgPath) => {
  if (!imgPath || typeof imgPath !== 'string') return null;
  const trimmed = imgPath.trim();
  // If it's already an absolute URL or starts with PUBLIC_URL or an absolute path, return as-is
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith(process.env.PUBLIC_URL)) return trimmed;
  // If it starts with a leading slash (e.g. /assets/...), prefix with PUBLIC_URL so GitHub Pages resolves under the repo
  if (trimmed.startsWith('/')) {
    const pub = process.env.PUBLIC_URL || '';
    // Avoid duplicate slashes when PUBLIC_URL already ends with '/'
    return (pub.endsWith('/') ? pub.slice(0, -1) : pub) + trimmed;
  }
  // If starts with ./ or without leading slash, prefix with PUBLIC_URL
  const cleaned = trimmed.replace(/^\.\//, '');
  return (process.env.PUBLIC_URL || '') + '/' + cleaned.replace(/^\/+/, '');
};

// Build a deterministic ordered list of image candidate URLs for a course.
export const buildImageCandidates = (course) => {
  const candidates = [];
  if (!course) return candidates;

  // prefer embedded fallback image from code (so images added in code take priority)
  if (FALLBACK_IMAGES[course.id]) candidates.push(normalizePath(FALLBACK_IMAGES[course.id]));

  // prefer normalized admin image (if present)
  if (course.image) candidates.push(normalizePath(course.image));

  // candidate by id -> standard filenames
  if (typeof course.id !== 'undefined') {
    candidates.push((process.env.PUBLIC_URL || '') + `/assets/course-${course.id}.svg`);
    candidates.push((process.env.PUBLIC_URL || '') + `/assets/course-${course.id}.png`);
  }

  // candidate by slug/title
  const slug = (course.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (slug) {
    candidates.push((process.env.PUBLIC_URL || '') + `/assets/${slug}.svg`);
    candidates.push((process.env.PUBLIC_URL || '') + `/assets/${slug}.png`);
    candidates.push((process.env.PUBLIC_URL || '') + `/assets/${slug}.webp`);
  }

  // known fallbacks (ensure embedded fallback is present as last resort if not already included)
  const fb = FALLBACK_IMAGES[course.id] || FALLBACK_IMAGES[1];
  const fbNorm = normalizePath(fb);
  if (fbNorm && !candidates.includes(fbNorm)) candidates.push(fbNorm);

  // filter out falsy/duplicates while preserving order
  return candidates.filter((c, i) => c && candidates.indexOf(c) === i);
};

// Helper component: tries multiple candidate image URLs until one loads.
export const CourseImg = ({ candidates = [], alt, className, style }) => {
  const [idx, setIdx] = React.useState(0);
  const src = candidates[idx];

  React.useEffect(() => {
    // reset when candidates list changes
    setIdx(0);
  }, [candidates.join('|')]);

  if (!src) return null;

  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => {
        console.warn('[CourseImg] failed to load', src);
        // try next candidate
        setIdx((i) => {
          const next = i + 1;
          return next < candidates.length ? next : i;
        });
      }}
    />
  );
};

const Courses = () => {
  const { courses } = useApp();

  // Map of course id (or slug) to external 'Saiba mais' pages
  const EXTERNAL_COURSE_LINKS = {
    1: 'https://drive.google.com/file/d/15C0bNK6JalNKEkiovNCKfraCEsJbVQpQ/view?usp=sharing',
    2: 'https://drive.google.com/file/d/1wUP--XIC_bfjYuIbkMvNj9UhTY0tOlh1/view?usp=sharing',
    3: 'https://drive.google.com/file/d/10YatR3DLBQe4OWCYHinMiNLH8VGplZzU/view?usp=sharing'
  };

  const getExternalLink = (course) => {
    if (!course) return EXTERNAL_COURSE_LINKS[1];
    if (EXTERNAL_COURSE_LINKS[course.id]) return EXTERNAL_COURSE_LINKS[course.id];
    const slug = (course.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (EXTERNAL_COURSE_LINKS[slug]) return EXTERNAL_COURSE_LINKS[slug];
    return EXTERNAL_COURSE_LINKS[1];
  };

  return (
    <section id="cursos" className="courses section">
      <div className="container">
        <div className="section-title">
          <h2>Nossos Cursos</h2>
          <p>Desenvolvemos habilidades do futuro de forma divertida e interativa</p>
        </div>
        
        <div className="courses-grid">
          {courses.map(course => {
            const candidates = buildImageCandidates(course);
            const hasAny = candidates && candidates.length > 0;
            if (process.env.NODE_ENV === 'development') console.debug('[Courses] image candidates for', course.id, candidates);
            return (
              <div key={course.id} className="course-card card">
                {hasAny ? (
                  <div className="course-banner">
                    <CourseImg candidates={candidates} alt={course.title + ' - imagem do curso'} style={{ width: '100%', height: 160, objectFit: 'cover', borderTopLeftRadius: 6, borderTopRightRadius: 6 }} />
                    <div className="course-age">{course.ageRange}</div>
                  </div>
                ) : (
                  <div className="course-banner" style={{ background: course.color || 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
                    <div style={{ color: 'white', fontWeight: 600 }}>{course.title}</div>
                    <div className="course-age">{course.ageRange}</div>
                  </div>
                )}
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span className="course-duration">{course.duration}</span>
                  </div>
                  <a href={getExternalLink(course)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Saiba mais</a>
                </div>
              </div>
            );
          })}
        </div>

        {courses.length === 0 && (
          <div className="empty-state">
            <h3>Nenhum curso cadastrado</h3>
            <p>Adicione cursos através do painel administrativo</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;