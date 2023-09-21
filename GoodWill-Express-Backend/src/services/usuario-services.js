import res from 'express/lib/response.js';
import config from '../../dbconfig-env.js';
import sql from 'mssql';

class UsuarioServices {
    GetAll = async () => {
        let returnEntity = null;
        console.log('Estoy en: UsuarioServices.GetAll()');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query(`SELECT * FROM Usuario`)
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }

    GetByMailAndPassword = async (usuario) => {
        console.log('Estoy en UsuarioServices.GetByMailAndPassword(usuario)');
        try {
          const pool = await sql.connect(config);
          const result = await pool
            .request()
            .input('pEmail', sql.VarChar, usuario?.email ?? '')
            .input('pContrasena', sql.VarChar, usuario?.contrasena ?? '')
            .query('SELECT TOP 1 * FROM Usuario WHERE email = @pEmail AND contraseña = @pContrasena');
      
          if (result.recordset.length > 0) {
            return result.recordset[0];
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          console.log(error);
          throw new Error('Database error');
        } 
      };

    GetById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: UsuarioServices.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Usuario WHERE idUsuario = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    Insert = async (usuario) => {
        let rowsAffected = 0;
        console.log('Estoy en: UsuarioServices.Insert(usuario)');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pImg', sql.VarChar, usuario?.img ?? '')
                .input('pEmail', sql.VarChar, usuario?.email ?? '')
                .input('pNombreUsuario', sql.VarChar, usuario?.nombreUsuario ?? '')
                .input('pContraseña', sql.VarChar, usuario?.contraseña ?? '')
                .input('pNombre', sql.VarChar, usuario?.nombre ?? '')
                .input('pApellido', sql.VarChar, usuario?.apellido ?? '')
                .input('pFechaNacimiento', sql.Date, usuario?.fechaNacimiento ?? '') //FIJARSE SI EL VALOR DEFAULT ESTA BIEN
                .input('pDireccion', sql.VarChar, usuario?.direccion ?? '')
                .input('pCreditos', sql.Int, usuario?.creditos ?? 0)
                .input('pDescripcion', sql.VarChar, usuario?.descripcion ?? '')
                .input('pPuntuacion', sql.Int, usuario?.puntuacion ?? 0)
                .query('INSERT INTO Usuario (img, email, nombreUsuario, contraseña, nombre, apellido, fechaNacimiento, direccion, creditos, descripcion, puntuacion) VALUES (@pImg, @pEmail, @pNombreUsuario, @pContraseña, @pNombre, @pApellido, @pFechaNacimiento, @pDireccion, @pCreditos, @pDescripcion, @pPuntuacion)')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    Update = async (usuario) => {
        let rowsAffected = 0;
        console.log('Estoy en: UsuarioServices.Update(usuario)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdUsuario', sql.Int, usuario?.idUsuario ?? 0)
                .input('pImg', sql.VarChar, usuario?.img ?? '')
                .input('pEmail', sql.VarChar, usuario?.email ?? '')
                .input('pNombreUsuario', sql.VarChar, usuario?.nombreUsuario ?? '')
                .input('pContraseña', sql.VarChar, usuario?.contraseña ?? '')
                .input('pNombre', sql.VarChar, usuario?.nombre ?? '')
                .input('pApellido', sql.VarChar, usuario?.apellido ?? '')
                .input('pFechaNacimiento', sql.Date, usuario?.fechaNacimiento ?? '') //FIJARSE SI EL VALOR DEFAULT ESTA BIEN
                .input('pDireccion', sql.VarChar, usuario?.direccion ?? '')
                .input('pCreditos', sql.Int, usuario?.creditos ?? 0)
                .input('pDescripcion', sql.VarChar, usuario?.descripcion ?? '')
                .input('pPuntuacion', sql.Int, usuario?.puntuacion ?? 0)
                .query('UPDATE Usuarios SET email = @pEmail, nombreUsuario = @pNombreUsuario, contraseña = @pContraseña, nombre = @pNombre, apellido = @pApellido, fechaNacimiento = @pFechaNacimiento, direccion = @pDireccion, creditos = @pCreditos, descripcion = @pDescripcion, puntuacion = @pPuntuacion WHERE idUsuario = @pIdUsuario')
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }

        return rowsAffected;
    }

    // DeleteById = async (id) => {
    //     let rowsAffected = 0;
    //     console.log('Estoy en: UsuarioServices.deleteById(id)');
    //     try {
    //         let pool = await sql.connect(config);
    //         let result = await pool.request()
    //                                 .input('pId', sql.Int, id)
    //                                 .query('DELETE FROM Usuario WHERE id = @pId');
    //         rowsAffected = result.rowsAffected;
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     return rowsAffected;
    // }

}

export default UsuarioServices;