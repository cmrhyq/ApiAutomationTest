import {useState, useEffect} from "react";
import {Form, Input, Button, Card, message, Row, Col, Typography, Spin} from "antd";
import {UserOutlined, LockOutlined, SafetyOutlined} from "@ant-design/icons";
import {useNavigate, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import login from "../../api/login.ts";
import {getCodeImg} from "../../api/login.ts";
import {setToken} from "../../plugins/cache/tokenCache.ts";
import {fetchUserInfo} from "../../store/reducers/user/userSlice";
import type {AppDispatch} from "../../store";
import "./login.css";
import {AxiosResponse} from "axios";

const {Title} = Typography;

export default function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [captchaImg, setCaptchaImg] = useState("");
    const [uuid, setUuid] = useState("");

    // 获取验证码
    const getCaptcha = async () => {
        try {
            const response: AxiosResponse<ImageResponse> = await getCodeImg();
            // Check if res and res.img exist before using them
            if (response && response.data.img) {
                setCaptchaImg("data:image/gif;base64," + response.data.img);
                setUuid(response.data.uuid || "");
            } else {
                message.error("获取验证码失败: 无效的响应格式");
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "获取验证码失败";
            message.error(errorMessage);
        }
    };

    // 初始化获取验证码
    useEffect(() => {
        getCaptcha();
    }, []);

    // 处理登录
    const handleLogin = async (values: any) => {
        try {
            setLoading(true);
            const {username, password, captcha} = values;
            const response: AxiosResponse<LoginResponse> = await login(username, password, captcha, uuid);

            // Check if res and res.token exist before using them
            if (response && response.data.token) {
                // 保存token
                setToken(response.data.token);
                message.success("登录成功");

                // 获取用户信息
                try {
                    await dispatch(fetchUserInfo());

                    // 跳转到首页或者来源页面
                    // 加判断是当获取到的来源页面是 undefined 或者为 / 的时候给他替换为 /index
                    let from_pathname = location.state?.from?.pathname;
                    if (!from_pathname || from_pathname.length < 2) {
                        from_pathname = "/index"
                    }
                    navigate(from_pathname, {replace: true});
                } catch (userInfoError) {
                    // Handle user info fetch error separately
                    console.error("Failed to fetch user info:", userInfoError);
                    message.warning("登录成功，但获取用户信息失败，部分功能可能受限");
                    // Still navigate to home page even if user info fetch fails
                    navigate("/index", {replace: true});
                }
            } else {
                message.error("登录失败: 无效的响应格式");
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "登录失败，请重试";
            message.error(errorMessage);
            // 刷新验证码
            getCaptcha();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <Card className="login-card">
                    <div className="login-header">
                        <Title level={2} className="login-title">API自动化测试平台</Title>
                    </div>
                    <Spin spinning={loading}>
                        <Form
                            form={form}
                            name="login"
                            onFinish={handleLogin}
                            initialValues={{remember: true}}
                            size="large"
                        >
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: "请输入用户名"}]}
                            >
                                <Input
                                    prefix={<UserOutlined/>}
                                    placeholder="用户名"
                                    autoComplete="off"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{required: true, message: "请输入密码"}]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined/>}
                                    placeholder="密码"
                                    autoComplete="off"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Row gutter={8}>
                                    <Col span={16}>
                                        <Form.Item
                                            name="captcha"
                                            noStyle
                                            rules={[{required: true, message: "请输入验证码"}]}
                                        >
                                            <Input
                                                prefix={<SafetyOutlined/>}
                                                placeholder="验证码"
                                                autoComplete="off"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <div className="captcha-container" onClick={getCaptcha}>
                                            {captchaImg ? (
                                                <img
                                                    src={captchaImg}
                                                    alt="验证码"
                                                    className="captcha-img"
                                                />
                                            ) : (
                                                <div className="captcha-loading">加载中...</div>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-button"
                                    loading={loading}
                                    block
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Card>
            </div>
        </div>
    );
}