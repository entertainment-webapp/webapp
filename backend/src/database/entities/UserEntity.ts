import { hash } from "bcryptjs";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import AppDataSource from "../data-source";
import { RoleEntity } from "./RoleEntity";
import { ROLES } from "../../constants/Roles";
import { DBTable } from "../../constants/DBTable";

@Entity(DBTable.USERS)
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: false })
  confirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn()
  role: RoleEntity;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }

  @BeforeInsert()
  async getDefaultRole() {
    if (!this.role) {
      const defaultRole = await AppDataSource.getRepository(RoleEntity).findOneByOrFail({ name: ROLES.USER });
      this.role = defaultRole;
    }
  }
}
