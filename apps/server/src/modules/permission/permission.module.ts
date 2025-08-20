import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { PermissionBitService } from './permission-bit.service';
import { PermissionCheckService } from './permission-check.service';
import { PermissionBitExtService } from './permission-bit-ext.service';
import { PermissionCheckExtService } from './permission-check-ext.service';
import { MenuPermissionService } from './menu-permission.service';
import { MenuPermissionAssociationService } from './menu-permission-association.service';

@Module({
  controllers: [PermissionController],
  providers: [
    PermissionService, 
    PrismaService,
    PermissionBitService,
    PermissionCheckService,
    PermissionBitExtService,
    PermissionCheckExtService,
    MenuPermissionService,
    MenuPermissionAssociationService,
  ],
  exports: [
    PermissionService,
    PermissionBitService,
    PermissionCheckService,
    PermissionBitExtService,
    PermissionCheckExtService,
    MenuPermissionService,
    MenuPermissionAssociationService,
  ],
})
export class PermissionModule {}