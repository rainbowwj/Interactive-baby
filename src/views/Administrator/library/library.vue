<template>
  <div class="app-container">
    <div>
      <Inquire :title="this.cityList" :len='category'/>
      <Export />
    </div>
  </div>
</template>

<script>
import Inquire from './components/Inquire'
import Export from './components/Export'
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      category:'inquire-box'
    }
  },
  components: {
    Inquire,
    Export
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
