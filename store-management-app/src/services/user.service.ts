// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {UserService} from '@loopback/authentication';
import {ANY, repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcryptjs';
import {Users, UsersWithRelations} from '../models';
import {UsersRepository, RolemappingRepository, RolesRepository} from '../repositories';
import _ from 'lodash'
/**
 * A pre-defined type for user credentials. It assumes a user logs in
 * using the email and password. You can modify it if your app has different credential fields
 */
export type Credentials = {
  user_name: string;
  password: string;
};

export class MyUserService implements UserService<Users, Credentials> {
  constructor(
    @repository(UsersRepository) public userRepository: UsersRepository,
    @repository(RolemappingRepository) public roleMappingRepository : RolemappingRepository,
    @repository(RolesRepository) public rolesRepository : RolesRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<any> {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.userRepository.findOne({
      where: {user_name: credentials.user_name},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.userRepository.findById(
      foundUser.id,
    );
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    console.log("found user: ", foundUser);
    

    console.log(foundUser.id);
    const roleIds = await this.roleMappingRepository.find({where:{user_id: foundUser.id}});
    console.log("Rolse ids: ",roleIds);
    
    const ids =  _.map(roleIds, roleId => roleId.role_id);
    console.log("ids: ",ids);
    
    const rolesUser = await this.rolesRepository.find({where: {id: {inq:ids}}});
    console.log("role of user: ",rolesUser);

    const roleNames = _.map(rolesUser, roleUser => roleUser.name);
    console.log("Role name: ", roleNames);
    
    
    

    return [foundUser, roleNames];
  }

  convertToUserProfile(userInformation : any): UserProfile {
    
    // this.roleMappingRepository.find({where: {user_id: user.id}})
    // // this.roleMappingRepository.find({
    // //   include : [{relation: 'rolemappings',
    // //               scope: 
    // //                 {fields: {name:true}}
    // //               }]
    // //             })
    // .then((data:any)=> {
    //   // let roleid = data[0].Rolemapping.role_id
    //   //return data
    //   console.log("data: ", data);
    //   const ids = _.map(data, item => item.role_id)
    //   console.log("role_ids: ", ids);

    //   this.rolesRepository.find({where: {id: { inq: ids} } })
    //     .then((roles:any) => {
    //       console.log("roles: ", roles);
    //       const roleNames = _.map(roles, role => role.name)
    //       console.log('===roleName: ', roleNames)
    //       console.log("1");
          
    //       return {
    //         [securityId]: user.id.toString(),
    //         user_name: user.user_name,
    //         id: user.id,
    //         roles: roleNames,
    //       };
    //     })
      
    // })
    // .catch((err) => {
    //   console.log('=====>error', err)
    // })
    return {
      [securityId]: userInformation[0].id.toString(),
      user_name: userInformation[0].user_name,
      id: userInformation[0].id,
      roles: userInformation[1],
    };
    
  }

  //function to find user by id
  async findUserById(id: number): Promise<Users & UsersWithRelations> {
    const userNotfound = 'invalid User';
    const foundUser = await this.userRepository.findOne({
      where: {id: id},
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(userNotfound);
    }
    return foundUser;
  }
}