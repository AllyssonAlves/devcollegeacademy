// Smooth scroll helper: intercepts clicks on internal anchors and handles hash navigation with smooth behavior.
function isLocalHashLink(anchor) {
  try {
    if (!anchor || !anchor.getAttribute) return false;
    const href = anchor.getAttribute('href');
    if (!href) return false;
    // Absolute hash like /#home or relative #home
    return href.startsWith('#') || (href.startsWith('/') && href.includes('#'));
  } catch (e) { return false; }
}

function scrollToHash(hash) {
  if (!hash) return;
  const id = hash.replace(/^.*#/, '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // update history without jumping
    if (history && history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }
}

function handleLinkClick(e) {
  // Only handle left-click without modifier
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const anchor = e.target.closest && e.target.closest('a');
  if (!anchor) return;
  if (!isLocalHashLink(anchor)) return;
  const href = anchor.getAttribute('href');
  const hash = href.includes('#') ? href.substring(href.indexOf('#')) : null;
  if (!hash) return;
  e.preventDefault();
  // If we're already on the homepage path, just scroll to element. Otherwise navigate to home then scroll after load.
  const currentPath = window.location.pathname || '/';
  if (href.startsWith('/') && href.indexOf('#') === 0) {
    // malformed, just scroll
    scrollToHash(hash);
    return;
  }
  const targetPath = href.startsWith('/') ? href.split('#')[0] || '/' : currentPath;
  const targetHash = hash;
  if (targetPath === currentPath) {
    scrollToHash(targetHash);
  } else {
    // Navigate to the target path first; allow router to render then scroll on popstate/hashchange
    window.location.href = (href.startsWith('/') ? href : ('/' + href));
    // The new page load will trigger hashchange or load; as fallback, set a short timeout
    setTimeout(() => scrollToHash(targetHash), 600);
  }
}

function onHashChange() {
  scrollToHash(window.location.hash);
}

export default function initSmoothScroll() {
  if (typeof window === 'undefined') return;
  // Attach click handler
  document.addEventListener('click', handleLinkClick, { capture: true });
  window.addEventListener('hashchange', onHashChange);
  // On initial load, if hash present, scroll
  if (window.location.hash) {
    // small timeout to allow page render
    setTimeout(() => scrollToHash(window.location.hash), 80);
  }
}
