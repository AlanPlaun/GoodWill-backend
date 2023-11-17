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
    InsertNuevaContratacion = async (contrato) => {
        function convertirAFechaSQL(fecha) {
            const partes = fecha.split('/');
            const fechaSQL = `${partes[2]}-${partes[1]}-${partes[0]}`;
            return fechaSQL;
          }
        const formattedDate = convertirAFechaSQL(contrato?.fechaInicio);
        let rowsAffected = 0;
        console.log('Estoy en: ContratacionesServices.Insert(contrato)');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pFechaInicio', sql.Date, formattedDate ?? '') //FIJARSE SI ESTA BIEN EL VALOR POR DEFECTO
                .input('pfkUsuario1', sql.Int, contrato?.fkUsuario1 ?? 0)
                .input('pfkPublicacion', sql.Int, contrato?.fkPublicacion ?? 0)
                .input('pEstado', sql.VarChar, contrato?.estado ?? '')
                .query('INSERT INTO Contrataciones (fechaInicio, fkUsuario1, fkPublicacion, estado) VALUES (@pFechaInicio,@pfkUsuario1,@pfkPublicacion,@pEstado)')
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
    GetByIdUsuario = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: ContratacionesServices.GetByIdUsuario(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT Publicaciones.*, Imagenes.imagen, Contrataciones.idContratacion, Contrataciones.fechaFin FROM Contrataciones JOIN Publicaciones ON Contrataciones.fkPublicacion = Publicaciones.idPublicacion LEFT JOIN Imagenes ON Publicaciones.idPublicacion = Imagenes.fkPublicacion WHERE Contrataciones.fkUsuario1 = @pId');
            returnEntity = result.recordsets[0];
            console.log(returnEntity)
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    GetContratacionByUsuarioYPublicacion = async (datos) => {
        let returnEntity = null;
        console.log('Estoy en: ContratacionesServices.GetContratacionByUsuarioYPublicacion(datos)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pFkUsuario1', sql.Int, datos?.fkUsuario1 ?? 0)
                .input('pFkPublicacion', sql.Int, datos?.fkPublicacion ?? 0)
                .query('SELECT * FROM Contrataciones WHERE fkUsuario1 = @pFkUsuario1 AND fkPublicacion = @pFkPublicacion');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    
    finalizarContratacion = async (datos) => {
        let rowsAffected = 0;
        console.log('Estoy en: ContratacionesServices.finalizarContratacion(datos)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pFechaFin', sql.Date, datos?.fechaFin ?? '')
                .input('pEstado', sql.VarChar, datos?.estado ?? '')
                .input('pIdContrataciones', sql.Int, datos?.idContrataciones ?? 0)
                .query('UPDATE Contrataciones SET fechaFin = @pFechaFin, estado = @pEstado WHERE idContrataciones = @pIdContrataciones')
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