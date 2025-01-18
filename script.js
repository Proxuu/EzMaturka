function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
    const background = document.getElementById('background');
    background.classList.toggle('activee')
}

document.querySelector('.toggle-button').addEventListener('click', toggleMenu);





