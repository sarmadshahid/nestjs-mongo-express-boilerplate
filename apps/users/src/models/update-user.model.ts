import { ApiProperty } from '@nestjs/swagger';

export class UpdateUser {
    @ApiProperty()
    firstName?: string;
    
    @ApiProperty()
    secondName?: string;
}