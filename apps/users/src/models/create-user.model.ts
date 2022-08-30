import { ApiProperty } from '@nestjs/swagger';

export class CreateUser {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    secondName: string;

    @ApiProperty()
    email: string;
}