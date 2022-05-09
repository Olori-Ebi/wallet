import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class Customer {
  id: number;

  @IsString()
  name: string;

  @IsString()
  phone_number: string;

  @IsString()
  email: string;
}
