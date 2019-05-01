import express from 'express'
import { get } from '../../controllers/v1/user.controller'

const router = express.Router()

router.route('/:id?').get(
    get
)

export default router
