import { IsEmail } from 'class-validator';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/reports/report.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log(`Inserted complete User id : ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`Updated complete User id : ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`Deleted complete User id : ${this.id}`);
  }
}
