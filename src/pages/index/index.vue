<template>
  <view @tap="clickHandle">
    <image class="image"
           mode="widthFix"
           :src="imgUrl"
           alt="Latest Crypto Fear & Greed Index" ></image>
    <view>
      <text>{{historyData}}</text>
    </view>
  </view>
</template>

<script>

export default {
  data () {
    return {
      historyData:'',
      imgUrl: 'https://alternative.me/crypto/fear-and-greed-index.png',
    }
  },

  components: {
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
    }
  },

  onLoad() {
    this.$http('https://api.alternative.me/fng/?limit=10','GET').then((res)=>{
      this.historyData=JSON.stringify(res.data);
      console.log(this)
    })
  }
}
</script>

<style scoped>
.image{
    width: 100%;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
