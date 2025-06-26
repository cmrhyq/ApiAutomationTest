import "./index.css";
import "@/assets/css/Common.css";
import {useNavigate, Outlet} from "react-router-dom";
import {Button, ConfigProvider, Image, Layout, Spin, theme, Tooltip} from "antd";
import {Suspense, useState} from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined, UserOutlined
} from "@ant-design/icons";
import DynamicMenu from "./components/menu/DynamicMenu.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import DynamicTabs from "./components/tabs";

const {Header, Content, Sider} = Layout;

function LayoutFrame() {
    const navigate = useNavigate();
    const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();
    const [primary] = useState("#1296db");
    const [bodyBg] = useState("#f8f8fa");
    const [collapsed, setCollapsed] = useState(false);
    const {user} = useSelector((state: RootState) => state.user);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: primary,
                },
                components: {
                    Layout: {
                        bodyBg: bodyBg,
                    },
                    Tabs: {
                        cardBg: '#fff',
                        itemHoverColor: "#000"
                    },
                }
            }}>
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                  theme={"light"}
                  collapsed={collapsed}
                  defaultCollapsed={false}
                  className="box-shadow-2">
                    <div style={{height: 32, margin: 16}}>
                        <Image alt="logo" src={"/src/assets/images/easyapi-logo.svg"} preview={false} height={32}/>
                    </div>
                    <DynamicMenu/>
                </Sider>
                <Layout>
                    <Header
                      className="box-shadow-1"
                      style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        zIndex: 2
                      }}>
                        <Button
                            size="large"
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}/>
                        <div style={{marginRight: 20, display: 'flex', alignItems: 'center'}}>
                            <Tooltip placement="bottom" title="设置">
                                <Button
                                    size="large"
                                    color="default"
                                    variant="text"
                                    icon={<SettingOutlined/>}
                                    onClick={() => navigate('/setting')}
                                />
                            </Tooltip>
                            <Tooltip placement="bottom" title="设置">
                                <Button
                                    size="large"
                                    color="default"
                                    variant="text"
                                    icon={<UserOutlined/>}
                                    onClick={() => navigate('/')}>
                                    <span style={{marginRight: 12}}>
                                        {user?.nickName || user?.userName}
                                    </span>
                                </Button>
                            </Tooltip>
                        </div>
                    </Header>
                    <DynamicTabs/>
                    <Content
                      style={{
                        margin: '0 16px',
                        borderRadius: "0 0 8px 8px",
                      }}>
                        <div style={{
                            padding: 24,
                            minHeight: "97%",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                             className="box-shadow-3">
                            <Suspense fallback={
                                <Spin tip="Loading" size="large">
                                    Loading...
                                </Spin>
                            }>
                                <Outlet/>
                            </Suspense>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}

export default LayoutFrame;
