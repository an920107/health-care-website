import math
import io

from datetime import datetime
from helpers.CustomResponse import CustomResponse

from helpers.auth_helpers import authorization_required
from models.building_model import Building
from models.dengue_model import Dengue, db
from models.user_model import User
from flask import Blueprint, request, send_file
from sqlalchemy import desc
import pandas as pd
from flask_jwt_extended import get_jwt_identity

dengue_blueprint = Blueprint('dengue', __name__)


class DengueContainer:
    COLUMNS = [
        'user_id',
        'building_id',
        'outdoor_bottles_cans',
        'outdoor_urns_tanks',
        'outdoor_tableware',
        'outdoor_pots_kettles',
        'outdoor_disposable_items',
        'outdoor_barrels',
        'outdoor_coconut_shells',
        'outdoor_tires_helmets',
        'outdoor_drainage_covers',
        'outdoor_abandoned_appliances',
        'outdoor_unused_water_towers',
        'outdoor_unused_cooling_equipment',
        'outdoor_large_water_containers',
        'outdoor_pet_water_containers',
        'outdoor_flooded_basement',
        'outdoor_basement_sump',
        'outdoor_utility_meters',
        'outdoor_mailbox',
        'outdoor_incense_burner',
        'outdoor_rain_gear',
        'outdoor_natural_water_containers',
        'outdoor_flagpole_drains',
        'outdoor_decorative_ponds',
        'outdoor_stagnant_gutter',
        'outdoor_other_containers',
        'indoor_plant_containers',
        'indoor_gardening_containers',
        'indoor_water_storage',
        'indoor_appliance_trays',
        'indoor_other_containers',
        'inspection_time'
    ]

    COLUMNS_MAPPER = {
        'user_id': {
            "chinese_title": "填寫者ID",
            "problem": ""
        },
        'building': {
            "chinese_title": "建築物名稱",
            "problem": ""
        },
        'outdoor_bottles_cans': {
            "chinese_title": "空瓶、空罐",
            "problem": "未馬上動手清除"
        },
        'outdoor_urns_tanks': {
            "chinese_title": "陶甕、水缸",
            "problem": "未馬上動手清除"
        },
        'outdoor_tableware': {
            "chinese_title": "杯子、碟子、盤子、碗",
            "problem": "未馬上動手清除"
        },
        'outdoor_pots_kettles': {
            "chinese_title": "鍋、壺",
            "problem": "未馬上動手清除"
        },
        'outdoor_disposable_items': {
            "chinese_title": "保麗龍製品或塑膠製品、免洗餐具",
            "problem": "未馬上動手清除"
        },
        'outdoor_barrels': {
            "chinese_title": "桶子（木桶、鐵桶、塑膠桶等）",
            "problem": "未馬上動手清除"
        },
        'outdoor_coconut_shells': {
            "chinese_title": "椰子殼",
            "problem": "未馬上動手清除"
        },
        'outdoor_tires_helmets': {
            "chinese_title": "廢輪胎、廢安全帽",
            "problem": "未移除或以土填滿並種小花等植物"
        },
        'outdoor_drainage_covers': {
            "chinese_title": "屋簷旁排水管、帆布、遮雨棚",
            "problem": "未立即疏通"
        },
        'outdoor_abandoned_appliances': {
            "chinese_title": "廢棄冰箱、洗衣機、馬桶或水族箱",
            "problem": "有開口。有積水。不倒置或密封保持乾燥。"
        },
        'outdoor_unused_water_towers': {
            "chinese_title": "不使用或未加蓋的水塔（蓄水塔）",
            "problem": "有開口。有積水。不倒置或密封保持乾燥。"
        },
        'outdoor_unused_cooling_equipment': {
            "chinese_title": "未使用中的冷氣、冷卻水塔、冷飲櫃",
            "problem": "有開口。有積水。不倒置或密封保持乾燥。"
        },
        'outdoor_large_water_containers': {
            "chinese_title": "大型儲水桶有無加蓋或蓋細紗網",
            "problem": "無蓋或蓋細紗網，尚未倒置。"
        },
        'outdoor_pet_water_containers': {
            "chinese_title": "寵物水盤、雞、鴨、家禽、鳥籠或鴿舍內飲水槽、馬槽水",
            "problem": "未一週換水一次並刷洗乾淨"
        },
        'outdoor_flooded_basement': {
            "chinese_title": "積水地下室",
            "problem": "水尚未清除"
        },
        'outdoor_basement_sump': {
            "chinese_title": "地下室內的集水井",
            "problem": "有孑孓孳生"
        },
        'outdoor_utility_meters': {
            "chinese_title": "自來水表或瓦斯表",
            "problem": "內部漏水或積水，未保持乾燥"
        },
        'outdoor_mailbox': {
            "chinese_title": "門外信箱",
            "problem": "內部漏水或積水，未保持乾燥"
        },
        'outdoor_incense_burner': {
            "chinese_title": "燒金紙的桶子",
            "problem": "內部漏水或積水，未保持乾燥"
        },
        'outdoor_rain_gear': {
            "chinese_title": "雨鞋、雨衣",
            "problem": "內部漏水或積水，未保持乾燥"
        },
        'outdoor_natural_water_containers': {
            "chinese_title": "天然積水容器（竹籬笆竹節頂端、竹筒、樹幹上的樹洞、大型樹葉）",
            "problem": "尚未以土填滿並種小花等植物？"
        },
        'outdoor_flagpole_drains': {
            "chinese_title": "旗座水泥樁上及其他可積水之水管",
            "problem": "尚未把水倒掉，若暫不使用也未封住開口"
        },
        'outdoor_decorative_ponds': {
            "chinese_title": "假山造型水池（凹槽處）、冷氣機滴水",
            "problem": "有阻塞"
        },
        'outdoor_stagnant_gutter': {
            "chinese_title": "水溝積水有孑孓孳生",
            "problem": "有孑孓孳生"

        },
        'outdoor_other_containers': {
            "chinese_title": "其他（任何容器或雜物）",
            "problem": ""
        },
        'indoor_plant_containers': {
            "chinese_title": "花盤、花瓶、插水生植物容器（如：萬年青、黃金葛等）",
            "problem": "未一週換水一次，未洗刷乾淨"
        },
        'indoor_gardening_containers': {
            "chinese_title": "澆花灑水桶、花盆盆栽底盤",
            "problem": "未洗刷乾淨，不用時未倒置？"
        },
        'indoor_water_storage': {
            "chinese_title": "貯水容器（水缸、水泥槽、水桶、陶甕等或盛裝寵物飲水容器）",
            "problem": "未一週換水一次，未洗刷乾淨，加蓋密封"
        },
        'indoor_appliance_trays': {
            "chinese_title": "冰箱底盤、烘碗機底盤、開飲機底盤、泡茶用水盤",
            "problem": "未一週換水一次，未洗刷乾淨"
        },
        'indoor_other_containers': {
            "chinese_title": "其他",
            "problem": ""
        },
        'inspection_time': {
            "chinese_title": "檢查時間",
            "problem": ""
        }
    }

    def __init__(self, json_request):
        for column in self.COLUMNS:
            assert column in json_request, ValueError(f'{column} is required')

        self.data = {column: json_request[column] for column in self.COLUMNS}
        self.data['inspection_time'] = datetime.fromisoformat(self.data['inspection_time'])

    def get_data(self):
        return self.data


