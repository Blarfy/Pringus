#sort through routes.dat and find the most common planes

results = {}
count320 = 0

for line in open('routes.dat'):
    line = line.strip()
    fields = line.split(',')
    if len(fields) == 9:
        plane = fields[8]
        # if plane == "320":
        #     count320 += 1
        #     print(count320)
        if plane in results:
            results[plane] += 1
        else:
            results[plane] = 1

#sort results and display top 10
for plane in sorted(results, key=results.get, reverse=True)[:15]:
    print(plane, results[plane])
        