people = [
    {"name": "Harry", "house": "Gryffindor"},
    {"name": "Draco", "house": "Slytherin"},
    {"name": "Hermione", "house": "Hufflepuff"},
    {"name": "Ron", "house": "Ravenclaw"},
]
# def f(person):
#     return person["name"]
# people.sort(key=f)

people.sort(key=lambda person: person["house"])

print(people)