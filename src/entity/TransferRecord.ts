import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

////转站记录表
@Entity()
//各组织在审批流中的编号:
    //原函授站名称:地球;
    //新函授站名称:月亮;
    
export class TransferRecord {

    @PrimaryGeneratedColumn({comment:"转站记录id"})
    id: number;

    @Column({type:"int",comment:"学生id"})
    student_id: number;

    @Column({type:"varchar",length: 255,nullable:true,comment:"学生身份证号"})
    student_card:string;

    @Column({type:"varchar",length: 500,nullable:true,comment:"转站原因"})
    student_reason:string;

    @Column({type:"varchar",length: 125,nullable:true,comment:"转站申请书url"})
    application_url:string;


    @Column({type:"timestamp",nullable:true,comment:"转站申请时间"})
    
    application_time:Date;

    @Column({type:"int",nullable:true,comment:"原函授站id"})
    original_station_id:number;

    @Column({type:"int",nullable:true,comment:"原函授站审批状态:是否同意 1:同意 0:未审批 2:不同意"})
    original_station_status:number;

    @Column({type:"varchar",length: 255,nullable:true,comment:"原函授站审批意见"})
    original_station_opinion:string;
   
    @Column({type:"int",nullable:true,comment:"新函授站id"})
    new_station_id:number;

    @Column({type:"int",nullable:true,comment:"新函授站审批状态  1:同意 0:未审批 2:不同意"})
    new_station_status:number;

    @Column({type:"varchar",length: 255,nullable:true,comment:"新函授站审批意见"})
    new_station_opinion:string;


    @Column({type:"int",nullable:true,comment:"学校审批状态  1:同意 0:未审批 2:不同意"})
    school_opinion_status:number;

    @Column({type:"varchar",length: 255,nullable:true,comment:"学校审批意见"})
    school_opinion_opinion:string;
}