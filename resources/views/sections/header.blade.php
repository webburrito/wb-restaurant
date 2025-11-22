<header class="banner fixed top-0 left-0 right-0 z-50">
  @if (has_nav_menu('primary_navigation'))
  <div class="container mx-auto">
    <div class="flex w-full justify-end">
      <nav class="nav-primary w-auto h-auto" aria-label="{{ wp_get_nav_menu_name('primary_navigation') }}">
        {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav', 'echo' => false]) !!}
      </nav>
   </div>
  </div>
  @endif
</header>
