import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Category,
  ProductCategory,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryProductCategoryController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/product-categories', {
    responses: {
      '200': {
        description: 'Array of Category has many ProductCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductCategory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProductCategory>,
  ): Promise<ProductCategory[]> {
    return this.categoryRepository.productCategories(id).find(filter);
  }

  @post('/categories/{id}/product-categories', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductCategory)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategory, {
            title: 'NewProductCategoryInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) productCategory: Omit<ProductCategory, 'id'>,
  ): Promise<ProductCategory> {
    return this.categoryRepository.productCategories(id).create(productCategory);
  }

  @patch('/categories/{id}/product-categories', {
    responses: {
      '200': {
        description: 'Category.ProductCategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategory, {partial: true}),
        },
      },
    })
    productCategory: Partial<ProductCategory>,
    @param.query.object('where', getWhereSchemaFor(ProductCategory)) where?: Where<ProductCategory>,
  ): Promise<Count> {
    return this.categoryRepository.productCategories(id).patch(productCategory, where);
  }

  @del('/categories/{id}/product-categories', {
    responses: {
      '200': {
        description: 'Category.ProductCategory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductCategory)) where?: Where<ProductCategory>,
  ): Promise<Count> {
    return this.categoryRepository.productCategories(id).delete(where);
  }
}
