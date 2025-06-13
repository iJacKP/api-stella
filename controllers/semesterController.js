const SemesterSubject = require('../models/SemesterSubject');

// Buscar disciplinas por semestre
exports.getBySemester = async (req, res) => {
  const { semester } = req.params;

  try {
    const subjects = await SemesterSubject.find({ semester });
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar disciplinas", error: err });
  }
};

// Cadastrar uma ou várias disciplinas
exports.createSubjects = async (req, res) => {
  const data = req.body;

  try {
    if (Array.isArray(data)) {
      await SemesterSubject.insertMany(data);
      return res.status(201).json({ message: "Disciplinas cadastradas com sucesso!" });
    } else {
      await SemesterSubject.create(data);
      return res.status(201).json({ message: "Disciplina cadastrada com sucesso!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao cadastrar disciplinas", error: err });
  }
};