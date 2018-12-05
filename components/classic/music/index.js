// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc:'images/player@waitting.png',
    playSrc:'images/player@playing.png',
    playing:false
  },
  attached:function(){
    this._recoverStatus()
    this._monitorSwitch()
  },
  detached:function(){
     
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(event){
       if(!this.data.playing){
         this.setData({
           playing: true
         })
         mMgr.src = this.properties.src
       }
       else{
         this.setData({
           playing:false
         })
         mMgr.pause()
       }
    },
    _recoverStatus(){
        if(mMgr.paused){
          this.setData({
            playing:false
          })
          return
        }
        if(mMgr.src == this.properties.src){
          this.setData({
            playing:true
          })
        }
    },
    _monitorSwitch:function(){
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      mMgr.onPause(()=>{
        this._recoverStatus()
      })
      mMgr.onStop(()=>{
        this._recoverStatus()
      })
      mMgr.onEnded(()=>{
        this._recoverStatus()
      })
    }
  }
})
