const {Pool} = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'always_music',
    password: 'vicentevale',
    port: 5432
};

const pool = new Pool(config);
const argumentos = process.argv.slice(2);
const funcion = argumentos[0];
const nombre = argumentos [1];
const rut = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];

const nuevoEstudiante = async ()=>{
    try{
        await pool.query(`INSERT INTO estudiantes (nombre, rut, curso, Nivel) values ('${nombre}','${rut}', '${curso}','${nivel}');`);
        console.log(`Estudiante ${nombre} agregado con exito`);

    }catch(error){
    console.log(error.code)
    }finally{
        pool.end();
    }
}
const consultaEstudiantes = async ()=>{
    try{
        await pool.query(`select * from estudiantes;`);
        console.log("Registro Actual", res.rows );
        pool.end();
    }catch(error){
        console.log('error')
    }
}
const editarEstudiante = async ()=>{
    try{
        const res= await pool.query(`UPDATE estudiantes SET nombre='${nombre}', curso ='${curso}', nivel = '${nivel}' WHERE rut = '${rut}'; `);

        console.log("Registro Actual", res.rows);
        pool.end();
    }catch (error){
        console.log(error.code)
    }
}
const rutEstudiante = async ()=>{
    try{
    const res = await pool.query(`SELECT * from estudiantes WHERE rut = '${rut}'; `);

        console.log(res.rows);
        pool.end();
    }catch (error){
        console.log(error.code)
    }
}
const eliminarEstudiante =  async()=>{
    try{
        await pool.query(`DELETE FROM estudiantes WHERE rut ='${rut}'`);
        console.log (`Registro de estudiante con rut : '${rut}', eliminado`);
    }catch(error){
        console.log ('Cantidad de registros eliminados', res.rowCount);
        pool.end();
    }

}

(async ()=>{
    if (funcion == 'nuevo'){
        await nuevoEstudiante();
    } else if (funcion === 'consulta'){
        await consultaEstudiantes();
    }else if (funcion ==='editar'){
        await editarEstudiante();
    }else if (funcion ==='rut'){
        await rutEstudiante();
    }else if (funcion ==='eliminar'){
        await eliminarEstudiante();
    }
})();

