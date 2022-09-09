import { AuthService } from '@lib/common/auth/auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
    constructor(private readonly authService: AuthService) {}

    getHello(): string {
        return 'Hello world from api!';
    }

    login(user: any) {
        return this.authService.login(user);
    }
}
