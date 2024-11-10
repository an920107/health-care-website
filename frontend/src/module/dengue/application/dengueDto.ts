import DengueEntity from "../domain/dengueEntity";

export class DengueRequest extends DengueEntity {
    constructor(attrs: {
        userId: string;
        buildingId: number;
        inspectionTime: Date;
        indoorApplianceTrays: number;
        indoorGardeningContainers: number;
        indoorOtherContainers: string;
        indoorPlantContainers: number;
        indoorWaterStorage: number;
        outdoorAbandonedAppliances: number;
        outdoorBarrels: number;
        outdoorBasementSump: number;
        outdoorBottlesCans: number;
        outdoorCoconutShells: number;
        outdoorDecorativePonds: number;
        outdoorDisposableItems: number;
        outdoorDrainageCovers: number;
        outdoorFlagpoleDrains: number;
        outdoorFloodedBasement: number;
        outdoorIncenseBurner: number;
        outdoorLargeWaterContainers: number;
        outdoorMailbox: number;
        outdoorNaturalWaterContainers: number;
        outdoorOtherContainers: string;
        outdoorPetWaterContainers: number;
        outdoorPotsKettles: number;
        outdoorRainGear: number;
        outdoorStagnantGutter: number;
        outdoorTableware: number;
        outdoorTiresHelmets: number;
        outdoorUnusedCoolingEquipment: number;
        outdoorUnusedWaterTowers: number;
        outdoorUrnsTanks: number;
        outdoorUtilityMeters: number;
    }) {
        super({
            ...attrs,
            id: -1,
            createdTime: new Date(),
            updatedTime: new Date(),
        });
    }

    toJson(): any {
        return {
            user_id: this.userId,
            building_id: this.buildingId,
            inspection_time: this.inspectionTime,
            indoor_appliance_trays: this.indoorApplianceTrays,
            indoor_gardening_containers: this.indoorGardeningContainers,
            indoor_other_containers: this.indoorOtherContainers,
            indoor_plant_containers: this.indoorPlantContainers,
            indoor_water_storage: this.indoorWaterStorage,
            outdoor_abandoned_appliances: this.outdoorAbandonedAppliances,
            outdoor_barrels: this.outdoorBarrels,
            outdoor_basement_sump: this.outdoorBasementSump,
            outdoor_bottles_cans: this.outdoorBottlesCans,
            outdoor_coconut_shells: this.outdoorCoconutShells,
            outdoor_decorative_ponds: this.outdoorDecorativePonds,
            outdoor_disposable_items: this.outdoorDisposableItems,
            outdoor_drainage_covers: this.outdoorDrainageCovers,
            outdoor_flagpole_drains: this.outdoorFlagpoleDrains,
            outdoor_flooded_basement: this.outdoorFloodedBasement,
            outdoor_incense_burner: this.outdoorIncenseBurner,
            outdoor_large_water_containers: this.outdoorLargeWaterContainers,
            outdoor_mailbox: this.outdoorMailbox,
            outdoor_natural_water_containers: this.outdoorNaturalWaterContainers,
            outdoor_other_containers: this.outdoorOtherContainers,
            outdoor_pet_water_containers: this.outdoorPetWaterContainers,
            outdoor_pots_kettles: this.outdoorPotsKettles,
            outdoor_rain_gear: this.outdoorRainGear,
            outdoor_stagnant_gutter: this.outdoorStagnantGutter,
            outdoor_tableware: this.outdoorTableware,
            outdoor_tires_helmets: this.outdoorTiresHelmets,
            outdoor_unused_cooling_equipment: this.outdoorUnusedCoolingEquipment,
            outdoor_unused_water_towers: this.outdoorUnusedWaterTowers,
            outdoor_urns_tanks: this.outdoorUrnsTanks,
            outdoor_utility_meters: this.outdoorUtilityMeters,
        };
    }
}

export class DengueRequestFactory {
    private static _answerToCode(main: boolean, sub: boolean): number {
        return main ? (sub ? 1 : 2) : 0;
    }

