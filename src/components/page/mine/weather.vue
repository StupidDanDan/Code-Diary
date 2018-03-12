<template>
  <div class="weather">
    <div class="loadingdiv" v-if="weathershow[0]">
      <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </div>
    <div v-if="weathershow[1]" class="weathershowwrap">
      <div class="weatherbackground">
        <img :src="weatherimgsrc" alt="">
        <div class="weathertext">
          <p>{{data.city}}</p>
          <p>{{data.wendu}}°C&nbsp;{{today.type}}</p>
          <p>Clear&nbsp;|&nbsp;AQI&nbsp;&nbsp;{{data.aqi}}</p>
          <p>{{today.fengxiang}}</p>
        </div>
      </div>
      <div class="weatherline">
        <canvas id="myChart2" width="600px" height="350px"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
   data (){
      return {
        data:'',
        day:[],
        tem:[],
        today:{},
        snow: ['大雪','小雪','中雪','雪','暴雪'],
        rain: ['大雨','小雨','中雨','雨','暴雨'],
        weatherimgsrc:'',
        weathershow:[true,false],
      }
    },
    created(){
      this.axios.get('http://wthrcdn.etouch.cn/weather_mini?city=北京').then(data=>{
        var temp=data.data.data;
        this.data=temp;
        var forecast=temp.forecast;
        var fx=forecast[0].fengxiang;
        this.windy=fx;
        this.today=forecast[0];
        if (this.today.type == '晴') {
          this.weatherimgsrc = 'http://oz033lzfm.bkt.clouddn.com/shine.gif';
        } else if(this.today.type == '雷'){
          this.weatherimgsrc = 'http://oz033lzfm.bkt.clouddn.com/thunder.gif';
        } else if(this.rain.indexOf(this.today.type) >=0){
          this.weatherimgsrc = 'http://oz033lzfm.bkt.clouddn.com/rain.gif';
        } else if(this.snow.indexOf(this.today.type) >=0){
          this.weatherimgsrc = 'http://oz033lzfm.bkt.clouddn.com/snow.gif';
        } else {
          this.weatherimgsrc = 'http://oz033lzfm.bkt.clouddn.com/cloudy.gif';
        }
        var forecast=temp.forecast;
        // 画曲线
        for(var i=0;i<forecast.length;i++){
          var day=forecast[i].date.slice(0,3);
          this.day.push(day);
          var low=parseInt(forecast[i].low.slice(3,5));
          var high=parseInt(forecast[i].high.slice(3,5));
          var tem=parseInt((low+high)/2);
          this.tem.push(tem);
        }
        setTimeout(() => {
          this.weathershow = [false,true]
        }, 1000);
      })
    },
    mounted(){
      setTimeout(() => {
        var ctx2 = document.getElementById("myChart2");
        var myChart2 = new Chart(ctx2, {
            type: "line",
            data: {
                // length:5
                labels:this.day,
                datasets: [
                    {
                        label: "未来五天天气预测",
                        backgroundColor: "rgba(225,10,10,0.3)",
                        borderColor: "rgba(225,103,110,1)",
                        borderWidth: 1,
                        pointStrokeColor: "#fff",
                        pointStyle: "crossRot",
                        data: this.tem,
                        cubicInterpolationMode: "monotone",
                        spanGaps: "false",
                        fill: "false",
                        
                    }
                ]
            },
            options: {
            }

        });
        var data=myChart2.config.data;
        data.labels=this.day;
        data.datasets[0].data=this.tem;
        
      }, 1500);
    }
}
</script>

<style lang="less" rel="stylesheet/less">
.weather{
  .loadingdiv{
    color:#2d8cf0;
    font-size: 24px;
    text-align: center;
    margin-top: 90px;
    margin-left: 250px;
  }
  .weathershowwrap{
    height: 660px;
    .weatherbackground{
      position: relative;
      color: #FFFFFF;
      font-size: 24px;
      font-weight: 700;
      >img{
        position: absolute;
        width: 600px;
        height: 269px;
      }
      >.weathertext{
        position: absolute;
        >p{
          margin: 20px 5px;
        }
      }  
    }
    .weatherline{
      position: relative;
      top: 300px;
    }
  }
  
}
</style>
