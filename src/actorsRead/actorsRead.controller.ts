import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ActorReadDTO, SearchActorsRequestDTO, SearchActorsResponseDTO } from "./actorsRead.dtos";

@Controller("/actors")
export class ActorsReadController {
    @Get("/full-name")
    @ApiOperation({
        summary: 'Search Actors',
        description: `Search Actors by fullName`
    })
    @ApiOkResponse({
        description: `Successfully PUT response a ${ActorReadDTO.name}`,
        type: ActorReadDTO,
    })
    async searchActors(@Query() query: SearchActorsRequestDTO): Promise<SearchActorsResponseDTO> {
        //return await this.actorsService.searchActor(query);
        return new SearchActorsResponseDTO();
    }
}