import "./styles.css";
import { displayHome, displayMenu, displayAbout } from "./utilities.js";

// We declare variables that store the DOM elements
const homeBtn = document.getElementById('home');
const menuBtn = document.getElementById('menu');
const aboutBtn = document.getElementById('about');
const content = document.getElementById('content');

// When the website loads, we set the home button as the default page
window.addEventListener('load', () => {
    displayHome(homeBtn, content);
});

homeBtn.addEventListener('click', () => {
    displayHome(homeBtn, content);
});

menuBtn.addEventListener('click', () => {
    displayMenu(menuBtn, content)
});

aboutBtn.addEventListener('click', () => {
    displayAbout(aboutBtn, content);
});
