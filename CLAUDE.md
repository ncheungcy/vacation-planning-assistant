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

## What NOT To Do

- Do not push directly to `main`.
- Do not commit `.env` files or any file containing secrets.
- Do not add dependencies without confirming with the user.
- Do not create documentation files (`.md`) unless explicitly asked.
- Do not make "improvements" to surrounding code when fixing a specific bug.
- Do not use `--no-verify` or bypass git hooks.
- Do not open pull requests autonomously.
