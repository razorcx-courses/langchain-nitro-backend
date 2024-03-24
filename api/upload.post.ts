export default defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event);
    console.log(files);

    if (!files) {
      return createError({
        statusCode: 400,
        statusMessage: "Files are empty.",
      });
    }

    for (const file of files) {
      await useStorage().setItemRaw(`fs:${file.filename}`, file.data);
    }

    for (const file of files) {
        const f = await useStorage().getItemRaw(`fs:${file.filename}`);
        console.log(`fs:${file.filename}`, f);
      }

    return 200;
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Files could not be uploaded.",
    });
  }
});
