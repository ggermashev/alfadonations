
async function logUser(login, password) {
    const request = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({login: login, password: password}),
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
    })
    const json = await request.json()
    return json
}

window.onload = function () {
    const form = document.getElementById('logform')
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        const login = form.elements.user_login.value
        const password = form.elements.pasword.value
        console.log(login, password)
        logUser(login, password).then(
            function(value) {
                sessionStorage.setItem('id', `${value['id']}`)
                window.location.href = '/profile'
            },
            function(error) {
                alert(error)
            }
        )
    })
}