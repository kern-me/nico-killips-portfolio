import "../sass/style.scss";

const site_body = document.body
const btnMenu = document.getElementById('btn_menu')
const open_site_menu = document.querySelector('body.menu-open .site-nav')
const firstMenuItem = document.querySelector('#site_nav > li:nth-child(1) > a');

document.addEventListener('click', event => {
  const btnMenuClicked = btnMenu.contains(event.target)

  // Click outside the menu
  if (!btnMenuClicked && site_body.classList.contains('menu-open')) {
    site_body.classList.remove('menu-open');
  }

  // Toggle open state
  if(btnMenuClicked){
    site_body.classList.toggle('menu-open');
  }

  if (site_body.classList.contains('menu-open')) {
    firstMenuItem.focus();
  }
})

if (firstMenuItem.hasFocus) {
  console.log('first menu element is active!')
}

function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  firstFocusableElement.focus();

  element.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  });
}



// Usage example:

//open_site_menu.addEventListener('focusin', () => trapFocus(open_site_menu));

$(function(){

  // jQuery methods go here...

});



