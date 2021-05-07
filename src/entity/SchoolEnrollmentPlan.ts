import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

//函授站申请招生计划表
@Entity()
export class SchoolEnrollmentPlan {

    @PrimaryGeneratedColumn({comment:"招生计划id"})
    id: number;

    @Column({type:"int",nullable:true,comment:"学校id"})
    school_id:number;

    @Column({type:"varchar",length: 50,nullable:true,comment:"批次/年级"})
    grade:string;

    @Column({type:"int",nullable:true,comment:"学习形式，2-全日制，1-函授，0-业余"})
    learn_way:number;

    @Column({type:"int",nullable:true,comment:"学历层次，2-专升本，1-高起本，0-高起专"})
    education_level:number;

    @Column({type:"varchar",length: 50,nullable:true,comment:"科类"})
    subject: string ;

    @Column({type:"int",nullable:true,comment:"专业id"})
    major_id: number ;

    @Column({type:"int",nullable:true,comment:"申报状态 0-未开始,1-进行中，2-已结束"})
    apply_status:number;

    @Column({type:"timestamp",nullable:true,comment:"申报开始时间"})
    apply_starttime:Date;

    @Column({type:"timestamp",nullable:true,comment:"申报结束时间"})
    apply_endtime:Date;

    @Column({type:"int",nullable:true,comment:"计划招生人数"})
    admission_count:number;



 
   
    

    


}
