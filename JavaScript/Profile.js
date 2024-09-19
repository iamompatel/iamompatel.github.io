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
     Username = params["Username"];
    console.log(Username);


    var link1 = "https://script.google.com/macros/s/AKfycbz5Y8lrRr9-4oRD1eiRQXI-cow37ngxVfPNKNtV70xJ3O_B7K74z8n-p8ooCi6x4C1V/exec?Username=" + Username;
 console.log(link1);
 fetch( API_SIGN_URL + "?Username=" + Username)
    .then(res => res.json())
    .then(data => {
        values = Object.values(data);
        console.log(data);

        users = values[0].map(user => 
                    {
                    
                        const Name = document.querySelector(".name")
                        Name.textContent = user.Username

                        const Name1 = document.querySelector(".name1")
                        Name1.textContent = user.Username

                        const Email = document.querySelector(".email")
                        Email.textContent = user.Email

                        const ZipCode = document.querySelector(".zip")
                        ZipCode.textContent = user.Zip

                        const Date = document.querySelector(".date")
                        Date.textContent = user.Date
                        
                        const History = document.querySelector(".history")
                        History.textContent = user.History
                        
                    })
 } )
}
