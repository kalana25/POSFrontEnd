import { BaseEntity } from '../../core/base-entity'

export interface IPickable<T extends BaseEntity> {
    getItemWithQuantity():T
}