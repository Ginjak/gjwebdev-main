// Slide in sub menu when nav is not visible
document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.getElementById("navigation");
  const subNav = document.querySelector(".sub-nav");

  let lastScrollY = window.scrollY;

  // Initialize the subNav state on page load
  function initializeSubNav() {
    if (window.scrollY <= navigation.clientHeight) {
      subNav.style.transform = "translateY(-100%)"; // Ensure subNav is hidden
    } else {
      subNav.style.transform = "translateY(0)"; // Show subNav if scrolled past nav
    }
  }

  // Handle scroll events
  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (
      currentScrollY > lastScrollY &&
      currentScrollY > navigation.clientHeight
    ) {
      // Scrolling down and past the navigation
      subNav.style.transform = "translateY(0)"; // Slide in
    } else if (
      currentScrollY < lastScrollY &&
      currentScrollY <= navigation.clientHeight
    ) {
      // Scrolling up and navigation is in view
      subNav.style.transform = "translateY(-100%)"; // Slide up and hide
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", handleScroll);
  initializeSubNav(); // Call to set the initial state
});

// Calculate scrollbar width
function getScrollbarWidth() {
  const div = document.createElement("div");
  div.style.overflow = "scroll";
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.position = "absolute";
  div.style.visibility = "hidden"; // Prevent it from being visible
  document.body.appendChild(div);

  const innerDiv = document.createElement("div");
  innerDiv.style.width = "100%"; // Set to 100% to take the full width of the parent
  innerDiv.style.height = "100px"; // Set a fixed height
  div.appendChild(innerDiv);

  const scrollbarWidth = div.offsetWidth - innerDiv.offsetWidth;

  // Cleanup
  div.remove();

  return scrollbarWidth;
}

// Usage
const scrollbarWidth = getScrollbarWidth();
console.log("Scrollbar width:", scrollbarWidth);

// Adjust content padding based on scrollbar width
const contentDiv = document.querySelector(".asdasd");
contentDiv.style.paddingRight = `${scrollbarWidth}px`; // Adjust padding based on scrollbar width

// Hamburger mobile menu
let hamburger = document.getElementById("hamburger-menu"),
  nav = document.getElementById("mobile-nav"),
  body = document.body; // Get the body element

hamburger.addEventListener("click", function () {
  this.classList.toggle("is-open");
  nav.classList.toggle("is-open");

  // Toggle class on body to disable scrolling
  if (nav.classList.contains("is-open")) {
    body.classList.add("no-scroll");
    // Add margin-right to hamburger menu button based on scrollbar width
    hamburger.style.marginRight = `${scrollbarWidth}px`;
  } else {
    body.classList.remove("no-scroll");
    // Reset margin-right when mobile nav is closed
    hamburger.style.marginRight = "0";
  }
});
