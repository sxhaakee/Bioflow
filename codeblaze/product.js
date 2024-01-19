document.addEventListener('DOMContentLoaded', function () {
    // Sample product data
    const products = [
     
        { id: 2, name: 'FISH  heads', image: 'product1.jpg', price: '₹5000', rating: '3.8' },
        { id: 2, name: 'Fish tail', image: 'product2_.jpg', price: '₹3000', rating: '5.4' },
        { id: 2, name: 'FISH scale', image: 'product3.jpeg', price: '₹1000', rating: '5.4' },
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
                <div class="product-price">${product.price}</div>
                <div class="product-rating">Rating: ${product.rating}</div>
                <button class="buy-button">Buy Now</button>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
});
