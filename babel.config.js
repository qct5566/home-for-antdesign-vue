const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = [
  [
    'import',
    { libraryName: 'ant-design-vue', style: true }
  ]
]

if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry',
        'corejs': 3
      }
    ]
  ],
  plugins
}
