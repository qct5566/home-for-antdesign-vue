export const setDocumentTitle = function (title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}
export var domTitle = '数据中台门户'
export const setTitleVar = function (title) {
  domTitle = title
}

export const setTitleIcon = src => {
  const headLinks = document.querySelectorAll('link')
  const iconLink = [...headLinks].find(e => e.rel === 'icon')
  iconLink.setAttribute('href', src)
}
