<template>
  <div class="container bg-blue-200 m-auto h-full">
    <!-- <UploadItem  v-for="item of uploadItems" :key="item.name" :uploadItemData="item"/> -->
    <label 
      for="upload"
      class="
        block
        w-24
        py-2
        mx-auto
        rounded-lg 
        shadow-md 
      bg-slategrey
      hover:bg-gray-600
        text-center
      text-white 
        font-semibold 
        cursor-pointer
      "
    >
      upload
    </label>
    <input 
      id="upload"
      type="file" 
      class="hidden"
      @change="uploadFile"
    >
    <div class="flex space-x-2 md:space-x-8">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  </div>
</template>

<script>
import UploadItem from '../components/upload-item.vue';
import { read, getReadFunc, fileSlice, uploadTest } from '../components/upload-utils.js';
export default {
  name: 'Upload',
  components: {UploadItem},
  data() {
    return {
      uploadItems: []
    }
  },
  methods: {
    uploadFile(e) {
      let file = e.target.files[0];
      fileSlice(file);
      uploadTest(file);
    },
    readFile(e) {
      e.preventDefault();
      e.stopPropagation();
      //isFolder webkitGetAsEntry
      let files = Array.from(e.dataTransfer.files);
      let items = Array.from(e.dataTransfer.items);
      items.forEach((item,index) => {
        let target = item.webkitGetAsEntry();
        let name = files[index].name;
        // this.uploadItems.push({name,target});
        let test = getReadFunc();
        test([target],test);
        read(target).then(res => console.log(res)).catch(err => console.log(err))
        // console.log(this.uploadItems);
        // this.typeHandler(target);
      });
 
    },

    dragover (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  },
  mounted() {
    document.addEventListener('dragover',this.dragover,false);
    document.addEventListener('drop',this.readFile,false);
  },
  beforeUnmount() {
    document.removeEventListener('dragover',this.dragover,false);
    document.removeEventListener('drop',this.readFile,false);
  },
}
</script>