# Git Branch Naming Convention

Standardized branch names for this Drupal 11 project. Use lowercase, hyphens between words, and the format: **`type/short-description`** or **`type/ticket-id-short-description`** when a ticket exists.

---

## Format

```
<type>/<description>
```

- **type**: One of the prefixes below (e.g. `feature`, `fix`, `hotfix`).
- **description**: Short, kebab-case description (e.g. `contact-form-recaptcha`, `user-login-redirect`).
- **Optional ticket ID**: If you use an issue tracker, include it: `feature/PROJ-123-add-blog-listing`.

---

## Branch Types

### New features

| Prefix   | Use for |
|----------|--------|
| `feature/` | New functionality, new modules, new content types, new views, new blocks, new APIs. |

**Examples**

- `feature/contact-form-recaptcha`
- `feature/blog-listing-page`
- `feature/custom-search-block`
- `feature/PROJ-45-appointment-booking`

---

### Bug fixes

| Prefix | Use for |
|--------|--------|
| `fix/`  | Bug fixes on existing functionality (non-urgent). |

**Examples**

- `fix/contact-form-validation-error`
- `fix/views-cache-invalidation`
- `fix/redirect-loop-login`
- `fix/PROJ-78-menu-cache-stale`

---

### Hotfixes (production)

| Prefix    | Use for |
|-----------|--------|
| `hotfix/` | Critical fixes that must go to production immediately (security, data loss, site down). |

**Examples**

- `hotfix/security-patch-contact-form`
- `hotfix/restore-checkout-flow`
- `hotfix/PROJ-99-xss-contact-field`

---

### Refactoring

| Prefix        | Use for |
|---------------|--------|
| `refactor/`   | Code/style improvements without changing behavior. |

**Examples**

- `refactor/cleanup-contact-form-handler`
- `refactor/theme-templates-structure`
- `refactor/config-split-setup`

---

### Drupal / dependency updates

| Prefix      | Use for |
|-------------|--------|
| `update/`   | Core upgrades, contrib module updates, Composer dependency updates. |

**Examples**

- `update/drupal-core-11-1`
- `update/contrib-modules-march-2025`
- `update/php-8-3-compatibility`

---

### Configuration and DevOps

| Prefix       | Use for |
|--------------|--------|
| `config/`    | Configuration changes (features, config export, env-specific config). |
| `devops/` or `ci/` | CI/CD, deployment, Docker, scripts. |

**Examples**

- `config/contact-form-fields`
- `config/ignore-config-split`
- `devops/docker-compose-local`
- `ci/github-actions-drupal`

---

### Theming and frontend

| Prefix   | Use for |
|----------|--------|
| `theme/` | CSS, JS, Twig, design system, accessibility. |

**Examples**

- `theme/contact-form-styles`
- `theme/mobile-menu-improvements`
- `theme/accessibility-focus-styles`

---

### Documentation and chores

| Prefix   | Use for |
|----------|--------|
| `docs/`  | README, inline docs, BRANCH_NAMING.md, runbooks. |
| `chore/` | Tooling, lint, cleanup, no functional change. |

**Examples**

- `docs/api-contact-module`
- `docs/deployment-runbook`
- `chore/composer-dependency-audit`
- `chore/phpcs-rules-update`

---

### Experiments and spikes

| Prefix   | Use for |
|----------|--------|
| `spike/` or `experiment/` | Proof of concept, technical exploration (may not be merged as-is). |

**Examples**

- `spike/decoupled-preview`
- `experiment/headless-contact-form`

---

### Generic / miscellaneous

| Prefix     | Use for |
|------------|--------|
| `generic/` | Unrelated or mixed tasks that don’t fit other types: enabling/setting up contrib modules, one-off setup, small unrelated changes in one branch. |

**Examples**

- `generic/enable-and-setup-contrib-modules`
- `generic/recaptcha-metatag-sitemap-setup`
- `generic/contrib-modules-initial-setup`
- `generic/environment-indicator-config-ignore`

---

## Quick reference

| Type        | Prefix        | Example |
|------------|---------------|---------|
| New feature | `feature/`    | `feature/appointment-booking` |
| Bug fix     | `fix/`        | `fix/login-redirect-loop` |
| Urgent fix  | `hotfix/`     | `hotfix/security-contact-form` |
| Refactor   | `refactor/`   | `refactor/contact-handler` |
| Updates    | `update/`     | `update/contrib-modules` |
| Config     | `config/`     | `config/contact-form-fields` |
| DevOps/CI  | `devops/` or `ci/` | `devops/docker-local` |
| Theming    | `theme/`      | `theme/mobile-menu` |
| Docs       | `docs/`       | `docs/branch-naming` |
| Chore      | `chore/`      | `chore/phpcs-update` |
| Spike      | `spike/`      | `spike/decoupled-preview` |
| Generic    | `generic/`    | `generic/contrib-modules-setup` |

---

## Rules of thumb

1. **Keep it short**: 2–4 words in the description; details go in commits and MR/PR.
2. **Use kebab-case**: `contact-form-recaptcha`, not `contactFormRecaptcha` or `contact_form_recaptcha`.
3. **No slashes in the description**: Only one `/` (between type and description).
4. **Ticket ID optional**: If you use Jira/Linear/etc., e.g. `feature/PROJ-123-blog-listing` is fine.
5. **Base branches**: Typically `main` or `dev`; create feature/fix branches from the right base (e.g. `hotfix/` from `main`, `feature/` from `dev`).

---

## Drupal-specific notes

- For **config changes**, prefer `config/` so it’s clear they may need export/import.
- For **core or contrib upgrades**, use `update/` and mention the target version.
- **Custom modules**: `feature/` (e.g. `feature/custom-appointments-module`).
- **Patches**: Usually part of a `fix/` or `update/` branch; mention in the MR/PR title.
- **Enabling/setting up contrib modules** (no new feature, no fix): use `generic/` (e.g. `generic/enable-contrib-modules-setup`).

This convention keeps branch names consistent and makes it easy to filter and review by type (e.g. `git branch --list 'feature/*'`).
