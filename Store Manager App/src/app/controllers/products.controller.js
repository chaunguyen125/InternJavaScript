const db = require ('../../config/postgres.config');
const functions = require('../../config/function.config');

class ProductController {
    //?product_name=...&price=...&code=...
    async findProducts(req, res) { //like '%name%'
        // console.log('query params', req.query);uct_name=ban
        const {product_name, price, code} = req.query;
        console.log('params===>', req.query);
        const whereClause = [];
        if (product_name) whereClause.push(`product_name like '%${product_name}%'`);
        if (price) whereClause.push(`price = ${price}`);
        if (code) whereClause.push(`code = '${code}'`);
        // console.log('where===>', whereClause)
        
        const where = whereClause.length > 0 ? whereClause.join(' and ') : '1=1';
        const sql = `SELECT * FROM products where ${where}`
        // console.log(sql);
        try {
            const result = await db.query(sql);
            // res.json(result);
            res.json(result);
            // console.log(result);
        } catch (error) {
            console.log('error', error);
        } 
        
    }

    async findProductsAdv(req, res) {
        const sql = functions.queryWithSortLastPleaseeeee(req.query, 'products');
        // console.log(sql);
        try {
            const result = await db.query(sql);
            res.json(result);
            // console.log(result);
        } catch (error) {
            console.log('error', error);
        } 
    }

    async createProduct(req, res) {
        var formData = req.body;
        console.log(formData);
        try {
            await db.query('INSERT INTO products (product_name, quantity, id_store, price, code) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            Object.values(formData));
            console.log('insert product success');
            res.json('success');
        } catch (error) {
            console.log('error', error);
        }
        return 0;
    }

    //:product_name
    async updateProduct(req, res) {
        var formData = req.body;
        var name = req.params.product_name;
        // console.log(formData);
        // console.log([ ...Object.values(formData), name]);
        try {
            await db.query('UPDATE products SET quantity = $1, id_store = $2, price = $3, code = $4, id_category = $5 WHERE product_name = $6', [ ...Object.values(formData), name]);
            console.log('update product success');
            res.json('success');
        } catch (error) {
            console.log('error', error); 
        }
        return 0;
    }



    async deleteProduct(req, res) {
        var formData = req.body; // {field, value}
        // var name = req.params.product_name;
        console.log(formData);
        console.log(Object.values(formData));
        // console.log([ ...Object.values(formData), name]);

        try {
            await db.query(`DELETE FROM products WHERE ${formData.field} = $1; `, [formData.value]);
            console.log('delete product success');
            res.json('success');
        } catch (error) {
            console.log('error', error); 
        }
    }

    async readProductByHieusAct(req, res) { //query params req.query
        try {
            console.log('Request', req.query)
            var formData = req.body; // {field, value}
            const result = await db.query(`SELECT * FROM products WHERE ${formData.field} = $1; `, [formData.value]);
            // res.json(result);
            res.json(result);
            console.log(result);
        } catch (error) {
            console.log('error', error);
        } 
        
    }

    //?limit=&category=&pagenumber=
    async readProductByCategory (req, res) { //
        try {
            var formData = req.body; // {field, value}
            var limit = req.query.limit*1;
            var category = req.query.category;
            var pageNum = req.query.pageNum*1;
            var offet = limit*(pageNum - 1);
            console.log(limit, category, pageNum, offet);

            const result = await db.query('SELECT products.product_name FROM products JOIN category ON category.category_name = $1 and products.id_category = category.id'
            + ' limit $2 offset $3', [category, limit, offet]);
            // res.json(result);
            res.json(result);
            console.log(result);
        } catch (error) {
            console.log('error', error);
        }
    }

}
module.exports = new ProductController();