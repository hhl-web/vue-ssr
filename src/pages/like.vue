<template>
 <div class="like">
   <div class="title">like!!</div>
    {{like}}
 </div>
</template>

<script  lang="ts">
import {defineComponent,ref} from 'vue';
import {useStore } from "vuex";
export default defineComponent({
  asyncData({ route,store, router}){
      console.log(">>>", route);
      return store.dispatch('SET_ASYNC_DATA_LIKE');
  },
  setup(props,context){
    const {state} = useStore()
    const like =ref(state.like)
    console.log(">>> like", state.like);
    return {
      like
    }
  }
})
</script>
<style>

</style>
