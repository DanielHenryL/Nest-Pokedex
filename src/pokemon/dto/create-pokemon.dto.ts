import { IsString, MinLength, IsInt, IsPositive, Min } from "class-validator";

// El Dto se ve como lo la data o campos que el frontend o usuario debe enviarnos
export class CreatePokemonDto {
    @MinLength(1)
    @IsString()
    name: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;
}
