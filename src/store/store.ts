import { createStore } from 'vuex';
import axios from 'axios';
import { RootState } from '@/type';
import projectModule from '@/store/module/project';
import dataModule from './module/dataSet';

const initState: RootState = {
	path: 'project',
	uid: '22151123',
};

const store = createStore({
	state: {
		...initState
	},
	mutations: {
		getPath(state: RootState, payload: any) {
			state.path = payload
		},
	},
	actions: {
		setPath(context, value) {
			context.commit('getPath', value)
			console.log('path', value);
		},
	},
	modules: {
		project: projectModule,
		dataset: dataModule,
	},
});

export default store;