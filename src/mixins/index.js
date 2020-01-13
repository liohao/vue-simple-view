var mixin = {
  methods: {
    mockApi: function (url) {
      return new Promise((resolve, reject) => {
        let res = new XMLHttpRequest()
        res.open('get', url)
        res.send({})
        res.onload = () => {
          if (res.status == 200) {
            let resData = JSON.parse(res.responseText)
            resolve(resData)
          }
        }
        res.onerror = err => reject(err)
      })
    }
  }
}

export default mixin