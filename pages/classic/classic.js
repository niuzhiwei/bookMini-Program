// pages/classic/classic.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
let classic = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classic.getLatest((res) => {
      this.setData({
        classicData: res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },
  onLike(event) {
    let id = this.data.classicData.id
    let type = this.data.classicData.type
    let behavior = event.detail.behavior
    likeModel.like(behavior, id, type)
  },
  onNext() {
    this._updateClassic('next')
  },
  _updateClassic(nextOrPrevious){
    let index = this.data.classicData.index
    classic.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classicData: res,
        latest: classic.isLatest(res.index),
        first: classic.isFirst(res.index)
      })
    })
  },
  onPrevious(event) {
      this._updateClassic('previous')
  },
  _getLikeStatus(artID, category){
    likeModel.getClassicLikeStatus(artID, category,(res)=>{
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  }
})