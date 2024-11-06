function toggleTheme() {
    const themeToggle = document.getElementById('theme_togg');
    const themeLink = document.getElementById('theme');

    if (themeToggle.checked) {
        themeLink.setAttribute('href', "/static/dark.css");
        localStorage.setItem('selectedTheme', "/static/dark.css");
    } else {
        themeLink.setAttribute('href', "/static/light.css");
        localStorage.setItem('selectedTheme', "/static/light.css");
    }
}

window.onload = function() {
    const savedTheme = localStorage.getItem('selectedTheme') || "/static/light.css";
    document.getElementById('theme').setAttribute('href', savedTheme);
    document.getElementById('theme_togg').checked = savedTheme.includes('dark.css');
}
