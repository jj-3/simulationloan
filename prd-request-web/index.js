// request-promise のインポート
// const request = require("request-promise");
const httpClient = require("../shared_scripts/http-client")

module.exports = async function (context, req) {
    // bodyが入っているかの確認
    const body = (typeof req.body === "string")? JSON.parse(req.body) : req.body;

    if (body){
        if (body.input1 && (body.input1.ColumnNames && body.input1.Values)) {
            //　モデルの実行
            const res = await callML(context, body);
            context.res.status = 200 /* Defaults to 200 */
            context.res.body = res
        }
        else {
            context.res.status = 400
            context.res.body = "NO much body"
        }
    }
    else{
        context.res.status = 400
        context.res.body = "NO request body"
    }
};

/** Azure ML 呼び出し*/
async function callML(context, body) {

    const apikey = process.env.ML_MODEL_API_KEY || "XAqpgoyefA0e81kSZa9g9bzTHMVC0kYyUNf55AXI4GufZz+UyGwTknexM3QU0EX3ngwiGtcgUISi6w1rVsFCIg=="

    const reqOptions = {}
    reqOptions.url = "https://japaneast.services.azureml.net/workspaces/24ec901c61df4a5597081e584d76f835/services/e80e502f5d6b41b1ba6e9c2e175cd4ba/execute?api-version=2.0&details=true"
    reqOptions.method = "POST"

    reqOptions.headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
    }

    reqOptions.body = JSON.stringify({
        "Inputs": body,
        "GlobalParameters": {}
    })

    reqOptions.json = true
    
    // モデル実行のAPIをたたく
    var res = await httpClient.request(reqOptions)

    const val = res.body.Results.output1.value.Values[0]

    const len = val.length;
    const num = val[len-1];
    return String(Math.floor( ( 1.0 - Number( num ) ) * 100 ));
}
