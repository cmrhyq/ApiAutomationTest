import "./index.css";
import "@/assets/css/Common.css";
import {useNavigate, Outlet} from "react-router-dom";
import {Button, ConfigProvider, Dropdown, Image, Layout, MenuProps, message, Spin, theme, Tooltip} from "antd";
import {Suspense, useState} from "react";
import {
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined, UserOutlined
} from "@ant-design/icons";
import DynamicMenu from "./components/menu/DynamicMenu.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import DynamicTabs from "./components/tabs";
import {logout} from "../../api/login.ts";
import {AxiosResponse} from "axios";
import {CommonResponse} from "../../page/login/model.ts";
import {userSliceLogout} from "../../store/reducers/user/userSlice.ts";

const {Header, Content, Sider} = Layout;

// TODO 页面优化根绝gemini ai中的建议来
function LayoutFrame() {
    const navigate = useNavigate();
    const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();
    const [primary] = useState("#0277ef");
    const [bodyBg] = useState("#f8f8fa");
    const [collapsed, setCollapsed] = useState(false);
    const {user} = useSelector((state: RootState) => state.user);

    const items: MenuProps['items'] = [
        {
            icon: <UserOutlined/>,
            label: "个人资料",
            key: 'profile',
        },
        {
            type: 'divider',
        },
        {
            icon: <SettingOutlined/>,
            label: "系统设置",
            key: 'setting',
        },
        {
            type: 'divider',
        },
        {
            icon: <LoginOutlined />,
            label: '退出登录',
            key: 'userSliceLogout',
        },
    ];

    /**
     * 点击头像菜单项的处理函数
     * @param key
     */
    const onClick: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case 'profile':
                navigate('/profile');
                break;
            case 'setting':
                navigate('/setting');
                break;
            case 'userSliceLogout':
                userLogout();
                break;
            default:
                console.log(`Clicked on menu item with key: ${key}`);
        }
    };

    /**
     * 退出登录逻辑
     */
    const userLogout = async () => {
        // TODO 退出登录逻辑
        try {
            const response: AxiosResponse<CommonResponse> = await logout();
            if (response && response.data.code === 200) {
                userSliceLogout()
                navigate('/login');
                message.success("退出登录成功");
            } else {
                message.error("退出登录失败");
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "退出登录异常";
            message.error(errorMessage);
        }
    }

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
                  className="box-shadow-2"
                  style={{
                      zIndex: 3,
                  }}>
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
                            <Dropdown menu={{ items, onClick }} trigger={['click']}>
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
                            </Dropdown>
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
