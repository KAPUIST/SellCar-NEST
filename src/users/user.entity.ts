import { IsEmail } from 'class-validator';
import{AfterInsert,AfterRemove,AfterUpdate,Entity,Column,PrimaryGeneratedColumn} from 'typeorm'
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    @IsEmail()
    email:string;

    @Column()
    password:string;

    @AfterInsert()
    logInsert(){
        console.log(`Inserted complete User id : ${this.id}`)
    }
    @AfterUpdate()
    logUpdate(){
        console.log(`Updated complete User id : ${this.id}`)
    }
    @AfterRemove()
    logRemove(){
        console.log(`Deleted complete User id : ${this.id}`)
    }
}