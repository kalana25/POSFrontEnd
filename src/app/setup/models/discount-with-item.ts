import { Discount } from './discount';
import { Product } from './product';

export class DiscountWithItem extends Discount {
    item:Product;
}