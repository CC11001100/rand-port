#!/bin/bash

# rand-port 前端启动脚本
# 功能：启动前端，自动杀死之前的进程，保证单实例启动

echo "正在启动 rand-port 前端..."

# 设置端口
PORT=3001

# 检查是否已经运行
EXISTING_PID=$(lsof -ti:$PORT 2>/dev/null)

if [ ! -z "$EXISTING_PID" ]; then
    echo "发现已有进程在端口 $PORT 上运行，正在停止..."
    kill -9 $EXISTING_PID
    sleep 2
    echo "已停止之前的进程"
fi

# 检查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "node_modules 不存在，正在安装依赖..."
    npm install
fi

# 启动前端，指定端口
echo "正在启动前端服务，端口: $PORT..."
PORT=$PORT npm start

echo "前端服务已启动完成！"
echo "访问地址: http://localhost:$PORT" 