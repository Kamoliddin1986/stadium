import { Table,Model,DataType,Column,BelongsTo, ForeignKey, HasMany, HasOne } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Cart } from "../../cart/models/cart.model";

interface UserCardCreationAttr {
    name: string;
    phone: string;
    number:string;
    year: number;
    month: number;
    is_active: boolean;
    is_main: boolean;
}

@Table({tableName: 'user_card'})
export class UserCard extends Model<UserCard,UserCardCreationAttr>{
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

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    number: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    year: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    month: number;


    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false 
    })
    is_active: boolean;


    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false 
    })
    is_main: boolean;

    @BelongsTo(() => User)
    user: User[]

    @HasOne(() => Cart)
    card: Cart
}
