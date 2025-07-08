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

// exports.updateSubjectSchedule = async (req, res) => {
//   const { id } = req.params; // ID da disciplina na URL
//   const { schedule } = req.body; // Novo array de horários no body

//   try {
//     const updated = await Subject.findByIdAndUpdate(
//       id,
//       { schedule },
//       { new: true } // Retorna o documento atualizado
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Disciplina não encontrada" });
//     }

//     res.status(200).json({
//       message: "Horários atualizados com sucesso!",
//       subject: updated
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Erro ao atualizar os horários",
//       error: err.message
//     });
//   }
// };