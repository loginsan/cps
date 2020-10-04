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
        brandsPages.classList.add("hidden");
        brandsSwiper.destroy(true, true);
        devicesPages.classList.add("hidden");
        devicesSwiper.destroy(true, true);
        pricesPages.classList.add("hidden");
        pricesSwiper.destroy(true, true);
      }
      return;
    } // else
    brandsPages.classList.remove("hidden");
    devicesPages.classList.remove("hidden");
    pricesPages.classList.remove("hidden");
    return enableSwiper();
  };
  breakp.addListener(breakpChecker);
  breakpChecker();
})();

const storyButton = document.querySelector(".story__button");
const storyBox = document.querySelector(".story__body");
storyButton.addEventListener("click", function() {
  doExpand(this, storyBox, "story__body", "Читать далее");
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

const doExpand = function(button, target, cname, text, textR) {
  textR = textR || "Скрыть";
  let reverse = button.classList.contains("expand-button--reverse");
  let height = target.scrollHeight;
  target.style = (reverse)? "" : `height: ${height}px`;
  target.classList.toggle(cname + "--short");
  button.classList.toggle("expand-button--reverse");
  button.textContent = (reverse)? text : textR;
}

// sitenav__link
const siteNavLinks = document.querySelectorAll(".sitenav__link");
const siteNav = document.querySelector(".sitenav");
const siteNavActive = "sitenav__link--active";
for (let link of siteNavLinks) {
  link.addEventListener("click", function(evt) {
    this.blur();
    evt.preventDefault();
    if (this.classList.contains(siteNavActive)) {
      return -1;
    }
    let activeLink = siteNav.querySelector("." + siteNavActive);
    activeLink.classList.remove(siteNavActive);
    this.classList.add(siteNavActive);
  });
}


const sidebar = document.querySelector(".aside");
const blank = document.querySelector(".blank");
const menuOpenBtn = document.querySelector(".oicon--burger");
const menuCloseBtn = document.querySelector(".oicon--close");
menuOpenBtn.addEventListener("click", function() {
  sidebar.classList.remove("aside--hidden");
  blank.classList.toggle("hidden");
});
menuCloseBtn.addEventListener("click", function() {
  sidebar.classList.add("aside--hidden");
  blank.classList.toggle("hidden");
});
blank.addEventListener("click", function() {
  sidebar.classList.add("aside--hidden");
  blank.classList.toggle("hidden");
});
