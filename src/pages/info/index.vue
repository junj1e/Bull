<template>
  <view>
    <view class='cavans-view'>
    <canvas canvas-id='canvas1' class='cavans'></canvas>
    </view>
    <text>{{text}}</text>
    <rich-text :nodes="richText"></rich-text>
  </view>
</template>

<script>
  import wxCharts from '../../lib/wxcharts'
  export default {
    name: "info",
    components: {},
    data() {
      return {
        text:'数据来源 \n 我们正在收集以下五个来源的数据。每个数据点的值与前一天相同，以便可视化加密市场情绪变化的有意义进展。\n' +
        '首先，目前的指数仅适用于比特币（我们很快会为大型硬币提供单独的指数），因为其中很大一部分是硬币价格的波动性。\n' +
        '\n' +
        '但是，让我们列出我们在当前指数中包含的所有不同因素：\n' +
        '\n' +
        '波动率（25％）\n' +
        '我们正在测量当前的波动率和最大值。比特币的下降并将其与过去30天和90天的相应平均值进行比较。我们认为，波动性的异常上升是市场恐慌的表现。\n' +
        '\n' +
        '市场动量/成交量（25％）\n' +
        '此外，我们正在测量当前的交易量和市场动量（再次与最近30/90天的平均值进行比较）并将这两个值放在一起。一般来说，当我们每天看到积极市场的高买盘时，我们得出的结论是，市场过于贪婪/过于看涨。\n' +
        '\n' +
        '社交媒体（15％）\n' +
        '虽然我们的reddit情绪分析仍然不在实时索引中（我们仍然在试验文本处理算法中与市场相关的一些关键词），但我们的twitter分析正在运行。在那里，我们收集并统计每个硬币的各种主题标签的帖子（公开，我们只显示比特币的标签），并检查它们在特定时间范围内收到的速度和交互次数）。不同寻常的高互动率导致公众对硬币的兴趣增加，而在我们看来，这与贪婪的市场行为相对应。\n' +
        '\n' +
        '调查（15％）\n' +
        '与strawpoll.com（免责声明：我们也拥有这个网站），相当大的公共民意调查平台一起，我们每周进行加密民意调查，并询问人们如何看待市场。通常情况下，我们每次投票都会看到2,000-3,000票，所以我们确实了解了一组加密投资者的情绪。我们不会过多关注这些结果，但在我们的研究开始时它非常有用。你可以在这里看到一些最近的结果。\n' +
        '\n' +
        '优势（10％）\n' +
        '硬币的主导地位类似于整个加密市场的市值份额。特别是比特币，我们认为比特币的主导地位上升是由于过度投机的替代硬币投资的恐惧（并因此减少），因为比特币正变得越来越成为加密的避风港。另一方面，当比特币的主导地位萎缩时，人们通过投资更具风险的替代硬币变得更加贪婪，梦想着他们在下一次大牛市中的机会。无论如何，分析比特币以外的硬币的优势，你可以反过来说，因为对alt硬币的更多兴趣可能会导致该特定硬币的看涨/贪婪行为。\n' +
        '\n' +
        '趋势（10％）\n' +
        '我们针对各种与比特币相关的搜索查询提取Google趋势数据并对这些数字进行处理，尤其是搜索量的变化以及推荐的其他当前流行的搜索。例如，如果您查看Google趋势“比特币”，则无法从搜索量中获取更多信息。但目前，您可以看到相关搜索查询框中的查询“比特币价格操纵”目前有+ 1,550％的上​​涨（截至05/29/2018）。这显然是市场恐慌的表现，我们将其用于我们的指数。',
        richText:'<div class="box">\n' +
        '\n' +
        '\t\t\t<div class="box-title"><h2 class="space" id="data_sources">Data Sources</h2></div>\n' +
        '\n' +
        '\t\t\t<div class="box-row">\n' +
        '\t\t\t\tWe are gathering data from the five following sources. Each data point is valued the same as the day before in order to visualize a meaningful progress in sentiment change of the crypto market.\n' +
        '\n' +
        '\t\t\t\t<p>First of all, the current index is for bitcoin only (we offer separate indices for large alt coins soon), because a big part of it is the volatility of the coin price.</p>\n' +
        '\n' +
        '\t\t\t\t<p>But let’s list all the different factors we’re including in the current index:</p>\n' +
        '\n' +
        '\t\t\t\t<h4>Volatility (25 %)</h4>\n' +
        '\n' +
        '\t\t\t\t<p class="space" style="width: 100%; max-width: 840px;">We’re measuring the current volatility and max. drawdowns of bitcoin and compare it with the corresponding average values of the last 30 days and 90 days. We argue that an unusual rise in volatility is a sign of a fearful market.</p>\n' +
        '\n' +
        '\t\t\t\t<h4>Market Momentum/Volume (25%)</h4>\n' +
        '\n' +
        '\t\t\t\t<p class="space" style="width: 100%; max-width: 840px;">Also, we’re measuring the current volume and market momentum (again in comparison with the last 30/90 day average values) and put those two values together. Generally, when we see high buying volumes in a positive market on a daily basis, we conclude that the market acts overly greedy / too bullish.</p>\n' +
        '\n' +
        '\t\t\t\t<h4>Social Media (15%)</h4>\n' +
        '\n' +
        '\t\t\t\t<p class="space" style="width: 100%; max-width: 840px;">While our reddit sentiment analysis is still not in the live index (we’re still experimenting some market-related key words in the text processing algorithm), our twitter analysis is running. There, we gather and count posts on various hashtags for each coin (publicly, we show only those for Bitcoin) and check how fast and how many interactions they receive in certain time frames). A unusual high interaction rate results in a grown public interest in the coin and in our eyes, corresponds to a greedy market behaviour.</p>\n' +
        '\n' +
        '\t\t\t\t<h4>Surveys (15%)</h4>\n' +
        '\n' +
        '\t\t\t\t<p class="space" style="width: 100%; max-width: 840px;">Together with strawpoll.com (disclaimer: we own this site, too), quite a large public polling platform, we’re conducting weekly crypto polls and ask people how they see the market. Usually, we’re seeing 2,000 - 3,000 votes on each poll, so we do get a picture of the sentiment of a group of crypto investors. We don’t give those results too much attention, but it was quite useful in the beginning of our studies. You can see some recent results <a class="red" href="/crypto/sentiment/#results">here</a>.</p>\n' +
        '\n' +
        '\t\t\t\t<h4>Dominance (10%)</h4>\n' +
        '\n' +
        '\t\t\t\t<p class="space" style="width: 100%; max-width: 840px;">The dominance of a coin resembles the market cap share of the whole crypto market. Especially for Bitcoin, we think that a rise in Bitcoin dominance is caused by a fear of (and thus a reduction of) too speculative alt-coin investments, since Bitcoin is becoming more and more the safe haven of crypto. On the other side, when Bitcoin dominance shrinks, people are getting more greedy by investing in more risky alt-coins, dreaming of their chance in next big bull run. Anyhow, analyzing the dominance for a coin other than Bitcoin, you could argue the other way round, since more interest in an alt-coin may conclude a bullish/greedy behaviour for that specific coin.</p>\n' +
        '\n' +
        '\t\t\t\t<h4>Trends (10%)</h4>\n' +
        '\n' +
        '\t\t\t\t<p class="space" style="width: 100%; max-width: 840px;">We pull Google Trends data for various Bitcoin related search queries and crunch those numbers, especially the change of search volumes as well as recommended other currently popular searches. For example, if you check <a href="https://trends.google.de/trends/explore?date=now%207-d&amp;q=bitcoin">Google Trends for "Bitcoin"</a>, you can’t get much information from the search volume. But currently, you can see that there is currently a <strong>+1,550%</strong> rise of the query <strong>„bitcoin price manipulation“</strong> in the box of related search queries (as of 05/29/2018). This is clearly a sign of fear in the market, and we use that for our index.</p>\n' +
        '\t\t\t</div>\n' +
        '\t\t</div>'

      };
    },
    computed: {},
    onLoad(){
      new wxCharts({
     canvasId: 'canvas1',
     type: 'pie',
     series: [{ name: '一班', data: 50 }, { name: '二班', data: 30 }, { name: '三班', data: 20 }, { name: '四班', data: 18 }, { name: '五班', data: 8 }],
     width: 640,
     height: 400,
     dataLabel: true,
   });
    },
    methods: {
    }


  };
</script>

<style  scoped>
.cavans-view{
  text-align:center;
}
.cavans{

  width: 100%;
  height: 400px;

}
</style>
