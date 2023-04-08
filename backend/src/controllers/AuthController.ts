import { NextFunction, Request, Response, response } from "express";
import { ResponseUtil } from "../utils/Response";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { loginSchema, registerSchema } from "../dtos/AuthDTO";
import AppDataSource from "../database/data-source";
import { UserEntity } from "../database/entities/UserEntity";
import { instanceToPlain } from "class-transformer";
import { GeneralUtils } from "../utils/GeneralUtils";
import configValues from "../configs/config";
import { confirmAccountTemplate } from "../templates/confirmAccount";
import { MailService } from "../services/mailService";
import { TokenType } from "../constants/TokenType";
import { compare } from "bcryptjs";

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

    return ResponseUtil.sendResponse(
      res,
      "Registration successful. Please check your email to confirm your account",
      userResponse,
      StatusCodes.CREATED
    );
  }

  // confirm account
  async confirmAccount(req: Request, res: Response, next: NextFunction) {
    // Get the token from the request
    const { token } = req.params;

    const payload = GeneralUtils.validateJWT(token);

    if (!payload) {
      return ResponseUtil.sendError(
        res,
        "Invalid or expired Token",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }

    // Check for the token type
    if (payload["tokenType"] !== TokenType.CONFIRM_ACCOUNT || !payload["id"]) {
      return ResponseUtil.sendError(res, "Invalid Request", StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
    }

    const userRepo = AppDataSource.getRepository(UserEntity);
    const user = await userRepo.findOneByOrFail({
      id: payload["id"],
    });

    if (user.confirmed) {
      return ResponseUtil.sendResponse(res, "User is already verified", null);
    }

    // confirm the account
    user.confirmed = true;
    await userRepo.save(user);

    return ResponseUtil.sendResponse(res, "Account confirmed successfully", null);
  }

  // login user
  async login(req: Request, res: Response, next: NextFunction) {
    const loginData = req.body;

    // validate loginData
    await loginSchema.validateAsync(loginData, {
      abortEarly: false,
      errors: {
        label: "key",
        wrap: { label: false },
      },
    });

    const userRepo = AppDataSource.getRepository(UserEntity);
    const user = await userRepo.findOneByOrFail({
      email: loginData.email,
    });
    // Check for valid password
    const isValidPassword = await compare(loginData.password, user.password);

    if (!isValidPassword) {
      return ResponseUtil.sendError(
        res,
        "Invalid credentials. Try again",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }

    if (!user.confirmed) {
      return ResponseUtil.sendError(
        res,
        "Please confirm your account and try again",
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST
      );
    }

    const token = GeneralUtils.generateAuthToken(user);

    const userResponse = instanceToPlain(user);
    const response = {
      ...userResponse,
      ...token,
    };

    return ResponseUtil.sendResponse(res, "User logged in successfully", response);
  }
}
