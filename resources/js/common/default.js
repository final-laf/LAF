// includes header, footer
(() => {
    const includes = document.getElementsByClassName('link');

    for(let i of includes) {
        const file = i.getAttribute("data-include");

        if (file) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {i.innerHTML = this.responseText;}
                    if (this.status == 404) {i.innerHTML = "Page not found.";}
                    i.removeAttribute("data-include");
                }
            }

            xhttp.open("GET", file, true);
            xhttp.send();
        }
    }
})();