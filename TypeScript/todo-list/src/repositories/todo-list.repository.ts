import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TodoList, TodoListRelations, Todo, TodoListImage} from '../models';
import {TodoRepository} from './todo.repository';
import {TodoListImageRepository} from './todo-list-image.repository';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id,
  TodoListRelations
> {

  public readonly todos: HasManyRepositoryFactory<Todo, typeof TodoList.prototype.id>;

  public readonly todoListImage: HasOneRepositoryFactory<TodoListImage, typeof TodoList.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, 
    @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>, 
    @repository.getter('TodoListImageRepository') protected todoListImageRepositoryGetter: Getter<TodoListImageRepository>,
  ) {
    super(TodoList, dataSource);
    this.todoListImage = this.createHasOneRepositoryFactoryFor('todoListImage', todoListImageRepositoryGetter);
    this.registerInclusionResolver('todoListImage', this.todoListImage.inclusionResolver);
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter,);
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
  }
}
