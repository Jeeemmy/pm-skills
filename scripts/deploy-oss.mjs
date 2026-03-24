/**
 * 阿里云 OSS 部署脚本
 * 将 out 目录下的所有文件上传到指定的 OSS Bucket
 *
 * 使用前：
 *   1. 复制 scripts/deploy-oss.config.example.mjs 为 scripts/deploy-oss.config.mjs
 *   2. 填入你的阿里云 AccessKey 等配置
 *   3. 运行 npm run deploy
 */

import OSS from "ali-oss";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  ACCESS_KEY_ID,
  ACCESS_KEY_SECRET,
  REGION,
  BUCKET,
  OSS_PREFIX,
} from "./deploy-oss.config.mjs";

// 本地要上传的目录（默认为项目根目录下的 out 文件夹）
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DIR = path.resolve(__dirname, "../out");

// ============================================================
// 以下为脚本逻辑，通常无需修改
// ============================================================

const client = new OSS({
  region: REGION,
  accessKeyId: ACCESS_KEY_ID,
  accessKeySecret: ACCESS_KEY_SECRET,
  bucket: BUCKET,
  authorizationV4: true,
});

/**
 * 递归获取目录下所有文件的相对路径
 */
function getAllFiles(dirPath, fileList = [], basePath = dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList, basePath);
    } else {
      fileList.push(path.relative(basePath, fullPath));
    }
  }
  return fileList;
}

/**
 * 根据文件扩展名推断 Content-Type
 */
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".txt": "text/plain; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".map": "application/json",
  };
  return types[ext] || "application/octet-stream";
}

/**
 * 判断是否为可长期缓存的静态资源（带 hash 的文件）
 */
function isHashedAsset(relativePath) {
  // Next.js 的 _next/static 目录下的文件都带有 content hash
  return relativePath.startsWith(path.join("_next", "static"));
}

async function deploy() {
  console.log("🚀 开始部署到阿里云 OSS...\n");
  console.log(`📁 本地目录: ${LOCAL_DIR}`);
  console.log(`☁️  目标 Bucket: ${BUCKET}`);
  console.log(`🌏 地域: ${REGION}`);
  if (OSS_PREFIX) {
    console.log(`📂 目标前缀: ${OSS_PREFIX}`);
  }
  console.log("");

  if (!fs.existsSync(LOCAL_DIR)) {
    console.error(`❌ 本地目录不存在: ${LOCAL_DIR}`);
    console.error('请先执行 "npm run build" 生成静态文件');
    process.exit(1);
  }

  const files = getAllFiles(LOCAL_DIR);
  console.log(`📦 共发现 ${files.length} 个文件待上传\n`);

  let successCount = 0;
  let failCount = 0;

  for (const relativePath of files) {
    const localFilePath = path.join(LOCAL_DIR, relativePath);
    // 使用正斜杠作为 OSS 路径分隔符
    const ossKey = OSS_PREFIX + relativePath.split(path.sep).join("/");

    const headers = {
      "Content-Type": getContentType(relativePath),
    };

    // 带 hash 的静态资源设置长期缓存，其他文件不缓存
    if (isHashedAsset(relativePath)) {
      headers["Cache-Control"] = "public, max-age=31536000, immutable";
    } else {
      headers["Cache-Control"] = "no-cache";
    }

    try {
      await client.put(ossKey, localFilePath, { headers });
      successCount++;
      console.log(`  ✅ ${ossKey}`);
    } catch (err) {
      failCount++;
      console.error(`  ❌ ${ossKey} - ${err.message}`);
    }
  }

  console.log(`\n🎉 部署完成！成功: ${successCount}，失败: ${failCount}`);

  if (failCount > 0) {
    process.exit(1);
  }
}

deploy().catch((err) => {
  console.error("部署失败:", err);
  process.exit(1);
});
