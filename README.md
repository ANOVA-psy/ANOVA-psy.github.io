# ANOVA-psy.github.io

刘慧敏的个人主页 / portfolio site — **心理学研究 · 大模型评测 · 实验工具**

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
├── index.html                      # 首页：定位一句 / 两个项目 / MIST / 两条成果 / 背景 / 联系
├── about.html                      # 简介、经历、能做什么、科研成果与奖项
├── research/index.html             # 研究重心 + 5 篇论文清单（含角色与具体贡献）
├── projects/
│   ├── audio-visual-training.html  # 项目一：视听语音整合训练系统
│   └── teacher-agent.html          # 项目二：中学教师教学评估与改进智能体
├── demos/
│   ├── audio-visual/index.html     # 界面外壳：入口页 / 结果报告 / 历史记录三个标签（首页用 ?embed=1&crop=top 取顶部局部）
│   ├── audio-visual/app/           # 项目源码前端的静态副本（Tailwind、ECharts 已本地化）
│   └── teacher-agent/
│       ├── overview.html           # 四屏线框总览（项目页顶部展示带用）
│       └── index.html              # 线框浏览器（脱敏版 7 屏，可切换、可深链 ?screen=s1）
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
- **加论文**：在 `research/index.html` 的 `.pub-list` 中追加 `.pub-item`，统一写「标题 / 作者 / 发表信息 / 说明 / 角色 + 链接」五段，角色用 `.pub-role` 纯文本，不加徽章；DOI 必须实际访问确认后再填。
- **视听系统的界面**：`demos/audio-visual/app/` 是项目源码前端的副本，改界面要去源仓库改，再重新复制过来。为了静态托管有三处改动：Tailwind 与 ECharts 换成 `css/tailwind.css`、`js/vendor/echarts.min.js`；`js/demo-shim.js` 顶掉预加载器与 `/api` 请求；`js/demo-data.js` 塞一条示例记录给结果页和历史页。
- **首页项目图**：每段是一整幅界面，不是卡片封面。视听用 `demos/audio-visual/index.html?embed=1&crop=top`（按宽度铺满、顶部对齐，由 `.work-shot` 裁掉下半部分）；教师用 `demos/teacher-agent/index.html?screen=s1&embed=1`。两处 iframe 都设 `pointer-events:none`，看得到、点不动，点击落到项目页。高度由 `.work-shot` 的 `aspect-ratio` 控制。
- **重新生成线框浏览器**：公开版由脚本生成（脚本不在仓库内）。原始线框文件含内部路由与权限备注，**不要直接提交到仓库**。

---

## 设计约定

| 项 | 值 |
|---|---|
| 纸感底色 / 卡片 | `#FBFAF7` / `#FFFFFF` |
| 正文 / 次要文字 | `#1B1A17` / `#57534A` |
| 强调（墨绿） | `#24605A` |
| 提示条（琥珀） | `#8C5A1B` |
| 标题字体 | Georgia / Songti SC / Noto Serif SC（系统字体栈） |
| 正文字体 | system-ui / PingFang SC / Microsoft YaHei |
| 断点 | 860 / 760 / 640 / 620 |

不做滚动淡入、不做 hover 位移；层次由字号、留白和 1px 分隔线建立，不靠圆角卡片与徽章。

---

## 许可与说明

- 站点文案版权归刘慧敏所有，请勿转载个人信息。
- 视听系统的界面来自项目源码，但跑在静态环境里：没有后端、没有音视频素材，结果页展示的是一条示例记录。
- 教师智能体为课题组项目，公开部分仅为脱敏线框与设计演示，不代表真实系统。
