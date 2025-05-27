:: 新窗口启动 后端服务
start cmd /k "python ./app.py"

:: 新窗口延迟 5 秒启动 前端服务
start cmd /k "cd web && npm run dev"

exit