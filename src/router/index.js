import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard.vue';
import Tracks from '../views/Tracks.vue';
import Artist from '../views/Artist.vue';
import Album from '../views/Album.vue';
import Streams from '../views/streams.vue';
import Genre from '../views/Genre.vue';
import GenreTracks from "../views/widgets/Gen/GenreTracks.vue";
import ArtistTracks from "../views/widgets/Artist/ArtistView.vue";
import AlbumTracks from "../views/widgets/Album/AlbumView.vue";
import Favourite from '../views/Favourite.vue';
const routes = [ 
  {
    path: '/',
    component: Dashboard,
    children:[
      { path:'tracks', component:Tracks },
      { path:'artist', component:Artist ,
      children:[
        { path:'artistTracks', component:ArtistTracks },
      ]
    },
      { path:'album', component:Album,
      children:[
        { path:'albumTracks', component:AlbumTracks },
      ]
    },
      { path:'stream', component:Streams },
      { path:'genre', component:Genre,
        children:[
          { path:'genres', component:GenreTracks },
        ]
    },
      { path:'favourite', component:Favourite }
    ]
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
