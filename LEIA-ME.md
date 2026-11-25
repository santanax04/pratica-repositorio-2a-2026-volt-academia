# VOLT Academia (web mobile + celular)

App de academia feito com Expo + React Native + Expo Router. **Não usa API**: exercícios, treinos, planos, unidades e
personais ficam no próprio projeto, e o que a pessoa preenche é salvo no aparelho (AsyncStorage / localStorage no navegador).

## Como rodar
1. `npm install` (se o Expo avisar de versões, rode `npx expo install --fix`)
2. `npx expo start`
3. Pressione `w` para o navegador (fica no formato de celular) ou leia o QR Code com o Expo Go.

## Telas
- **Intro**: animação de entrada (raio pulsando, nome e barra de carregamento) e boas-vindas para quem ainda não tem cadastro.
- **Cadastro** (3 passos): nome, idade, sexo, peso, altura, objetivo, nível e dias por semana.
- **Início**: marca, próximo treino, semana, atalhos, novidades e horários da unidade.
- **Treinos**: plano por objetivo em "Dia 1, Dia 2...", com checklist e check-in.
- **Exercícios / Equipamentos**: busca, filtros, vídeo-aula, passo a passo e favoritos.
- **Evolução**: peso, % de gordura e cintura com gráficos, comparativos (30 dias, 90 dias, 1 ano), meta, conquistas e fotos antes/depois.
- **Relógio**: batimentos em tempo real, zona de treino, calorias e gordura estimadas (Bluetooth no Chrome/Edge ou modo demonstração).
- **Frequência**: check-in, calendário com números dos dias e histórico.
- **Unidades**: 5 unidades (nome, endereço, horário, telefone, mapa) e empresas parceiras.
- **Planos**: 30, 90 e 365 dias, com Pix, crédito (parcelado), débito, boleto e dinheiro.
- **Personais**: contratar pacote de aulas (dias, horário e pagamento) e ver/cancelar contratações.
- **Perfil**: dados, IMC, plano, unidade, personais e favoritos.

## Vídeos
Cada exercício e equipamento tem um botão que abre a busca do YouTube por "como fazer/usar ...".
Para embutir um vídeo específico, preencha o campo `videoId` (ex.: `'AbCdEfGhIjK'`) no item de
`data/exercicios.js` ou `data/equipamentos.js`: no navegador ele toca dentro do app.

## Onde mexer
- `constants/marca.js` → nome da academia
- `constants/tema.js` → cores
- `data/` → exercícios, equipamentos, treinos, planos, pagamentos, unidades e personais
- `services/` → dados salvos no aparelho

Unidades, endereços, empresas e personais são fictícios (projeto escolar).

## Relógio inteligente
- **Navegador (Chrome/Edge, computador ou Android):** botão "Conectar por Bluetooth" lê o serviço padrão de frequência cardíaca
  (cintas e relógios que transmitem batimentos). Precisa de `localhost` ou HTTPS.
- **Modo demonstração:** simula um treino para apresentar o app sem relógio.
- **Apple Watch / Galaxy Watch no celular:** exige módulos nativos (HealthKit / Health Connect) e um "development build"
  do Expo; não funciona no Expo Go. A tela já está pronta para receber esses dados.

## Fotos reais (em vez dos desenhos)
Já incluídas: supino reto, stiff, esteira e o fundo. Para adicionar mais fotos de pessoas reais, sem mexer no código:
1. Coloque as imagens (jpg, png ou webp):
   - `assets/exercicios/<id>.jpg` → foto de cada exercício (o nome é o `id` de `data/exercicios.js`, ex.: `supino-reto.jpg`)
   - `assets/personais/<id>.jpg` → foto de cada personal (`rafael`, `camila`, `bruno`, `juliana`, `thiago`)
   - `assets/fundo-treino.jpg` → foto de pessoas treinando para o fundo da intro, do início e do cadastro
2. Rode `node scripts/gerar-fotos.js` (ele registra as fotos e lista os exercícios que ainda estão sem foto).
3. Reinicie com `npx expo start -c`.
O exercício que ainda não tiver foto mostra uma capa simples com o ícone e o grupo muscular (os bonecos foram removidos). Use só fotos livres (Unsplash, Pexels, Pixabay) ou suas, e cite a fonte.
