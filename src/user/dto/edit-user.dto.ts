import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  lastName?: string;
}
