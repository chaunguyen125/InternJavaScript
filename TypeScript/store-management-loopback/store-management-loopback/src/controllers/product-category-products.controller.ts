import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductCategory,
  Products,
} from '../models';
import {ProductCategoryRepository} from '../repositories';

export class ProductCategoryProductsController {
  constructor(
    @repository(ProductCategoryRepository)
    public productCategoryRepository: ProductCategoryRepository,
  ) { }

  @get('/product-categories/{id}/products', {
    responses: {
      '200': {
        description: 'Products belonging to ProductCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async getProducts(
    @param.path.number('id') id: typeof ProductCategory.prototype.id,
  ): Promise<Products> {
    return this.productCategoryRepository.products(id);
  }
}
