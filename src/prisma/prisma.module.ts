import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//  Makes the module & its service available to all modules in the app
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
