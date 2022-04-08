import { ActionContext, createStore } from 'vuex';
import axios from 'axios';
import { ProjectState } from '@/type';

const initState: ProjectState = {
	loading: false,
	projectList: [],
	authorList: [],
	allUser: [],
};

const projectModule = {
	state: {
		...initState
	},
	mutations: {
		getProject(state: ProjectState, payload: any) {
			state.projectList = payload;
		},
		getAuthorLst(state: ProjectState, payload: any) {
			state.authorList = payload;
		},
		setLoading(state: ProjectState, payload: any) {
			state.loading = payload;
		},
		getAllUser(state: ProjectState, payload: any) {
			state.allUser = payload;
		}
	},
	actions: {
		getProject(context: ActionContext<{}, {}>, params: any) {
			console.log('param', params);
			context.commit('setLoading', true);
			axios.get('/api/project', params).then((res) => {
				console.log('action', res.data);
				context.commit('getProject', res.data);
				context.commit('setLoading', false);
			}).catch(e => {
				context.commit('setLoading', false);
				console.log(e);
			});
		},
		getAuthorLst(context: ActionContext<{}, {}>, params: any) {
			context.commit('setLoading', true);
			axios.get('/api/project/authority', params).then((res) => {
				console.log('action', res.data);
				context.commit('getAuthorLst', res.data);
				context.commit('setLoading', false);
			}).catch(e => {
				context.commit('setLoading', false);
				console.log(e);
			});
		},
		deleteProject(context: ActionContext<{}, {}>, params: any) {
			axios.get('/api/project/delete', params).then((res) => {
			}).catch(e => console.log(e));
		},
		getAllUser(context: ActionContext<{}, {}>) {
			axios.get('/api/project/findAllUser').then((res) => {
				context.commit('getAllUser', res.data);
			}).catch(e => { });
		},
		addMember(context: ActionContext<{}, {}>, param: any) {
			axios.post('/api/project/addMember', param).then((res) => {
			}).catch(e => { });
		},
		deleteMember(context: ActionContext<{}, {}>, param: any) {
			axios.post('/api/project/deleteMember', param).then((res) => {
			}).catch(e => { });
		},
		editMember(context: ActionContext<{}, {}>, param: any) {
			axios.post('/api/project/editMember', param).then((res) => {
			}).catch(e => { });
		},
		createProject(context: ActionContext<{}, {}>, param: any) {
			axios.post('/api/project/createProject', param)
		}
	},
	modules: {},
};

export default projectModule;