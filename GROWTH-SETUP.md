# Menscents — growth edition setup

## What is implemented
- Scent Finder 2.0: three differentiated matches, strict relative price-tier ceiling, shareable URL, editorial reasoning, Amazon tagged search links.
- Compare Any Two: searchable selectors for the eight published profiles, shareable comparisons, side-by-side data.
- Structured catalog: `assets/catalog.json` (editorial source) and `assets/catalog.js` (static browser bundle). Keep both in sync when adding profiles.
- Editorial research queue: 45 named *unverified* candidates in `editorial/research-queue.json`; these are not published profiles.
- GitHub Actions: weekly planning issue and static quality checks. No auto-publishing.
- Analytics instrumentation: affiliate clicks, outbound clicks, finder completions and comparisons, *only* when a Plausible account is configured.
- Newsletter form integration hook, hidden until a provider is configured; no emails collected or subscribers claimed.

## Required connections before claiming the full growth system is live
1. Set up Google Search Console and verify `menscents.com`; submit `/sitemap.xml`. This cannot be done from a ZIP.
2. Create Plausible account (or adapt instrumentation for another provider). In `assets/config.js`, set `analyticsDomain` to the domain configured in Plausible. Verify analytics events in provider dashboard. Review privacy disclosure for chosen vendor.
3. Choose an email service with a secure hosted form endpoint and double opt-in. Set `newsletterEndpoint` in `assets/config.js` only after verifying form field names, opt-in behavior, privacy policy and successful subscription. The default form is hidden, with an honest coming-soon message.
4. Push the extracted contents to GitHub root and connect to Vercel. Enable GitHub Actions. Verify weekly issue creation and quality check permissions.
5. For 50 published profiles: research and fact-check 42 additional products, write original editorial pages, and update catalog, sitemap and internal links. The 45-name queue is NOT 45 finished profiles.
6. For 20+ guides: research, write and fact-check more content. No fabricated testing or synthetic personal reviews.
7. Validate Amazon Associates account/tag `bnsn-20` and Amazon policy, especially wording and search links; test actual click-through.
8. Perform browser/mobile QA and check image usage rights before production deployment.

## Security & privacy
No API keys are embedded. No personal email is stored by the website without an activated provider. Analytics does not load until explicitly configured. Publishing stays human-reviewed.
