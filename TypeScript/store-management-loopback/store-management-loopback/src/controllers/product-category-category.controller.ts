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
  Category,
} from '../models';
import {ProductCategoryRepository} from '../repositories';

export class ProductCategoryCategoryController {
  constructor(
    @repository(ProductCategoryRepository)
    public productCategoryRepository: ProductCategoryRepository,
  ) { }

  @get('/product-categories/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to ProductCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.number('id') id: typeof ProductCategory.prototype.id,
  ): Promise<Category> {
    return this.productCategoryRepository.category(id);
  }
}
