Vue.component(
  'searchbar',
  {
    mounted() {
      $(document).ready(function(){

      $('#searchbar-icon').click(function(){
        $('#searchbar-input').animate({width: 'toggle'});
        $("#searchbar-icon").toggle();
        $("#searchbar-cross").toggle(500);
      });

      $('#searchbar-cross').click(function(){
        $('#searchbar-input').animate({width: 'toggle'});
        $("#searchbar-cross").toggle();
        $("#searchbar-icon").toggle(500);
      });

    });
    },
    template:
    `
    <div class="searchbar">
    <input type="text" id="searchbar-input">
    <i class="fa fa-search" id="searchbar-icon" aria-hidden="true"></i>
    <i class="fa fa-times" id="searchbar-cross" aria-hidden="true"></i>
    </div>
    `
  }
)
