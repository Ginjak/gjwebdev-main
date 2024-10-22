document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.getElementById("navigation");
  const subNav = document.querySelector(".sub-nav");
  const hamburger = document.getElementById("hamburger-menu");
  const nav = document.getElementById("mobile-nav");
  const body = document.body;

  let lastScrollY = window.scrollY;

  // Initialize subNav visibility based on scroll position
  const updateSubNavVisibility = () => {
    subNav.style.transform =
      window.scrollY <= navigation.clientHeight
        ? "translateY(-100%)"
        : "translateY(0)";
  };

  // Handle scroll events
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    subNav.style.transform =
      currentScrollY > lastScrollY && currentScrollY > navigation.clientHeight
        ? "translateY(0)"
        : currentScrollY < lastScrollY &&
          currentScrollY <= navigation.clientHeight
        ? "translateY(-100%)"
        : subNav.style.transform;

    lastScrollY = currentScrollY;
  };

  // Add event listeners
  window.addEventListener("scroll", handleScroll);
  updateSubNavVisibility();

  // Calculate scrollbar width
  const getScrollbarWidth = () => {
    const div = document.createElement("div");
    div.style.cssText =
      "overflow: scroll; width: 100px; height: 100px; position: absolute; visibility: hidden;";
    const innerDiv = document.createElement("div");
    innerDiv.style.width = "100%";
    div.appendChild(innerDiv);
    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - innerDiv.offsetWidth;
    div.remove(); // Cleanup
    return scrollbarWidth;
  };

  // Usage
  const scrollbarWidth = getScrollbarWidth();

  document.querySelector(".asdasd").style.paddingRight = `${scrollbarWidth}px`;

  // Hamburger mobile menu functionality
  hamburger.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");
    this.classList.toggle("is-open");
    body.classList.toggle("no-scroll", isOpen);
    this.style.marginRight = isOpen ? `${scrollbarWidth}px` : "0";
  });
});
