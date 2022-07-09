const featureBox =  document.querySelector(".new-feature");
const closeFeature = document.querySelector(".close-feature-box");

closeFeature.addEventListener("click", () => {
  featureBox.classList.add("close");
});