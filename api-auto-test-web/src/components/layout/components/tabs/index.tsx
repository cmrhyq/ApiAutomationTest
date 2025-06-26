import {useEffect, useState} from "react";
import {Tabs, theme} from "antd";
import * as AntdIcons from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import type {RootState} from "../../../../store";
import {removeTab} from "../../../../store/reducers/tabs/tabsSlice";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const DynamicTabs: React.FC = () => {
    const {token: {colorBgContainer}} = theme.useToken();
    const {tabs} = useSelector((state: RootState) => state.tabs);
    const [activeKey, setActiveKey] = useState("/index");
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    
    // 动态加载图标
    const DynamicIcon = ({ iconName }: { iconName: string }) => {
        // 动态获取图标组件
        const IconComponent = (AntdIcons as any)[iconName];

        if (!IconComponent) {
            return <AntdIcons.QuestionCircleOutlined />; // 默认图标
        }

        return <IconComponent />;
    };
    
    // 将tabs数组转换为Ant Design Tabs需要的格式
    const getTabItems = () => {
        return tabs.map(tab => ({
            key: tab.key,
            label: tab.label,
            closable: tab.closable,
            icon: tab.icon ? <DynamicIcon iconName={tab.icon} /> : null
        }));
    };
    
    // 监听路由变化，更新当前激活的标签页
    useEffect(() => {
        const path = location.pathname === "/" ? "/index" : location.pathname;
        setActiveKey(path);
    }, [location.pathname]);

    const onChange = (key: string) => {
        setActiveKey(key);
        navigate(key);
    };

    const handleRemoveTab = (targetKey: TargetKey) => {
        // 如果关闭的是当前激活的标签页，需要切换到其他标签页
        if (targetKey === activeKey) {
            let newActiveKey = "/index";
            let lastIndex = -1;
            
            tabs.forEach((item, i) => {
                if (item.key === targetKey) {
                    lastIndex = i - 1;
                }
            });
            
            if (lastIndex >= 0) {
                newActiveKey = tabs[lastIndex].key;
            } else if (tabs.length > 1) {
                // 如果关闭的是第一个标签页，则激活下一个标签页
                const nextIndex = tabs.findIndex(tab => tab.key === targetKey) + 1;
                if (nextIndex < tabs.length) {
                    newActiveKey = tabs[nextIndex].key;
                }
            }
            
            setActiveKey(newActiveKey);
            navigate(newActiveKey);
        }
        
        // 从Redux中移除标签页
        dispatch(removeTab(targetKey));
    };

    return (
        <Tabs
            hideAdd
            onChange={onChange}
            activeKey={activeKey}
            type="editable-card"
            onEdit={handleRemoveTab}
            items={getTabItems()}
            tabBarStyle={{
                backgroundColor: colorBgContainer,
                zIndex: 2,
                padding: "0 5px",
            }}
        />
    );
};

export default DynamicTabs;