import os
import subprocess
import re

if __name__ == "__main__":    
    output = subprocess.check_output("sudo -S -i docker ps", shell=True, encoding="utf-8")
    split_str = output.split() 

    for cmd in split_str:
        regex_pattern = r"\b[0-9a-fA-F]{12}\b"
        match_pattern = re.findall(regex_pattern, cmd)
        if len(match_pattern) > 0:  
            docker_ouput_id = subprocess.check_output(f"sudo -S -i docker stop {match_pattern[0]}", shell=True, encoding="utf-8")
            print(f"stop docker id: {docker_ouput_id}")

    os.system("git pull origin master")
    os.system("sudo -S -i docker build -t em-game .")
    os.system("sudo -S -i docker run -d -p 89:89 em-game")
    os.system("sudo -S -i docker ps")
    print(f"\nSuccess Deployment!....")