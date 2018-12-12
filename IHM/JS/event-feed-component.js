Vue.component('feed-event', {
    props: ['item'],
    template:
        `
        <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{item.m_name}}</h3>
                <div>{{item.m_asso}}</div>
            </div>
        </v-card-title>
        <v-card-media>
            <v-img v-bind:src="item.m_image"></v-img>
        </v-card-media>
    </v-card>
    `
})
