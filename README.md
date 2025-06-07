# Api Automation Test

## 技术栈

### 后端服务

1. Python
2. Flask
3. Requests
4. Pytest
5. Allure

### 前端服务

1. React
2. Electron
3. Ant Design
4. Axios
5. Vite

### 数据库

1. Sqlite

## 配置

### 环境变量配置

在项目根目录下创建 `.env` 文件，配置以下环境变量：

```env
# dev, prod, test
FLASK_ENV=dev
# Flask App Secret Key
SECRET_KEY=1234567890
```

## 查看报告

```shell
allure serve resource/report/report-json/
```

## 未开发的功能

- Electron
    1. 安装依赖：electron、electron-builder