import { Table,Model,DataType,Column,BelongsToMany, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { StadiumTime } from "../../stadium_times/models/stadium_time.model";
import { User } from "../../users/models/user.model";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";


interface OrderCreationAttr {
    name: string;
    createdAt: Date
}

@Table({tableName: 'orders'})
export class Order extends Model<Order, OrderCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;


    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number;


    @ForeignKey(()=> UserWallet)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_wallet_id: number;


    @ForeignKey(()=> StadiumTime)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    st_times_id: number;


    @Column({
        type: DataType.DATE
    })
    date: Date;
    
    @Column({
        type: DataType.DATE,
        defaultValue: Date.now()
    })
    createdAt: Date;

    @Column({
        type: DataType.INTEGER
    })
    status_id: number;

    @BelongsTo(() => StadiumTime)
    staduim_times: StadiumTime[]


    @BelongsTo(() => UserWallet)
    userWallet: UserWallet[]

    @BelongsTo(() => User)
    user: User[]


}
