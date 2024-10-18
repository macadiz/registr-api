import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async userLogin(groupId: number, username: string, password: string) {
    return this.userRepository.validateUser(groupId, username, password);
  }

  async createUser(
    groupId: number,
    name: string,
    username: string,
    password: string,
    email: string,
  ) {
    await this.userRepository.createUser(
      groupId,
      name,
      username,
      password,
      email,
    );
  }
}
