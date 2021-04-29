import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
export class Exam_item_library {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type:"int",nullable:true})
    category: number ;  //题类型

    @Column({type:"varchar",length: 255})
    question: string ;  //题目

    @Column({type:"varchar",length: 255})
    options: string ;   //选项

    @Column({type:"varchar",length: 255})
    hint: string ;      //提示信息

    @Column({type:"varchar",length: 255})
    analysis: string ;   //答案解析

    @Column({type:"varchar",length: 255})
    answer: string ;     //答案


    @CreateDateColumn({type: "timestamp", nullable:true})
    insert_time: Date ;   //添加时间

    @CreateDateColumn({type: "int", nullable:true})
    curriculum_id:number ;     //课程id

    @CreateDateColumn({type: "int", nullable:true})
    school_id: number ;       //所属学校ID


    
}
