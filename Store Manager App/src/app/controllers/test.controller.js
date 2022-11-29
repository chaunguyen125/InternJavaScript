const db = require('../../config/postgres.config');
const functions = require('../../config/function.config');
const { log } = require('console');

class TestController {
    // ?where={name: {like: 'a'}, price: { between: [1000, 2000]}}&limit=10&skip=0&order=[price asc]
    test(req, res) {
        const mapping = {
            like: "like",
            gt: ">",
            gte: ">=",
            lte: "<=",
            lt: "<",
            eq: "="
        };
        let { limit, pageNum, where, order } = req.query;
        console.log(limit, pageNum);
        let limitSegment = '';
        if (!Number.isNaN(Number(limit)))
            limitSegment = `LIMIT ${limit}`;

        if (Number.isNaN(Number(pageNum)))
            pageNum = 1;
        let offset = Number(limit) * (Number(pageNum) - 1);

        let offetSegment = '';
        if (!Number.isNaN(Number(offset)))
            offetSegment = `OFFSET ${offset}`;

        let orderSegment = '';
        if (order) {
            orderSegment = `ORDER BY`
            let value = JSON.parse(order);
            console.log(value);
            for (let key in value) {
                orderSegment = `${orderSegment} ${value[key]}`;
                console.log("order key " + key);
            }
        }

        let whereSegment = '';
        if (where) {
            whereSegment = `WHERE`
            // where={"name": {"like": "a"}, "price": {"between": [1000, 2000]}}
            console.log("where: " + where + typeof where);
            let value = JSON.parse(where);
            console.log("value: " + value + typeof value);
            for (let key in value) {
                console.log("value[key]");
                console.log(value[key]);
                console.log("key : " + key);
                for(let subKey in value[key]) {
                    try {
                        if (subKey == 'between')
                            whereSegment = `${whereSegment} ${key} ${subKey} ${value[key][subKey][0]} and ${value[key][subKey][1]}`;
                        else
                        whereSegment = `${whereSegment} ${key} ${mapping[subKey]} ${value[key][subKey]}`;
                    }
                    catch (e) {
                        console.log("error: " + e);
                    }

                }
            }
        }
        console.log("order clause: " + orderSegment);
        console.log("order clause: " + limitSegment);
        console.log("offset clause: " + offetSegment);
        console.log("where clause: " + whereSegment);      
        res.json('success');
    }
}

module.exports = new TestController();