<template>
  <p>{{name}}</p>
</template>

<script>
export default {
  name: 'UploadItem',
  data(){
    return {
      folders: [],
      uploadList: [],
      timer: null,
      qeue: [],
      index: 0,
    }
  },
  props: ['uploadItemData'],
  computed: {
    name: function(){
      return this.uploadItemData.name
    },
    target: function(){
      return this.uploadItemData.target
    }
  },

  created() {
    this.sortOut(this.target);
  },

  mounted() {
    // this.readFile()
    this.readFolder(this.qeue[this.index])
    .then(res => this.next(res))
    .catch(err => {
      if(err === 'over') {
        console.log(this.uploadList)
        console.log(this.folders)
      }
    })
  },
  methods: {
    sortOut(target) {
      if(target.isFile) {
        target.file(file=>{
          this.uploadList.push({file,parentPath:target.fullPath});
        });
      }else{
        this.folders.push(target.fullPath);
        this.qeue.push(target);
      };
    },

    readFolder(target) {
      return new Promise((resolve,reject) => {
        if(!target) {
          reject('over')
        }else{
          let reader = target.createReader();
          reader.readEntries(
            entries => resolve(this.next(entries)),
            error => reject(error)
          );
        };
      });
    },

    next(entries) {
      entries.forEach(entry => this.sortOut(entry));
      this.index++;
      let target = this.qeue[this.index];
      return this.readFolder(target)
    },

    readFile() {
      this.typeHandler(this.target);
    },
    
    typeHandler(target) {
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        console.log('我要建立文件夹')
        console.log('这是参数',this.folders);
        console.log('我要上传文件')
        console.log('这是列表',this.uploadList);
      },500)

      if(target.isFile) {
        console.log('is file');
        target.file(file=>{
          this.uploadList.push({file,parentPath:target.fullPath});
        });
      }else{
        console.log('is folder');
        this.folders.push(target.fullPath);
        // console.log(target);
        let reader = target.createReader();
        reader.readEntries(
          entries => {
            entries.forEach(entry => this.typeHandler(entry));
          }
        );
      };
    },
  }
}
</script>