import config from '../../dbconfig-env.js';
import sql from 'mssql';

class ContratacionesServices {
    GetAll = async () => {
        let returnEntity = null;
        console.log('Estoy en: ContratacionesServices.GetAll()');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query('SELECT * FROM Contrataciones')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }

    GetById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: ContratacionesServices.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Contrataciones WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    Insert = async (contrato) => {
        let rowsAffected = 0;
        console.log('Estoy en: ContratacionesServices.Insert(contrato)');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pFechaInicio', sql.Date, contrato?.fechaInicio ?? '') //FIJARSE SI ESTA BIEN EL VALOR POR DEFECTO
                .input('pFechaFin', sql.Date, contrato?.cantCredito ?? '') //FIJARSE SI ESTA BIEN EL VALOR POR DEFECTO
                .input('pfkUsuario1', sql.Int, contrato?.descripcion ?? 0)
                .input('pfkUsuario2', sql.Int, contrato?.ubicacion ?? 0)
                .input('pfkPublicacion', sql.Int, contrato?.fkUsuario ?? 0)
                .query('INSERT INTO Contrataciones (fechaInicio, fechaFin, fkUsuario1, fkUsuario2, fkPublicacion) VALUES (@pFechaInicio,@pFechaFin,@pfkUsuario1,@pfkUsuario2,@pfkPublicacion)')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    Update = async (contrato) => {
        let rowsAffected = 0;
        console.log('Estoy en: ContratacionesServices.Update(contrato)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdContratacion', sql.Int, contrato?.idContratacion ?? 0)
                .input('pFechaInicio', sql.Date, contrato?.fechaInicio ?? '') //FIJARSE SI ESTA BIEN EL VALOR POR DEFECTO
                .input('pFechaFin', sql.Date, contrato?.cantCredito ?? '') //FIJARSE SI ESTA BIEN EL VALOR POR DEFECTO
                .input('pfkUsuario1', sql.Int, contrato?.descripcion ?? 0)
                .input('pfkUsuario2', sql.Int, contrato?.ubicacion ?? 0)
                .input('pfkPublicacion', sql.Int, contrato?.fkUsuario ?? 0)
                .query('UPDATE Contrataciones SET fechaInicio = @pFechaInicio, fechaFin=@pFechaFin, fkUsuario1=@pfkUsuario1, fkUsuario2=@pfkUsuario2, fkPublicacion = @pfkPublicacion WHERE idContratacion = @pIdContratacion')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }

        return rowsAffected;
    }

    DeleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: ContratacionesServices.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Contrataciones WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}

export default ContratacionesServices;