import { sessionLogin } from "../domain/dto/sessionLogin";
import { sessionRepository } from "../domain/sessionRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class sessionUseCase {
  constructor(private readonly sessionRepository: sessionRepository) {}

  public async login(email: string,password: string): Promise<string | null> {
    const sessionUser: sessionLogin = {
      email: email,
      password: password,
    };

    const userExist = await this.sessionRepository.login(sessionUser);

    if (!userExist) {
      return null;
    }

    const passwordVerification = await this.verifyPasswordSecurity(
      password,
      userExist
    );

    if (!passwordVerification) {
      return null;
    }

    const tokenJWT = process.env.SECRET_JWT;

    if (!tokenJWT) {
        throw new Error('Secret JWT key is not defined');
    }

    const token = jwt.sign(
      {
        id: userExist.id,
        name: userExist.name,
        role: userExist.role,
      },
      tokenJWT
    );

    if(token){
        return token
    }
    return null;
  }






  private async verifyPasswordSecurity(password: string,userExist: any): Promise<boolean> {
    const match = await bcrypt.compare(password, userExist.password);
    return match;
  }


}
