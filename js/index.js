document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/monsters/?_limit=50")
        .then(res => res.json())
        .then(data => data.forEach(obj => displayMonsters(obj)))


    function displayMonsters(obj) {
        let monster = document.createElement('div')
        monster.innerHTML = `
            <h2> ${obj.name} </h2>
                <p> Age: ${obj.age} </p>
                <p> Description: ${obj.description} </p>
        `
        document.querySelector('#monster-container').appendChild(monster)
    } 

    document.querySelector('#monster-form').addEventListener('submit', (e) => {
        e.preventDefault()
        let createdMonsterObj = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        }
        monsterEntry(createdMonsterObj)
        document.querySelector('#monster-form').reset()
    })
    

    function monsterEntry (obj) {
        fetch("http://localhost:3000/monsters", {
        method: 'POST',
        headers:
            {
            "Content-Type": "application/json",
            Accept: "application/json"
            }, 
        body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    document.querySelector('#forward').addEventListener('click', () => {
        fetch("http://localhost:3000/monsters/?_limit=50&_page=2")
        .then(res => res.json())
        .then(data => data.forEach(obj => displayMonsters(obj)))
    })


})