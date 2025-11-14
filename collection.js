 
const container = document.querySelector('#cards-container');
const form = document.querySelector('#collection-form');
const input = document.querySelector('#collection-name');


let collections = JSON.parse(localStorage.getItem('collections')) || {};
renderCollections();



function renderCollections() {
    container.innerHTML = '';
    container.appendChild(form); 

    for (let name in collections) {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const newCard = document.createElement('div');
        newCard.className = 'bg-black w-[20rem] rounded-[2.5rem] cursor-pointer';
        newCard.innerHTML = `
            <div class="p-6 flex flex-col h-[30rem] items-center justify-center">
                <h1 class="text-[4rem]" style="color: ${randomColor};">${name}</h1>
            </div>
            <div class="flex justify-center">
                <p class="p-[1rem]">
                    start learning <span class="font-bold" style="color: ${randomColor};">${name}</span> now
                </p>
            </div>
        `;
        newCard.addEventListener('click', function () {
            localStorage.setItem('currentCollection', name);
            window.location.href = "cards.html";
        });
        container.insertBefore(newCard, form);
    }
}





form.addEventListener('submit', function(e) {
    e.preventDefault();

    const collectionName = input.value.trim();
    if (!collectionName) return;

    
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    
    const newCard = document.createElement('div');
    newCard.className = 'bg-black w-[20rem] rounded-[2.5rem] cursor-pointer';
    newCard.innerHTML = `
        <div class="p-6 flex flex-col h-[30rem] items-center justify-center overflow-hidden">
            <h1 class="text-[4rem]" style="color: ${randomColor};">${collectionName}</h1>
        </div>
        <div class="flex justify-center">
            <p class="p-[1rem]">
                start learning <span class="font-bold" style="color: ${randomColor};">${collectionName}</span> now
            </p>
        </div>




    `;
    newCard.addEventListener('click', function () {
    localStorage.setItem('currentCollection', collectionName);
    window.location.href = "cards.html";
});
if (!collections[collectionName]) {
    collections[collectionName] = ""; 
    localStorage.setItem('collections', JSON.stringify(collections));
}

    container.insertBefore(newCard, form);

   
    input.value = '';
});