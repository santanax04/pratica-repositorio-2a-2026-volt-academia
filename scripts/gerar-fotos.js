// Procura as fotos em assets/ e gera os arquivos que o app usa.
// Uso: node scripts/gerar-fotos.js
//
//  assets/exercicios/<id-do-exercicio>.jpg   (ex.: supino-reto.jpg)  -> data/fotos-exercicios.js
//  assets/personais/<id-do-personal>.jpg     (ex.: rafael.jpg)       -> data/fotos-personais.js
//  assets/fundo-treino.jpg                                           -> data/fotos-fundo.js
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const EXT = /\.(jpe?g|png|webp)$/i;

const listar = (pasta) => {
  const dir = path.join(raiz, 'assets', pasta);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => EXT.test(f)).sort();
};

const mapa = (pasta, nomeExport, comentario) => {
  const arquivos = listar(pasta);
  const linhas = arquivos.map((f) => `  '${f.replace(EXT, '')}': require('../assets/${pasta}/${f}'),`);
  const conteudo = `// ${comentario}\n// ARQUIVO GERADO por scripts/gerar-fotos.js — não edite à mão.\nexport const ${nomeExport} = {\n${linhas.join('\n')}\n};\n`;
  fs.writeFileSync(path.join(raiz, 'data', nomeArquivo(nomeExport)), conteudo);
  console.log(`${nomeExport}: ${arquivos.length} foto(s)`);
  return arquivos;
};

const nomeArquivo = (n) => (n === 'FOTOS_EXERCICIOS' ? 'fotos-exercicios.js' : 'fotos-personais.js');

mapa('exercicios', 'FOTOS_EXERCICIOS', 'Fotos reais dos exercícios (chave = id em data/exercicios.js).');
mapa('personais', 'FOTOS_PERSONAIS', 'Fotos dos personais (chave = id em data/personais.js).');

const fundo = fs.readdirSync(path.join(raiz, 'assets')).find((f) => /^fundo-treino\.(jpe?g|png|webp)$/i.test(f));
fs.writeFileSync(
  path.join(raiz, 'data', 'fotos-fundo.js'),
  `// ARQUIVO GERADO por scripts/gerar-fotos.js — não edite à mão.\nexport const FOTO_FUNDO = ${fundo ? `require('../assets/${fundo}')` : 'null'};\n`
);
console.log(`FOTO_FUNDO: ${fundo || 'nenhuma'}`);

// avisa quais exercícios ainda estão sem foto
const ex = fs.readFileSync(path.join(raiz, 'data', 'exercicios.js'), 'utf8');
const ids = [...ex.matchAll(/id: '([a-z0-9-]+)', nome:/g)].map((m) => m[1]);
const tem = new Set(listar('exercicios').map((f) => f.replace(EXT, '')));
const faltam = ids.filter((i) => !tem.has(i));
if (faltam.length) console.log(`\nExercícios ainda sem foto (${faltam.length}/${ids.length}): ${faltam.join(', ')}`);
