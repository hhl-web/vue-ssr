<template>
  <div class="about">
    {{title}}
  </div>
</template>
<script  lang="ts">
import {defineComponent,ref} from 'vue';
export default defineComponent({
  setup(props,context){
    console.log(props,context);
    const title =ref('有关于页面的入口')
     return {
      title
    }
  }
})
</script>
<style scoped>

</style>
