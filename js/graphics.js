async function getDonation(id) {
    const request = await fetch(`/api/user/data/${id}`)
    const json = await request.json()
    return json
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
    // let amounts_arr = []
    // for (let a of amounts) {
    //     amounts_arr.push({'date': a, 'amount': amounts[a]})
    // }
    return amounts
}

function getMonths(donates) {
    let months = []
    for (let d of donates) {
        let date = _.join(_.slice(d['date'].split(' ')[0].split('.'), 1, 3), '.')
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


window.addEventListener('load', function() {
    if (sessionStorage.getItem('id') != null) {
        const id = sessionStorage.getItem('id')
        getDonation(id).then(
            function(donates) {
                let months = getMonths(donates)
                let amounts = getAmounts(donates)
                let only_amounts = []
                for (let m of months) {
                    only_amounts.push(amounts[m])
                }
                const canvas_graph = document.getElementById('donations-graph');
                const graphs = new Chart(canvas_graph, {
                    type: 'line',
                    data: {
                        labels: months,
                        datasets: [{
                            label: 'Донаты',
                            data: only_amounts,
                            borderColor: [
                                'black',
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            },
            function(error) {
                alert(error)
            }
        )
    }
    else {
    }
})


