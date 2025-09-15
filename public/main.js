// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcE6oFu8xGQjiMZ3AhqfsUiQi0_Rfosdk",
  authDomain: "hatmar417-2278e.firebaseapp.com",
  projectId: "hatmar417-2278e",
  storageBucket: "hatmar417-2278e.firebasestorage.app",
  messagingSenderId: "329261151137",
  appId: "1:329261151137:web:6c7681d266f11a554391e0",
  measurementId: "G-V1NZMNH41X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', function() {
    fetch('menu.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('menu-placeholder').innerHTML = data;

            const menuToggle = document.getElementById('menu-toggle');
            const menu = document.getElementById('fixed-menu');

            if (menuToggle && menu) {
                // Toggle main menu
                menuToggle.addEventListener('click', function(event) {
                    menu.classList.toggle('open');
                    menu.style.display = 'block';
                    event.stopPropagation();
                });

                // Close menu when clicking outside
                document.addEventListener('click', function(event) {
                    if (!menu.contains(event.target) && event.target !== menuToggle) {
                        menu.classList.remove('open');
                    }
                });
            } else {
                console.error('Menu or menu toggle element not found');
            }

            // Submenu toggle logic
            const gdud41Toggle = document.getElementById('gdud41-toggle');
            const gdud41Submenu = document.getElementById('gdud41-submenu');
            
            const gdud47Toggle = document.getElementById('gdud47-toggle');
            const gdud47Submenu = document.getElementById('gdud47-submenu');

            if (gdud41Toggle && gdud41Submenu) {
                gdud41Toggle.addEventListener('click', function(event) {
                    event.preventDefault();
                    gdud41Submenu.style.display = gdud41Submenu.style.display === 'block' ? 'none' : 'block';
                    event.stopPropagation();
                });
            }

            if (gdud47Toggle && gdud47Submenu) {
                gdud47Toggle.addEventListener('click', function(event) {
                    event.preventDefault();
                    gdud47Submenu.style.display = gdud47Submenu.style.display === 'block' ? 'none' : 'block';
                    event.stopPropagation();
                });
            }
        })
        .catch(error => console.error('Error loading menu:', error));
});
