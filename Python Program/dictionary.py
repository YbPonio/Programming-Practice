houses = {"Harry": "Hupplepuff", "Ron": "Gryffindor", "Draco": "Slytherin"}

houses["Hermione"] = "Gryffindor"

print(houses)
for house in houses:
    print(f"The house of {house} is {houses[house]}")