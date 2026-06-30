# NFC 落地计划

## 核心原则

PawPal NFC Guide 的第一版 MVP 不实现真实 Web NFC 读取，但项目不是一次性的假模拟。当前 URL 参数方案就是未来 NFC 标签落地时的基础地址结构。

## MVP 阶段

第一版使用 URL 参数模拟 NFC 点位跳转。

示例：

```text
/?point=cat-island
```

本地开发示例：

```text
http://localhost:5173/?point=cat-island
```

在这个阶段，页面只需要根据 `point` 参数解析当前点位，不需要调用浏览器 Web NFC API。

## 真实 NFC 标签部署

正式落地时，每个 NFC 标签写入一个对应点位 URL。

示例：

```text
https://example.com/?point=cat-island
```

游客用手机触碰 NFC 标签后，系统浏览器会打开这个 URL。前端读取 `point=cat-island`，并展示对应的 PawPal 点位页。

## 为什么不在第一版做 Web NFC

- iOS 和 Android 对 Web NFC 的支持差异较大。
- 很多真实场景只需要 NFC 标签打开 URL，稳定性更高。
- 第一版重点是验证点位内容、PawPal 互动和图鉴闭环。
- 未来如果需要网页内读取或写入 NFC，可以单独扩展。

## 架构预留

当前代码应保留清晰边界：

- `src/services/pointResolver.js`: 处理 pointId 来源，例如 URL 参数、模拟入口、未来 NFC 扫描结果。
- `src/services/atlasStorage.js`: 处理图鉴解锁状态，第一版使用 localStorage。
- `src/data/points.js`: 集中管理点位数据和未来扩展字段。

React 组件不应该直接关心 NFC 来源，也不应该写死点位内容。

## 未来可扩展方向

后续可以按需增加：

- `src/services/nfcAdapter.js`，用于 Web NFC scan/write。
- NFC 标签 URL 映射表。
- 线上域名和点位 URL 批量生成文档。
- 埋点统计，记录每个点位访问量。
- 后端进度同步，替代或补充 localStorage。
- 多语言点位内容。

## NFC 标签写入建议

每个点位都应该有稳定 id，例如：

```text
cat-island
plant-space
book-house
cafe
lawn
installation
```

对应 URL 示例：

```text
https://example.com/?point=cat-island
https://example.com/?point=plant-space
https://example.com/?point=book-house
```

如果点位 id 需要变更，必须同步更新：

- `src/data/points.js`
- 项目文档
- 已写入或待写入的 NFC 标签 URL
- 任何二维码、海报或线下物料
