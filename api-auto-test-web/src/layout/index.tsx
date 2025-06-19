import {useLocation, useNavigate, Outlet} from "react-router-dom";
import {Content, Header} from "antd/es/layout/layout";
import {Breadcrumb, Button, ConfigProvider, Layout, Spin, theme, Tooltip} from "antd";
import {Suspense, useEffect, useState} from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined
} from "@ant-design/icons";
import DynamicMenu from "../components/DynamicMenu";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Sider from "antd/es/layout/Sider";

function LayoutFrame() {
    const location = useLocation();
    const navigate = useNavigate();
    const { token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
    const [collapsed, setCollapsed] = useState(true);
    const [primary] = useState("#1677ff");
    const [ breadcrumbItems, setBreadcrumbItems ] = useState<{ title: string, path: string }[]>([]);
    const { user } = useSelector((state: RootState) => state.user);

    // 生成面包屑项
    const generateBreadcrumbItems = () => {
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const breadcrumbItems = [{ title: 'Home', path: '/index' }];
        
        let url = '';
        pathSnippets.forEach(snippet => {
            url += `/${snippet}`;
            breadcrumbItems.push({
                title: snippet.charAt(0).toUpperCase() + snippet.slice(1),
                path: url
            });
        });
        setBreadcrumbItems(breadcrumbItems);
    };

    // 初始化获取验证码
    useEffect(() => {
        generateBreadcrumbItems();
    }, []);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: primary,
                }
            }}>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsed={collapsed}>
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
                    <Content style={{ margin: '0 16px' }}>
                        {/*TODO 点击有问题*/}
                        <Breadcrumb
                            style={{ margin: '16px 0' }}
                            items={breadcrumbItems}>
                        </Breadcrumb>
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
