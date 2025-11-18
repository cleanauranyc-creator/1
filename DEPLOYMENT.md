# 🚀 GitHub Pages Deployment Guide

## ✅ Repository Setup Complete

Your repository has been configured for GitHub Pages deployment with Next.js static export.

---

## 📋 Setup Steps

### 1. Merge to Main Branch

First, you need to merge the `claude/cleanline-019PUioSW9Jbcwe1xjHD7KDn` branch to your main deployment branch:

```bash
# Option A: Create Pull Request (Recommended)
# Visit: https://github.com/cleanauranyc-creator/1/pull/new/claude/cleanline-019PUioSW9Jbcwe1xjHD7KDn
# Then merge the PR

# Option B: Merge directly
git checkout cleanline  # or main, or master
git merge claude/cleanline-019PUioSW9Jbcwe1xjHD7KDn
git push origin cleanline
```

### 2. Enable GitHub Pages

1. Go to your repository: https://github.com/cleanauranyc-creator/1
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select:
   - Source: **GitHub Actions**
5. Click **Save**

### 3. Configure Branch for Deployment

Update the GitHub Actions workflow to use your main branch:

**File:** `.github/workflows/deploy.yml`

Change line 5:
```yaml
on:
  push:
    branches:
      - cleanline  # Change this to your main branch (cleanline, main, or master)
```

### 4. Trigger Deployment

Push to your configured branch to trigger the first deployment:

```bash
git push origin cleanline
```

---

## 🔧 Configuration Details

### Static Export Setup

The following has been configured in `next.config.mjs`:

```javascript
{
  output: 'export',              // Enable static HTML export
  basePath: '/1',                // Repository name
  assetPrefix: '/1/',            // Asset path prefix
  images: { unoptimized: true }, // Disable Next.js Image Optimization
  trailingSlash: true,           // Add trailing slashes
}
```

### Build Process

When you push to the configured branch, GitHub Actions will:

1. ✅ Checkout your code
2. ✅ Install dependencies with pnpm
3. ✅ Build Next.js app (`pnpm build`)
4. ✅ Export static HTML to `/out` folder
5. ✅ Deploy to GitHub Pages

---

## 🌐 Access Your Site

After deployment completes (3-5 minutes), your site will be available at:

**🔗 https://cleanauranyc-creator.github.io/1/**

---

## ⚠️ Important Notes

### API Routes Not Supported

GitHub Pages is **static hosting only**. The following will **NOT work**:

- ❌ `/app/api/reviews/route.ts` (API routes)
- ❌ Server-side rendering (SSR)
- ❌ Server actions
- ❌ Dynamic routes at runtime

### Solutions:

1. **For Reviews API:**
   - Fetch directly from Supabase on the client
   - Or use external API service

2. **For Form Submissions:**
   - Use Supabase client-side inserts
   - Or use services like Formspree, Web3Forms

3. **For Dynamic Content:**
   - Pre-generate during build time
   - Use client-side data fetching

---

## 🔄 Environment Variables

GitHub Pages doesn't support server-side environment variables. Instead:

### Option 1: Public Variables (Recommended for Supabase)

Add to `next.config.mjs`:

```javascript
env: {
  NEXT_PUBLIC_SUPABASE_URL: 'your-project-url',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'your-anon-key',
}
```

### Option 2: Repository Secrets

1. Go to Settings → Secrets and variables → Actions
2. Add secrets like `SUPABASE_URL`, `SUPABASE_ANON_KEY`
3. Reference in `.github/workflows/deploy.yml`:

```yaml
- name: Build Next.js
  run: pnpm build
  env:
    NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
    NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
```

---

## 🐛 Troubleshooting

### Build Fails

**Check workflow logs:**
https://github.com/cleanauranyc-creator/1/actions

Common issues:
- Missing dependencies → Check `package.json`
- TypeScript errors → Fix or set `ignoreBuildErrors: true`
- Build timeout → Optimize build process

### 404 Errors on Routes

**Problem:** Next.js App Router needs special config for static export.

**Solution:** Ensure all pages are pre-rendered:
```typescript
// app/[service]/page.tsx
export function generateStaticParams() {
  return [
    { service: 'standard' },
    { service: 'deep' },
    // ... etc
  ]
}
```

### Images Not Loading

**Problem:** Next.js Image component doesn't work with static export.

**Solution:** Already configured with `unoptimized: true`.

If still failing, use regular `<img>` tags:
```tsx
<img src="/images/photo.jpg" alt="Photo" />
```

---

## 📊 Monitoring Deployments

### View Deployment Status

1. Go to **Actions** tab: https://github.com/cleanauranyc-creator/1/actions
2. Click on the latest workflow run
3. View build logs and deployment status

### Deployment Badge

Add to your README:

```markdown
[![Deploy Status](https://github.com/cleanauranyc-creator/1/actions/workflows/deploy.yml/badge.svg)](https://github.com/cleanauranyc-creator/1/actions/workflows/deploy.yml)
```

---

## 🔐 Production Checklist

Before going live:

- [ ] Update `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Enable RLS (Row Level Security) on Supabase tables
- [ ] Test all forms and booking flows
- [ ] Test on mobile devices (iPhone, Android)
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Set up analytics (Google Analytics, Vercel Analytics)
- [ ] Configure custom domain (optional)

---

## 🎨 Custom Domain (Optional)

To use a custom domain like `cleanauranyc.com`:

1. Buy domain from registrar (Namecheap, GoDaddy, etc.)
2. Add DNS records:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153

   Type: A
   Name: @
   Value: 185.199.109.153

   Type: A
   Name: @
   Value: 185.199.110.153

   Type: A
   Name: @
   Value: 185.199.111.153

   Type: CNAME
   Name: www
   Value: cleanauranyc-creator.github.io
   ```
3. In GitHub Settings → Pages → Custom domain, enter your domain
4. Wait for DNS propagation (24-48 hours)

---

## 📞 Support

For deployment issues, check:
- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**Happy Deploying! 🚀**
