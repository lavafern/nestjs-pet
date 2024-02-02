import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUsersResponse } from './interfaces/user.intarfaces';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
        ) {}

    @Get()
    async getAll() : Promise<GetUsersResponse[]>{
        return await this.userService.getAll();
    }

    @Get(':id')
    async getDetail(@Param('id',ParseIntPipe) userId : number) {
        return await this.userService.getDetail(userId);
    }
}
