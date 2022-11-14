async function addGoal(id, name, limitAmount) {
    const request = await fetch(`/api/user/${id}/goals`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8',
        },
        body: JSON.stringify({name: name, limitAmount: limitAmount})
    })
    const json = await request.json()
    return json
}

window.addEventListener('load', function() {
    if (sessionStorage.getItem('id') != null) {
        const id = sessionStorage.getItem('id')
        let form = document.getElementById('goalform')
        form.addEventListener('submit', function () {
            let name = form.elements.goal_name.value
            let limit = form.elements.goal_limit.value
            if (name != '' && limit != '') {
                addGoal(id, name, limit).then(
                    function (val) {
                        alert('Цель добавлена успешно')
                        window.location.href = '/analytics'
                    },
                    function (error) {
                        alert(error)
                    }
                )
            }
        })
    }
    else {
        window.location.href = '/home'
    }
})