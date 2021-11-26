<template>
  <div id="app">
    <b-navbar class="is-primary" :mobile-burger="false">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          <img src="@/assets/images/catalyst.png" alt="Project Catalyst" />
        </b-navbar-item>
        <b-navbar-item>
          #FeedbackChallenge Tool
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="section container">
      <div class="filter">
        <c-filter :categories="categories" @filter-changed="updateFilter" />
      </div>
      <div class="content-wrapper">
        <router-view/>
      </div>
      <div class="buttons is-centered">
        <b-button
          type="is-primary"
          size="is-medium"
          @click="suggest">
          {{suggestText}}
        </b-button>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Made by Catalyst Community for the Catalyst Community</p>
        <p><img class="aim-logo" src="@/assets/images/aim-logo.png" alt="Cardano AIM" /></p>
        <p class="is-size-4 has-text-weight-bold">
          <a href="https://cardanoscan.io/pool/b61f05ec1e907ab9b069eaec6c664056c16f56cab59076109c66d2ae" target="_blank">
            Stake with [AIM] pool
          </a>
        </p>
        <p class="icons">
          <a href="https://github.com/Project-Catalyst/feedback-challenge-tool" target="_blank">
            <b-icon icon="github" size="small" />
          </a>
          <a href="https://twitter.com/AimCardano" target="_blank">
            <b-icon icon="twitter" size="small" />
          </a>
          <a href="https://t.me/joinchat/Ivl50eWG7r0zODI1" target="_blank">
            <b-icon icon="telegram" size="small" />
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import categories from './assets/data/categories.json'
import CFilter from '@/components/Filter'

export default {
  data() {
    return {
      categories: categories,
      proposals: [],
      currentFilter: [],
      currentIndex: 0,
      interval: false
    }
  },
  components: {
    CFilter,
  },
  methods: {
    updateFilter(newVal) {
      this.currentIndex = 0
      this.currentFilter = newVal
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home' })
      }
    },
    suggest() {
      if (this.filteredProposals[this.currentIndex]) {
        this.$router.push({ name: 'Proposal', params:{ id: this.filteredProposals[this.currentIndex].id }})
        this.currentIndex = this.currentIndex + 1
      } else {
        this.currentIndex = 0
      }
    },
    remoteUpdate() {
      this.axios.get('data/f7/proposals.json').then((res) => {
        this.proposals = res.data
      })
    }
  },
  computed: {
    filteredProposals() {
      let proposals = this.proposals
      if (this.currentFilter.length > 0) {
        let filters = this.currentFilter.map(el => el.id)
        proposals = this.proposals.filter(p => filters.indexOf(p.category) > -1)
      }
      return proposals
        .sort(() => (Math.random() > .5) ? 1 : -1)
        .sort(
          (a,b) => (a.comments_count > b.comments_count) ? 1 : ((b.comments_count > a.comments_count) ? -1 : 0)
        )
    },
    suggestText() {
      return (this.$route.name === 'Home') ? 'Suggest Proposal' : 'Give me another'
    }
  },
  mounted() {
    this.remoteUpdate()
    this.interval = setInterval(() => {
      this.remoteUpdate()
    }, 15 * 60 * 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss">
@import './assets/sass/base/mixins';
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.is-ellipsis {
  display: inline-block;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.aim-logo {
  width: 150px;
}
</style>
