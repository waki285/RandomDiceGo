import fs from "fs/promises";
import path from "path";

const DIR = "public/dices";
const files = await fs.readdir(DIR);
const affected = files.filter(x => /^\d{4}_.+?\.png$/.test(x));
console.log(affected);
for (const file of affected) {
  fs.rename(path.join(DIR, file), path.join(DIR, file.slice(5).toLowerCase()));
}