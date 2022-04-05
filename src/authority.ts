// const authority: Map<Role, Authority> = new Map([
// 	['admin', {
// 		readable: true,
// 		editable: true,
// 		deletable: true
// 	}],
// 	['teamworker', {
// 		readable: true,
// 		editable: true,
// 		deletable: false
// 	}],
// 	['visitor', {
// 		readable: true,
// 		editable: false,
// 		deletable: false
// 	}]
// ]);
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