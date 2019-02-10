import { PackageElement } from './packagePackageElements';
import { Additional } from './packageAdditional';

export interface Package{
    Packages:Array<PackageElement>,
    Additional:Array<Additional>
}