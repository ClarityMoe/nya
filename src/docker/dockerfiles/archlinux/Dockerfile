FROM base/archlinux
MAINTAINER base

RUN pacman -Sy
RUN pacman -S base base-devel openssh systemd nodejs npm git wget go python python-pip cmake jdk8-openjdk ruby --noconfirm
RUN groupadd sudo && \
    useradd -u 1000 -G users,sudo -d /home/awau --shell /bin/bash -m awau && \
    ssh-keygen -f /etc/ssh/ssh_host_rsa_key -N "" -t rsa && \
    ssh-keygen -f /etc/ssh/ssh_host_dsa_key -N "" -t dsa && \
    ssh-keygen -f /etc/ssh/ssh_host_ecdsa_key -N "" -t ecdsa && \
    ssh-keygen -f /etc/ssh/ssh_host_ed25519_key -N "" -t ed25519 && \
    echo $'PubkeyAuthentication no \n\ 
AuthorizedKeysFile .ssh/authorized_keys \n\
ChallengeResponseAuthentication no \n\
UsePAM yes \n\
PrintMotd no \n\
Subsystem sftp /usr/lib/ssh/sftp-server \n\
PermitRootLogin no' > /etc/ssh/sshd_config && \
    mkdir /var/run/sshd && \
    sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd && \
    echo "%sudo ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers && \
    echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen && \
    locale-gen && \
    mkdir ~/Projects
USER awau
VOLUME /home/awau
RUN cat /proc/version