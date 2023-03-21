import { Table,Model,DataType,Column,BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Order } from "../../orders/models/order.model";
import { User } from "../../users/models/user.model";

interface UserWalletAttr {
    wallet: number
}
@Table({tableName: 'user_wallet'})
export class UserWallet extends Model<UserWallet,UserWalletAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER
    })
    user_id: number


    @Column({
        type: DataType.INTEGER
    })
    wallet: number;

    @BelongsTo(() => User)
    user: User[]

    @HasMany(() => Order)
    orders: Order[]

   


}
