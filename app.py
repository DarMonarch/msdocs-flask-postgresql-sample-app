from flask import Flask, request, render_template, redirect, url_for, session
import psycopg2, os
from datetime import datetime

app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.secret_key = 'your_secret_key'

connection = psycopg2.connect(
    host="a1grpwebsite-server.postgres.database.azure.com",
    database="a1grpwebsite-database",
    user="myksbwyjfd",
    password="m$9smYMoRnwfcL4y"
)
cursor = connection.cursor()

create_table_query = '''
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''
cursor.execute(create_table_query)
connection.commit()

create_orders_table_query = '''
CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    product_name VARCHAR(100) NOT NULL,
    product_image VARCHAR(255),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''
cursor.execute(create_orders_table_query)
connection.commit()

@app.route('/')
@app.route('/Home_Page')
def Home():
    return render_template('Home Page/Home.html')

@app.route('/About')
def about():
    return render_template('About Page/About.html')

@app.route('/Products')
def products():
    return render_template('Product Page/Products.html')

@app.route('/Veg')
def veg():
    return render_template('Product Page/Vegetables.html')

@app.route('/Fruits')
def fruits():
    return render_template('Product Page/Fruits.html')

@app.route('/Baked')
def baked():
    return render_template('Product Page/Baked.html')

@app.route('/Help')
def help():
    return render_template('Contact Page/Help.html')

@app.route('/Cart')
def cart():
    return render_template('Cart/Cart.html')

@app.route('/Account')
def account():
    return render_template('Account Page/User_Account.html')

@app.route('/Orders')
def orders():
    return render_template('Account Page/Orders.html')

@app.route('/Address')
def address():
    return render_template('Address/Address.html')

@app.route('/proceed', methods=['POST'])
def proceed():
    fullname = request.form.get('fullname')
    address = request.form.get('address')
    city = request.form.get('city')
    state = request.form.get('state')
    zipcode = request.form.get('zipcode')
    phone = request.form.get('phone')
    if 'user_id' in session:
        user_id = session['user_id']
        product_name = request.form.get('product_name')
        product_image_url = request.form.get('product_image_url')
        quantity = int(request.form.get('quantity'))
        price = float(request.form.get('price'))

        insert_order_query = '''
        INSERT INTO orders (user_id, product_name, product_image_url, quantity, price)
        VALUES (%s, %s, %s, %s, %s)
        '''
        cursor.execute(insert_order_query, (user_id, product_name, product_image_url, quantity, price))
        connection.commit()

        return redirect(url_for('thank_you'))
    else:
        return "You need to log in first."

@app.route('/Your Orders')
def ret_orders():
    if 'user_id' in session:
        user_id = session['user_id']
        cursor.execute("SELECT product_name, product_image_url, quantity, price, order_date FROM orders WHERE user_id = %s ORDER BY order_date DESC;", (user_id,))
        orders = cursor.fetchall()
        return render_template('Account Page/Orders.html', orders=orders)
    else:
        return "You need to log in first."

@app.route('/thank_you')
def thank_you():
    return render_template('thank_you.html')

@app.route('/Sign_up', methods=['POST'])
def SignUp():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    insert_query = '''
    INSERT INTO users (username, email, password)
    VALUES (%s, %s, %s) RETURNING user_id;
    '''
    cursor.execute(insert_query, (username, email, password))
    connection.commit()
    return redirect(url_for('Home'))

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    cursor.execute("SELECT user_id, password FROM users WHERE email = %s;", (email,))
    result = cursor.fetchone()
    if result and result[1] == password:
        session['user_id'] = result[0]
        return redirect(url_for('Home'))
    else:
        return "Error: Invalid Email or Password!"

if __name__ == '__main__':
    app.run(debug=True)
