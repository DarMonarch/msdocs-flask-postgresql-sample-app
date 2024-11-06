async function loadOrders() {
    try {
        const response = await fetch('/get_orders');
        if (!response.ok) {
            throw new Error('Failed to retrieve orders. Please log in.');
        }
        const data = await response.json();
        const orders = data.orders;

        if (orders.length === 0) {
            document.getElementById('message').textContent = 'No orders found.';
            return;
        }

        const ordersBody = document.getElementById('orders-body');
        ordersBody.innerHTML = '';

        orders.forEach(order => {
            const row = document.createElement('tr');

            const orderIdCell = document.createElement('td');
            orderIdCell.textContent = order.order_id;
            row.appendChild(orderIdCell);

            const totalAmountCell = document.createElement('td');
            totalAmountCell.textContent = `$${order.total_amount.toFixed(2)}`;
            row.appendChild(totalAmountCell);

            const orderDateCell = document.createElement('td');
            orderDateCell.textContent = new Date(order.order_date).toLocaleString();
            row.appendChild(orderDateCell);

            ordersBody.appendChild(row);
        });
    } catch (error) {
        document.getElementById('message').textContent = error.message;
    }
}

window.onload = loadOrders;
