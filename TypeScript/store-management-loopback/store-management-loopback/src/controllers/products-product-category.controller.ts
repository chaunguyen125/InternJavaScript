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
  Products,
  ProductCategory,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsProductCategoryController {
  constructor(
    @repository(ProductsRepository) protected productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/product-categories', {
    responses: {
      '200': {
        description: 'Array of Products has many ProductCategory',
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
    return this.productsRepository.productCategories(id).find(filter);
  }

  @post('/products/{id}/product-categories', {
    responses: {
      '200': {
        description: 'Products model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductCategory)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Products.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategory, {
            title: 'NewProductCategoryInProducts',
            exclude: ['id'],
            optional: ['productsId']
          }),
        },
      },
    }) productCategory: Omit<ProductCategory, 'id'>,
  ): Promise<ProductCategory> {
    return this.productsRepository.productCategories(id).create(productCategory);
  }

  @patch('/products/{id}/product-categories', {
    responses: {
      '200': {
        description: 'Products.ProductCategory PATCH success count',
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
    return this.productsRepository.productCategories(id).patch(productCategory, where);
  }

  @del('/products/{id}/product-categories', {
    responses: {
      '200': {
        description: 'Products.ProductCategory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductCategory)) where?: Where<ProductCategory>,
  ): Promise<Count> {
    return this.productsRepository.productCategories(id).delete(where);
  }
}
