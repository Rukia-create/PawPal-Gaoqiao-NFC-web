# points.js 数据结构

点位数据集中放在 `src/data/points.js`。组件只读取数据，不直接硬编码点位文案。

## 当前结构

```js
export const points = [
  {
    id: "cat-island",
    name: "猫岛宠物友好观察点",
    type: "猫岛 / 动物观察",
    tags: ["宠物友好", "动物观察", "安全共处"],
    duration: "10-15 分钟",
    intro: "点位介绍文案",
    pawpalPrompt: "PawPal 初始提示",
    listenFeedback: "听听这里后的反馈",
    patFeedback: "摸摸 PawPal 后的反馈",
    musicLabel: "猫岛午后声景",
    badge: "人宠共生观察员猫爪",
    feedback: "完成任务后的 PawPal 反馈",
    note: "注意事项",
    audioSrc: "",
    imageSrc: "",
    nextPointId: "plant-space"
  }
];
```

## 字段说明

- `id`: 点位唯一标识，用于 URL 参数和 NFC 标签 URL，例如 `?point=cat-island`。
- `name`: 点位完整名称。
- `type`: 点位类型。
- `tags`: 点位标签。
- `duration`: 推荐停留时间。
- `intro`: 点位介绍。
- `pawpalPrompt`: PawPal 初始提示气泡文案。
- `listenFeedback`: 点击「听听这里」后的反馈文案。
- `patFeedback`: 点击「摸摸 PawPal」后的反馈文案。
- `musicLabel`: 文字模拟播放时显示的音频名称。
- `badge`: 图鉴解锁奖励名称。
- `feedback`: 完成弹窗中的 PawPal 反馈。
- `note`: 注意事项。
- `audioSrc`: 未来真实音频文件路径，第一版可以为空。
- `imageSrc`: 未来点位图片路径，第一版可以为空。
- `nextPointId`: 未来推荐下一个点位，第一版按点位顺序串联。

## 维护规则

点位 id 会进入真实 NFC 标签 URL，不能随意修改。如果必须修改，需要同步更新点位数据、文档、二维码或 NFC 标签写入清单。
