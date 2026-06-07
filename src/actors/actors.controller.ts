import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ActorsService } from "./actors.service";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ActorDTO, FindActorRequestDTO, NewActorRequestDTO, UpdateActorDTO } from "./actors.dtos";
import { AuthGuard } from "../auth.guard";
import { GovIssueDocsService } from "./govIssueDocs.service";

@Controller("/actors")
export class ActorsController {
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly actorsService: ActorsService
    ) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get("/")
    @ApiOperation({
        summary: 'Find Actor',
        description: `Find Actor by providing actor's Type and ID`
    })
    @ApiOkResponse({
        description: 'Successfully GET response ActoryDTO.',
        type: ActorDTO,
    })
    async findActor(@Query() query: FindActorRequestDTO): Promise<ActorDTO> {
        return await this.actorsService.findActor(query.actorType, query.actorId);
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new  Actor',
        description: `Create new  Actor`
    })
    @ApiOkResponse({
        description: 'Successfully POST response ActorDTO.',
        type: ActorDTO,
    })
    async newCandidate(@Body() requestBody: NewActorRequestDTO): Promise<ActorDTO> {
        return await this.actorsService.createActor(requestBody);
    }

    @Delete("/:actorId")
    @ApiOperation({
        summary: 'Delete target  Actor',
        description: `Delete target  Actor, along with all it's assets`
    })
    @ApiOkResponse({
        description: 'Successfully DELETE response a successful message.',
        type: ActorDTO,
    })
    async deleteActor(@Query('actorId') actorId: string): Promise<string> {
        return await this.actorsService.deleteActor(actorId);
    }

    @Put("/")
    @ApiOperation({
        summary: 'Update  Actor',
        description: `Update  Actors attributes`
    })
    @ApiOkResponse({
        description: `Successfully PUT response a ${ActorDTO.name}`,
        type: ActorDTO,
    })
    async updateActor(@Body() body: UpdateActorDTO): Promise<ActorDTO> {
        return await this.actorsService.updateActor(body);
    }
}