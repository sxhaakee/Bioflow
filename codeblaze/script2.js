document.addEventListener('DOMContentLoaded', function () {

    const dealEndTime = new Date('December 31, 2023 23:59:59').getTime();

    
    const timerInterval = setInterval(function () {
        const now = new Date().getTime();
        const distance = dealEndTime - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('deal-timer').innerHTML = 'Deal Expired!';
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('deal-timer').innerHTML =
                `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);

   

    products.forEach((product, index) => {
        setTimeout(() => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            `;
            productElement.addEventListener('click', () => handleProductSelection(product));
            productContainer.appendChild(productElement);
        }, 200 * index); 
    });

    
    setTimeout(() => {
        productContainer.style.opacity = 1;
        productContainer.style.transform = 'translateY(0)';
    }, 1000);

    
    function handleProductSelection(product) {
       
        alert(`Selected: ${product.name}\nPrice: ${product.price}`);
    }
});
