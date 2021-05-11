import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

//学籍变动审批流程配置表
@Entity()
//各组织在审批流中的编号:
    //函授站编号:1;
    //学校在审批流中的编号为:2;
export class XuejiChangeApprovalConfig {

    @PrimaryGeneratedColumn({comment:"审批流程id"})
    id: number;

    @Column({type:"int",nullable:true,comment:"学校id"})
    school_id:number;

    @Column({type:"varchar",length: 20,comment:"审批流配置：1|2 {1:函授站；2：学校}"})
    Approval_process:string;
    
   
}