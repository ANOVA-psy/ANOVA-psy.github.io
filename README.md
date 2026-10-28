# ANOVA-psy.github.io

刘慧敏的个人主页 / portfolio site — **Psychology × Cognitive Science × AI**

纯静态站点：原生 HTML + CSS + 少量 JavaScript，无框架、无构建步骤、无外部 CDN。可直接用 GitHub Pages 托管。

---

## 本地预览

必须走 HTTP（页面使用相对路径，直接双击文件会导致路径与 iframe 异常）：

```bash
# 在本仓库根目录执行
python -m http.server 8000

# 然后打开
# http://localhost:8000/
```

Node 环境可用：`npx serve .`

---

## 目录结构

```
.
├── index.html                      # 首页：Hero / 精选项目 / 研究 / 论文 / 关于摘要 / 联系
├── about.html                      # 教育经历、研究兴趣、技能、奖项与经历
├── research/index.html             # 四条研究线索 + 5 篇论文清单（链接已核验）
├── projects/
│   ├── audio-visual-training.html  # 项目一：视听语音整合训练系统
│   └── teacher-agent.html          # 项目二：中学教师教学评估与改进智能体
├── demos/
│   ├── audio-visual/index.html     # 可交互演示：走一遍真实阶梯试次，实时出阈值与分数
│   ├── teacher-agent/app.html      # 可交互演示：三节示例课例 → 四步评课 → 带证据的报告
│   └── teacher-agent/index.html    # 线框浏览器（脱敏版 7 屏，可切换、可深链 ?screen=s1）
├── assets/
│   ├── css/style.css               # 全站唯一样式表（含打印样式）
│   ├── js/main.js                  # 语言切换 / 移动导航 / 滚动渐显 / 图片查看器
│   └── images/
│       ├── profile/portrait.jpg
│       └── projects/teacher-agent-cover.svg  # 社交分享用的线框封面（程序化 SVG）
├── docs/content-audit.md           # 内容审核表：来源、核验结果、公开边界
├── 404.html
└── .nojekyll                       # 关闭 Jekyll 处理
```

---

## 部署到 GitHub Pages

仓库名 `ANOVA-psy.github.io` 属于用户主页仓库，推送到 `main` 分支根目录后会自动发布到
<https://anova-psy.github.io/>。

```bash
git remote add origin https://github.com/ANOVA-psy/ANOVA-psy.github.io.git
git branch -M main
git push -u origin main
```

若页面未自动出现：仓库 **Settings → Pages**，Source 选 `Deploy from a branch`，Branch 选 `main`，目录选 `/ (root)`，保存后约 1 分钟生效。

---

## 内容维护

- **改文案**：中英双语成对出现，中文放在 `class="zh"` 的元素里，英文放在 `class="en"` 里；两者都会被渲染，由 `<html data-lang>` 控制显隐。
- **加论文**：在 `research/index.html` 的 `.pub-list` 中追加 `.pub-item`，角色用 `.tag--role` 徽章标注；DOI 必须实际访问确认后再填。
- **改演示**：两个 `demos/*` 页面都是单文件（内联 CSS + 内联 JS），数据写在脚本顶部的常量里，改文案不用碰构建。
- **首页卡片**：两个项目卡都用 `<iframe ... ?embed=1>` 实时渲染演示，不是截图。`embed=1` 会隐藏说明文字、收窄布局，把内容压进一张 16:10 的卡片高度。
- **重新生成线框浏览器**：公开版由脚本生成（脚本不在仓库内）。原始线框文件含内部路由与权限备注，**不要直接提交到仓库**。

---

## 设计约定

| 项 | 值 |
|---|---|
| 纸感底色 / 卡片 | `#FBFAF7` / `#FFFFFF` |
| 正文 / 次要文字 | `#1B1A17` / `#57534A` |
| 强调（墨绿） | `#24605A` |
| 角色徽章（琥珀） | `#8C5A1B` |
| 标题字体 | Georgia / Songti SC / Noto Serif SC（系统字体栈） |
| 正文字体 | system-ui / PingFang SC / Microsoft YaHei |
| 断点 | 960 / 900 / 860 / 720 / 620 / 560 / 480 |

无 JS 时内容依然完整可见（`.reveal` 渐显仅在 `html.js` 下生效）。

---

## 许可与说明

- 站点文案版权归刘慧敏所有，请勿转载个人信息。
- 两个演示页都用示例数据：视听系统的作答由内置模拟被试生成，评课演示的内容为预置结果，都不调用后端也不保存数据。
- 教师智能体为课题组项目，公开部分仅为脱敏线框与设计演示，不代表真实系统。
