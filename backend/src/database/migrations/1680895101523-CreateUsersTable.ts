import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { DBTable } from "../../constants/DBTable";

export class CreateUsersTable1680895101523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      // Create new Table if not exists
      new Table({
        name: DBTable.USERS,
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            isUnique: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "roleId",
            type: "int",
            isNullable: false,
          },
          {
            name: "confirmed",
            type: "boolean",
            isNullable: false,
            default: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      DBTable.USERS,
      new TableForeignKey({
        columnNames: ["roleId"],
        referencedTableName: DBTable.ROLES,
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
