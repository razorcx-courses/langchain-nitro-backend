export default defineNitroPlugin((nitro) => {

    nitro.hooks.hook('render:response', (response, { event }) => {
      // Inspect or Modify the renderer response here
      //console.log('on render:response', response)
    })
  })