import { PrismaClient } from '@prisma/client'
import {writeFile} from "fs";

const prisma = new PrismaClient();


(async () => {
  const words = await prisma.word.findMany({select: {'word': true}});
  const onlyWords = words.map(({word}) => word);

  writeFile('./src/wordsFromDB.ts', `export const words = ${JSON.stringify(onlyWords)}`, (error) => {
    console.error(error);
  })
})();
