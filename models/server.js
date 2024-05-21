const express = require('express')
const cors = require('cors');

const { dbConnect } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.port || PORT;
        this.paths = {
            home: `/api/home`,
            user: `/api/dashboard/user`,
            auth: `/api/auth`,
            category: `/api/category`,
            products: `/api/products`,
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
    }
    
    routes(){
        // this.app.use(this.paths.home, require('../routes/path'));
        this.app.use(this.paths.user, require('../routes/userPath'));
        this.app.use(this.paths.category, require('../routes/categoryPath'));
        this.app.use(this.paths.auth, require('../routes/authPath'));
        this.app.use(this.paths.products, require('../routes/productsPath'));
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