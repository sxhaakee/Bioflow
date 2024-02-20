document.addEventListener('DOMContentLoaded', function () {
    // Sample product data
    const products = [
     
        { id: 2, name: 'FISH HEADS', image: 'product1.jpg',details:'A demand of 50kg Fish heads from pharmaceutical industry' },
        { id: 2, name: 'FISH TAILS', image: 'product2_.jpg',details:'A demand of 50kg Fish tails from Biofuel industry' },
       
        
    ];

    // Display products on the webpage
    products.forEach(product => {
        const productContainer = document.getElementById(`product-container-${product.id}`);
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <div class="product-name">${product.name}</div>
                <div class="product-details">${product.details}</div>
                <a href="sup.html"><button class="buy-button">Sell Now</button></a>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
});
