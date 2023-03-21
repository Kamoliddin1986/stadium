import { Table,Model,DataType,Column,BelongsToMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Stadium } from "../../stadiums/models/stadium.model";

interface MediaCreationAttr {
    name: string;
    description: string;
}


@Table({tableName: 'media'})
export class Media extends Model<Media, MediaCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => Stadium)
    @Column({
        type: DataType.INTEGER
    })
    stadium_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    photo: string;

    @Column({
        type: DataType.TEXT,
   })
    description: string;

    @BelongsTo(() => Stadium)
    stadium: Stadium[]

}
