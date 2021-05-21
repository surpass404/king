export default (params) => {

	
	uni.showLoading({
		title: '加载中'
	})
	//uni.startPullDownRefresh();

	return new Promise((resolve, reject) => {

		uni.request({
			...params,
			success(res) {

				console.log('success', res);
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			},
			complete() {
				uni.hideLoading();
				uni.stopPullDownRefresh();
			}

		})
	})

}
