import { createStore } from 'vuex';
import axios from 'axios';
import { RootState } from '@/type';

const initState: RootState = {
	path: 'project',
	uid: '22151123',
	loading: false,
	projectList: [],
	authorList: [],
	allUser: [],
};

// 创建一个新的 store 实例
const store = createStore({
	// 声明变量
	state: {
		...initState
	},
	// 修改变量（state不能直接赋值修改，只能通过mutations）
	mutations: {
		// 参数一：state，参数二：新值
		getPath(state, payload) {
			state.path = payload
		},
		getProject(state, payload) {
			state.projectList = payload;
		},
		getAuthorLst(state, payload) {
			state.authorList = payload;
		},
		setLoading(state, payload) {
			state.loading = payload;
		},
		getAllUser(state, payload) {
			state.allUser = payload;
		}
	},
	// mutations的值由actions传入
	actions: {
		// 参数一：自带属性，参数二：新值
		setPath(context, value) {
			// 修改getname的值
			context.commit('getPath', value)
			console.log('path', value);
		},
		getProject(context, params) {
			console.log('param', params);
			context.commit('setLoading', true);
			axios.get('/api/project', params).then((res: any) => {
				console.log('action', res.data);
				context.commit('getProject', res.data);
				context.commit('setLoading', false);
			}).catch(e => {
				context.commit('setLoading', false);
				console.log(e);
			});
		},
		getAuthorLst(context, params) {
			context.commit('setLoading', true);
			axios.get('/api/project/authority', params).then((res: any) => {
				console.log('action', res.data);
				context.commit('getAuthorLst', res.data);
				context.commit('setLoading', false);
			}).catch(e => {
				context.commit('setLoading', false);
				console.log(e);
			});
		},
		deleteProject(context, params) {
			axios.get('/api/project/delete', params).then((res: any) => {
			}).catch(e => console.log(e));
		},
		getAllUser(context) {
			axios.get('/api/project/findAllUser').then((res: any) => {
				context.commit('getAllUser', res.data);
			}).catch(e => {});
		},
		addMember(context, param) {
			axios.post('/api/project/addMember', param).then((res: any) => {
			}).catch(e => {});
		},
		deleteMember(context, param) {
			axios.post('/api/project/deleteMember', param).then((res: any) => {
			}).catch(e => {});
		},
		editMember(context, param) {
			axios.post('/api/project/editMember', param).then((res: any) => {
			}).catch(e => {});
		}
	},
	modules: {},
});

export default store;