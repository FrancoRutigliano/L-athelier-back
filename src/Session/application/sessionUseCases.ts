import { Result } from "../../shared/infrastructure/result/result";
import { sessionLogin } from "../domain/dto/sessionLogin";
import { sessionRepository } from "../domain/sessionRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class sessionUseCase {
  constructor(private readonly sessionRepository: sessionRepository) {}

  public async login(email: string,password: string): Promise<Result<string>> {
    const sessionUser: sessionLogin = {
      email: email,
      password: password,
    };

    const userExist = await this.sessionRepository.login(sessionUser);

    if (!userExist) {
      return Result.failure("User not found", 404);
    }

    const passwordVerification = await this.verifyPasswordSecurity(
      password,
      userExist
    );

    if (!passwordVerification) {
      return Result.failure("Wrong password", 401);
    }

    const tokenJWT = process.env.SECRET_JWT;

    if (!tokenJWT) {
      return Result.failure("Oops, something went wrong", 500)
    }

    const token = jwt.sign(
      {
        id: userExist.id,
        name: userExist.name,
        role: userExist.role,
      },
      tokenJWT,
      {
        expiresIn: '2w' // Establece la expiración a 2 semanas
      }
    );

    if(token){
        return Result.success(token, 200);
    }
    return Result.failure("Oops, something went wrong", 500);
  }

  public async auth(token: string) : Promise<Result<string>> {
    
    const tokenP = token.split(' ');
    if (tokenP.length !== 2 || tokenP[0] !== 'Bearer') {
      return Result.failure("Invalid token", 401);
    }

    const tokenValue = tokenP[1];

    const secret = process.env.SECRET_JWT;

    if (!secret) {
      return Result.failure("Internal server error: Secret key not defined", 500);
    }

    try {
      await this.verifyToken(tokenValue, secret);
      

      return Result.success("Token verified", 200);
    } catch (error) {
      return Result.failure("Invalid token", 401);
    }
  }

  private async verifyPasswordSecurity(password: string,userExist: any): Promise<boolean> {
    const match = await bcrypt.compare(password, userExist.password);
    return match;
  }

  public async decodeJwt(token: string): Promise<Result<boolean>> {
    const payload: any = jwt.decode(token);
    if (payload) {
      return Result.success(payload.role, 200);
    }
    return Result.failure("Oops, something went wrong", 500);
  }

  private async verifyToken(token: string, secret: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decode) => {
        if (err) {
          reject(err);
        }
        resolve(decode);
      })
    })
  }

}
