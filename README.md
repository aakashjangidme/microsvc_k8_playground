## Microservices w/ Kubernetes Playground

`export docker_username=<username>`

> To use $ENV_VARIABLES in depl YAML

`cat <service>-depl.yaml | envsubst | k apply -f -`
