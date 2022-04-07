export interface Authority {
	readable: Boolean;
	editable: Boolean;
	deletable: Boolean;
}

export interface User {
	uid: string;
	name: string;
}

export interface RootState {
	path: string;
	uid: string;
}

export interface ProjectState {
	loading: Boolean;
	projectList: Project[];
	authorList: Author[];
	allUser: User[];
}

export enum FileType {
	Category,
	Folder,
	File,
}

export interface TreeData {
	id: string;
	label: string;
	type: FileType;
	children?: TreeData[];
}

export interface DataSetState {
	dataTree: TreeData | null;
	loading: Boolean;
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