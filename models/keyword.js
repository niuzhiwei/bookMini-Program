import {HTTP} from '../util/http-p.js'

class KeyWordModel extends HTTP {
  getHistory(){
     const words = wx.getStorageSync('q')
     if(!words){
       return []
     }
     return words
  }
  getHot(){
     return this.request({
       url:'/book/hot_keyword'
     })
  }
  addToHistory(keyword){
    let words = this.getHistory()
    const has = words.includes(keyword)
    if(!has){
      const length = words.length
      if (length >= 10){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync('q', words)
    }
  }
}

export { KeyWordModel}