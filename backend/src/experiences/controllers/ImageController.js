import fs from "fs";

export function uploadImage(req, res) {
    console.log(req)
    console.log(req.file, req.body);
//   if (req.file) {
//     fs.writeFile("image.png", req.file.buffer, function (err) {
//       if (err) {
//         return res.status(500).send(err);
//       }
//     });
//   }
  return res.status(200).json({ status: true, message: "Uploading image", filename: req.file.filename });
}
