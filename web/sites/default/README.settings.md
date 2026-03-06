# Local settings (one file per environment, not in git)

All environment-specific and sensitive settings live in **`settings.local.php`**. This file is **not** in git. You create it on each environment (local, dev, prod) with the right content for that environment.

## How it works

- **`settings.php`** includes **`settings.local.php`** if the file exists.
- You create **`settings.local.php`** once per environment (your machine, dev server, prod server) and put in it: database credentials, hash_salt, environment indicator, config split, cache options, etc.
- Nothing in `settings.local.php` is committed, so credentials and env-specific values stay out of the repo.

## Setup per environment

1. **Local / dev**  
   - Copy **`example.settings.local.dev.php`** to **`settings.local.php`**.  
   - Edit and set: database name, user, password (and hash_salt if you need one).  
   - On DDEV, database may already come from `settings.ddev.php`; you can leave or override `$databases` in `settings.local.php` as needed.

2. **Production**  
   - Copy **`example.settings.local.prod.php`** to **`settings.local.php`** on the prod server.  
   - Edit and set: database credentials, a unique **hash_salt**, and **trusted_host_patterns** for your production domains.

## Files

| File | In git? | Purpose |
|------|--------|--------|
| `settings.local.php` | No | Your actual local/env settings (DB, hash_salt, env indicator, etc.). Create from an example on each environment. |
| `example.settings.local.dev.php` | Yes | Template for local and dev. |
| `example.settings.local.prod.php` | Yes | Template for production. |

## Config Split and Environment Indicator

- Create two config splits in the UI with IDs **`dev`** and **`prod`**. The example files set which split is active (dev vs prod) and the environment indicator name/colors (e.g. DEV green, PROD red).
