/* imports */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const cors = require('cors')
const app = express()

//Permissão Cors
app.options(cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }));
app.use(cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 }));

//Config JSON res
app.use(express.json())

//Model
const User = require('./models/User');
const Cadeira = require('./models/Cadeiras');


//Cadastrar Cadeiras

app.post('/registroCadeira', cors(),  async (req,res) => {

    const { Name, Trilha , Horario , Dia , Professor, Sobre } =  req.body

    let HorariosConta = 0;

    console.log(Horario[0] , Horario[1])
    HorariosConta = Math.abs( Horario[0] - Horario[1]) 

  
    
    if(!Name){
        return res.status(422).json( { msg: "O nome é obrigatório!"} )
    }    
    
    if(!Trilha){
        return res.status(422).json( { msg: "O Trilha é obrigatório!"} )
    }
    if(!Horario){
        return res.status(422).json( { msg: "O Dia é obrigatória!"} )
    }    
    
    if(!Dia){
        return res.status(422).json( { msg: "O Dia é obrigatório!"} )
    }
    if(!Professor){
        return res.status(422).json( { msg: "O nome do professor é obrigatório!"} )
    }
    
    if(Dia.length > 1 &&  HorariosConta > 4 ){

        return res.status(422).json( { msg: "A cadeira tem mais de quatro horas!"} )

    }
    


    const cadeira = new Cadeira({
        Name,
        Trilha,
        Horario,
        Dia,
        Professor,
        Sobre
    })

    try {

        await cadeira.save()

        res.status(201).json({ msg: "Usuário criado com sucesso!"})

    } catch (error) {

        console.log(error)

        res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente ou mais tarde! "})
        
    }

})

app.get('/Cadeiras', cors(), async (req,res) => { 

        try{

            const cadeiras = await Cadeira.find();

            res.status(200).json(cadeiras)


        }catch(error){
            res.status(500).json({ error: error })

        }
})


// Public Route
app.get('/', cors(), (req,res) => { 
    res.status(200).json({
        msg:"Bem Vindo a nossa API!",
        status:true
    })
})

// Private Route
app.get('/user/:id', checkToken ,async (req,res) => {

    const id = req.params.id
    
    //check if user exists
    const user = await User.findById(id, '-password')

    if(!user){
        return res.status(404).json({ msg: "Usuário não encontrado" }) 
    }

    res.status(200).json({ user })
})

function checkToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]

  if(!token){
    return res.status(401).json({ msg: "Acesso Negado!"})
  }

  try {
    
    const secret = process.env.SECRET

    jwt.verify(token, secret)

    next()

  } catch (error) {
    res.status(400).json({ msg : "Token Inválido!"})
  }

}

// Register User
app.post('/auth/register', cors(),  async (req,res) => {

    const { name, email , password , confirmPassword} =  req.body

    if(!name){
        return res.status(422).json( { msg: "O nome é obrigatório!"} )
    }    
    
    if(!email){
        return res.status(422).json( { msg: "O email é obrigatório!"} )
    }    
    
    if(!password){
        return res.status(422).json( { msg: "A senha é obrigatória!"} )
    }

    if(password !== confirmPassword){
        return res.status(422).json( { msg: "As senhas não coincidem!"} )
    }


    //check if user exists
    const userExists = await User.findOne( { email: email} )

    if(userExists){
        return res.status(422).json({ msg:`Email ja registrado. Por favor, utilize outro e-mail!`})
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password:passwordHash
    })

    try {

        await user.save()

        res.status(201).json({ msg: "Usuário criado com sucesso!"})

    } catch (error) {

        console.log(error)

        res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente ou mais tarde! "})
        
    }

})

// Login User
app.post("/auth/login", async (req,res) => {
    const { email, password } = req.body 

    if(!email){
        return res.status(422).json( { msg: "O email é obrigatório!"} )
    }    
    
    if(!password){
        return res.status(422).json( { msg: "A senha é obrigatória!"} )
    }

    //check if user exists
    const user = await User.findOne( { email: email} )

    if(!user){
        return res.status(422).json({ msg:`Usuário não encontrado!`})
    }

    //check if password match

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
        return res.status(422).json({ msg:`Senha inválida!`})
    }

    try {

        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id:user.id,
            },
            secret
        )

        res.status(200).json({
            msg: "Autenticação realizada com sucesso", token,
            user: { 
                username: user.name,
                user_id: user.id,
                email: user.email
            },
            status:true
         })
            
    } catch (error) {
        console.log(error)

        return res.status(500).json({ msg:`Aconteceu um erro no servidor, tente novamente ou mais tarde!`})

    }



})


// Credentials
const dbUser =  process.env.DB_USER
const dbPass =  process.env.DB_PASS

// DB Connection + Start API 
mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPass}@apiprojeto.lrm4f03.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    app.listen(8000)
    console.log("Conectado a API com sucesso !")
}).catch((err) => {
    console.log(err)
})
