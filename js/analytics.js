async function getDonation(id) {
    const request = await fetch(`/api/user/data/${id}`)
    const json = await request.json()
    return json
}

async function getGoals(id) {
    const request = await fetch(`/api/user/${id}/goals`)
    const json = await request.json()
    return json
}


function getDonators(donates) {
    let users = {}
    for (let d in donates) {
        if (_.has(users, d['userNickName'])) {
            users[d['userNickName']] += d['amount']
        } else {
            users[d['userNickName']] = d['amount']
        }
    }
    let users_array = []
    for (let k in users) {
        users_array.push({'nick_name': k, 'amount': users[k]})
    }
    users_array.sort(function (a, b) {
        b.amount - a.amount
    })
    return users_array
}

function getAmounts(donates) {
    let amounts = {}
    for (let d of donates) {
        let date = _.slice(d['date'].split(' ')[0].split('.'), 1, 3)
        if (_.has(amounts, date)) {
            amounts[date] += d['amount']
        } else {
            amounts[date] = d['amount']
        }
    }
    return amounts
}

function getMonths(donates) {
    let months = []
    for (let d of donates) {
        let date = _.slice(d['date'].split(' ')[0].split('.'), 1, 3)
        if (!months.includes(date)) {
            months.push(date)
        }
    }
    months.sort(function (a, b) {
        let y1 = a.split('.')[1]
        let y2 = b.split('.')[1]
        let m1 = a.split('.')[0]
        let m2 = b.split('.')[0]
        if (y1 != y2) {
            return y1 - y2
        } else {
            return m1 - m2
        }
    })
    return _.slice(months, 0, 12)
}


window.addEventListener('load', function () {
    if (sessionStorage.getItem('id') != null) {
        const id = sessionStorage.getItem('id')
        Promise.all([getDonation(id), getGoals(id)]).then(
            function (values) {
                let donators = getDonators(values[0])
                let goals = values[1]
                // let months = getMonths(values[0])
                // let amounts = getAmounts(values[0])
                let donators_list = document.getElementById('donators')
                donators_list.innerHTML = ''
                donators_list.children = null
                for (let d of donators) {
                    let li = document.createElement('li')
                    li.innerHTML = `<li className="donator">${d['nick_name']}</li>`
                    donators_list.appendChild(li)
                }
                let goals_list = document.getElementById('goal-list')
                goals_list.innerHTML = ''
                goals_list.children = null
                for (let g of goals) {
                    let li = document.createElement('li')
                    li.innerHTML =
                                    `<li>
                                    <h3 class="justify-content-center">${g['name']}</h3>
                                    <div class="progress">
                                    <div class="progress-bar progress-bar-striped bg-danger" role="progressbar"
                                         style="width: ${100*g['currentAmount']/g['limitAmount']}%"
                                         aria-valuemin="0"
                                         aria-valuemax="100">
                                    </div>
                                    </div>
                                    <p class="amount">${g['currentAmount']/g['limitAmount']}%(Максимум - ${g['limitAmount']}р)</p>
                                    </li>`
                    goals_list.appendChild(li)
                }
                let add_goal = document.getElementById('add_goal')
                add_goal.addEventListener('click', function() {
                    window.location.href = `/add_goal`
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