
document.addEventListener("includesLoaded", () => {
  // 텍스트 애니메이션
  document.querySelectorAll("[data-animate]").forEach((el, i) => {
    const delay = el.dataset.delay || i * 200;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";

    setTimeout(() => {
      el.classList.add("animate-fade-up");
    }, delay);
  });

  // 숫자 카운트업
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count, 10);
    const suffix = counter.dataset.suffix || "";
    const duration = 1200; // ms
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  });
});
