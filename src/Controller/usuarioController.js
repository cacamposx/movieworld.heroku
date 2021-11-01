import {Router} from 'express'
import db from "../db.js";

const app = Router();

app.get('/listar', async(req, resp) => {
    try {
        let a = await db.infob_mw_usuario.findAll();
        resp.send(a);
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})

app.post('/cadastrar', async(req, resp) => {
    try {
        let { nome, sobrenome, username, email, senha, genero, localizacao, redes, fotoperfil } = req.body;
        
        let i = await db.infob_mw_usuario.create({
            nm_usuario: nome,
            nm_sobrenome: sobrenome,
            nm_username: username,
            ds_email: email,
            ds_senha: senha,
            ds_genero: genero,
            ds_nascimento: new Date(),
            ds_localizacao: localizacao,
            ds_redes_sociais: redes,
            ds_foto: fotoperfil
        })
        resp.send("Usuário inserido!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.put('/alterar/:id', async(req, resp) => {
    try {
        let { nome, sobrenome, username, email, senha, genero, nascimento, localizacao, redes, fotoperfil } = req.body;
        let { id } = req.params;

        let a = await db.infob_mw_usuario.update({
            nm_usuario: nome,
            nm_sobrenome: sobrenome,
            nm_username: username,
            ds_email: email,
            ds_senha: senha,
            ds_genero: genero,
            ds_nascimento: nascimento,
            ds_localizacao: localizacao,
            ds_redes_sociais: redes,
            ds_foto: fotoperfil
        },
        {
            where: {id_usuario: id}
        })
        resp.send("Usuário alterado!");
    } catch(e) {
        resp.send({erro: e.toString()})
    }
})


app.delete('/deletar/:id', async(req, resp) => {
    try {
        let { id } = req.params;
        let d = db.infob_mw_usuario.destroy({ where: {id_usuario: id}})
        resp.send("Produto removido!");
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})

export default app