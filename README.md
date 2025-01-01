# Health Care Website

中央大學衛生保健組官方網站

## 框架

- 前端：Next.js

- 後端：Pyhton (Flask)

## 更改 Portal OAuth Client ID

- Portal：

  - sso login: https://health.ncu.edu.tw/login
  - return to: https://health.ncu.edu.tw/api/auth/return-to
  
- 前端：frontend/src/app/[locale]/login/page.tsx

- 後端：backend/config.py

  > 要到 <https://www.debugbear.com/basic-auth-header-generator> 生成 basic auth

## 部屬

1. `echo "https://health.ncu.edu.tw" > frontend/.local.env`

2. `docker compose down`

3. `docker compose up --build -d`
