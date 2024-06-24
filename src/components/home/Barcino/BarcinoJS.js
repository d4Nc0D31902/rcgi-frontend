document.addEventListener("DOMContentLoaded", function () {
  const rows = document.querySelectorAll(".row");

  function checkScroll() {
    rows.forEach((row, index) => {
      if (isElementInViewport(row)) {
        row.classList.add("active");
      } else {
        row.classList.remove("active");
      }
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Check on initial load
});
