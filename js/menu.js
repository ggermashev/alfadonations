window.addEventListener('load', function () {
    let menu = document.getElementById('menu')
    let right_menu = document.getElementById('right_menu')
    if (sessionStorage.getItem('id') != null) {
        console.log(sessionStorage.getItem('id'))
        menu.innerHTML = '<li class="nav-item">\n' +
            '                    <a class="nav-link menu" href="/profile">Личный кабинет</a>\n' +
            '                </li>\n' +
            '                <li class="nav-item">\n' +
            '                    <a class="nav-link menu" href="/analytics">Статистика</a>\n' +
            '                </li>' +
            '                 <li class="nav-item">\n' +
            '                    <a class="nav-link menu" href="/users">Пользователи</a>\n' +
            '                </li> '
        right_menu.innerHTML =
            '                <li class="nav-item">\n' +
            '                    <a class="nav-link menu" href="/out">Выход</a>\n' +
            '                </li>'

    } else {
        menu.innerHTML =
            '                 <li class="nav-item">\n' +
            '                    <a class="nav-link menu" href="/users">Пользователи</a>\n' +
            '                </li> '
        right_menu.innerHTML = '<li class="nav-item">\n' +
            '                    <a class="nav-link menu" href="/registration">Регистрация</a>\n' +
            '                </li>\n' +
            '                <li class="nav-item">\n' +
            '                    <a class="nav-link menu" href="/login">Вход</a>\n' +
            '                </li>'
    }
})