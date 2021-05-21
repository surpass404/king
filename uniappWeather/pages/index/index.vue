<template>
	<view>
		<div class="weatherTop">
			<img src="../../static/interfaceIcon/location.png" class='location'></img>
			<span>{{city}}</span>
		</div>

		<div class="weatherCenter">
			<div class="weatherToday">
				<div>
					<span>{{temp}}℃ {{weather}}</span>
					<!-- <img :src="'../../static/weatherIcon/'+img+'.png'" class='location'></img> -->
				</div>
				<div>
					<span>{{date}} {{week}} </span>
					<span>{{temphigh}}℃/{{templow}}℃ </span>
				</div>

			</div>

			<div class="weatherTodayHour">
				<scroll-view class="HourScroll" scroll-x="true">
					<div class="Scroll-item" v-for='(item,index) in hourly' :key="index">
						<div><span>{{item.time}}</span></div>
						<div>
							<image :src="'../../static/weatherIcon/'+item.img+'.png'" class='location'>
							</image>
						</div>
						<div><span>{{item.temp}}℃</span></div>
					</div>
				</scroll-view>

			</div>

			<div class="weatherPrediction">
				<div v-for='(item,index) in daily' class="Prediction">
					<div class="PredictionItem"><span>{{item.week}}</span></div>
					<div class="PredictionItem">
						<image :src="'../../static/weatherIcon/'+item.day.img+'.png'" class='location'></image>
						<span> {{item.day.weather}}</span>
					</div>
					<div class="PredictionItem"><span>{{item.day.temphigh}}℃</span></div>
				</div>
			</div>

		</div>

		<div class="weatherIntroduction">
			
			<div>
				<span>气象信息</span>
				<div class="table-view">
					<div class="col-2"><span>风速：{{windspeed}}</span></div>
					<div class="col-2"><span>风向：{{winddirect}}</span></div>
				</div>
				<div class="table-view">
					<div class="col-2"><span>风力：{{windpower}}</span></div>
					<div class="col-2"><span>湿度：{{humidity}}%</span></div>
				</div>
			</div>
			
			<div>
				<span>生活建议</span>
				<div v-for="(item,dex) in index" :key="dex" class="life-commend">
					<span>{{item.iname}}：{{item.ivalue}}</span>
				</div>
			</div>

		</div>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: {},
				city: '',
				temp: '',
				weather: "",
				date: "",
				week: "",
				temphigh: "",
				templow: "",

				index: [],
				daily: [],
				hourly: [],

				windspeed: "",
				winddirect: "",
				windpower: "",
				humidity: '',

			}
		},
		onLoad() {
			//小程序加载时取数据并设置数据
			this.getWeatherData();

		},

		onPullDownRefresh() {
			this.getWeatherData();
		},
		mounted() {

		},

		methods: {



			setData() {
				this.city = this.result.city
				this.date = this.result.date
				this.week = this.result.week
				this.weather = this.result.weather
				this.temp = this.result.temp
				this.temphigh = this.result.temphigh
				this.templow = this.result.templow
				this.index = this.result.index
				this.daily = this.result.daily
				this.hourly = this.result.hourly
				//湿度
				this.humidity = this.result.humidity
				this.windspeed = this.result.windspeed
				this.winddirect = this.result.winddirect
				this.windpower = this.result.windpower
			},

			//获取数据
			getWeatherData() {
				//IP定位，小程序模拟式关闭代理服务器
				//通过经纬度获取天气信息
				uni.getLocation({
					//type: 'wgs84', gcj02
					type: 'gcj02',
					altitude: true,
					success: (position) => {
						console.log('position', position);
						//获取经纬度
						let latitude = position.latitude.toFixed(6);
						let longitude = position.longitude.toFixed(6);
						let url = 'https://api.jisuapi.com/weather/query?appkey=&location=' +
							latitude + ',' + longitude
						this.request({
							url
						}).then(res => {
							console.log('this.request', res);
							this.result = res.result;
							console.log('this.result', this.result);
							this.setData();
						})
					}
				})

			}

		}
	}
</script>

<style lang="scss">
	.content {}

	.weatherTop {
		text-align: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.weatherCenter {
		width: 100%;
		height: auto;
	}

	.weatherTodayHour {
		margin-top: 10px;
	}

	.HourScroll {
		white-space: nowrap;
		overflow: hidden;
		height: auto;
		width: 100%;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.Scroll-item {
		margin-top: 5px;
		margin-bottom: 5px;
		display: inline-block;
		height: auto;
		width: 20%;
		text-align: center;
	}

	.weatherIntroduction {
		.table-view{
			display: flex;
			width: 100%;
			align-items: center;
			flex-wrap: wrap;
			.col-2{
				width: 50%;
				text-align: center;
			}
		}
		.life-commend{
			text-align: center;
		}
	}

	.weatherPrediction {
		width: 100%;
	}

	.Prediction {
		display: flex;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.PredictionItem {
		width: 33.3%;
		text-align: center;
	}

	.weatherToday {
		text-align: center;
	}

	.location {
		height: 40rpx;
		width: 40rpx;
	}
</style>
