const db = require ('../../config/postgres.config');
const functions = require('../../config/function.config');


class OrderController {
    //Create Store
    async createOrder(req, res) {
        var formData = req.body;
        console.log(formData);
        try {
            await db.query('INSERT INTO orders (order_code) VALUES ($1) RETURNING *', 
            Object.values(formData));
            console.log('insert orders success');
            res.json('success');
        } catch (error) {
            console.log('error', error);
        }
        return 0;
    }

    //Update order

    //:id
    async updateOrder(req, res) {
        var formData = req.body;
        var id = req.params.id;
        console.log("formData: "+formData);
        try {
            await db.query('UPDATE orders SET order_code = $1 WHERE id = $2', [ ...Object.values(formData), id]);
            console.log('update order success');
            res.json('success');
        } catch (error) {
            console.log('error', error); 
        }
        return 0;
    }

    //Delete order
    async deleteOrder(req, res) {
        var formData = req.body; // {field, value}
        console.log("formData: "+formData);

        try {
            await db.query(`DELETE FROM orders WHERE ${formData.field} = $1; `, [formData.value]);
            console.log('delete store success');
            res.json('success');
        } catch (error) {
            console.log('error', error); 
        }
    }

    //?limit=&order_code=&pagenumber=
    async readOrder(req, res) { //
        const sql = functions.buildSQL(req.query, 'orders');
        try {
            const result = await db.query(sql);
            res.json(result);
        } catch (error) {
            console.log('error', error);
        } 
    }

}
module.exports = new OrderController();