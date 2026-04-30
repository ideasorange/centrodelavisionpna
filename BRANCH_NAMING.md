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

| Prefix        | Use for |(new)
+15
￼
￼
### Generic / miscellaneous| Prefix     | Use for ||------------|--------|| `generic/` | Unrelated or mixed tasks that don’t fit other types: enabling/setting up contrib modules, one-off setup, small unrelated changes in one branch. |
BRANCH_NAMING.md(new)
+1
￼
| Spike      | `spike/`      | `spike/decoupled-preview` |
￼
| Spike      | `spike/`      | `spike/decoupled-preview` || Generic    | `generic/`    | `generic/contrib-modules-setup` |
Thought
1s
Adding a Drupal-specific note for when to use generic/:
BRANCH_NAMING.md(new)
+1
￼
- **Patches**: Usually part of a `fix/` or `update/` branch; mention in the MR/PR title.
￼
- **Patches**: Usually part of a `fix/` or `update/` branch; mention in the MR/PR title.- **Enabling/setting up contrib modules** (no new feature, no fix): use `generic/` (e.g. `generic/enable-contrib-modules-setup`).
Thought
1s
Summary of changes:
New section "Generic / miscellaneous"
Prefix: generic/
Use for: unrelated or mixed work that doesn’t fit other types (e.g. enabling and configuring contrib modules, one-off setup, small unrelated changes in one branch).
Examples:
generic/enable-and-setup-contrib-modules
generic/recaptcha-metatag-sitemap-setup
generic/contrib-modules-initial-setup
generic/environment-indicator-config-ignore
Quick reference table
Added a row: Generic | generic/ | generic/contrib-modules-setup
Drupal-specific notes
Added a bullet: use generic/ when you’re only enabling/setting up contrib modules (no new feature, no fix), e.g. generic/enable-contrib-modules-setup.
So for branches where you enable and configure contrib modules (recaptcha, metatag, config_ignore, etc.) without a single feature or fix, you can use names like generic/contrib-modules-setup or generic/recaptcha-metatag-sitemap-setup.
I'm goining to create my local settings file in order to setup local stage properties, environment-indicator colors, cache settings, hash, and so... could you do it for me? Have in mind that I'm gonna have one in dev and other in prod stages

