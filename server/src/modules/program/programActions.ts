import type { RequestHandler } from "express";
import ProgramRepository from "./ProgramRepository.js";

// Define the Program type
type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
};

// Create an instance of the repository
const programRepository = new ProgramRepository();

// Declare the actions

const browse: RequestHandler = async (req, res) => {
  try {
    const programsFromDB = (await programRepository.readAll()) as Program[];

    if (req.query.q != null) {
      const filteredPrograms = programsFromDB.filter((program: Program) =>
        program.synopsis.includes(req.query.q as string),
      );

      res.json(filteredPrograms);
    } else {
      res.json(programsFromDB);
    }
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ error: "Failed to fetch programs" });
  }
};

const read: RequestHandler = async (req, res) => {
  try {
    const programsFromDB = (await programRepository.readAll()) as Program[];
    const parsedId = Number.parseInt(req.params.id);

    const program = programsFromDB.find((p: Program) => p.id === parsedId);

    if (program != null) {
      res.json(program);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Error fetching program:", error);
    res.status(500).json({ error: "Failed to fetch program" });
  }
};

// Export them to import them somewhere else

export default { browse, read };
