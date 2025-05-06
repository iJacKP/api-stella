const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (!name || !email || !password) {
    return res.status(422).json({ msg: "Todos os campos são obrigatórios!" })
  }

  if (password !== confirmPassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" })
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(422).json({ msg: "E-mail já cadastrado!" })
  }

  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({ name, email, password: passwordHash })

  try {
    await user.save()
    res.status(201).json({ msg: "Usuário criado com sucesso!" })
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor, tente novamente mais tarde!" })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ msg: "O e-mail e a senha são obrigatórios!" })
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(422).json({ msg: "Usuário não encontrado!" })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(422).json({ msg: "Senha inválida!" })
  }

  try {
    const secret = process.env.SECRET
    const token = jwt.sign({ id: user.id }, secret)

    res.status(200).json({
      msg: "Autenticação realizada com sucesso!",
      token,
      user: {
        id: user.id,
        username: user.name,
        email: user.email,
      },
    })
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor!" })
  }
}

exports.getUserById = async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id, '-password')

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" })
  }

  res.status(200).json({ user })
}