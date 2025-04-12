import { Router } from "express";
import { generateMockPets, generateMockUsers } from "../utils/mocking.js";
import { usersService, petsService } from "../services/index.js";

const router = Router();

router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(100);
  res.send({ status: "success", payload: pets });
});

router.get("/mockingusers", async (req, res) => {
  const users = await generateMockUsers(50);
  res.send({ status: "success", payload: users });
});

router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;
    if (!users || !pets)
      return res
        .status(400)
        .send({ status: "error", message: "Missing parameters" });

    const mockUsers = await generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    await usersService.createMany(mockUsers);
    await petsService.createMany(mockPets);

    res.send({ status: "success", message: "Mock data inserted successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

export default router;
