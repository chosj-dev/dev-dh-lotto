import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["userId"])
@Unique(["lotteryUserId"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  userId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  lotteryUserId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  lotteryPassword: string;

  @Column({ type: "char", length: 1, default: "N" })
  isApproved: string;

  @Column({ type: "char", length: 1, default: "N" })
  isDeleted: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
