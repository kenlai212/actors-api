import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AgencyActorsService } from "./agencyActors.service";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { AgencyActorDTO, FindAgencyActorRequestDTO, NewAgencyActorRequestDTO, SearchAgencyActorsRequestDTO, SearchAgencyActorsResponseDTO, UpdateAgencyActorDTO } from "./agencyActors.dto";
import { AuthGuard } from "../auth.guard";

@Controller("/agency-actors")
export class AgencyActorsController {
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly agencyActorsService: AgencyActorsService,
    ) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get("/")
    @ApiOperation({
        summary: 'Find Agency Actor',
        description: `Find Agency Actor by providing actor's Type and ID`
    })
    @ApiOkResponse({
        description: 'Successfully GET response AgencyActoryDTO.',
        type: AgencyActorDTO,
    })
    async findAgencyActor(@Query() query: FindAgencyActorRequestDTO): Promise<AgencyActorDTO> {
        return await this.agencyActorsService.findAgencyActor(query.agencyActorType, query.actorId);
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Agency Actor',
        description: `Create new Agency Actor`
    })
    @ApiOkResponse({
        description: 'Successfully POST response AgencyActorDTO.',
        type: AgencyActorDTO,
    })
    async newCandidate(@Body() requestBody: NewAgencyActorRequestDTO): Promise<AgencyActorDTO> {
        return await this.agencyActorsService.createAgencyActor(requestBody);
    }

    @Delete("/:actorId")
    @ApiOperation({
        summary: 'Delete target Agency Actor',
        description: `Delete target Agency Actor, along with all it's assets`
    })
    @ApiOkResponse({
        description: 'Successfully DELETE response a successful message.',
        type: AgencyActorDTO,
    })
    async deleteAgencyActor(@Query('actorId') actorId: string): Promise<string> {
        return await this.agencyActorsService.deleteActor(actorId);
    }

    @Put("/")
    @ApiOperation({
        summary: 'Update Agency Actor',
        description: `Update Agency Actors attributes`
    })
    @ApiOkResponse({
        description: `Successfully PUT response a ${AgencyActorDTO.name}`,
        type: AgencyActorDTO,
    })
    async updateAgencyActor(@Body() body: UpdateAgencyActorDTO): Promise<AgencyActorDTO> {
        return await this.agencyActorsService.updateAgencyActor(body);
    }

    @Get("/full-name")
    @ApiOperation({
        summary: 'Search Agency Actors',
        description: `Search Agency Actors by fullName`
    })
    @ApiOkResponse({
        description: `Successfully PUT response a ${AgencyActorDTO.name}`,
        type: AgencyActorDTO,
    })
    async searchAgencyActors(@Query() query: SearchAgencyActorsRequestDTO): Promise<SearchAgencyActorsResponseDTO> {
        return await this.agencyActorsService.searchAgencyActor(query);
    }
}