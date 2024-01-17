from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
class Shoe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    image_files = db.Column(db.ARRAY(db.String(80)),nullable=False)
    price=db.Column(db.Integer, nullable=False)
    link=db.Column(db.String(80), nullable=False)
    description=db.Column(db.String(80), nullable=True)
    size=db.Column(db.Integer, nullable=False)
    status=db.Column(db.String(80), nullable=False)

