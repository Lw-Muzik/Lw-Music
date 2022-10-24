// const NodeID3 = require("node-id3");
const { statSync , readdirSync } = require("fs");
const { extname , join} = require("path");
class ZFileSystem {

   constructor(){
      this.store = [];
   }
 /**
  * @return {Array<String>}
  * @param { String } dir
  */
    recursiveFolders(dir){
    /** Reads only mp3 and mp4 files from directory */
    var files = readdirSync(dir);
 
       files.forEach(async (track, index) => {
 
         let newPath = dir + '/' + track;
 
         if (statSync(newPath).isDirectory() == true) {
           await this.recursiveFolders(newPath);
        //    console.log(`Paths in queue ${newPath}`);
           // allows both mp4 , m4a and amp3
         } else if (statSync(newPath).isFile() == true &&( extname(newPath) == ".mp3" || extname(newPath) == ".mp4" || extname(newPath) == ".m4a")) {
                //    console.log(`Loading => ${index +1} ->  ${newPath}`);
                     this.store = [...this.store, {n:newPath,t:track,f:dir}];
             }
     });
     return this.store;
  }
}

module.exports = ZFileSystem;