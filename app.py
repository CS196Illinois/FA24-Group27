

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def uiuc_map():
    return render_template('uiucmap_dynamic')

if __name__ == '__main__':
    app.run(debug=True)
