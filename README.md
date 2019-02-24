# Test Docker

Primo test di [Docker](https://www.docker.com/) con creazione di due container (web server Node.js, e MongoDb) per la creazione di una CRUD REST API. 

## Uso

- Installare Docker
- Sul CMD o usando il [plugin di Docker per VSC](https://marketplace.visualstudio.com/items?itemName=PeterJausovec.vscode-docker) : `docker-compose -f "docker-compose.yml" up -d --build`
- Sul browser andare su `http://localhost:3000` o importare su [Insomnia REST CLIENT](https://insomnia.rest/) il file `Insomnia_2019-02-24.json` per avere tutti gli endpoint già configurati.
- Per stoppare entrambi i containers usare `stopall.bat` oppure singolarmente > docker stop ___nome_container___.
- Per vedere i logs della rest API mettere > docker logs ___nome_container___


## Versioning

Versione 0.0.1

## License

This project is licensed under the MIT License.