from flask import Blueprint, request, jsonify
from api.models import db, User

api = Blueprint('api', __name__)

@api.route('/user', methods=['POST'])
def create_user():
    body = request.get_json()

    nombre = body.get("nombre")
    apellido = body.get("apellido")
    email = body.get("email")
    telefono = body.get("telefono")
    password = body.get("contrasena")

    if not email or not password:
        return jsonify({"msg": "Faltan datos obligatorios"}), 400

    existing = User.query.filter_by(email=email).first()
    if existing:
        return jsonify({"msg": "Usuario ya existe"}), 400

    new_user = User(
        email=email,
        password=password,
        nombre=nombre,
        apellido=apellido,
        telefono=telefono
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "msg": "Usuario creado",
        "user": {
            "email": email
        },
        "access_token": "fake-token"
    }), 201


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()

    email = body.get("email")
    password = body.get("contrasena")

    if not email or not password:
        return jsonify({"msg": "Faltan datos"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "Usuario no existe"}), 404

    if user.password != password:
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    return jsonify({
        "access_token": "fake-token",
        "user": {
            "email": user.email
        }
    }), 200