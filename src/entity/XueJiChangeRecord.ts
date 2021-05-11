import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

//学籍变动记录表
@Entity()
export class XueJiChangeRecord {

    @PrimaryGeneratedColumn({comment:"学籍变动记录id"})
    id: number;

    @Column({type:"int",comment:"学生id"})
    student_id: number;

    @Column({type:"varchar",length: 255,nullable:true,comment:"学生身份证号"})
    student_card:string;

    @Column({type:"varchar",length: 500,nullable:true,comment:"学籍变动原因"})
    xueJiChange_reason:string;

    @Column({type:"varchar",length: 125,nullable:true,comment:"学籍变动申请书url"})
    xueJiChange_url:string;

    @Column({type:"varchar",length: 255,nullable:true,comment:"函授站审批意见:同意|说明"})
    station_opinion:string;

    @Column({type:"varchar",length: 255,nullable:true,comment:"学校审批意见:同意|说明"})
    school_opinion:string;
}