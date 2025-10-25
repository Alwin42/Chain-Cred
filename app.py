from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def landing():
    return render_template("landing.html", active_page="home")

@app.route("/login")
def login():
    return render_template("login.html", active_page="login")

@app.route("/dashboard")
def dashboard():
    # Placeholder data to render the dashboard UI; replace with real data later
    user = {
        "name": "Alex Mercer",
        "bio": "Full-stack dev specializing in smart contracts and dApps.",
        "skills": ["Solidity", "React", "Node.js", "Web3.js", "Tailwind"],
        "credibility_score": 86,
        "wallet_address": None
    }
    return render_template("dashboard.html", active_page="dashboard", user=user)

# Optional placeholder routes (you can implement later)
@app.route("/find-work")
def find_work():
    return render_template("landing.html", active_page="find_work")

@app.route("/hire-freelancers")
def hire_freelancers():
    return render_template("landing.html", active_page="hire")

if __name__ == "__main__":
    app.run(debug=True)