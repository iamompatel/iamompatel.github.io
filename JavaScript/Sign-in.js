
async function submit() {
  console.log("submit");

  //grad username
  var username = document.getElementById("username").value;
  console.log(username);
  if (username === "") {
    alert("Please enter a username");
  }

  //grab password
  var password = document.getElementById("password").value;
  console.log(password);
  if (password === "") {
    alert("Please enter a password");
  }

  //grab re-enter password
  var repass = document.getElementById("repass").value;
  console.log(repass);
  if (password === "") {
    alert("Please enter a password");
    window.location.href = "Sign-in.html";
  }
  if (password !== repass) {
    alert("Passwords do not match");
    window.location.href = "Sign-in.html";
  }

  //grab zip code
  var zip = document.getElementById("zip").value;
  console.log(zip);

  //grab type
  var type = document.getElementById("type").value;

  //grab Email
  var Email = document.getElementById("email").value;

  //Grab Date
  // var Date = document.getElementById("Date").value

  fetch(
    API_SIGN_URL + "?Username=" +
      username
  )
    .then((res) => res.json())
    .then((data) => {
      values = Object.values(data);
      console.log(data);

      if (data.data.length !== 0 && username === data.data[0].Username) {
        alert("User already Exists try again!!!");
        window.location.href = "Sign-in.html";
      } else {
        let form = document.querySelector("form");
        let data = new FormData(form);
        // Grab the current date
        var joinDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

        // Append the join date to the FormData
        data.append("date", joinDate);
        data.append("history", "none");
        fetch(
          API_SIGN_URL,
          {
            method: "POST",
            body: data,
          }
        )
          .then((res) => res.text())
          .then((data) => console.log(data));
          window.location.href = "Home.html?Username=" + username;
      }
    });
}
