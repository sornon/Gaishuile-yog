  /***************************************************************************
  *                                                                          *
  * ral的配置项，请参考https://github.com/fex-team/node-ral                  *
  *                                                                          *
  ***************************************************************************/
    // 'DEMO_SERVICE': {
    //     unpack: 'json',
    //     pack: 'form',
    //     method: 'POST',
    //     encoding: 'gbk',
    //     balance: 'random',
    //     protocol: 'http',
    //     retry: 2,
    //     timeout: 500,
    //     server: [
    //         { host: '127.0.0.1', port: 8080}
    //     ]
    // }
module.exports.SMS = {           // 声明服务名为MAPAPI
    // 请求协议与数据格式配置
    protocol: 'http',              // 使用http协议请求
    pack: 'querystring',           // 数据封装为query
    unpack: 'json',                // 约定服务端返回JSON数据
    encoding: 'utf-8',             // 服务器返回utf-8编码
    // 负载均衡与超时重试配置
    balance: 'random',         // 负载均衡策略
    timeout: 500,                  // 请求最长超时时间500ms
    retry: 3,                      // 请求重试次数
    // HTTP协议特有配置
    method: 'POST',                 // 使用GET请求
    // query: {                       // 服务的全局query
    //     appId: 'a226d00ad00b4c8fae6955e6f9e5ca7c',
    //     templateId: '7953'
    // },
    path: '/maap/sms/code',
    //path: '/2014-06-30/Accounts/239efa53db848efa6acf82e4b2ca49ab/Messages/templateSMS',      // API路径
    // headers: {                     // 服务的全局headers
    //     'Accept': 'application/json',
    //     'Content-Type':'application/json;charset=utf-8',
    //     'Content-Length':256
    // },
    // 后端地址配置
    server: [                      // 可以配置多个后端地址
        {
            host: 'www.ucpaas.com',
            port: 80
        }
    ]
}