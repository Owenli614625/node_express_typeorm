import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
export class Sys_permission {

    @PrimaryGeneratedColumn({type:"int",comment:"权限主键"})
    perm_id: number;
  
    @Column({type:"varchar",length: 255,comment:"权限名称"})
    perm_name: string ;

    @Column({type:"varchar",length: 255,comment:"权限标识"})
    perm_code: string ;

    @Column({type:"varchar",length: 255,nullable:true,comment:"权限描述"})
    perm_desc: number ;

    @CreateDateColumn({type: "timestamp", nullable:true,comment:"创建时间"})
    create_time: Date ;

    @CreateDateColumn({type: "timestamp", nullable:true,comment:"更新时间"})
    update_time: Date ;


    @Column({type:"bit", default: () => 1,comment:"权限删除标识，1-正常，0-删除"})
    del_flag: number ;



    


}
