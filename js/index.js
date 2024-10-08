const spinnerEl = document.getElementById('spinner');
const spinnerEl1 = document.getElementById('card-container');
spinnerEl.classList.remove('hidden');

const emptyEl = document.getElementById('empty');
emptyEl.classList.add('hidden');

let pets = [];
let categoryPets = [];

const categoryBtnHandle = async () => {
  setTimeout(async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()

    displayCategoryBtn(data.categories);

  }, 2000);
}
categoryBtnHandle();

const displayCategoryBtn = (buttons) => {
  const categoryBtnContainer = document.getElementById("category-btn");
  categoryBtnContainer.innerHTML = '';

  buttons.forEach(button => {
    console.log(button);
    const { category, category_icon, id } = button;

    const div = document.createElement('div');
    div.innerHTML = `
        <button id="button-${id}" onclick="loadCategory('${category}')" class="btn bg-white category-btn ">
          <img class="lg:w-8 w-4" src="${category_icon}" alt="">
          <p class="lg:text-lg text-sm font-bold">${category}</p>
        </button>
      `;

    categoryBtnContainer.appendChild(div);


    const categoryBtn = document.getElementById(`button-${id}`);
    categoryBtn.addEventListener('click', () => {
      const allCategoryBtns = document.querySelectorAll('.category-btn');
      allCategoryBtns.forEach(btn => btn.classList.remove('active'));
      categoryBtn.classList.add('active');
    });
  });
};


const loadCategory = async (category) => {

  emptyEl.classList.add('hidden');
  spinnerEl1.classList.add('hidden');
  spinnerEl.classList.remove('hidden');

  setTimeout(async () => {

    try {
      const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
      const data = await res.json();
      categoryPets = data.data;

      displayAllPets(data.data);
    }
    catch (error) {
      console.error('Error:', error);
    }

    emptyEl.classList.remove('hidden');
    spinnerEl.classList.add('hidden');
    spinnerEl1.classList.remove('hidden');

  }, 2000);
};


const loadCardInfo = async () => {
  setTimeout(async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    pets = data.pets;

    displayAllPets(pets);

    emptyEl.classList.remove('hidden');
    spinnerEl1.classList.remove('hidden');
    spinnerEl.classList.add('hidden');

  }, 2000);
};

loadCardInfo();

const displayAllPets = (petsArray) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  if (petsArray.length === 0) {
    cardContainer.classList.remove("grid");
    cardContainer.innerHTML = '';

    cardContainer.innerHTML = `
        <div class="min-h-[300px] w-full flex flex-col justify-center items-center gap-5 border rounded-2xl bg-gray-100">
          <img src="images/error.webp" alt="No data available"/>
          <h2 class="text-3xl font-bold text-center">No Information Available</h2>
          <p class="text-sm font-medium">Oops!! Sorry, there is no content here.</p>
        </div>`;
    return;
  }
  else {
    cardContainer.classList.add("grid");
  }

  petsArray.forEach(pet => {
    const { pet_name, gender, image, price, date_of_birth, breed, petId } = pet;
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card border">
          <div class="p-5">
            <img class="rounded-lg w-full object-cover" src="${image}" alt="">
            <div class="space-y-3">
              <h2 class="text-base font-bold mt-3">${pet_name ? pet_name : 'No data found'}</h2>
              <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame.png" alt="">Breed: ${breed ? breed : 'Not available'}</p>
              <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame (1).png" alt="">Birth: ${date_of_birth ? date_of_birth : 'No data found'}</p>
              <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame (2).png" alt="">Gender: ${gender ? gender : 'No data found'}</p>
              <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame (3).png" alt="">Price: ${price ? price : 'No price found'}</p>
            </div>
            <hr class="my-2"/>
            <div class="flex gap-3">
              <button  class="btn text-primary bg-white " onclick="showLikeContent('${image}')">
                <img src="images/like.png" alt="">
              </button>
              <button id="adopt-btn" onclick="adoptBtn(this)"  class="btn text-primary bg-white hover:bg-[#2a9ca7] hover:text-white">Adopt</button>
              <button id="details-btn" onclick="loadDetails('${petId}', this)" class="btn text-primary bg-white hover:bg-[#2a9ca7] hover:text-white detail-btn">Details</button>
            </div>
          </div>
        </div>
      `;
    cardContainer.appendChild(div);
  });
};

const sortPetsByPrice = () => {

  const petsToSort = categoryPets.length ? categoryPets : pets;
  console.log(petsToSort);

  petsToSort.sort((a, b) => b.price - a.price);

  displayAllPets(petsToSort);
};



const showLikeContent = (image) => {
  const emptyEl = document.getElementById('empty');
  const div = document.createElement('div');
  div.classList.add('lg:w-5/12', 'w-full', 'float-left', 'mb-3', 'lg:m-2')
  div.innerHTML = `
        
          <img src="${image}" alt="" class="rounded-lg border p-2 w-full object-cover">
          
      `;
  emptyEl.appendChild(div);
}

const loadDetails = async (petId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
  const data = await res.json();
  displayDetails(data.petData);


};

const displayDetails = (petData) => {
  const modalContent = document.getElementById('modal-content');
  const { pet_name, breed, date_of_birth, gender, price, vaccinated_status, pet_details, image } = petData;

  modalContent.innerHTML = `
  <img class="rounded-lg w-full object-cover" src="${image}" alt="">
      <div class="space-y-3">
        <h2 class="text-2xl font-bold mt-3">${pet_name ? pet_name : 'No data found'}</h2>
        <div class="flex gap-10">
        <div>
        <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame.png" alt=""><span class="text-base font-bold "> Breed:</span> ${breed ? breed : 'Not available'}</p>
        
        <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame (2).png" alt=""><span class="text-base font-bold ">Gender: </span>${gender ? gender : 'No data found'}</p>
        
        <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame (2).png" alt=""><span class="text-base font-bold ">Vaccinated: </span>  ${vaccinated_status ? vaccinated_status : 'Unknown'}</p>
        </div>

        <div>
        <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame (1).png" alt=""><span class="text-base font-bold "> Birth:</span> ${date_of_birth ? date_of_birth : 'No data found'}</p>
        <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame (3).png" alt=""><span class="text-base font-bold ">Price: </span> ${price ? price : 'No data found'}</p>
        </div>
        </div>
        <hr/>
        <p  class="text-xl font-bold mb-4">Pet details:</p>
        <p class="text-sm"> ${pet_details ? pet_details : 'No additional details available'}</p>
    </div>
  `
  document.getElementById('customModal').showModal()

}

const adoptBtn = (button) => {

  const modalAdoptContent = document.getElementById('modal-adopt-content');
  let countdown = 3;

  modalAdoptContent.innerHTML = `
    <div class="text-center">
      <div class="flex justify-center">
        <img class="w-20" src="images/handshake.png" alt="">
      </div>
      <h3 class="text-3xl font-bold">Congratulations!</h3>
      <p class="py-2">Adoption process is starting for your pet.</p>
      <p class="text-3xl font-bold" id="countdown">${countdown} </p>
    </div>
  `;

  document.getElementById('my_modal_2').showModal();

  const intervalId = setInterval(() => {
    countdown--;
    document.getElementById('countdown').textContent = countdown;
    if (countdown === 0) {
      clearInterval(intervalId);
      document.getElementById('my_modal_2').close();

      button.disabled = true;
      button.textContent = 'Adopted';



    }
  }, 1000);
};



