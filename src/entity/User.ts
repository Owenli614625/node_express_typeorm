import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar",length: 100})
    firstName: string;

    @Column({type:"varchar",length: 100})
    lastName: string;

    @Column({type:"int",nullable:true})
    age: number;

    @Column({type:"varchar", length: 11 ,comment:"用户手机号码,表中不可重复"})  
    @Index("phone_unique",{unique:true})
    phone: string;

    @Column({type:"text",nullable:true})
    description: string;

    @CreateDateColumn({type: "timestamp", nullable:true})
    creatime: Date;

}
