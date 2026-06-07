import { Injectable } from "@nestjs/common";
import { AssetsService } from "./assets.service";
import { GovIssueDoc, IssueDocType, IssuerGoverment } from "./govIssueDoc.entity";
import { Actor } from "./actor.entity";

@Injectable()
export class GovIssueDocsService extends AssetsService<GovIssueDoc> {
    constructor(
    ) {
        super();
    }

    async addGovIssueDoc(actorId: string, issuerGov: IssuerGoverment, issueDocType: IssueDocType, issueDocumentNubmer: string): Promise<Actor> {
        let actor = await this.getActorEntity(actorId);

        let govIssueDocEntity = new GovIssueDoc();
        govIssueDocEntity = this.setAssetAttributes(govIssueDocEntity);

        govIssueDocEntity.issuerGoverment = issuerGov;
        govIssueDocEntity.issueDocType = issueDocType;
        govIssueDocEntity.issueDocNumber = issueDocumentNubmer;

        if (!actor.govIssueDocs || actor.govIssueDocs.length === 0) {
            actor.govIssueDocs = [govIssueDocEntity];
        } else {
            actor.govIssueDocs.push(govIssueDocEntity);
        }

        actor = await this.saveActor(actor);

        return actor;
    }
}