<template>
  <div class="h-full p-4 box-border">
    <div id="map-container" class="h-full rounded relative">
      <div class="absolute top-4 left-4 z-10 bg-white w-80 " >
        <input 
          v-model="keyword"
          id="map-search" 
          placeholder="搜索"
          class="
            appearance-none 
            border 
            border-transparent 
            w-full 
            py-2 
            px-4 
            bg-white 
            text-gray-700 
            placeholder-gray-400 
            shadow-md 
            rounded-lg 
            text-base 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-200
            focus:border-transparent
          "
        >
        <div 
          v-if="keyword"
          id="map-search-result" 
          class="bg-white "
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import AMapLoader from "@amap/amap-jsapi-loader"
import { onMounted, defineProps, ref, nextTick, onBeforeUnmount } from 'vue'
import { NPdone } from '@/hooks/nprogress/index.js'

//定义属性
//中心点
const { center, mapStyle } = defineProps({
  center: {
    type: Array,
    default: [107.4976, 32.1697]
  },
  mapStyle: {
    type: String,
    default: 'amap://styles/fresh'
    // normal, macaron, graffiti whitesmoke dark fresh darkblue blue light grey
  }
})

const keyword = ref('')

let map = null  

const mapLoaded = _ => NPdone()

const mapSearch = city => {
  map.plugin(['AMap.Autocomplete','AMap.PlaceSearch'], _ => {
    let autocomplete = new AMap.Autocomplete({ 
      city,
      input: 'map-search',
      output: 'map-search-result'
    })

    let placeSearch = new AMap.PlaceSearch({ city, map })

    AMap.event.addListener(autocomplete, 'select', e => {
      placeSearch.search(e.poi.name)
    })
  })
}

const mapGeolocation = _ => {
  map.plugin('AMap.Geolocation', _ => {
    let geolocation = new AMap.Geolocation({
      enableHightAccuracy: true,
      timeout: 10000,
      buttonOffset: new AMap.Pixel(10, 20),
      zoomToAccuracy: true,
      buttonPosition: 'RB'
    })

    geolocation.getCurrentPosition(function(status,result){
      if(status=='complete'){
          onComplete(result)
      }else{
          onError(result)
      }
    });

    function onComplete (data) {
      
      const { addressComponent: { city }, formattedAddress, position: { lat, lng } } = data

      //搜索
      mapSearch(city)
      
      const marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat), 
        title: formattedAddress
      })
      map.setCenter([lng, lat])
      map.add(marker)
    }

    function onError (data) {
      // 定位出错
      console.log(data)
    }
  })
}

const mapInit = _ => {
  AMapLoader.load({
    key: '95be122042e9437212c136303868af65',
    version: '1.4.15',
    AMapUI: {
      version: '1.1',
      plugins: ['overlay/SimpleMarker']
    }
  }).then(_ => {

    map = new AMap.Map('map-container', {
      zoom: 14,                                    
      center,  
      mapStyle,                     
      features: ['bg', 'road', 'building', 'point'],                    
      // layers: [new AMap.TileLayer.Satellite()]                               
    })
    // map.on('complete',mapLoaded)

    mapGeolocation()

  })
  .catch(err => console.log(err))
}

const mapDestroy = _ => {
  map?.destroy()
  // 搜索结果div没有移除
  nextTick(() => {
    let child = document.getElementsByClassName('amap-sug-result')[0]
    let body = document.body
    if(child) body.removeChild(child)
  })
}

onMounted(mapInit)

onBeforeUnmount(mapDestroy)

// onUnmounted()
</script>

<style>

.amap-sug-result {
  border-width: 0;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  border-radius: 0.5rem;
}

.auto-item {
  border-radius: 0.5rem;
  padding-left: 1rem/* 16px */;
  padding-right: 1rem/* 16px */;
  padding-top: 0.5rem/* 8px */;
  padding-bottom: 0.5rem/* 8px */;
}

</style>
