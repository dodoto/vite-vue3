import './ripple.css'

export const ripple = {
  name: 'ripple',
  config: {
    mounted(btn) {
      btn.addEventListener('click',e => {
        
        let { width, height } = btn.getBoundingClientRect();
  
        let ripple = document.createElement('span');
        let { classList } = ripple;
        classList.add('ripple');
        let r = Math.max(width, height);
        ripple.style.height = ripple.style.width = r + 'px';
        btn.appendChild(ripple)

        ripple.style.top = e.layerY - r/2 + 'px';
        ripple.style.left = e.layerX - r/2  + 'px';
        classList.add('ripple-active');

        setTimeout(function() {
          btn.removeChild(ripple);
        },1200)
      })
    }
  },
  [Symbol.iterator]() {
    let self = this;
    let index = 0;
    let ary = Object.keys(self);
    let len = ary.length;
      return {
        next() {
          if (index < len) {
            return {
              value: self[ary[index++]],
                done: false
              }
          } else {
            return {
              value: self[ary[index++]],
              done: true
          }
        }
      }
    }
  }  
}

// js 默认对象不包含 迭代器, 如有需要自行添加
