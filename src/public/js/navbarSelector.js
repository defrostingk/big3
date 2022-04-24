selectNavbarMenu();

function selectNavbarMenu() {
  const headerTitle = document.querySelector('.header__title');
  const navbar = document.querySelector('nav');

  if (headerTitle && navbar) {
    const navbarMenus = navbar.querySelectorAll('a');

    navbarMenus.forEach((navbarMenu) => {
      const navbarMenuTitle = navbarMenu.querySelector('span');
      if (headerTitle.innerText === navbarMenuTitle.innerText) {
        navbarMenu.classList.add('selected');
      } else {
        if (navbarMenu.classList.contains('selected'))
          navbarMenu.classList.remove('selected');
      }
    });
  }
}
