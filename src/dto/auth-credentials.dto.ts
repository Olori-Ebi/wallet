import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  first_name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  last_name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
