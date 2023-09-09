//

/**
 * List of the routes of the pages on the site.
 */
const PAGES = [
  "objectives",
  "why",
  "courses",
  "teachers",
  "friends",
  "files",
  "interests",
  "about",
  "contact",
];

/**
 * List of the pages that are part of a menu and the parent page.
 */
const MENU_PAGES = {
  why: "career",
  courses: "career",
  teachers: "career",
  friends: "career",
  files: "career",
};

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
 * @param {Object<string, string>} menu_pages
 */
const setActiveClassOnNavLinks = (pages, menu_pages) => {
  const url = window.location.href;

  for (const page of pages) {
    const element = document.querySelector(`#top-navbar-item-${page}`);

    if (url.endsWith(`${page}.shtml`)) {
      setActiveClassOnNavLink(element);

      if (page in menu_pages) {
        const parent_page = menu_pages[page];

        const parent_element = document.querySelector(
          `#top-navbar-item-${parent_page}`
        );

        setActiveClassOnNavLink(parent_element);
      }

      return;
    }
  }

  // Case for index
  const element = document.querySelector("#top-navbar-item-index");

  setActiveClassOnNavLink(element);
};

//

setActiveClassOnNavLinks(PAGES, MENU_PAGES);
