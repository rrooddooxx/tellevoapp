import { UserTypes } from '../../../../shared/domain/user-types.domain';
import { formatPhone, toFirstUpper } from '../../../../utils/stings.utils';

export const mappers: { [key: string]: (value: string) => string } = {
  career_name: (val) => toFirstUpper(val),
  type_name: (val) => {
    const type = Object.keys(UserTypes).find((key) => UserTypes[key] === val);
    switch (type) {
      case 'ADMIN':
        return 'Administrador';
      case 'DRIVER':
        return 'Conductor';
      case 'STUDENT':
        return 'Estudiante/Pasajero';
      default:
        return 'No Informado';
    }
  },
  user_email: (val) => val?.toLowerCase() || '',
  user_gender: (val) => {
    switch (val) {
      case 'M':
        return 'Masculino';
      case 'F':
        return 'Femenino';
      case 'NB':
        return 'No Binario';
      case 'NI':
        return 'No Informado';
      default:
        return 'No Informado';
    }
  },
  user_id: (val) => val,
  user_lastname: (val) => val,
  user_name: (val) => val,
  user_phone: (val) => formatPhone(val),
  user_ranking: (val) => `${val}/5`,
};
