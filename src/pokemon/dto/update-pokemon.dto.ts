import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';
// El Dto se ve como lo la data o campos que el frontend o usuario debe enviarnos
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
