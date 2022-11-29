//
const mapping = {
  like: "like",
  gt: ">",
  gte: ">=",
  lte: "<=",
  lt: "<",
  eq: "="
};

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
  buildSQL(reqQuery, table) {
    let { limit, pageNum, where, order } = reqQuery;
    console.log(limit, pageNum);
    let limitSegment = '';
    if (!Number.isNaN(Number(limit)))
      limitSegment = `LIMIT ${limit}`;

    if (Number.isNaN(Number(pageNum)))
      pageNum = 1;
    let offset = Number(limit) * (Number(pageNum) - 1);

    let offsetSegment = '';
    if (!Number.isNaN(Number(offset)))
      offsetSegment = `OFFSET ${offset}`;

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
      let whereClause = []
      // where={"name": {"like": "a"}, "price": {"between": [1000, 2000]}}
      console.log("where: " + where + typeof where);
      let value = JSON.parse(where);
      console.log("value: " + value + typeof value);
      for (let key in value) {
        console.log("value[key]");
        console.log(value[key]);
        console.log("key : " + key);
        for (let subKey in value[key]) {
          try {
            if (subKey == 'between')
              whereClause.push(`${key} ${subKey} ${value[key][subKey][0]} and ${value[key][subKey][1]}`);
            else
              whereClause.push(`${key} ${mapping[subKey]} ${value[key][subKey]}`);
          }
          catch (e) {
            console.log("error: " + e);
          }

        }
      }
      whereSegment =`WHERE ${whereClause.join(' and ')}`
    }
    console.log("order clause: " + orderSegment);
    console.log("order clause: " + limitSegment);
    console.log("offset clause: " + offsetSegment);
    console.log("where clause: " + whereSegment);

    let sql = `
        SELECT
          *
        FROM
          ${table}
        ${whereSegment}
        ${orderSegment}
        ${limitSegment}
        ${offsetSegment}
      `

    console.log(sql);
    return sql;
  }
  
}


module.exports = new Functions();