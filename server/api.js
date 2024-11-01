import { z } from "zod";
import errorMap from "zod/locales/en.js";
import escapeHtml from "escape-html";
import bcrypt from "bcrypt"; // Importa bcrypt

const initializeAPI = async (app) => {
  app.post("/api/login", login);
};

const login = async (req, res) => {
  const schema = z.object({
    username: z.string().email({ message: "Must be a valid email" }),
    password: z
      .string()
      .min(10, { message: "Must be 10 or more characters long" }),
  });

  const input = schema.safeParse(req.body);
  if (!input.success) {
    return res.status(400).json({
      error: input.error.errors.map((err) => err.message).join(", "),
    });
  }
  const { username, password } = input.data;
  const safeUsername = escapeHtml(username);
  const safePassword = escapeHtml(password);
  const salt = 10;
  const hashedPassword = await bcrypt.hash(safePassword, salt);

  const answer = `
    <h1>Answer</h1>
    <p>Username: ${safeUsername}</p>
    <p>Password: ${hashedPassword}</p>
  `;
  res.send(answer);
};

export default initializeAPI;
