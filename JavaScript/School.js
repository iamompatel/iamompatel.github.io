var schoolID = "";
var Username = "";
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
  schoolID = params["ID"];
  Username = params["Username"];

  var link1 =
    API_SCHOOL_URL + "?ID=" +
    schoolID;
  console.log(link1);
  fetch(
    API_SCHOOL_URL + "?ID=" +
    schoolID
  )
    .then((res) => res.json())
    .then((data) => {
      values = Object.values(data);
      console.log(data);

      users = values[0].map((user) => {
        const Name = document.querySelector(".TName");
        Name.textContent = user.Name;

        const Intro = document.querySelector(".introP");
        Intro.textContent = user.Introduction;

        const Admission = document.querySelector(".admissionP");
        Admission.textContent = user.Admission;

        const Fee = document.querySelector(".feeP");
        Fee.textContent = user.Fee;

        const Ranking = document.querySelector(".RankP");
        Ranking.textContent = user.Ranking;

        const Address = document.querySelector(".addressP");
        Address.textContent = user.Address;

        const Phone = document.querySelector(".contactIP");
        Phone.textContent = user.Phone;
      });
    });

    getReviews();
};



function getReviews() {
  const userCardTemplate = document.querySelector("[data-user-template]");
  const userCardContainer = document.querySelector("[data-user-cards-container]");
  userCardContainer.innerHTML = "";

  // fetch(API_REVIEW_URL + "?Schools=" + schoolID)
  let URL = API_REVIEW_URL + "?Schools=" + schoolID;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      values = Object.values(data);
      users = values[0].map((user) => {
        const card = userCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const body = card.querySelector("[data-body]");
        header.textContent = user.Username;
        body.textContent = user.Review;


        userCardContainer.appendChild(card);
        return {
          Username: user.Username,
          Reviews: user.Review,
        };
      });
    });
}


async function submit() {
  console.log("submit");


  //grab Review
  var review = document.getElementById("review").value;
  console.log(review);

  fetch(API_REVIEW_URL + "?Username=" + Username)
    .then((res) => res.json())
    .then((data) => {
      values = Object.values(data);
      console.log(data);

      // if (data.data.length !== 0 && username === data.data[0].Username) {
      //   alert("User already Exists try again!!!");
      //   window.location.href = "Sign-in.html";
      // } else {
      let form = document.querySelector("form");
      let data1 = new FormData(form);
      data1.append("schools", schoolID);
      data1.append("username", Username);
      data1.append("review", review);
      fetch(
        API_REVIEW_URL,
        {
          method: "POST",
          body: data1,
        }
      )
        .then((res) => res.text())
        .then((data) => console.log(data));
      console.log(data);
      getReviews();

    });
}
