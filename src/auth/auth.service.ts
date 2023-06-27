import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// Handles business logic
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // Generate password
    const hash = await argon.hash(dto.password);

    try {
      // Save new user in db
      const user = await this.prisma.user.create({
        data: { email: dto.email, hash },
        // Will only return these fields
        // select: { id: true, email: true, createdAt: true },
      });

      // Returns jwt token
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Prisma error code for duplicates of unique field
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials Taken.');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    // If no user, throw exception
    if (!user) throw new ForbiddenException('Credentials Incorrect.');

    // Compare passwords
    const pwMatches = await argon.verify(user.hash, dto.password);

    // If password incorrect, throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials Incorrect.');

    // Returns jwt token
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    // Creates jwt token
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }
}
