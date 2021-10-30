import {Router} from 'express'
import db from "../db.js";

const app = Router();

app.get('/lista_item', async(req, resp) => {
    try {
        let x = await db.infob_mw_lista_item.findAll();
        resp.send(x);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})


app.post('/lista_item', async (req, resp) => {
    try{
        let {nome, descricao, lista } = req.body;

        let x = await db.infob_mw_lista_item.create({
            id_lista_item: nome, 
            id_filme: descricao,
            id_lista_item: lista
        })
         resp.send('lista criada!')  
    } catch(e) {
         resp.send({erro: e.toString() })
    }

    
})



app.get('/lista_popular', async(req, resp) => {
    try {
        let c = await db.infob_mw_lista.findAll();
        resp.send(c);
    } catch(e) {
        resp.send({ erro: e.toString() })
    }
})



export default app