<?php

declare(strict_types=1);

namespace Drupal\components_core\Plugin\views\area;

use Drupal\Core\Breadcrumb\BreadcrumbBuilderInterface;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Theme\ThemeManagerInterface;
use Drupal\views\Attribute\ViewsArea;
use Drupal\views\Plugin\views\area\AreaPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Header area that renders the active theme's header_block SDC.
 *
 * @ingroup views_area_handlers
 */
#[ViewsArea('banner_with_bg_header')]
class BannerWithBgHeader extends AreaPluginBase {

  /**
   * Allowed `background_variant` values for the header_block component.
   */
  private const BACKGROUND_VARIANTS = [
    'none',
    'light',
    'dark',
    'primary',
    'secondary',
  ];

  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    protected readonly BreadcrumbBuilderInterface $breadcrumbBuilder,
    protected readonly RouteMatchInterface $routeMatch,
    protected readonly ThemeManagerInterface $themeManager,
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('breadcrumb'),
      $container->get('current_route_match'),
      $container->get('theme.manager'),
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function defineOptions() {
    $options = parent::defineOptions();
    $options['heading'] = ['default' => ''];
    $options['description'] = [
      'contains' => [
        'value' => ['default' => ''],
        'format' => ['default' => NULL],
      ],
    ];
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);

    $form['heading'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Heading'),
      '#default_value' => $this->options['heading'] ?? '',
    ];

    $form['description'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Description'),
      '#description' => $this->t('Optional text shown in the component description area after the breadcrumb.'),
      '#default_value' => $this->options['description']['value'] ?? '',
      '#format' => $this->options['description']['format'] ?? \filter_default_format(),
      '#allowed_formats' => ['basic_html'],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function render($empty = FALSE) {
    if ($empty && empty($this->options['empty'])) {
      return [];
    }

    $breadcrumb_trail = $this->breadcrumbBuilder->build($this->routeMatch);
    $breadcrumb_render = [
      '#theme' => 'breadcrumb',
      '#links' => $breadcrumb_trail->getLinks(),
    ];
    $breadcrumb_cache = CacheableMetadata::createFromObject($breadcrumb_trail);
    $breadcrumb_cache->applyTo($breadcrumb_render);

    $description_slot = [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['components-core-banner-with-bg-header__description'],
      ],
      'breadcrumb' => $breadcrumb_render,
    ];

    $description_value = $this->options['description']['value'] ?? '';
    $description_format = $this->options['description']['format'] ?? \filter_default_format();
    if (trim($description_value) !== '') {
      $description_slot['additional'] = [
        '#type' => 'processed_text',
        '#text' => $description_value,
        '#format' => $description_format,
      ];
    }

    $title = $this->view->getTitle();
    $heading = $this->options['heading'] ?? ($title === FALSE ? '' : (string) $title);

    $theme_name = $this->themeManager->getActiveTheme()->getName();
    $build = [
      '#type' => 'component',
      '#component' => $theme_name . ':header_block',
      '#props' => [
        'heading' => $heading,        
      ],
      '#slots' => [
        'content' => $description_slot,
      ],
    ];

    $cache = (new CacheableMetadata())
      ->addCacheContexts(['route', 'url.path'])
      ->merge(CacheableMetadata::createFromObject($breadcrumb_trail));
    $cache->applyTo($build);

    return $build;
  }

}
