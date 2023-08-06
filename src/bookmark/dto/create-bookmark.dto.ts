import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  link: string;
}
