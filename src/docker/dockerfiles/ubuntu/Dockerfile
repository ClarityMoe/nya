FROM ubuntu:16.04

RUN echo "force-unsafe-io" > /etc/dpkg/dpkg.cfg.d/02apt-speedup
RUN echo "Acquire::http {No-Cache=True;};" > /etc/apt/apt.conf.d/no-cache

RUN apt update && \
    apt -y install \
    apt-utils \ 
    wget \
    sudo \
    bash \
    git \
    wget \
    ssh \
    wget \
    tar \
    gzip \
    openssh-server \
    build-essential \
    python3-pip \
    python2-pip 

RUN wget -qO- https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt update && apt -y install nodejs

RUN mkdir /var/run/sshd && \
    sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd && \
    echo "%sudo ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers && \
    useradd -u 1000 -G users,sudo -d /home/awau --shell /bin/bash -m awau && \
    usermod -p "*" awau
USER awau
RUN echo "awoo~"