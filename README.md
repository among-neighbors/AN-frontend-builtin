# AN-frontend-builtin

## 1. 소개

<img width="157" alt="logo" src="https://user-images.githubusercontent.com/67043922/198819170-dbb0ef03-cb85-4220-bfbd-3f1276776cf3.png">

> 소중한 이웃과 함께하는 이웃사이

 이웃 간의 단절과 고령 1인 가구 증가로 인한 다양한 사회 문제를 해결하고자 다양한 주거 형태에 적용 가능한 관리 시스템 모델을 제시합니다.<br>
 서비스에서 제공되는 편의 기능을 통해 이웃 간의 소통을 증진하고, 긴급 상황에 대처할 수 있는 환경을 조성합니다.
 
 [이웃사이 위키 바로가기](https://github.com/among-neighbors/AN-backend/wiki)
 
<br>

## 2. 사용 방법

![face](https://user-images.githubusercontent.com/62577565/198865075-271430e8-00ed-43bf-99fb-0e1d1036a68f.gif)

### **git clone**
```shell
$ git clone https://github.com/among-neighbors/AN-frontend-builtin.git
```

**application.yml**

```yaml
version: '3'
services:
  nginx:
    image: nginx:latest
    restart: unless-stopped
    volumes:
      - ./default.conf:/etc/nginx/conf.d/default.conf 
      - ./data/certbot/conf:/etc/letsencrypt 
      - ./data/certbot/www:/var/www/certbot 
      - ../AN-frontend/client/dist:/usr/share/nginx/user 
      - ../AN-frontend-manager/client/dist:/usr/share/nginx/manager 
      - ../AN-frontend-builtin/client/dist:/usr/share/nginx/builtin
    ports:
      - 80:81
      - 443:443
  certbot:
    image: certbot/certbot
    restart: unless-stopped
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt 
      - ./data/certbot/www:/var/www/certbot      
```
<br>



## 3. Architecture

![sysA_06 003](https://user-images.githubusercontent.com/62577565/198864482-4afdf2ae-6326-40bc-95df-fa40fe589575.jpeg)



## **6. Open Source**

[APACHE License](LICENSE)

[Contribution Guideline](CONTRIBUTING.md)