@dengue_blueprint.route('<int:id_>', methods=['GET'])
@authorization_required([0, 1, 2, 9])
def get_dengue(id_):
    """
    get dengue
    ---
    tags:
      - dengue
    parameters:
      - in: path
        name: id_
        type: integer
        required: true
        description: The dengue id
    responses:
      200:
        description: get dengue success
        schema:
          id: Dengue
      404:
        description: dengue not found
        schema:
          id: NotFound
    """
    dengue = db.session.query(Dengue).get(id_)
    if dengue is None:
        return CustomResponse.not_found('Dengue not found', {})
    return CustomResponse.success('Dengue found', dengue.to_dict())


@dengue_blueprint.route('', methods=['GET'])
@authorization_required([0, 1, 2, 9])
def get_dengues():
    """
    get dengues
    ---
    tags:
      - dengue
    parameters:
      - in: query
        name: page
        type: integer
        required: false
        description: The page number
      - in: query
        name: user_id
        type: string
        required: false
        description: The page user_id
    responses:
      200:
        description: get dengue success
        schema:
          id: DengueQuery
    """

    user_id = get_jwt_identity()['id']
    user = User.query.get(user_id)

    page = int(request.args['page']) \
        if "page" in request.args and int(request.args['page']) > 1 \
        else 1

    dengues = db.session.query(Dengue)

    if not user:
        return CustomResponse.not_found('User not found', {})

    elif user.role == 9:
        buildings = Building.query.filter_by(user_id=user_id).all()
        dengues = dengues.filter(Dengue.building_id.in_([building.id for building in buildings]))

    dengues = dengues.order_by(desc(Dengue.created_time)).all()
    total_page = math.ceil(len(dengues) / 10)
    dengues = [dengue.to_dict() for dengue in dengues][(page - 1) * 10:page * 10]

    return {'message': 'get dengues success', 'data': dengues, 'total_page': total_page}, 200


