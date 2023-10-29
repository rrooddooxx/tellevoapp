export class UserTypesModel {
  id: number;
  created_at: Date;
  type_name: UserTypesType;
}

enum UserTypesType {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  DRIVER = 'DRIVER',
}
