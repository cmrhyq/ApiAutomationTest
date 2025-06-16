import {useLocation, useNavigate, useRoutes} from "react-router-dom";
import {Content, Header} from "antd/es/layout/layout";
import {Breadcrumb, Button, ConfigProvider, Layout, Menu, Spin, theme, Tooltip} from "antd";
import {type JSX, Suspense} from "react";
import {
    HomeOutlined, RightSquareOutlined,
    SettingOutlined
} from "@ant-design/icons";
import type {ItemType} from "antd/es/menu/interface";
import * as React from "react";
import {dynamicRoutes} from "../router";

interface MenuItemType {
    key: string,
    icon: JSX.Element,
    label: string,
}

const menuRouter: ItemType<MenuItemType>[] = [
    {
        key: "/index",
        icon: <HomeOutlined />,
        label: "首页"
    }, {
        key: "/login",
        icon: <RightSquareOutlined />,
        label: "登录"
    }
]

function LayoutFrame() {
    const location = useLocation()
    const navigate = useNavigate();
    const element = useRoutes(dynamicRoutes)
    const { token: { colorBgContainer, borderRadiusLG }} = theme.useToken()
    const [primary] = React.useState("#1677ff");

    function clickMenu(e: { key: string }) {
        navigate(e.key)
    }

    const breadcrumbItems = [
        {
            title: 'Home'
        }, {
            title: location.pathname.replace("/", ''),
        }
    ]

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: primary,
                }
            }}>
            <Layout style={{ height: '100%' }}>
                <Header style={{ display: 'flex', alignItems: 'center' }}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[location.pathname]}
                        items={menuRouter}
                        onClick={clickMenu}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                    <div style={{ justifyContent: "flex-end" }}>
                        <Tooltip placement="bottom" title="设置">
                            <Button
                                shape="circle"
                                color="cyan"
                                variant="link"
                                icon={<SettingOutlined style={{color: "#fff"}}/>}
                                onClick={() => {
                                    navigate('/setting')
                                }}>
                            </Button>
                        </Tooltip>
                    </div>
                </Header>
                <Content style={{ padding: '0 48px', height: '100%' }}>
                    <Breadcrumb
                        style={{ margin: '16px 0' }}
                        items={breadcrumbItems}
                    />
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 480,
                            height: '90%',
                            padding: 24,
                            borderRadius: borderRadiusLG,
                        }}>
                        <Suspense fallback={
                            <Spin tip="Loading" size="large" fullscreen>
                                Loading...
                            </Spin>
                        }>
                            {element}
                        </Suspense>
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    )
}

export default LayoutFrame
