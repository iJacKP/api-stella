const router = require('express').Router()
const courseController = require('../controllers/courseController')

router.post('/create', courseController.createCourse)
router.get('/', courseController.getAllCourses)
router.patch('/:id', courseController.updateCourse)
router.delete('/:id', courseController.deleteCourse)

module.exports = router