import { Injectable,BadRequestException,NotFoundException } from '@nestjs/common';
import { randomBytes,scrypt as _crypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const crypt = promisify(_crypt);

@Injectable()
export class AuthService{
constructor(private usersService: UsersService){}


async signup(email:string,password:string){
    const duplicatedUser = await this.usersService.find(email)
    if(duplicatedUser.length){
        throw new BadRequestException('email in use')
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await crypt(password,salt,32)) as Buffer;

    const result = salt + '.' + hash.toString('hex')

    const user = await this.usersService.create(email,result);
    return user


}


 async login(email:string,password:string){
    const [user] = await this.usersService.find(email)
    if(!user){
        throw new NotFoundException('not found user')
    }

    const [salt,dbhash] = user.password.split('.')

    const hash = (await crypt(password,salt,32)) as Buffer;
    if(dbhash !== hash.toString('hex')){
        throw new BadRequestException('wrong password')
    } 
    return user;
}
}
