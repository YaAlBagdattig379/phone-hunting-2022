const loadProducts = (searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayProducts(data.status , data.data ))
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
               <button onclick="loadPhoneDetails('${product.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            <div>  
       </div> 
        `;
        productContainer.appendChild(productDiv);
        console.log(product);
    });
    // stop spinner or loader
    toggleSpinner(false);
}
const searchPrecess = (status) => {
    toggleSpinner(false)
    console.log('dlfkjdslf')
}
loadProducts('phone')
