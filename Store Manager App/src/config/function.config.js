//

class Functions {

    query(reqQuery, table) {
        var limit = reqQuery.limit * 1;
        var pageNum = reqQuery.pageNum * 1;
        var offet = limit * (pageNum - 1);
        console.log(limit, pageNum, offet);
        const whereClause = [];
        for (let key in reqQuery) {
            if (key != 'limit' && key != 'pageNum') {
                let value = reqQuery[key];
                if (Number.isNaN(Number(value)) === true)
                    whereClause.push(`${key} = '${value}'`);
                else
                    whereClause.push(`${key} = ${value}`);
            }
        }

        const where = whereClause.length > 0 ? whereClause.join(' and ') : '1=1';
        // console.log(where);
        const sql = `SELECT * FROM ${table} where ${where} limit ${limit} offset ${offet}`;
        return sql;
    }

    queryWithOperator(reqQuery, table) {
        // console.log(reqQuery);
        var limit = reqQuery.limit * 1;
        var pageNum = reqQuery.pageNum * 1;
        var offet = limit * (pageNum - 1);
        console.log(limit, pageNum, offet);
        const whereClause = [];
        const mapping = {
            like: "like",
            gt: ">",
            gte: ">=",
            lte: "<=",
            lt: "<",
            eq: "="
        };
        for (let key in reqQuery) {
            if (key != 'limit' && key != 'pageNum') {
                try {
                    const k = reqQuery[key]
                    // console.log('key===>', k, typeof k);

                    let value = JSON.parse(k)
                    console.log(value);
                    for (let key2 in value) {
                        console.log('key 2: ' + key2);
                        if (key2 == 'between')
                            whereClause.push(`${key} ${key2} ${value[key2][0]} and ${value[key2][1]}`);
                        else
                            whereClause.push(`${key} ${mapping[key2]} ${value[key2]}`);

                    }

                }
                catch (e) {
                    console.log('key: ', reqQuery[key]);
                    whereClause.push(`${key} = ${reqQuery[key]}`);
                }
            }
        }

        let where = whereClause.length > 0 ? whereClause.join(' and ') : '1=1';
        console.log(where);
        const sql = `SELECT * FROM ${table} where ${where} limit ${limit} offset ${offet}`;
        console.log(sql);
        return sql;
    }
    //?a={operator:value,}...&order=[product_name...]
    queryWithSort(reqQuery, table) {
        var limit = reqQuery.limit * 1;
        var pageNum = reqQuery.pageNum * 1;
        var offet = limit * (pageNum - 1);
        console.log(limit, pageNum, offet);
        const whereClause = [];
        const orderByClause = JSON.parse(reqQuery.order);
        const mapping = {
            like: "like",
            gt: ">",
            gte: ">=",
            lte: "<=",
            lt: "<",
            eq: "="
        };
        for (let key in reqQuery) {
            if (key != 'limit' && key != 'pageNum' && key != 'order') {
                try {
                    const k = reqQuery[key]
                    // console.log('key===>', k, typeof k);

                    let value = JSON.parse(k)
                    console.log(value);
                    for (let key2 in value) {
                        console.log('key 2: ' + key2);
                        if (key2 == 'between')
                            whereClause.push(`${key} ${key2} ${value[key2][0]} and ${value[key2][1]}`);
                        else
                            whereClause.push(`${key} ${mapping[key2]} ${value[key2]}`);
                    }

                }
                catch (e) {
                    console.log('key: ', reqQuery[key]);
                    whereClause.push(`${key} = ${reqQuery[key]}`);
                }
            }

        }

        console.log('where clause ' + whereClause);

        let where = whereClause.length > 0 ? whereClause.join(' and ') : '1=1';
        console.log(where);
        if (orderByClause.length > 0) {
            let order = orderByClause.length > 0 ? orderByClause.join(' , ') : "";
            console.log(order);
            var sql = `SELECT * FROM ${table} where ${where} order by ${order} limit ${limit} offset ${offet} `;

        }
        else {

            var sql = `SELECT * FROM ${table} where ${where} limit ${limit} offset ${offet} `;
        }


        console.log(sql);
        return sql;
    }


    // ?where={name: {like: 'a'}, price: { between: [1000, 2000]}}&limit=10&skip=0&order=[price asc]
    queryWithSortLastPleaseeeee(reqQuery, table) {
        var limit = reqQuery.limit * 1;
        var pageNum = reqQuery.pageNum * 1;
        var offet = limit * (pageNum - 1);
        console.log(limit, pageNum, offet);
        const whereClause = [];
        const orderByClause = JSON.parse(reqQuery.order);
        const mapping = {
            like: "like",
            gt: ">",
            gte: ">=",
            lte: "<=",
            lt: "<",
            eq: "="
        };
        for (let key in reqQuery) {
            if (key != 'limit' && key != 'pageNum' && key != 'order' && key != 'skip') {
                try {
                    const k = reqQuery[key];
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
                    let value = JSON.parse(reqQuery[key]);
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

        console.log('where clause ' + whereClause);

        let where = whereClause.length > 0 ? whereClause.join(' and ') : '1=1';
        console.log(where);
        if (orderByClause.length > 0) {
            let order = orderByClause.length > 0 ? orderByClause.join(' , ') : "";
            console.log(order);
            var sql = `SELECT * FROM ${table} where ${where} order by ${order} limit ${limit} offset ${offet} `;

        }
        else {

            var sql = `SELECT * FROM ${table} where ${where} limit ${limit} offset ${offet} `;
        }


        console.log(sql);
        return sql;
    }
}


module.exports = new Functions();