import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/dashboard.vue';
import Tracks from '../views/Tracks.vue';
import Home from '../views/Home.vue';
import Artist from '../views/Artist.vue';
import Album from '../views/Album.vue';
import Streams from '../views/streams.vue';
import Genre from '../views/Genre.vue';
import Folder from '../views/folders.vue';
import FolderView from '../views/widgets/Folders/FolderView.vue';
import GenreTracks from "../views/widgets/Gen/GenreTracks.vue";
import ArtistTracks from "../views/widgets/Artist/ArtistView.vue";
import AlbumTracks from "../views/widgets/Album/AlbumView.vue";
import Favourite from '../views/Favourite.vue';
import SoundQ from '../views/Sound/SoundQ.vue';
import Settings from '../views/settings/Settings.vue';
import  Room from '../views/Sound/Rooms/Room.vue';
import  Eq from '../views/Sound/EQ/EQ.vue';
import  AudioPresets from '../views/Sound/AudioPreset/AudioPreset.vue';
import  Speakers from '../views/Sound/spKs/Speaker.vue';

const routes = [ 
  {
    path: '/',
    component: Dashboard,
    children:[
      { path:'/', component:Home },
      { path:'tracks', component:Tracks },
      // artists
      { path:'artist', component:Artist},

        // artist tracks
        { path:'artistTracks', component:ArtistTracks },

    // albums
    { path:'album', component:Album },

    { path:'albumTracks', component:AlbumTracks },
   // folders
   { path:'folder', component:Folder },

   { path:'folderSongs', component:FolderView },

  // streams
  { path:'stream', component:Streams },

      // genres
      { path:'genre', component:Genre},
      { path:'genres', component:GenreTracks },
    
    // favourties
      { path:'favourite', component:Favourite },

      // soundQ
      {path:"soundQ", component:SoundQ },
      // EQ
      {path:"eq", component:Eq },
      // Speakers
      {path:"sps", component:Speakers },
      // audio presets
      {path:"aps", component:AudioPresets },
      // room effects
      {path:"rms", component:Room },

      // settings
      {path:"settings", component:Settings },

      
    ]
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
