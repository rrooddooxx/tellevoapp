import { Injectable } from '@angular/core';
import { Builder } from 'builder-pattern';
import { UserProfile } from '../../../providers/db-api/model/users.model';
import { UserTypes } from '../../../shared/domain/user-types.domain';
import { UserProfileDomain } from '../../../stores/shared/domain/user-profile.domain';

@Injectable()
export class AuthServiceMapper {
  private mapUserType(type: string): UserTypes {
    return UserTypes[type as keyof typeof UserTypes];
  }
  public mapUserTypeIntoStore(user: UserProfile) {
    return Builder<UserProfileDomain>()
      .user_id(user.user_id)
      .user_name(user.user_name)
      .user_lastname(user.user_lastname)
      .user_email(user.user_email)
      .user_gender(user.user_gender)
      .user_phone(user.user_phone)
      .user_ranking(user.user_ranking)
      .career_name(user.career_name)
      .type_name(this.mapUserType(user.type_name))
      .build();
  }
}
