interface Authority {
	readable: Boolean;
	editable: Boolean;
	deletable: Boolean;
}	

type Role = 'admin' | 'teamworker' | 'visitor';