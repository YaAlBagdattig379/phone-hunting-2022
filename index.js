const loadProducts = (searchText,status) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayProducts(data.data , status ))
}
const displayProducts = (status, products) => {
    const productContainer = document.getElementById('products-container');
    productContainer.textContent = " ";
    // display 10 specific products only
    const showAll = document.getElementById('show-all');
    if(products.length && status > 10){
        products = products.slice(0 , 10);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    // display no found products message 
    const noProduct = document.getElementById("no-found-message");
    if(noProduct.length === 0){
        noProduct.classList.remove('d-none');
    }
    else{
        noProduct.classList.add('d-none');
    }
    // display all products 
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('col');
        productDiv.innerHTML = `
       <div class="card p-4">
            <img src="${product.image}"class="card-img-top" alt="">
            <div class="card-body">
               <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
               </p>
               <button onclick="loadProductsDetails('${product.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            <div>  
       </div> 
        `;
        productContainer.appendChild(productDiv);
        console.log(product);
    });
    // stop spinner or loader
    toggleSpinner(false);
}
const searchProcess = (status) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchInputText = searchField.value;
    loadProducts(searchInputText , status);
    // console.log('dlfkjdslf')
}
// handle search button click 
document.getElementById('btn-search').addEventListener('click',function(){
    searchProcess(10) ; 
})
// search input field enter key handler 
document.getElementById("search-field").addEventListener('keypress',function(ele){
    if(ele.key === 'Enter'){
      searchProcess(10);
    }  
})
const toggleSpinner = () =>{
    const loaderSection = document.getElementById("loader");
    if(loaderSection){
        loadProducts.classList.remove('d-none');
    }
    else{
        loadProducts.classList.add('d-none');
    }
}

// not the best way to load "show All"
document.getElementById('btn-show-all').addEventListener('click',function(){
    searchProcess();
})
const loadProductsDetails = (id) =>{
   const url =`https://openapi.programming-hero.com/api/phones/${id}`
   fetch(url)
   .then(res => res.json())
   .then(data => displayProductsDetail(data.data))
}
const displayProductsDetail = (products) =>{
   console.log(products)
   const modalTitle = document.getElementById('productDetailModalLabel');
   modalTitle.innerText = products.name;
   const productsDetail = document.getElementById("products-details")
//    const modalTitle = document.getElementById()
//    console.log(phone.mainFeatures.sensors[0]); // to see out put
    loadPhoneDetails.innerHTML = `
    <p>Release Date: ${products.releaseDate ? products.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${products.mainFeatures ? products.mainFeatures.storage : 'No Storage Information '}</p>
        <p>Others: ${products.others ? products.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${products.mainFeatures.sensors ? products.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}
loadPhones('apple');

