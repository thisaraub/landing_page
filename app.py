from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    # Render the HTML template for the landing page
    return render_template("template.html")


if __name__ == "__main__":
    app.run(debug=True)
