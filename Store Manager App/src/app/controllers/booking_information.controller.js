const db = require('../../config/postgres.config');
const functions = require('../../config/function.config');


class BookingInformationController {
    //?order_id=...&full_name=...&email=...&address=...&phone_number=...&limit=...&pageNum=...
    async findBookingInformation(req, res) {
        const sql = functions.buildSQL(req.query, 'booking_information');

        try {
            const result = await db.query(sql);
            res.json(result);
        } catch (error) {
            console.log('error', error);
        }
    }

    async createBookingInformation(req, res) {
        var formData = req.body;
        console.log(formData);
        try {
            await db.query('INSERT INTO booking_information (order_id, full_name, email, address, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                Object.values(formData));
            console.log('insert booking_information success');
            res.json('success');
        } catch (error) {
            console.log('error', error);
        }
        return 0;
    }

    //:id
    async updateBookingInformation(req, res) {
        var formData = req.body;
        var id = req.params.id;
        console.log("formData: " + formData);
        try {
            await db.query('UPDATE booking_information SET order_id = $1, full_name = $2 , email = $3, address = $4 , phone_number = $5 WHERE id = $6',
                [...Object.values(formData), id]);
            console.log('update booking_information success');
            res.json('success');
        } catch (error) {
            console.log('error', error);
        }
        return 0;
    }



    async deleteBookingInformation(req, res) {
        var formData = req.body; // {field, value}
        console.log(formData);
        console.log(Object.values(formData));

        try {
            await db.query(`DELETE FROM booking_information WHERE ${formData.field} = $1; `, [formData.value]);
            console.log('delete booking success');
            res.json('success');
        } catch (error) {
            console.log('error', error);
        }
    }

}
module.exports = new BookingInformationController();