import { Asset } from "./asset.entity";

export abstract class AssetsService<T extends Asset> {
    setAssetAttributes(entity: T): T {
        entity.assetId = crypto.randomUUID();
        entity.createdAt = new Date();
        entity.updatedAt = new Date();

        return entity;
    }
}