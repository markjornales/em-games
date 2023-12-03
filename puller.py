import os
from colorama import Fore, Style 

enter_commit = input(f"{Fore.GREEN} Enter your messenge commit {Style.RESET_ALL}: ")
os.system("git pull dev_emgames master")
os.system("git add .")
os.system(f"git commit -m {enter_commit}")
os.system("git push dev_emgames master")
os.system("git push prod_emgame master")