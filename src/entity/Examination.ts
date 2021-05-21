import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
export class Examination {

    @PrimaryGeneratedColumn({comment:"考试id"})
    id: number;
  
    @Column({type:"varchar",length: 10,comment:"考试科目"})
    subject: string ;

    @Column({type:"varchar",length: 50,nullable:true,comment:"所属专业"})
    majors: string ;

    @Column({type:"int",nullable:true,comment:"学校id"})
    school_id: number ;


    @Column({type:"int",nullable:true,comment:"批次/年级id"})
    gradeid:number;
    
    @Column({type:"varchar",length: 255,nullable:true,comment:"所属函授站"})
    stations: string ;

    @Column({type:"int",nullable:true,comment:"考试状态，2-已完成，1-进行中，0-未开始"})
    state: number ;

    @Column({type:"int",nullable:true,comment:"考试时长，单位分钟"})
    consuming_time: number ;
    
    @Column({type: "int", nullable:true,comment:"试卷id"})
    test_paper_id: number ;


    @CreateDateColumn({type: "timestamp", nullable:true,comment:"开始时间"})
    start_time: Date ;

    @CreateDateColumn({type: "timestamp", nullable:true,comment:"结束时间"})
    end_time: Date ;

    

    @Column({type:"int",nullable:true,comment:"应该参加考试人数"})
    should_take_number: number ;

    @Column({type:"int",nullable:true,comment:"实际参加考试人数"})
    fact_take_number: number ;

    


}
