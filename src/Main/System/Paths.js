import { app } from "electron";
import { existsSync, writeFileSync } from "fs";
import fs from "fs";
import { join } from "path";
const appStore = app.getPath('userData');
const downloads = `${app.getPath('music')}/AmpMusic`;
const streams = join(appStore,'streams.json');
const processed = join(appStore,"processed.json");

// check if file for streams.json exists.
if (existsSync(streams) == false) {
   writeFileSync(streams,JSON.stringify({data:[]}));
}
/**
 * Proccesed music file
 */
if(existsSync(processed) == false){
    writeFileSync(processed,JSON.stringify({songs:[]}));
}
/**
 * generate folder for downloads
 */
if(existsSync(downloads) == false){
    fs.mkdirSync(downloads);
}



export {
    appStore,
    downloads,
    processed,
    streams
}