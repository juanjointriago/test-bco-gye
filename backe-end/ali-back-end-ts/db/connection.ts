import { Sequelize } from 'sequelize';
const dbDevelop = {
    url: 'mysql://3zd4m9ywphh8c1c4hojt:pscale_pw_huiT7CF7IaE723X138rxr1lJlMMyB2oJLDpWJj7rMZG@aws.connect.psdb.cloud/qierotest?statusColor=686B6F&env=local&name=qieroDevEnv&tLSMode=0&usePrivateKey=false&safeModeLevel=0&advancedSafeModeLevel=0&driverVersion=0&lazyload=false',
    database: 'qierotest',
    username: 'ke5twz8fo96pzukwxhpw',
    host: 'aws.connect.psdb.cloud',
    password: 'pscale_pw_HPLYXGl323hkrP3OwcVm94YMr5tZZEXhCV3cnv8nJAo',
    dialect: 'mysql',
    port: 3306
}


const db = new Sequelize(dbDevelop.database, dbDevelop.username, dbDevelop.password,{
    host: dbDevelop.host,
    dialect: 'mysql',
    port: dbDevelop.port,
    dialectOptions:{
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    }
})

export default db;

