

import { Table,Model,DataType,Column,BelongsToMany, ForeignKey, AllowNull, BelongsTo, HasMany } from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { Stadium } from "../../stadiums/models/stadium.model";

interface DistrictCreationAttr {
        name: string
}
@Table({tableName: 'district'})
export class District extends Model<District, DistrictCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    region_id: number

    @BelongsTo(()=> Region)
    region: Region[];

    @HasMany(() => Stadium)
    stadium: Stadium[]
    
}
