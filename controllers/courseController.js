const Course = require('../models/Course')

exports.createCourse = async (req, res) => {
  const { name, track, schedule, day, teacher, description } = req.body

  if (!name || !track || !schedule || !day || !teacher) {
    return res.status(422).json({ msg: "Preencha todos os campos obrigatórios!" })
  }

  const duration = Math.abs(schedule[0] - schedule[1])

  if (day.length > 1 && duration > 4) {
    return res.status(422).json({ msg: "O curso ultrapassa quatro horas!" })
  }

  const course = new Course({ name, track, schedule, day, teacher, description })

  try {
    await course.save()
    res.status(201).json({ msg: "Curso criado com sucesso!" })
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor!" })
  }
}

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.status(200).json(courses)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.updateCourse = async (req, res) => {
  const id = req.params.id
  const { name, track, schedule, day, teacher, description } = req.body

  const updatedData = { name, track, schedule, day, teacher, description }

  try {
    const result = await Course.updateOne({ _id: id }, updatedData)
    if (result.matchedCount === 0) {
      return res.status(422).json({ msg: "Curso não encontrado!" })
    }
    res.status(200).json(updatedData)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.deleteCourse = async (req, res) => {
  const id = req.params.id

  const course = await Course.findOne({ _id: id })
  if (!course) {
    return res.status(422).json({ msg: "Curso não encontrado!" })
  }

  try {
    await Course.deleteOne({ _id: id })
    res.status(200).json({ msg: "Curso removido com sucesso!" })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}