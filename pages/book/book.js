import {BookModel} from '../../models/book.js'
import {random} from '../../util/commom.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     books:[],
     searching:false,
     more:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hotlist =  bookModel.getHotList()
    hotlist.then(res=>{
        this.setData({
          books:res
        })
      })

  },
  onSearching(event){
    this.setData({
      searching:true
    })
  },
  onCancel(event){
    this.setData({
      searching:false
    })
  },
  onReachBottom(){
     this.setData({
       more:random(9)
     })
  }
})