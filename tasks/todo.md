# LiveNews Bug Fix Plan

## Identified Bugs

### 1. [CRITICAL] Duplicate feeds on every page view
- **File**: `lib/fetchNews.ts` + `lib/sortNewsByImage.ts`
- **Root cause**: The homepage calls `fetchNews(categories.join(","))`, passing all 7 categories to the Mediastack API at once. The API returns articles per-category, and the same article can appear under multiple categories. `sortNewsByImage.ts` spreads them all without deduplication.
- **Fix**: Add a URL-based deduplication step in `sortNewsByImage.ts` — filter `data` to unique URLs before sorting.

### 2. [HIGH] TypeScript `Int` type is invalid
- **File**: `typings.d.ts` lines 15–20
- **Root cause**: `Int` is a GraphQL type, not a TypeScript type. TypeScript will resolve it as `any` or error depending on settings.
- **Fix**: Replace `Int` → `number` for `count`, `limit`, `offset`, `total`.

### 3. [HIGH] Conflicting fetch cache options
- **File**: `lib/fetchNews.ts` lines 47–51
- **Root cause**: Next.js 13 fetch options `cache` and `next.revalidate` conflict when used together. `cache: "no-cache"` does not mean "never cache" in Next.js — use `cache: "no-store"` for truly dynamic requests.
- **Fix**:
  - Static: remove `cache: "default"`, keep `next: { revalidate: 120 }`
  - Dynamic: change `cache: "no-cache"` → `cache: "no-store"`, remove `next: { revalidate: 0 }`

### 4. [HIGH] URL encoding broken in ReadMoreButton
- **File**: `app/ReadMoreButton.tsx` lines 13–16
- **Root cause**: `Object.entries(article).map(([key, value]) => \`${key}=${value}\`)` does not encode values. Any article title/description containing `&`, `=`, `?`, `#`, spaces, or non-ASCII characters will corrupt the URL and break the article page.
- **Fix**: Replace with `new URLSearchParams(...)` which properly encodes all values.

### 5. [HIGH] Missing Suspense boundary for `useSearchParams`
- **File**: `app/article/page.tsx`
- **Root cause**: Next.js 13+ requires any component calling `useSearchParams()` to be wrapped in a `<Suspense>` boundary. Without it the build throws a warning and the page may render incorrectly during SSR.
- **Fix**: Wrap the inner component in `<Suspense>` within the page export.

### 6. [MEDIUM] `console.log` in production code
- **File**: `lib/fetchNews.ts` lines 65–68
- **Fix**: Remove the `console.log` statement.

### 7. [MEDIUM] Outdated `experimental.appDir` flag
- **File**: `next.config.js`
- **Root cause**: The App Router graduated from experimental in Next.js 13.4. This flag is now a no-op or may cause warnings.
- **Fix**: Remove `experimental: { appDir: true }`.

### 8. [MEDIUM] Legacy `pages/` directory alongside App Router
- **Files**: `pages/_app.tsx`, `pages/api/hello.ts`
- **Root cause**: `pages/_app.tsx` re-imports `globals.css` which is already imported in `app/layout.tsx`, causing a double CSS import. `pages/api/hello.ts` is unused boilerplate that ships dead code.
- **Fix**: Delete both files. If the API route is ever needed, migrate to `app/api/hello/route.ts`.

---

## Fix Order

- [x] 1. Fix duplicate feeds (sortNewsByImage.ts)
- [x] 2. Fix TypeScript Int → number (typings.d.ts)
- [x] 3. Fix fetch cache options (fetchNews.ts)
- [x] 4. Fix URL encoding (ReadMoreButton.tsx)
- [x] 5. Add Suspense boundary (article/page.tsx)
- [x] 6. Remove console.log (fetchNews.ts)
- [x] 7. Remove experimental.appDir (next.config.js)
- [x] 8. Delete legacy pages/ files

---

## Review

All 8 bugs fixed. Changes are minimal and surgical — no architectural changes. Key fixes:
- Deduplication added as a pre-sort step in sortNewsByImage.ts using a URL Set
- fetch options now use mutually exclusive patterns (no-store vs next.revalidate)
- URLSearchParams replaces manual query string building
- useSearchParams now has a Suspense boundary as required by Next.js 13+
