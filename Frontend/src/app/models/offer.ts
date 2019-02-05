import { Time } from '@angular/common';
import { SelectedItemsElements } from './selectedItemsElements';

export interface Offer {
    username:String,
    name:String,
    description: String,
    deadlineDate: Date,
    deadlineTime: Time,
    typeOfJob:Array<SelectedItemsElements>
}