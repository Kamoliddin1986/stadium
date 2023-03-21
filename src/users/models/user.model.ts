import { Table,Model,DataType,Column,BelongsToMany, ForeignKey, HasMany, HasOne } from "sequelize-typescript";
import { Comment } from "../../comments/models/comment.model";
import { Stadium } from "../../stadiums/models/stadium.model";
import { UserCard } from "../../user_card/models/user_card.model";
import { UserWallet } from "../../user_wallet/models/user_wallet.model";
import { Order } from "../../orders/models/order.model";
import { Cart } from "../../cart/models/cart.model";

interface UserCreationAttr {
    first_name: string;
    last_name: string;
    username: string;
    hashed_password: string;
    telegram_link: string;
    email: string;
    phone?: string;
    user_photo: string;
    birthday: Date;
    is_owner: boolean;
    is_active: boolean;
    hashed_refresh_token: string
}


@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {
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
    first_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    last_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    hashed_password: string;

    @Column({
        type: DataType.STRING,
    })
    telegram_link: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;


    @Column({
        type: DataType.STRING,
    })
    phone: string;
    
    @Column({
        type: DataType.STRING,
    })
    user_photo: string;


    @Column({
        type: DataType.DATE,
    })
    birthday: Date;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_owner: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean;

    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string

    @HasMany(() => Stadium)
    stadium: Stadium[]
   
    @HasMany(() => UserCard)
    user_card: UserCard[]
    
    @HasMany(() => Comment)
    comment: Comment[];

    @HasMany(() => Order)
    order: Order[];

    @HasOne(() => UserWallet)
    userWallet: UserWallet;


    @HasOne(() => Cart)
    cart: Cart;


    @Column({
        type: DataType.STRING
    })
    activation_link: string

}
