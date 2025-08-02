// Load frame (menu component)
fetch('components/frame.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('frame-placeholder').innerHTML = data;

    // Once frame is loaded, populate menu content
    populateMenu();
  });

// Load footer
fetch('components/footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });

// Dynamic menu data injection function
function populateMenu() {
  const menuData = {
    logo: "img/logo.png",
    menuItems: [
      { name: "Home", link: "index.html" },
      { name: "Services", link: "services.html" },
      { name: "Contact", link: "contact.html" },
      { name: "Blogs", link: "blogs.html" }
    ],
    links: [
      { name: "Privacy Policy", link: "#" },
      { name: "Terms and Conditions", link: "#" },
      { name: "Careers", link: "#" }
    ],
    offices: [
      {
        country: "USA",
        address: "71 South Los Carneros Road, California",
        phone: "+51 174 705 812"
      },
      {
        country: "Egypt",
        address: "Leehove 40, 2678 MC De Lier, Netherlands",
        phone: "+31 174 705 811"
      }
    ]
  };

  // Delay slightly to ensure elements exist
  setTimeout(() => {
    const logoImg = document.getElementById("logo-img");
    const menuList = document.getElementById("main-menu-list");
    const usefulLinks = document.getElementById("useful-links");
    const officesContainer = document.getElementById("offices");

    if (!logoImg || !menuList || !usefulLinks || !officesContainer) {
      console.warn("Menu placeholders not found. Make sure HTML is loaded.");
      return;
    }

    // Set logo
    logoImg.src = menuData.logo;

    // Populate main menu
    menuList.innerHTML = "";
    menuData.menuItems.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("mil-has-children");
      li.innerHTML = `<a href="${item.link}">${item.name}</a>`;
      menuList.appendChild(li);
    });

    // Populate useful links
    usefulLinks.innerHTML = "";
    menuData.links.forEach(link => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${link.link}" class="mil-light-soft">${link.name}</a>`;
      usefulLinks.appendChild(li);
    });

    // Populate offices
    officesContainer.innerHTML = "";
    menuData.offices.forEach(office => {
      const div = document.createElement("div");
      div.className = "col-lg-4 mil-mb-60";
      div.innerHTML = `
        <h6 class="mil-muted mil-mb-30">${office.country}</h6>
        <p class="mil-light-soft">${office.address} <span class="mil-no-wrap">${office.phone}</span></p>
      `;
      officesContainer.appendChild(div);
    });
  }, 50);
}
