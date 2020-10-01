(function() {
  "use strict";
  const breakp = window.matchMedia( "(min-width:33.75em)" );
  let brandsSwiper;
  let devicesSwiper;
  let pricesSwiper;
  const brandsPages = document.querySelector(".brands__pagination");
  const devicesPages = document.querySelector(".devices__pagination");
  const pricesPages = document.querySelector(".prices__pagination");

  const enableSwiper = function() {
    brandsSwiper = new Swiper(".brands__pool", {
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
    devicesSwiper = new Swiper(".devices__pool", {
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
    pricesSwiper = new Swiper(".prices__pool", {
      a11y: true,
      keyboardControl: true,
      grabCursor: true,
      slidesPerView: "auto",
      spaceBetween: 16,
      pagination: {
        el: ".prices__pagination",
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
        pricesPages.classList.add("dn");
        pricesSwiper.destroy(true, true);
      }
      return;
    } // else
    brandsPages.classList.remove("dn");
    devicesPages.classList.remove("dn");
    pricesPages.classList.remove("dn");
    return enableSwiper();
  };
  breakp.addListener(breakpChecker);
  breakpChecker();
})();

const heroButton = document.querySelector(".hero__button");
const heroBox = document.querySelector(".hero__pool");
heroButton.addEventListener("click", function() {
  doExpand(this, heroBox, "hero__pool", "Читать далее");
});

const brandsButton = document.querySelector(".brands__button");
const brandsBox = document.querySelector(".brands__pool");
brandsButton.addEventListener("click", function() {
  doExpand(this, brandsBox, "brands__pool", "Показать все");
});

const devicesButton = document.querySelector(".devices__button");
const devicesBox = document.querySelector(".devices__pool");
devicesButton.addEventListener("click", function() {
  doExpand(this, devicesBox, "devices__pool", "Показать все");
});


const sidebar = document.querySelector(".sidebar");
const blank = document.querySelector(".blank");
const menuOpenBtn = document.querySelector(".oicon--burger");
const menuCloseBtn = document.querySelector(".oicon--close");
menuOpenBtn.addEventListener("click", function() {
  sidebar.classList.remove("sidebar--dn");
  blank.classList.toggle("dn");
});
menuCloseBtn.addEventListener("click", function() {
  sidebar.classList.add("sidebar--dn");
  blank.classList.toggle("dn");
});
blank.addEventListener("click", function() {
  sidebar.classList.add("sidebar--dn");
  blank.classList.toggle("dn");
});


const doExpand = function(button, target, cname, text, textR) {
  textR = textR || "Скрыть";
  let reverse = button.classList.contains("expand-button--reverse");
  let height = target.scrollHeight;
  target.style = (reverse)? "" : `height: ${height}px`;
  target.classList.toggle(cname + "--short");
  button.classList.toggle("expand-button--reverse");
  button.textContent = (reverse)? text : textR;
}
