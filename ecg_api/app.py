from flask import Flask, request
from werkzeug import secure_filename
from ECG_AI.model_eval import + 

app = Flask(__name__)

@app.route("/ecg_submit", methods=['POST'])
def ecg():
    print("<h1>Hello Flask!</h1>")
    ecg_file = request.files['file']
    ecg_file.save('src/dataset/'+secure_filename(ecg_file.filename))

    # ai 추론

if __name__ == '__main__':
    app.run(debug=True, port="5000")