from models.extensions import db
from datetime import datetime


class SchemaMixin:
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    create_time = db.Column(db.DateTime, nullable=False, default=datetime.now)
    update_time = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def as_dict(self):
        pay_load = {}
        for c in self.__table__.columns:
            if isinstance(getattr(self, c.name), datetime):
                pay_load[c.name] = getattr(self, c.name).isoformat()
            else:
                pay_load[c.name] = str(getattr(self, c.name))
        return pay_load


class Post(db.Model, SchemaMixin):
    __tablename__ = 'post'
    title = db.Column(db.String(40), nullable=False)
    content = db.Column(db.Text, nullable=False)
    column = db.Column(db.String(10), nullable=False)
    attachments = db.Column(db.String(100), nullable=False)
    visible = db.Column(db.String(1), nullable=False, default='0')
    importance = db.Column(db.String(1), nullable=False, default='0')
    viewer = db.Column(db.Integer, nullable=False, default=0)


class Attachment(db.Model, SchemaMixin):
    __tablename__ = 'attachment'
    name = db.Column(db.String(40), nullable=False)
    file_path = db.Column(db.String(100), nullable=False, unique=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)


class Image(db.Model, SchemaMixin):
    __tablename__ = 'image'
    name = db.Column(db.String(40), nullable=False)
    file_path = db.Column(db.String(100), nullable=False, unique=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)


class Carousel(db.Model, SchemaMixin):
    __tablename__ = 'carousel'
    name = db.Column(db.String(40), nullable=False)
    file_path = db.Column(db.String(100), nullable=False, unique=True)


class StaticPost(db.Model, SchemaMixin):
    __tablename__ = 'static_post'
    static_post_name = db.Column(db.String(20), nullable=False)
    content = db.Column(db.Text, nullable=False)
    attachments = db.Column(db.String(100), nullable=False)
    viewer = db.Column(db.Integer, nullable=False, default=0)


class StaticAttachment(db.Model, SchemaMixin):
    __tablename__ = 'static_attachment'
    name = db.Column(db.String(40), nullable=False)
    file_path = db.Column(db.String(100), nullable=False, unique=True)
    post_id = db.Column(db.Integer, db.ForeignKey('static_attachment.id'), nullable=False)


class StaticImage(db.Model, SchemaMixin):
    __tablename__ = 'static_image'
    name = db.Column(db.String(40), nullable=False)
    file_path = db.Column(db.String(100), nullable=False, unique=True)
    post_id = db.Column(db.Integer, db.ForeignKey('static_attachment.id'), nullable=False)


class RestaurantPost(db.Model, SchemaMixin):
    __tablename__ = 'restaurant_post'
    title = db.Column(db.String(40), nullable=False)
    attachments = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(40), nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    valid = db.Column(db.String(1), nullable=False)
    visible = db.Column(db.String(1), nullable=False, default='0')
    viewer = db.Column(db.Integer, nullable=False, default=0)


class RestaurantAttachment(db.Model, SchemaMixin):
    __tablename__ = 'restaurant_attachment'
    name = db.Column(db.String(40), nullable=False)
    file_path = db.Column(db.String(100), nullable=False, unique=True)
    post_id = db.Column(db.Integer, db.ForeignKey('restaurant_attachment.id'), nullable=False)


class User(db.Model, SchemaMixin):
    id = db.Column(db.String(40), primary_key=True)
    chinese_name = db.Column(db.String(40), nullable=False, unique=False)
    state = db.Column(db.String(40), nullable=False, unique=False)
    # 0: admin, 1: teacher, 2: student, 9: normal
    authorization = db.Column(db.Integer, nullable=False, unique=False, default=9)

