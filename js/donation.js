async function sendDonation(key, nickname, msg, amount, goalName) {
    const request = await fetch(`/api/donate/${key}`, {
        method: 'POST',
        body: JSON.stringify({userNickName: nickname, text: msg, amount: amount, goalName: goalName}),
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
    })
    const json = await request.json()
    return json
}

async function getGoals(id) {
    await fetch(`/api/user/${id}/goals`).then(
        response => {
            if (response.status == 200) {
                return response.json()
            } else {
                throw new Error('Ошибка получения целей')
            }
        }
    )
}

window.addEventListener('load', function() {
    const form = document.getElementById('donate-form')

    let choice  = document.getElementById('choice')
    let choices = document.querySelectorAll('.dropdown-item')
    for (let c of choices) {
        c.addEventListener('click', function() {
            let val = c.textContent
            choice.textContent = val
        })
    }
    let key = _.last(url.split('/'))

    getGoals(key).then(
        goals => {
            let choices = document.getElementById('goals')
            choices.textContent = ''
            choices.children = null
            let li = document.createElement('li')
            li.innerHTML = '<li><a className="dropdown-item" href="#">Выберите цель сбора</a></li>'
            choices.appendChild(li)
            for (let g of goals) {
                li = document.createElement('li')
                li.innerHTML = `<li><a className="dropdown-item" href="#">${g['name']}</a></li>`
                choices.appendChild(li)
            }
            form.addEventListener('submit', function(e) {
                e.preventDefault()
                let nickname = form.elements.nick_name.value
                let msg = form.elements.msg.value
                let amount = form.elements.money.value
                let goal_choice = form.elements.choice.textContent
                const url = document.location.href
                if (nickname != '' && amount != '' && goal_choice != 'Выберите цель сбора') {
                    sendDonation(key, nickname, msg, amount, goal_choice).then(
                        function(value) {
                            alert("Донат отправлен успешно")
                        },
                        function(error) {
                            alert(error)
                        }
                    )
                }
            })
        },
        error => {
            alert(error)
        }
    )
})