/**
 * OSS 部署配置文件模板
 *
 * 使用方法：
 *   1. 复制本文件为 deploy-oss.config.mjs
 *   2. 填入你的阿里云 AccessKey 信息
 */

// 阿里云 AccessKey ID（在阿里云控制台 -> AccessKey 管理中获取）
export const ACCESS_KEY_ID = "your-access-key-id";

// 阿里云 AccessKey Secret（在阿里云控制台 -> AccessKey 管理中获取）
export const ACCESS_KEY_SECRET = "your-access-key-secret";

// OSS 所在地域，例如 'oss-cn-hangzhou'（在 Bucket 概览页面可以查看）
export const REGION = "oss-cn-hangzhou";

// OSS Bucket 名称（在 OSS 控制台创建或查看）
export const BUCKET = "your-bucket-name";

// 上传到 OSS 的目标目录前缀，为空字符串表示上传到 Bucket 根目录
// 例如设置为 'skills/' 则文件会上传到 skills/ 目录下
export const OSS_PREFIX = "";
