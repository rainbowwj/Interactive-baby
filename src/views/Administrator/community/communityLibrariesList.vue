<template>
  <div class="app-container">
    <div>
      <communityInput :title="this.cityList" :len='category'/>
      <communityFrom />
    </div>
  </div>
</template>

<script>
import communityInput from './component/communityInput'
import communityFrom from './component/communityFrom'
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      category:'inquire-box'
    }
  },
  components: {
    communityInput,
    communityFrom
  },
  computed:{
    ...mapState({
      cityList: state=>state.library.cityList
    })
  },
  methods:{
    ...mapActions({
      city: 'library/city'
    }),
  },
  async created() {
    await this.city()
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
