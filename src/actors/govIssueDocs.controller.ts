import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ActorsService } from "./actors.service";
import { GovIssueDocsService } from "./govIssueDocs.service";
import { NewGovIssueDocRequestDTO } from "./govIssueDocs.dtos";
import { ActorDTO } from "./actors.dtos";

@Controller("/actors")
export class ActorsController {
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly actorsService: ActorsService,
        private readonly govIssueDocsService: GovIssueDocsService
    ) { }

    @Post("/gov-issue-doc")
    async addGovIssueDoc(@Body() body: NewGovIssueDocRequestDTO): Promise<ActorDTO> {
        const actor = await this.govIssueDocsService.addGovIssueDoc(body.actorId, body.issuerGoverment, body.issueDocType, body.issueDocNumber);
        return this.actorsService.entityToDTO(actor);
    }
}