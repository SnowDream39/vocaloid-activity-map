<template>
  <div class="default-layout"> 
    <div class="default-layout-content">
      <main>
        <slot />
      </main>
      <footer>
        <footer-view />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.default-layout-content {
  max-width: 450px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;
  }
}
header, footer {
  flex-shrink: 0;
  height: 50px;
}
main {
  flex: 1;
}

</style>