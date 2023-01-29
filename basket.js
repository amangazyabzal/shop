function getData() {
  let json = localStorage.getItem("basket");
  return JSON.parse(json);
}
function render() {
  let body = document.querySelector(".main");
  let data = getData();
  let cardHTML = generateCardHTML(data);
  body.innerHTML = cardHTML;
}

function generateCardHTML(data) {
  console.log(data);
  return `
      <div class="item">
          <img scr="./${data.img}">
          <h2>${data.name}</h2>
          <p>${data.description}</p>
          <p>${data.price}</p>
          <button class='basket_btn' Удалить из корзину</button>
  
      </div>
      `;
}
render();
