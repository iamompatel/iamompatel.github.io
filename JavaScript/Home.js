const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", (e) =>{
    const value = e.target.value.toLowerCase()
    users.forEach(user =>{
        const isVisible = user.Name.toLowerCase().includes(value) || user.Type.toLowerCase().includes(value)
        //user.element.classList.toggle("hide", !isVisible)
        user.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://script.google.com/macros/s/AKfycbxT7QQjG0bmgQhDnV-bCh8J25ToXyjSdcOnoRDcOKFWvVrfYaZAoJJP05TZMXV8_PTE/exec")
    .then(res => res.json())
    .then(data => {
        values = Object.values(data);
       // users = values[0]b  
     //for (const user of values[0])
     users = values[0].map(user => 
        {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const body = card.querySelector("[data-body]")
            const IMG = card.querySelector("[data-img]")
            const schoolBTN = card.querySelector("[data-btn]")
            header.textContent = user.Name
            body.textContent = user.Ranking
             IMG.src = user.Images
             IMG.id = user.ID
            schoolBTN.id = user.ID
      
            userCardContainer.appendChild(card)
            return {Name: user.Name, Type: user.Ranking, element: card}
        })
    

   

})

async function schoolNameClicked(ID){
       console.log(ID);
    //    url = ("http://127.0.0.1:5500/HTML/school.html?ID=" + ID);
    //    document.location.href = url;
    window.location.href = "school.html?ID=" + ID.id;
 
}

 