import { Router } from "express";
import { getUsers , addUser, signin, updateUser, deleteUser, getUserByID, getUsersByFilter, updateAdmin } from './controller/user.js';

const router = Router();

router.get('/allusers',getUsers);
router.post('/signup',addUser);
router.post('/signin',signin);
router.put('/:id',updateUser);
router.patch('/:id',updateAdmin)
router.delete('/:id',deleteUser);
router.get('/:id',getUserByID);
router.get('/users',getUsersByFilter);




export default router;