from flask import jsonify


class CustomResponse:
    @staticmethod
    def success(message, data):
        return jsonify({'message': message, 'data': data}), 200

    @staticmethod
    def bad_request(message, data):
        return jsonify({'message': message, 'data': data}), 400

    @staticmethod
    def not_found(message, data):
        return jsonify({'message': message, 'data': data}), 404

    @staticmethod
    def unsupported_media_type(message, data):
        return jsonify({'message': message, 'data': data}), 415

    @staticmethod
    def unsupported_entity(message, data):
        return jsonify({'message': message, 'data': data}), 422
