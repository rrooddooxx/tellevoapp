import { ITabElements } from './../../components/domain/tabnav-elements.interface';

export const driverTabs: ITabElements[] = [
  {
    icon: 'home-outline',
    slug: 'home',
    text: 'Inicio',
  },
  {
    icon: 'car-sport-outline',
    slug: 'my-trips',
    text: 'Mis Viajes',
  },
  {
    icon: 'map-outline',
    slug: 'history',
    text: 'Historial',
  },
  {
    icon: 'person-circle-outline',
    slug: 'my-profile',
    text: 'Mi Perfil',
  },
  {
    icon: 'log-out-outline',
    slug: 'logout',
    text: 'Cerrar Sesión',
  },
];
