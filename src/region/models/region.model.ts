import { Table,Model,DataType,Column,BelongsToMany, ForeignKey, HasMany } from "sequelize-typescript";
import { District } from "../../district/models/district.model";
import { Stadium } from "../../stadiums/models/stadium.model";

interface RegionCreationAttr {
        name: string
}


@Table({tableName: 'region'})
export class Region extends Model<Region, RegionCreationAttr> {
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


@HasMany(() => Stadium)
stadium: Stadium[]


@HasMany(() => District)
district: District[]

}
