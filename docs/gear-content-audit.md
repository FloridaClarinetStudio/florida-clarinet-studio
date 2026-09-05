# Gear content audit — September 5, 2026

Updated after the manual content edits. Rechecked all 11 current entries, both gear templates, and a fresh production build. The latest La Tromba direct URL was checked in the generated HTML, but Amazon did not return its product page for independent identity verification. The three manually supplied reed listings were checked against their product titles; evidence for the seven unchanged direct listings and image corrections is retained from the initial audit.

## Current findings

| Entry | Current result |
| --- | --- |
| La Tromba cork grease | The manually supplied direct Amazon link B00BV49G9K replaces the search fallback and includes the affiliate tag. Both rendered shopping buttons match this URL. Amazon returned an error for the full URL and a cache miss for the ASIN-only URL; product identity and tub size remain independently unverified. The existing photo shows 3g. |
| Vandoren AL3 mouthpiece | Amazon B0002D0KR8 matches SM711 AL3. The original AL5 image was replaced with the manufacturer's AL3 photo. |
| D'Addario Reserve X10 | Amazon B008JCVDSY matches X10. No mismatch found in the initial audit; unchanged. |
| Hite Bb clarinet mouthpiece | Amazon B004P59BGA matches H111 Premiere Bb. No mismatch found in the initial audit; unchanged. |
| Hite alto saxophone mouthpiece | Amazon B0002F4YUK matches H117 Premiere Alto. No mismatch found in the initial audit; unchanged. |
| K&M clarinet stand | Amazon B01BHJRUVO matches 15228.000.55. No mismatch found in the initial audit; unchanged. |
| Manhasset music stand | Amazon B0002E3AHE matches the model 50 orchestral stand. No mismatch found in the initial audit; unchanged. |
| ReedGeek Universal Classic | Amazon B07NSFBMVW matches the Universal Classic reed tool. No mismatch found in the initial audit; unchanged. |
| Traditional Bb clarinet reeds | Renamed to `vandoren-traditional-clarinet-reeds.md`. The new direct Amazon link B0002E1P08 matches CR103, Traditional Bb clarinet reeds, strength 3, box of 10. Replaces the earlier search link. The image also shows strength 3. |
| Traditional alto saxophone reeds | The manually supplied Amazon B00T8L27ZI matches SR213 Traditional alto saxophone reeds, strength 3, box of 10. Image and body match alto reeds. |
| V12 Bb clarinet reeds | The new direct Amazon link B00MO1XHB2 matches CR193, V12 Bb clarinet reeds, strength 3, box of 10. Replaces the earlier search link. Replaced the manufacturer's strength-3½+ photo with the listing's strength-3 photo, visually verified against the selected variant. |

There are now **11 direct product links and no search links**. La Tromba now uses the manually supplied B00BV49G9K listing. The three reed listings select strength 3, while the recommendation text remains strength-neutral. Product identity checks do not verify stock or checkout availability. Amazon listings and search results may change.

## Resolved follow-ups

