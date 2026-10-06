# Shape Name Tag Color Studio

A separate React + Vite color configurator for heart, bear, and rabbit name tags. It reuses the original site's 10-color palette and supports two- and three-letter GLB models.

## Run locally

```sh
npm ci
npm run dev
```

## Shape links

- `/heart` — heart name tag
- `/bear` — bear name tag
- `/rabbit` — rabbit name tag

Add `?length=3` to open the three-letter model, for example `/bear?length=3`. The default is two letters. Shape definitions and model lists are at the top of `src/App.tsx`; add entries there to add future shapes.

The included `public/404.html` restores direct shape links on GitHub Pages project sites.
