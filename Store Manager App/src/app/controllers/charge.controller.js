const db = require ('../../config/postgres.config');
const functions = require('../../config/function.config');


class ChargeController {
    //?product_id=...&order_id=...&quantity=...&unit=...&total=...&limit=...&pageNum=...
    async findCharge(req, res) {
        const sql = functions.buildSQL(req.query, 'charge');
        try {
            const result = await db.query(sql);
            res.json(result);
        } catch (error) {
            console.log('error', error);
        } 
    }

    async createCharge(req, res) {
        var formData = req.body;
        console.log(formData);
        try {
            await db.query('INSERT INTO charge (product_id, order_id, quantity, unit, total) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            Object.values(formData));
            console.log('insert product success');
            res.json('success');
        } catch (error) {
            console.log('error', error);
        }
        return 0;
    }

    //:id
    async updateCharge(req, res) {
        var formData = req.body;
        var id = req.params.id;
        console.log("formData: "+formData);
        try {
            await db.query('UPDATE charge SET product_id = $1, order_id = $2, quantity = $3, unit = $4, total = $5 WHERE id = $6', [ ...Object.values(formData), id]);
            console.log('update charge success');
            res.json('success');
        } catch (error) {
            console.log('error', error); 
        }
        return 0;
    }



    async deleteCharge(req, res) {
        var formData = req.body; // {field, value}
        console.log(formData);
        console.log(Object.values("formData"+formData));

        try {
            await db.query(`DELETE FROM charge WHERE ${formData.field} = $1; `, [formData.value]);
            console.log('delete charge success');
            res.json('success');
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
            console.log(limit, category,pageNum, offet);

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
module.exports = new ChargeController();