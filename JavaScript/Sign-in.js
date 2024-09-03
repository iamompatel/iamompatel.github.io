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
  }
  if (password !== repass) {
    alert("Passwords do not match");
  }

  fetch(
    "https://script.google.com/macros/s/AKfycbw4Nn0G9COu37MQeVMDt2hynl2rU9GH_yzxLCikpz2UbBuFonO5tbJd-EM3FPH9TSqP/exec?Username=" +
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
        fetch(
          "https://script.google.com/macros/s/AKfycbw4Nn0G9COu37MQeVMDt2hynl2rU9GH_yzxLCikpz2UbBuFonO5tbJd-EM3FPH9TSqP/exec",
          {
            method: "POST",
            body: data,
          }
        )
          .then((res) => res.text())
          .then((data) => console.log(data));
          window.location.href = "Home.html";
      }
    });
}
//  let form = document.querySelector("form");
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         let data = new FormData(form);
//         fetch('https://script.google.com/macros/s/AKfycbw4Nn0G9COu37MQeVMDt2hynl2rU9GH_yzxLCikpz2UbBuFonO5tbJd-EM3FPH9TSqP/exec', {
//             method: 'POST',
//             body: data
//         })
//             .then(res => res.text())
//             .then(data => console.log(data));

//     });
//     var form = document.getElementById("form");
// form.addEventListener("submit", e =>{
//     method : "POST";
//     // body: new FormData(document.getElementById("sheetdb-form"));

// });
