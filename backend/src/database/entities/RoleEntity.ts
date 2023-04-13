import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DBTable } from "../../constants/DBTable";
import { ROLES } from "../../constants/Roles";
import { UserEntity } from "./UserEntity";

@Entity(DBTable.ROLES)
export class RoleEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true, nullable: false, default: ROLES.USER })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
