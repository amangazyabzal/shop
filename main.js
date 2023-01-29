//data.json акпаратты шыгарып алады
async function fetchData() {
  try {
    let res = await fetch("data.json");
    let data = await res.json();
    render(data);
  } catch (e) {
    console.log(e);
  }
}

///экран бетыне корсетеды
function render(data) {
  let body = document.querySelector(".items");
  //create cards div for every element
  let cardsHTML = document.createElement("div");

  //add class cards to div
  cardsHTML.classList.add("cards");

  //create cards div for every element
  let likesHTML = document.createElement("div");

  //add class cards to div
  likesHTML.classList.add("likes");

  //added to body our cards div
  body.appendChild(cardsHTML);

  let cards = data
    .map((e) => {
      e.isLike = true;
      return generateCardHTML(e);
    })
    .join("");

  cardsHTML.innerHTML = cards;

  let titleCards = document.createElement("h3");
  let titleLikes = document.createElement("h3");

  titleCards.innerHTML = "Товары";
  cardsHTML.insertAdjacentElement("beforebegin", titleCards);
  titleLikes.innerHTML = "Понравившиеся";
  cardsHTML.insertAdjacentElement("afterend", titleLikes);

  addDeleteEvent();
  addLikesEvent();
  changePageEvent();
}

//addEventListener баска бетке ауысу
function changePageEvent() {
  let images = document.querySelectorAll(".img");
  images.forEach((img) => {
    img.addEventListener("click", onChangePage);
  });
}

function onChangePage(e) {
  let image = e.currentTarget;
  //have to change
  let id = image.nextSibling.nextSibling.innerHTML;
  let parseId = id.split(" : ")[1];

  location.href = `card.html?id=${parseId}`;
}

//addEventListener удалить ету ушын
function addDeleteEvent() {
  let buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", onDeleteCard);
  });
}

function addLikesEvent() {
  let buttons = document.querySelectorAll(".btn-like");
  buttons.forEach((button) => {
    button.addEventListener("click", onLikeCard);
  });
}

function onLikeCard(e) {
  let currentButton = e.currentTarget;
  let id = currentButonChangePAgeton.parentElement.getAttribute("id");
  let parseId = Number(id.split(":")[1])
  
  changeIsLike(id);
}

function changeIsLike(id) {
  fetch("data.json")
    .then((response) => response.json())
    .then((json) => {
      return json.map((e) => {
        if (e.id == id) {
          e.isLike = true;
        }

        return e;
      });
    })
    .then((res) => {
      console.log(res);
    });
}

//удалить карту
function onDeleteCard(e) {
  let currentButton = e.currentTarget;
  currentButton.closest(".card").remove();
}

//html code жасап береды объетан
function generateCardHTML(data) {
  return `
        <div class='card' id=${data.id}>
            <img src="./${data.img}" class='img'>
            <p>Сериный номер : ${data.id} </p>
            <h4>${data.name}</h4>
            <p>${data.description}</p>    
            <p>${data.salary} тг</p>
            <button class='btn'>Удалить</button>
            <button class='btn-like'>Like</button>
        </div>
    `;
}

//start app
fetchData();
