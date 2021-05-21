import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
export class TestPaper {

    @PrimaryGeneratedColumn({comment:"试卷id"})
    id: number;

    @Column({type:"int",nullable:true,comment:"学校id"})
    school_id: number ;

    @Column({type:"varchar",length: 100,nullable:true,comment:"试卷名称"})
    test_paper_name: string ; 

    @Column({type:"int",nullable:true,comment:"专业id"})
    major_id: number ;  

    @Column({type:"int",nullable:true,comment:"科目id"})
    subject_id: number ; 
    
    @CreateDateColumn({type: "timestamp", nullable:true,comment:"添加时间"})
    insert_time: Date ;   

   

}