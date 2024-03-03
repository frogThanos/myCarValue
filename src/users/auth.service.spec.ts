import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

it('can create an instance of the auth service', async () => {
  // create a mock of the UsersService
  const mockUsersService: Partial<UsersService> = {
    // we only defined the functions that are used in the AuthService
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password } as User),
  };
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: mockUsersService,
      },
    ],
  }).compile();

  const service = module.get<AuthService>(AuthService);
  expect(service).toBeDefined();
});
