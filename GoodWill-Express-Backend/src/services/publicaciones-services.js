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
    getbyidusuario = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: PublicacionesServices.getbyidusuario(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT p.titulo,i.imagen FROM Publicaciones p LEFT JOIN Imagenes i ON p.idPublicacion = i.fkPublicacion WHERE p.fkUsuario = @pId');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    Insert = async (publicacion) => {
        console.log('Estoy en: PublicacionesServices.Insert(publicacion)');
        let insertedId = null; // Variable para almacenar la ID insertada
    
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pTitulo', sql.VarChar, publicacion?.titulo ?? '')
                .input('pDescripcion', sql.VarChar, publicacion?.descripcion ?? '')
                .input('pUbicacion', sql.VarChar, publicacion?.ubicacion ?? '')
                .input('pfkUsuario', sql.Int, publicacion?.fkUsuario ?? 0)
                .input('pfkCategoria', sql.Int, publicacion?.fkCategoria ?? 0)
                .output('pIdPublicacion', sql.Int) // Definir un parámetro de salida para la ID insertada
                .query(`
                    INSERT INTO Publicaciones (titulo, descripcion, ubicacion, fkUsuario, fkCategoria)
                    OUTPUT inserted.idPublicacion -- Obtener la ID insertada
                    VALUES (@pTitulo, @pDescripcion, @pUbicacion, @pfkUsuario, @pfkCategoria)
                `);
    
            insertedId = result.recordsets[0][0]; // Obtener la ID insertada
        } catch (error) {
            console.log(error);
        }
        
        return insertedId; // Devolver la ID insertada
    }
    

    Update = async (publicacion) => {
        let rowsAffected = 0;
        console.log('Estoy en: PublicacionesServices.Update(publicacion)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdPublicacion', sql.Int, publicacion?.idPublicacion ?? 0)
                .input('pTitulo', sql.VarChar, publicacion?.titulo ?? '')
                .input('pDescripcion', sql.VarChar, publicacion?.descripcion ?? '')
                .input('pUbicacion', sql.VarChar, publicacion?.ubicacion ?? '')
                .input('pfkUsuario', sql.Int, publicacion?.fkUsuario ?? 0)
                .input('pfkCategoria', sql.Int, publicacion?.fkCategoria ?? 0)
                .query('UPDATE Publicaciones SET titulo = @pTitulo, descripcion=@pDescripcion, ubicacion=@pUbicacion, fkUsuario = @pfkUsuario, fkCategoria = @pfkCategoria WHERE idOpiniones = @pIdOpiniones')
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

    getPublicacionJoined = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: PublicacionesServices.publicacionesjoined(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT Publicaciones.idPublicacion, Usuario.nombreUsuario, Publicaciones.titulo, Publicaciones.descripcion, Publicaciones.ubicacion, Usuario.img,Imagenes.imagen FROM Publicaciones INNER JOIN Usuario ON Publicaciones.fkUsuario = Usuario.idUsuario inner join Imagenes on Imagenes.fkPublicacion = Publicaciones.idPublicacion');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}

export default PublicacionesServices;