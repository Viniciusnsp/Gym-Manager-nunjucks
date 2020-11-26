const page = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (page.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}




