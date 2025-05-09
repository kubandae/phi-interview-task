import { PersonalInfo } from '../personal-info.model';

export type PersonalInfoDto = Omit<PersonalInfo, 'countryName' | 'cityName'>;
