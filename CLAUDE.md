# CLAUDE.md

This file provides guidance to Claude Code and other AI assistants working on the `vacation-planning-assistant` repository.

## Project Overview

**vacation-planning-assistant** is an AI-powered application for planning holidays/vacations. The project is in its **initial/early stage** — as of the last update, only a README exists. No application code, dependencies, or configuration has been committed yet.

- **Repository:** `ncheungcy/vacation-planning-assistant`
- **Default branch:** `main`
- **Description:** AI-powered app for planning holidays

## Current State

The repository currently contains only:
- `README.md` — one-line description of the project

No framework, language, or toolchain has been selected yet. When starting development, follow the conventions established in this file or update this document to reflect the chosen stack.

## Development Workflow

### Branch Strategy

- All feature work must be done on a dedicated branch, never directly on `main`.
- Branch naming convention: `<type>/<short-description>` (e.g., `feat/trip-search`, `fix/date-picker-bug`, `claude/add-feature-xyz`).
- Keep `main` stable and production-ready.

### Git Commits

- Write clear, descriptive commit messages in imperative mood (e.g., "Add trip search endpoint", not "Added" or "Adding").
- Commit signing is enabled on this repository — do not bypass it (`--no-verify`, `--no-gpg-sign`).
- Make atomic commits: one logical change per commit.

### Pull Requests

- Do NOT create a pull request unless explicitly asked by the user.
- Push completed work to the feature branch and let the user decide when to open a PR.

## Coding Conventions (To Be Established)

Since the stack has not yet been chosen, the following are recommendations for when development begins. Update this section once decisions are made.

### General Principles

- Prefer clarity over cleverness — write readable, self-documenting code.
- Keep functions small and single-purpose.
- Validate all external inputs (user data, API responses) at system boundaries; trust internal code.
- Do not add error handling for scenarios that cannot happen.
- Do not add features, abstractions, or comments beyond what is currently needed.

### AI Integration

Since this is an AI-powered application, follow these practices for Claude API / LLM integrations:
- Use the latest capable Claude model (currently `claude-sonnet-4-6` for balanced performance, `claude-opus-4-6` for complex reasoning).
- Store API keys in environment variables, never hard-code credentials.
- Handle API errors gracefully at the boundary (timeout, rate limit, malformed response).
- Keep prompts versioned alongside code — treat prompt changes as code changes.

### Security

- Never commit secrets, API keys, or credentials (use `.env` files, excluded via `.gitignore`).
- Sanitize all user-supplied input before passing to any AI model or external service.
- Be careful with user data — vacation data may include PII (dates, locations, passport info).

## Environment Setup (Placeholder)

Once the stack is chosen, document setup steps here. Expected sections:

```
# Install dependencies
<package manager install command>

# Configure environment
cp .env.example .env
# Edit .env with your API keys (ANTHROPIC_API_KEY, etc.)

# Run development server
<dev command>

# Run tests
<test command>
```

## Key Files (Placeholder)

Document important files here as the project grows:

| File/Directory | Purpose |
|---|---|
| `README.md` | Project overview |
| `CLAUDE.md` | AI assistant guidance (this file) |
| _(to be added)_ | Application entry point |
| _(to be added)_ | Core AI/LLM integration logic |
| _(to be added)_ | Environment variable definitions |

## Testing

- Write tests for all new features before merging to `main`.
- Tests should be runnable with a single command.
- Do not mock internal application logic — only mock external services (APIs, databases).
- Update this section with the chosen test framework and commands once established.

## Working With the Owner

The owner of this project (ncheungcy) is **not a developer**. They are building this as a personal app and learning as they go. Claude must adapt accordingly:

### Communication style
- Explain decisions in plain English, not technical jargon.
- When multiple options exist, present them as simple trade-offs ("Option A is faster to build but harder to change later; Option B takes longer but is more flexible").
- Always say what you're about to do before doing it, and summarize what you did after.
- If a request is vague, ask one clarifying question before proceeding — don't guess and build the wrong thing.

### Protecting against accidental bad prompts
- If the user asks for something that would delete data, break existing features, or require a big refactor, **pause and confirm** before acting — even if they sound certain.
- If a request contradicts a decision already made (e.g., switching frameworks mid-build), flag it: "This would mean rebuilding X from scratch — is that what you want?"
- If the user says something like "just make it work" or "do whatever you think is best", default to the **simplest possible approach** and explain what you chose.
- Never make more than one feature's worth of changes in a single response without checking in.

### Session discipline
- At the start of each session, briefly summarize: current state of the app, what was last worked on, and what the logical next step is.
- At the end of a working session (when the user says they're done), summarize what changed and suggest updating CLAUDE.md if any new decisions were made.
- Keep one feature in focus per session. If the user jumps topics, note it and ask if they want to finish the current thing first.

### When to push back
- If a feature request would make the app significantly more complex than needed, suggest a simpler alternative first.
- If the user asks you to skip tests, skip commits, or take shortcuts, explain the risk briefly — then respect their choice.

## Rules to Minimise Common Mistakes

### Against over-building
- Build only what was explicitly asked for. No extras, no "while I'm here" additions.
- If the simplest implementation covers the request, use it — do not add configurability, edge case handling, or future-proofing that wasn't asked for.
- If you think something extra is genuinely important, mention it *after* completing the task, not during.

### Against scope drift
- Before starting any task, state exactly which files you plan to change.
- Only touch files directly required by the task. If you find yourself editing an unrelated file, stop and ask.
- After completing a task, list every file that was changed. If the user didn't expect a file to be on that list, they should ask why.

### Against confident wrongness
- If you are not certain something will work, say so explicitly: "I believe this will work, but we should test it."
- Do not say a feature is supported, a library works a certain way, or an approach is correct unless you have verified it in the code — not just from memory.
- If something doesn't work after you said it would, lead with "I was wrong about X" before proposing a fix.

### Against losing context between sessions
- At the start of every session, read CLAUDE.md and the most recent commits to understand current state.
- Never assume the code is in the same state as a previous session — always check.
- When a significant decision is made (framework chosen, feature design agreed, approach changed), update CLAUDE.md immediately, not later.

### Against fixing symptoms instead of causes
- When fixing a bug, explain the root cause before writing any code.
- After a fix, state whether the same root cause could cause the same problem elsewhere, and check if it does.
- Do not patch error messages or add try/catch around broken logic — fix the logic.

### Against dependency creep
- Before installing any new package or library, ask: "Can this be done with what is already installed?"
- If a new dependency is genuinely needed, name it, explain why, and confirm with the user before adding it.
- Prefer standard library / built-in solutions over third-party packages for simple tasks.

### Against building what was said rather than what was meant
- For any action that is destructive or irreversible (delete, overwrite, clear), always add a confirmation step in the UI — even if the user didn't ask for one.
- For any user-facing feature, consider the "what if I do this by accident?" scenario and handle it sensibly.
- If a request is ambiguous about what should happen in edge cases, ask before building.

## What NOT To Do

- Do not push directly to `main`.
- Do not commit `.env` files or any file containing secrets.
- Do not add dependencies without confirming with the user.
- Do not create documentation files (`.md`) unless explicitly asked.
- Do not make "improvements" to surrounding code when fixing a specific bug.
- Do not use `--no-verify` or bypass git hooks.
- Do not open pull requests autonomously.
