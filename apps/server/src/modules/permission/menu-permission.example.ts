/**
 * 菜单权限管理示例
 * 展示如何处理大量菜单的权限控制
 */

// 假设有100个菜单的系统
const ALL_MENUS = [
  // 系统管理菜单 (10个)
  'system_dashboard',
  'system_users',
  'system_roles',
  'system_permissions',
  'system_logs',
  'system_settings',
  'system_backup',
  'system_monitor',
  'system_audit',
  'system_reports',
  
  // 用户管理菜单 (15个)
  'user_list',
  'user_create',
  'user_edit',
  'user_delete',
  'user_profile',
  'user_permissions',
  'user_roles',
  'user_activities',
  'user_import',
  'user_export',
  'user_statistics',
  'user_approval',
  'user_notification',
  'user_preferences',
  'user_security',
  
  // 产品管理菜单 (20个)
  'product_list',
  'product_create',
  'product_edit',
  'product_delete',
  'product_categories',
  'product_brands',
  'product_inventory',
  'product_pricing',
  'product_reviews',
  'product_images',
  'product_specifications',
  'product_variants',
  'product_attributes',
  'product_coupons',
  'product_discounts',
  'product_reports',
  'product_import',
  'product_export',
  'product_bulk_actions',
  'product_approval',
  
  // 订单管理菜单 (15个)
  'order_list',
  'order_create',
  'order_edit',
  'order_delete',
  'order_details',
  'order_tracking',
  'order_payments',
  'order_shipments',
  'order_returns',
  'order_refunds',
  'order_invoices',
  'order_reports',
  'order_statistics',
  'order_notifications',
  'order_bulk_actions',
  
  // 财务管理菜单 (10个)
  'finance_dashboard',
  'finance_transactions',
  'finance_invoices',
  'finance_payments',
  'finance_refunds',
  'finance_reports',
  'finance_statements',
  'finance_taxes',
  'finance_expenses',
  'finance_revenue',
  
  // 内容管理菜单 (15个)
  'content_dashboard',
  'content_articles',
  'content_categories',
  'content_tags',
  'content_pages',
  'content_media',
  'content_comments',
  'content_reviews',
  'content_faqs',
  'content_banners',
  'content_newsletters',
  'content_forms',
  'content_menus',
  'content_themes',
  'content_seo',
  
  // 营销管理菜单 (10个)
  'marketing_dashboard',
  'marketing_campaigns',
  'marketing_emails',
  'marketing_coupons',
  'marketing_discounts',
  'marketing_affiliates',
  'marketing_referrals',
  'marketing_reports',
  'marketing_analytics',
  'marketing_promotions',
  
  // 报表分析菜单 (5个)
  'reporting_dashboard',
  'reporting_sales',
  'reporting_customers',
  'reporting_products',
  'reporting_financial',
];

/**
 * 方案一：菜单分组权限控制
 * 将100个菜单分为10个组，每组使用一个权限控制
 */
function createMenuGroups() {
  return [
    {
      groupName: 'system',
      menuCodes: [
        'system_dashboard',
        'system_users',
        'system_roles',
        'system_permissions',
        'system_logs',
        'system_settings',
        'system_backup',
        'system_monitor',
        'system_audit',
        'system_reports',
      ],
      description: '系统管理菜单组'
    },
    {
      groupName: 'user',
      menuCodes: [
        'user_list',
        'user_create',
        'user_edit',
        'user_delete',
        'user_profile',
        'user_permissions',
        'user_roles',
        'user_activities',
        'user_import',
        'user_export',
        'user_statistics',
        'user_approval',
        'user_notification',
        'user_preferences',
        'user_security',
      ],
      description: '用户管理菜单组'
    },
    {
      groupName: 'product',
      menuCodes: [
        'product_list',
        'product_create',
        'product_edit',
        'product_delete',
        'product_categories',
        'product_brands',
        'product_inventory',
        'product_pricing',
        'product_reviews',
        'product_images',
        'product_specifications',
        'product_variants',
        'product_attributes',
        'product_coupons',
        'product_discounts',
        'product_reports',
        'product_import',
        'product_export',
        'product_bulk_actions',
        'product_approval',
      ],
      description: '产品管理菜单组'
    },
    {
      groupName: 'order',
      menuCodes: [
        'order_list',
        'order_create',
        'order_edit',
        'order_delete',
        'order_details',
        'order_tracking',
        'order_payments',
        'order_shipments',
        'order_returns',
        'order_refunds',
        'order_invoices',
        'order_reports',
        'order_statistics',
        'order_notifications',
        'order_bulk_actions',
      ],
      description: '订单管理菜单组'
    },
    {
      groupName: 'finance',
      menuCodes: [
        'finance_dashboard',
        'finance_transactions',
        'finance_invoices',
        'finance_payments',
        'finance_refunds',
        'finance_reports',
        'finance_statements',
        'finance_taxes',
        'finance_expenses',
        'finance_revenue',
      ],
      description: '财务管理菜单组'
    },
    {
      groupName: 'content',
      menuCodes: [
        'content_dashboard',
        'content_articles',
        'content_categories',
        'content_tags',
        'content_pages',
        'content_media',
        'content_comments',
        'content_reviews',
        'content_faqs',
        'content_banners',
        'content_newsletters',
        'content_forms',
        'content_menus',
        'content_themes',
        'content_seo',
      ],
      description: '内容管理菜单组'
    },
    {
      groupName: 'marketing',
      menuCodes: [
        'marketing_dashboard',
        'marketing_campaigns',
        'marketing_emails',
        'marketing_coupons',
        'marketing_discounts',
        'marketing_affiliates',
        'marketing_referrals',
        'marketing_reports',
        'marketing_analytics',
        'marketing_promotions',
      ],
      description: '营销管理菜单组'
    },
    {
      groupName: 'reporting',
      menuCodes: [
        'reporting_dashboard',
        'reporting_sales',
        'reporting_customers',
        'reporting_products',
        'reporting_financial',
      ],
      description: '报表分析菜单组'
    },
    // 可以根据需要添加更多组
  ];
}

