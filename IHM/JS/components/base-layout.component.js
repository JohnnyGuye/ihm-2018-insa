Vue.component(
  'base-layout', {
    props: [],
    mounted() {
        var el = document.getElementsByClassName('content')[0];
        var up = document.getElementsByClassName('up')[0];

        let fun = (el) => {
          if (el.scrollTop == 0)
          {
            up.style.opacity = "0";
            setTimeout( () => { up.style.display = "none" }, 250 )
          }
          else
          {
            up.style.display = "block"
            setTimeout( () => { up.style.opacity = "1" }, 1 );
          }
        }

        el.addEventListener('wheel', function(e)
        {
          fun(this)
        });

        el.addEventListener('scroll', function(e)
        {
          fun(this)
        }, true);
    },
    template:
    `
    <div class="main-container">
    <header class="z-index-1 primary-bg">
      <div class="fabButton addEvent"  onclick="addEvent()">+</div>
      <slot name="header"></slot>
    </header>
    <main class="content">
      <div class="fabButton up z-index-2" onclick="up()">↟</div>
      <slot></slot>
    </main>
    <footer class="z-index-1 primary-bg">
      <slot name="footer"></slot>
    </footer>
    </div>
    `
})


function up()
{

  var up = document.getElementsByClassName('up')[0];
  var el = document.getElementsByClassName('content')[0];
  el.scrollTop = 0;
  up.style.opacity="0";

}
