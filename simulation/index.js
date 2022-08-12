// 関数 prd-request-web のインポート
const PrdRequestWeb = require("./preprocessor/controller/PrdRequestWeb");

const dayjs = require("dayjs");
const JST = "Asia/Tokyo";
dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));
dayjs.extend(require("dayjs/plugin/isBetween"));
dayjs.tz.setDefault(JST);

const InputData = require("./preprocessor/valueObject/InputData");
const LastYearSalary = require("./preprocessor/valueObject/InputData/attributes/LastYearSalary");
const ResumeData = require("./preprocessor/valueObject/ResumeData");
const OutputData = require("./preprocessor/valueObject/OutputData");
const ApiResponse = require("./preprocessor/presenter/Response");

const { ValidationErrors, ExaminationError } = require("./preprocessor/general/Errors")

module.exports = async function (context, req) {
    const apiResponse = new ApiResponse(context.res)
    const user = void 0

    try {
        /** Content-Type チェック */
        if (req.headers["content-type"] !== "application/json") {
            throw new ValidationErrors.MediaTypeError("Unsupported media type.");
        }

        /** リクエストチェック */
        var reqBody = req.body
        
        // 空リクエストチェック
        if (reqBody === void 0) {
            throw new ValidationErrors.BadArgumentError("Request body is not provided.");
        }
        // JSONチェック
        if (reqBody.constructor === String) {
            try {
                reqBody = JSON.parse(reqBody);
            }
            catch (e) {
                throw new ValidationErrors.BadArgumentError("Bad or unrecognizable request JSON.");
            };
        };


        // (実証実験)
        if (reqBody.lastYearSalary === void 0) {
            throw new ValidationErrors.KeyError(`Required key is not provided.`);
        };
        const lastYearSalary = new LastYearSalary(reqBody.lastYearSalary);
        reqBody.loanRequestAmount = Math.round(lastYearSalary.toNumber() * 7.5);

        reqBody.requestDuration = 35;
        reqBody.interestRate = "0.02";
        // (実証実験)

        /** クライアントから受信する審査情報 */
        const inputData = new InputData(reqBody);

        /** 審査情報算出 */
        const resumeData  = new ResumeData(inputData);

        /** Pattern1: ナレコムAIへ直接の審査依頼を送信 */
        const amlReqBody = resumeData.toAmlRequestBody();

        const startTime = dayjs();
        var res = await PrdRequestWeb(context, {body: amlReqBody});
        resumeData.addScore(res.body)
        const resultData = OutputData.of(user, resumeData);
        const endTime = dayjs();

        const time = endTime.diff(startTime, 'ms');
        context.log.info(`審査処理時間: ${time}ms, score: ${resumeData.score.toNumber()}`);

        apiResponse.ok(resultData.toObject());

    }
    catch (err) {
        switch (err.constructor) {
            case ExaminationError:
                context.log.info(err);
                const resultData = OutputData.reject(user);
                apiResponse.ok(resultData.toObject());
                break
            case ValidationErrors.BadArgumentError:
            case ValidationErrors.KeyError:
            case ValidationErrors.TypeError:
            case ValidationErrors.RangeError:
            case ValidationErrors.FormatError:
                apiResponse.badRequest(err);
                context.log.warn(err);
                break;
            case ValidationErrors.MediaTypeError:
                apiResponse.unsupportedMediaType(err)
                context.log.warn(err);
                break;
            default:
                apiResponse.internalServerError(err);
                context.log.error(err);
        };
    };
};


