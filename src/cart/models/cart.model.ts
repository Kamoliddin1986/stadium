import { NOW } from "sequelize";
import { Table,Model,DataType,Column,BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { StadiumTime } from "../../stadium_times/models/stadium_time.model";
import { UserCard } from "../../user_card/models/user_card.model";
import { User } from "../../users/models/user.model";

interface CartCreationAttr {
    date: Date;
    createdAt: Date;
    time_for_clear: String;
}

@Table({tableName: 'cart'})
export class Cart extends Model<Cart, CartCreationAttr>{
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

    @ForeignKey(() => UserCard)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_wallet_id: number;

    @ForeignKey(() => StadiumTime)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    st_time_id: number;

    @Column({
        type: DataType.DATE,
        defaultValue: NOW
    })
    date: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: NOW
    })
    createdAt: Date;

    @Column({
        type: DataType.STRING,
        defaultValue: '30m'
    })
    time_for_clear: string;


    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    status_id: number;

    @BelongsTo(() => UserCard)
    userCard: UserCard[]


    @BelongsTo(() => User)
    user: User[]


    @BelongsTo(() => StadiumTime)
    stadiumTime: StadiumTime[]
}
