import axios from 'axios'
import JSEncrypt from 'jsencrypt'

export default {
  encryptParam
}

// let rsaKey = ''
function initRsaKey () {
  if (!sessionStorage.getItem('rsaKey')) {
    axios.post('/wechat/vatInvoice/getRsaKeyAjax')
      .then(resp => {
        let data = resp.data
        if (data.code == 0) {
          // console.log(data.data)
          // rsaKey = data.data
          console.log(data.message)
          sessionStorage.setItem('rsaKey', data.data)
        } else {
          console.log(data.message)
        }
      }).catch(error => {
        console.log(error)
      })
  }
}

initRsaKey()

const encrypt = new JSEncrypt()
function encryptParam (param) {
  // let encrypt = new JSEncrypt()
  if (!sessionStorage.getItem('rsaKey')) {
    console.log('获取公钥异常！')
    alert('系统异常！')
    return ''
  } else {
    encrypt.setPublicKey(sessionStorage.getItem('rsaKey'))
    return encrypt.encrypt(param)
  }
}
