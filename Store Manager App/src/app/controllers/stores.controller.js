const db = require('../../config/postgres.config');
const functions = require('../../config/function.config');


class StoreController {
    //Store list

    //?store_name=...&address=...
    async findStores(req, res) { //like '%name%'
        const sql = functions.buildSQL(req.query, 'stores');

        try {
            const result = await db.query(sql);
            res.json(result);
        } catch (error) {
            console.log('error', error);
        }

    }


    //Create Store
    async createStore(req, res) {
        var formData = req.body;
        console.log(formData);
        try {
            await db.query('INSERT INTO stores (store_name, address) VALUES ($1, $2) RETURNING *',
                Object.values(formData));
            console.log('insert store success');
            res.json('success');
        } catch (error) {
            console.log('error', error);
        }
        return 0;
    }

    //Update store

    //:id
    async updateStore(req, res) {
        var formData = req.body;
        var id = req.params.id;
        console.log("formData: " + formData);
        try {
            await db.query('UPDATE stores SET store_name = $1, address = $2 WHERE id = $3', [...Object.values(formData), id]);
            console.log('update store success');
            res.json('success');
        } catch (error) {
            console.log('error', error);
        }
        return 0;
    }

    //Delete store
    async deleteStore(req, res) {
        var formData = req.body; // {field, value}
        console.log("formData: " + formData);
        try {
            await db.query(`DELETE FROM stores WHERE ${formData.field} = $1; `, [formData.value]);
            console.log('delete store success');
            res.json('success');
        } catch (error) {
            console.log('error', error);
        }
    }

    //?limit=&address=&pagenumber=
    async readStore(req, res) { //
        try {
            var limit = req.query.limit * 1;
            var address = req.query.address;
            var pageNum = req.query.pageNum * 1;
            var offet = limit * (pageNum - 1);
            console.log(limit, address, pageNum, offet);

            const result = await db.query('SELECT * FROM stores where address like $1 limit $2 offset $3', [`%${address}%`, limit, offet]);
            // res.json(result);
            res.json(result);
            console.log(result);
        } catch (error) {
            console.log('error', error);
        }
    }

}
module.exports = new StoreController();