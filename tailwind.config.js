module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'custom-pattern': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><filter id=\"noiseFilter\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"20\" numOctaves=\"4\" stitchTiles=\"stitch\" /><feColorMatrix type=\"saturate\" values=\"0\"/></filter><rect width=\"100%\" height=\"100%\" fill=\"rgb(0, 0, 0)\"/><rect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\" opacity=\"0.1\"/></svg>')",
      },
      colors: {
        'custom-color': '#f2f4f7',
      },
      fontFamily: {
        'primary': 'var(--font-primary)',
      },
      fontSize: {
        'custom-size': 'var(--font-size-22_1-375)',
      },
    },
  },
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.js',
      // Incluye aquí los archivos donde se utilizan estas clases
    ],
    options: {
      safelist: [
        'bg-custom-pattern', // Incluye la clase personalizada aquí
      ],
    },
  },
  plugins: [],
}
