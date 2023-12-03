import os

os.system("git pull origin master")
os.system("docker build -t em-game .")
os.system("docker run -d -p 89:89 em-game")