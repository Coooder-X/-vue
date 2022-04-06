interface Authority {
	readable: Boolean;
	editable: Boolean;
	deletable: Boolean;
}	

type Role = 'admin' | 'teamworker' | 'visitor';

interface RootState {
	path: string;
	uid: string;
	loading: Boolean;
	projectList: Project[];
}

interface Project {
	id: number;
	overviewImg: string;
	projectName: string;
	authorList: Author[];
}