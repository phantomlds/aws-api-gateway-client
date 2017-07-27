Object.defineProperty(exports,"__esModule",{value:true});















var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);
var _axiosRetry=require('axios-retry');var _axiosRetry2=_interopRequireDefault(_axiosRetry);
var _utils=require('./utils');var _utils2=_interopRequireDefault(_utils);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var simpleHttpClientFactory={};
simpleHttpClientFactory.newClient=function(config){
function buildCanonicalQueryString(queryParams){

if(Object.keys(queryParams).length<1){
return'';
}

var canonicalQueryString='';
for(var property in queryParams){
if(queryParams.hasOwnProperty(property)){
canonicalQueryString+=encodeURIComponent(property)+
'='+encodeURIComponent(queryParams[property])+'&';
}
}

return canonicalQueryString.substr(0,canonicalQueryString.length-1);
}

var simpleHttpClient={};
simpleHttpClient.endpoint=_utils2.default.assertDefined(config.endpoint,'endpoint');

simpleHttpClient.makeRequest=function(request){
var verb=_utils2.default.assertDefined(request.verb,'verb');
var path=_utils2.default.assertDefined(request.path,'path');
var queryParams=_utils2.default.copy(request.queryParams);
if(queryParams===undefined){
queryParams={};
}
var headers=_utils2.default.copy(request.headers);
if(headers===undefined){
headers={};
}


if(headers['Content-Type']===undefined){
headers['Content-Type']=config.defaultContentType;
}


if(headers['Accept']===undefined){
headers['Accept']=config.defaultAcceptType;
}

var body=_utils2.default.copy(request.body);
if(body===undefined){
body='';
}

var url=config.endpoint+path;
var queryString=buildCanonicalQueryString(queryParams);
if(queryString!=''){
url+='?'+queryString;
}

var simpleHttpRequest={
headers:headers,
data:body};

if(config.retries!==undefined){
simpleHttpRequest.baseURL=url;
var client=_axios2.default.create(simpleHttpRequest);
(0,_axiosRetry2.default)(client,{
retries:config.retries,
retryCondition:config.retryCondition});

return client.request({method:verb});
}
simpleHttpRequest.method=verb;
simpleHttpRequest.url=url;
return(0,_axios2.default)(simpleHttpRequest);
};

return simpleHttpClient;
};exports.default=

simpleHttpClientFactory;