const { Pool } = require('pg');

exports.handler = async (event, context) => {
  try {
    const pool = new Pool({
      connectionString: process.env.NEON_CONNECTION_STRING,
    });

    const data = JSON.parse(event.body);
    const query = `
      INSERT INTO production_data (sicil_no, tarih, vardiya, hat, dummy_no, jig_no, hata_kodu, degisen_parca, parca_adedi, aciklama)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    await pool.query(query, [
      data.sicil_no,
      data.tarih,
      data.vardiya,
      data.hat,
      data.dummy_no,
      data.jig_no,
      data.hata_kodu,
      data.degisen_parca,
      data.parca_adedi,
      data.aciklama
    ]);

    await pool.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Veri kaydedildi" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Veri kaydedilemedi" }),
    };
  }
};