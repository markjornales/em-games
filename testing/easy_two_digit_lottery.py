import re
from random import randrange
from pprint import pprint

combi: str = "0"
combi_number: int = len(re.findall("1", combi))
color_list = ["red", "blue", "green", "pink", "yellow"]
prize_list = ["5", "10", "20", "50", "100", "500", "5k", "50k"]
winning_table = {
    "winning_number": [],
    "rand_number": []
}
 
zero_win = combi_number == 0 and randrange(1, len(prize_list)) or combi_number
rand_colors = randrange(0, len(color_list))
combi_prize = prize_list[combi_number > len(prize_list) and -1 or zero_win - 1]
selected_color = color_list[rand_colors - 1]  

winning_table.update({
    "winning_number": [(combi_prize, selected_color) for _ in range(2)]
}) 

duplicate_number = []
duplicate_color = []
count = 0
while count < 4:
    zero_win =  randrange(1, len(prize_list))
    rand_colors = randrange(0, len(color_list))
    combi_prize = prize_list[combi_number > len(prize_list) and -1 or zero_win - 1]
    selected_color = color_list[rand_colors - 1]
    rand_number = [(combi_prize, selected_color) for _ in range(2)]
    if combi_prize not in winning_table["winning_number"][0]:
        if duplicate_number.count(combi_prize) < 1 and duplicate_color.count(selected_color) < 1:
            winning_table["rand_number"].append(rand_number)
            duplicate_number.append(combi_prize)
            duplicate_color.append(selected_color)
        else:
            count-=1
    else:
        count-=1
    count+=1
if combi_number > 0:
    rand_index_number = randrange(1, len(winning_table["rand_number"]))
    winning_table_copy = winning_table["winning_number"].copy()
    winning_table["rand_number"][rand_index_number - 1] = winning_table_copy
    
pprint(winning_table)