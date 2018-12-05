const pageinationBev = Behavior({
  data:{
    dataArray:[],
    total:0
  },
  methods:{
    setMoreData(dataArray){
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataAaray:tempArray
      })
    },
    getCurrentStart(){
      return this.data.dataAarray.length
    },
    setTotal(total){
      this.data.total = total
    },
    hasMore(){
      if(this.data.dataArray.length >=this.data.total){
        return false
      }
      else{
        return true
      }
    }
  }
})
export { pageinationBev}