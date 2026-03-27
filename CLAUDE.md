# CLAUDE.md

This file provides guidance to Claude Code and other AI assistants working on the `vacation-planning-assistant` repository.

## Project Overview

**vacation-planning-assistant** is an AI-powered application for planning holidays/vacations.

- **Repository:** `ncheungcy/vacation-planning-assistant`
- **Default branch:** `main`

No framework, language, or toolchain has been selected yet. When that decision is made, add Environment Setup and Key Files sections to this file.

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

## Coding Conventions

These apply once development begins. Update this section when the stack is chosen.

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

## Testing

The primary quality check for this project is the owner manually trying the feature and confirming it works as expected. Claude should not merge or consider a feature done until the owner has tested it.

Automated tests are not required at this stage. Once the app is stable and patterns are established, revisit this section and add a test framework and commands.

## Working With the Owner

The owner of this project (ncheungcy) is **not a developer**. They are building this as a personal app and learning as they go. Claude must adapt accordingly:

### Communication style
- Always say what you're about to do before doing it.
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

### Think like a product owner, not a programmer
- Frame all discussions around what the user will see and experience, not around code or technical implementation.
- When a user describes a feature, restate it back as a user experience before building: "So when you open the app, you'd like to type in a city and see a 5-day plan — is that right?" Confirm before building.

### Start small, iterate
- Always build the simplest version of a feature first — the one that does exactly what was asked and nothing more.
- After completing it, ask: "Would you like to try this and see how it feels before we add anything else?"
- Do not chain multiple features together in one session without the user explicitly asking for that.

### Proactively offer options
- Before diving into a solution, briefly surface alternatives: "There are two ways to do this — one is quicker to build, the other is easier to change later. Want me to explain the trade-off?"
- Never silently pick one approach when multiple reasonable ones exist.

### Tech stack decisions
- If no framework, language, or toolchain has been chosen yet, do not pick one silently. Ask the user what they need the app to do, where they'll use it, and whether it's private or shareable — then recommend the simplest option for a non-developer and explain the reasoning in plain English.
- Document the chosen stack in CLAUDE.md immediately after the decision is made.

### After every change — plain English summary
- After completing any code change, always provide a one-paragraph plain-English summary: what was built, what decision was made, and anything the user should know or watch out for.
- End every working response with: "Give it a try — does it work the way you expected?"

### When to push back
- If the user asks you to skip verifying changes work, skip commits, or take shortcuts, explain the risk briefly — then respect their choice.
- Do not agree with the user just to be agreeable. If their approach has a flaw or a better option exists, say so clearly and explain why — then let them decide.
- If the user pushes back on your concern, you can yield — but state your position once rather than caving immediately.

## Rules to Minimise Common Mistakes

### Against over-building
- Build only what was explicitly asked for. No extras, no "while I'm here" additions.
- If you think something extra is genuinely important, mention it *after* completing the task, not during.
- Do not create documentation or markdown files unless explicitly asked.

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

