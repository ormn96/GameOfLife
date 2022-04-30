
class p:
    def __init__(self ,x ,y):
        self. x =x
        self. y =y

    def __repr__(self):
        return '{'+f"\"x\":{self.x},\"y\":{self.y}"+'}'
col_max = 0
res = []
input_file = "spacefiller1.cells.txt"
with open(input_file) as f:
    for i,line in enumerate(f):

        if line.startswith("!"):
            continue
        for j,v in enumerate(line):
            if v == 'O':
                res.append(p(i,j))
                if j>col_max:
                    col_max=j

rows_max = max(res,key=lambda point:point.x).x
rows_min = min(res,key=lambda point:point.x).x
row_delta = int((rows_max+rows_min)/2)
col_delta = int(col_max/2)

res = list(map(lambda point:p(point.x-row_delta,point.y-col_delta),res ))
print(res)
