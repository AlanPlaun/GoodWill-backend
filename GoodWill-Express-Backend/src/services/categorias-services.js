import config from '../../dbconfig-env.js';
import sql from 'mssql';
import tipopublicacion from '../models/tipopublicacion.js';

class CategoriasServices {
    GetAll = async () => {
        let returnEntity = null;
        console.log('Estoy en: CategoriasServices.GetAll()');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query('SELECT * FROM Categorias')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }

    GetById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: CategoriasServices.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Categorias WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    GetBycategoria = async (categoria) => {
        let returnEntity = null;
        console.log('Estoy en: CategoriasServices.GetById(categoria)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pcategoria', sql.VarChar, categoria)
                .query('SELECT * FROM Categorias WHERE categoria = @pcategoria');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    GetByTipo = async (tipo) => {
        let returnEntity = null;
        console.log('Estoy en: CategoriasServices.getByTipo(tipo)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre', sql.NChar , tipo)
                .query('SELECT Categorias.categoria, Categorias.imagen, Categorias.idCategoria,Categorias.puntos FROM Categorias INNER JOIN TipoPublicacion ON Categorias.fkTipoPublicacion = TipoPublicacion.idTipoPublicacion WHERE TipoPublicacion.nombre = @pnombre')
            returnEntity = result.recordsets[0]
            } catch(error){
                console.log(error);
            }
            return returnEntity;
    }

    Insert = async (categoria1) => {
        let rowsAffected = 0;
        console.log('Estoy en: CategoriasServices.Insert(categoria)');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pCategoria', sql.VarChar, categoria1?.categoria ?? '')
                .input('pPuntos', sql.Int, categoria1?.puntos ?? 0)
                .input('pfkTipoPublicacion', sql.Int, categoria1?.fkTipoPublicacion ?? 0)
                .query('INSERT INTO Categorias (categoria, puntos, fkTipoPublicacion) VALUES (@pCategoria, @pPuntos, @pfkTipoPublicacion)')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    Update = async (categoria1) => {
        let rowsAffected = 0;
        console.log('Estoy en: CategoriasServices.Update(categoria)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdCategoria', sql.Int, categoria1?.idCategoria ?? 0)
                .input('pCategoria', sql.VarChar, categoria1?.categoria ?? '')
                .input('pPuntos', sql.Int, categoria1?.puntos ?? 0)
                .input('pfkTipoPublicacion', sql.Int, categoria1?.fkTipoPublicacion ?? 0)
                .query('UPDATE Categorias SET categoria = @pCategoria, puntos=@pPuntos, pfkTipoPublicacion=@pfkTipoPublicacion WHERE idCategoria = @pIdCategoria')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }

        return rowsAffected;
    }

    DeleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: CategoriasServices.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Categorias WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}

export default CategoriasServices;