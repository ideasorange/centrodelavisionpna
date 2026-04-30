<?php

declare(strict_types=1);

namespace Drupal\components_core\Plugin\Field\FieldFormatter;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Exception\UndefinedLinkTemplateException;
use Drupal\Core\Field\Attribute\FieldFormatter;
use Drupal\Core\Field\EntityReferenceFieldItemListInterface;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\Plugin\Field\FieldFormatter\EntityReferenceFormatterBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\Theme\ThemeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Renders referenced entities as the active theme's tags_list SDC.
 */
#[FieldFormatter(
  id: 'tags_list_sdc',
  label: new TranslatableMarkup('Tags list (SDC)'),
  description: new TranslatableMarkup('Displays referenced entities as pill tags using the theme tags_list component.'),
  field_types: [
    'entity_reference',
  ],
)]
class TagsListFormatter extends EntityReferenceFormatterBase {

  public function __construct(
    $plugin_id,
    $plugin_definition,
    FieldDefinitionInterface $field_definition,
    array $settings,
    $label,
    $view_mode,
    array $third_party_settings,
    protected ThemeManagerInterface $themeManager,
  ) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $plugin_id,
      $plugin_definition,
      $configuration['field_definition'],
      $configuration['settings'],
      $configuration['label'],
      $configuration['view_mode'],
      $configuration['third_party_settings'],
      $container->get('theme.manager'),
    );
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings(): array {
    return [
      'link' => TRUE,
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state): array {
    $elements = parent::settingsForm($form, $form_state);
    $elements['link'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Link tags to the referenced entity when a URL exists'),
      '#default_value' => $this->getSetting('link'),
    ];
    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary(): array {
    $summary = parent::settingsSummary();
    $summary[] = $this->getSetting('link')
      ? $this->t('Tags are linked')
      : $this->t('Tags are plain text');
    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    if (!$items instanceof EntityReferenceFieldItemListInterface) {
      return [];
    }

    $entities = $this->getEntitiesToView($items, $langcode);
    if ($entities === []) {
      return [];
    }

    $link = (bool) $this->getSetting('link');
    $props_items = [];
    $cache = new CacheableMetadata();

    foreach ($entities as $entity) {
      if (!$entity instanceof EntityInterface) {
        continue;
      }
      $cache->addCacheableDependency($entity);

      $name = $entity->label() ?? '';
      $url = '';
      if ($link && !$entity->isNew()) {
        try {
          $uri = $entity->toUrl();
          $uri_access = $uri->access(return_as_object: TRUE);
          $cache->addCacheableDependency($uri_access);
          if ($uri_access->isAllowed()) {
            $url = $uri->toString();
          }
        }
        catch (UndefinedLinkTemplateException) {
          $url = '';
        }
      }

      $props_items[] = [
        'name' => $name,
        'url' => $url,
      ];
    }

    if ($props_items === []) {
      return [];
    }

    $theme_name = $this->themeManager->getActiveTheme()->getName();
    $build = [
      '#type' => 'component',
      '#component' => $theme_name . ':tags_list',
      '#props' => [
        'items' => $props_items,
      ],
    ];
    $cache->applyTo($build);

    return [0 => $build];
  }

}
