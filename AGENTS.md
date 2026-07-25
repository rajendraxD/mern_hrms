# Skill-Driven Workflow Rules

This file enforces the skill-driven development workflow. It complements the global MERN stack rules.

## Core Rule

Before taking any action, check if a skill applies. If one does, it MUST be used.

## Lifecycle Mapping

- DEFINE → `spec-driven-development`
- PLAN → `planning-and-task-breakdown`
- BUILD → `incremental-implementation` + `test-driven-development`
- VERIFY → `debugging-and-error-recovery`
- REVIEW → `code-review-and-quality`
- SHIP → `shipping-and-launch`

## Intent-to-Skill Mapping

- "build a feature" → `incremental-implementation` (+ `test-driven-development`)
- "design a system" / "design a feature" → `spec-driven-development`
- "fix a bug" / "this is broken" → `debugging-and-error-recovery`
- "review this code" / "review this PR" → `code-review-and-quality`
- "plan this change" → `planning-and-task-breakdown`
- "optimize performance" → `performance-optimization`
- "write docs for" / "document this" → `documentation`
- "write tests for" → `test-driven-development`
- "shore up security" / "harden this" → `security-and-hardening`
- "ship this" / "launch this" → `shipping-and-launch`

## Agent Expectations

1. Always check if a skill applies before acting
2. If a skill applies, it MUST be used (invoke the `skill` tool)
3. Never skip required workflows (spec, plan, test, etc.)
4. Do not jump directly to implementation - follow the lifecycle
5. Follow the skill's instructions exactly once loaded

## Skill Discovery

Skills are in:
- `C:\Users\Admin\.agents\skills\` (global skills)
- `.agents/skills/` (project-local skills)
- Available via the `skill` tool (listed as `available_skills` in system prompt)
