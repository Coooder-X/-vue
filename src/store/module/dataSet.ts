import { ActionContext } from 'vuex';
import axios from 'axios';
import { DataSetState } from '@/type';

const initState: DataSetState = {
    dataTree: null,
    loading: false,
};

const dataModule = {
	state: {
		...initState
	},
	mutations: {
		getDataSet(state: DataSetState, payload: any) {
			state.dataTree = payload;
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
		}
	},
	modules: {},
};

export default dataModule;