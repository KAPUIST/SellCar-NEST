import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
describe('AuthService', () => {
  let service: AuthService;
  let fuserService: Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];
    const fuser = {
      find: (email: string) => {
        const user = users.filter((el) => el.email === email);
        return Promise.resolve(user);
      },
      create: (email: string, password: string) => {
        const userData = {
          id: Math.floor(Math.random() * 12),
          email,
          password,
        } as User;
        users.push(userData);
        return Promise.resolve(userData);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fuser,
        },
      ],
    }).compile();
    service = module.get(AuthService);
    fuserService = fuser;
  });
  it('Auth Service 인스턴스를 생성합니다.', async () => {
    expect(service).toBeDefined();
  });
  it('해싱된 패스워드를 가지고 있는 유저를 생성합니다.', async () => {
    const user = await service.signup('tested@test.com', '1231312');

    expect(user.password).not.toEqual('1231312');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
  it('이메일이 중복된 유저가 존재한다면 에러가 발생합니다.', async () => {
    await service.signup('dfg@dfg.com', 'asd');
    await expect(service.signup('dfg@dfg.com', 'asd')).rejects.toThrow(
      BadRequestException,
    );
  });
  it('존재하지 않는 유저라면 에러가 발생합니다.', async () => {
    await expect(service.login('sdfg@sdfg.com', 'sdfgsdfg')).rejects.toThrow(
      NotFoundException,
    );
  });
  it('다른 비밀번호를 사용하면 에러가 발생합니다.', async () => {
    await service.signup('zxczxc@zxczxc.com', 'password');
    await expect(
      service.login('zxczxc@zxczxc.com', 'zxczxczxc'),
    ).rejects.toThrow(BadRequestException);
  });
  it('올바른 비밀번호 사용시 유저 데이터를 리턴합니다.', async () => {
    await service.signup('sgjhgf@dhjfdhfdg.com', 'laskdjf');
    const user = await service.login('sgjhgf@dhjfdhfdg.com', 'laskdjf');
    expect(user).toBeDefined();
  });
});
