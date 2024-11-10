export default class DengueEntity {
    id: number;
    userId: string;
    inspectionTime: Date;
    buildingId: number;
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
    createdTime: Date;
    updatedTime: Date;

    constructor({
        id,
        userId,
        inspectionTime,
        buildingId,
        indoorApplianceTrays,
        indoorGardeningContainers,
        indoorOtherContainers,
        indoorPlantContainers,
        indoorWaterStorage,
        outdoorAbandonedAppliances,
        outdoorBarrels,
        outdoorBasementSump,
        outdoorBottlesCans,
        outdoorCoconutShells,
        outdoorDecorativePonds,
        outdoorDisposableItems,
        outdoorDrainageCovers,
        outdoorFlagpoleDrains,
        outdoorFloodedBasement,
        outdoorIncenseBurner,
        outdoorLargeWaterContainers,
        outdoorMailbox,
        outdoorNaturalWaterContainers,
        outdoorOtherContainers,
        outdoorPetWaterContainers,
        outdoorPotsKettles,
        outdoorRainGear,
        outdoorStagnantGutter,
        outdoorTableware,
        outdoorTiresHelmets,
        outdoorUnusedCoolingEquipment,
        outdoorUnusedWaterTowers,
        outdoorUrnsTanks,
        outdoorUtilityMeters,
        createdTime,
        updatedTime,
    }: DengueEntity) {
        this.id = id;
        this.userId = userId;
        this.inspectionTime = inspectionTime;
        this.buildingId = buildingId;
        this.indoorApplianceTrays = indoorApplianceTrays;
        this.indoorGardeningContainers = indoorGardeningContainers;
        this.indoorOtherContainers = indoorOtherContainers;
        this.indoorPlantContainers = indoorPlantContainers;
        this.indoorWaterStorage = indoorWaterStorage;
        this.outdoorAbandonedAppliances = outdoorAbandonedAppliances;
        this.outdoorBarrels = outdoorBarrels;
        this.outdoorBasementSump = outdoorBasementSump;
        this.outdoorBottlesCans = outdoorBottlesCans;
        this.outdoorCoconutShells = outdoorCoconutShells;
        this.outdoorDecorativePonds = outdoorDecorativePonds;
        this.outdoorDisposableItems = outdoorDisposableItems;
        this.outdoorDrainageCovers = outdoorDrainageCovers;
        this.outdoorFlagpoleDrains = outdoorFlagpoleDrains;
        this.outdoorFloodedBasement = outdoorFloodedBasement;
        this.outdoorIncenseBurner = outdoorIncenseBurner;
        this.outdoorLargeWaterContainers = outdoorLargeWaterContainers;
        this.outdoorMailbox = outdoorMailbox;
        this.outdoorNaturalWaterContainers = outdoorNaturalWaterContainers;
        this.outdoorOtherContainers = outdoorOtherContainers;
        this.outdoorPetWaterContainers = outdoorPetWaterContainers;
        this.outdoorPotsKettles = outdoorPotsKettles;
        this.outdoorRainGear = outdoorRainGear;
        this.outdoorStagnantGutter = outdoorStagnantGutter;
        this.outdoorTableware = outdoorTableware;
        this.outdoorTiresHelmets = outdoorTiresHelmets;
        this.outdoorUnusedCoolingEquipment = outdoorUnusedCoolingEquipment;
        this.outdoorUnusedWaterTowers = outdoorUnusedWaterTowers;
        this.outdoorUrnsTanks = outdoorUrnsTanks;
        this.outdoorUtilityMeters = outdoorUtilityMeters;
        this.createdTime = createdTime;
        this.updatedTime = updatedTime;
    }
}
