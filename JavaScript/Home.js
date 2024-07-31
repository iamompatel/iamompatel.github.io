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

fetch("https://script.googleusercontent.com/macros/echo?user_content_key=E4T92Sgp0bRUkEx-fBWo6nc3-I0m4opxCUwdTpN6buDjrtVgMkEJ1tm6215fZhy7-6F7-3GKqCBc0Ehde48uwD_V3nl1wOrwm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKYcuUClqqyRLzT9GUkYnM_XVJblVz1rr97237XPfM-d2DCLNve_pjo5ql-xEL2OwMdNWAXlVAQsygF2WNFPcMLx2nNMOLeTPA&lib=MGyzfp4jlAaTA2-OTV99yUiGR0zf_cVsI")
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