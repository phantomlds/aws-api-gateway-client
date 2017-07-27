Object.defineProperty(exports,"__esModule",{value:true});













var _utils=require('./utils');var _utils2=_interopRequireDefault(_utils);
var _sigV4Client=require('./sigV4Client.js');var _sigV4Client2=_interopRequireDefault(_sigV4Client);
var _simpleHttpClient=require('./simpleHttpClient.js');var _simpleHttpClient2=_interopRequireDefault(_simpleHttpClient);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var apiGatewayClientFactory={};
apiGatewayClientFactory.newClient=function(simpleHttpClientConfig,sigV4ClientConfig){
var apiGatewayClient={};

var sigV4Client=_sigV4Client2.default.newClient(sigV4ClientConfig);
var simpleHttpClient=_simpleHttpClient2.default.newClient(simpleHttpClientConfig);

apiGatewayClient.makeRequest=function(request,authType,additionalParams,apiKey){

var clientToUse=simpleHttpClient;


if(apiKey!==undefined&&apiKey!==''&&apiKey!==null){
request.headers['x-api-key']=apiKey;
}

if(
request.body===undefined||
request.body===''||
request.body===null||
Object.keys(request.body).length===0)
{
request.body=undefined;
}



request.headers=_utils2.default.mergeInto(request.headers,additionalParams.headers);
request.queryParams=_utils2.default.mergeInto(request.queryParams,additionalParams.queryParams);


if(authType==='AWS_IAM'){
clientToUse=sigV4Client;
}



return clientToUse.makeRequest(request);
};
return apiGatewayClient;
};exports.default=

apiGatewayClientFactory;