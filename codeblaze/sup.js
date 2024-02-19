// Dummy product data (replace with real data from your backend)
const products = [
    {
        title: 'FISH HEADS',
        price: ' ₹5000',
        image: 'product1.jpg',
    },
    {
        title: 'FISH TAILS',
        price: ' ₹3000',
        image: 'product2_.jpg',
    },
    {
        title: 'FISH SCALES',
        price: ' ₹1000',
        image: 'product3.jpeg',
    },
    // Add more products as needed
];

// Function to display products on the page
function displayProducts() {
    const productsContainer = document.getElementById('products-container');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.classList.add('product-price');
        productCard.classList.add('product-details');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;

        const productTitle = document.createElement('h3');
        productTitle.textContent = product.title;

        const productPrice = document.createElement('p');
        productPrice.textContent = `Price: ${product.price}`;

        
        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);
        productCard.appendChild(productPrice);

        productsContainer.appendChild(productCard);
    });
}

// Check if the user is logged in (replace this with your actual authentication logic)
const userLoggedIn = true;

// Redirect to login page if not logged in
if (!userLoggedIn) {
    window.location.href = 'index.html'; // Replace with your login page URL
} else {
    // User is logged in, display the product listings
    displayProducts();
}
