import axios from 'axios';

let base = 'http://118.25.63.70/shunluya';

export const requestLogin = params => { return axios.get(`${base}/adminLogin`, { params: params }); };

export const getUserList = params => { return axios.get(`${base}/userList`, { params: params }); };

export const getAllOrder= params => { return axios.get(`${base}/getAllOrder`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/delUser`, { params: params }); };

export const editstatus = params => { return axios.get(`${base}/changeStatus`,{params:params});};

export const getAllAddress = params => { return axios.get(`${base}/getAddress`,{params:params})};

export const getMsgCount = params => { return axios.get(`${base}/getMsgNumber`,{params:params})};

export const getHotAddress = params => { return axios.get(`${base}/getHotAddress`,{params:params})};

export const addAddress = params => { return axios.get(`${base}/addAddress`,{params:params})};

export const delAddress = params => { return axios.get(`${base}/delAddress`,{params:params})};

export const selectAddress = params => { return axios.get(`${base}/selectAddress`,{params:params})};

export const selectOrder = params => { return axios.get(`${base}/selectOrder`,{params:params})};

export const selectUser = params => { return axios.get(`${base}/selectUser`,{params:params})};

export const checkAddress = params => { return axios.post('http://www.cgn.ac.cn/webapi/resourcedm/getdmq',params)};