4 of 4 To-dos Completed
Thought
14s
Checking how settings and environment configuration are set up in the project.
Explored3 files 2 searches
Checking how environment_indicator and config_split determine the active environment:
Explored3 files 3 searches
Checking .gitignore and config sync directory:
Explored1 file 2 searches
Creating settings.dev.php and settings.prod.php, and updating settings.php to load the appropriate file based on environment.
To-dos
4
Create settings.dev.php with dev stage overrides
Create settings.prod.php with prod stage overrides
Update settings.php to include dev/prod based on DRUPAL_ENV
Update .gitignore and add short README for local settings
Thought
1s
settings.dev.php(new)
+64
￼
￼
<?php/** * @file * Development environment overrides.
Explored1 fileCompleted 1 of 4 to-dos
settings.prod.php(new)
+57
￼
￼
<?php/** * @file * Production environment overrides.
Thought
1s
settings.php
+21
-13
￼
/** * Load local development override configuration, if available. * * Create a settings.local.php file to override variables on secondary (staging, * development, etc.) installations of this site.
￼
 * Load local development override configuration, if available. * Create a settings.local.php file to override variables on secondary (staging, * development, etc.) installations of this site./** * Environment-specific settings (dev vs prod). *
Started to-do
Update settings.php to include dev/prod based on DRUPAL_ENV
Thought
7s
Adding settings.local.php to .gitignore and a short README for local settings.
Read
.gitignore
Thought
1s
.gitignore
+1
￼
/settings.ddev.php/drushrc.php
￼
/settings.ddev.php/settings.local.php/drushrc.php
README.settings.md(new)
+45
￼
￼
# Local and environment-specific settingsThis project uses **environment-specific settings** so you can have different behavior and config for **dev** and **prod**.## How it works
Completed 4 of 4 to-dos
Including settings.local.php after the env file so we can override with machine-specific values (e.g. DB credentials):
settings.php
+5
￼
￼
// Optional: per-machine overrides (e.g. database, hash_salt). Loaded after env file.if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {  include $app_root . '/' . $site_path . '/settings.local.php';}
Thought
8s
Including settings.local.php after the env file when it exists, and avoiding double-include when the env file is missing.
settings.php
+1
-1
￼
// Optional: per-machine overrides (e.g. database, hash_salt). Loaded after env file.if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
￼
// Optional: per-machine overrides (e.g. database, hash_salt). Loaded after env file.// Per-machine overrides (e.g. database, hash_salt). Loaded last so they override env defaults.if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
Thought
19s
Including settings.local.php only once at the end so it can override the env file.
settings.php
-3
￼
}elseif (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {  include $app_root . '/' . $site_path . '/settings.local.php';}
￼
elseif (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {  include $app_root . '/' . $site_path . '/settings.local.php';}}
Thought
3s
Updating the README to state that settings.local.php is always loaded after the env file when present.
README.settings.md(new)
+4
-4
￼
- **`settings.php`** loads one of:  - **`settings.prod.php`** when `DRUPAL_ENV=prod`  - **`settings.dev.php`** otherwise (default)  - **`settings.local.php`** only if neither dev nor prod file exists (legacy fallback)
￼
- **`settings.php`** loads one of:  - **`settings.prod.php`** when `DRUPAL_ENV=prod`  - **`settings.dev.php`** otherwise (default)  - **`settings.local.php`** only if neither dev nor prod file exists (legacy fallback)- **`settings.php`** loads:  - **`settings.prod.php`** when `DRUPAL_ENV=prod` (if the file exists)  - **`settings.dev.php`** otherwise (if the file exists)  - **`settings.local.php`** afterward if it exists (per-machine overrides; not committed)
README.settings.md(new)
+1
-1
￼
   - Use `settings.dev.php` as-is (it’s loaded by default when `DRUPAL_ENV` is not `prod`).     - For machine-specific values (e.g. DB), add `settings.local.php` (copy from `example.settings.local.php` if needed); it is loaded only when neither `settings.dev.php` nor `settings.prod.php` exists, so prefer editing `settings.dev.php` for shared dev defaults.
￼
   - For machine-specific values (e.g. DB), add `settings.local.php` (copy from `example.settings.local.php` if needed); it is loaded only when neither `settings.dev.php` nor `settings.prod.php` exists, so prefer editing `settings.dev.php` for shared dev defaults.   - Use `settings.dev.php` as-is (it’s loaded by default when `DRUPAL_ENV` is not `prod`).     - For machine-specific values (e.g. DB, hash_salt), add `settings.local.php` (copy from `example.settings.local.php` if needed). It is always loaded last when present, so it overrides dev/prod defaults.
Thought
1s
Summary of what’s in place:
1. web/sites/default/settings.dev.php (dev)
Environment indicator: name DEV, green bar (#81d742).
Config Split: dev split on, prod off.
Development services: uses development.services.yml (null caches, etc.).
Performance: verbose logging; CSS/JS aggregation off; render, page, and dynamic page cache disabled.
Security: rebuild_access and skip_permissions_hardening enabled.
Optional: hash_salt, config_exclude_modules (commented).
2. web/sites/default/settings.prod.php (prod)
Environment indicator: name PROD, red bar (#c0392b).
Config Split: prod split on, dev off.
Hash salt: from $_ENV['DRUPAL_HASH_SALT'] (commented block to set it manually).
Trusted host patterns: commented example for your production domains.
3. web/sites/default/settings.php (load order)
If DRUPAL_ENV=prod and settings.prod.php exists → load settings.prod.php.
Otherwise, if settings.dev.php exists → load settings.dev.php.
If settings.local.php exists → always load it after the env file (so local overrides win).
So: set DRUPAL_ENV=prod only on production (Apache/Nginx/PHP-FPM or your deploy config). Locally, don’t set it (or set anything else) to use dev.
4. .gitignore
settings.local.php is ignored so machine-specific data isn’t committed.
5. web/sites/default/README.settings.md
Short guide: how dev/prod and settings.local.php work, config split IDs, and DDEV.
Config Split: In Configuration → Development → Configuration synchronization → Split configuration, create two splits with machine names dev and prod. The settings files only toggle their status; the split config (folder, conditional modules, etc.) is defined in the UI.
Production: On the server, set DRUPAL_ENV=prod, ensure settings.prod.php is present, set a unique hash_salt (e.g. via DRUPAL_HASH_SALT and the block in settings.prod.php), and set trusted_host_patterns to your real domains.
ok but I dont want synchronize in git the dev and prod files, I have the database pass and info in those files, what if we just have a settings.local.php file not included in git and create it one in each envirnomnet (local, dev, and prod)?

Thought
34s
Switching to a single settings.local.php (not in git) that we create per environment. Simplifying settings.php, removing dev/prod-specific logic, and adding example templates we can commit.
Explored3 files
settings.php
+6
-20
￼
/** * Environment-specific settings (dev vs prod). * * Set DRUPAL_ENV=prod on production; leave unset or set to anything else for dev. * - Prod: loads settings.prod.php when DRUPAL_ENV=prod and file exists.
￼
 * Environment-specific settings (dev vs prod). * Set DRUPAL_ENV=prod on production; leave unset or set to anything else for dev. * - Prod: loads settings.prod.php when DRUPAL_ENV=prod and file exists. * - Dev:  loads settings.dev.php when the file exists. * - Fallback: loads settings.local.php if present (legacy / per-machine overrides)./** * Local / environment-specific settings (not in git). *
Read
example.settings.local.php
Thought
5s
Creating example templates and updating the README.
example.settings.local.dev.php(new)
+59
￼
￼
<?php/** * @file * Example settings.local.php for LOCAL and DEV environments.
example.settings.local.prod.php(new)
+51
￼
￼
<?php/** * @file * Example settings.local.php for PRODUCTION environment.
settings.dev.php
Deleted
settings.prod.php
Deleted
Thought
1s
.gitignore
+2
￼
/settings.local.php/drushrc.php
￼
/settings.local.php/settings.dev.php/settings.prod.php/drushrc.php
README.settings.md(new)
+19
-31
￼
# Local and environment-specific settingsThis project uses **environment-specific settings** so you can have different behavior and config for **dev** and **prod**.
￼
# Local and environment-specific settingsThis project uses **environment-specific settings** so you can have different behavior and config for **dev** and **prod**.# Local settings (one file per environment, not in git)All environment-specific and sensitive settings live in **`settings.local.php`**. This file is **not** in git. You create it on each environment (local, dev, prod) with the right content for that environment.
Thought
3s
Adding a note to the dev example for DDEV users: omit or comment out the database block so DDEV's DB settings are used.
example.settings.local.dev.php(new)
+2
-1
￼
// -----------------------------------------------------------------------------// Database (required unless DDEV provides it via settings.ddev.php)// -----------------------------------------------------------------------------
￼
// Database (required unless DDEV provides it via settings.ddev.php)// -----------------------------------------------------------------------------// Database (required when not using DDEV; if using DDEV, omit or comment out—// settings.ddev.php already sets $databases)// -----------------------------------------------------------------------------
Thought
3s
Summary of what’s in place:
1. Single file: settings.local.php (not in git)
settings.php only includes settings.local.php when it exists.
You create settings.local.php on each environment (local, dev, prod) and put everything there: database, hash_salt, env indicator, config split, cache, etc.
settings.local.php is in .gitignore, so it’s never committed.
2. Removed dev/prod-specific includes
The previous logic that loaded settings.dev.php / settings.prod.php from settings.php is removed.
settings.dev.php and settings.prod.php have been deleted.
3. Example templates (committed)
example.settings.local.dev.php – template for local and dev: DB (with a note to omit it when using DDEV), hash_salt, env indicator “DEV” (green), config split dev on/prod off, dev services, cache off, rebuild_access, etc.
example.settings.local.prod.php – template for prod: DB, hash_salt, trusted_host_patterns, env indicator “PROD” (red), config split prod on/dev off.
You (or the team) copy the right example to settings.local.php on each environment and fill in real values; those files stay out of git.
4. .gitignore
settings.local.php – ignored (unchanged).
settings.dev.php and settings.prod.php – ignored so they’re never committed if someone recreates them.
5. README.settings.md
Explains the “one settings.local.php per environment” approach and points to the two example files.
Workflow: On each environment, run e.g.
cp example.settings.local.dev.php settings.local.php (or the prod example on prod), edit settings.local.php with that environment’s database and secrets, and leave it out of git.
please override my settings.local.php file in order to use my ddev drupal local environment

Explored2 files
Overwriting settings.local.php for your DDEV local environment: keeping DDEV's database and hash_salt, and adding the environment indicator, config split, and dev-friendly options.
settings.local.php
+31
-131
￼
// phpcs:ignoreFile/** * @file * Local development override configuration feature.
￼
// phpcs:ignoreFile * Local development override configuration feature./** * @file
Thought
4s
Summary of what’s in place:
settings.local.php is set up for your DDEV local environment and does not define database or hash salt (those stay in settings.ddev.php, which is loaded first).
It adds:
Environment indicator: name DEV, green bar (#81d742).
Config Split: dev split on, prod split off (create the dev and prod splits in the UI if you use Config Split).
Development services: uses development.services.yml (null caches, etc.).
Logging: verbose error level.
Performance: CSS/JS aggregation off; render, page, dynamic page, and discovery_migration caches disabled for easier development.
Convenience: rebuild_access and skip_permissions_hardening enabled.
Optional: commented config_exclude_modules for devel, stage_file_proxy, etc.
Database, hash salt, trusted host patterns, config sync directory, and Mailpit (Symfony Mailer) stay as in settings.ddev.php; this file only layers dev and environment settings on top.
9 Files
Review

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

### Generic / miscellaneous

| Prefix     | Use for |
|------------|--------|
| `generic/` | Unrelated or mixed tasks that don't fit other types: enabling/setting up contrib modules, one-off setup, small unrelated changes in one branch. |

**Examples**

- `generic/enable-and-setup-contrib-modules`
- `generic/recaptcha-metatag-sitemap-setup`
- `generic/contrib-modules-initial-setup`
- `generic/environment-indicator-config-ignore`

---

### Experiments and spikes

| Prefix   | Use for |
|----------|--------|
| `spike/` or `experiment/` | Proof of concept, technical exploration (may not be merged as-is). |

**Examples**

- `spike/decoupled-preview`
- `experiment/headless-contact-form`

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

- For **config changes**, prefer `config/` so it's clear they may need export/import.
- For **core or contrib upgrades**, use `update/` and mention the target version.
- **Custom modules**: `feature/` (e.g. `feature/custom-appointments-module`).
- **Patches**: Usually part of a `fix/` or `update/` branch; mention in the MR/PR title.
- **Enabling/setting up contrib modules** (no new feature, no fix): use `generic/` (e.g. `generic/enable-contrib-modules-setup`).

This convention keeps branch names consistent and makes it easy to filter and review by type (e.g. `git branch --list 'feature/*'`).
