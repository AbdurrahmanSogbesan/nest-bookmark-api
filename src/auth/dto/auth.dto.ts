import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}
