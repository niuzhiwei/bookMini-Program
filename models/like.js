import {
  HTTP
} from '../util/http.js'
class LikeModel extends HTTP {
  like(behavior, art_id, type) {
    let url = behavior === 'like' ? "like" : "like/cancel"
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: art_id,
        type: type
      },
      success: (data) => {
        console.log(data)
      }
    })
  }
  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }
}
export {
  LikeModel
}