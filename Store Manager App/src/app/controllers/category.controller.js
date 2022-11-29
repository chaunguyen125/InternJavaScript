const db = require('../../config/postgres.config');
const functions = require('../../config/function.config');


class CategoryController {
    //?product_id=...&order_id=...&quantity=...&unit=...&total=...&limit=...&pageNum=...
    async findCategory(req, res) {
        const sql = functions.buildSQL(req.query, 'category');
        try {
            const result = await db.query(sql);
            res.json(result);
        } catch (error) {
            console.log('error', error);
        }
    }

    async createCategory(req, res) {
        var formData = req.body;
        console.log(formData);
        try {
            await db.query('INSERT INTO category (category_name) VALUES ($1) RETURNING *',
                Object.values(formData));
            console.log('insert product success');
            res.json('success');
        } catch (error) {
            console.log('error', error);
        }
        return 0;
    }

    //:id
    async updateCategory(req, res) {
        var formData = req.body;
        var id = req.params.id;
        console.log("formData: " + formData);
        await db.query('UPDATE category SET category_name = $1 WHERE id = $2', [...Object.values(formData), id]);
        console.log('update category success');
        res.json('success');
    } catch(error) {
        console.log('error', error);
    }



    async deleteCategory(req, res) {
        var formData = req.body; // {field, value}
        console.log("formData: " + formData);

        try {
            await db.query(`DELETE FROM category WHERE ${formData.field} = $1; `, [formData.value]);
            console.log('delete category success');
            res.json('success');
        } catch (error) {
            console.log('error', error);
        }
    }

}
module.exports = new CategoryController();