(async () => {
  const pageName = process.argv[2];

  if (!pageName) {
    console.error("Please provide a page name");
    process.exit(1);
  }

  const dir = "./src";

  const html = `<!doctype html>
<html lang="en">
  <head>
    <include src="src/components/Head.html"></include>
  </head>
  <body>
    <h1 class="text-4xl font-bold text-white">${pageName} Page</h1>

    <script type="module" src="./main.ts"></script>
  </body>
</html>
`;

  const typescript = `import "../styles/index.scss"; // Import the global styles`;

  const pageDir = `${dir}/${pageName}`;

  await Bun.write(`${pageDir}/index.html`, html);
  await Bun.write(`${pageDir}/main.ts`, typescript);
})();
