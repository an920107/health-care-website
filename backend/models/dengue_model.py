from models.database import SchemaMixin, db


class Dengue(SchemaMixin, db.Model):
    __tablename__ = 'dengue'

    user_id = db.Column(db.String(255))
    building_id = db.Column(db.Integer)

    outdoor_bottles_cans = db.Column(db.Integer)
    outdoor_urns_tanks = db.Column(db.Integer)
    outdoor_tableware = db.Column(db.Integer)
    outdoor_pots_kettles = db.Column(db.Integer)
    outdoor_disposable_items = db.Column(db.Integer)
    outdoor_barrels = db.Column(db.Integer)
    outdoor_coconut_shells = db.Column(db.Integer)
    outdoor_tires_helmets = db.Column(db.Integer)
    outdoor_drainage_covers = db.Column(db.Integer)
    outdoor_abandoned_appliances = db.Column(db.Integer)
    outdoor_unused_water_towers = db.Column(db.Integer)
    outdoor_unused_cooling_equipment = db.Column(db.Integer)
    outdoor_large_water_containers = db.Column(db.Integer)
    outdoor_pet_water_containers = db.Column(db.Integer)
    outdoor_flooded_basement = db.Column(db.Integer)
    outdoor_basement_sump = db.Column(db.Integer)
    outdoor_utility_meters = db.Column(db.Integer)
    outdoor_mailbox = db.Column(db.Integer)
    outdoor_incense_burner = db.Column(db.Integer)
    outdoor_rain_gear = db.Column(db.Integer)
    outdoor_natural_water_containers = db.Column(db.Integer)
    outdoor_flagpole_drains = db.Column(db.Integer)
    outdoor_decorative_ponds = db.Column(db.Integer)
    outdoor_stagnant_gutter = db.Column(db.Integer)
    outdoor_other_containers = db.Column(db.TEXT)

    indoor_plant_containers = db.Column(db.Integer)
    indoor_gardening_containers = db.Column(db.Integer)
    indoor_water_storage = db.Column(db.Integer)
    indoor_appliance_trays = db.Column(db.Integer)
    indoor_other_containers = db.Column(db.TEXT)

    inspection_time = db.Column(db.DateTime)

    def __repr__(self):
        return f'<Dengue {self.inspection_time.strftime('%Y-%m')} {self.building_id}>'
