let serverPath = 'http://www.abc.com/api/'
export function request(url,method,body) {
  return new Promise((resolve,reject) => {
    wx.request({
      url: url ,   // 拼接完整的 url
      data: body,
      method:method,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        resolve(res.data)  // 把返回的数据传出去
      },
      fail(ret) {
        reject(ret)   // 把错误信息传出去
      }
    })
  })
}
