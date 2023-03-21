import { Table,Model,DataType,Column,BelongsToMany, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";


interface OtpAttr {
    id: string;
    otp: string;
    expiretion_time: Date;
    verified: boolean;
    check: string;
}
@Table({tableName: 'otp'})
export class Otp extends Model<Otp, OtpAttr> {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    otp: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    expiretion_time: Date;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    verified: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: false,

    })
    check: string;}
