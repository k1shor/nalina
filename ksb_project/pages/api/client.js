const Client = require("../../Models/clientModel")
import { error } from 'console';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = 'public/assets/uploads';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new IncomingForm({
            uploadDir,
            keepExtensions: true,
            filename: (name, ext, part, form) => {
                return `${Date.now()}_${part.originalFilename}`;
            },
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Form submission error' });
                return;
            }
            // console.log(fields)

            const { name } = fields;
            // console.log(name[0],"Field test")
            const file = files.file[0];

            if (!file) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }

            const newFilePath = path.join(uploadDir, file.newFilename);
            // testing


            console.log(newFilePath, "TESTING")


            fs.rename(file.filepath, newFilePath, async (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'File rename error' });
                    return;
                }
                const dbDir = 'assets/uploads';
                const dbFilePath = path.join(dbDir, file.newFilename);

                let clientToAdd = await Client.create({
                    name: name[0],
                    image: dbFilePath,

                });
                if (!clientToAdd) {
                    return res.status(400).json({ error: "Something went wrong" })
                }
                res.send(clientToAdd)
                res.status(200).json(clientToAdd);
            });
        });
    }
    else if (req.method === "PATCH") {
        const form = new IncomingForm({
            uploadDir,
            keepExtensions: true,
            filename: (name, ext, part, form) => {
                return `${Date.now()}_${part.originalFilename}`;
            },
        });
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Form submission error' });
                return;
            }
            // console.log(fields)

            const { name } = fields;
            // console.log(name[0],"Field test")
            const file = files.file[0];

            if (!file) {
                res.status(400).json({ message: 'No file uploaded' });
                return;
            }

            const newFilePath = path.join(uploadDir, file.newFilename);
            // testing


            // console.log(newFilePath, "TESTING")


            fs.rename(file.filepath, newFilePath, async (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'File rename error' });
                    return;
                }
                const dbDir = 'assets/uploads';
                const dbFilePath = path.join(dbDir, file.newFilename);

                let clientToUpdate = await Client.findByIdAndUpdate(req.query.id, {
                    name: name[0],

                    image: dbFilePath,


                });
                if (!clientToUpdate) {
                    return res.status(400).json({ error: "Something went wrong" })
                }
                res.send(clientToUpdate)
                res.status(200).json(clientToUpdate);
            });
        });
    }
    else if (req.method === 'GET') {
        if (req.query.id) {
            let clientById = await Client.findById(req.query.id)
            if (!clientById) {
                return res.send(400).json({ error: "something went wrong" })
            }
            res.send(clientById)


        }
        else {

            let allClients = await Client.find()
            if (!allClients) {
                return res.status(400).json({ error: "Something went wrong" })
            }
            res.send(allClients)
            res.status(200).json(allClients);
        }
    }
    else if (req.method === 'DELETE') {
        let delClients = await Client.findByIdAndDelete(req.query.id)
        if (!delClients) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        res.send({ message: "Client deleted Successfully!" })

    }

    else {
        res.status(405).json({ message: 'Method not allowed' });
    }



}