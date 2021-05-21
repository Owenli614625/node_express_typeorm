import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
export class TestQuestion {

    @PrimaryGeneratedColumn({comment:"id"})
    id: number;

    @Column({type:"int",nullable:true,comment:"试卷id"})
    test_paper_id: number ; 

    @Column({type:"int",nullable:true,comment:"题id"})
    question_id: number ;  

    @Column({type:"int",nullable:true,comment:"序号"})
    order_number: number ; 
    
    @CreateDateColumn({type: "timestamp", nullable:true,comment:"添加时间"})
    insert_time: Date ;   

}