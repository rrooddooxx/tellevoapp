import { ITabElements } from './../../components/domain/tabnav-elements.interface';

export const driverTabs: ITabElements[] = [
  {
    icon: 'home-outline',
    slug: 'home',
    text: 'Inicio',
  },
  {
    icon: 'car-sport-outline',
    slug: 'trips',
    text: 'Mis Viajes',
  },
  {
    icon: 'map-outline',
    slug: 'find-trip',
    text: 'Historial',
  },
  {
    icon: 'person-circle-outline',
    slug: 'my-profile',
    text: 'Mi Perfil',
  },
];
