<template>
  <div class="proposal">
    <div class="content box">
      <h5>{{category.title}}</h5>
      <h6><span class="has-text-weight-normal">Author:</span> {{proposal.author}}</h6>
      <h1 class="mt-2">{{proposal.title}}</h1>
      <div class="mb-4" v-if="proposal.problem_statement">
        <h3 class="mb-1">Problem statement</h3>
        <p>{{proposal.problem_statement}}</p>
      </div>
      <div class="mb-4" v-if="proposal.problem_solution">
        <h3 class="mb-1">Problem solution</h3>
        <p>{{proposal.problem_solution}}</p>
      </div>
      <div class="mb-4" v-if="proposal.relevant_experience">
        <h3 class="mb-1">Relevant experience</h3>
        <p>{{proposal.relevant_experience}}</p>
      </div>
      <div class="mb-4" v-if="proposal.importance">
        <h3 class="mb-1">Importance</h3>
        <p>{{proposal.importance}}</p>
      </div>
      <div class="mb-4" v-if="proposal.how_does_success_looks_like_">
        <h3 class="mb-1">What does success look like?</h3>
        <p>{{proposal.how_does_success_looks_like_}}</p>
      </div>
      <div class="mb-4" v-if="proposal.challenge_brief">
        <h3 class="mb-1">Challenge brief</h3>
        <p>{{proposal.challenge_brief}}</p>
      </div>
      <div class="mb-4" v-if="proposal.requested_funds">
        Funds requested: <b>{{proposal.requested_funds}}</b>
      </div>
      <div class="mb-4" v-if="proposal.requested_funds_coti">
        Funds requested: <b>{{proposal.requested_funds_coti}}</b>
      </div>
      <div>Comments count: <b>{{proposal.comments_count}}</b></div>
    </div>
    <div class="box">
      <b-message>
        <p>
          <strong>Disclaimer</strong>: the data is
          <strong>not updated</strong> in real time and therefore is likely
          different from those shown in IdeaScale.
        </p>
      </b-message>
      <div class="buttons">
        <b-button
          tag="a"
          :href="proposal.url"
          icon-left="eye"
          type="is-primary"
          target="blank">
          {{ ctaText }}
        </b-button>
        <b-button
          tag="a"
          :href="tgShareLink"
          icon-left="telegram"
          type="is-primary"
          target="blank">
          Share your feedback on Telegram!
        </b-button>
        <b-button
          tag="a"
          :href="twitterShareLink"
          icon-left="twitter"
          type="is-primary"
          target="blank">
          Share your feedback on Twitter!
        </b-button>
      </div>
    </div>
  </div>
</template>


<script>
import categories from '../assets/data/categories.json'

export default {
  data() {
    return {
      categories: categories,
      proposals: [],
      assessed: [],
      autoflag: false
    }
  },
  computed: {
    proposal() {
      let filtered = this.proposals.filter(p => (p.id === parseInt(this.$route.params.id)))
      if (filtered.length) {
        return filtered[0]
      }
      return filtered
    },
    category() {
      if (this.proposal) {
        let category = this.categories.filter(c => (c.id === parseInt(this.proposal.category)))
        if (category.length) {
          return category[0]
        }
      }
      return ''
    },
    ctaText() {
      return (this.autoflag) ? 'Preview' : 'Go to proposal'
    },
    tgShareLink() {
      var url = encodeURIComponent(this.proposal.url)
      var text = encodeURIComponent(`#FeedbackChallenge ${this.proposal.title}`)
      return `https://t.me/share/url?url=${url}&text=${text}`
    },
    twitterShareLink() {
      var url = encodeURIComponent(this.proposal.url)
      var text = encodeURIComponent(`#FeedbackChallenge ${this.proposal.title}`)
      return `https://twitter.com/intent/tweet?url=${url}&text=${text}`
    }
  },
  methods: {
    remoteUpdate() {
      this.axios.get('data/f7/proposals.json').then((res) => {
        this.proposals = res.data
      })
    }
  },
  mounted() {
    this.remoteUpdate()
  }

}
</script>

<style lang="scss">
.description {
  margin-bottom: 40px;
}
.content-wrapper {
  margin-bottom: 40px;
}
</style>
