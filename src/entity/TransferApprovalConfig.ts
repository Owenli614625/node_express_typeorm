import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

//转站审批流程配置表
@Entity()
//各组织在审批流中的编号:
    //原函授站编号:1;
    //新函授站编号:2;
    //学校在审批流中的编号为:3;
export class TransferApprovalConfig {

    @PrimaryGeneratedColumn({comment:"审批流程id"})
    id: number;

    @Column({type:"int",nullable:true,comment:"学校id"})
    school_id:number;

    @Column({type:"int",comment:"批次/年级id"})
    gradeid  :number;

    @Column({type:"int",comment:"是否开启转站申请;1-开启,0-不开启"})
    status  :number;

    @CreateDateColumn({type: "timestamp", nullable:true,comment:"转站申请开始时间"})
    start_time: Date ;

    @CreateDateColumn({type: "timestamp", nullable:true,comment:"转站申请结束时间"})
    end_time: Date ;

    @Column({type:"int",comment:"是否需要申请书;1-需要,0-不需要" })
    application :number;
    
    @Column({type:"int",comment:"是否需要上传证书;1-需要,0-不需要"})
    certificate :number;

    @Column({type:"int",comment:"是否需要申请原因;1-需要,0-不需要"})
    reasons  :number;

    @Column({type:"int",comment:"是否开启拒绝理由;1-开启,0-不开启"})
    refusal_reasons  :number;

    @Column({type:"int",comment:"审批层级;1:一级审批;2:二级审批;3:三级审批"})
    Approval_level  :number;

    @Column({type:"varchar",length: 20,comment:"审批流配置：3|1|2 {1:原函授站;2:新函授站;3:学校}"})
    Approval_process:string;
    
 
   


}