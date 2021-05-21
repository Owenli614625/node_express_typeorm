import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

//录取名单数据表 ，由每个学校统一导入

@Entity()
export class AnswerQuestionsRecord {

    @PrimaryGeneratedColumn({comment:"作答记录id"})
    id: number;

    @Column({type:"int",nullable:true,comment:"学生id"})
    student_id:number;

    @Column({type:"int",nullable:true,comment:"试卷id"})
    test_paper_id:number;

    @Column({type:"int",nullable:true,comment:"题id"})
    question_id: number ;  

    @Column({type:"int",nullable:true,comment:"作答结果类型 0:url，1:作答结果字符串"})
    answer_type: number ; 

    @Column({type:"varchar",length: 255,nullable:true,comment:"学生作答结果"})
    student_answer: string ; 

    @Column({type:"int",nullable:true,comment:"得分"})
    get_core: number ;  

    @Column({type:"int",nullable:true,comment:"批阅状态 0-没有批阅,1-已经批阅"})
    marking_status: number ; 

    @Column({type:"timestamp",nullable:true,comment:"阅卷时间"})
    marking_time: Date ; 

    
}
