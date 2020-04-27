const icon = document.getElementById('menu_icon')
const sidebar = document.getElementById('sidebar')
const body = document.getElementById('root')
const sidebarIcons = document.getElementsByClassName('sidebar_menu-links-item')

function close() {
    sidebar.className = 'close';
    icon.className = 'menu_icon'
}
Array.from(sidebarIcons).forEach(element => {
    element.addEventListener('click', close)
});

icon.addEventListener('click', () => {
    sidebar.className === 'open' ? sidebar.className = 'close' : sidebar.className = 'open';
    icon.className === 'menu_icon' ? icon.className = 'menu_icon_cross' : icon.className = 'menu_icon'
})
window.addEventListener('resize', () => {
    if (body.offsetWidth >= '1023') {
        sidebar.className = 'close'
        icon.className = 'menu_icon'
    }
})
window.addEventListener('scroll', function() {
    let users = document.getElementById('users')
    let register = document.getElementById('sign_in')
    let about = document.getElementById('about_me')
    let about_link = document.getElementById('about_link')
    let users_link = document.getElementById('users_link')
    let reg_link = document.getElementById('reg_link')
    let page = this.pageYOffset


    if (page >= about.offsetTop && page < users.offsetTop + 20) {
        about_link.className = 'a_link active'
        users_link.className = 'a_link'
        reg_link.className = 'a_link'
    } else if (page >= users.offsetTop && page < register.offsetTop) {
        about_link.className = 'a_link'
        users_link.className = 'a_link active'
        reg_link.className = 'a_link'
    } else if (page >= register.offsetTop) {
        about_link.className = 'a_link'
        users_link.className = 'a_link'
        reg_link.className = 'a_link active'
    } else {
        about_link.className = 'a_link'
        users_link.className = 'a_link'
        reg_link.className = 'a_link'
    }
})