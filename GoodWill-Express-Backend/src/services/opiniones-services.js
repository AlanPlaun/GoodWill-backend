import config from '../../dbconfig-env.js';
import sql from 'mssql';

class OpinionesServices {
    GetAll = async () => {
        let returnEntity = null;
        console.log('Estoy en: OpinionesServices.GetAll()');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query('SELECT * FROM Opiniones')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }

    GetById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: OpinionesServices.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Opiniones WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    Insert = async (opinion) => {
        let rowsAffected = 0;
        console.log('Estoy en: OpinionesServices.Insert(opinion)');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pPuntos', sql.Int, opinion?.puntos ?? 0)
                .input('pfkUsuario', sql.Int, opinion?.fkUsuario ?? 0)
                .input('pfkPublicacion', sql.Int, opinion?.fkPublicacion ?? 0)
                .query('INSERT INTO Opiniones (puntos,fkUsuario,fkPublicacion) VALUES (@pPuntos,@pfkUsuario,@pfkPublicacion)')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    Update = async (opinion) => {
        let rowsAffected = 0;
        console.log('Estoy en: OpinionesServices.Update(opinion)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdOpiniones', sql.Int, opinion?.idOpiniones ?? 0)
                .input('pPuntos', sql.Int, opinion?.puntos ?? 0)
                .input('pfkUsuario', sql.Int, opinion?.fkUsuario ?? 0)
                .input('pfkPublicacion', sql.Int, opinion?.fkPublicacion ?? 0)
                .query('UPDATE Opiniones SET puntos = @pPuntos, fkUsuario = @fkUsuario, fkPublicacion = @pfkPublicacion WHERE idOpiniones = @pIdOpiniones')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }

        return rowsAffected;
    }

    DeleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: OpinionesServices.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Opiniones WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}

export default OpinionesServices;