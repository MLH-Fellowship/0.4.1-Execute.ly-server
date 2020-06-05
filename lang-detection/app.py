from flask import Flask, request, jsonify
from guesslang import Guess
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)

lang_dict = {
    'C': 'c99 2 c_cpp',
    'C++': 'cpp 3 c_cpp',
    'Javascript': 'nodejs 2 javascript',
    'Python': 'python3 1 python'
}


@app.route('/')
def hello_world():

    return 'Server is running'


@app.route('/detect', methods=["POST"])
def login_page():
    try:

        if request.method == "POST":
            json = request.get_json(silent=True)
            code = json['code']
            name = Guess().language_name(code)
            language = lang_dict[name]

            return jsonify({'language': language})

    except Exception as e:
        return jsonify({'status': "Error", 'message': "Some error occurred!"}), 500


if __name__ == "__main__":
    app.run()
