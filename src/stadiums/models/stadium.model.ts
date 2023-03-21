import { Table,Model,DataType,Column,BelongsToMany, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { CategoriesModule } from "../../categories/categories.module";
import { Category } from "../../categories/models/category.model";
import { Comfort } from "../../comfort/models/comfort.model";

import { District } from "../../district/models/district.model";
import { Media } from "../../media/models/media.model";
import { Region } from "../../region/models/region.model";
import { User } from "../../users/models/user.model";
import { Comment } from "../../comments/models/comment.model";
import { StadiumTime } from "../../stadium_times/models/stadium_time.model";
import { ComfortStadium } from "../../comfort-stadium/model/comfort-stadium.model";


interface StadiumCreationAttr {
    contact_with: string;
    name: string;
    volume: string;
    location: string;
    builtAt: Date;
    start_time: string;
    end_time: string;
}


@Table({tableName: 'stadium'})
export class Stadium extends Model<Stadium, StadiumCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(()=> Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    category_id: number;
    
    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    owner_id: number;

    @Column({
        type: DataType.STRING
    })
    contact_with: string;

    @Column({
        type: DataType.STRING
    })
    name: string;
    
    @Column({
        type: DataType.STRING
    })
    volume: string;

    @Column({
        type: DataType.STRING
    })
    address: string;


    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    region_id: number;


    @ForeignKey(() => District)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    district_id: number;


    @Column({
        type: DataType.STRING
    })
    location: string;


    @Column({
        type: DataType.DATE,
        defaultValue: Date.now()
    })
    builtAt: Date;

    @Column({
        type: DataType.STRING
    })
    start_time: string;

    @Column({
        type: DataType.STRING
    })
    end_time: string;

    @BelongsTo(()=> Category)
    category: Category[];

    @BelongsTo(()=> User)
    user: User[];

    @BelongsTo(()=> Region)
    Region: Region[];

    @BelongsTo(()=> District)
    district: District[];


    @HasMany(() => Media)
    madia: Media[]

    @HasMany(() => Comment)
    comment: Comment[]
    
    @HasMany(() => ComfortStadium)
    comfortStadium:  ComfortStadium[]
    
    @HasMany(() => StadiumTime)
    stadium_times: StadiumTime[]

}


