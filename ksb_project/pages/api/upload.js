const Product = require("../../Models/productModel")
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
      console.log(fields)

      const { product_title, about, application, capacity, head, temperature, tank_capacity, category } = fields;
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

        let productToAdd = await Product.create({
          product_title: product_title[0],
          about: about[0],
          application: application[0],
          image: dbFilePath,
          category: category[0],
          capacity: capacity[0],
          head: head[0],
          temperature: temperature[0],
          // motor_rating: motor_rating,
          tank_capacity: tank_capacity[0]

        });
        if (!productToAdd) {
          return res.status(400).json({ error: "Something went wrong" })
        }
        res.send(productToAdd)
        res.status(200).json(productToAdd);
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

      const { product_title, about, application, capacity, head, temperature, tank_capacity, category } = fields;
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

        let productToUpdate = await Product.findByIdAndUpdate(req.query.id, {
          product_title: product_title[0],
          about: about[0],
          application: application[0],
          image: dbFilePath,
          category: category[0],
          capacity: capacity[0],
          head: head[0],
          temperature: temperature[0],
          // motor_rating: motor_rating,
          tank_capacity: tank_capacity[0]

        });
        if (!productToUpdate) {
          return res.status(400).json({ error: "Something went wrong" })
        }
        res.send(productToUpdate)
        res.status(200).json(productToUpdate);
      });
    });
  }
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }



}
