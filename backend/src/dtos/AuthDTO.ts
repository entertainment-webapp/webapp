import Joi from "joi";
import { isUnique } from "../validators/isUniqueValidator";
import AppDataSource from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";

const userRepo = AppDataSource.getRepository(UserEntity);

// Registration schema
export const registerSchema = Joi.object({
  email: Joi.string().email().required().external(isUnique(userRepo, "email")),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({ "string.pattern.base": "Password must be between 8 and 30 characters long" }),
  repeat_password: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Passwords do not match", "any.required": "Passwords do not match" }),
});

// login schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({ "string.pattern.base": "Password must be between 8 and 30 characters long" }),
});
