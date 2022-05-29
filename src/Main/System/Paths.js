import { app } from "electron";
import { existsSync, writeFileSync, mkdirSync } from "fs";

import { join } from "path";
const appStore = app.getPath('userData');
const downloads = `${app.getPath('music')}/AmpMusic`;
const streams = join(appStore,'streams.json');
const processed = join(appStore,"processed.json");
const art = join(appStore,'Artwork');
const settings = join(appStore,'settings.json');
const favourite = join(appStore,'favourite.json');
// check if file for streams.json exists.
if (existsSync(streams) == false) {
   writeFileSync(streams,JSON.stringify([]));
}
/**
 * Proccesed music file
 */
if(existsSync(processed) == false){
    writeFileSync(processed,JSON.stringify([]));
}
/**
 * generate folder for downloads
 */
if(existsSync(downloads) == false){
    mkdirSync(downloads);
}

/**Checking if artwork folder is present */
if(existsSync(art) == false){
    mkdirSync(art);
}

/**generating favourite */
if (existsSync(favourite) == false) {
    writeFileSync(favourite,JSON.stringify([]))
}
export {
    appStore,
    downloads,
    processed,
    streams,
    art,
    settings,
    favourite
}