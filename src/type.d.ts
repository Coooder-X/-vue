export interface Authority {
	readable: Boolean;
	editable: Boolean;
	deletable: Boolean;
}	

export interface User {
	uid: string;
	name: string;
}

interface RootState {
	path: string;
	uid: string;
	loading: Boolean;
	projectList: Project[];
	authorList: Author[];
	allUser: User[];
}

export interface Author {
	user: User;
	role: 'admin' | 'teamworker' | 'visitor';
}

export interface Project {
	id: number;
	overviewImg: string;
	projectName: string;
	// authorList: Author[];
}