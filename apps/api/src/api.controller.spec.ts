import { Test, TestingModule } from '@nestjs/testing';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';

describe('ApiController', () => {
    let apiController: ApiController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ApiController],
            providers: [ApiService],
        }).compile();

        apiController = app.get<ApiController>(ApiController);
    });

    describe('root', () => {
        it('should return "Hello world from api!"', () => {
            expect(apiController.getHello()).toBe('Hello world from api!');
        });
    });
});
