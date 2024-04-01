# 衛保組網站前端

## 開發

- 前端框架使用 Flutter。

- 記得要建立 `.env` 檔案。

## 部屬

直接執行 docker compose 會失敗，因為尚未進行編譯，可根據以下進行操作。

### 本地編譯

1. 確認已安裝完成 [Flutter SDK](https://docs.flutter.dev/get-started/install)。

2. 進入本資料夾 `frontend`。

3. 執行指令取得相依套件：

   ```bash
   flutter pub get
   ```

4. 執行指令編譯：

   ```bash
   flutter build web --web-renderer=canvaskit
   ```

5. 編譯的輸出檔位於 `./build/web`，將整個資料夾複製到 `./docker/` 並改名為 `frontend-artifact`。

6. 回到 repo 根目錄進行 docker compose up。

### Github Action

> 需擁有 remote repo 的編輯權

1. 進入本專案 GitHub Repo 的 [Actions](https://github.com/an920107/health-care-website) 頁籤。

2. 找到最後一次成功的 action，若 `frontend-artifact` 存在則將其下載並解壓縮；若不存在可先點擊 **Re-run all jobs**。

3. 確認 `frontend-artifact` 目錄中第一層就有 `index.html` 檔案，並將整個目錄複製到 `frontend/docker/` 中。

4. 回到 repo 根目錄進行 docker compose up。
