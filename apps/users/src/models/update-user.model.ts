import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUser {
  @ApiPropertyOptional({
    type: String,
  })
  firstName?: string;

  @ApiPropertyOptional({
    type: String,
  })
  secondName?: string;
}
