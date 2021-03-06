import { RoleVO } from './../../domain/model/vos/role.vo';
import { User, UserType } from '../../domain/model/entities/user.entity';
import { EmailVO } from '../../domain/model/vos/email.vo';
import { IdVO } from '../../domain/model/vos/id.vo';
import { PasswordVO } from '../../domain/model/vos/password.vo';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserModel } from './user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserRepositoryPG implements UserRepository {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  async getByEmail(email: EmailVO): Promise<User | null> {
    const userDB: any = await this.userModel.findOne({
      where: {
        email: email.value,
      },
    });

    if (!userDB) {
      return null;
    }

    const userData: UserType = {
      id: IdVO.createWithUUID(userDB.id),
      email: EmailVO.create(userDB.email),
      password: PasswordVO.create(userDB.password),
      role: RoleVO.create(userDB.role),
    };

    return new User(userData);
  }

  async update(user: User): Promise<void> {
    await this.userModel.update(
      {
        id: user.id.value,
        email: user.email.value,
        password: user.password.value,
      },
      {
        where: {
          id: user.id.value,
        },
      },
    );
  }

  async getAll(): Promise<User[]> {
    const users = await this.userModel.findAll({});
    return users.map((ofModel: any) => {
      const userData: UserType = {
        id: IdVO.createWithUUID(ofModel.id),
        password: PasswordVO.create(ofModel.password),
        email: EmailVO.create(ofModel.email),
        role: RoleVO.create(ofModel.role),
      };
      return new User(userData);
    });
  }

  async getById(id: IdVO): Promise<User | null> {
    const userDB: any = await this.userModel.findOne({
      where: {
        id: id.value,
      },
    });

    if (!userDB) {
      return null;
    }

    const userData: UserType = {
      id: IdVO.createWithUUID(userDB.id),
      email: EmailVO.create(userDB.email),
      password: PasswordVO.create(userDB.password),
      role: RoleVO.create(userDB.role),
    };

    return new User(userData);
  }

  async save(user: User): Promise<void> {
    const id = user.id.value;
    const email = user.email.value;
    const password = user.password.value;
    const role = user.role.value;

    this.userModel.create({ id, email, password, role });

    //const userModel = new UserModel({ id, email, password, role });
    //await userModel.save();
  }

  async delete(id: IdVO): Promise<void> {
    await this.userModel.destroy({
      where: {
        id: id.value,
      },
    });
  }

  async deleteAll(): Promise<void> {
    await this.userModel.destroy({
      where: {},
      truncate: true,
    });
  }
}
