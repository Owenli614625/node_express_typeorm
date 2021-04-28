import {Entity, PrimaryGeneratedColumn, Column,Index,CreateDateColumn} from "typeorm";

@Entity()
export class Examination {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    subject: string ;

    @Column()
    majors: string ;

    @Column()
    school_id: number ;

    @Column()
    stations: string ;

    @Column()
    state: number ;

    @Column()
    consuming_time: number ;

    @CreateDateColumn({type: "timestamp", nullable:true})
    start_time: Date ;

    @CreateDateColumn({type: "timestamp", nullable:true})
    end_time: Date ;


    @Column()
    should_take_number: number ;

    @Column()
    fact_take_number: number ;

    


}
