async function getUsers() {
    const request = await fetch('/api/users')
    const json = request.json()
    return json
}


window.addEventListener('load', function () {
    OverlayScrollbars(document.getElementById('user-list'), {
        className       : "os-theme-dark",
        sizeAutoCapable : true,
        paddingAbsolute : true,
        scrollbars : {
            clickScrolling : true
        }
    });
    let users = document.getElementById('user-list')
    users.innerHTML = ''
    users.children = null
    getUsers().then(
        us => {
            for (let u of us) {
                let li = document.createElement('li')
                li.innerHTML = `<li class="user-list"><a href="user/${u['id']}">${u['nickname']}</a></li> `
                users.appendChild(li)
            }
        },
        error => {
            alert(error)
        }
    )
    let search = document.getElementById('search')
    search.addEventListener('change', setTimeout(
        function () {
            users.innerHTML = ''
            users.children = null
            getUsers().then(
                us => {
                    for (let u of us) {
                        if (u['nickname'].toLowerCase().includes(search.value.toLowerCase())) {
                            let li = document.createElement('li')
                            li.innerHTML = `<li class="user-list"><a href="user/${u['id']}">${u['nickname']}</a></li> `
                            users.appendChild(li)
                        }
                    }
                },
                error => {
                    alert(error)
                }
            )
        }, 500
    ))
})
