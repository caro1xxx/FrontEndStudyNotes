##### 准备工作

1. 备案域名+服务器
2. 微信公众平台https://mp.weixin.qq.com/cgi-bin/home?t=home/index&lang=zh_CN&token=1426790092
3. 商户平台https://pay.weixin.qq.com/index.php/core/info
4. 微信支付api v2https://pay.weixin.qq.com/wiki/doc/api/index.html
5. 微信公众测试号https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index

##### 设置相关

1. 微信公众平台 -设置与开发 -公众号设置 -功能设置

   ```bash
   设置JS接口安全域名
   www.yishujiazuopin.cn
   hn.sonnets.cn
   qyf.cqbpxx.cn
   new.camapp.cn
   网页授权域名
   www.yishujiazuopin.cn
   qyf.cqbpxx.cn
   ```

   设置js安全域名需要校验服务器

   由微信提供一个TXT文件,微信访问我们填写的js安全接口获取这个TXT内容

   ```nginx
   #在nginx配置
   server{
     listen 80;
     server_name www.yishujiazuopin.cn;
   
     location / {
       default_type text/plain;
       #此处就是TXT文件内的内容
       return 200 '5Dr90bT4FVgc8aaT';
     }
   }
   include servers/*;
   ```

2. 微信商品平台设置js支付目录

   ```js
   添加目录格式为(填写支付页面所处的域名)
   http://xxx.com/
   ```

##### 开发

###### React

```js
import "./App.css";
import { useState } from "react";

function App() {
  const [baseInfo, setBaseInfo] = useState({
    appId: "wx0656a23d2fe51585", // Appid
    redirectUri: "http://www.yishujiazuopin.cn", // 微信授权回调接口
    scope: "snsapi_base", // 授权方式
    code: 0, //将获得到的code用于获取openid
    msg: "",
  });
  // 获取code
  const getCode = () => {
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      baseInfo.appId
    }&redirect_uri=${encodeURIComponent(
      baseInfo.redirectUri
    )}&response_type=code&scope=${baseInfo.scope}&state=STATE#wechat_redirect`;
    window.location.href = url;
    refreshMsg(url);
  };

  // 获取openid
  const getOpen = () => {
    fetch(
      `http://www.yishujiazuopin.cn/wechat/auth?code=${
        window.location.href.split("=")[1]
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refreshMsg(JSON.stringify(data));
      });
  };
  // 调用支付
  const getPay = () => {
    fetch(`http://www.yishujiazuopin.cn/wechat/pay`)
      .then((res) => res.json())
      .then((data) => {
        refreshMsg(JSON.stringify(data));
        if (!data) return;
        /* eslint-disable */
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: "wx0656a23d2fe51585", //公众号ID，由商户传入
            timeStamp: data.timestamp + "", //时间戳，自1970年以来的秒数
            nonceStr: data.nonceStr, //随机串
            package: data.package,
            signType: "MD5", //微信签名方式：
            paySign: data.paySign, //微信签名
          },
          function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              refreshMsg("支付成功");
            }
          }
        );
      });
  };
  // 刷新页面提示
  const refreshMsg = (info) => {
    let newBaseInfo = { ...baseInfo };
    newBaseInfo.msg = info;
    setBaseInfo(newBaseInfo);
  };
  return (
    <div className="App">
      <div>{baseInfo.msg}</div>
      <div>
        <button onClick={getCode}>获取code</button>
      </div>
      <div>
        <button onClick={getOpen}>获取openid</button>
      </div>
      <div>
        <button onClick={getPay}>调用支付</button>
      </div>
    </div>
  );
}
export default App;
```

###### node

```js
//app.js
const express = require("express");
const request = require("request");
const crypto = require("crypto");
const xml2js = require("xml2js");
const axios = require("axios");
const querystring = require("querystring");

const app = express();
const mchId = "1604021966"; // 商户号
const apiKey = "934a5ecd9f23WSGBH34a95ecd9f2334a"; // API密钥
const appId = "wx0656a23d2fe51585";
const appSecret = "d62f7bdd97274df436f010320b82f9a0";
const notifyUrl = "http://www.yishujiazuopin.cn/wechatpay/notify"; // 支付结果通知地址

let openid_flag = "";

// 生成随机字符串
function generateNonceStr() {
  return Math.random().toString(36).substr(2, 15);
}

// 计算签名
function signParams(params) {
  const keys = Object.keys(params).sort();
  const signStr =
    keys.map((key) => `${key}=${params[key]}`).join("&") + `&key=${apiKey}`;
  const md5 = crypto.createHash("md5");
  const sign = md5.update(signStr).digest("hex").toUpperCase();
  return sign;
}

