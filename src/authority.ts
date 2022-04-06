import { Authority } from "./type";
type Role = 'admin' | 'teamworker' | 'visitor';
const authority: Record<Role, Authority> = {
	admin: {
		readable: true,
		editable: true,
		deletable: true
	},
	teamworker: {
		readable: true,
		editable: true,
		deletable: false
	},
	visitor: {
		readable: true,
		editable: false,
		deletable: false
	}
};
export default authority;