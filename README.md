# Cut & Cuff

A responsive editorial promotional website for Cut & Cuff, the new name of Dripout. This repository changes only the promotional brand; the mobile application is untouched.

Built with semantic HTML, CSS, and plain JavaScript. No package installation, API keys, backend, or paid services are needed.

## Run locally

Install Node.js 22 or newer, then run:

```sh
npm run dev
```

Open **http://127.0.0.1:4173/promo-cut-and-cuff/**. The local server supports the same subdirectory as GitHub Pages.

```sh
npm test
npm run build
npm run preview
```

`public/` contains the source. `dist/` is generated and ignored by Git. The build copies only public website files into the deployment artifact.

## Deploy to GitHub Pages

1. Push this project to `https://github.com/lamezati-sudo/promo-cut-and-cuff` on `main`.
2. In the repository, open **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.
3. The **Check and deploy website** workflow validates and publishes pushes to `main`. If the first run happened before Pages was enabled, run it again from **Actions → Check and deploy website → Run workflow**.
4. The expected production URL is **https://lamezati-sudo.github.io/promo-cut-and-cuff/**.

Pull requests run checks and build without deploying. The workflow uses the repository-provided `GITHUB_TOKEN`; no custom secrets are needed. See [GitHub’s custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Content and behavior

- Four interactive editorial style directions, including keyboard arrow/Home/End navigation.
- Favorite inspiration saved in browser storage, with a memory-only fallback if storage is blocked. Clear favorites from the Privacy dialog.
- Responsive mobile navigation, accessible native dialogs, FAQ disclosures, reduced-motion support, and semantic image descriptions.
- An honest development/availability dialog. There is no fake waitlist, email collection, app-store badge, or live AI generation on this static promotional site.
- Editorial images illustrate style ideas; they are not promised AI try-on results. 3D rotation is described as an idea, not a shipping feature.

## Assets and editing

Fashion images were cropped and optimized from the existing app’s `style-editorial.png` and `catalog-editorial.png`. No private user photos or app screenshots are included. The social preview is composed from the same artwork.

Manrope is self-hosted under the SIL Open Font License; see `public/assets/fonts/OFL.txt`. The italic display face uses the visitor’s system Georgia font.

Edit copy in `public/index.html`, style presets in `public/app.js`, and visual design in `public/styles.css`. If a public app-store link becomes available, update the launch dialog and FAQ together. If changing the repository name or custom domain, update the canonical and Open Graph URLs in `index.html`.
