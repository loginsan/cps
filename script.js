(function() {
  "use strict";
  const breakp = window.matchMedia( "(min-width:33.75em)" );
  let swipers = [];
  const swiperPag = [
    document.querySelector(".brands__bullets"),
    document.querySelector(".devices__bullets"),
    document.querySelector(".prices__bullets")
  ];

  const swiperCfg = function(paginationEl) {
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
    swipers[0] = new Swiper( ".brands__pool", swiperCfg( ".brands__bullets" ));
    swipers[1] = new Swiper( ".devices__pool", swiperCfg( ".devices__bullets" ));
    swipers[2] = new Swiper( ".prices__pool", swiperCfg( ".prices__bullets" ));
  };

  const breakpChecker = function() {
    if (breakp.matches === true) {
      if (swipers[0] !== undefined) {
        for (let p of swiperPag) {
          p.classList.add("hidden");
        }
        for (let s of swipers) {
          s.destroy(true, true);
        }
      }
      return;
    } // else
    for (let p of swiperPag) {
      p.classList.remove("hidden");
    }
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
for (let e of expands) {
  e.btn.addEventListener("click", function() {
    let reverse = e.btn.classList.contains("expand-button--reverse");
    let height = e.box.scrollHeight;
    e.box.style = (reverse)? "" : `height: ${height}px`;
    e.box.classList.toggle(e.cname + "--short");
    e.btn.classList.toggle("expand-button--reverse");
    e.btn.textContent = (reverse)? e.btext : "Скрыть";
  });
}

// SiteNavLinks animate
const siteNav = {
  links: $$(".sitenav__link"),
  elem: $(".sitenav"),
  active: "sitenav__link--active"
};
for (let link of siteNav.links) {
  link.addEventListener("click", function(evt) {
    this.blur();
    evt.preventDefault();
    if (!this.classList.contains(siteNav.active)) {
      let activeLink = siteNav.elem.querySelector("." + siteNav.active);
      activeLink.classList.remove(siteNav.active);
      this.classList.add(siteNav.active);
    }
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

const btnsShowModal = function(btns, modal) {
  for (let btn of btns) {
    btn.addEventListener("click", function() {
      if (this.dataset.area === "aside") {
        asideMain.classList.add("aside--hidden");
      }
      modal.classList.remove("hidden");
      blank.classList.remove("hidden");
      this.blur();
    });
  }
}
btnsShowModal(btnsCall, asideCallOrder);
btnsShowModal(btnsChat, asideFeedback);

blank.addEventListener("click", function() {
  asideMain.classList.add("aside--hidden");
  asideFeedback.classList.add("hidden");
  asideCallOrder.classList.add("hidden");
  blank.classList.add("hidden");
});
