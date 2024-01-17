from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
# use boto3 if s3 bucket
# app = Flask(__name__)
# db = SQLAlchemy(app)
# class Shoe(db.Model):
#     id = db.Column(db.Integer)
#     photo = db.Column(db.String(255))
#     name = db.Column(db.String(255))
#     price = db.Column(db.Float)
#     size = db.Column(db.Integer)
@app.route('/api/shoes', methods=['GET'])
def get_shoes():

    return jsonify(shoe_data)
if __name__ == '__main__':
    app.run(debug=True)