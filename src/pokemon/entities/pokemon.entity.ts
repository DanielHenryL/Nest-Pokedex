import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatDocument = HydratedDocument<Pokemon>;
// Un entities se entiende el como se veria la base de datos.('la tabla').
@Schema()
export class Pokemon {

    @Prop({ unique: true, index: true })
    name:string;

    @Prop({ unique: true, index: true })
    no:number;

}
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);