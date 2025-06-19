import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouters } from '../api/system/menu';
import type { MenuItem } from '../types/auth';
import * as AntdIcons from '@ant-design/icons';

const DynamicMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await getRouters();
        setMenuItems(response.data.data);
      } catch (error) { // 添加类型注解
        console.error('获取菜单失败:', error);
      }
    };

    fetchMenuData();
  }, []);

  interface DynamicIconProps {
    iconName: string;
    style?: React.CSSProperties;
    className?: string;
  }

  /**
   * 动态加载图标
   * @param iconName
   */
  const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, ...props }) => {
    // 动态获取图标组件
    const IconComponent = (AntdIcons as any)[iconName];

    if (!IconComponent) {
      console.warn(`Icon ${iconName} not found`);
      return <AntdIcons.QuestionCircleOutlined {...props} />; // 默认图标
    }

    return <IconComponent {...props} />;
  };

  /**
   * 递归构建菜单项
   * @param items
   */
  const buildMenuItems = (items: MenuItem[]): MenuItem[] => {
    return items.map((item) => {
      if (item.hidden) return null;

      const iconName: string = item.meta?.icon || 'QuestionOutlined';

      if (item.children && item.children.length > 0) {
        return {
          key: item.path,
          icon: <DynamicIcon iconName={iconName} />,
          label: item.name,
          children: buildMenuItems(item.children),
        };
      }

      return {
        key: item.path,
        icon: <DynamicIcon iconName={iconName} />,
        label: item.name,
      };
    }).filter(Boolean);
  };

  const handleMenuClick = ({ key }: {key: string}) => {
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