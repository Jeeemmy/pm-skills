# PM Skills

PM Skills 是一个面向产品经理的 AI Skills 展示站点，聚合精选技能卡片，帮助用户更快发现适合做需求、研究和产品工作的 AI 能力组合。

## 技术栈

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript
- Radix UI

## 本地开发

### 环境要求

- Node.js 20 或更高版本

### 安装依赖

仓库当前同时存在 `package-lock.json` 和 `pnpm-lock.yaml`。为避免锁文件混用导致差异，建议你在同一分支内固定使用一种包管理器。以下命令默认使用 `npm`。

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

默认启动后访问 [http://localhost:3000](http://localhost:3000)。

## 常用脚本

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 目录结构

```text
app/            Next.js App Router 页面与全局样式
components/     页面组件与基础 UI 组件
data/           Skills 原始数据与类型转换
hooks/          React hooks
lib/            通用工具函数
public/         图标、字体与静态资源
styles/         补充样式资源
```

## 数据说明

- Skills 数据来源于 [`data/skills.json`](./data/skills.json)
- 页面消费的数据映射定义在 [`data/skills.ts`](./data/skills.ts)

## 构建与部署

生产构建命令：

```bash
npm run build
```

本项目基于 Next.js，可部署到 Vercel 或任意支持 Node.js 的平台。

## 当前定位

当前站点的首页定位是“精选产品经理 AI Skills”，核心信息传达聚焦在“做需求交给 AI”，而不是原型制作工具目录。
