import { Measurement } from './measurement';
import { BaseUnit } from './base-unit';


export class MeasurementWithBaseUnit extends Measurement {
    baseUnit:BaseUnit;
}