# Start here: free SEO Dashboard Agent prompt pack

## Codex

1. Download this folder.
2. Copy `AGENTS.md` into the root of the website repository.
3. Start a new Codex session from that repository so it discovers the instructions.
4. Ask: `Audit this site and propose the first safe local SEO dashboard build. Do not deploy or perform external actions.`
5. Review the audit and approve work in batches.

Codex reads repository `AGENTS.md` files before work and combines instructions from the project root toward the current directory. A closer nested instruction file can refine broader guidance.

## Claude

1. Copy both `AGENTS.md` and `CLAUDE.md` into the repository root.
2. Give Claude access to the repository.
3. Ask it to read both files completely before taking action.
4. Start with the first task in `CLAUDE.md`.
5. Keep deployment, profile creation and outreach approval-gated.

## Data you may connect later

- Google Search Console
- Your analytics platform
- Sitemap and crawl results
- Approved backlink provider or export
- Google Business Profile or other eligible directory data
- Form-conversion events

Never paste API keys into prompts or commit secrets to the repository. Use environment variables and the platform’s approved authentication method.
