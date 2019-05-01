const httpStatus = require('http-status')

// 모든 응답을 통일 시키는 방법
// res.body.data 로 통일시킨다.
// app.js 에서 에러가 나면 에러 메시지는 res.body.data.message 로 읽으면 된다.
export default (res, data = {}, code = httpStatus.OK) => {
    let result = {
        success: true
    }

    if (code > 399) {
        result.success = false
    }

    // 알다시피 { data } == { data: data } 다.
    if (typeof data === 'object') {
        result = Object.assign({
            data
        }, result)
    }
    // json 포맷으로 응답
    return res.status(code).json(result)
}
