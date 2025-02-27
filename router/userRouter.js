const { Router } = require("express")
const { createUser, getAllUsers, getUser, updateUser, deleteUser } = require("../middlewares/userMid")
const userRouter = Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - full_name
 *       properties:
 *         id:
 *           type: integer
 *           description: User ID
 *         full_name:
 *           type: string
 *           description: User full name (must be two words)
 *     UserCreate:
 *       type: object
 *       required:
 *         - fullName
 *       properties:
 *         fullName:
 *           type: string
 *           description: User full name (must be two words)
 *     UserUpdate:
 *       type: object
 *       required:
 *         - id
 *         - fullName
 *       properties:
 *         id:
 *           type: integer
 *           description: User ID to update
 *         fullName:
 *           type: string
 *           description: User new full name (must be two words)
 */

/**
 * @swagger
 * /user/all:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Retrieves all users in the system
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users list reached
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Users'
 */
userRouter.get('/all', getAllUsers, (req, res) => {
    res.status(200).json({ message: "Users list reached", data: req.allUsers })
})


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     description: Retrieves a specific user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Found user by id
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Users'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
userRouter.get('/:id', getUser, (req, res) => {
    res.status(200).json({ message: "Found user by id", data: req.userData })
})

/**
 * @swagger
 * /user:
 *   post:
 *     tags: [Users]
 *     summary: Create user
 *     description: Creates a new user and returns the new users list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: John Doe's has been created and stored in rowID 1.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Users'
 */
userRouter.post('/', createUser, getAllUsers, (req, res) => {
    res.status(200).json({ message: `${req.body.fullName}'s has been created and stored in rowID: ${req.userId}.`, data: req.allUsers })
})

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update user name
 *     description: Gets a userId and new name then replace it with the old name of the selected user, returns all the users after the update
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User id 1 has been updated successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Users'
 */
userRouter.patch('/:id', updateUser, getAllUsers, (req, res) => {
    res.status(200).json({ message: `User id: ${req.params.id} has been updated successfully.`, data: req.allUsers })
})

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user by id
 *     description: Deletes a specific user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User id 1 has been deleted successfully.
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Users'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
userRouter.delete('/:id', deleteUser, getAllUsers, (req, res) => {
    res.status(200).json({ message: `User id: ${req.params.id} has been deleted successfully.`, data: req.allUsers })
})

module.exports = { userRouter }