/**
 * 方案二：重要菜单特殊权限控制
 * 为一些关键菜单设置独立权限
 */
const CRITICAL_MENUS = [
  'system_permissions',  // 权限管理
  'system_users',        // 用户管理
  'system_roles',        // 角色管理
  'system_backup',       // 系统备份
  'finance_transactions', // 财务交易
  'order_refunds',       // 订单退款
];

/**
 * 方案三：混合权限模型示例
 * 结合分组和特殊权限控制
 */
async function setupHybridPermissionModel() {
  console.log('=== 设置混合权限模型 ===');
  
  // 1. 创建菜单组权限
  const menuGroups = createMenuGroups();
  console.log(`创建 ${menuGroups.length} 个菜单组`);
  
  // 2. 为关键菜单创建特殊权限
  console.log(`为 ${CRITICAL_MENUS.length} 个关键菜单创建特殊权限`);
  
  // 3. 总权限数量计算
  const totalPermissions = menuGroups.length + CRITICAL_MENUS.length;
  console.log(`总共需要 ${totalPermissions} 个权限位，远少于100个`);
  
  return {
    menuGroups,
    criticalMenus: CRITICAL_MENUS,
    totalPermissions,
  };
}

/**
 * 权限分配示例
 */
function demonstratePermissionAssignment() {
  console.log('\n=== 权限分配示例 ===');
  
  // 管理员角色 - 拥有所有权限
  const adminPermissions = [
    'MENU_GROUP_SYSTEM',
    'MENU_GROUP_USER',
    'MENU_GROUP_PRODUCT',
    'MENU_GROUP_ORDER',
    'MENU_GROUP_FINANCE',
    'MENU_GROUP_CONTENT',
    'MENU_GROUP_MARKETING',
    'MENU_GROUP_REPORTING',
    // 关键菜单特殊权限
    'MENU_SYSTEM_PERMISSIONS',
    'MENU_SYSTEM_USERS',
    'MENU_SYSTEM_ROLES',
    'MENU_SYSTEM_BACKUP',
    'MENU_FINANCE_TRANSACTIONS',
    'MENU_ORDER_REFUNDS',
  ];
  
  console.log('管理员角色权限数量:', adminPermissions.length);
  
  // 普通用户角色 - 仅拥有基本权限
  const userPermissions = [
    'MENU_GROUP_USER',      // 用户相关菜单
    'MENU_GROUP_CONTENT',   // 内容相关菜单
    'MENU_USER_PROFILE',    // 用户个人资料（特殊权限）
  ];
  
  console.log('普通用户角色权限数量:', userPermissions.length);
  
  // 财务人员角色 - 财务相关权限
  const financePermissions = [
    'MENU_GROUP_FINANCE',        // 财务管理菜单组
    'MENU_GROUP_REPORTING',      // 报表分析菜单组
    'MENU_FINANCE_TRANSACTIONS', // 财务交易（特殊权限）
  ];
  
  console.log('财务人员角色权限数量:', financePermissions.length);
}

// 运行示例
setupHybridPermissionModel();
demonstratePermissionAssignment();

export {
  ALL_MENUS,
  CRITICAL_MENUS,
  createMenuGroups,
  setupHybridPermissionModel,
  demonstratePermissionAssignment,
};