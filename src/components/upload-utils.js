import aixos from 'axios';
import SparkMD5 from 'spark-md5';

export function getReadFunc() {
  let timer = null;
  let files = [];
  let folders = [];
  return function (items,callback) {
    if(!callback) {
      console.log('callback is required');
      return
    };
    if(typeof callback !== 'function') {
      console.log('callback is not a functioin');
      return
    };
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      console.log({folders,files});
      callback = null;
    },500);
    items.forEach(target => {
      if(target.isFile) {
        target.file(file=> files.push({file,path:target.fullPath}));
      }else{
        folders.push(target.fullPath);
        let reader = target.createReader();
        reader.readEntries(entries => callback(entries,callback));
      };
    });
  }
}


export function read(target) {
  return new Promise((resolve,reject) => {
    let index = 0;               //当前读取的目录下标
    let qeue = [];               //目录数组
    let uploadList = [];         //上传的文件  
    let folders = [];            //创建的文件夹路径
  
    //归类
    let sortOut = function(target) {
      if(target.isFile) {
        target.file(file=>{
          uploadList.push({file,parentPath:target.fullPath});
        });
      }else{
        folders.push(target.fullPath);
        qeue.push(target);
      };
    }
    
    //读取目录
    let readFolder = function(target) {
      return new Promise((resolve,reject) => {
        if(!target) {
          reject('over')
        }else{
          let reader = target.createReader();
          reader.readEntries(
            entries => resolve(next(entries)),
            error => reject(error)
          );
        };
      });
    }
    
    let next = function(entries) {
      entries.forEach(entry => sortOut(entry));
      index++;
      let target = qeue[index];
      return readFolder(target)
    }
  
    sortOut(target);
  
    readFolder(qeue[index])
    .then(res => next(res))
    .catch(err => {
      if(err === 'over') {
        resolve({uploadList,folders});
      }else{
        reject('read failed');
      }
    })
  })
}

export function fileSlice(file,size = 1024*1024) {
  //size 单位b
  if(!file) {
    return
  }
  if(file.size < size) {
    return
  }
  // let sliceIndex = 0;
  let totalCount = Math.ceil(file.size/size);
  let slices = [];
  for(let i=0;i<totalCount;i++) {
    let begin = i * size;
    let end = (i + 1) * size;
    let slice = {
      name: file.name,
      index: i,
      total: totalCount,
      file: file.slice(begin,end),
      // md5
    };
    slices.push(slice);
  }
  console.log(slices);
}

function computedMD5(file) {
  return new Promise((resolve,reject) => {
    let fileReader = new FileReader();
    
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = e => {
      if (file.size != e.target.result.byteLength) {
        //如果是切片文件,会进入这里
        console.log("浏览器报成功但是一直不能读取文件信息");
        reject('error');
        return;
      }
      let md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
      resolve(md5);
    };
  })
}

function UPLOAD(formData) {
  return new Promise((resolve,rejct) => {
    const URL = 'http://192.168.2.187:3000/upload';
    const CONFIG = {
      onUploadProgress: progressEvent => {
        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
        console.log(complete);
      }
    };
    aixos.post(URL,formData,CONFIG)
    .then(res => resolve(res.data))
    .catch(err => reject(err))

    // .then(res => {
    //   if(res.data.code === 200) {
    //     resolve(res.data)
    //   }else{
    //     reject(res.data)
    //   }
    // })
    // .catch(err => reject(err))
  });
 
}

export function upload(file,md5) {
  
  const size = 1024 * 1024;
  if(file.size < size) {
    let formData = new FormData();
    formData.append('file',file);
    // aixos.post(URL,formData).then(res => alert(res.data.msg));
    UPLOAD(formData);
    return
  }

  let totalCount = Math.ceil(file.size/size);
  let uploadQeue = [];
  for(let i=0;i<totalCount;i++) {
    let begin = i * size;
    let end = (i + 1) * size;
    let fileSlice = file.slice(begin,end);
    let formData = new FormData();
    formData.append('index',i);
    formData.append('name',file.name + ' ' + i);
    formData.append('total',totalCount);
    formData.append('file',fileSlice);
    formData.append('fileId',md5);
    let uploadReq = UPLOAD(formData);
    uploadQeue.push(uploadReq);
  }
  // aixos.post(URL,formData).then(res => alert(res.data.msg));
  Promise.all(uploadQeue).then(res => console.log(res)).catch(err => console.log(err));
}

export function uploadTest(file) {
  computedMD5(file).then(md5 => {
    console.log('file-md5:',md5);
    upload(file,md5);
  });
}



