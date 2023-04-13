# Cookbook & CMS for Recipes

This repository features a dual Next.js project that consists of a static site for browsing cooking recipes and a
CRUD-based CMS for managing and adding new recipes.

## Applications

1. **Static Site**: Accessible at [cookbook.joeriabbo.nl](https://cookbook.joeriabbo.nl), this application allows users
   to explore various cooking recipes.
2. **CMS**: Located in the `/cms` directory, this application provides a CRUD environment for managing, adding, and
   editing recipes. The CMS is designed to be used locally and is not hosted online.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Joeri-Abbo/next-cookbook.git
```

2. Install dependencies for both applications:

```bash
cd next-cookbook
npm install
cd cms
npm install
```

3. Run the static site and CMS:

```bash 
# In the root directory
npm run dev

# In the /cms directory
npm run dev
```

## Contributing

We welcome contributions to improve the code or add new recipes to the collection. To contribute, please follow these
steps:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make changes or additions to the code or recipes.
4. Commit your changes with a clear and concise commit message.
5. Create a pull request to the main repository.

Feel free to open issues to discuss potential improvements or suggest new recipes.

## License

This project is licensed under the MIT License.