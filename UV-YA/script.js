// Show or hide sections based on the clicked link
function showSection(section) {
    // Hide all sections
    document.getElementById('home').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('menus').style.display = 'none';

    // Show the selected section
    document.getElementById(section).style.display = 'block';
}

// Redirect to the menus page after login or register
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    if (email.endsWith('@est.univalle.edu') || email.endsWith('@univalle.edu')) {
        alert('Login successful! Redirecting to menus...');
        showSection('menus'); // Show the menu section after login
    } else {
        alert('You must use a university email to login.');
    }
});

document.getElementById('register-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (email.endsWith('@est.univalle.edu') || email.endsWith('@univalle.edu')) {
        if (password === confirmPassword) {
            alert('Registration successful! Redirecting to menus...');
            showSection('menus'); // Show the menu section after registration
        } else {
            alert('Passwords do not match.');
        }
    } else {
        alert('You must use a university email to register.');
    }
});

let cart = [];
function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}

function updateCart() {
    const orderDiv = document.getElementById('current-order');
    orderDiv.innerHTML = '';
    let total = 0;

    cart.forEach(orderItem => {
        total += orderItem.price;
        const div = document.createElement('div');
        div.textContent = `${orderItem.item} - ${orderItem.price} Bs`;
        orderDiv.appendChild(div);
    });

    document.getElementById('order-total').textContent = `Total: ${total} Bs`;

    if (cart.length > 0) {
        document.getElementById('payment-options').style.display = 'block';
    } else {
        document.getElementById('payment-options').style.display = 'none';
    }
}

function placeOrder() {
    const method = document.querySelector('input[name="payment-method"]:checked').value;
    const delivery = document.querySelector('input[name="delivery-method"]:checked').value;
    const paymentTime = document.querySelector('input[name="payment-time"]:checked').value;

    let deliveryName = '';
    if (delivery === 'student') {
        deliveryName = document.getElementById('student-name').value || 'Estudiante';
    } else {
        deliveryName = 'Restaurante';
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const orderSummary = `
        Pedido: ${cart.map(item => item.item).join(', ')}
        Total: ${totalPrice} Bs
        Método de Pago: ${method}
        Entregado por: ${deliveryName}
        Momento de Pago: ${paymentTime === 'before' ? 'Antes de la entrega' : 'Después de la entrega'}
    `;

    document.getElementById('order-summary').textContent = orderSummary;
    document.getElementById('order-status').style.display = 'block';

    // Start the order status update after placing the order
    document.getElementById('order-status-box').style.display = 'block';
    updateOrderStatus();
}

let currentOrderStatusIndex = 0;
const orderStatuses = ['Procesando', 'Confirmado', 'En camino', 'Entregado'];

function updateOrderStatus() {
    if (currentOrderStatusIndex < orderStatuses.length) {
        document.getElementById('order-status-text').textContent = orderStatuses[currentOrderStatusIndex];
        currentOrderStatusIndex++;
        setTimeout(updateOrderStatus, 5000); // 5 seconds for each status
    }
}
