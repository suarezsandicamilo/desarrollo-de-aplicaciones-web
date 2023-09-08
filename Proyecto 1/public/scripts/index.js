//

/**
 * List of the routes of the pages on the site.
 */
const PAGES = [
  "objectives",
  "career",
  "courses",
  "teachers",
  "friends",
  "files",
  "interests",
  "about",
  "contact",
];

/**
 * Adds the active class and sets the aria-current attribute on the element.
 *
 * @param {Element} element
 */
const setActiveClassOnNavLink = (element) => {
  element.classList.add("active");
  element.setAttribute("aria-current", "page");
};

/**
 * Adds the active class and sets the aria-current attribute for an element based on the url.
 *
 * @param {string[]} pages
 */
const setActiveClassOnNavLinks = (pages) => {
  const url = window.location.href;

  for (const page of pages) {
    const name = `#main-navbar-${page}`;
    const element = document.querySelector(name);

    if (url.endsWith(page)) {
      setActiveClassOnNavLink(element);
      return;
    }
  }

  // Case for index
  const element = document.querySelector("#main-navbar-index");
  setActiveClassOnNavLink(element);
};

//

setActiveClassOnNavLinks(PAGES);
