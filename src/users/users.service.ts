import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // We need to create an instance of the User Entity
    // before we save it using the repo. If we save it as
    // a plain object, typeorm hooks defined in the User Entity
    // won't be executed.
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    try {
      const user = await this.findOne(id);
      Object.assign(user, attrs);
      return this.repo.save(user);
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      return this.repo.remove(user);
    } catch (e) {
      throw new Error(e);
    }
  }
}
