FROM 172.18.16.22:5001/tools/nginx
MAINTAINER "Chen Jing Yang"<1656488874@qq.com>
COPY build/ /usr/share/nginx/html/
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
