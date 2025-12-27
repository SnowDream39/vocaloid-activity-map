<template>
  <div class="flex flex-col items-center">
    <div class="w-full max-w-md h-dvh flex flex-col items-center">
      <main class="flex-1 w-full overflow-y-auto scrollbar-hide">
        <slot />
      </main>
      <footer class="flex-shrink-0 h-12 w-full">
        <footer-view />
      </footer>
    </div>
  </div>
</template>