async function getUser(id) {
    const request = await fetch(`/api/user/${id}`)
    const json = await request.json()
    return json
}

async function setInfo(id, aboutUser, streamContent, channelDescription) {
    const request = await fetch(`/api/user/${id}/info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({aboutUser: aboutUser, streamContent: streamContent, channelDescription: channelDescription})
    })
    const json = await request.json()
    return json
}

window.addEventListener('load', function () {
    if (sessionStorage.getItem('id') != null) {
        const id = sessionStorage.getItem('id')
        getUser(id).then(
            function (user) {
                const login = user['login']
                const nickname = user['nickname']
                const urlDonateForm = user['urlDonateForm']
                const urlWidget = user['urlWidget']
                const aboutUser = user['aboutUser']
                const streamContent = user['streamContent']
                const channelDescription = user['channelDescription']
                let info = document.getElementById('info')
                info.innerHTML = `<li class="info" id="log_in">Логин: ${login}</li>
                <li class="info" id="nick_name">Никнейм: ${nickname}</li>
                <li class="info" id="donate">Ссылка на донат: ${urlDonateForm}</li>
                <li class="info" id="widget">Ссылка на виджет: ${urlWidget}</li>`
                let about = document.getElementById('aboutUser')
                let content = document.getElementById('streamContent')
                let description = document.getElementById('channelDescription')
                about.textContent = aboutUser
                content.textContent = streamContent
                description.textContent = channelDescription
                let form = document.getElementById('about')
                form.addEventListener('submit', function(e) {
                    e.preventDefault()
                    let about = form.elements.aboutUser.value
                    let content = form.elements.streamContent.value
                    let description = form.elements.channelDescription.value
                    setInfo(id, about, content, description).then(
                        function(value) {
                            about.textContent = aboutUser
                            content.textContent = streamContent
                            description.textContent = channelDescription
                        },
                        function(error) {
                            alert(error)
                        }
                    )
                })
            },
            function (error) {
                alert(error)
            }
        )
    } else {
        console.log("not authenticated")
        window.location.href='/home'
    }
})