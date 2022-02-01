import { PartialType } from '@nestjs/mapped-types';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriesDTO {
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}

export class UpdateCategoriesDTO extends PartialType(CreateCategoriesDTO) {}

interface Event {
  name: string;
  operation: string;
  valor: number;
}
