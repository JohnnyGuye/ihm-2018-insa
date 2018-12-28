Vue.component(
  'modal-page',
  {
    data: function() {
      return { shown: true }
    },
    methods: {
      open() {
        this.shown = true
      },
      close() {
        this.shown = false
      }
    },
    template:
    `
    <div style="position: absolute; top: 0; left:0; z-index: 300; width: 100vw; height: 100vh" v-if="shown" >
      <div style="position: absolute; top: 0; left:0; z-index: 300; width: 100vw; height: 100vh; background: #0008" v-on:click="shown = false">
      </div>
      <div style="position: absolute; z-index: 301; background: #fffd; width: 92vw; height: 92vh; margin: 4vh 4vw;border-radius: 5px" class="z-index-1">
        <slot></slot>
      </div>
    </div>
    `
  }
)
