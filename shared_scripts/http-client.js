const https = require("https");
const http = require("http")

async function request(options) {
    // options = {
    //     url || uri: string,
    //     method: string, 
    //     headers: object,
    //     qs: object, // リクエスト先のURLへ付与するクエリ文字列を指定します。

    //     body: Buffer, String, ReadStream, // リクエストボディーを指定します。JSONを指定する場合は文字列化して指定します。
    //     form: object, // 値が設定された場合、content-type: application/x-www-form-urlencoded でリクエストを行います。
    //     formData: object, // 値が設定された場合、 content-type: multipart/form-data でリクエストを行います。
    //     multipart: array, // 値が設定された場合、 multipart/related でリクエストを行います。
    //     preambleCRLF: boolean, // multipart/form-data リクエストの境界の手前に CRLF改行 を挿入します。
    //     postambleCRLF: boolean, // multipart/form-data リクエストの境界の後ろに CRLF改行 を挿入します。
    //     json: boolean, body に JSON文字列 を指定している場合、リクエストヘッダーに content-type: application/json を付与します。 また、レスポンスボディーは JSONオブジェクト として パース を行います。
    // }

    /* URL 解析 */
    const url = new URL(options.url)
    
    // Query
    const qs = (options.qs || {})
    for (var key of Object.keys(qs)){ url.searchParams.set(key, qs[key]) }

    // Port
    url.port = (options.port || "")

    /* Client */
    var http_client = http
    if (url.protocol == "https:") { http_client = https }
    
    // Body
    var body = options.body

    /* Options */
    const reqOptions = {}
    
    // method
    reqOptions.method = options.method || "GET"

    // Headers 
    reqOptions.headers = options.headers || {}
    if (options.json) { 
        reqOptions.headers["Content-Type"] = "application/json"
    }

    const output = {
        error: null,
        response: null,
        data: null
    }

    return new Promise ((resolve, reject) => {
        const req = http_client.request(url, reqOptions, (res) => {

            output.response = res
            // output.response = {}

            var data = [];
            res.on("data", (chunk) => { data.push(chunk) });
            res.on("error", (e) => { output.error = e })
            res.on("end", () => {
                if (res.complete) {
                    var buffer = Buffer.concat(data);

                    if (options.json) {
                        output.body = JSON.parse(buffer.toString())
                    }
                    else {
                        output.body = buffer
                    }
                }
                else{
                    output.error = new Error("The connection was terminated while the message was still being sent")
                }
                resolve(output)
            })
        });
    
        req.on("error", (e) => {
            reject(e, null, null)
            console.error(e);
        });

        if (body) {
            req.write(body);
        }
        
        req.end();
    })
}


module.exports = {
    request
}