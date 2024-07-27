export default (txt = '') => txt.replace(/(\w{4})(?=\w)/g, '$1-').replace(/-$/, '');
