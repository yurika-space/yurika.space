# Site Redesign — Full IA (Option C)

**Date:** 2026-05-21  
**Status:** Approved — implementation in progress

## Scope

Full redesign: unified app shell (sidebar + founder stepper), split founder routes, missing curator/founder screens, marketing dual-path hero, backend auto-complete on funding goal.

## Routes

| Route | Purpose |
|-------|---------|
| `/app` | Founder overview dashboard |
| `/app/projects` | Project list + create |
| `/app/projects/[id]` | Project detail / edit |
| `/app/domains` | Domain list |
| `/app/domains/vault` | Vault wizard |
| `/app/domains/[id]` | Domain + campaign detail |
| `/app/launch` | Tokenomics / publish |
| `/app/campaigns/[id]` | Founder campaign dashboard |
| `/app/forge` | Forge milestones |
| `/app/portfolio` | Curator holdings |
| `/app/portfolio/holdings/[id]` | Holding receipt |
| `/marketplace/[id]/invest/success` | Post-invest confirmation |

Hash redirects: `/app#project` → `/app/projects`, `/app#launch` → `/app/launch`.

## Defaults

- **Goal reached:** auto-set `domain.status = completed` when `funding_raised_usd >= funding_target_usd` on invest.
- **Post-invest:** dedicated success page (not toast-only).

## Design system

Terminal Neon Ledger — unchanged tokens; elevated layout via `AppShell`, `TerminalPanel`, `FundingProgress`.
