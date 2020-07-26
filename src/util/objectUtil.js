exports.objectIncludeKeysOnly = (object, keysArr = []) => {

let objectKeys = Object.keys(object);
return objectKeys.every(key => keysArr.includes(key));

}

exports.ObjectIncludeKeys = (object, keysArr = []) => {

let objectKeys = Object.keys(object);
return keysArr.every(key => objectKeys.includes(key));

}