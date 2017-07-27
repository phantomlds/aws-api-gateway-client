Object.defineProperty(exports,"__esModule",{value:true});















var utils={
assertDefined:function assertDefined(object,name){
if(object===undefined){
throw new Error(name+' must be defined');
}else{
return object;
}
},
assertParametersDefined:function assertParametersDefined(params,keys,ignore){
if(keys===undefined){
return;
}
if(keys.length>0&&params===undefined){
params={};
}
for(var i=0;i<keys.length;i++){
if(!utils.contains(ignore,keys[i])){
utils.assertDefined(params[keys[i]],keys[i]);
}
}
},
parseParametersToObject:function parseParametersToObject(params,keys){
if(params===undefined){
return{};
}
var object={};
for(var i=0;i<keys.length;i++){
object[keys[i]]=params[keys[i]];
}
return object;
},
contains:function contains(a,obj){
if(a===undefined){
return false;
}
var i=a.length;
while(i--){
if(a[i]===obj){
return true;
}
}
return false;
},
copy:function copy(obj){
if(null==obj||'object'!=typeof obj)return obj;
var copy=obj.constructor();
var attr=null;
for(attr in obj){
if(obj.hasOwnProperty(attr))copy[attr]=obj[attr];
}
return copy;
},
mergeInto:function mergeInto(baseObj,additionalProps){
if(null==baseObj||'object'!=typeof baseObj)return baseObj;
var merged=baseObj.constructor();
var attr=null;
for(attr in baseObj){
if(baseObj.hasOwnProperty(attr))merged[attr]=baseObj[attr];
}
if(null==additionalProps||'object'!=typeof additionalProps)return baseObj;
for(attr in additionalProps){
if(additionalProps.hasOwnProperty(attr))merged[attr]=additionalProps[attr];
}
return merged;
}};exports.default=


utils;