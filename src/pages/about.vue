<template>
 <div class="about">
   <div class="title">about!!</div>
    {{about}}
 </div>
</template>

<script  lang="ts">
import {defineComponent,ref} from 'vue';
import { useStore } from "vuex";
export default defineComponent({
    asyncData({ route,store, router}){
      console.log(">>>", route);
      return store.dispatch('SET_ASYNC_DATA_ABOUT');
    },
  setup(props,context){
    const {state} = useStore();
    const about= ref(state.about)
     console.log(">>> about", state.about);
    return {
      about
    }
  }
})
</script>
<style>

</style>
