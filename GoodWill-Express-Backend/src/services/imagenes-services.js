import config from '../../dbconfig-env.js';
import sql from 'mssql';

class ImagenesServices {
    GetAll = async () => {
        let returnEntity = null;
        console.log('Estoy en: ImagenesServices.GetAll()');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query('SELECT * FROM Imagenes')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }

    GetById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: ImagenesServices.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Imagenes WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    

    Insert = async (img) => {
        let rowsAffected = 0;
        console.log('Estoy en: ImagenesServices.Insert(img)');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pImagen', sql.VarChar, img?.puntos ?? '')
                .input('pfkPublicacion', sql.Int, img?.fkPublicacion ?? 0)
                .query('INSERT INTO Imagenes (imagen,fkPublicacion) VALUES (@pImagen,@pfkPublicacion)')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    Update = async (img) => {
        let rowsAffected = 0;
        console.log('Estoy en: ImagenesServices.Update(img)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdImagenes', sql.Int, opinion?.idOpiniones ?? 0)
                .input('pImagen', sql.VarChar, opinion?.puntos ?? '')
                .input('pfkPublicacion', sql.Int, opinion?.fkPublicacion ?? 0)
                .query('UPDATE Imagenes SET imagen = @pImagen, fkPublicacion = @pfkPublicacion WHERE idImagenes = @pIdImagenes')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }

        return rowsAffected;
    }

    DeleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: ImagenesServices.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Imagenes WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}

export default ImagenesServices;