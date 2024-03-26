from package.database_model import *


class DatabaseOperator:

    @staticmethod
    def insert(model, kwargs):
        m = model(**kwargs)
        db.session.add(m)
        db.session.commit()
        return m

    @staticmethod
    def update(model, ori_kwargs, new_kwargs):
        data = db.session.query(model).filter_by(**ori_kwargs).first()
        if data is None:
            return None
        for key, value in new_kwargs.items():
            setattr(data, key, value)
        db.session.commit()
        return data

    @staticmethod
    def select_one(model, kwargs=None):
        kwargs = kwargs or {}
        return db.session.query(model).filter_by(**kwargs).limit(1000).first()

    @staticmethod
    def select_all(model, kwargs=None):
        kwargs = kwargs or {}
        return db.session.query(model).filter_by(**kwargs).limit(1000).all()

    @staticmethod
    def delete(model, kwargs):
        db.session.query(model).filter_by(**kwargs).delete()
        db.session.commit()
