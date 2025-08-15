import Components from 'unplugin-vue-components/vite'
export default function createComponents() {
  return Components({
    directoryAsNamespace: true,
    resolvers: []
  })
}
