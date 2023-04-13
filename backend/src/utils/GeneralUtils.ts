import jwt from "jsonwebtoken";
import { UserEntity } from "../database/entities/UserEntity";
import { TokenType } from "../constants/TokenType";
import configValues from "../configs/config";

export class GeneralUtils {

  // Generate JWT Token
  static generateJWT(payload: object, options?: object) {
    // GET SECRET KEY
    const secretKey = configValues.SECRET_KEY;
    const defaultOptions = {
      expiresIn: configValues.JWT_TOKEN_EXPIRATION,
    };

    return jwt.sign(payload, secretKey, Object.assign(defaultOptions, options));
  }

  // Generate confirmation Token
  static generateConfirmationToken(user: UserEntity) {
    const accessToken = this.generateJWT({
      id: user.id,
      tokenType: TokenType.CONFIRM_ACCOUNT,
    });
    return {
      accessToken: accessToken,
    };
  }
}
