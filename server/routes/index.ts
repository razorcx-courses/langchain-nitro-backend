export default eventHandler((event) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LangChain - Nitro - Backend</title>
      <script src="https://cdn.tailwindcss.com"></script>
  </head>
  
  <body>
      <div class="flex flex-col justify-center items-center p-6">
          <h1 class="text-2xl">
              LangChain - Nitro - Backend
          </h1>
  
          <div class="flex flex-col justify-center items-center gap-3 my-6">
              <div class="bg-gray-200 py-2 px-6 hover:bg-gray-300">
                  <a href="/api/joke/dog">Tell me a DOG joke.</a>
              </div>
  
              <div class="bg-gray-200 py-2 px-6 hover:bg-gray-300">
                  <a href="/api/prompts/simple/toilets">Give me a company name that makes TOILETS</a>
              </div>
          </div>
      </div>
  </body>
  
  </html>`;
});
