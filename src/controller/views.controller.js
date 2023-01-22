import ProductDAO from "../dao/Product.dao.js"
import UserDAO from "../dao/User.dao.js"

const userService = new UserDAO()
const productService = new ProductDAO()

const login = (req,res)=>{
    res.render("login")
}
const register = (req,res)=>{
    res.render("register")
}
const failedLogin = (req,res)=>{
    res.render("failedLogin")
}
const failedRegister = (req,res)=>{
    res.render("failedRegister")
}

const index = async(req,res)=>{
    res.render("index")
}

const notExists = async(req,res)=>{
    req.logger.warning("A non-existent route was entered with the method "+ req.method +": " + req.url)
    res.send("This site does not exist")
}

const products = async(req,res)=>{
    const userInfo = req.session.user
    const products = await productService.getProducts()
    res.render("products",{user:userInfo,products:products})
}

const logout = async(req,res)=>{
    req.session.destroy(err=>{
        if(!err) res.redirect("/login")
        else res.send({status:"error",body:err})
    })
}

const cart = async(req,res)=>{
    const userInfo = req.session.user
    if(userInfo){
        const user = await userService.getUserBy({email:userInfo.email})
        let productInCart = []
for (let index = 0; index < user.cart.length; index++) {
    const oneProduct = await productService.getProductsBy({id:user.cart[index].productId})
        const finalProduct = {
            title:oneProduct.title,
            thumbnail:oneProduct.thumbnail,
            price:oneProduct.price*user.cart[index].quantity,
            quantity: user.cart[index].quantity,
            id:user.cart[index].productId
        }
        productInCart.push(finalProduct)
}
const sum = productInCart.reduce((accumulator, object) => {
    return accumulator + object.price;
}, 0);

        res.render("cart",{user:user,products:productInCart,finalPrice:sum})
    }else{
        res.render("cart",{user:false})
    }
}

export default{
    login,
    register,
    failedLogin,
    failedRegister,
    index,
    notExists,
    products,
    logout,
    cart
}