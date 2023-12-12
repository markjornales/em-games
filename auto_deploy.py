from colorama import Fore, Style
from paramiko import SSHClient
import re
from dotenv import load_dotenv
from os import getenv
load_dotenv()

def emperor_gaming ():
    client.load_system_host_keys()
    client.connect(getenv("SSH_EMPEROR_PUBLIC_IP"), username="root", key_filename="./ssh/emperor.pem", port=22)
    stdin, stdout, stderr = client.exec_command("cd /var/www/em-games && python3 deploy.py")
    print(stdout.read().decode("utf-8"))
    stdout.close() 
    
def stella_gaming (): 
    client.load_system_host_keys()
    client.connect(getenv("SSH_STELLA_PUBLIC_IP"), username="root", key_filename="./ssh/stella-scratch.pem", port=22)
    stdin, stdout, stderr = client.exec_command("cd /var/www/em-games && python3 deploy.py")
    print(stdout.read().decode("utf-8"))
    stdout.close() 

if __name__ == "__main__":
    client = SSHClient()
    list_deploy = ["emperor_gaming", "stella_gaming"]
    for i, list in enumerate(list_deploy):
        print(f"{Fore.LIGHTCYAN_EX}[{i}] {list}")
    select_deployment = input(f"{Fore.GREEN}Select desire servers:{Style.RESET_ALL} ")
    validate_input = re.search("[0-9]", select_deployment)
    if validate_input:
        input_text = int(select_deployment)
        match input_text:
            case 0:
                emperor_gaming()
            case 1:
                stella_gaming()
            case default:
                print("Not exists list deployment")
    else:
        print("Invalid input number")
    client.close()