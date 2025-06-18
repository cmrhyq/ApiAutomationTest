import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouters } from '../api/system/menu';
import type { MenuItem } from '../types/auth';
import * as Icons from '@ant-design/icons';

const DynamicMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await getRouters();
        setMenuItems(response.data);
      } catch (error: any) { // 添加类型注解
        console.error('获取菜单失败:', error);
      }
    };

    fetchMenuData();
  }, []);

  // 动态加载图标
  const getIcon = (iconName: string) => {
    if (!iconName) return null;
    const Icon = Icons[iconName];
    return Icon ? <Icon /> : null;
  };

  // 递归构建菜单项
  const buildMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      if (item.hidden) return null;

      if (item.children && item.children.length > 0) {
        return {
          key: item.path,
          icon: getIcon(item.icon),
          label: item.name,
          children: buildMenuItems(item.children),
        };
      }

      return {
        key: item.path,
        icon: getIcon(item.icon),
        label: item.name,
      };
    }).filter(Boolean);
  };

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      defaultOpenKeys={['/' + location.pathname.split('/')[1]]}
      items={buildMenuItems(menuItems)}
      onClick={handleMenuClick}
    />
  );
};

export default DynamicMenu;