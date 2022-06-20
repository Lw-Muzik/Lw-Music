// var recursiveFolders =  async function(dir){
//     /** Reads only mp3 files from directory */
//     let store = JSON.parse(readFileSync(processed));
//    //  console.log(store.toString())
//    readdir(dir,async function(error,files){
//      if (error) throw new Error(`Sync Error ${error}`);

const { statSync, readdirSync, writeFileSync } = require("fs");
const NodeID3 = require("node-id3");
const { join } = require("path");
 
//        files.forEach(async function(track, index) {
 
//          let newPath = dir + '/' + track;
 
//          if (statSync(newPath).isDirectory() == true) {
//            await recursiveFolders(newPath);
//          } else if (statSync(newPath).isFile() == true && extname(newPath) == ".mp3") {
//          let tags = NodeID3.read(`${newPath}`);
//            /**Checking store is not empty and  if the .mp3 file is already stored */
//                    let meta =  {
//                      title: tags.title == undefined ? track.replace(".mp3", "") : tags.title,
//                      genre: tags.genre == undefined ? "Unknown genre" : tags.genre,
//                      album: tags.genre == undefined ? "Unknown album" : tags.album,
//                      artist: tags.artist == undefined ? "Unknown artist" : tags.artist,
//                      artwork:`${join(art, track.replace(".mp3", ".jpeg"))}`,
//                      n_track:track,
//                      trackPath: newPath,
//                      folder:dir,
//                      data: `file://${newPath}`,
//                    };
//                    store =  [...store, meta];
//                    writeFileSync(processed, JSON.stringify(store));
//                  }
               
//              });
            
//          });
//   }
var store = [];

var recursive = async (dir)=>{
    let data = readdirSync(dir);
    data.forEach((song,index)=>{
        if (statSync(`${dir}/${song}`).isDirectory() == true) {
            recursive(`${dir}/${song}`);
        } else {
         const tags =  NodeID3.read(`${dir}/${song}`);
                      let meta =  {
                                 title: tags.title == undefined ? track.replace(".mp3", "") : tags.title,
                                 genre: tags.genre == undefined ? "Unknown genre" : tags.genre,
                                 album: tags.genre == undefined ? "Unknown album" : tags.album,
                                 artist: tags.artist == undefined ? "Unknown artist" : tags.artist,
                                //  artwork:`${join(art, track.replace(".mp3", ".jpeg"))}`,
                                 n_track:song,
                                 trackPath: `${dir}/${song}`,
                                 folder:dir,
                                 data: `file://${dir}/${song}`,
                               };
            console.log(tags.title);
            store = [...store, meta];
        }
       
    })
}
(async function(){
    await recursive('/home/bruno/Music');
})()

writeFileSync('store.json',JSON.stringify(store));