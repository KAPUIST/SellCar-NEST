import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fuserService: Partial<UsersService>;
  let fauthService: Partial<AuthService>;
  beforeEach(async () => {
    fuserService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'sdfdsfdsf@sdggsdg.com',
          password: 'dfgjiopdjgo',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'dfgdg' } as User]);
      },
      // remove:() =>{},
      // update:() =>{}
    };
    fauthService = {
      // signup: ()=>{},
      // login:()=>{}
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fuserService,
        },
        {
          provide: AuthService,
          useValue: fauthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('findUser throws an error if user with given id is not found', async () => {
    fuserService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });
});
