Vue.component(
  'base-layout', {
    props: [],
    template:
    `
    <div class="main-container">
    <header class="z-index-1 primary-bg">
      <slot name="header"></slot>
    </header>
    <main class="content">
      <slot></slot>
    </main>
    <footer class="z-index-1 primary-bg">
      <slot name="footer"></slot>
    </footer>
    </div>
    `
})
