const Subject = require('../models/Subject');

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar disciplinas", error: err });
  }
};

exports.createSubjects = async (req, res) => {
  const data = req.body;

  try {
    if (Array.isArray(data)) {
      await Subject.insertMany(data);
      return res.status(201).json({ message: "Disciplinas cadastradas com sucesso!" });
    } else {
      await Subject.create(data);
      return res.status(201).json({ message: "Disciplina cadastrada com sucesso!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao cadastrar disciplinas", error: err });
  }
};

exports.updateSubject = async (req, res) => {
  const { subjectCode } = req.params;
  const updates = req.body;

  try {
    const updated = await Subject.findOneAndUpdate(
      { subjectCode },
      updates,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Disciplina não encontrada!" });
    }

    res.status(200).json({ msg: "Disciplina atualizada com sucesso!", updated });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor", error: err.message });
  }
};

exports.deleteSubject = async (req, res) => {
  const { subjectCode } = req.params;

  try {
    const deleted = await Subject.findOneAndDelete({ subjectCode });

    if (!deleted) {
      return res.status(404).json({ msg: "Disciplina não encontrada!" });
    }

    res.status(200).json({ msg: "Disciplina removida com sucesso!" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor", error: err.message });
  }
};