import os
import subprocess
import re

output = subprocess.check_output("docker ps", shell=True, encoding="utf-8")
split_str = output.split() 

for cmd in split_str:
    regex_pattern = r"\b[0-9a-fA-F]{12}\b"
    match_pattern = re.findall(regex_pattern, cmd)
    if len(match_pattern) > 0: 
        print("stop docker id: ")
        os.system(f"docker stop {match_pattern[0]}")

os.system("git pull origin master")
os.system("docker build -t em-game .")
os.system("docker run -d -p 89:89 em-game")
os.system("docker ps")
print(f"\nSuccess Deployment!....")