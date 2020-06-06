### Projeto :tw-1f30e:

- Aplicativo Ecoleta :tw-267b: desenvolvido na Next Level Week #01 da [RocketSeat](https://rocketseat.com.br/ "RocketSeat") com intuito de informar pontos de coleta de resíduos específicos

[========]

### Tecnologias :tw-1f4f1:

- #### Backend
	- [NodeJS](https://nodejs.org/en/ "NodeJS")

- #### Frontend
	- [React](https://pt-br.reactjs.org/ "React") 
	- [React Native](https://reactnative.dev/ "React Native")

	- [TypeScript](https://www.typescriptlang.org/ "TypeScript")
	- [Expo](https://expo.io/ "Expo")


[========]


### Starting :tw-2705:

- Passo 1: executar a instalação do [NodeJS](https://nodejs.org/en/ "NodeJS")
- Passo 2: git clone do projeto [Repositório Ecoleta](https://github.com/rafaelsanzio/Ecoleta.git "repositório ecoleta")

	 #### Instalação do Backend 
	 
		# Navegando até a pasta do backend 
		$ cd ecoleta/server 

		# Instalando todas as depêndencias necessárias
		$ npm install

		# Realize as migrações para criação do banco de dados
		$ npm run knex:migrate

		# Realize os seeds para a criação de dados no banco de dados
		$ npm run knex:seed

		# Starting o backend da aplicação
		$ npm run dev

	#### Instalação do Frontend

    -  ##### Web
		    # Navegando até a pasta web
		    $ cd ecoleta/web

		    # Instalando dependências
		    $ npm install
    
		    # Starting o frontend da aplicação
		    $ npm start
    - #### Mobile
		    # Navegando até a pasta web
		    $ cd ecoleta/mobile

		    # Instalando dependências
		    $ npm install
    
		    # Instalando fonts para exibição no projeto
		    $ expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto

		    # Starting o frontend mobile da aplicação (Basta ter o aplicativo do Expo instalado no seu celular e escanear o QRCode)
		    $ npm start || expo start
