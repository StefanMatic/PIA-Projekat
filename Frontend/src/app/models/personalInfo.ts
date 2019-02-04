import { NumberEl } from './numberElement';

export interface PersonalInfo {
    name: String,
    lastname: String,
    sex: String,
    dateOfBirth: String,
    address: String,
    country: String,
    city: String,
    postalCode: String,
    number: Array<NumberEl>,
    email: Array<String>,
    web: Array<String>
}