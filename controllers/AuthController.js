async function Login(req,res){
    return res.status(200).json({ message: 'Login endpoint reached' });
}
module.exports = {Login}