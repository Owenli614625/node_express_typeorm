import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
export class Exam_item_library {

    @PrimaryGeneratedColumn({comment:"题id"})
    id: number;
  
    @Column({type:"int",nullable:true,comment:"题类型"})
    category: number ;  //题类型

    @Column({type:"varchar",length: 255,nullable:true,comment:"题目"})
    question: string ;  //题目

    @Column({type:"varchar",length: 255,nullable:true,comment:"选项"})
    options: string ;   //选项

    @Column({type:"varchar",length: 255,nullable:true,comment:"提示信息"})
    hint: string ;      //提示信息

    @Column({type:"varchar",length: 255,nullable:true,comment:"答案解析"})
    analysis: string ;   //答案解析

    @Column({type:"varchar",length: 255,nullable:true,comment:"答案"})
    answer: string ;     //答案


    @CreateDateColumn({type: "timestamp", nullable:true,comment:"添加时间"})
    insert_time: Date ;   //添加时间

    @Column({type: "int", nullable:true,comment:"课程id"})
    curriculum_id:number ;     //课程id

    @Column({type: "int", nullable:true,comment:"所属学校ID"})
    school_id: number ;       //所属学校ID


    
}
