import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
//照片采集记录表

export class StudentPhotos {

    @PrimaryGeneratedColumn({comment:"照片id"})
    id: number;

    @Column({type:"int",comment:"学生id"})
    student_id: number;

    @Column({type:"varchar",length: 255,nullable:true,comment:"学生身份证号"})
    student_card:string;

    @Column({type:"varchar",length: 255,nullable:true,comment:"入学照片"})
    entrance_photo:string;
   
    @Column({type:"varchar",length: 255,nullable:true,comment:"证件照片"})
    card_photo:string;

    @Column({type:"varchar",length: 255,nullable:true,comment:"毕业照片"})
    graduation_photo:string;
}