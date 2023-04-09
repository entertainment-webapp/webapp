import AppDataSource from "../database/data-source";
import { ROLES } from "../constants/Roles";
import { RoleEntity } from "../database/entities/RoleEntity";

AppDataSource.initialize()
  .then(async () => {
    const roleRepo = AppDataSource.getRepository(RoleEntity);
    await roleRepo.insert([
      {
        name: ROLES.ADMIN,
      },
      {
        name: ROLES.USER,
      },
    ]);

    // Close the connection
    await AppDataSource.destroy();
  })
  .catch((err) => {
    console.log(err, "Error occurred");
  });
