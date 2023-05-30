#!/usr/bin/env python
"""
"""

from flask import Flask, render_template, request


app = Flask(__name__)


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    fvc = request.form.get("fvc", None)
    weeks = request.form.get("weeks", None)
    age = request.form.get("age", None)
    smoking = request.form.get("smoking", None)
    gender = request.form.get("gender", None)

    image = request.files.get("image", None)
    img_bytes = image.read()

    return {"prediction": int(0)}, 200


if __name__ == "__main__":
    app.run(debug=True)
