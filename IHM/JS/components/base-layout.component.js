Vue.component(
  'base-layout', {
    props: [],
    data: function () {
      return {
        currentRoute: nav.currentRoute
      }
    },
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
      <div class="fabButton up z-index-2" onclick="up()"><i class="fas fa-angle-double-up"></i></div>
      <div class="contentPage">
      <slot></slot>
      </div>
    </main>
    <footer class="z-index-1 primary-bg">
      <button class="icon-btn" onclick="nav.navigate('feed')" v-bind:class="{ active: currentRoute == 'feed' }"><i class="fas fa-money-check"></i></button>
      <button class="icon-btn" onclick="nav.navigate('calendar')" v-bind:class="{ active: currentRoute == 'calendar' }"><i class="fas fa-calendar-alt"></i></button>
      <button class="icon-btn" onclick="nav.navigate('assos')" v-bind:class="{ active: currentRoute == 'assos' }"><i class="fas fa-th-list"></i></button>
      <button class="icon-btn" onclick="nav.navigate('options')" v-bind:class="{ active: currentRoute == 'options' }"><i class="fas fa-cog"></i></button>
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
