import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Products,
  Stores,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsStoresController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/stores', {
    responses: {
      '200': {
        description: 'Stores belonging to Products',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Stores)},
          },
        },
      },
    },
  })
  async getStores(
    @param.path.number('id') id: typeof Products.prototype.id,
  ): Promise<Stores> {
    return this.productsRepository.stores(id);
  }
}
