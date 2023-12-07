import re
from pprint import pprint 
import random
from itertools import chain

row = 3
col = 3
text = "0"
combi = len(re.findall("1", text, flags= re.I))

key_name = ['5', '10', '50', '100', '1k', '2k', '20k', '200k'] 
key_lists = {k: 0 for _, k in enumerate(key_name)}
table_match = [key_lists.copy() for i in range(8)]
result_table = [[ None for _ in range(int(col))] for _ in range(int(row))]
if combi > 0 :
    for i, tm in enumerate(table_match):
        for ik, km in enumerate(key_name):
            table_match[i][km] = i == ik and 3 or 0

    select_table = table_match[combi > len(table_match) and len(table_match) - 1 or combi - 1].items()
    for i, stl in enumerate(select_table):
        if stl[1] !=0:
            select_table = [stl[0] for _ in range(stl[1])]
    prev_dup = []
    count = 0
    while count < len(select_table):
        trows = random.randrange(0, len(result_table))
        tcols = random.randrange(0, len(result_table[trows]))
        position = f"rows={trows},cols={tcols}" 
        if position not in prev_dup:
            result_table[trows][tcols] = select_table[count]
            prev_dup.append(position)
        else:
            count-=1
        count += 1

store_combi = list(chain.from_iterable(result_table))
for i, v in enumerate(result_table):
    rt = 0
    while rt < len(v):
        ran_key_names = key_name[random.randrange(0, len(key_name))]
        if v[rt] == None:
            if store_combi.count(ran_key_names) < 2:
                result_table[i][rt] = ran_key_names
                store_combi.append(ran_key_names)
            else:
                rt-=1
        rt+=1 
pprint(result_table)