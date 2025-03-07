import { Router } from "express";
import { generateMockPets, generateMockUsers } from "../utils/mocking.js";
import { usersService, petsService } from "../services/index.js";

const router = Router();

router.get("/mockingusers", async (req, res) => {
  const users = await generateMockUsers(50);
  res.send({ status: "success", payload: users });
});

router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(50);
  res.send({ status: "success", payload: pets });
});

router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;
    if (!users || !pets)
      return res
        .status(400)
        .send({ status: "error", message: "Faltan parámetros" });

    const mockUsers = await generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    await usersService.createMany(mockUsers);
    await petsService.createMany(mockPets);

    res.send({
      status: "success",
      message: "Mock creado!",
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

export default router;
