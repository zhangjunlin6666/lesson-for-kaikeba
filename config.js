workspace:
  base: /drone/src
  path: integral-exchange-system
pipeline:
  restore-cache:
    image: drillster/drone-volume-cache
    restore: true
    mount:
      - node_modules
    volumes:
      - '/drone/cache/shuangshi-frontend/integral-exchange-system:/cache'
  build-dev:
    image: 'node:10.6.0'
    privileged: true
    commands:
      - 'npm install --registry=https://registry.npm.taobao.org'
      - 'npm run build:dev'
    when:
      branch: dev
  build-test:
    image: 'node:10.6.0'
    privileged: true
    commands:
      - 'npm install --registry=https://registry.npm.taobao.org'
      - 'npm run build:test'
    when:
      branch: test
  build-staging:
    image: 'node:10.6.0'
    privileged: true
    commands:
      - 'npm install --registry=https://registry.npm.taobao.org'
      - 'npm run build:staging'
    when:
      branch: staging
  build-release:
    image: 'node:10.6.0'
    privileged: true
    commands:
      - 'npm install --registry=https://registry.npm.taobao.org'
      - 'npm run build'
    when:
      branch: master
  public-dev:
    image: harbor.office.tengyue360.com/tools/drone-docker
    secrets:
      - docker_username
      - docker_password
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
    commands:
      - 'docker login -u $${DOCKER_USERNAME} -p $${DOCKER_PASSWORD} harbor.office.tengyue360.com'
      - 'docker build --rm  -t integral-exchange-system .'
      - 'docker tag integral-exchange-system harbor.office.tengyue360.com/ty-shuangshi/integral-exchange-system:dev'
      - 'docker push harbor.office.tengyue360.com/ty-shuangshi/integral-exchange-system:dev'
    when:
      branch: dev
      event: push
  public-test:
    image: harbor.office.tengyue360.com/tools/drone-docker
    secrets:
      - docker_username
      - docker_password
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
    commands:
      - 'docker login -u $${DOCKER_USERNAME} -p $${DOCKER_PASSWORD} harbor.office.tengyue360.com'
      - 'docker build --rm  -t integral-exchange-system .'
      - 'docker tag integral-exchange-system harbor.office.tengyue360.com/ty-shuangshi/integral-exchange-system:test'
      - 'docker push harbor.office.tengyue360.com/ty-shuangshi/integral-exchange-system:test'
    when:
      branch: test
      event: push
  public-staging:
    image: harbor.office.tengyue360.com/tools/drone-docker
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
    commands:
      - 'docker login -u tengyue360@163.com -p tengyue2018 registry.cn-beijing.aliyuncs.com'
      - 'docker build --rm  -t integral-exchange-system .'
      - 'docker tag integral-exchange-system registry.cn-beijing.aliyuncs.com/tengyue360/integral-exchange-system:staging'
      - 'docker push registry.cn-beijing.aliyuncs.com/tengyue360/integral-exchange-system:staging'
    when:
      branch: staging
      event: push
  public-release:
    image: harbor.office.tengyue360.com/tools/drone-docker
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock'
    commands:
      - 'docker login -u tengyue360@163.com -p tengyue2018 registry.cn-beijing.aliyuncs.com'
      - 'docker build --rm  -t integral-exchange-system .'
      - 'docker tag integral-exchange-system registry.cn-beijing.aliyuncs.com/tengyue360/integral-exchange-system:release'
      - 'docker push registry.cn-beijing.aliyuncs.com/tengyue360/integral-exchange-system:release'
    when:
      branch: master
      event: push
  rancher-dev:
    image: harbor.office.tengyue360.com/tools/drone-rancher
    url: 'http://rancher.office.tengyue360.com'
    access_key: B073D4FB76A07E525B81
    secret_key: WJyrNxGS8EYUmSQyrXBRNztP4vZpqoxRqhjVEV5X
    service: shuangshi/integral-exchange-system
    docker_image: 'harbor.office.tengyue360.com/ty-shuangshi/integral-exchange-system:dev'
    start_first: false
    confirm: true
    timeout: 300
    when:
      branch: dev
      event: push
  rancher-test:
    image: harbor.office.tengyue360.com/tools/drone-rancher
    url: 'http://rancher.office.tengyue360.com'
    access_key: 4A5896751FF4A7CF0551
    secret_key: 2TyfGork4hz3WafH9EREjhvSgsnKGyN63g5Mm41H
    service: shuangshi/integral-exchange-system
    docker_image: 'harbor.office.tengyue360.com/ty-shuangshi/integral-exchange-system:test'
    start_first: true
    timeout: 240
    when:
      branch: test
      event: push
  rancher-staging:
    image: harbor.office.tengyue360.com/tools/drone-rancher
    url: 'http://rancher.tengyue360.com'
    access_key: D15045DDBE532C3DB268
    secret_key: sBw5bm7PcqC7z4g47pca96Bqy2jGE3CmF3b4f81Z
    service: shuangshi/integral-exchange-system
    docker_image: 'registry-vpc.cn-beijing.aliyuncs.com/tengyue360/integral-exchange-system:staging'
    start_first: true
    confirm: true
    timeout: 300
    when:
      branch: staging
      event: push
  rancher-online:
    image: harbor.office.tengyue360.com/tools/drone-rancher
    url: 'http://rancher.tengyue360.com'
    access_key: D15045DDBE532C3DB268
    secret_key: sBw5bm7PcqC7z4g47pca96Bqy2jGE3CmF3b4f81Z
    service: shuangshi/integral-exchange-system
    docker_image: registry-vpc.cn-beijing.aliyuncs.com/tengyue360/integral-exchange-system:release
    start_first: true
    confirm: true
    timeout: 180
    when:
      branch: master
      event: deployment
      environment: production
  rebuild-cache:
    image: itanger/drone-volume-cache
    rebuild: true
    mount:
      - node_modules
    volumes:
      - '/drone/cache/shuangshi-frontend/integral-exchange-system:/cache'
