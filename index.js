const Koa = require('koa')
const Router = require('koa-router')
const validator = require('koa-joi-validate')
const bodyParser = require('koa-bodyparser')
const joi = require('joi')

const app = new Koa()
const router = new Router()

const validateGetRequest = validator({
  query: {
    uid: joi.string().required()
  }
})

router.get('/', validateGetRequest, async ctx => {
  const uid = ctx.query.uid
  ctx.body = `Hello World ${uid}`
})


const validatePostRequest = validator({
  body: {
    uid: joi.string().required(),
    secret: joi.string().required()
  }
})

router.post('/', bodyParser(), validatePostRequest, async ctx => {
  const { uid, secret } = ctx.request.body
  ctx.body = {
    message: `Hello World ${uid}, ${secret}`
  }
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)