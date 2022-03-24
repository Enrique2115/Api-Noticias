const cloud = require("cloudinary")
const dotenv = require("dotenv")

dotenv.config()

cloud.config({
    cloud_name: "noticiaslacana",
    api_key: "521852557526294",
    api_secret: "sGma_pQqQDATqxrdUKbwkJwZX-E"
})

exports.uploads = (file,folder) =>{
    return new Promise(resolve =>{
        cloud.uploader.upload(file,(result)=>{
            resolve({
                url: result.url,
                id: result.public_id
            })
        },{
            resource_type: "auto",
            folder: folder
        })
    })
}