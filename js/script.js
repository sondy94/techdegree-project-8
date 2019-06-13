// VARIABLES //
const container = document.querySelector('.container');
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.closeX');
const modalContainer = document.querySelector('.modalContent');
const searchBar = document.querySelector('.search');

// Fetch array of 12 people's info //
let employees = [];
fetch('https://randomuser.me/api/?exc=login,nat,id,registered&results=12')
   .then(response => response.json()) // parse //
   .then(data => {employees = data.results;
                  // console.log(employees)
                })
    .then(data => generateInfo(data));


// Generate User Info (name, email, city) //
function generateInfo(data) {
  employees.forEach((employee, index) => {

//Create 12 divs with class of 'card' and 'employee' and assign index
let card = document.createElement('div');
  card.classList.add("card", "employee" + index);
  container.appendChild(card);

// Create 12 divs with class of infoContainer
let infoContainer = document.createElement('div');
  infoContainer.className = "infoContainer";
  card.appendChild(infoContainer);

// Call this function to generate user image //
generateImage(employee, infoContainer);

// Create 12 userInfo divs and store info inside
let userInfoDiv = document.createElement('div');
  userInfoDiv.className = "user_info";
  $(container.appendChild(userInfoDiv));
  const name = `${employee.name.title}.` + ' ' + `${employee.name.first}` + ' ' + `${employee.name.last }`;
  const email = `${employee.email}`;
  const city = `${employee.location.city}`;
  let userInfo =  `
    <p class="name"> ${name} </p>
    <p class="email"> ${email} </p>
    <p class="city"> ${city} <p>`;
    userInfoDiv.innerHTML = userInfo;
    $(infoContainer.appendChild(userInfoDiv));
    });
  }

// HELPER FUNCTIONS //
// Generate User Image //
function generateImage(employee, card) {

let imgContainer = document.createElement('div');
  imgContainer.className = "imgContainer";
  card.appendChild(imgContainer);

  const avatar = employee.picture.large;
  let userImg = `
                    <img src='${avatar}' alt="Employee"> </img>
                  `;
  imgContainer.innerHTML = userImg;
  }

// MODAL//
// Generate user phone number, address and birthday //
function generateModalInfo(index) {
    const employee = employees[index];
    const avatar = `${employee.picture.large}`;
    const name = `${employee.name.title}.` + ' ' + `${employee.name.first}` + ' ' + `${employee.name.last }`;
    const email = `${employee.email}`;
    const city = `${employee.location.city}`;
    const phoneNumber = `${employee.phone}`;
    const address = `${employee.location.street}` + ', ' +`${employee.location.city}` + ', ' + `${employee.location.state}`;
    const birthday = `${employee.dob.date}`.slice(0,10);

    let userModalInfo = `
                          <div class="modalContent" data-index=${index}>
                          <img src='${avatar}' alt="Employee"> </img>
                          <p class="name">${name} </p>
                          <p class="email">${email} </p>
                          <p class="city">${city} <p>
                          <p class="phone">${phoneNumber} </p>
                          <p class="address">${address} </p>
                          <p class="birthday">Birthday: ${birthday} </p>
                          <button class="closeBtn">Close</button>
                          <i class="fas fa-angle-left"></i>
                          <i class="fas fa-angle-right"></i>
                          </div>`;

   modal.innerHTML = userModalInfo;

  }

// Open modal when user clicks a card //
$(document).on('click', ".card", function(index) {
  generateModalInfo($('.card').index(this));
  modal.style.display = 'block';
});

// Close modal when user clicks 'x' //
$(document).on('click', '.closeX', function(employee, index) {
    modal.style.display = "none";
});

// Close modal when user clicks 'Close' //
$(document).on('click', '.closeBtn', function(employee, index) {
    modal.style.display = "none";
});

// Search Function
searchBar.addEventListener('keyup', () =>{
    let value = searchBar.value.toLowerCase();
    let names = document.querySelectorAll(".name");
    names.forEach(name => {
        if (name.innerHTML.indexOf(value) < 0) {
            let card = name.closest(".card");
            card.classList.add("card--hidden")
        } else {
            let card = name.closest(".card");
            card.classList.remove("card--hidden")
        }
    });
})

// Click right arrow to see next employee //
$(document).on('click', '.fa-angle-right', function() {
  let card = document.querySelector('.modalContent');
  let index = card.getAttribute('data-index');
  card.innerHTML = generateModalInfo(++index);
});


// Click left arrow to see previous employee //
$(document).on('click', '.fa-angle-left', function() {
  let card = document.querySelector('.modalContent');
  let index = card.getAttribute('data-index');
  generateModalInfo(--index);
});
