export default function logger(req, res, next) {
    const timeStamp = new Date().toString()
    console.log(`${timeStamp} || ${req.url}`)
    next()
}