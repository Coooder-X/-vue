import { ActionContext } from 'vuex';
import axios from 'axios';
import { DataSetState } from '@/type';

const initState: DataSetState = {
	dataTree: null,
	loading: false,
	file: {},
};

const dataModule = {
	state: {
		...initState
	},
	mutations: {
		getDataSet(state: DataSetState, payload: any) {
			state.dataTree = payload;
		},
		getFile(state: DataSetState, payload: any) {
			state.file = payload;
		},
		setLoading(state: DataSetState, payload: any) {
			state.loading = payload;
		},
	},
	actions: {
		getDataSet(context: ActionContext<{}, {}>, params: any) {
			console.log('param', params);
			context.commit('setLoading', true);
			axios.get('/api/dataset', params).then((res) => {
				console.log('tree', res.data);
				context.commit('getDataSet', res.data);
				context.commit('setLoading', false);
			}).catch(e => {
				context.commit('setLoading', false);
				console.log(e);
			});
		},
		createCategory(context: ActionContext<{}, {}>, params: any) {
			axios.post('/api/dataset/createCategory', params);
		},
		deleteFolder(context: ActionContext<{}, {}>, params: any) {
			axios.post('/api/dataset/deleteFolder', params);
		},
		renameFolder(context: ActionContext<{}, {}>, params: any) {
			axios.post('/api/dataset/renameFolder', params);
		},
		uploadFile(context: ActionContext<{}, {}>, params: any) {
			axios.post('/api/dataset/uploadFile', params);
		},
		getFile(context: ActionContext<{}, {}>, params: any) {
			console.log('getFile params', params);
			axios.get('/api/dataset/getFile', params).then((res) => {
				console.log('getFile data', res.data);
				context.commit('getFile', res.data);
			});
		}
	},
	modules: {},
};

export default dataModule;