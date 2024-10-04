var Username = "";
const value = "";
const signURL =
  "https://script.google.com/macros/s/AKfycbycDu3PjVHTw4TIOKGnbSupvjzNG6Xl1j0rWOYiInfjNbrbAVfDbsSrZQxzdKqffFgO/exec";
const schoolURL =
  "https://script.google.com/macros/s/AKfycbxT7QQjG0bmgQhDnV-bCh8J25ToXyjSdcOnoRDcOKFWvVrfYaZAoJJP05TZMXV8_PTE/exec";
window.onload = function () {
  var idx = document.URL.indexOf("?");
  var params = new Array();
  if (idx != -1) {
    var pairs = document.URL.substring(idx + 1, document.URL.length).split("&");
    for (var i = 0; i < pairs.length; i++) {
      nameVal = pairs[i].split("=");
      params[nameVal[0]] = nameVal[1];
    }
  }
  Username = params["Username"];
  console.log(Username);
};

const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.Name.toLowerCase().includes(value) ||
      user.Rank.toLowerCase().includes(value) ||
      user.Zip.toString().includes(value) ||
      user.Type.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

fetch(API_SCHOOL_URL)
  .then((res) => res.json())
  .then((data) => {
    values = Object.values(data);
    users = values[0].map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      const IMG = card.querySelector("[data-img]");
      const schoolBTN = card.querySelector("[data-btn]");
      header.textContent = user.Name;
      body.textContent = user.Ranking;
      IMG.src = user.Images;
      IMG.id = user.ID;
      schoolBTN.id = user.ID;
      body.id = user.Zip;
      header.id = user.Type;

      userCardContainer.appendChild(card);
      return {
        Name: user.Name,
        Rank: user.Ranking,
        Zip: user.Zip,
        Type: user.Type,
        ID: user.ID,
        element: card,
      };
    });
  });

async function schoolNameClicked(ID) {
  console.log(ID);

  fetch(API_SIGN_URL + "?Username=" + Username)
    .then((res) => res.json())
    .then((data) => {
    

      let data1 = new FormData();
      data1.append("username", Username);
      data1.append("password", data.data[0].Password);
      data1.append("history", ID.id);
      data1.append("email", data.data[0].Email);
      data1.append("zip", data.data[0].Zip);
      data1.append("date", data.data[0].Date);
      data1.append("type", data.data[0].Type);
      // Append other necessary fields from data if needed
      // Grab the current date

      // Append the join date to the FormData
      fetch(API_SIGN_URL, {
        method: "POST",
        body: data1,
        //mode: "no-cors",
      })
        .then((res) => res.text())
        .then((data) => {
          console.log(data)
          window.location.href = "School.html?ID=" + ID.id + "&Username=" + Username;
        });
    });
}

async function Zipclicked() {
  var zip = "";
  fetch(API_SIGN_URL + "?Username=" + Username)
    .then((res) => res.json())
    .then((data) => {
      values = Object.values(data);

      values[0].forEach((user) => {
        zip = user.Zip;
        const isVisible = user.Zip.toString() === zip;
        const userObj = users.find((u) => u.Zip === zip); // Find the user object
        if (userObj) {
          users.forEach((u) => {
            u.element.classList.toggle("hide", u.Zip !== zip);
          });
        } else {
          alert("No schools found in this zip code");
        }
        console.log(zip);
      });
    });
}

async function Typeclicked() {
  var type = "";
  fetch(API_SIGN_URL + "?Username=" + Username)
    .then((res) => res.json())
    .then((data) => {
      values = Object.values(data);

      values[0].forEach((user) => {
        type = user.Type;
        const isVisible = user.Type.toString() === type;
        const userObj = users.find((u) => u.Type === type); // Find the user object
        if (userObj) {
          users.forEach((u) => {
            u.element.classList.toggle("hide", u.Type !== type);
          });
        } else {
          alert("No schools found with this type");
        }
        console.log(type);
      });
    });
}

async function Historyclicked() {
  var history = "";
  fetch(API_SIGN_URL + "?Username=" + Username)
    .then((res) => res.json())
    .then((data) => {
      values = Object.values(data);

      values[0].forEach((user) => {
        history = user.History;
        // const isVisible = user.ID.toString() === history;
        const userObj = users.find((u) => u.ID === history); // Find the user object
        if (userObj) {
          users.forEach((u) => {
            u.element.classList.toggle("hide", u.ID !== history);
          });
        } else {
          alert("No schools found with this ID");
        }
        console.log(history);
      });
    });
}

async function ProfileClick() {
  window.location.href = "Profile.html?Username=" + Username;
}
