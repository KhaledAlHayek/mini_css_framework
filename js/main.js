const sidebarObj = {
  Menu1: {
    Title: "Getting Started",
    SubMenu: {
      Link1: "Introduction",
      Link2: "Cross Browser Compatability",
    }
  },
  Menu2: {
    Title: "Layout",
    SubMenu: {
      Link1: "Grid",
      Link2: "Media Queries",
      Link3: "Utilities for layout",
    }
  },
  Menu3: {
    Title: "Components",
    SubMenu: {
      Link1: "Alerts",
      Link2: "Badges",
      Link3: "Cards",
      Link4: "Buttons",
      Link5: "Navs",
    }
  },
  Menu4: {
    Title: "Utilitites",
    SubMenu: {
      Link1: "Spacing",
      Link2: "Bg-Colors",
      Link3: "Text-Colors",
      Link4: "Position",
      Link5: "Sizing",
    }
  },
  Menu5: {
    Title: "Content",
    SubMenu: {
      Link1: "Resets",
      Link2: "Typography",
    }
  },
}

const docsMenu = document.querySelector(".resources");
for(const key in sidebarObj){
  const title = sidebarObj[key].Title;
  const links = sidebarObj[key].SubMenu;
  const html = `
    <li class="bg-hover-info-light-9 text-hover-info text-gray-dark-2 fw-6">
      <i class="fa-solid fa-caret-right text-info-light-6"></i>
      <span>${title}</span>
    </li>
    <div class="sub-menu pl-5 p-2 d-n">
      ${(function generateLinks(){
        let linkText = "";
        for(const link in links){
          let hyphenSep = links[link];
          let dataSectionAttr = hyphenSep.split(" ").join("-").toLowerCase();
          linkText += `<span class="text-hover-info" data-section="${dataSectionAttr}">${links[link]}</span>`
        }
        return linkText;
      }())}
    </div>
  `;
  docsMenu.innerHTML += html;
}

const sidebarLinks = document.querySelectorAll(".docs .resources li");
const sideBarSubmenus = document.querySelectorAll(".docs .sub-menu");
const sideBarSubmenuLinks = document.querySelectorAll(".docs .sub-menu span");
sidebarLinks.forEach(link => {
  link.addEventListener("click", e => {
    sidebarLinks.forEach(link => {
      link.classList.remove("active");
      sideBarSubmenus.forEach(menu => {
        menu.style.display = "none";
      }); 
    })
    if(e.target.tagName == "I" || e.target.tagName == "SPAN"){
      e.target.parentElement.classList.add("active");
      const el = e.target.parentElement.nextElementSibling;
      el.style.display = "block";
    }
    else{
      e.target.classList.add("active");
      e.target.nextElementSibling.style.display = "block";
    }
  });
});

sideBarSubmenuLinks.forEach(link => {
  link.addEventListener("click", e => {
    sideBarSubmenuLinks.forEach(link => {
      link.classList.remove("active-link");
    });
    e.target.classList.add("active-link");
  });
});

const docs = document.getElementById("docs");
const sidebar = document.querySelector(".docs .sidebar");
window.onscroll = () => {
  if(scrollY >= docs.offsetTop){
    docs.classList.add("fixed-layout");
  }
  else{
    docs.classList.remove("fixed-layout");
  }
};

const sections = document.querySelectorAll(".docs .sections .section");
const links = document.querySelectorAll(".docs .resources .sub-menu");

links.forEach(link => {
  link.addEventListener("click", e => {
    if(e.target.tagName == "SPAN"){
      docs.scrollIntoView();
      const section = e.target.dataset.section;
      sections.forEach(sec => {
        sec.style.display = "none";
        document.querySelector(`.${section}`).style.display = "block";
      });
    }
  }); 
});
