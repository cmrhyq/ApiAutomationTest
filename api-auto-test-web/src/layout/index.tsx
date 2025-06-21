import {useNavigate, Outlet} from "react-router-dom";
import {Content, Header} from "antd/es/layout/layout";
import {Button, ConfigProvider, Layout, Spin, theme, Tooltip} from "antd";
import {Suspense, useState} from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined
} from "@ant-design/icons";
import DynamicMenu from "../components/menu/DynamicMenu.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Sider from "antd/es/layout/Sider";

function LayoutFrame() {
    const navigate = useNavigate();
    const { token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const [primary] = useState("#1677ff");
    const { user } = useSelector((state: RootState) => state.user);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: primary,
                }
            }}>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsed={collapsed} defaultCollapsed={false}>
                    <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                    <DynamicMenu />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: '16px', width: 64, height: 64 }}
                        />
                        <div style={{ marginRight: 20, display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: 12 }}>
                                {user?.nickname || user?.username}
                            </span>
                            <Tooltip placement="bottom" title="设置">
                                <Button
                                    shape="circle"
                                    icon={<SettingOutlined />}
                                    onClick={() => navigate('/setting')}
                                />
                            </Tooltip>
                        </div>
                    </Header>
                    <Content style={{ margin: '16px 16px' }}>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Suspense fallback={
                                <Spin tip="Loading" size="large">
                                    Loading...
                                </Spin>
                            }>
                                <Outlet />
                            </Suspense>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export default LayoutFrame;
