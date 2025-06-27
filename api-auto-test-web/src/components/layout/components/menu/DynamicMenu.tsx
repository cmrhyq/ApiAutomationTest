import React, {useEffect, useState} from 'react';
import { Menu } from 'antd';
import {useNavigate, useLocation} from 'react-router-dom';
import { getRouters } from '../../../../api/system/menu.ts';
import type {DynamicIconProps, MenuItem} from './model.ts';
import * as AntdIcons from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {setTab} from "../../../../store/reducers/tabs/tabsSlice";
import type {RootState} from "../../../../store";

const DynamicMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {tabs} = useSelector((state: RootState) => state.tabs);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await getRouters();
      const data = response.data.data
      setMenuItems(data);
    } catch (error) { // 添加类型注解
      console.error('获取菜单失败:', error);
      navigate("/login")
    }
  };

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
  const buildMenuItems = (items: MenuItem[]): (null | {
    key: string;
    icon: React.JSX.Element;
    label: string | undefined;
    children: MenuItem[]
  } | { key: string; icon: React.JSX.Element; label: string | undefined })[] => {
    return items.map((item) => {
      if (!item || !item.path) return null;

      const iconName: string = item.meta?.icon || 'QuestionOutlined';

      if (item.children && item.children.length > 0) {
        return {
          key: item.path,
          icon: <DynamicIcon iconName={iconName} />,
          label: item.meta?.title,
          children: buildMenuItems(item.children),
        };
      }

      return {
        key: item.path.replace("/", ""),
        icon: <DynamicIcon iconName={iconName} />,
        label: item.meta?.title,
      };
    }).filter(Boolean);
  };

  const handleMenuClick = ({ key }: {key: string}) => {
    navigate(key);
    
    // 查找菜单项，获取标题和图标
    const findMenuItem = (items: MenuItem[], targetKey: string): MenuItem | null => {
      for (const item of items) {
        if (item.path === targetKey) {
          return item;
        }
        if (item.children && item.children.length > 0) {
          const found = findMenuItem(item.children, targetKey);
          if (found) return found;
        }
      }
      return null;
    };

    const menuItem = findMenuItem(menuItems, key);

    // 如果找到菜单项，并且标签页中不存在该路径，则添加标签页
    if (menuItem && !tabs.some(tab => tab.key === "/" + key)) {
      dispatch(setTab({
        icon: menuItem.meta?.icon || "QuestionCircleOutlined",
        label: menuItem.meta?.title || "未命名",
        key: "/" + key,
        closable: key !== "/index" // 首页不可关闭
      }));
    }
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname !== "/" ? location.pathname.replace("/", "") : "index"]}
      defaultOpenKeys={[location.pathname !== "/" ? location.pathname.replace("/", "") : "index"]}
      items={buildMenuItems(menuItems)}
      onClick={handleMenuClick}
    />
  );
};

export default DynamicMenu;