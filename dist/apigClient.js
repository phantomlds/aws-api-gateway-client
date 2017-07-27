Object.defineProperty(exports,"__esModule",{value:true});
















var _urlTemplate=require('url-template');var _urlTemplate2=_interopRequireDefault(_urlTemplate);
var _apiGatewayClient=require('./lib/apiGatewayCore/apiGatewayClient');var _apiGatewayClient2=_interopRequireDefault(_apiGatewayClient);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var apigClientFactory={};

apigClientFactory.newClient=function(config){
var apigClient={};
if(config===undefined){
config={
accessKey:'',
secretKey:'',
sessionToken:'',
region:'',
apiKey:undefined,
invokeUrl:'',
service:'',
defaultContentType:'application/json',
defaultAcceptType:'application/json',
systemClockOffset:0};

}
if(typeof config.accessKey==='undefined'){
config.accessKey='';
}
if(typeof config.secretKey==='undefined'){
config.secretKey='';
}
if(typeof config.apiKey==='undefined'){
config.apiKey='';
}
if(typeof config.sessionToken==='undefined'){
config.sessionToken='';
}
if(typeof config.region==='undefined'){
config.region='us-east-1';
}
if(typeof config.service==='undefined'){
config.service='execute-api';
}

if(typeof config.defaultContentType==='undefined'){
config.defaultContentType='application/json';
}

if(typeof config.defaultAcceptType==='undefined'){
config.defaultAcceptType='application/json';
}
if(typeof config.systemClockOffset==='undefined'){
config.systemClockOffset=0;
}


var invokeUrl=config.invokeUrl;
var endpoint=/(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
var pathComponent=invokeUrl.substring(endpoint.length);

var sigV4ClientConfig={
accessKey:config.accessKey,
secretKey:config.secretKey,
sessionToken:config.sessionToken,
serviceName:config.service,
region:config.region,
endpoint:endpoint,
defaultContentType:config.defaultContentType,
defaultAcceptType:config.defaultAcceptType,
systemClockOffset:config.systemClockOffset,
retries:config.retries,
retryCondition:config.retryCondition};


var authType='NONE';
if(
sigV4ClientConfig.accessKey!==undefined&&
sigV4ClientConfig.accessKey!==''&&
sigV4ClientConfig.secretKey!==undefined&&
sigV4ClientConfig.secretKey!=='')
{
authType='AWS_IAM';
}

var simpleHttpClientConfig={
endpoint:endpoint,
defaultContentType:config.defaultContentType,
defaultAcceptType:config.defaultAcceptType,
retries:config.retries,
retryCondition:config.retryCondition};


var apiGatewayClient=_apiGatewayClient2.default.newClient(
simpleHttpClientConfig,
sigV4ClientConfig);


apigClient.invokeApi=function(params,pathTemplate,method,additionalParams,body){
if(additionalParams===undefined)additionalParams={};
if(body===undefined)body='';

var request={
verb:method.toUpperCase(),
path:pathComponent+_urlTemplate2.default.parse(pathTemplate).expand(params),
headers:additionalParams.headers||{},
queryParams:additionalParams.queryParams,
body:body};


return apiGatewayClient.makeRequest(request,authType,additionalParams,config.apiKey);
};


return apigClient;
};exports.default=

apigClientFactory;