@dengue_blueprint.route('report', methods=['GET'])
@authorization_required([0, 1])
def get_dengue_report():
    """
    get dengue report
    ---
    tags:
      - dengue
    parameters:
      - in: query
        name: from
        type: string
        required: true
        example: 2021-01
        description: The start time
      - in: query
        name: to
        type: string
        required: true
        example: 2021-01
        description: The end time
    responses:
      200:
        description: get dengue report success
    """
    from_time = datetime.strptime(request.args['from'], '%Y-%m')
    to_time = datetime.strptime(request.args['to'], '%Y-%m')

    if from_time > to_time:
        return CustomResponse.unprocessable_content('from time should be less than to time', {})

    # list all year_months
    year_months = [
        year_month.strftime('%Y-%m')
        for year_month in pd.date_range(from_time, to_time + pd.DateOffset(months=1), freq='ME')]

    # list all building
    buildings = db.session.query(Building).all()
    buildings_mapper = {building.id: building.name for building in buildings}

    pivot_table = pd.DataFrame([], index=[building.name for building in buildings], columns=[year_months])
    pivot_table = pivot_table.fillna("尚未填報")

    error_tables = {}  # {'month': {'place': {'key': 'value'}}}
    for dengue in db.session.query(Dengue).all():
        dengue = dengue.to_dict()
        building_name = buildings_mapper[dengue['building_id']]
        year_month = dengue['inspection_time'].strftime('%Y-%m')
        if year_month not in year_months:
            continue
        error_tables[year_month] = error_tables.get(year_month, {})
        error_tables[year_month][building_name] = error_tables[year_month].get(building_name, {})

        pivot_table.loc[building_name, year_month] = '完成'
        for key, value in dengue.items():
            if key in ['id', 'user_id', 'building_id', 'inspection_time', 'created_time', 'updated_time']:
                continue

            error_tables[year_month][building_name][key] = None
            if key in ['outdoor_other_containers', 'indoor_other_containers'] and value and value != '無':
                pivot_table.loc[building_name, year_month] = '有狀況'
                error_tables[year_month][building_name][key] = value
                continue

            if value == 1 and pivot_table.loc[building_name, year_month].iloc[0] != '有狀況':
                pivot_table.loc[building_name, year_month] = '已改善'

            if value == 2:
                pivot_table.loc[building_name, year_month] = '有狀況'
                error_tables[year_month][building_name][key] = DengueContainer.COLUMNS_MAPPER[key]['problem']

    pivot_table = pivot_table.T.reset_index().T.reset_index()
    pivot_table.iloc[0, 0] = ''

    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        pivot_table.to_excel(writer, index=False, header=False, sheet_name="總表")

        for year_month, table in error_tables.items():
            table = pd.DataFrame(table).reset_index().dropna(axis=1, how='all')
            table['index'] = table['index'].apply(
                lambda x: DengueContainer.COLUMNS_MAPPER.get(x, {'chinese_title': x})['chinese_title'])
            table.T.reset_index().T.to_excel(writer, index=False, header=False, sheet_name=year_month)

    output.seek(0)
    return send_file(
        output,
        as_attachment=True,
        download_name='登革熱報表.xlsx'
    )


@dengue_blueprint.route('', methods=['POST'])
@authorization_required([0, 1])
def post_dengue():
    """
    post dengue
    ---
    tags:
      - dengue
    parameters:
      - in: body
        name: body
        schema:
          id: DengueInput
    responses:
      201:
        description: post dengue success
        schema:
          id: Dengue
      422:
        description: unprocessable content
        schema:
          id: UnprocessableContent
    """
    try:
        request_payload = DengueContainer(request.json).get_data()
    except Exception as e:
        return CustomResponse.unprocessable_content(str(e), {})

    dengue = Dengue(**request_payload)
    db.session.add(dengue)
    db.session.commit()

    return CustomResponse.created("post insurance success", dengue.to_dict())


@dengue_blueprint.route('<int:id_>', methods=['PATCH'])
@authorization_required([0, 1])
def patch_dengue(id_):
    """
    patch dengue
    ---
    tags:
      - dengue
    parameters:
      - in: path
        name: id_
        type: integer
        required: true
        description: The dengue id
      - in: body
        name: body
        schema:
          id: DengueInput
    responses:
      204:
        description: patch dengue success
        schema:
          id: Dengue
      404:
        description: dengue not found
        schema:
          id: NotFound
    """
    dengue = db.session.query(Dengue).get(id_)

    if dengue is None:
        return CustomResponse.not_found('Dengue not found', {})

    for column in DengueContainer.COLUMNS:
        if column in request.json:
            if column == 'inspection_time':
                dengue.inspection_time = datetime.fromisoformat(request.json[column])
            else:
                setattr(dengue, column, request.json[column])

    db.session.commit()
    return CustomResponse.success('patch dengue success', dengue.to_dict())


@dengue_blueprint.route('<int:id_>', methods=['DELETE'])
@authorization_required([0, 1, 2, 9])
def delete_dengue(id_):
    """
    delete dengue
    ---
    tags:
      - dengue
    parameters:
      - in: path
        name: id_
        type: integer
        required: true
        description: The dengue id
    responses:
      204:
        description: delete insurance success
        schema:
          id: Dengue
      404:
        description: insurance not found
        schema:
          id: NotFound
    """
    dengue = db.session.query(Dengue).get(id_)

    if dengue is None:
        return CustomResponse.not_found("Dengue not found", {})

    db.session.delete(dengue)
    db.session.commit()

    return CustomResponse.no_content("delete dengue success", {})
