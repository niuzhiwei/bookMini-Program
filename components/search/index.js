// components/search/index.js
import {
  KeyWordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
import { pageinationBev} from '../behaviors/pageination.js'
const keywordModel = new KeyWordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [pageinationBev],
  properties: {
    more:{
      type:String,
      observer:'_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching:false,
    q:'',
    loading:false,
    total:0,
    loadingCenter:false,
    noneBook:false
  },
  attached() {
    const historywords = keywordModel.getHistory()
    const hotWords = keywordModel.getHot()
    this.setData({
      historyWords: historywords
    })
    hotWords.then(res => {
      this.setData({
        hotWords: res.hot
      })
    })

  },
  /**
   * 组件的方法列表
   */
  methods: {
    _loadMore(){
     if(!this.data.q){
       return 
     }
     if(this.data.loading){
       return
     }
      const length = this.data.dataArray.length
      if(length>=this.data.total){
        wx.showToast({
          title: '没有更多内容了哦'
        })
        return
      }
      this.setData({
        loading: true
      })
     if(length>0){
     bookModel.search(length,this.data.q)
     .then(res=>{
       const tempArr = this.data.dataArray.concat(res.books)
       this.setData({
         dataArray:tempArr,
         loading:false
       },()=>{
         this.setData({
           loading:false
         })
       })
     })
     }
    },
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
      this.setData({
        noneBook:false
      })
    },
    onDelete(event){
      this.setData({
        searching:false,
        dataArray:[],
        noneBook:false,
        q:''
      })
    },
    onConfirm(event) {
      this._showLoadingCenter()
      const word = event.detail.value || event.detail.text
      console.log(word)
      this.setData({
        searching:true
      })
      bookModel.search(0, word)
        .then(res => {
          this.setData({
            dataArray: res.books,
            q:word,
            total:res.total
          })
          if(res.books.length==0){
            this.setData({
              noneBook:true
            })
          }
          keywordModel.addToHistory(word)
          this._hideLoadingCenter()
        })
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
  }
})