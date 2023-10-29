import { Builder } from 'builder-pattern';
import { CareerModel } from '../../../providers/db-api/model/career.model';
import { UserTypes } from '../../../shared/domain/user-types.domain';
import { ICareers } from '../domain/careers.domain';
import { UserTypeRegistration } from '../domain/user-register-form.domain';

export class RegisterMappers {
  private mapEachCareerToDomain(career: CareerModel) {
    return Builder<ICareers>()
      .careerId(career.id)
      .careerName(career.career_name)
      .build();
  }
  public mapCareerModelToDomain(careers: CareerModel[]) {
    return careers.map((career) => this.mapEachCareerToDomain(career));
  }

  mapUserTypeValueToTypeID(userTypeID: number) {
    const dictionary = {
      [UserTypeRegistration.STUDENT]: 4,
      [UserTypeRegistration.DRIVER]: 5,
    };
    return dictionary[userTypeID];
  }

  mapUserTypeValueToDomain(userTypeID: string) {
    const dictionary = {
      [UserTypeRegistration.STUDENT.valueOf().toString()]: UserTypes.STUDENT,
      [UserTypeRegistration.DRIVER.valueOf().toString()]: UserTypes.DRIVER,
    };
    return dictionary[userTypeID];
  }
}
