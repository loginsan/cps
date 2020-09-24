(function() {
  "use strict";
  const breakp = window.matchMedia( "(min-width:33.75em)" );
  let brandsSwiper;
  let devicesSwiper;
  let brandsPages = document.querySelector(".brands__pagination");
  let devicesPages = document.querySelector(".devices__pagination");

  const enableSwiper = function() {
    brandsSwiper = new Swiper(".brands__container", {
      a11y: true,
      keyboardControl: true,
      grabCursor: true,
      slidesPerView: "auto",
      spaceBetween: 16,
      pagination: {
        el: ".brands__pagination",
        clickable: true
      }
    });
    devicesSwiper = new Swiper(".devices__container", {
      a11y: true,
      keyboardControl: true,
      grabCursor: true,
      slidesPerView: "auto",
      spaceBetween: 16,
      pagination: {
        el: ".devices__pagination",
        clickable: true
      }
    });
  };

  const breakpChecker = function() {
    if (breakp.matches === true) {
      if (brandsSwiper !== undefined) {
        brandsPages.classList.add("dn");
        brandsSwiper.destroy(true, true);
        devicesPages.classList.add("dn");
        devicesSwiper.destroy(true, true);
      }
      return;
    } // else
    brandsPages.classList.remove("dn");
    devicesPages.classList.remove("dn");
    return enableSwiper();
  };
  breakp.addListener(breakpChecker);
  breakpChecker();
})();

let heroButton = document.querySelector(".hero__expand-button");
let heroBox = document.querySelector(".hero__spoiler");
heroButton.addEventListener("click", function() {
  doExpand(this, heroBox, "hero__spoiler", "Читать далее");
});

let brandsButton = document.querySelector(".brands__expand-button");
let brandsBox = document.querySelector(".brands__container");
brandsButton.addEventListener("click", function() {
  doExpand(this, brandsBox, "brands__container", "Показать все");
});

let devicesButton = document.querySelector(".devices__expand-button");
let devicesBox = document.querySelector(".devices__container");
devicesButton.addEventListener("click", function() {
  doExpand(this, devicesBox, "devices__container", "Показать все");
});


let doExpand = function(button, target, cname, text, textR) {
  textR = textR || "Скрыть";
  let reverse = button.classList.contains("expand-button--reverse");
  let height = target.scrollHeight;
  target.style = (reverse)? "" : `height: ${height}px`;
  target.classList.toggle(cname + "--short");
  button.classList.toggle("expand-button--reverse");
  button.textContent = (reverse)? text : textR;
}
