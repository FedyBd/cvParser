import {Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import {LoginUserDto} from "./dto/login.dto";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private jwtService: JwtService,
  ) {}

  async createUser(userData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({ where: { email: loginUserDto.email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const access_token=this.jwtService.sign(payload);
    return {
      userType:user.usertype,
      message:'Logged in successfully',
      access_token: access_token,
    };
  }

  async findUser(request) {
    const cookies = request.cookies;
    const accessToken = cookies?.access_token;

    if (!accessToken) {
      throw new UnauthorizedException('No access token found');
    }

    try {
      // Decode the access token
      const decodedToken = this.jwtService.decode(accessToken) as any;

      // Extract the user ID from the token (usually stored in 'sub')
      const userId = decodedToken.sub;

      if (!userId) {
        throw new UnauthorizedException('Invalid token');
      }

      // Retrieve the user from the database without the password
      const user = await this.userRepository.findOne({where:{id:userId}});

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      // Exclude the password from the user object using destructuring
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error) {
      throw new UnauthorizedException('Could not decode access token');
    }
  }

  /***********************************************/

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


}
