Vue.component('feed-event', {
    props: ['event'],
    template:
        `
        <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{event.name}}</h3>
                <div>{{event.asso}}</div>
            </div>
        </v-card-title>
        <v-responsive>
            <v-img v-bind:src="event.imageURI"></v-img>
        </v-responsive>
    </v-card>
    `
})
