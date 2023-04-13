import { NextFunction, Request, Response } from "express";
import { ResponseUtil } from "../utils/Response";
import { StatusCodes } from "http-status-codes";
import { registerSchema } from "../dtos/AuthDTO";
import AppDataSource from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";
import { instanceToPlain } from "class-transformer";
import { GeneralUtils } from "../utils/GeneralUtils";
import configValues from "../configs/config";
import { confirmAccountTemplate } from "../templates/confirmAccount";
import { MailService } from "../services/mailService";

export class AuthController {
  // register user
  async register(req: Request, res: Response, next: NextFunction) {
    const registerData = req.body;

    // perform validations
    await registerSchema.validateAsync(registerData, {
      abortEarly: false,
      errors: {
        label: "key",
        wrap: { label: false },
      },
    });

    const { email, password } = registerData;
    const userRepo = AppDataSource.getRepository(UserEntity);
    const user = userRepo.create({
      email,
      password,
    });
    await userRepo.save(user);

    const { accessToken } = GeneralUtils.generateConfirmationToken(user);
    const verificationUrl = configValues.ACCOUNT_CONFIRMATION_URL + "/" + accessToken;

    // Create Email
    const { html } = confirmAccountTemplate(user.email, verificationUrl);
    const senderEmail = configValues.MAIL_DEFAULT_SENDER;
    const userEmail = user.email;
    const subject = "Confirm Your Account";

    MailService.sendEmail({
      from: senderEmail,
      to: userEmail,
      html: html,
      subject: subject,
    });

    const userResponse = instanceToPlain(user);

    return ResponseUtil.sendResponse(res, "User has been registered successfully", userResponse, StatusCodes.CREATED);
  }
}
