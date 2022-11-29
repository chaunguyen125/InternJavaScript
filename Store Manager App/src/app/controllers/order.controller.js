const db = require ('../../config/postgres.config');
const functions = require('../../config/function.config');


class OrderController {
    //Store list

    //?store_name=...&address=...
    // async findOrders(req, res) { //like '%name%'
    //     // console.log('query params', req.query);

    //     const {store_name, address} = req.query;
    //     const whereClause = [];
    //     if(store_name) whereClause.push(`store_name like '%${store_name}%'`);
    //     if(address) whereClause.push(`address like '%${address}%'`);
    //     const where = whereClause.length > 0 ? whereClause.join(' and ') : '1=1';
    //     const sql = `SELECT * FROM stores where ${where}`;
    //     console.log(sql);
    //     try {
    //         const result = await db.query(sql);
    //         // res.json(result);
    //         res.json(result);
    //         // console.log(result);
    //     } catch (error) {
    //         console.log('error', error);
    //     } 
        
    // }


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
        // console.log(formData);
        // console.log([ ...Object.values(formData), name]);
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
        // var name = req.params.product_name;
        console.log(formData);
        console.log(Object.values(formData));
        // console.log([ ...Object.values(formData), name]);

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
        const sql = functions.queryWithSort(req.query, 'orders');
        try {
            const result = await db.query(sql);
            // res.json(result);
            res.json(result);
            // console.log(result);
        } catch (error) {
            console.log('error', error);
        } 
    }

}
module.exports = new OrderController();