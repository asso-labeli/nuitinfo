FROM ubuntu:xenial

EXPOSE 8080

# Create folder
RUN mkdir /var/www

# Install NodeJS
RUN apt-get update && apt-get dist-upgrade -y
RUN apt-get install -y curl wget
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

# Install MongoDB
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update
RUN apt-get install -y mongodb-org
RUN wget http://hackjack.info/mongod.service && mv mongod.service /lib/systemd/system/mongod.service


# Install Git
RUN apt-get install git -y

# Install Python 3
RUN apt-get install python3 -y

# Clone repo
RUN cd /var/www && git clone https://github.com/asso-labeli/nuitinfo.git
RUN cd /var/www/nuitinfo/ && npm i
RUN cd /var/www/nuitinfo/app && npm i

CMD service mongod start && cd /var/www/nuitinfo && git pull && npm i && cd /var/www/nuitinfo/server/config/ && mv local.env.default.js local.env.js && cd /var/www/nuitinfo/app && npm i && npm run build && cd /var/www/nuitinfo && npm run start
