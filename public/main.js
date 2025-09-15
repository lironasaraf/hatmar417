// Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBcE6oFu8xGQjiMZ3AhqfsUiQi0_Rfosdk",
  authDomain: "hatmar417-2278e.firebaseapp.com",
  projectId: "hatmar417-2278e",
  storageBucket: "hatmar417-2278e.firebasestorage.app",
  messagingSenderId: "329261151137",
  appId: "1:329261151137:web:6c7681d266f11a554391e0",
  measurementId: "G-V1NZMNH41X"
};

const app = initializeApp(firebaseConfig);

// אל תתני ל-Analytics להפיל את כל הסקריפט
isSupported()
  .then((ok) => { if (ok) { try { getAnalytics(app); } catch (e) { console.warn("Analytics init failed:", e); } } })
  .catch((e) => console.warn("Analytics not supported:", e));

// MENU
document.addEventListener('DOMContentLoaded', function() {
  fetch('menu.html')
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then((html) => {
      const placeholder = document.getElementById('menu-placeholder');
      if (!placeholder) {
        console.error('#menu-placeholder not found');
        return;
      }

      placeholder.innerHTML = html;

      const menuToggle = document.getElementById('menu-toggle');
      const menu = document.getElementById('fixed-menu');

      if (!menu || !menuToggle) {
        console.error('Menu or toggle not found AFTER inject');
        return;
      }

      // פתיחה/סגירה של התפריט הראשי
      menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        menu.classList.toggle('open');
        // אם את מסתמכת על display ידני:
        menu.style.display = menu.classList.contains('open') ? 'block' : '';
      });

      // סגירה בלחיצה מחוץ לתפריט
      document.addEventListener('click', (event) => {
        if (menu.classList.contains('open') && !menu.contains(event.target) && event.target !== menuToggle) {
          menu.classList.remove('open');
          menu.style.display = ''; // החזרה לברירת מחדל
        }
      });

      // === האצלת אירועים לתתי-תפריטים ===
      // עובד גם אם שמות ה-IDs ישתנו, כל עוד יש class="submenu-toggle" ו-ul.submenu אחרי ה-a
      menu.addEventListener('click', (event) => {
        const toggle = event.target.closest('a.submenu-toggle, a#gdud41-toggle, a#gdud47-toggle');
        if (!toggle || !menu.contains(toggle)) return;

        event.preventDefault();
        event.stopPropagation();

        const submenu = toggle.nextElementSibling;
        if (!submenu || !submenu.classList.contains('submenu')) return;

        const isOpen = submenu.style.display === 'block' || !submenu.hasAttribute('hidden');
        // תמיכה בשתי השיטות: inline display או [hidden]
        if (isOpen) {
          submenu.style.display = 'none';
          submenu.setAttribute('hidden', '');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          submenu.style.display = 'block';
          submenu.removeAttribute('hidden');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });

      console.log('Menu ready: delegation attached');
    })
    .catch((error) => console.error('Error loading menu:', error));
});
