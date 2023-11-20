import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {

    try {

      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
      
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne( term: string ) {

    let pokemon:Pokemon;

    if ( !isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    // mongo ID
    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }
    // Name
    if( !pokemon ){
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });
    }

    if ( !pokemon ) throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found`);
    
    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    
    if ( updatePokemonDto.name ) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }
    try {

      const pokemon = await this.pokemonModel.findByIdAndUpdate( id, updatePokemonDto, {new:true} )
      return pokemon;   

    } catch (error) {
      this.handleException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }

  private handleException( error:any){
    if ( error.code === 11000 ) {
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue )}`);
    }
    throw new InternalServerErrorException(`Can't update pokemon - cheack server logs`);
  }
}
