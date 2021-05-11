import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

//函授站申请招生计划表
@Entity()
export class RecruitStudents {

    @PrimaryGeneratedColumn({comment:"招生计划id"})
    id: number;

    @Column({type:"int",nullable:true,comment:"批次/年级id"})
    gradeid:number;

    @Column({type:"int",nullable:true,comment:"学习形式，2-全日制，1-函授，0-业余"})
    learn_way:number;

    @Column({type:"int",nullable:true,comment:"学历层次，2-专升本，1-高起本，0-高起专"})
    education_level:number;

    @Column({type:"varchar",length: 50,nullable:true,comment:"学制"})
    schooling_length:string;

    @Column({type:"int",nullable:true,comment:"学费:这个字段有学校端控制"})
    tuition:number;

    @Column({type:"varchar",length: 50,nullable:true,comment:"科类"})
    subject: string ;

    @Column({type:"int",nullable:true,comment:"专业id"})
    major_id: number ;


    @Column({type:"int",nullable:true,comment:"函授站id"})
    station_id:number;


    @Column({type:"int",nullable:true,comment:"本次申请人数"})
    apply_number:string;


    @Column({type:"int",nullable:true,comment:"上次申请人数"})
    last_apply_number:string;


    @Column({type:"int",nullable:true,comment:"申报状态 0-未开始,1-进行中，2-已结束"})
    apply_status:number;

    @Column({type:"timestamp",nullable:true,comment:"申报开始时间"})
    apply_starttime:Date;

    @Column({type:"timestamp",nullable:true,comment:"申报结束时间"})
    apply_endtime:Date;

    @Column({type:"int",nullable:true,comment:"预报名人数"})
    before_apply_number:number;

    @Column({type:"int",nullable:true,comment:"招生总数"})
    admission_count:number;

    @Column({type:"int",nullable:true,comment:"已经录取人数"})
    actual_admission_number:number;


 
    @Column({type:"int",nullable:true,comment:"学校id"})
    school_id:number;
    

    @Column({type:"int",default: () => 0,nullable:true,comment:"审批状态 0-未审批,1-已同意，2-不同意"})
    approval_status:number;


}
