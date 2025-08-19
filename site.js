// Simple sparkle effect on button click
document.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll(".btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.style.transform = "scale(1.05)";
      setTimeout(() => { btn.style.transform = "scale(1)"; }, 200);
    });
  });
});
