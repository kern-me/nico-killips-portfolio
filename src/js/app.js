const site_body = document.body;
const btnMenu = document.getElementById('btn_menu');
const firstMenuItem = document.querySelector('#site_nav > li:nth-child(1) > a');
const site_header = document.querySelector('.site-header');
const siteNav = document.querySelector('.site-nav');
const lastMenuItem = document.querySelector('#site_nav > li:last-child > a');
const menuItems = siteNav.querySelectorAll('a[href]');

// Function to update menu items' focusability
const updateMenuItemsFocusability = (isMenuOpen) => {
  const tabIndex = isMenuOpen ? '0' : '-1';
  menuItems.forEach(item => {
    item.setAttribute('tabindex', tabIndex);
  });
  siteNav.setAttribute('aria-hidden', !isMenuOpen);
};

// Get all focusable elements within the site-nav
const getFocusableElements = () => {
  if (!site_body.classList.contains('menu-open')) {
    return [];
  }
  const focusableSelectors = 'a[href]:not([tabindex="-1"])';
  return Array.from(siteNav.querySelectorAll(focusableSelectors));
};

// Handle keyboard navigation
const handleKeyboard = (event) => {
  if (!site_body.classList.contains('menu-open')) return;

  const focusableElements = getFocusableElements();
  const isTabPressed = event.key === 'Tab';
  const isEscapePressed = event.key === 'Escape';

  if (isEscapePressed) {
    event.preventDefault();
    site_body.classList.remove('menu-open');
    updateMenuItemsFocusability(false);
    btnMenu.focus();
    return;
  }

  if (!isTabPressed) return;

  if (event.shiftKey) {
    if (document.activeElement === firstMenuItem) {
      event.preventDefault();
      btnMenu.focus();
    } else if (document.activeElement === btnMenu) {
      event.preventDefault();
      lastMenuItem.focus();
    }
  } else {
    if (document.activeElement === lastMenuItem) {
      event.preventDefault();
      btnMenu.focus();
    } else if (document.activeElement === btnMenu) {
      event.preventDefault();
      firstMenuItem.focus();
    }
  }
};

document.addEventListener('keydown', handleKeyboard);

document.addEventListener('click', event => {
  const btnMenuClicked = btnMenu.contains(event.target);

  // Click outside the menu
  if (!btnMenuClicked && site_body.classList.contains('menu-open')) {
    site_body.classList.remove('menu-open');
    updateMenuItemsFocusability(false);
  }

  // Toggle open state
  if (btnMenuClicked) {
    const willBeOpen = !site_body.classList.contains('menu-open');
    site_body.classList.toggle('menu-open');
    updateMenuItemsFocusability(willBeOpen);

    // Set focus to first menu item when menu opens
    if (willBeOpen) {
      firstMenuItem.focus();
    }
  }
});

// Initialize menu items as not focusable
updateMenuItemsFocusability(false);

function scrollToTop() {
  site_header.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

scrollToTop();
