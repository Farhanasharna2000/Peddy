const spinnerEl = document.getElementById('spinner');
spinnerEl.classList.remove('hidden');


const categoryBtnHandle = async () => {
  setTimeout(async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json()

    displayCategoryBtn(data.categories);
  }, 2000);


}
categoryBtnHandle()

const displayCategoryBtn = (buttons) => {
  const categoryBtnContainer = document.getElementById("category-btn");
  categoryBtnContainer.innerHTML = '';

  buttons.forEach(button => {
    console.log(button);
    const { category, category_icon, id } = button;

    const div = document.createElement('div');
    div.innerHTML = `
        <button id="button-${id}" onclick="loadCategory('${category}')" class="btn bg-white category-btn ">
          <img class="w-8" src="${category_icon}" alt="">
          <p class="text-lg font-bold">${category}</p>
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
  spinnerEl.classList.remove('hidden');

  setTimeout(async () => {

    try {
      const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
      const data = await res.json();
      displayAllPets(data.data);

    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
    spinnerEl.classList.add('hidden');
  }, 2000);
};


const loadCardInfo = async () => {
  setTimeout(async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    displayAllPets(data.pets);
    spinnerEl.classList.add('hidden');

  }, 2000);
}

loadCardInfo()

const displayAllPets = (pets) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  if (pets.length === 0) {
    cardContainer.classList.remove("grid");
  cardContainer.innerHTML = '';

    cardContainer.innerHTML = `
        <div class="min-h-[300px] w-full flex flex-col justify-center items-center gap-5 border rounded-2xl bg-gray-100">
          <img src="images/error.webp" alt="No data available"/>
          <h2 class="text-3xl font-bold text-center">No Information Available</h2>
          <p class="text-sm font-medium">Oops!! Sorry, there is no content here.</p>
        </div>`;
    return;
  } else {
    cardContainer.classList.add("grid");
  }

  pets.forEach(pet => {
    console.log(pet);

    const { pet_name, gender, image, price, date_of_birth, breed, petId } = pet;
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card border">
          <div class="p-5">
            <img class="rounded-lg" src="${image}" alt="">
            <div class="space-y-3">
              <h2 class="text-base font-bold mt-3">${pet_name ? pet_name : 'No data found'}</h2>
              <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame.png" alt="">Breed: ${breed ? breed : 'Not available'}</p>
              <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame (1).png" alt="">Birth: ${date_of_birth ? date_of_birth : 'No data found'}</p>
              <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame (2).png" alt="">Gender: ${gender ? gender : 'No data found'}</p>
              <p class="flex items-center gap-1 text-secondary2 text-sm font-semibold"><img src="images/Frame (3).png" alt="">Price: ${price ? price : 'No data found'}</p>
            </div>
            <hr class="my-2"/>
            <div class="flex gap-3">
              <button  class="btn text-primary bg-white" onclick="showLikeContent('${image}')">
                <img src="images/like.png" alt="">
              </button>
              <button onclick="adoptBtn()"  class="btn text-primary bg-white">Adopt</button>
              <button id="details-btn" onclick="loadDetails('${petId}')" class="btn text-primary bg-white detail-btn">Details</button>
            </div>
            
          </div>
        </div>
      `;
    cardContainer.appendChild(div);
  });
};



// Function to show the like content on button click

const showLikeContent = (image) => {
  const emptyEl = document.getElementById('empty');
  const div = document.createElement('div');
  div.classList.add('w-5/12', 'float-left', 'm-2')
  div.innerHTML = `
        
          <img src="${image}" alt="" class="rounded-lg">
          
      `;
  emptyEl.appendChild(div);
}

// Function to show the details content on button click
const loadDetails = async (petId) => {
  const res = await fetch(` https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
  const data = await res.json()
   displayDetails(data.petData);
   
  
}

const displayDetails = (petData) => {
  const modalContent = document.getElementById('modal-content');
  const{pet_name,breed,date_of_birth,gender,price,vaccinated_status,pet_details,image}=petData;
  modalContent.innerHTML=`

  <img class="rounded-lg w-full" src="${image}" alt="">
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

const adoptBtn = () => {
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
    
    }
  }, 1000); 
};
