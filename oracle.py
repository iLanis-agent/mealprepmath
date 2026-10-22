import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def meals(p, m, d):
    return f"The {pl(p,' person',' people')} at {pl(m,' meal',' meals')} a day for {pl(d,' day',' days')} need {pl(p*m*d,' meal',' meals')}."
def batch(n, p):
    k = -(-n//p)
    return f"The {pl(n,' meal',' meals')} at {p} a batch take {pl(k,' batch',' batches')}, leaving {pl(k*p-n,' portion',' portions')} spare."
def box(n, p):
    k = -(-n//p)
    return f"The {pl(n,' meal',' meals')} in packs of {p} containers take {pl(k,' pack',' packs')}, leaving {pl(k*p-n,' container',' containers')} spare."
def cost(b, bp, k, pp):
    return f"The {pl(b,' batch',' batches')} at ${money(bp)} and {pl(k,' pack',' packs')} at ${money(pp)} cost ${money(b*bp+k*pp)}, batches ${money(b*bp)} and packs ${money(k*pp)}."
random.seed(769)
R=random.randint
cases = [
 dict(fn="meals", args=["2","2","5"], expect=meals(2,2,5)),
 dict(fn="batch", args=["20","6"], expect=batch(20,6)),
 dict(fn="box", args=["20","8"], expect=box(20,8)),
 dict(fn="cost", args=["4","18.50","3","9"], expect=cost(4,1850,3,900)),
 dict(fn="meals", args=["1","1","1"], expect=meals(1,1,1)),
 dict(fn="batch", args=["1","1"], expect=batch(1,1)),
 dict(fn="box", args=["1","1"], expect=box(1,1)),
 dict(fn="cost", args=["1","0.01","1","0.01"], expect=cost(1,1,1,1)),
]
for _ in range(20):
    p,m,d=R(1,100),R(1,10),R(1,60); cases.append(dict(fn="meals", args=[str(p),str(m),str(d)], expect=meals(p,m,d)))
for _ in range(20):
    n,p=R(1,100000),R(1,1000); cases.append(dict(fn="batch", args=[str(n),str(p)], expect=batch(n,p)))
for _ in range(20):
    n,p=R(1,100000),R(1,1000); cases.append(dict(fn="box", args=[str(n),str(p)], expect=box(n,p)))
for _ in range(20):
    b,bp,k,pp=R(1,100000),R(1,1000000),R(1,100000),R(1,1000000); cases.append(dict(fn="cost", args=[str(b),dec(bp),str(k),dec(pp)], expect=cost(b,bp,k,pp)))
errs=[["meals",["0","2","5"]],["meals",["101","2","5"]],["meals",["2","0","5"]],["meals",["2","11","5"]],["meals",["2","2","0"]],["meals",["2","2","61"]],["meals",["2.5","2","5"]],
 ["batch",["0","6"]],["batch",["100001","6"]],["batch",["20","0"]],["batch",["20","1001"]],
 ["box",["0","8"]],["box",["20","0"]],["box",["20","1001"]],
 ["cost",["0","18.5","3","9"]],["cost",["4","0","3","9"]],["cost",["4","18.5","0","9"]],["cost",["4","18.5","3","0"]],["cost",["4","18.5","3","10000.01"]],["cost",["4","18.555","3","9"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
