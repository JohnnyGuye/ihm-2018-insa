Vue.component(
  'modal-page',
  {
    props: ["shown"],
    methods: {
    },
    template:
    `
    <div style="position: absolute; top: 0; left:0; z-index: 300; width: 100vw; height: 100vh" v-if="shown" >
      <div style="position: absolute; top: 0; left:0; z-index: 300; width: 100vw; height: 100vh; background: #0008" v-on:click="$emit('close', false)">
      </div>
      <div style="position: absolute; z-index: 301; background: #fffd; width: 92vw; height: 92vh; margin: 4vh 4vw;border-radius: 5px; overflow: hidden;" class="z-index-1">
        <slot></slot>
      </div>
    </div>
    `
  }
)
