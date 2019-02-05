import { Time } from '@angular/common';
import { SelectedItemsElements } from './selectedItemsElements';

export interface Offer {
    _id:String,
    username:String,
    name:String,
    description: String,
    deadlineDate: Date,
    deadlineTime: Time,
    typeOfJob:Array<SelectedItemsElements>
}