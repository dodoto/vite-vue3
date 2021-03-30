export const useDebounce = function(handler,time,immediate) {
  let timer = null
  return function() {
    let that = this
    let args = arguments
    clearTimeout(timer)
    if(immediate) {
      let canExcute = !timer
      timer = setTimeout(function(){
        timer = null
      },time)
      if(canExcute) handler.apply(that,args)
    }else{
      timer = setTimeout(function(){
        handler.apply(that,args)
      },time)
    }
  }
}

export const useThrottle = function(handler,time,immediate) {
  let timer = null
  return function() {
    let that = this
    let args = arguments
    if(!timer) {
      if(immediate) handler.apply(that,args)
      timer = setTimeout(function(){
        handler.apply(that,args)
        timer = null
      },time)
    }
  }
}

function throttleWithTimeStamp(handler,time) {
  let prev = 0
  return function() {
    let that = this
    let args = arguments
    let current = + new Date()
    if(current - prev > time) {
      handler.apply(that,args)
      prev = current
    }
  }
}