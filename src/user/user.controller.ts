import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { LocalAuthGuard } from './local.guard';
import { IUserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: IUserService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.userService.register(registerUserDto);
    return new UserResponse(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/authenticate')
  async authenticate(
    @Body() authUserDto: AuthenticateUserDto,
    @Request() { user },
  ) {
    const payload = { sub: user.username };
    return { token: this.jwtService.sign(payload) };
  }
}
