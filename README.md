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

本项目通过 `next build` 静态导出到 `out/` 目录，再上传至阿里云 OSS。

### 1. 配置 OSS 凭证

首次使用需创建配置文件（该文件已被 `.gitignore` 排除，不会提交到版本库）：

```bash
cp scripts/deploy-oss.config.example.mjs scripts/deploy-oss.config.mjs
```

然后编辑 `scripts/deploy-oss.config.mjs`，填入以下信息：

| 常量               | 说明                                      |
| ------------------ | ----------------------------------------- |
| `ACCESS_KEY_ID`    | 阿里云 AccessKey ID                       |
| `ACCESS_KEY_SECRET`| 阿里云 AccessKey Secret                   |
| `REGION`           | OSS 所在地域，如 `oss-cn-hangzhou`         |
| `BUCKET`           | OSS Bucket 名称                           |
| `OSS_PREFIX`       | 上传目标目录前缀，如 `skills/`             |

### 2. 构建并发布

```bash
npm run build    # 生成静态文件到 out/
npm run deploy   # 上传 out/ 到 OSS
```