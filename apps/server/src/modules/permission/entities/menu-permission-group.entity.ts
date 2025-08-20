export class MenuPermissionGroup {
  id: number;
  name: string;
  menuCodes: string; // 存储该组包含的菜单代码，用逗号分隔
  createdAt: Date;
  updatedAt: Date;
}