import { Builder } from 'builder-pattern';
import { INewUser } from '../../../modules/domain/new-user.domain';
import {
  UserTypes,
  UserTypesIDs,
} from '../../../shared/domain/user-types.domain';
import { AddUserRequest } from '../domain/users.domain';

export class UsersRepositoryMappers {
  private mapUserTypeToTypeID(type: UserTypes) {
    console.log(
      '🚀 ~ file: users.mappers.ts:11 ~ UsersRepositoryMappers ~ mapUserTypeToTypeID ~ type:',
      type
    );

    switch (type) {
      case UserTypes.STUDENT.valueOf():
        return UserTypesIDs.STUDENT.valueOf();
      case UserTypes.DRIVER.valueOf():
        return UserTypesIDs.DRIVER.valueOf();
      case UserTypes.ADMIN.valueOf():
        return UserTypesIDs.ADMIN.valueOf();
      default:
        return UserTypesIDs.NOT_FOUND.valueOf();
    }
  }

  mapNewUserDomainToModel(newUser: INewUser): AddUserRequest {
    console.log(
      '🚀 ~ file: users.mappers.ts:24 ~ UsersRepositoryMappers ~ mapNewUserDomainToModel ~ newUser:',
      newUser
    );

    return Builder<AddUserRequest>()
      .user_name(newUser.user_name)
      .user_lastname(newUser.user_lastname)
      .user_rut(newUser.user_rut)
      .user_pwd(newUser.user_pwd)
      .user_email(newUser.user_email)
      .user_phone(Number(newUser.user_phone))
      .user_career(newUser.user_career)
      .user_ranking(newUser.user_ranking)
      .user_type(this.mapUserTypeToTypeID(newUser.user_type))
      .build();
  }
}
