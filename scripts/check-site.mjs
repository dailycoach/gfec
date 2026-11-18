import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const textExtensions = new Set(['.html', '.css', '.js', '.json', '.txt']);
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.isFile()) files.push(absolute);
  }
}
walk(root);

const errors = [];
let linksChecked = 0;
for (const file of files) {
  if (!textExtensions.has(path.extname(file))) continue;
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);
  if (content.includes('https://daily-coach-ing.com/apilos/')) {
    errors.push(`${rel}: 이전 절대 도메인 경로가 남음`);
  }
  if (/(?:['"(\s])\/apilos\//.test(content)) {
    errors.push(`${rel}: 이전 내부 /apilos/ 경로가 남음`);
  }

  for (const [, referenced] of content.matchAll(/["'](\/[A-Za-z0-9_.\-/%?=&#]+)["']/g)) {
    const resource = decodeURIComponent(referenced.split(/[?#]/)[0]);
    const candidate = path.resolve(root, `.${resource}`);
    if (!candidate.startsWith(`${root}${path.sep}`) && candidate !== root) {
      errors.push(`${rel}: 사이트 범위를 벗어난 경로 ${referenced}`);
      continue;
    }
    linksChecked++;
    const exists = fs.existsSync(candidate) && fs.statSync(candidate).isFile()
      || fs.existsSync(path.join(candidate, 'index.html'));
    if (!exists) errors.push(`${rel}: 대상 파일 없음 ${referenced}`);
  }
}

if (errors.length) {
  console.error(`GFEC 검증 실패 (${errors.length}건):\n${errors.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`GFEC 검증 통과 · 텍스트/자산 ${files.length}개 파일 · 내부 경로 ${linksChecked}개 확인`);
}
