<template>
 <div class="app">
   <div class="title">app!!</div>
    <router-link to="/index">去index→</router-link> 
    <router-link to="/like">like→</router-link>
    <router-link to="/about">about→</router-link>
   <router-view></router-view>
 </div>
</template>

<script  lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  setup(props,context){
    // const asyncData=({ store, route})=>{
    //   console.log(store,route)
    // }
    return {
      // asyncData
    }
  }
})
</script>
<style>

</style>
