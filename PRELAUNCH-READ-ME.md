# Menscents — verified prelaunch candidate (2026-11-19)

## What this package includes
- The approved compact editorial homepage, with the hero and three distinct editorial images preserved.
- Eight research-led fragrance profiles, editorial articles, guides and comparisons.
- Interactive Scent Finder with shareable result URLs and relative price-tier filtering.
- Compare Any Two tool backed by the published eight-profile catalog.
- Research queue for future products, *not* 45 published articles.
- GitHub Actions for weekly planning and site validation; publishing still requires review.
- Analytics and newsletter integration hooks, both disabled until real provider accounts are connected.

## Last-mile tasks requiring account access
1. Deploy to Vercel preview and manually verify mobile/tablet/desktop, navigation, comparison and finder.
2. Verify the domain and submit the sitemap in Google Search Console.
3. Configure a real analytics service and verify events; do not claim conversion reporting is live until then.
4. Configure an email platform, consent and opt-in before enabling newsletter registration.
5. Confirm Amazon Associates account status, tag `bnsn-20`, and current policies; Amazon links go to tagged search results, not verified ASIN product listings.
6. Confirm rights/permissions for all imagery and research accuracy for each product.
7. Enable GitHub Actions in the repository and check workflow permissions.

## Automated validation
`python scripts/check_site.py` and `node --check assets/*.js` (run per JS file). This includes checking for missing files, image alt text, titles, canonical URLs, sitemap coverage, catalog consistency, and affiliate tags. Browser QA results, if available, are recorded separately.

**Do not confuse static checks with external service activation or real-world retailer verification.**
