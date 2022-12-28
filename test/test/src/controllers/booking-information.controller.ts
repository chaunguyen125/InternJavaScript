import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Bookinginformation} from '../models';
import {BookinginformationRepository} from '../repositories';

export class BookingInformationController {
  constructor(
    @repository(BookinginformationRepository)
    public bookinginformationRepository : BookinginformationRepository,
  ) {}

  @post('/bookinginformations')
  @response(200, {
    description: 'Bookinginformation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bookinginformation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bookinginformation, {
            title: 'NewBookinginformation',
            exclude: ['id'],
          }),
        },
      },
    })
    bookinginformation: Omit<Bookinginformation, 'id'>,
  ): Promise<Bookinginformation> {
    return this.bookinginformationRepository.create(bookinginformation);
  }

  @get('/bookinginformations/count')
  @response(200, {
    description: 'Bookinginformation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bookinginformation) where?: Where<Bookinginformation>,
  ): Promise<Count> {
    return this.bookinginformationRepository.count(where);
  }

  @get('/bookinginformations')
  @response(200, {
    description: 'Array of Bookinginformation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bookinginformation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bookinginformation) filter?: Filter<Bookinginformation>,
  ): Promise<Bookinginformation[]> {
    return this.bookinginformationRepository.find(filter);
  }

  @patch('/bookinginformations')
  @response(200, {
    description: 'Bookinginformation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bookinginformation, {partial: true}),
        },
      },
    })
    bookinginformation: Bookinginformation,
    @param.where(Bookinginformation) where?: Where<Bookinginformation>,
  ): Promise<Count> {
    return this.bookinginformationRepository.updateAll(bookinginformation, where);
  }

  @get('/bookinginformations/{id}')
  @response(200, {
    description: 'Bookinginformation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bookinginformation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Bookinginformation, {exclude: 'where'}) filter?: FilterExcludingWhere<Bookinginformation>
  ): Promise<Bookinginformation> {
    return this.bookinginformationRepository.findById(id, filter);
  }

  @patch('/bookinginformations/{id}')
  @response(204, {
    description: 'Bookinginformation PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bookinginformation, {partial: true}),
        },
      },
    })
    bookinginformation: Bookinginformation,
  ): Promise<void> {
    await this.bookinginformationRepository.updateById(id, bookinginformation);
  }

  @put('/bookinginformations/{id}')
  @response(204, {
    description: 'Bookinginformation PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bookinginformation: Bookinginformation,
  ): Promise<void> {
    await this.bookinginformationRepository.replaceById(id, bookinginformation);
  }

  @del('/bookinginformations/{id}')
  @response(204, {
    description: 'Bookinginformation DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bookinginformationRepository.deleteById(id);
  }
}