/*
  微信授权回调接口
  用于获取前端成功获取code后,重定向到该接口
  作用:获取code
*/
app.get("/wechat/auth", async (req, res) => {
  const code = req.query.code;
  console.log(code);
  const params = {
    appid: appId,
    secret: appSecret,
    code: code,
    grant_type: "authorization_code",
  };
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?${querystring.stringify(
    params
  )}`;
  try {
    const result = await axios.get(url);
    openid_flag = result.data.openid;
    console.log("openid:", openid_flag);
    res.json({ openid: openid_flag });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// 微信消息接口
// 将你的Token替换为你在公众平台上设置的Token
const TOKEN = "SJ23AJSNK923";
app.get("/wechat", (req, res) => {
  const { signature, timestamp, nonce, echostr } = req.query;
  const arr = [TOKEN, timestamp, nonce];
  arr.sort();
  const hash = crypto.createHash("sha1");
  hash.update(arr.join(""));
  const sha1 = hash.digest("hex");
  if (sha1 === signature) {
    res.send(echostr);
  } else {
    res.send("error");
  }
});

// 统一下单
function unifiedOrder(params) {
  return new Promise((resolve, reject) => {
    const url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    const xml = `<xml>
      <appid>${params.appid}</appid>
      <mch_id>${params.mch_id}</mch_id>
      <nonce_str>${params.nonce_str}</nonce_str>
      <body><![CDATA[${params.body}]]></body>
      <out_trade_no>${params.out_trade_no}</out_trade_no>
      <total_fee>${params.total_fee}</total_fee>
      <spbill_create_ip>${params.spbill_create_ip}</spbill_create_ip>
      <notify_url>${params.notify_url}</notify_url>
      <trade_type>${params.trade_type}</trade_type>
      <openid>${params.openid}</openid>
      <sign>${params.sign}</sign>
    </xml>`;
    request(
      {
        url: url,
        method: "POST",
        body: xml,
      },
      (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          xml2js.parseString(body, { explicitArray: false }, (err, result) => {
            if (err) {
              reject(err);
            } else {
              const result_code = result.xml.result_code;
              const return_code = result.xml.return_code;
              if (result_code === "SUCCESS" && return_code === "SUCCESS") {
                resolve(result.xml);
              } else {
                reject(new Error(result.xml.return_msg));
              }
            }
          });
        }
      }
    );
  });
}

// 处理支付结果通知
app.post("/wechat/notify", (req, res) => {
  let rawData = "";
  req.on("data", (chunk) => {
    rawData += chunk;
  });
  req.on("end", () => {
    const parser = new xml2js.Parser({
      explicitArray: false,
    });
    parser.parseString(rawData, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Parse XML Error");
        return;
      }
      const params = {
        appid: result.xml.appid,
        bank_type: result.xml.bank_type,
        cash_fee: result.xml.cash_fee,
        fee_type: result.xml.fee_type,
        is_subscribe: result.xml.is_subscribe,
        mch_id: result.xml.mch_id,
        nonce_str: result.xml.nonce_str,
        openid: result.xml.openid,
        out_trade_no: result,
        out_trade_no: result.xml.out_trade_no,
        result_code: result.xml.result_code,
        return_code: result.xml.return_code,
        time_end: result.xml.time_end,
        total_fee: result.xml.total_fee,
        trade_type: result.xml.trade_type,
        transaction_id: result.xml.transaction_id,
      };
      const sign = sign(params);
      if (sign !== result.xml.sign) {
        console.error("Sign Error");
        res.status(400).send("Sign Error");
        return;
      }
      console.log("支付成功");
      res.send(
        `<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`
      );
    });
  });
});

// 发起支付请求
app.get("/wechat/pay", async (req, res) => {
  const nonceStr = generateNonceStr();
  const timestamp = parseInt(Date.now() / 1000);
  const params = {
    appid: "wx0656a23d2fe51585", // 微信公众号/小程序的APPID
    mch_id: mchId + "",
    nonce_str: nonceStr,
    body: "test",
    // out_trade_no: ` test${timestamp}`, // 商户订单号，自己生成
    out_trade_no: `test${timestamp}`, // 商户订单号，自己生成
    total_fee: 1, // 支付金额，单位为分
    spbill_create_ip: req.ip,
    notify_url: notifyUrl,
    trade_type: "JSAPI", // 支付方式为JSAPI
    openid: openid_flag, // 用户的openid
  };
  const sign = signParams(params);
  params.sign = sign;
  try {
    const result = await unifiedOrder(params);
    const prepay_id = result.prepay_id;
    const nonceStr2 = generateNonceStr();
    const timestamp2 = parseInt(Date.now() / 1000);
    const packageStr = `prepay_id=${prepay_id}`;
    const params2 = {
      appId: params.appid,
      timeStamp: timestamp2.toString(),
      nonceStr: nonceStr2,
      package: packageStr,
      signType: "MD5",
    };
    const paySign = signParams(params2);
    const data = {
      timestamp: timestamp2,
      nonceStr: nonceStr2,
      package: packageStr,
      signType: "MD5",
      paySign: paySign,
    };
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3001, () => {
  console.log("Server started at http://localhost:3001");
});
```

##### 注意事项

因为是前后端分离的,所以部署服务器是需要配置nginx代理的