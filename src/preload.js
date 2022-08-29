const  ZFileSystem  = require("./Main/Core/Filesystem");
// const { streams,processed,art, appStore ,settings, favourite} = require("./Main/System/Paths.js");
const NodeID3 = require("node-id3");
(async function(){
        /** Reads only mp3 files from directory */
      var dataStore = await ZFileSystem.recursiveFolders("/home/blabs/Music");
    //   console.log(dataStore)
        dataStore.forEach(async(data,index,array)=>{
          let tags = NodeID3.read(`${data.n}`);
          /*
          *  Checking store is not empty and  if the .mp3 file is already stored 
          */
                  let meta =  {
                    id:index,
                    title: tags.title == undefined ? data.t.replace(".mp3", "") : tags.title,
                    genre: tags.genre == undefined ? "Unknown genre" : tags.genre,
                    album: tags.genre == undefined ? "Unknown album" : tags.album,
                    artist: tags.artist == undefined ? "Unknown artist" : tags.artist,
                    // artwork:`${join(art, data.t.replace(".mp3", ".jpeg"))}`,
                    n_track:data.t,
                    trackPath: data.t,
                    folder:data.f,
                    data: `file://${data.n}`,
                  };
                  console.log(`> ${index +1} ->  ${data.n}`);
        });
})();