const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnect } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.port || PORT;
        this.paths = {
            auth: `/api/auth`,
            category: `/api/category`,
            // home: `/api/home`,
            search: `/api/search`,
            products: `/api/products`,
            user: `/api/dashboard/user`,
            uploads: `/api/uploads`,
        }
        
        this.dbConnection();

        this.middlewares();

        this.routes();
    }

    async dbConnection(){
        await dbConnect();
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static( 'public' ));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }
    
    routes(){
        this.app.use(this.paths.auth, require('../routes/authPath'));
        this.app.use(this.paths.category, require('../routes/categoryPath'));
        this.app.use(this.paths.search, require('../routes/searchPath'));
        // **** TODO *****  this.app.use(this.paths.home, require('../routes/path')); 
        this.app.use(this.paths.products, require('../routes/productsPath'));
        this.app.use(this.paths.user, require('../routes/userPath'));
        this.app.use(this.paths.uploads, require('../routes/uploadsPath'));
    }

    listen(){
        this.app.listen(this.port , () => {
            console.log( `Server running on port ${ this.port }` )
        })
    }

}

module.exports = {
    Server
};