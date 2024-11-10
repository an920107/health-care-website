from flask import jsonify


class CustomResponse:
    @staticmethod
    def success(message, data):
        return jsonify({'message': message, 'data': data}), 200

    @staticmethod
    def created(message, data):
        return jsonify({'message': message, 'data': data}), 201

    @staticmethod
    def no_content(message, data):
        return jsonify({'message': message, 'data': data}), 204

    @staticmethod
    def bad_request(message, data):
        return jsonify({'message': message, 'data': data}), 400

    @staticmethod
    def unprocessable_content(message, data):
        return jsonify({'message': message, 'data': data}), 422

    @staticmethod
    def not_found(message, data):
        return jsonify({'message': message, 'data': data}), 404

    @staticmethod
    def unsupported_media_type(message, data):
        return jsonify({'message': message, 'data': data}), 415

    @staticmethod
    def unsupported_entity(message, data):
        return jsonify({'message': message, 'data': data}), 422

    @staticmethod
    def unauthorized(message, data):
        return jsonify({'message': message, 'data': data}), 401
