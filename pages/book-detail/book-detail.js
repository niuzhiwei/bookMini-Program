// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js'
const bookModel = new BookModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '正在加载中',
    })
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    Promise.all([detail,comments,likeStatus])
    .then(res=>{
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })
    // detail.then(res => {
    //   this.setData({
    //     book: res
    //   })
    // })

    // comments.then(res => {
    //   this.setData({
    //     comments: res.comments
    //   })
    // })

    // likeStatus.then(res => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
  },
  onLike(event) {
    const like = event.detail.behavior
    likeModel.like(like, this.data.book.id, 400)
  },
  onFakePost(event){
    this.setData({
      posting:true
    })
  },
  onCancel(event){
    this.setData({
      posting: false
    })
  },
  onPost(event){
    const comment = event.detail.text || event.detail.value
    if(!comment){
      return
    }
    if (comment.length > 12){
       wx.showToast({
         title: '短评最多12个字',
         icon: 'none'
       })
       return 
     }
    bookModel.postComment(this.data.book.id,comment)
    .then(res=>{
      wx.showToast({
        title: '+ 1',
        icon:'none'
      })
      this.data.comments.unshift({
        content: comment,
        nums:+1
      })
      this.setData({
        comments:this.data.comments,
        posting:false
      })
    })
  }
})