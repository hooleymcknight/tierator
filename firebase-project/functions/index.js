const functions = require("firebase-functions");
const {Storage} = require("@google-cloud/storage");
const projectId = "tierator";
const gcs = new Storage({
  projectId,
});
const os = require("os");
const path = require("path");
const cors = require("cors")({origin: true});
const busboyFn = require("busboy");
const fs = require("fs");


// currently, if you upload a file that already exists, it'll overwrite.
// it is what it is. a future update will make new buckets for different tiers.
exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed",
      });
    }
    const busboy = busboyFn({headers: req.headers});
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename.filename);
      uploadData = {file: filepath, type: filename.mimeType};
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      const bucket = gcs.bucket("tierator.appspot.com");
      bucket
          .upload(uploadData.file, {
            uploadType: "media",
            metadata: {
              metadata: {
                contentType: uploadData.type,
              },
            },
          })
          .then(() => {
            res.status(200).json({
              message: "It worked!",
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
    });
    busboy.end(req.rawBody);
  });
});
