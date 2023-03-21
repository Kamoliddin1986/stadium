import { Table,Model,DataType,Column,BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Cart } from "../../cart/models/cart.model";
import { Order } from "../../orders/models/order.model";
import { Stadium } from "../../stadiums/models/stadium.model";

interface StadiumTimeCreationAttr {
    start_time: string;
    end_time: string;
    price: number;

}
@Table({tableName: 'stadium_times'})
export class StadiumTime extends Model<StadiumTime, StadiumTimeCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => Stadium)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    stadium_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    start_time: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    end_time: string;


    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })

    price: number;

    @BelongsTo(() => Stadium)
    stadium: Stadium[]


    @HasMany(() => Cart)
    cart: Cart[]


    @HasMany(() => Order)
    order: Order[]
    
}
