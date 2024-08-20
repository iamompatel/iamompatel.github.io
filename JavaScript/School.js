var schoolID = "";
window.onload = function() {
    var idx = document.URL.indexOf('?');
    var params = new Array();
    if(idx != -1)
    {
        var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
        for(var i=0; i<pairs.length; i++) {
            nameVal = pairs[i].split('=');
            params[nameVal[0]] = nameVal[1];
           
        }
    }
     schoolID = params["ID"];


    var link1 = "https://script.google.com/macros/s/AKfycbyPSv7lOXmZLAXTgiKGizp0SyKitEI5U5oVhz-A8MFpggofoXmx--RHiT3Ms2Am-9A_/exec?ID=" + schoolID;
 console.log(link1);
 fetch("https://script.google.com/macros/s/AKfycbyPSv7lOXmZLAXTgiKGizp0SyKitEI5U5oVhz-A8MFpggofoXmx--RHiT3Ms2Am-9A_/exec?ID=" + schoolID)
    .then(res => res.json())
    .then(data => {
        values = Object.values(data);
        console.log(data);

        users = values[0].map(user => 
                    {
                    
                        const Name = document.querySelector(".TName")
                        Name.textContent = user.Name

                        const Intro = document.querySelector(".introP")
                        Intro.textContent = user.Introduction

                        const Admission = document.querySelector(".admissionP")
                        Admission.textContent = user.Admission

                        const Fee = document.querySelector(".feeP")
                        Fee.textContent = user.Fee

                        const Ranking = document.querySelector(".RankP")
                        Ranking.textContent = user.Ranking

                        const Address = document.querySelector(".addressP")
                        Address.textContent = user.Address
                        
                    })
 } )
}

 

