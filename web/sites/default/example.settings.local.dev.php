<?php

/**
 * @file
 * Example settings.local.php for LOCAL and DEV environments.
 *
 * Copy this file to settings.local.php and fill in your database credentials
 * and any other values. Do not commit settings.local.php (it is in .gitignore).
 *
 * Use this template on: your local machine, dev/staging server.
 */

// -----------------------------------------------------------------------------
// Database (required when not using DDEV; if using DDEV, omit or comment out—
// settings.ddev.php already sets $databases)
// -----------------------------------------------------------------------------
$databases['default']['default'] = [
  'database' => 'your_database_name',
  'username' => 'your_username',
  'password' => 'your_password',
  'host' => 'localhost',
  'port' => '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
];

// -----------------------------------------------------------------------------
// Hash salt (optional; DDEV may set one)
// -----------------------------------------------------------------------------
# $settings['hash_salt'] = 'your-dev-hash-salt';

// -----------------------------------------------------------------------------
// Environment indicator (environment_indicator module)
// -----------------------------------------------------------------------------
$config['environment_indicator.indicator']['name'] = 'DEV';
$config['environment_indicator.indicator']['fg_color'] = '#1d1d1d';
$config['environment_indicator.indicator']['bg_color'] = '#81d742';

// -----------------------------------------------------------------------------
// Config Split: dev on, prod off
// -----------------------------------------------------------------------------
$config['config_split.config_split.local']['status'] = FALSE;
$config['config_split.config_split.dev']['status'] = TRUE;
$config['config_split.config_split.prod']['status'] = FALSE;

// -----------------------------------------------------------------------------
// Development services and performance
// -----------------------------------------------------------------------------
$settings['container_yamls'][] = $app_root . '/sites/development.services.yml';
$config['system.logging']['error_level'] = 'verbose';
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['page'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

$settings['rebuild_access'] = TRUE;
$settings['skip_permissions_hardening'] = TRUE;
