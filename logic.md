curl - X POST\
https://*****.azure-api.net/*****/recruit-web2 
Host: *****.azure-api.net
  Ocp-Apim-Subscription-Key: *****
  Ocp-Apim-Trace: true
  -H 'Content-Type: application/json'\
  -H 'Accept: application/json'\
    -d '{
          "data": {
            "loanRequestAmount": 30000000, //Int         希望借入額
            "bonusRatio": 10, //Int                      ボーナス割合
            "interestRate": "0.02", //String             金利
            "lastYearSalary": 5000000, //Int             前年度年収
            "birthday": "19760101", //String             年齢(生年月日より自動計算)
            "requestDuration": 35, //Int                 希望借入期間
            "oneTimePayment": 2000000, //Int             自己資金
            "loanPurpose": true, //Boolean               資金使途 (新築：true / 中古：false)　
            "dateOfCompanyJoin": "20000401", //String    入社年月日
            "familyPresence": true, //Boolean            家族同居有無（家族あり：true / 家族なし：false）
            "postalCode": "1000001", //String            郵便番号
            "employmentType": 1, //Int                   雇用形態区分 (正社員：1 / 法人役員：3 / 自営業：4 / 派遣社員・アルバイト・契約社員：90)　
            "companyCategoy": 1, //Int                   勤め先区分 (上場一部：1 / 上場二部：2 / 新興市場上場：3 / 非上場：4)
            "industryCategory": 10, //Int                業種区分 ＊下記業種区分参照
            "occupationCategory": 10, //Int              職種区分 ＊下記職種区分参照
            "insuranceStatus": true, //Boolean           加入保険種類（社保：true / 国保：false)
            "numberOfEmployees": 1, //Int                従業員数区分 (10人未満：1 / 50人未満：3 / 100人未満：4 / 100人以上：6)
            "existingLoanPresence": false //Boolean      住宅ローン有無（住宅ローンあり：true / 住宅ローンなし：false）
            "dateOfPreviousCompanyJoin":"20150120",      前職入社年月日
            "doubleLoan": false,  //Boolean              ローンありの場合の完済有無(完済予定あり：true ＝　ローンなし  完済予定なし：false　＝　ローンあり)
            "spousalIncome":1000000 //Int                連帯保証人の年収(半分のみ前年度年収に加算)
          }
       }
