import { LocalAuthGuard } from '@lib/common/auth/local/local-auth.guard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    @Get()
    getHello(): string {
        return this.apiService.getHello();
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.apiService.login(req.user);
    }
}
