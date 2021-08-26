import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { Role } from '../../domain/model/vos/role.vo';

@Table({ tableName: 'users' })
export class UserModel extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM('ADMIN', 'PUBLISHER'),
    allowNull: false,
  })
  role: Role;
}
