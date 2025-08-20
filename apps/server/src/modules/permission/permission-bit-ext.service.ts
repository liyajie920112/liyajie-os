import { Injectable } from '@nestjs/common';

/**
 * 扩展二进制权限控制服务
 * 支持超过64个权限位的管理
 */
@Injectable()
export class PermissionBitExtService {
  // 每个字段存储的权限位数
  private readonly BITS_PER_FIELD = 64n;

  /**
   * 计算权限位所在的字段索引和位偏移
   * @param bitPosition 权限位位置
   * @returns 字段索引和位偏移
   */
  private calculateFieldAndOffset(bitPosition: number): {
    fieldIndex: number;
    bitOffset: bigint;
  } {
    const pos = BigInt(bitPosition);
    const fieldIndex = Number(pos / this.BITS_PER_FIELD);
    const bitOffset = pos % this.BITS_PER_FIELD;
    return { fieldIndex, bitOffset };
  }

  /**
   * 授予权限
   * @param permissions 权限字段数组
   * @param bitPosition 权限位位置
   * @returns 更新后的权限字段数组
   */
  grantPermission(permissions: bigint[], bitPosition: number): bigint[] {
    const { fieldIndex, bitOffset } = this.calculateFieldAndOffset(bitPosition);

    // 确保权限数组足够长
    while (permissions.length <= fieldIndex) {
      permissions.push(0n);
    }

    // 设置对应位为1
    permissions[fieldIndex] = permissions[fieldIndex] | (1n << bitOffset);

    return [...permissions];
  }

  /**
   * 撤销权限
   * @param permissions 权限字段数组
   * @param bitPosition 权限位位置
   * @returns 更新后的权限字段数组
   */
  revokePermission(permissions: bigint[], bitPosition: number): bigint[] {
    const { fieldIndex, bitOffset } = this.calculateFieldAndOffset(bitPosition);

    // 如果字段不存在，直接返回
    if (fieldIndex >= permissions.length) {
      return [...permissions];
    }

    // 设置对应位为0
    permissions[fieldIndex] = permissions[fieldIndex] & ~(1n << bitOffset);

    return [...permissions];
  }

  /**
   * 检查是否具有特定权限
   * @param permissions 权限字段数组
   * @param bitPosition 权限位位置
   * @returns 是否具有该权限
   */
  hasPermission(permissions: bigint[], bitPosition: number): boolean {
    const { fieldIndex, bitOffset } = this.calculateFieldAndOffset(bitPosition);

    // 如果字段不存在，说明没有该权限
    if (fieldIndex >= permissions.length) {
      return false;
    }

    // 检查对应位是否为1
    return (permissions[fieldIndex] & (1n << bitOffset)) !== 0n;
  }

  /**
   * 合并权限
   * @param permissions1 权限字段数组1
   * @param permissions2 权限字段数组2
   * @returns 合并后的权限字段数组
   */
  combinePermissions(permissions1: bigint[], permissions2: bigint[]): bigint[] {
    const maxLength = Math.max(permissions1.length, permissions2.length);
    const result: bigint[] = new Array(maxLength).fill(0n);

    for (let i = 0; i < maxLength; i++) {
      const field1 = i < permissions1.length ? permissions1[i] : 0n;
      const field2 = i < permissions2.length ? permissions2[i] : 0n;
      result[i] = field1 | field2;
    }

    return result;
  }

  /**
   * 获取权限位图的字符串表示
   * @param permissions 权限字段数组
   * @returns 二进制字符串表示
   */
  getPermissionBits(permissions: bigint[]): string {
    // 从最高位字段开始构建字符串
    const binaryStrings: string[] = [];

    for (let i = permissions.length - 1; i >= 0; i--) {
      let binary = permissions[i].toString(2);

      // 补齐到64位（除了最高位字段）
      if (i < permissions.length - 1) {
        binary = binary.padStart(Number(this.BITS_PER_FIELD), '0');
      }

      binaryStrings.push(binary);
    }

    return binaryStrings.join('');
  }

  /**
   * 根据权限位列表创建权限值
   * @param bitPositions 权限位位置列表
   * @returns 权限字段数组
   */
  createPermissionsFromBits(bitPositions: number[]): bigint[] {
    let permissions: bigint[] = [];
    for (const position of bitPositions) {
      permissions = this.grantPermission(permissions, position);
    }
    return permissions;
  }

  /**
   * 将权限字段数组转换为字符串存储
   * @param permissions 权限字段数组
   * @returns 字符串表示
   */
  permissionsToString(permissions: bigint[]): string {
    return permissions.join(',');
  }

  /**
   * 从字符串还原权限字段数组
   * @param permissionString 字符串表示
   * @returns 权限字段数组
   */
  stringToPermissions(permissionString: string): bigint[] {
    if (!permissionString) return [];
    return permissionString.split(',').map(BigInt);
  }
}
