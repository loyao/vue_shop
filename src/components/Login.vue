<template>
	<div class="login_continer">
		<div class="login_box">
			<div class="avatar_box">
				<img src="../assets/logo.png" alt="">
			</div>
			<el-form ref="LgoinformRef" :model="form" :rules="rules" class="login_form">
				<el-form-item prop="username">
					<el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
				</el-form-item>

				<el-form-item  prop="password">
					<el-input prefix-icon="el-icon-lollipop" v-model="form.password" type="password"></el-input>
				</el-form-item>

				<el-form-item class="btn">
					<el-button type="primary" @click="login()" >登录</el-button>
					<el-button type="info" @click="resetForm('LgoinformRef')">重置</el-button>
				</el-form-item>

			</el-form>
		</div>
	</div>
</template>

<script>
	import { login } from "../api/user.js"
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				form: {
					username: 'admin',
					password: '',
				},
				rules: {
					username: [
						{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 4,
							message: '用户名最短四位',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						message: '请填写密码',
						trigger: 'blur'
					},
					{
						min: 6,
						message: '密码最短六位',
						trigger: 'blur'
					}
					],
				}
			}
		},
		methods: {
			resetForm(formName) {
			        this.$refs[formName].resetFields();
			},
			login(){
				this.$refs.LgoinformRef.validate((valid)=>{
					if(!valid)return;
					
				    login(this.form).then((res_data)=>{
						
						if(res_data.code==200){
							Message({
								message: "登陆成功",
								type: 'success',
								duration: 5 * 1000
							})
							this.$router.push("/home")
						}
						
					})
				
				})
			}
		}

	}
</script>

<style lang="less" scoped>
	.login_continer {
		background-color: #2b4b6b;
		height: 100%;
	}

	.login_box {
		width: 450px;
		height: 300px;
		background-color: #fff;
		border-radius: 3px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		.avatar_box {
			height: 130px;
			width: 130px;
			border: 1px solid #eee;
			border-radius: 50%;
			padding: 10px;
			box-shadow: 0 0 10px #ddd;
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #eee;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}
	}

	.btn {
		display: flex;
		justify-content: flex-end;
	}

	.login_form {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
	}
</style>