- **Legacy routes:** `astro.config.mjs` redirects both `/gear/vandoren-alto-sax-reeds-2/` and the original WordPress `/vandoren-alto-sax-reeds-2/` to `/gear/vandoren-traditional-clarinet-reeds/`. Both redirect pages are generated and checked. With the current static build and no hosting adapter, Astro emits HTML meta-refresh redirects; a server-level HTTP 301 depends on deployment support. See [Astro redirect behavior](https://docs.astro.build/en/guides/routing/#configured-redirects).
- **V12 variant image:** Replaced with a strength-3 V12 box photo matching B00MO1XHB2.
- **Import mapping:** The importer still recognizes the historical WordPress slug, but maps it to `vandoren-traditional-clarinet-reeds.md` before checking whether existing content should be preserved. A normal re-import therefore preserves manual content and does not create a duplicate legacy entry.
- **Fallback reference:** Updated the image fallback key in `src/lib/site.ts` to the current Traditional clarinet slug.
- **Source provenance:** Restored the Traditional clarinet entry's original WordPress `sourceUrl`. The new public route remains controlled by the current filename; changing provenance does not change its shopping URL or generated route.

## Remaining limitation

La Tromba's direct listing B00BV49G9K could not be independently fetched during this update. Its URL and affiliate tag are verified in the source and rendered pages, but the listing's product identity and size cannot yet be compared with the 3g photo. The failed fetch is not evidence that the listing is incorrect. No other product-link or image mismatches remain from these checks.

## Affiliate handling

All 11 source shopping URLs include `tag=floridaclar00-20`. Both gear templates normalize Amazon URLs through `src/lib/affiliate.ts`, adding a missing tag or replacing stale/duplicate tags while preserving other query parameters. Links retain `nofollow sponsored noopener` and open in a new tab. Existing gear Markdown bodies contain no additional shopping links.

## Verification

- Fresh `npm run build`: passed; 26 content pages plus two redirect pages generated, with the existing empty blog collection warning.
- Rechecked after the La Tromba update: all 11 source shopping URLs are direct Amazon product links, with no search fallbacks.
- Parsed the generated gear index and all 11 current detail pages: all 22 shopping links match their entry's destination and have exactly one `floridaclar00-20` tag and the expected relationship attributes.
- All current index-to-detail links and local product image files exist.
- Confirmed the renamed Traditional clarinet route appears in the gear index, sitemap, `llms.txt`, and `llms-full.txt`; the old gear route appears in none of those indexes and instead has a generated redirect page.
- Ran the real WordPress importer in an isolated temporary copy: verified preservation of the manually edited entry and correct filename/provenance when importing a missing entry, without creating the old filename.
- Affiliate helper and templates are unchanged since the initial audit. The initial helper checks passed for missing, stale, duplicate, and existing tags, search parameters, and a non-Amazon host.
- This is local production-build verification, not a deployed-site audit. The production gear index could not be fetched during the initial audit and was not rechecked in this follow-up.

## Product evidence and replacement image sources

- [Vandoren AL3 Amazon listing](https://www.amazon.com/dp/B0002D0KR8)
- [D'Addario X10 Amazon listing](https://www.amazon.com/DAddario-Reserve-Clarinet-Mouthpiece-X10/dp/B008JCVDSY)
- [Hite H111 Amazon listing](https://www.amazon.com/Hite-H111-Premiere-Clarinet-Mouthpiece/dp/B004P59BGA)
- [Hite H117 Amazon listing](https://www.amazon.com/Hite-H117-Premiere-Saxophone-Mouthpiece/dp/B0002F4YUK)
- [K&M 15228 Amazon listing](https://www.amazon.com/dp/B01BHJRUVO)
- [Manhasset model 50 Amazon listing](https://www.amazon.com/dp/B0002E3AHE)
- [ReedGeek Classic Amazon listing](https://www.amazon.com/ReedGeek-Universal-Reed-Tool-Classic/dp/B07NSFBMVW)
- [Current La Tromba Amazon URL, B00BV49G9K](https://www.amazon.com/La-Tromba-Cork-Slide-Grease/dp/B00BV49G9K) — manually supplied; rendered URL/tag verified, product page fetch unsuccessful.
- [Earlier La Tromba retailer evidence for B002MXGKH0 (15g)](https://www.zasmusic.com/279-grasa-la-tromba.html) — a different ASIN, not evidence for the current listing.
- [Vandoren AL3 product page](https://vandoren.fr/en/vandoren-mouthpieces/al3-optimum-alto-saxophone-mouthpiece/) and [replacement image](https://vandoren.fr/wp-content/uploads/2018/12/image-47.png)
- [Vandoren V12 product page](https://vandoren.fr/en/vandoren-reeds/v%E2%80%A212-bb-clarinet-reeds/) and [earlier image, superseded because it shows strength 3½+](https://vandoren.fr/wp-content/uploads/2018/12/bte-10-anches-v12-clar-Sib-768x911.jpg)
- [Traditional Bb clarinet CR103, strength 3, Amazon listing](https://www.amazon.com/Vandoren-CR103-Clarinet-Traditional-Strength/dp/B0002E1P08) — checked after the manual update.
- [V12 Bb clarinet CR193, strength 3, Amazon listing](https://www.amazon.com/Vandoren-CR193-Clarinet-Reeds-Strength/dp/B00MO1XHB2) — checked after the manual update.
- [Traditional alto saxophone SR213, strength 3, Amazon listing](https://www.amazon.com/Vandoren-SR213-Traditional-Reeds-Strength/dp/B00T8L27ZI) — verified after the sax reed update.
- [Current V12 strength-3 image](https://m.media-amazon.com/images/I/51gLNDkEtQL.jpg) — from the linked Amazon listing, visually verified.
