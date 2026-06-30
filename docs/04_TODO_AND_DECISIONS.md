# TODO 与决策记录

## 已确定

- 使用 React + Vite。
- 使用 `?point=POINT_ID` 模拟 NFC 点位。
- 第一版不实现真实 Web NFC 读取。
- 正式落地时，每个 NFC 标签写入对应点位 URL。
- 当前代码需要为真实 NFC 落地保留 service 边界。
- 点位数据集中放在 `src/data/points.js`。
- pointId 来源由 `src/services/pointResolver.js` 处理。
- 图鉴 localStorage 由 `src/services/atlasStorage.js` 处理。
- UI 参考图放在 `public/ui-reference/`。
- PawPal 素材放在 `public/pawpal/`。
- 音频素材放在 `public/audio/`。
- 第一版可以用文字模拟音频播放。

## 待确认

- MVP 首批点位数量和正式名称。
- 每个点位的正式介绍文案。
- PawPal 的最终形象文件名和尺寸。
- 是否需要本地保存图鉴解锁进度。
- 图鉴页是否只展示已访问点位，还是展示全部点位的亮起/未亮起状态。
- 是否需要真实 NFC 标签写入规范。
- 线上正式域名。
- 首批 NFC 标签对应的点位 URL 清单。
- 是否需要中英文双语。

## 后续 TODO

- 根据 UI 参考图细化视觉风格。
- 实现模拟 NFC 入口。
- 实现点位页交互状态。
- 实现完成弹窗。
- 实现图鉴页点亮状态。
- 接入真实 PawPal 图片素材。
- 接入 mp3 音频播放。
