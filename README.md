# Health Care Website

中央大學衛生保健組官方網站

## 框架

- 前端：Next.js

- 後端：Pyhton (Flask)

## 更改 Portal OAuth Client ID

- 前端：frontend/src/app/[locale]/login/page.tsx

- 後端：backend/config.py

  > 要到 <https://www.debugbear.com/basic-auth-header-generator> 生成 basic auth

## 部屬

1. 確保完成 [Frontend 的部屬](frontend/README.md##部屬)。

2. 可修改 [docker-compose.yml](docker-compose.yml) 中，`proxy` service 的 `port`，將 `18080` 改為想要使用的 port。

3. 若 subnet `10.0.0.0/24` 與已存在的相衝，除了 [docker-compose.yml](docker-compose.yml) 外，也需要將 [proxy/reverse_proxy.conf](proxy/reverse_proxy.conf) 的 resolver 改為新的 gateway。
