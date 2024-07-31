const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", (e) =>{
    const value = e.target.value
    users.forEach(user =>{
        const isVisible = user.Name.includes(value) || user.Type.includes(value)
        //user.element.classList.toggle("hide", !isVisible)
        user.element.classList.toggle("hide", !isVisible)
    })
})

fetch("https://script.googleusercontent.com/macros/echo?user_content_key=Qg1pKelsP-GnOAUgD5T1oPnQ_MzPWXO-EuYgtCnvRQawEcr9RraHWy5Y4GvwfnRBrOQs68Fo2UvfJov24e3r-kMwmuT0IPlUm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHzDMuwdtJqnrRDr3A3fr68Pe0VCrStoQw5z0SlUsbIwWL3sRn5aG8rLm1JVau6cD2fYuUsd60DjfHQo2EfO8B46YNJZ_0SwQQ&lib=MGyzfp4jlAaTA2-OTV99yUiGR0zf_cVsI")
    .then(res => res.json())
    .then(data => {
        values = Object.values(data);
       // users = values[0]
     //for (const user of values[0])
     users = values[0].map(user => 
        {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const body = card.querySelector("[data-body]")
            header.textContent = user.Name
            body.textContent = user.Ranking
            userCardContainer.appendChild(card)
            return {Name: user.Name, Type: user.Ranking, element: card}
        })
    

   

})