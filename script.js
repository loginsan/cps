(function() {
  "use strict";
  const breakp = window.matchMedia( "(min-width:33.75em)" );
  let swipers = [];
  const swiperPag = [
    document.querySelector(".brands__bullets"),
    document.querySelector(".devices__bullets"),
    document.querySelector(".prices__bullets")
  ];

  const swiperTpl = function(paginationEl) {
    return {
      a11y: true,
      slidesPerView: "auto",
      spaceBetween: 16,
      pagination: {
        el: paginationEl,
        clickable: true
      }
    }
  }
  const enableSwiper = function() {
    swipers[0] = new Swiper(".brands__pool", swiperTpl(".brands__bullets"));
    swipers[1] = new Swiper(".devices__pool", swiperTpl(".devices__bullets"));
    swipers[2] = new Swiper(".prices__pool", swiperTpl(".prices__bullets"));
  };
  const destroySwiper = function(swipersArray) {
    for (let s of swipersArray) {
      s.destroy(true, true);
    }
  }
  const showBullets = function(pagiArray) {
    for (let p of pagiArray) {
      p.classList.remove("hidden");
    }
  }
  const hideBullets = function(pagiArray) {
    for (let p of pagiArray) {
      p.classList.add("hidden");
    }
  }

  const breakpChecker = function() {
    if (breakp.matches === true) {
      if (swipers[0] !== undefined) {
        hideBullets(swiperPag);
        destroySwiper(swipers);
      }
      return;
    } // else
    showBullets(swiperPag);
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
const expands = [
  {btn: $(".story__expand"), box: $(".story__body"), cname: "story__body", btext: "Читать далее"},
  {btn: $(".brands__expand"), box: $(".brands__pool"), cname: "brands__pool", btext: "Показать все"},
  {btn: $(".devices__expand"), box: $(".devices__pool"), cname: "devices__pool", btext: "Показать все"}
];
const clickExpand = function(exp) {
  for (let e of exp) {
    e.btn.addEventListener("click", function() {
      let reverse = e.btn.classList.contains("expand-button--reverse");
      let height = e.box.scrollHeight;
      e.box.style = (reverse)? "" : `height: ${height}px`;
      e.box.classList.toggle(e.cname + "--short");
      e.btn.classList.toggle("expand-button--reverse");
      e.btn.textContent = (reverse)? e.btext : "Скрыть";
    });
  }
}
clickExpand(expands);

// SiteNavLinks animate
const siteNav = {
  links: $$(".sitenav__link"),
  elem: $(".sitenav"),
  active: "sitenav__link--active"
};
const clickSiteNav = function(nav){
  for (let link of nav.links) {
    link.addEventListener("click", function(evt) {
      this.blur();
      evt.preventDefault();
      if (!this.classList.contains(nav.active)) {
        let activeLink = nav.elem.querySelector("." + nav.active);
        activeLink.classList.remove(nav.active);
        this.classList.add(nav.active);
      }
    });
  }
}
clickSiteNav(siteNav);

// Sidebars
const aside = [$(".aside--main"), $(".aside--feedback"), $(".aside--callorder")];
const blank = $(".blank");
const btnOpenMenu = $(".oicon--menu");
const btnsClose = $$(".oicon--close");
const btnsCall = $$(".oicon--call");
const btnsChat = $$(".oicon--chat");

btnOpenMenu.addEventListener("click", function() {
  aside[0].classList.remove("aside--hidden");
  blank.classList.remove("hidden");
});
for (let btn of btnsClose) {
  btn.addEventListener("click", function() {
    let parent = this.dataset.parent;
    blank.classList.toggle("hidden");
    if (parent === ".aside--main") {
      aside[0].classList.add("aside--hidden");
    } else {
      $(parent).classList.add("hidden");
    }
  });
}

const showModal = function(btn, modal) {
  return function() {
    if (btn.dataset.area === "aside") {
      aside[0].classList.add("aside--hidden");
    }
    modal.classList.remove("hidden");
    blank.classList.remove("hidden");
    btn.blur();
  }
}
const btnsShowModal = function(btns, modal) {
  for (let btn of btns) {
    btn.addEventListener("click", showModal(btn, modal) );
  }
}
btnsShowModal(btnsCall, asideCallOrder);
btnsShowModal(btnsChat, asideFeedback);

blank.addEventListener("click", function() {
  aside[0].classList.add("aside--hidden");
  asideFeedback.classList.add("hidden");
  asideCallOrder.classList.add("hidden");
  blank.classList.add("hidden");
});