    static fromAnswerSet({
        userId,
        buildingId,
        inspectionTime,
        answerSet,
        outdoorOtherContainers,
        indoorOtherContainers,
    }: {
        userId: string,
        buildingId: number,
        inspectionTime: Date,
        answerSet: [boolean, boolean][],
        outdoorOtherContainers: string,
        indoorOtherContainers: string,
    }) {
        return new DengueRequest({
            userId: userId,
            buildingId: buildingId,
            inspectionTime: inspectionTime,
            outdoorBottlesCans: this._answerToCode(answerSet[0][0], answerSet[0][1]),
            outdoorUrnsTanks: this._answerToCode(answerSet[1][0], answerSet[1][1]),
            outdoorTableware: this._answerToCode(answerSet[2][0], answerSet[2][1]),
            outdoorPotsKettles: this._answerToCode(answerSet[3][0], answerSet[3][1]),
            outdoorDisposableItems: this._answerToCode(answerSet[4][0], answerSet[4][1]),
            outdoorBarrels: this._answerToCode(answerSet[5][0], answerSet[5][1]),
            outdoorCoconutShells: this._answerToCode(answerSet[6][0], answerSet[6][1]),
            outdoorTiresHelmets: this._answerToCode(answerSet[7][0], answerSet[7][1]),
            outdoorDrainageCovers: this._answerToCode(answerSet[8][0], answerSet[8][1]),
            outdoorAbandonedAppliances: this._answerToCode(answerSet[9][0], answerSet[9][1]),
            outdoorUnusedWaterTowers: this._answerToCode(answerSet[10][0], answerSet[10][1]),
            outdoorUnusedCoolingEquipment: this._answerToCode(answerSet[11][0], answerSet[11][1]),
            outdoorLargeWaterContainers: this._answerToCode(answerSet[12][0], answerSet[12][1]),
            outdoorPetWaterContainers: this._answerToCode(answerSet[13][0], answerSet[13][1]),
            outdoorFloodedBasement: this._answerToCode(answerSet[14][0], answerSet[14][1]),
            outdoorBasementSump: this._answerToCode(answerSet[15][0], answerSet[15][1]),
            outdoorUtilityMeters: this._answerToCode(answerSet[16][0], answerSet[16][1]),
            outdoorMailbox: this._answerToCode(answerSet[17][0], answerSet[17][1]),
            outdoorIncenseBurner: this._answerToCode(answerSet[18][0], answerSet[18][1]),
            outdoorRainGear: this._answerToCode(answerSet[19][0], answerSet[19][1]),
            outdoorNaturalWaterContainers: this._answerToCode(answerSet[20][0], answerSet[20][1]),
            outdoorFlagpoleDrains: this._answerToCode(answerSet[21][0], answerSet[21][1]),
            outdoorDecorativePonds: this._answerToCode(answerSet[22][0], answerSet[22][1]),
            outdoorStagnantGutter: this._answerToCode(answerSet[23][0], answerSet[23][1]),
            outdoorOtherContainers: outdoorOtherContainers,
            indoorPlantContainers: this._answerToCode(answerSet[24][0], answerSet[24][1]),
            indoorGardeningContainers: this._answerToCode(answerSet[25][0], answerSet[25][1]),
            indoorWaterStorage: this._answerToCode(answerSet[26][0], answerSet[26][1]),
            indoorApplianceTrays: this._answerToCode(answerSet[27][0], answerSet[27][1]),
            indoorOtherContainers: indoorOtherContainers,
        });
    }
}

export class DengueResponse extends DengueEntity {
    constructor(json: any) {
        super({
            id: json.id,
            userId: json.user_id,
            buildingId: json.building_id,
            inspectionTime: new Date(json.inspection_time),
            indoorApplianceTrays: json.indoor_appliance_trays,
            indoorGardeningContainers: json.indoor_gardening_containers,
            indoorOtherContainers: json.indoor_other_containers,
            indoorPlantContainers: json.indoor_plant_containers,
            indoorWaterStorage: json.indoor_water_storage,
            outdoorAbandonedAppliances: json.outdoor_abandoned_appliances,
            outdoorBarrels: json.outdoor_barrels,
            outdoorBasementSump: json.outdoor_basement_sump,
            outdoorBottlesCans: json.outdoor_bottles_cans,
            outdoorCoconutShells: json.outdoor_coconut_shells,
            outdoorDecorativePonds: json.outdoor_decorative_ponds,
            outdoorDisposableItems: json.outdoor_disposable_items,
            outdoorDrainageCovers: json.outdoor_drainage_covers,
            outdoorFlagpoleDrains: json.outdoor_flagpole_drains,
            outdoorFloodedBasement: json.outdoor_flooded_basement,
            outdoorIncenseBurner: json.outdoor_incense_burner,
            outdoorLargeWaterContainers: json.outdoor_large_water_containers,
            outdoorMailbox: json.outdoor_mailbox,
            outdoorNaturalWaterContainers: json.outdoor_natural_water_containers,
            outdoorOtherContainers: json.outdoor_other_containers,
            outdoorPetWaterContainers: json.outdoor_pet_water_containers,
            outdoorPotsKettles: json.outdoor_pots_kettles,
            outdoorRainGear: json.outdoor_rain_gear,
            outdoorStagnantGutter: json.outdoor_stagnant_gutter,
            outdoorTableware: json.outdoor_tableware,
            outdoorTiresHelmets: json.outdoor_tires_helmets,
            outdoorUnusedCoolingEquipment: json.outdoor_unused_cooling_equipment,
            outdoorUnusedWaterTowers: json.outdoor_unused_water_towers,
            outdoorUrnsTanks: json.outdoor_urns_tanks,
            outdoorUtilityMeters: json.outdoor_utility_meters,
            createdTime: new Date(json.created_time),
            updatedTime: new Date(json.updated_time),
        });
    }
}
