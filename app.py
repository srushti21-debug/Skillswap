from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Home page
@app.route('/')
def home():
    return render_template('home.html')

# Join page
@app.route('/join', methods=['GET', 'POST'])
def join():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        teach = request.form['teach']
        learn = request.form['learn']

        conn = sqlite3.connect(r"D:\skillswap\Skillswap\skillswap_users.db")
        c = conn.cursor()
        c.execute('INSERT INTO user (name, email, password, teach, learn) VALUES (?, ?, ?, ?, ?)',
                  (name, email, password, teach, learn))
        conn.commit()
        conn.close()

        return redirect(url_for('home'))

    return render_template('join.html')

if __name__ == '__main__':
    app.run(debug=True)
