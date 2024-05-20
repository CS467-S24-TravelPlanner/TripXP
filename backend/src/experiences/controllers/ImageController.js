

export function uploadImage(req, res) {
    console.log(req);
    return res.status(200).json({status: true, message: "Uploading image"})
}