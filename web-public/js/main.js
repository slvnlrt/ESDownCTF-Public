document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    const loadHeader = fetch('/header.html').then(response => response.text());
    const loadFooter = fetch('/footer.html').then(response => response.text());

    Promise.all([loadHeader, loadFooter])
        .then(([headerHtml, footerHtml]) => {
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = headerHtml;
            }
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = footerHtml;
            }

            // After loading components, initialize theme and make body visible
            initializeTheme();
            document.body.classList.add('body-visible');
        });

    function initializeTheme() {
        const themeSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
          
            if (currentTheme === 'dark') {
                if(themeSwitch) themeSwitch.checked = true;
            }
        } else {
             document.documentElement.setAttribute('data-theme', 'light');
        }

        function switchTheme(e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            else {        
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }    
        }

        if (themeSwitch) {
            themeSwitch.addEventListener('change', switchTheme, false);
        }
    }
});