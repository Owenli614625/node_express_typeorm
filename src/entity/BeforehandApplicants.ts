import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
export class BeforehandApplicants {

    @PrimaryGeneratedColumn({comment:"预报名id"})
    id: number;

    
    @Column({type:"varchar",length: 255,nullable:true,comment:"学生姓名"})
    student_name:string;


    @Column({type:"varchar",length: 255,nullable:true,comment:"学生身份证号"})
    student_card:string;

    @Column({type:"bit", default: () => 0,nullable:true,comment:"性别,0-男，1-女"})
    gender:number;

    @Column({type:"varchar",length: 20,nullable:true,comment:"手机号"})
    phone:string;


    @Column({type:"int",nullable:true,comment:"预报名招生批次id"})
    enrollment_batch_id:string;

    @Column({type:"int",nullable:true,comment:"学校id"})
    school_id:number;


    @Column({type:"int",nullable:true,comment:"专业id"})
    major_id:number;

    @Column({type:"int",nullable:true,comment:"函授站id"})
    station_id:number;

    @Column({type:"int",nullable:true,comment:"学习形式，2-全日制，1-函授，0-业余"})
    learn_way:number;

    @Column({type:"int",nullable:true,comment:"学历层次，2-专升本，1-高起本，0-高起专"})
    education_level:number;

    @Column({type:"timestamp",nullable:true,comment:"预报名时间"})
    enroll_time:Date;
 


    

    


}