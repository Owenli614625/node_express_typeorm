import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
export class PaymentInfo {

    @PrimaryGeneratedColumn({comment:"缴费id"})
    id: number;

    @Column({type:"varchar",length: 25,nullable:true,comment:"学生学号"})
    Student_number:string;


    @Column({type:"varchar",length: 25,nullable:true,comment:"学生身份证"})
    Student_card:string;

    @Column({type:"varchar",length: 125,nullable:true,comment:"缴费方式"})
    payment_method:string;

    @Column({type:"varchar",length: 255,nullable:true,comment:"缴费概要"})
    payment_summary:string;

    @Column({type:"int",nullable:true,comment:"应缴金额"})
    amount_due:number;

    @Column({type:"int",nullable:true,comment:"实缴金额"})
    actual_payment:number

    @CreateDateColumn({type: "timestamp", nullable:true,comment:"缴费时间"})
    payment_time: Date ;

    @Column({type:"varchar",length: 125,nullable:true,comment:"缴费发票单号"})
    payment_invoice:string;
    

    


}
