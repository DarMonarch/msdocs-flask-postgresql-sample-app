let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(button) {
    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));
    const productImage = button.getAttribute('data-image');

    const item = { name: productName, price: productPrice, image: productImage, quantity: 1 };
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === productName);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        itemDiv.innerHTML = `
            <table class="item-table">
                <tr>
                    <td>
                        <img src="${item.image}" alt="${item.name}" class="item-img" style="width: 80px; height: 80px;">
                    </td>
                    <td class="product-info">
                        <span class="item-name">${item.name}</span><br>
                        <span class="item-price">$${item.price.toFixed(2)}</span>
                    </td>
                    <td colspan="2">
                        <div class="quantity-controls">
                            <button onclick="changeQuantity('${item.name}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantity('${item.name}', 1)">+</button>
                        </div>
                    </td>
                    <td>
                        <span class="item-total"> $${itemTotal.toFixed(2)}</span>
                    </td>
                    <td>
                        <button class="remove-button" onclick="removeFromCart('${item.name}')">Remove</button>
                    </td>
                </tr>
            </table>
        `;
        
        cartItemsContainer.appendChild(itemDiv);
    });

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
}

function changeQuantity(productName, change) {
    const itemIndex = cart.findIndex(item => item.name === productName);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (totalItems > 0) {
        cartCount.style.display = 'block';
    } else {
        cartCount.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();
});
