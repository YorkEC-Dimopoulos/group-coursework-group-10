document.addEventListener("DOMContentLoaded", () => {
  fetch("/html/components/menu.html")
    .then(response => response.text())
    .then(menuHTML => {
      document.body.insertAdjacentHTML("afterbegin", menuHTML);
      const script = document.createElement("script");
      script.src = "/html/components/menu.js";
      script.defer = true;
      document.body.appendChild(script);
    })
    .catch(error => {
      console.error("Menu Loading Error:", error);
    });
});

 