# UI 风格规则

## 总体方向

PawPal 的界面应该轻快、亲切、适合宠物友好村导览。视觉上可以有温暖感和一点童趣，但信息层级要清楚，避免复杂装饰影响游客快速理解。

## 设计原则

- PawPal 是主要情感锚点，点位内容是主要信息。
- 页面优先适配手机竖屏场景。
- 按钮文案要短，动作要明确。
- 图鉴页应让已点亮和未点亮状态一眼可辨。
- 完成弹窗要有明确的奖励感，但不要过度复杂。

## 参考图使用规则

后续 UI 参考图请放入 `public/ui-reference/`，例如：

- `home-reference.png`
- `point-page-reference.png`
- `complete-modal-reference.png`
- `atlas-reference.png`

开发时可以参考这些图片的颜色、字体气质、排版节奏和组件风格，但不要把参考图当作页面素材直接铺上去。

## PawPal 素材规则

PawPal 形象素材放在 `public/pawpal/`。如果存在 `/pawpal/pawpal-placeholder.png`，页面中展示 PawPal 时优先使用该图片。如果该文件不存在，先用 CSS 或 SVG 绘制一个黑色大眼睛猫猫占位。

## 音频规则

音频文件放在 `public/audio/`。第一版可以先用文字模拟「正在播放 BGM」或「正在播放点位音频」。后续放入 mp3 后再接入真实 audio 播放。
