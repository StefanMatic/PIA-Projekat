import { PackageElement } from './packagePackageElements';
import { Additional } from './packageAdditional';

export interface Package{
    _id:String,
    Packages:Array<PackageElement>,
    Additional:Array<Additional>
}