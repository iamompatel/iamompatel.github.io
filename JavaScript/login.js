// async function clear(){
//     console.log("clear");

//     //clear username 
//     document.getElementById("username").value = "";
    
//     //clear password
//     document.getElementById("password").value = "";
// }

async function submit(){
    console.log("submit");

    //grab username 
    var username = document.getElementById("username").value;
    console.log(username);
    if(username === ""){
        alert("Please enter a username");
    }

    
    //grab password
    var password = document.getElementById("password").value;
    console.log(password);
    if(password === ""){
        alert("Please enter a password");
    }
    

    //fectch username and password from the database 
    fetch(API_SIGN_URL + "?Username=" + username)
    .then(res => res.json())
    .then(data => {
        values = Object.values(data);
        console.log(data);
        
        if(data.data.length!==0 && username === data.data[0].Username && password === data.data[0].Password){
            console.log("Login successful");
            window.location.href = "Home.html?Username=" + username;
        }
        else
        {
            alert("Login failed");
        }



        // if(username === values[0][0].Username && password === values[0][0].Password){
        //     console.log("Login successful");
        //    // window.location.href = "school.html?ID=" + values[0].ID;
        // }
        // else{
        //     console.log("Login failed");
        // }

})

}


