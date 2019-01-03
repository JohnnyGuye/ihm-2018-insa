Vue.component(
  'base-layout', {
    props: [],
    mounted() {
        var el = document.getElementsByClassName('content')[0];
        var up = document.getElementsByClassName('up')[0];
        el.addEventListener('wheel', function(e) 
        {
          if (this.scrollTop == 0)
          {
            up.style.opacity="0";
          } 
          else
          {
            up.style.opacity="1";
          }

        }); 

        el.addEventListener('scroll', function(e)
        {
          if (this.scrollTop == 0)
          {
              up.style.opacity="0";
          } 
          else
          {
              up.style.opacity="1";
          }
         
        }, true);
    },
    template:
    `
    <div class="main-container">
    <header class="z-index-1 primary-bg">
      <div class="fabButton addEvent"  onclick="addEvent()">+</div>
      <slot name="header"></slot>
      <div class="fabButton up" onclick="up()">↟</div>
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


function up()
{

  var up = document.getElementsByClassName('up')[0];
  var el = document.getElementsByClassName('content')[0];
  el.scrollTop = 0;
  up.style.opacity="0";
  
}