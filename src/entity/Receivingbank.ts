import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
export class ReceivingBank {

    @PrimaryGeneratedColumn({comment:"收款方id"})
    id: number;

    
    @Column({type:"varchar",length: 255,nullable:true,comment:"支付宝收款账号"})
    Alipay_account:string;


    @Column({type:"varchar",length: 255,nullable:true,comment:"微信收款账号"})
    weixin_account:string;

    @Column({type:"varchar",length: 255,nullable:true,comment:"收款组织"})
    Collection_organization:string;

    @Column({type:"varchar",length: 255,nullable:true,comment:"收款人姓名"})
    user_name:string;


    @Column({type:"varchar",length: 100,nullable:true,comment:"银行名称"})
    bank_name:string;

    @Column({type:"varchar",length: 100,nullable:true,comment:"银行卡账号"})
    bank_number:string;


    @Column({type:"varchar",length: 255,nullable:true,comment:"开户行省市"})
    bank_address:string;

    @Column({type:"varchar",length: 255,nullable:true,comment:"开户行名称-详细地址"})
    Detailed_address:string;

    

 


    

    


}
