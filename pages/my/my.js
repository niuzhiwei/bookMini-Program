// pages/my/my.js
import {
  BookModel
} from '../../models/book.js'
import {
  ClassicModel
} from '../../models/classic.js'
const bookModel = new BookModel()
let classic = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo:false,
    userInfo:null,
    bookCount:0,
    classics:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  userAuthorized(){
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },
  ongetUserInfo: function (event) {
    let userInfo = event.detail.userInfo
    console.log(userInfo)
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },
  onTap(event){
     wx.showToast({
       title: '牛牛的小程序',
       image:"../../images/my/time.png"
     })
  },
  getMyBookCount(){
    bookModel.getMyBookCount()
    .then(res=>{
      this.setData({
        bookCount:res.count
      })
    })
  },
  getMyFavor(){
    classic.getMyFavor(res=>{
       this.setData({
         classics:res
       })
    })
  }
})