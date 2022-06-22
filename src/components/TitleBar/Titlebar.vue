<template>
  <div class="customTitleBar bg1">
    <div class="leftSide">
      <!-- <img id="logo" src="@/RendererProcess/assets/images/Logo.png" /> -->
      <p>
        <span class="mi mi-music-note"></span>
        {{appName}}</p>
    </div>
    <div class="ctrls">
      <div class="ctrl" @click="minimize">
        <img
          class="icon"
            src="../../assets/min.svg"
          style="width:15px"
        />
      </div>
      <div 
       @click="toggleMaximize"
      class="ctrl">
        <img
          class="icon"
          src="../../assets/max.svg"
        />
      </div>

      <div id="closeWindow"
       @click="close"
        class="ctrl">
        <img
          class="icon "
        
           src="../../assets/close.svg"
        />
      </div>
    </div>
  </div>
</template>

<script>
const { remote } = window.require("electron");

    export default {
        name:"Titlebar",
        data() {
            return {
                appName:remote.getCurrentWindow().title,
                platform: process.platform,
                theme: "dark",
                isMaximizable: remote.getCurrentWindow().isMaximizable(),
                isMinimizable: remote.getCurrentWindow().isMinimizable(),
              
            }
        },
        methods: {

            close() {
              // remote.Tray()
                remote.getCurrentWindow().hide("ap");
            },
            toggleMaximize() {
                let win = remote.getCurrentWindow();
                if (win.isMaximized())
                    win.unmaximize();
                else
                    win.maximize();
            },
            minimize() {
                remote.getCurrentWindow().minimize();
            }
        }
    }
</script>
<style scoped lang="scss">
.miniMode {
  .customTitleBar {
    opacity: 0;
  }
  .ctrls {
    pointer-events: none;
  }
}
 img {
        width: 10px;
        align-self: center;
      }
.customTitleBar {
  width: 100%;
  height:30px;
  display: flex;
  background: #00000021;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(20px);
//   padding: 2px;
  padding-top: 0px;
  -webkit-app-region: drag;
  position: relative;
  z-index: 100;
  .leftSide {
    display: flex;
    align-items: center;
    margin-top: 5px;
    #logo {
      width: 15px;
      margin-right: -2px;
    }
    p {
      font:400 14px Ubuntu,Arial;
      text-transform: capitalize;
      margin: 10px;
      color:#fcfafb;
    }
  }
  .ctrls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    -webkit-app-region: no-drag;
    margin-right: -5px;
    padding: 5px;
    .ctrl {
      display: flex;
      align-items: center;
      justify-content: center;
      // margin: 10px;
      padding: 10px;
      cursor: pointer;
     
    }
    .ctrl:hover {
      background: rgba(236, 225, 225, 0.193);
    }
    #closeWindow:hover {
      background: red;
    }
  }
}
</style>
