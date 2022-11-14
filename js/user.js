async function getInfo(id) {
    const request = await fetch(`/api/user/${id}/info`)
    const json = request.json()
    return json
}

window.addEventListener('load', function () {
    let id = _.last(window.location.href.split('/'))
    let donation_link = document.getElementById('donation')
    donation_link.innerHTML = `<h2><a href="/donation/${id}">Отправить донат</a></h2>`
    let about_user = document.getElementById('about_user')
    let content = document.getElementById('content')
    let description = document.getElementById('description')
    let name = document.getElementById('user_name')
    getInfo(id).then(
        val => {
            about_user.textContent = val['aboutUser']
            content.textContent = val['streamContent']
            description.textContent = val['channelDescription']
            name.textContent = val['nickname']
        },
        error => {
            alert(error)
        }
    )

})