

import { extname } from "path";
import { Table,Model,DataType,Column,BelongsToMany, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";

import { Stadium } from "../../stadiums/models/stadium.model";
import { ComfortStadium } from "../../comfort-stadium/model/comfort-stadium.model";
interface ComfortCretionAttr{
   name: string 
}


@Table({tableName: 'comfort' })
export class Comfort  extends Model<Comfort, ComfortCretionAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @HasMany(() => ComfortStadium)
    comfortStadium:  ComfortStadium[]

}
