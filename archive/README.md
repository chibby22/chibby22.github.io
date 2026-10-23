# Archived Kynected Events implementation

Events are intentionally absent from the active navigation, pages and API routes.

- The former Events signup API is preserved in `events-api-route.ts` (kept outside `app/`, so Next.js does not expose it as an endpoint).
- The prior homepage/events markup and its client behavior remain in `lib/homeMarkup.ts` and `components/SiteClient.tsx`; the active pages no longer import either file.
- A complete pre-restructure working-tree checkpoint is also available in Git stash as `checkpoint-before-multipage-restructure-2026-10-09`.

To restore the old experience, restore the checkpoint or move the archived event section and route back into `app/`, then update its links and environment configuration before deploying. Do not blindly restore the entire old homepage over the new division pages.
