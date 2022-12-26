import {inject} from '@loopback/core';
import {ANY, model, property, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  post,
  requestBody,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import { log } from 'console';
import _, { find } from 'lodash';

export async function adminInitial() {
    
}