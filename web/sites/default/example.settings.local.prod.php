<?php

/**
 * @file
 * Example settings.local.php for PRODUCTION environment.
 *
 * Copy this file to settings.local.php on the production server and fill in
 * database credentials, hash_salt, and trusted hosts. Do not commit
 * settings.local.php (it is in .gitignore).
 */

// -----------------------------------------------------------------------------
// Database (required)
// -----------------------------------------------------------------------------
$databases['default']['default'] = [
  'database' => 'your_production_database',
  'username' => 'your_production_user',
  'password' => 'your_production_password',
  'host' => 'localhost',
  'port' => '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
];

// -----------------------------------------------------------------------------
// Hash salt (required; use a unique value per environment)
// -----------------------------------------------------------------------------
$settings['hash_salt'] = 'set-a-unique-production-hash-salt-here';

// -----------------------------------------------------------------------------
// Trusted host patterns (restrict to your production domains)
// -----------------------------------------------------------------------------
$settings['trusted_host_patterns'] = [
  '^www\.yourdomain\.com$',
  '^yourdomain\.com$',
];

// -----------------------------------------------------------------------------
// Environment indicator (environment_indicator module)
// -----------------------------------------------------------------------------
$config['environment_indicator.indicator']['name'] = 'PROD';
$config['environment_indicator.indicator']['fg_color'] = '#ffffff';
$config['environment_indicator.indicator']['bg_color'] = '#c0392b';

// -----------------------------------------------------------------------------
// Config Split: prod on, dev off
// -----------------------------------------------------------------------------
$config['config_split.config_split.local']['status'] = FALSE;
$config['config_split.config_split.dev']['status'] = FALSE;
$config['config_split.config_split.prod']['status'] = TRUE;