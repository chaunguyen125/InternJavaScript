const db = require('../../config/postgres.config');
const functions = require('../../config/function.config');
const { log } = require('console');

class TestController {
        // ?where={name: {like: 'a'}, price: { between: [1000, 2000]}}&limit=10&skip=0&order=[price asc]
    test(req, res) {
        //?a={operator:value,
        //sort: asc/desc}
        // console.log(req.query);
        var limit = req.query.limit * 1;
        var pageNum = req.query.pageNum * 1;
        var offet = limit * (pageNum - 1);
        console.log(limit, pageNum, offet);
        const whereClause = [];
        const orderByClause = [];
        const mapping = {
            like: "like",
            gt: ">",
            gte: ">=",
            lte: "<=",
            lt: "<",
            eq: "="
        };
        for (let key in req.query) {
            if (key != 'limit' && key != 'pageNum' && key != 'order' && key != 'skip') {
                try {
                    const k = req.query[key];
                    console.log("query[key] "+k, typeof k);
                    // console.log('key===>', k, typeof k);

                    let value = JSON.parse(k);
                    console.log("value: " + value + typeof value) ;
                    for (var key2 in value) {
                        console.log("key2: " + key2);
                        for (let key3 in value[key2]) {
                            console.log('key 3: ' + key3);
                            if (key3 == 'between')
                                // console.log(value[key2][key3]);
                                whereClause.push(`${key2} ${key3} ${value[key2][key3][0]} and ${value[key2][key3][1]}`);
                            else
                                whereClause.push(`${key2} ${mapping[key3]} ${value[key2][key3]}`);

                        }
                    }

                }
                catch (e) {
                    console.log(e);
                }
            }
            if (key == 'order') {
                try {
                    let value = JSON.parse(req.query[key]);
                    console.log(value);
                    for (key in value) {
                        orderByClause.push(`${value[key]}`);
                        console.log(key);
                    }
                    console.log('order clause ' + orderByClause);

                }
                catch (e) {
                    console.log(e);
                }
            }

        }

        // console.log('where clause ' + whereClause);
        
        let where = whereClause.length > 0 ? whereClause.join(' and ') : '1=1';
        console.log(where);
        if(orderByClause.length > 0) {
            let order = orderByClause.length > 0 ? orderByClause.join(' , ') : "";
            console.log(order);
            var sql = `SELECT * FROM X where ${where} order by ${order} limit ${limit} offset ${offet} `;
            
        }
        else {

            var sql = `SELECT * FROM X where ${where} limit ${limit} offset ${offet} `;
        }


        console.log(sql);
        res.json('success');
    }
}

module.exports = new TestController();