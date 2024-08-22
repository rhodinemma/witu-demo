from flask import Blueprint, request, jsonify
from .models import Item, db

main = Blueprint('main', __name__)

@main.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([item.name for item in items])

@main.route('/items', methods=['POST'])
def add_item():
    data = request.json
    new_item = Item(name=data['name'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'message': 'Item added!'}), 201
