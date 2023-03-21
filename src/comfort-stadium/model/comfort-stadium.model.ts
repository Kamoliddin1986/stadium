import { Table,Model,DataType,Column,BelongsToMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Comfort } from "../../comfort/models/comfort.model";

import { Stadium } from "../../stadiums/models/stadium.model";



@Table({tableName: 'Comfort_stadium'})
export class ComfortStadium extends Model<ComfortStadium > {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => Stadium)
    @Column({
        type: DataType.INTEGER,
    })
    stadium_id: number;

    @ForeignKey(() => Comfort)
    @Column({
        type: DataType.INTEGER,
    })
    comfort_id: number;

    @BelongsTo(() => Comfort)
    comfort: Comfort[]


    @BelongsTo(() => Stadium)
    stadium: Stadium[]

}   
