# 🚀 Node Application Template

A production-ready Node.js application template built with **TypeScript** and **Express.js**. This repository serves as a reusable foundation for building scalable backend applications with modern development best practices already configured.

> Instead of setting up the same tooling for every new project, use this template and start building your application immediately.

## ✨ Features

- ✅ Express.js application setup
- ✅ TypeScript configuration
- ✅ Node version management
- ✅ ESLint configuration
- ✅ Prettier configuration
- ✅ Git hooks (Husky + lint-staged)
- ✅ Environment configuration
- ✅ Structured logging
- ✅ Centralized error handling
- ✅ Testing setup
- ✅ Reusable project structure
- ✅ Git initialized and ready to use

---

## 📋 Included Setup

The following components are already configured:

- Git setup
- Node version manager setup
- Node.js project initialization
- TypeScript
- Prettier
- ESLint
- Git Hooks
- Application configuration
- Express.js
- Logger
- Error handling
- Testing framework
- Project template structure

---

## 📁 Project Structure

```text
.
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── tests/
├── .husky/
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

> The structure may evolve as the template grows.

---

## 🚀 Getting Started

### 1. Use this template

Click **Use this template** on GitHub to create a new repository.

Or clone it manually:

```bash
git clone https://github.com/mukaramawan/node-application-template.git
```

Move into the project:

```bash
cd node-application-template
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Copy the example environment file.

```bash
cp .env.example .env
```

Update the values according to your environment.

---

### 4. Start development server

```bash
npm run dev
```

---

## 📜 Available Scripts

| Command              | Description               |
| -------------------- | ------------------------- |
| `npm run dev`        | Start development server  |
| `npm run build`      | Compile TypeScript        |
| `npm start`          | Run production build      |
| `npm run test`       | Run tests                 |
| `npm run lint:check` | Run ESLint                |
| `npm run lint:fix`   | Fix lint issues           |
| `npm run format:fix` | Format code with Prettier |

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- ESLint
- Prettier
- Husky
- lint-staged
- Jest (or your configured testing framework)

---

## 🎯 Why This Template?

This template removes repetitive project setup so you can focus on building your application.

Benefits include:

- Faster project initialization
- Consistent code quality
- Production-ready project structure
- Built-in linting and formatting
- Automated Git hooks
- Better maintainability
- Easy scalability

---

## 📦 Creating a New Project

Using GitHub Template:

1. Click **Use this template**
2. Create a new repository
3. Clone your new repository
4. Install dependencies
5. Update `.env`
6. Start coding 🚀

---

## 🤝 Contributing

Contributions are welcome!

If you have ideas for improving the template:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📌 Roadmap

Future improvements may include:

- Docker support
- GitHub Actions CI/CD
- Swagger/OpenAPI
- Authentication starter
- Database integration examples
- Health checks
- Request validation
- Rate limiting
- Security best practices

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you find this template useful, consider giving the repository a **⭐ Star**.

It helps others discover the project and motivates future improvements.

---

Built with ❤️ to eliminate repetitive Node.js project setup.
