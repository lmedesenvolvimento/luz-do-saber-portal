let electronInstaller = require('electron-winstaller')

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: process.argv[0],
    outputDirectory: process.argv[1],
    authors: 'Laboratório de Mídias Educativas',
    exe: 'luzdosaber.exe'
})

resultPromise.then(() => console.log('Instalador criado!'), (e) => console.log(`Error ao criar instalador: ${e.message}`))