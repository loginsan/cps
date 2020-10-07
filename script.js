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

const $ = function(query) {
  return document.querySelector(query);
}
const $$ = function(query) {
  return document.querySelectorAll(query);
}

// Expand Blocks
const storyButton = $(".story__button");
const storyBox = $(".story__body");
storyButton.addEventListener("click", function() {
  doExpand(this, storyBox, "story__body", "Читать далее");
});

const brandsButton = $(".brands__button");
const brandsBox = $(".brands__pool");
brandsButton.addEventListener("click", function() {
  doExpand(this, brandsBox, "brands__pool", "Показать все");
});

const devicesButton = $(".devices__button");
const devicesBox = $(".devices__pool");
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

// SiteNavLinks animate
const siteNav = {links: $$(".sitenav__link"), elem: $(".sitenav"), active: "sitenav__link--active"};
for (let link of siteNav.links) {
  link.addEventListener("click", function(evt) {
    this.blur();
    evt.preventDefault();
    if (this.classList.contains(siteNav.active)) {
      return -1;
    }
    let activeLink = siteNav.elem.querySelector("." + siteNav.active);
    activeLink.classList.remove(siteNav.active);
    this.classList.add(siteNav.active);
  });
}

// Sidebars
const asideMain = $(".aside--main");
const asideFeedback = $(".aside--feedback");
const asideCallOrder = $(".aside--callorder");
const blank = $(".blank");
const btnOpenMenu = $(".oicon--burger");
const btnsClose = $$(".oicon--close");
const btnsCall = $$(".oicon--call");
const btnsChat = $$(".oicon--chat");

btnOpenMenu.addEventListener("click", function() {
  asideMain.classList.remove("aside--hidden");
  blank.classList.remove("hidden");
});
for (let btn of btnsClose) {
  btn.addEventListener("click", function() {
    let parent = this.dataset.parent;
    blank.classList.toggle("hidden");
    if (parent === ".aside--main") {
      asideMain.classList.add("aside--hidden");
    } else {
      $(parent).classList.add("hidden");
    }
  });
}

for (let btn of btnsCall) {
  btn.addEventListener("click", function() {
    if (this.dataset.area === "aside") {
      asideMain.classList.add("aside--hidden");
    }
    asideCallOrder.classList.remove("hidden");
    blank.classList.remove("hidden");
  });
}
for (let btn of btnsChat) {
  btn.addEventListener("click", function() {
    if (this.dataset.area === "aside") {
      asideMain.classList.add("aside--hidden");
    }
    asideFeedback.classList.remove("hidden");
    blank.classList.remove("hidden");
  });
}

blank.addEventListener("click", function() {
  asideMain.classList.add("aside--hidden");
  asideFeedback.classList.add("hidden");
  asideCallOrder.classList.add("hidden");
  blank.classList.add("hidden");
});
