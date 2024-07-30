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

fetch("https://script.googleusercontent.com/macros/echo?user_content_key=p79Mpieu_XMKji8JTdpF7NslHbOgF2OjSeMovblCKHpGjoObSgzu5sPVmOMyT6uMTJN_qNZL8TzWbd3h3sTmUQHqiqgvANyNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnF9BgOB2-GvL2xvozhIfCoCXRtDRpo03dP-dDButG6uB2PGmG2HJ-xJr9_Ndd7VfRO-1E7qbHytgXsHj9wCIwCYmQcTCEFj7nQ&lib=MGyzfp4jlAaTA2-OTV99yUiGR0zf_cVsI")
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
            body.textContent = user.Type
            userCardContainer.appendChild(card)
            return {Name: user.Name, Type: user.Type, element: card}
        })
    

   

})