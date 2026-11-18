# GFEC · 글로벌미래교육원 상담코칭센터

데일리코칭 홈페이지의 `/apilos/`에 있던 정적 웹사이트를 독립 운영하기 위해 분리한 프로젝트입니다.

- 기존 출처: [`dailycoach/home/apilos`](https://github.com/dailycoach/home/tree/main/apilos)
- 운영 예정 주소: `https://gfec.rsedu.co.kr/`
- 구조: 별도 빌드가 필요 없는 HTML · CSS · JavaScript · JSON · WebP
- 홈: `index.html` / 내부 경로는 새 사이트의 루트(`/`) 기준

## 배포 설정 (GitHub Pages)

1. 이 소스를 별도의 **공개 GitHub 저장소**의 `main` 브랜치 **루트**에 둡니다.
2. **Settings → Pages → Build and deployment**에서 `Deploy from a branch`를 선택하고 `main` / `/(root)`를 지정합니다.
3. **Settings → Pages → Custom domain**에 `gfec.rsedu.co.kr`를 등록합니다. 최상위 `CNAME` 파일에도 동일한 도메인이 포함돼 있습니다.
4. `rsedu.co.kr` DNS 관리자에게 다음 레코드를 요청합니다.

   | 항목 | 값 |
   | --- | --- |
   | 타입 | `CNAME` |
   | 이름/호스트 | `gfec` |
   | 대상/값 | `dailycoach.github.io` |

5. DNS 검증과 인증서 발급이 끝나면 GitHub Pages의 **Enforce HTTPS**를 켭니다.
6. `https://gfec.rsedu.co.kr/`와 주요 하위 페이지 및 모바일 메뉴·이미지·뉴스를 확인합니다.

> DNS의 CNAME 대상에는 저장소 이름을 붙이지 않습니다. `gfec.rsedu.co.kr`의 기존 레코드가 있다면 변경 전 DNS 관리자가 서비스 영향을 확인해야 합니다.

## 점검

```bash
node scripts/check-site.mjs
```

검사는 HTML/JS/CSS/JSON 내 루트 기준 내부 경로의 실제 파일 존재 여부, 이전 `/apilos/` 경로, 이전 사이트의 canonical/OG 주소 잔존 여부를 확인합니다.

## 운영 참고

- 문의하기·도서구매 등 외부 링크와 네이버 블로그 원본 URL은 기존대로 유지합니다.
- 뉴스는 `news/blog.json`에 수집된 데이터로 표시됩니다. 원본에 있던 네이버 블로그 RSS 갱신 작업(`*/5 * * * *`)을 독립 저장소의 GitHub Actions로 옮겼습니다. 저장소의 Actions 쓰기 권한이 허용돼야 새 글이 자동 반영됩니다.
- 기존 `https://daily-coach-ing.com/apilos/`는 신규 도메인의 연결과 검증이 끝날 때까지 보존하고, 그다음 검색 유입과 기존 공유 링크를 위한 이전 안내 또는 리디렉션을 검토합니다.
