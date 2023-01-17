# horigium

> Um relógio que mostra as horas e mais algumas informações baseadas em sua localização

## Demo

Acesse o deploy da aplicação [aqui](https://horigium.vercel.app/)

## Screenshots

##### Day

![App day mode](./screenshots/day.png)

##### Night

![App night mode](./screenshots/night.png)

> ⚠️ Devido a imprecisão das coordenadas geográficas fornecidas
> pelo navegador, é possível que a cidade mostrada pela aplicação seja
> diferente da real cidade corrente do usuário.

## Tecnologias

- **Cliente:** Vue e TailwindCSS
- **APIs:** Here API (geodeconficação)
- **Testes:** Vue Test Util e Jest

## Executar localmente

Clone o projeto

```bash
  git clone https://github.com/LuscaLima/horigium.git
```

Vá para o diretório do projeto

```bash
  cd horigium
```

Instale as depedências

```bash
  yarn install
```

Configure a variável de ambiente da [Here API](https://developer.here.com/documentation/geocoding-search-api/dev_guide/index.html)

```bash
  VITE_APP_HERE_KEY=
```

Inicie o servidor

```bash
  yarn dev
```

## Aprendizado

Aplicação de pequeno porte feita para fins de uso básico da API de geolocalização do navegador e treinamento sobre as bibliotecas utilitárias `Vue Test Utils` e `Jest`. Foram aplicados teste de componentes e unitários.

## License

[MIT](https://choosealicense.com/licenses/mit/)
