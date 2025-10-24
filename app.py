from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("landing.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/jobs")
def jobs():
    # Placeholder route; integrate with backend listings later
    return render_template("landing.html")


@app.route("/hire")
def hire():
    # Placeholder route; integrate with backend hiring flow later
    return render_template("landing.html")


if __name__ == "__main__":
    app.run(debug=True)
