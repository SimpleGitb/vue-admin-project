<template>
	<div class="login-wrap">
		<div class="login login1" :class="rotate">
			<div class="login_title">
				<span>云悉互联网安全监测平台</span>
			</div>
			<div class="login_fields">
				<div class="login_fields__user">
					<div class="icon">
						<img src="../../../static/img/login/user_icon_copy.png">
					</div>
					<input name="login" id="username" v-model="ruleForm.username" style="font-family: 微软雅黑;font-size: 14px;" placeholder="邮箱" type="username">
				</div>
				<div class="login_fields__password">
					<div class="icon">
						<img src="../../../static/img/login/lock_icon_copy.png">
					</div>
					<input name="pwd" id="password" v-model="ruleForm.password" style="font-family: 微软雅黑;font-size: 14px;" placeholder="密码" type="password">
				</div>
				<div class="login_fields__Keep">
					<label for="pass">
                    <span>记住密码</span>
                    <input type="checkbox" name="pass" class="checkbox" v-model="checked">
                </label>
				</div>
			</div>
			<div class="success"></div>
			<div id="captcha" class="wait" :style="{display:display1}">
				<div class="loading">
					<div class="bounce1"></div>
					<div class="bounce2"></div>
					<div class="bounce3"></div>
				</div>
			</div>
			<div class="login_fields__submit" id="btn">
				<input style="padding: 10px 105px" type="button" value="登录">
			</div>
		</div>
		<div class='authent authent1' :style="{display:display,left:left,opacity:opacity}">
			<div class="loader" style="height: 44px;width: 44px;margin-left: 28px;">
				<div class="loader-inner ball-clip-rotate-multiple">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<p>认证中...</p>
		</div>
	</div>
</template>
<script>
	require('../../../static/js/gt.js');
	export default {
		name: 'login',
		data: function() {
			return {
				rotate: 'test2',
				display: 'none',
				display1: 'block',
				transition: '',
				checked: false,
				isThere: false,
				left: '400px',
				opacity: 0,
				ruleForm: {
					username: '1244971159@qq.com',
					password: 'Zhuxiaobo1'
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {},
		mounted() {
			var _this = this;
			var handler = function(captchaObj) {
				captchaObj.onReady(function() {
					_this.display1 = 'none';
				}).onSuccess(function() {
					var result = captchaObj.getValidate();
					if(!result) {
						_this.$message.error('请完成验证');
						return;
					};
					_this.rotate = 'test';
					_this.display = "block";
					_this.opacity = "1";
					_this.$axios.post('api/login', {
						email: _this.ruleForm.username,
						password: _this.ruleForm.password,
						remember: Number(_this.checked),
						geetest_challenge: result.geetest_challenge,
						geetest_validate: result.geetest_validate,
						geetest_seccode: result.geetest_seccode
					}).then((res) => {
						let data = res.data;
						if(data.status) {
							_this.$message.success(data.msg);
							sessionStorage.ms_username = _this.ruleForm.username;
							_this.$router.push('/');
							// sessionStorage.setItem('ms_username',_this.ruleForm.username);
						} else {
							_this.$message.error(data.msg);
							setTimeout(function() {
								_this.rotate = 'test2';
								_this.display = "none";
								_this.opacity = "0";
								captchaObj.reset();
							}, 1500);
						}
					})
				});
				document.getElementById('btn').onclick = function() {
					captchaObj.verify();
				};

				// 更多前端接口说明请参见：http://docs.geetest.com/install/client/web-front/
			};

			this.$axios.get("api/captcha?t=" + (new Date()).getTime()).then((res) => {
				let data = res.data;
				initGeetest({
					// 以下 4 个配置参数为必须，不能缺少
					gt: data.gt,
					challenge: data.challenge,
					offline: !data.success, // 表示用户后台检测极验服务器是否宕机
					new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
					timeout: '5000',
					product: "bind", // 产品形式，包括：float，popup
					width: "300px"
					// 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
				}, handler);
			})

		}

	}
</script>
<style scoped>

</style>