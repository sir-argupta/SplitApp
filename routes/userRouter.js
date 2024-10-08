var express = require('express');
var controller = require('../components/user')
var apiAuth = require('../helper/apiAuthentication')

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//User Registeration router
router.post('/v1/register', controller.userReg)

//User Login router 
router.post('/v1/login', controller.userLogin)

//View User router 
router.post('/v1/view', apiAuth.validateToken, controller.viewUser)

//Edit User router
router.post('/v1/edit', apiAuth.validateToken, controller.editUser)

//Delete User router 
router.delete('/v1/delete', apiAuth.validateToken, controller.deleteUser)

//Update Password router
router.post('/v1/updatePassword', apiAuth.validateToken, controller.updatePassword)

//Get all User Emalil Id 
router.get('/v1/emailList', apiAuth.validateToken, controller.emailList)

// Add a friend directly
router.post('/v1/add-friend', apiAuth.validateToken, controller.addFriend)

// Get all friends of a user
router.post('/v1/friends', apiAuth.validateToken, controller.getFriends)

module.exports = router;


Conclusion

It is not feasible to achieve Platinum requirements for the Escrow Batch Process due to several constraints inherent in the process and infrastructure.

Firstly, the batch process must run on a single server to maintain data integrity and prevent corruption. This setup, while crucial for data consistency, limits our ability to scale the process and implement advanced traffic switching strategies such as Blue/Green or Canary deployments. Running on a single server makes it challenging to achieve the fast recovery times expected under the Platinum standards.

Secondly, the Recovery Time Objective (RTO) and Recovery Point Objective (RPO) requirements, which mandate that both recovery and data restoration must occur within 15 minutes, cannot be met. The various steps in the batch process, such as PAR release, Chef script execution, file generation, and external vendor interactions, all exceed the 15-minute threshold. Even with optimizations, certain external dependencies, such as communication with the Mainframe, introduce delays that are beyond our control, making it impossible to comply with the 15-minute limits for RTO and RPO.

In conclusion, the nature of the Escrow Batch Process, combined with the constraints of running it on a single server and the time required for each critical step, makes it unfeasible to meet the strict Platinum requirements for recovery and data resilience. Significant redesign and infrastructure changes would be required to align this process with Platinum standards.

