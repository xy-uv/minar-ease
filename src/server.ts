import app from "./app";
import { prisma } from "./lib/prisma";

const port = Number(process.env.PORT) || 7000;

(async function main() {
  try {
    await prisma.$connect();
    console.log(`😎 Database Connected successfully!`);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("An error occurred!", error);
    prisma.$disconnect();
    process.exit(1);
  }
})();
