
import { Table,Model,DataType,Column,BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Stadium } from "../../stadiums/models/stadium.model";
import { User } from "../../users/models/user.model";

interface CommentCreationAttr {
    impression: string
}


@Table({tableName: 'comments'})
export class Comment extends Model<Comment, CommentCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number;


    @ForeignKey(() => Stadium)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    stadium_id: number;


    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    impression: string;

    @BelongsTo(() => Stadium)
    stadium: Stadium[]

    @BelongsTo(() => User)
    user: User[]

}
