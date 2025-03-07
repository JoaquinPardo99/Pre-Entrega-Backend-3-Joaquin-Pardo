import { fakerES_MX } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const generateMockUsers = async (count) => {
  const hashedPassword = await bcrypt.hash("coder123", 10);
  return Array.from({ length: count }, () => {
    const firstName = fakerES_MX.person.firstName();
    const lastName = fakerES_MX.person.lastName();
    const randomNum = fakerES_MX.number.int({ min: 10, max: 99 });
    const cleanFirstName = firstName.replace(/\s+/g, "").toLowerCase();
    const cleanLastName = lastName.replace(/\s+/g, "").toLowerCase();
    const email = `${cleanFirstName}.${cleanLastName}${randomNum}@example.com`;

    return {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword,
      role: fakerES_MX.helpers.arrayElement(["user", "admin"]),
      pets: [],
    };
  });
};

export const generateMockPets = (count) => {
  return Array.from({ length: count }, () => ({
    name: fakerES_MX.animal.dog(),
    specie: "Perro",
    birthDate: fakerES_MX.date.past().toISOString(),
    adopted: false,
    image: fakerES_MX.image.urlLoremFlickr({ category: "dogs" }),
  }));
};
