from flask import Flask

app = Flask(__name__)
@app.route('/users')
def users():
    return {"members": [{"id": 1, "name": "test1"}, {"id": 2, "name": "test2"}]}

if __name__ == "__main__":
    app.run('0.0.0.0', port=5000, debug=True)