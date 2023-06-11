import config from '../../dbconfig-env.js';
import sql from 'mssql';

class PublicacionesServices {
    GetAll = async () => {
        let returnEntity = null;
        console.log('Estoy en: PublicacionesServices.GetAll()');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query('SELECT * FROM Publicaciones')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }

    GetById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: PublicacionesServices.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Publicaciones WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    Insert = async (publicacion) => {
        let rowsAffected = 0;
        console.log('Estoy en: PublicacionesServices.Insert(publicacion)');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pTitulo', sql.VarChar, publicacion?.titulo ?? '')
                .input('pCantCredito', sql.Int, publicacion?.cantCredito ?? 0)
                .input('pDescripcion', sql.VarChar, publicacion?.descripcion ?? '')
                .input('pUbicacion', sql.VarChar, publicacion?.ubicacion ?? '')
                .input('pfkUsuario', sql.Int, publicacion?.fkUsuario ?? 0)
                .input('pfkCategoria', sql.Int, publicacion?.fkCategoria ?? 0)

                .query('INSERT INTO Publicaciones (titulo,cantCredito,descripcion,ubicacion,fkUsuario,fkCategoria) VALUES (@pTitulo,@pCantCredito,@pDescripcion,@pUbicacion,@pfkUsuario,@pfkCategoria)')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    Update = async (publicacion) => {
        let rowsAffected = 0;
        console.log('Estoy en: PublicacionesServices.Update(publicacion)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdPublicacion', sql.Int, publicacion?.idPublicacion ?? 0)
                .input('pTitulo', sql.VarChar, publicacion?.titulo ?? '')
                .input('pCantCredito', sql.Int, publicacion?.cantCredito ?? 0)
                .input('pDescripcion', sql.VarChar, publicacion?.descripcion ?? '')
                .input('pUbicacion', sql.VarChar, publicacion?.ubicacion ?? '')
                .input('pfkUsuario', sql.Int, publicacion?.fkUsuario ?? 0)
                .input('pfkCategoria', sql.Int, publicacion?.fkCategoria ?? 0)
                .query('UPDATE Publicaciones SET titulo = @pTitulo, cantCredito=@pCantCredito, descripcion=@pDescripcion, ubicacion=@pUbicacion, fkUsuario = @pfkUsuario, fkCategoria = @pfkCategoria WHERE idOpiniones = @pIdOpiniones')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }

        return rowsAffected;
    }

    DeleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: PublicacionesServices.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Publicaciones WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}

export default PublicacionesServices;