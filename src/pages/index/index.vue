<template>
  <view @tap="clickHandle">
    <image class="image"
           mode="widthFix"
           :src="imgUrl"
           @load="loadFineshed"
           alt="Latest Crypto Fear & Greed Index"></image>

    <div class="weui-cells__title">The next update will happen in:</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <!--<div class="weui-cell__bd">标题文字</div>-->
        <div class="weui-cell__ft">{{timeText}}</div>
      </div>
    </div>
    <div class="weui-cells__title">Yesterday:</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">{{yesterdayStatus}}</div>
        <div class="weui-cell__ft">{{yesterdayNum}}</div>
      </div>
    </div>
    <div v-for="(item,index) in historyList">
      <div class="weui-cells__title">{{item.timestamp}}:</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
          </div>
          <div class="weui-cell__bd">{{item.value_classification}}</div>
          <div class="weui-cell__ft">{{item.value}}</div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>

  export default {
    data() {
      return {
        historyData: "",
        timeText: "",
        yesterdayStatus: "",
        yesterdayNum: "",
        dataList: [],

        timeInterval: null,
        imgUrl: "https://alternative.me/crypto/fear-and-greed-index.png"
      };
    },

    components: {},
    computed: {
      historyList(){ return this.dataList.slice(2) }
    },

    methods: {
      bindViewTap() {
        const url = "../logs/main";
        if (mpvuePlatform === "wx") {
          mpvue.switchTab({ url });
        } else {
          mpvue.navigateTo({ url });
        }
      },
      loadFineshed() {
        wx.hideLoading();
      },
      clickHandle(ev) {
        console.log("clickHandle:", ev);
      },
      timeDown(time) {

        let leftTime = parseInt(time);
        let h = this.formate(parseInt(leftTime / (60 * 60) % 24));
        let m = this.formate(parseInt(leftTime / 60 % 60));
        let s = this.formate(parseInt(leftTime % 60));
        this.timeText = `${h} hours, ${m} minutes and ${s} seconds`;     // 需要修改时间样式的话 ，比如需要什么30分钟倒计时，就只保留分和秒
      },
      formate(time) {
        if (time >= 10) {
          return time;
        } else {
          return `0${time}`;
        }
      },
      init() {
        this.$http("https://api.alternative.me/fng/?limit=7", "GET").then((res) => {
          if (res.data[0].time_until_update) {
            this.time = res.data[0].time_until_update;
            this.timeDown(this.time);
            this.yesterdayStatus = res.data[1].value_classification;
            this.yesterdayNum = res.data[1].value;
            this.dataList = res.data;
            this.dataList.map((item) => {
              item.timestamp = this.getLocalTime(parseInt(item.timestamp));
            });
          }
        });
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, " ");
      }

    },

    //第一次加载
    onLoad() {
      wx.showLoading({
        title: "加载中"
      });
      this.init();
    },
    //前台
    onshow() {
      this.init();

    },
    //后台
    onHide() {
      clearInterval(this.timeInterval);
    }
  };
</script>

<style scoped>
  .image {
    width: 100%;
  }

  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
