const sections = document.querySelectorAll(".taste");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));