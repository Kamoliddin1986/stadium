
import { Table,Model,DataType,Column,BelongsToMany, ForeignKey, BelongsTo } from "sequelize-typescript";

interface CategoryCreationAttr {
    name: string;
    parent_id: number
}
@Table({tableName: 'categories' })
export class Category extends Model<Category,CategoryCreationAttr>{
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

    @ForeignKey(()=> Category)
    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    parent_id: number

    @BelongsTo(()=> Category)
    parent: Category[];
}
